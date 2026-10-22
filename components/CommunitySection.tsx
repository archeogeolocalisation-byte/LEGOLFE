"use client";

import CommunityPhoto from "./CommunityPhoto";
import { compressPhoto } from "../lib/hostPhotos";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Locale } from "../lib/i18n";

type CommunityPost = {
  id: string;
  place_id: string;
  user_id: string;
  type: "photo" | "comment";
  image_path: string | null;
  comment: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type PublicMember = {id:string;name:string;avatarUrl:string|null};
type ProfileMap = Record<string, PublicMember>;

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function CommunitySection({ placeId, locale }: { placeId: string; locale: Locale }) {
  const fr = locale === "fr";
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [profiles, setProfiles] = useState<ProfileMap>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const generation = useRef(0);
  const mounted = useRef(true);

  async function loadCommunity(currentUserId?: string | null) {
    const ticket = ++generation.current;
    setPosts([]);
    setProfiles({});
    if (currentUserId !== undefined) setUserId(currentUserId);
    setLoading(true);
    const { data, error } = await supabase
      .from("community_posts")
      .select("id,place_id,user_id,type,image_path,comment,status,created_at")
      .eq("place_id", placeId)
      .order("created_at", { ascending: false }).limit(100);

    if (!mounted.current || ticket !== generation.current) return;

    if (!error) {
      const rows = (data as CommunityPost[] | null) ?? [];
      setPosts(rows);
      const ids = [...new Set(rows.map((row) => row.user_id))];
      if (ids.length) {
        try {
          const response = await fetch("/api/community/members?ids=" + encodeURIComponent(ids.slice(0,30).join(",")), {cache:"no-store"});
          if (!response.ok) throw new Error("MEMBERS_UNAVAILABLE");
          const result = await response.json() as {members?:PublicMember[]};
          if (!mounted.current || ticket !== generation.current) return;
          const map: ProfileMap = {};
          for (const member of result.members ?? []) map[member.id] = member;
          setProfiles(map);
        } catch { if(mounted.current && ticket === generation.current) setProfiles({}); }
      }
    }
    if (currentUserId !== undefined) setUserId(currentUserId);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    mounted.current = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      loadCommunity(data.user?.id ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) loadCommunity(session?.user?.id ?? null);
    });
    return () => {
      active = false;
      mounted.current = false;
      generation.current++;
      listener.subscription.unsubscribe();
    };
  }, [placeId]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function chooseFile(nextFile: File | null) {
    setMessage("");
    if (!nextFile) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(nextFile.type)) {
      setMessage(fr ? "Format accepté : JPG, PNG ou WebP." : "Accepted formats: JPG, PNG or WebP.");
      return;
    }
    if (nextFile.size > MAX_FILE_BYTES) {
      setMessage(fr ? "La photo doit faire moins de 8 Mo." : "The photo must be under 8 MB.");
      return;
    }
    setFile(nextFile);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!userId || sending) return;
    if (!file && !comment.trim()) return;
    if (comment.trim().length > 800) {
      setMessage(fr ? "Le commentaire est limité à 800 caractères." : "Comments are limited to 800 characters.");
      return;
    }

    setSending(true);
    setMessage("");
    let imagePath: string | null = null;
    try {
      if (file) {
        const image = await compressPhoto(file);
        imagePath = `${userId}/${placeId}/${crypto.randomUUID()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("community-photos")
          .upload(imagePath, image, { upsert: false, contentType: 'image/jpeg' });
        if (uploadError) throw uploadError;
      }

      const { error: insertError } = await supabase.from("community_posts").insert({
        place_id: placeId,
        user_id: userId,
        type: file ? "photo" : "comment",
        image_path: imagePath,
        comment: comment.trim() || null,
        status: "pending",
      });
      if (insertError) throw insertError;

      setFile(null);
      setComment("");
      setMessage(fr ? "Merci — votre contribution est en attente de validation." : "Thank you — your contribution is awaiting approval.");
      await loadCommunity(userId);
    } catch (error) {
      if (imagePath) await supabase.storage.from("community-photos").remove([imagePath]);
      console.error(error);
      setMessage(fr ? "Impossible d'envoyer la contribution. Vérifiez l'activation Supabase." : "Could not submit. Check that the Supabase community module is enabled.");
    } finally {
      setSending(false);
    }
  }

  const approved = useMemo(() => posts.filter((post) => post.status === "approved"), [posts]);
  const pendingMine = useMemo(() => posts.filter((post) => post.status === "pending" && post.user_id === userId), [posts, userId]);
  const photos = approved.filter((post) => post.image_path);
  const comments = approved.filter((post) => post.comment);

  function author(post: CommunityPost) {
    return profiles[post.user_id]?.name || (fr ? "Membre LE GOLFE" : "LE GOLFE member");
  }

  return (
    <section className="border-t border-black bg-white text-black">
      <div className="lg-shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:items-end">
          <div>
            <p className="lg-kicker">{fr ? "COMMUNAUTÉ" : "COMMUNITY"} / {fr ? "VU PAR VOUS" : "SEEN BY YOU"}</p>
            <h2 className="lg-title mt-5 text-[15vw] uppercase md:text-[88px]">
              {fr ? <>VOS PHOTOS.<br />VOS MOTS.</> : <>YOUR PHOTOS.<br />YOUR WORDS.</>}
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-black/55">
            {fr
              ? "Une autre vision du lieu, publiée par celles et ceux qui y sont réellement passés. Chaque contribution est modérée avant publication."
              : "Another view of the place, shared by people who were actually there. Every contribution is moderated before publication."}
          </p>
        </div>

        {loading ? (
          <div className="mt-12 h-48 animate-pulse bg-neutral-100" />
        ) : photos.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {photos.slice(0, 8).map((post, index) => {

              return (
                <figure key={post.id} className={`${index === 0 ? "col-span-2 row-span-2" : ""} group overflow-hidden bg-neutral-100`}>
                  <Link href={`/${locale}/member/${post.user_id}`} aria-label={fr?`Voir le profil de ${author(post)}`:`View ${author(post)} profile`} className="block overflow-hidden"><CommunityPhoto path={post.image_path!} alt={post.comment || (fr?"Photo partagée":"Shared photo")} className="h-full min-h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02]" /></Link>
                  <figcaption className="bg-white px-3 py-3"><Link href={`/${locale}/member/${post.user_id}`} className="inline-flex items-center gap-2 text-xs font-bold hover:text-[var(--lg-blue)]">{profiles[post.user_id]?.avatarUrl ? <img src={profiles[post.user_id].avatarUrl!} alt="" className="h-8 w-8 rounded-full object-cover"/> : <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--lg-blue)] text-[10px] text-white">LG</span>}{author(post)} ↗</Link></figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 border-y border-black py-10">
            <p className="text-2xl font-black uppercase tracking-[-.04em]">{fr ? "Pas encore de photos. Soyez le premier." : "No photos yet. Be the first."}</p>
          </div>
        )}

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div>
            <p className="lg-kicker">{fr ? "COMMENTAIRES" : "COMMENTS"}</p>
            <div className="mt-6 border-t border-black">
              {comments.length ? (
                comments.slice(0, 6).map((post) => (
                  <blockquote key={post.id} className="border-b border-black py-5">
                    <p className="text-base font-semibold leading-7 text-black/70">“{post.comment}”</p>
                    <footer className="mt-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.08em] text-black/55">
                      <Link href={`/${locale}/member/${post.user_id}`} className="inline-flex items-center gap-2 hover:text-[var(--lg-blue)]">{profiles[post.user_id]?.avatarUrl ? <img src={profiles[post.user_id].avatarUrl!} alt="" className="h-10 w-10 rounded-full object-cover"/> : <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--lg-blue)] text-white">LG</span>}{author(post)} ↗</Link>
                      <span>· {new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { month: "short", year: "numeric" }).format(new Date(post.created_at))}</span>
                    </footer>
                  </blockquote>
                ))
              ) : (
                <p className="border-b border-black py-5 text-sm font-semibold text-black/40">{fr ? "Aucun commentaire publié pour le moment." : "No published comments yet."}</p>
              )}
            </div>
          </div>

          <div className="border-t border-black pt-6">
            <p className="lg-kicker">{fr ? "CONTRIBUER" : "CONTRIBUTE"}</p>
            {!userId ? (
              <div className="mt-6">
                <p className="max-w-md text-2xl font-black uppercase leading-tight">
                  {fr ? "Un compte est nécessaire pour publier une photo ou un commentaire." : "You need an account to post a photo or comment."}
                </p>
                <Link href={`/${locale}/account?next=/place/${placeId}`} className="lg-btn lg-btn--dark mt-7">
                  {fr ? "Se connecter / s'inscrire" : "Sign in / join"} ↗
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <label className="block cursor-pointer border border-black p-4 text-xs font-black uppercase tracking-[.12em] hover:bg-black hover:text-white">
                  {file ? file.name : fr ? "Ajouter une photo" : "Add a photo"}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => chooseFile(event.target.files?.[0] ?? null)} className="sr-only" />
                </label>

                {preview && (
                  <div className="relative overflow-hidden bg-neutral-100">
                    <img src={preview} alt={fr ? "Aperçu" : "Preview"} className="max-h-[420px] w-full object-cover" />
                    <button type="button" onClick={() => setFile(null)} className="absolute right-3 top-3 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[.12em]">
                      {fr ? "Retirer" : "Remove"}
                    </button>
                  </div>
                )}

                <div>
                  <textarea
                    maxLength={800}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder={fr ? "Votre commentaire…" : "Your comment…"}
                    className="min-h-32 w-full resize-y border border-black p-4 text-base outline-none placeholder:text-black/30"
                  />
                  <p className="mt-1 text-right text-[10px] font-bold text-black/35">{comment.length}/800</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button disabled={sending || (!file && !comment.trim())} className="lg-btn lg-btn--dark disabled:cursor-not-allowed disabled:opacity-30">
                    {sending ? (fr ? "Envoi…" : "Sending…") : fr ? "Envoyer" : "Submit"} ↗
                  </button>
                  <Link href={`/${locale}/account`} className="text-[10px] font-black uppercase tracking-[.12em] underline underline-offset-4">
                    {fr ? "Mon profil" : "My profile"}
                  </Link>
                </div>

                {pendingMine.length > 0 && (
                  <p className="border-l-4 border-black pl-4 text-xs font-bold leading-5 text-black/55">
                    {fr
                      ? `${pendingMine.length} contribution${pendingMine.length > 1 ? "s" : ""} en attente de validation.`
                      : `${pendingMine.length} contribution${pendingMine.length > 1 ? "s" : ""} awaiting approval.`}
                  </p>
                )}
                {message && <p className="text-xs font-bold leading-5 text-black/55">{message}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
