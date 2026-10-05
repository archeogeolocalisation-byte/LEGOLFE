"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { supabase } from "../../../lib/supabase";

export default function AccountPage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "fr" ? "fr" : "en";
  const fr = locale === "fr";
  const [next, setNext] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [ready, setReady] = useState(false);

  async function hydrate() {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    setUserId(user?.id ?? null);
    setUserEmail(user?.email ?? "");
    if (user) {
      const { data: profile } = await supabase
        .from("community_profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .maybeSingle();
      setDisplayName(profile?.display_name ?? (user.email?.split("@")[0] || ""));
      const { data: isModerator } = await supabase.rpc("is_community_moderator");
      setModerator(Boolean(isModerator));
    } else {
      setDisplayName("");
      setModerator(false);
    }
    setReady(true);
  }

  useEffect(() => {
    setNext(new URLSearchParams(window.location.search).get("next") || "");
    hydrate();
    const { data: listener } = supabase.auth.onAuthStateChange(() => hydrate());
    return () => listener.subscription.unsubscribe();
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const redirectTo = `${window.location.origin}/${locale}/account${next ? `?next=${encodeURIComponent(next)}` : ""}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setMessage(
      error
        ? fr
          ? "Impossible d'envoyer le lien."
          : "Could not send the link."
        : fr
          ? "Lien de connexion envoyé par email."
          : "Sign-in link sent by email.",
    );
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    if (!userId) return;
    const cleanName = displayName.trim();
    if (cleanName.length < 2 || cleanName.length > 40) {
      setMessage(fr ? "Choisissez un nom entre 2 et 40 caractères." : "Choose a name between 2 and 40 characters.");
      return;
    }
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("community_profiles").upsert({
      user_id: userId,
      display_name: cleanName,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setMessage(
      error
        ? fr
          ? "Impossible d'enregistrer le profil. Vérifiez le SQL V10."
          : "Could not save the profile. Check the V10 SQL."
        : fr
          ? "Profil enregistré."
          : "Profile saved.",
    );
  }

  if (!ready) {
    return <main className="min-h-screen bg-white"><SiteHeader locale={locale} /><div className="lg-shell py-24"><div className="h-48 animate-pulse bg-neutral-100" /></div></main>;
  }

  if (!userId) {
    return (
      <main className="min-h-screen bg-white text-black">
        <SiteHeader locale={locale} />
        <section className="lg-shell py-20 md:py-28">
          <p className="lg-kicker">COMMUNITY / ACCOUNT</p>
          <h1 className="lg-display mt-6 text-[17vw] md:text-[130px]">{fr ? <>REJOINDRE<br />LE GOLFE.</> : <>JOIN<br />LE GOLFE.</>}</h1>
          <div className="mt-12 grid gap-10 border-t border-black pt-8 md:grid-cols-2">
            <p className="max-w-lg text-xl font-bold leading-8">
              {fr
                ? "Un compte gratuit suffit pour partager vos photos et commentaires sur les fiches."
                : "A free account lets you share photos and comments on place pages."}
            </p>
            <form onSubmit={login}>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className="h-14 w-full border-b border-black bg-transparent text-xl font-bold outline-none"
              />
              <button className="lg-btn lg-btn--dark mt-5">{fr ? "Recevoir mon lien" : "Email me a sign-in link"} ↗</button>
              {message && <p className="mt-4 text-sm font-bold text-black/55">{message}</p>}
            </form>
          </div>
        </section>
        <SiteFooter locale={locale} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader locale={locale} />
      <section className="lg-shell py-20 md:py-28">
        <p className="lg-kicker">COMMUNITY / ACCOUNT</p>
        <h1 className="lg-title mt-5 text-[15vw] uppercase md:text-[104px]">{fr ? "MON PROFIL." : "MY PROFILE."}</h1>
        <div className="mt-12 grid gap-14 border-t border-black pt-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="lg-kicker">{fr ? "COMPTE" : "ACCOUNT"}</p>
            <p className="mt-5 text-xl font-black">{userEmail}</p>
            <button
              className="mt-7 text-[10px] font-black uppercase tracking-[.14em] underline underline-offset-4"
              onClick={async () => {
                await supabase.auth.signOut();
                location.reload();
              }}
            >
              {fr ? "Se déconnecter" : "Sign out"}
            </button>
          </div>

          <form onSubmit={saveProfile}>
            <p className="lg-kicker">{fr ? "NOM PUBLIC" : "PUBLIC NAME"}</p>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-black/50">
              {fr
                ? "C'est ce nom qui apparaîtra sous vos commentaires. Votre email n'est jamais affiché publiquement."
                : "This name appears under your comments. Your email is never shown publicly."}
            </p>
            <input
              minLength={2}
              maxLength={40}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-7 h-14 w-full border-b border-black bg-transparent text-3xl font-black tracking-[-.04em] outline-none"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <button disabled={saving} className="lg-btn lg-btn--dark disabled:opacity-40">{saving ? (fr ? "Enregistrement…" : "Saving…") : fr ? "Enregistrer" : "Save"}</button>
              {next && <Link className="lg-btn" href={`/${locale}${next}`}>{fr ? "Retour à la fiche" : "Back to place"} ↗</Link>}
              {moderator && <Link className="lg-btn" href={`/${locale}/community/moderation`}>{fr ? "Modération" : "Moderation"} ↗</Link>}
            </div>
            {message && <p className="mt-4 text-sm font-bold text-black/55">{message}</p>}
          </form>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
