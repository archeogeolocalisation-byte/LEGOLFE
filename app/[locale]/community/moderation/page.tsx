"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SiteHeader from "../../../../components/SiteHeader";
import SiteFooter from "../../../../components/SiteFooter";
import { supabase } from "../../../../lib/supabase";

type Post = {
  id: string;
  place_id: string;
  user_id: string;
  image_path: string | null;
  comment: string | null;
  created_at: string;
};

export default function ModerationPage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "fr" ? "fr" : "en";
  const fr = locale === "fr";
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    const { data: moderator } = await supabase.rpc("is_community_moderator");
    if (!moderator) {
      setAllowed(false);
      return;
    }
    setAllowed(true);
    const { data } = await supabase
      .from("community_posts")
      .select("id,place_id,user_id,image_path,comment,created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    setPosts((data as Post[] | null) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function moderate(post: Post, status: "approved" | "rejected") {
    setBusy(post.id);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("community_posts")
      .update({ status, moderated_at: new Date().toISOString(), moderated_by: auth.user?.id ?? null })
      .eq("id", post.id);

    if (!error && status === "rejected" && post.image_path) {
      await supabase.storage.from("community-photos").remove([post.image_path]);
    }
    if (!error) setPosts((current) => current.filter((item) => item.id !== post.id));
    setBusy(null);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader locale={locale} />
      <section className="lg-shell py-20 md:py-28">
        <p className="lg-kicker">COMMUNITY / MODERATION</p>
        <h1 className="lg-title mt-5 text-[15vw] uppercase md:text-[104px]">{fr ? "À VALIDER." : "TO REVIEW."}</h1>

        {allowed === null && <div className="mt-12 h-48 animate-pulse bg-neutral-100" />}
        {allowed === false && (
          <div className="mt-12 border-y border-black py-10">
            <p className="text-2xl font-black uppercase">{fr ? "Accès réservé aux modérateurs." : "Moderator access only."}</p>
            <Link href={`/${locale}/account`} className="lg-btn mt-7">{fr ? "Retour au compte" : "Back to account"}</Link>
          </div>
        )}
        {allowed && posts.length === 0 && (
          <div className="mt-12 border-y border-black py-10">
            <p className="text-2xl font-black uppercase">{fr ? "Rien à modérer." : "Nothing to review."}</p>
          </div>
        )}
        {allowed && posts.length > 0 && (
          <div className="mt-12 border-t border-black">
            {posts.map((post) => {
              const src = post.image_path ? supabase.storage.from("community-photos").getPublicUrl(post.image_path).data.publicUrl : null;
              return (
                <article key={post.id} className="grid gap-8 border-b border-black py-8 md:grid-cols-[240px_1fr_auto] md:items-start">
                  <div className="bg-neutral-100">
                    {src ? <img src={src} alt="Pending community upload" className="aspect-square h-full w-full object-cover" /> : <div className="flex aspect-square items-center justify-center text-[10px] font-black uppercase tracking-[.12em] text-black/35">Comment</div>}
                  </div>
                  <div>
                    <p className="lg-kicker">{post.place_id}</p>
                    <p className="mt-4 max-w-2xl text-xl font-bold leading-8">{post.comment || (fr ? "Photo sans commentaire." : "Photo without a comment.")}</p>
                    <p className="mt-5 text-[10px] font-black uppercase tracking-[.12em] text-black/35">{new Date(post.created_at).toLocaleString(fr ? "fr-FR" : "en-GB")}</p>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <button disabled={busy === post.id} onClick={() => moderate(post, "approved")} className="lg-btn lg-btn--dark">{fr ? "Approuver" : "Approve"}</button>
                    <button disabled={busy === post.id} onClick={() => moderate(post, "rejected")} className="lg-btn">{fr ? "Refuser" : "Reject"}</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
