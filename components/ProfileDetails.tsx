"use client";

import Image from "next/image";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { compressPhoto } from "../lib/hostPhotos";

const bucket = "community-photos";
function ownPhoto(value: unknown, userId: string): string {
  return typeof value === "string" && value.startsWith(`${userId}/legolfe-profile/`) && /^[a-zA-Z0-9-]+\/legolfe-profile\/[a-zA-Z0-9-]+\.jpg$/.test(value) ? value : "";
}

export default function ProfileDetails({ userId, fr }: { userId: string; fr: boolean }) {
  const [bio, setBio] = useState("");
  const [connection, setConnection] = useState<"local" | "visiting" | "">("");
  const [path, setPath] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [removed, setRemoved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const active = useRef(false);
  const busy = useRef(false);

  useEffect(() => {
    active.current = true;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.id !== userId) active.current = false;
    });
    void (async () => {
      let loaded = false;
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!active.current || data.user?.id !== userId) return;
        if (error) throw error;
        const metadata = data.user.user_metadata;
        setBio(typeof metadata.legolfe_bio === "string" ? metadata.legolfe_bio.slice(0, 280) : "");
        setConnection(metadata.legolfe_connection === "local" || metadata.legolfe_connection === "visiting" ? metadata.legolfe_connection : "");
        const savedPath = ownPhoto(metadata.legolfe_avatar_path, userId);
        setPath(savedPath);
        loaded = true;
        if (savedPath) {
          const result = await supabase.storage.from(bucket).createSignedUrl(savedPath, 3600);
          if (!active.current) return;
          if (result.error) throw result.error;
          setPreview(result.data.signedUrl);
        }
      } catch {
        if (active.current) setMessage(fr ? "Impossible de charger le profil. Rechargez la page pour réessayer." : "Unable to load your profile. Reload the page to try again.");
      } finally { if (active.current && loaded) setLoading(false); }
    })();
    return () => { active.current = false; listener.subscription.unsubscribe(); };
  }, [userId, fr]);

  useEffect(() => () => { if (preview.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 12 * 1024 * 1024) {
      setMessage(fr ? "Choisissez une image JPEG, PNG ou WebP de 12 Mo maximum." : "Choose a JPEG, PNG or WebP image up to 12 MB.");
      return;
    }
    setPhoto(file); setRemoved(false); setPreview(URL.createObjectURL(file)); setMessage("");
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (busy.current || loading || !active.current) return;
    const cleanBio = bio.trim();
    if (cleanBio.length > 280) return;
    busy.current = true; setSaving(true); setMessage("");
    let uploaded = "";
    let committed = false;
    try {
      const image = photo ? await compressPhoto(photo, 320) : null;
      const { data, error: authError } = await supabase.auth.getUser();
      if (!active.current || data.user?.id !== userId || authError) throw new Error("Session changed");
      let nextPath = removed ? "" : path;
      if (image) {
        uploaded = `${userId}/legolfe-profile/${crypto.randomUUID()}.jpg`;
        const { error } = await supabase.storage.from(bucket).upload(uploaded, image, { upsert: false, contentType: "image/jpeg" });
        if (error) throw error;
        nextPath = uploaded;
      }
      if (!active.current) throw new Error("Session changed");
      const { data: current, error: sessionError } = await supabase.auth.getUser();
      if (!active.current || current.user?.id !== userId || sessionError) throw new Error("Session changed");
      const { error } = await supabase.auth.updateUser({ data: { legolfe_bio: cleanBio, legolfe_avatar_path: nextPath, legolfe_connection: connection } });
      if (error) throw error;
      committed = true;
      if (!active.current) return;
      setPath(nextPath); setPhoto(null); setRemoved(false); setBio(cleanBio);
      setMessage(fr ? "Photo et présentation enregistrées." : "Photo and introduction saved.");
      // Remove a replaced photo only after the new metadata has been saved.
      if (path && path !== nextPath) await supabase.storage.from(bucket).remove([path]).catch(() => {});
    } catch {
      if (active.current) setMessage(fr ? "Enregistrement impossible. Vérifiez votre image et réessayez." : "Unable to save. Check your image and try again.");
    } finally {
      if (uploaded && !committed) await supabase.storage.from(bucket).remove([uploaded]).catch(() => {});
      busy.current = false;
      if (active.current) setSaving(false);
    }
  }

  return <form onSubmit={save} className="mb-10 border-b border-black/15 pb-10">
    <fieldset disabled={loading || saving}>
      <legend className="lg-kicker">{fr ? "PHOTO & PRÉSENTATION" : "PHOTO & INTRODUCTION"}</legend>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0B4F6C] text-3xl font-black text-white">
          {preview ? <Image unoptimized width={96} height={96} src={preview} alt={fr ? "Votre photo de profil" : "Your profile photo"} className="h-full w-full object-cover" /> : <span aria-hidden="true">LG</span>}
        </div>
        <div>
          <label htmlFor="profile-photo" className="block text-sm font-bold">{fr ? "Choisir ma photo" : "Choose my photo"}</label>
          <input id="profile-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="mt-2 block w-full max-w-xs text-xs file:mr-3 file:border-0 file:bg-black file:px-3 file:py-2 file:font-bold file:text-white" />
          <p className="mt-2 text-xs text-black/55">JPEG, PNG, WebP · {fr ? "12 Mo maximum" : "12 MB maximum"}</p>
          {(preview || path) && <button type="button" onClick={() => { setRemoved(true); setPhoto(null); setPreview(""); }} className="mt-2 text-xs font-bold underline">{fr ? "Retirer la photo" : "Remove photo"}</button>}
        </div>
      </div>
      <fieldset className="mt-6"><legend className="text-sm font-bold">{fr ? "Mon lien avec le Golfe (facultatif)" : "My connection to the Golfe (optional)"}</legend><div className="mt-3 flex flex-wrap gap-3">{([["local", fr ? "Je vis dans le Golfe" : "I live in the Golfe"], ["visiting", fr ? "Je suis de passage" : "I am visiting"]] as const).map(([value, label]) => <label key={value} className={"cursor-pointer border px-4 py-3 text-sm font-bold " + (connection === value ? "border-[#0B4F6C] bg-[#0B4F6C] text-white" : "border-black/20")}><input type="radio" name="golfe-connection" value={value} checked={connection === value} onChange={() => setConnection(value)} className="sr-only" />{label}</label>)}<button type="button" className="text-xs underline" onClick={() => setConnection("")}>{fr ? "Ne pas préciser" : "Prefer not to say"}</button></div></fieldset>
      <label htmlFor="profile-bio" className="mt-6 block text-sm font-bold">{fr ? "Quelques mots sur moi" : "A few words about me"}</label>
      <textarea id="profile-bio" rows={3} maxLength={280} value={bio} onChange={event => setBio(event.target.value)} placeholder={fr ? "Ce que vous aimez dans le Golfe, vos envies, votre activité…" : "What you love about the Golfe, your interests, your activity…"} aria-describedby="bio-count" className="mt-3 w-full resize-y border border-black/20 p-4 text-sm leading-6 focus:border-black focus:outline-none" />
      <p id="bio-count" className="mt-1 text-right text-xs text-black/50">{bio.length}/280</p>
      <button className="lg-btn lg-btn--dark mt-4 disabled:opacity-40" disabled={loading || saving}>{saving ? (fr ? "Enregistrement…" : "Saving…") : fr ? "Enregistrer photo & présentation" : "Save photo & introduction"}</button>
    </fieldset>
    {message && <p role="status" className="mt-3 text-sm font-bold text-black/55">{message}</p>}
  </form>;
}
