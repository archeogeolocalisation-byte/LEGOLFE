"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { compressPhoto } from "../lib/hostPhotos";
import { supabase } from "../lib/supabase";

const bucket = "community-photos";
const MAX_PHOTOS = 3;
const photoPattern = /^[a-zA-Z0-9-]+\/legolfe-profile\/[a-zA-Z0-9-]+\.jpg$/;
type GalleryItem = { path: string; url: string; file?: File };
function ownedGallery(value: unknown, userId: string): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((path): path is string =>
    typeof path === "string" && path.startsWith(userId + "/legolfe-profile/") && photoPattern.test(path)
  ).slice(0, MAX_PHOTOS);
}

export default function ProfileGallery({ userId, fr }: { userId: string; fr: boolean }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const active = useRef(true);
  const busy = useRef(false);
  const itemsRef = useRef<GalleryItem[]>([]);
  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect(() => {
    active.current = true;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.id !== userId) active.current = false;
    });
    void (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || data.user?.id !== userId) throw new Error("Invalid session");
        const paths = ownedGallery(data.user.user_metadata?.legolfe_gallery_paths, userId);
        const signed = await Promise.all(paths.map(async path => {
          const result = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
          if (result.error) throw result.error;
          return { path, url: result.data.signedUrl };
        }));
        if (active.current) setItems(signed);
      } catch {
        if (active.current) setMessage(fr ? "Impossible de charger les photos. Réessayez." : "Unable to load photos. Please retry.");
      } finally {
        if (active.current) setLoading(false);
      }
    })();
    return () => {
      active.current = false;
      listener.subscription.unsubscribe();
      itemsRef.current.forEach(item => { if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url); });
    };
  }, [userId, fr]);

  function choose(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length || saving || loading) return;
    if (files.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 12 * 1024 * 1024)) {
      setMessage(fr ? "Photos JPEG, PNG ou WebP de 12 Mo maximum chacune." : "JPEG, PNG or WebP photos, up to 12 MB each.");
      return;
    }
    const available = MAX_PHOTOS - items.length;
    if (files.length > available) {
      setMessage(fr ? "Trois photos maximum pour le slider." : "Maximum three photos for the slider.");
      return;
    }
    setItems(previous => [...previous, ...files.map(file => ({ path: "", file, url: URL.createObjectURL(file) }))]);
    setMessage("");
  }

  function remove(at: number) {
    if (saving) return;
    setItems(previous => {
      const next = previous.filter((_, i) => i !== at);
      const removed = previous[at];
      if (removed?.url.startsWith("blob:")) URL.revokeObjectURL(removed.url);
      return next;
    });
    setIndex(i => Math.min(i, Math.max(0, items.length - 2)));
    setMessage("");
  }

  async function save() {
    if (busy.current || loading || !active.current) return;
    busy.current = true; setSaving(true); setMessage("");
    const uploaded: string[] = [];
    let committed = false;
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || data.user?.id !== userId || !active.current) throw new Error("Invalid session");
      const oldPaths = ownedGallery(data.user.user_metadata?.legolfe_gallery_paths, userId);
      const nextPaths: string[] = [];
      for (const item of items) {
        if (!active.current) throw new Error("Session changed");
        if (!item.file) { nextPaths.push(item.path); continue; }
        const image = await compressPhoto(item.file, 1600);
        const path = userId + "/legolfe-profile/" + crypto.randomUUID() + ".jpg";
        const result = await supabase.storage.from(bucket).upload(path, image, { upsert: false, contentType: "image/jpeg" });
        if (result.error) throw result.error;
        uploaded.push(path);
        nextPaths.push(path);
      }
      const check = await supabase.auth.getUser();
      if (!active.current || check.error || check.data.user?.id !== userId) throw new Error("Session changed");
      const updated = await supabase.auth.updateUser({ data: { legolfe_gallery_paths: nextPaths } });
      if (updated.error) throw updated.error;
      committed = true;
      const signed = await Promise.all(nextPaths.map(async path => {
        const result = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
        if (result.error) throw result.error;
        return { path, url: result.data.signedUrl };
      }));
      if (active.current) {
        items.forEach(item => { if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url); });
        setItems(signed);
        setMessage(fr ? "Photos enregistrées." : "Photos saved.");
      }
      const deleted = oldPaths.filter(path => !nextPaths.includes(path));
      if (deleted.length) await supabase.storage.from(bucket).remove(deleted).catch(() => {});
    } catch {
      if (active.current) setMessage(committed
        ? (fr ? "Photos enregistrées, mais aperçu indisponible. Rechargez la page." : "Photos saved, but preview unavailable. Reload the page.")
        : (fr ? "Enregistrement impossible. Réessayez." : "Unable to save photos. Please retry."));
    } finally {
      if (!committed && uploaded.length) await supabase.storage.from(bucket).remove(uploaded).catch(() => {});
      busy.current = false;
      if (active.current) setSaving(false);
    }
  }

  return <section className="mb-10 border-b border-black/15 pb-10" aria-label={fr ? "Photos de couverture du profil" : "Profile cover photos"}>
    <p className="lg-kicker">{fr ? "MON GOLFE EN IMAGES" : "MY GOLFE IN PICTURES"}</p>
    <p className="mt-3 text-sm text-black/60">{fr ? "Ajoutez jusqu’à 3 photos pour personnaliser votre profil. Sans photo, aucun slider ne s’affiche." : "Add up to 3 photos to personalize your profile. Without photos, no slider appears."}</p>
    {items.length > 0 && <div className="relative mt-6 overflow-hidden bg-neutral-100">
      <div className="relative aspect-[16/9] w-full">
        <Image unoptimized fill sizes="(max-width: 768px) 100vw, 700px" src={items[Math.min(index, items.length - 1)].url} alt={fr ? "Photo " + (Math.min(index, items.length - 1) + 1) + " du profil" : "Profile photo " + (Math.min(index, items.length - 1) + 1)} className="object-cover" />
      </div>
      {items.length > 1 && <>
        <button type="button" disabled={saving} aria-label={fr ? "Photo précédente" : "Previous photo"} onClick={() => setIndex(i => (i + items.length - 1) % items.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 px-4 py-3 font-black">‹</button>
        <button type="button" disabled={saving} aria-label={fr ? "Photo suivante" : "Next photo"} onClick={() => setIndex(i => (i + 1) % items.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 px-4 py-3 font-black">›</button>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">{items.map((item, i) => <button type="button" key={item.path || item.url} aria-label={fr ? "Voir la photo " + (i + 1) : "View photo " + (i + 1)} aria-current={index === i ? "true" : undefined} onClick={() => setIndex(i)} className={"h-2.5 w-2.5 rounded-full " + (index === i ? "bg-white" : "bg-white/50")} />)}</div>
      </>}
    </div>}
    {items.length > 0 && <div className="mt-4 grid grid-cols-3 gap-3">{items.map((item, i) => <div key={item.path || item.url} className="relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100"><Image unoptimized fill sizes="180px" src={item.url} alt={fr ? "Miniature " + (i + 1) : "Thumbnail " + (i + 1)} className="object-cover" /></div>
      <button type="button" disabled={saving || loading} onClick={() => remove(i)} className="mt-2 text-xs font-bold underline">{fr ? "Retirer" : "Remove"} {i + 1}</button>
    </div>)}</div>}
    <div className="mt-5 flex flex-wrap items-center gap-4">
      {items.length < MAX_PHOTOS && <label className="lg-btn cursor-pointer">
        {fr ? "Ajouter des photos" : "Add photos"}
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={loading || saving} onChange={choose} className="sr-only" />
      </label>}
      <button type="button" disabled={loading || saving} onClick={() => void save()} className="lg-btn lg-btn--dark disabled:opacity-40">{saving ? (fr ? "Enregistrement…" : "Saving…") : (fr ? "Enregistrer le slider" : "Save gallery")}</button>
      <span className="text-xs font-bold text-black/50">{items.length}/3</span>
    </div>
    <p role="status" aria-live="polite" className="mt-3 text-sm font-semibold text-black/60">{message}</p>
  </section>;
}
