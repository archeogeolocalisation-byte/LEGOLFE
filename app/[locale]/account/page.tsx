"use client";

import { safeReturnPath } from "../../../lib/security";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { supabase } from "../../../lib/supabase";
import AccountAuthForm from "../../../components/AccountAuthForm";
import AccountPasswordForm from "../../../components/AccountPasswordForm";
import AdminAccessLink from "../../../components/AdminAccessLink";
import ProfileDetails from "../../../components/ProfileDetails";

export default function AccountPage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "fr" ? "fr" : "en";
  const fr = locale === "fr";
  const [next, setNext] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const activeUser = useRef<string | null>(null);

  const generation=useRef(0);
  async function hydrate() {
    const ticket=++generation.current;
    const { data } = await supabase.auth.getUser();
    if(ticket!==generation.current)return;
    const user = data.user;
    activeUser.current = user?.id ?? null;
    setUserId(user?.id ?? null);
    setUserEmail(user?.email ?? "");
    if (user) {
      const [profileResult, moderatorResult] = await Promise.all([
        supabase.from("community_profiles").select("display_name").eq("user_id", user.id).maybeSingle(),
        supabase.rpc("is_community_moderator"),
      ]);
      const profile = profileResult.data;
      const isModerator = moderatorResult.data;
      if(ticket!==generation.current)return;
      const savedName = user.user_metadata?.legolfe_display_name;
      setDisplayName(profile?.display_name ?? (typeof savedName === "string" ? savedName.slice(0,40) : ""));
      if(ticket!==generation.current)return;
      setModerator(Boolean(isModerator));
    } else {
      setDisplayName("");
      setModerator(false);
    }
    setReady(true);
  }

  useEffect(() => {
    let active=true;
    queueMicrotask(() => {
      if (!active) return;
      if(window.location.pathname.endsWith("/account/password")) {setRecovery(true);setShowPassword(true);}
      setNext(safeReturnPath(new URLSearchParams(window.location.search).get("next")));
      void hydrate();
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if(event === "PASSWORD_RECOVERY") {setRecovery(true);setShowPassword(true);}
      if(event === "SIGNED_OUT") {setRecovery(false);setShowPassword(false);}
      const nextUser = session?.user.id ?? null;
      if (nextUser === activeUser.current && event !== "SIGNED_OUT") return;
      activeUser.current = nextUser;
      generation.current++;setUserId(null);setUserEmail("");setDisplayName("");setModerator(false);setReady(false);
      queueMicrotask(() => {if(active)void hydrate();});
    });
    return () => {active=false;generation.current++;listener.subscription.unsubscribe();};
  }, []);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    if (!userId) return;
    const cleanName = displayName.trim();
    if (cleanName.length < 2 || cleanName.length > 40) {
      setMessage(fr ? "Choisissez un nom entre 2 et 40 caractères." : "Choose a name between 2 and 40 characters.");
      return;
    }
    const actor = userId;
    setSaving(true); setMessage("");
    try {
      const { error: profileError } = await supabase.from("community_profiles").upsert({
        user_id: actor, display_name: cleanName, updated_at: new Date().toISOString(),
      });
      if(activeUser.current !== actor)return;
      if(profileError) {setMessage(fr ? "Impossible d'enregistrer le nom public. Réessayez." : "Unable to save your public name. Please try again.");return;}
      const { error } = await supabase.auth.updateUser({data:{legolfe_display_name:cleanName}});
      if(activeUser.current !== actor)return;
      setMessage(error ? (fr ? "Nom enregistré, mais la synchronisation du compte a échoué. Réessayez." : "Name saved, but account sync failed. Please try again.") : (fr ? "Profil enregistré." : "Profile saved."));
    } catch { if(activeUser.current === actor)setMessage(fr ? "Service indisponible. Réessayez." : "Service unavailable. Please try again."); }
    finally {setSaving(false);}
  }

  if (!ready) {
    return <main className="min-h-screen bg-white"><SiteHeader locale={locale} path="/account" /><div className="lg-shell py-24"><div className="h-48 animate-pulse bg-neutral-100" /></div></main>;
  }

  if (!userId) {
    return (
      <main className="min-h-screen bg-white text-black">
        <SiteHeader locale={locale} path="/account" />
        <section className="lg-shell py-20 md:py-28">
          <p className="lg-kicker">{fr ? "COMMUNAUTÉ / COMPTE" : "COMMUNITY / ACCOUNT"}</p>
          <h1 className="lg-menu-title mt-6">{fr ? <>REJOINDRE<br />LE GOLFE.</> : <>JOIN<br />LE GOLFE.</>}</h1>
          <div className="mt-12 grid gap-10 border-t border-black pt-8 md:grid-cols-2">
            <p className="max-w-lg text-xl font-bold leading-8">
              {fr
                ? "Rejoignez la communauté du Golfe de Saint-Tropez. Un compte pour découvrir, enregistrer vos adresses préférées et partager vos expériences."
                : "Join the Golfe de Saint-Tropez community. One account to discover places, save favorites and share experiences."}
            </p>
            <AccountAuthForm locale={locale} onAuthenticated={() => {void hydrate();}} />
          </div>
        </section>
        <SiteFooter locale={locale} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader locale={locale} path="/account" />
      <section className="lg-shell py-20 md:py-28">
        <p className="lg-kicker">{fr ? "COMMUNAUTÉ / COMPTE" : "COMMUNITY / ACCOUNT"}</p>
        <h1 className="lg-menu-title mt-5">{fr ? "MON PROFIL." : "MY PROFILE."}</h1>
        <div className="mt-12 grid gap-14 border-t border-black pt-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="lg-kicker">{fr ? "COMPTE" : "ACCOUNT"}</p>
            <p className="mt-5 break-all text-xl font-black">{userEmail}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AdminAccessLink locale={locale}/>
              <Link className="lg-btn" href={"/"+locale+"/saved"}>{fr ? "Mon séjour" : "My stay"} ↗</Link>
              <Link className="lg-btn lg-btn--dark" href={"/"+locale+"/host"}>{fr ? "Mes annonces" : "My listings / Host"} ↗</Link>
            </div>
            <button type="button" onClick={() => setShowPassword(value => !value)} className="mt-7 block text-sm font-bold underline underline-offset-4">{fr ? "Définir / modifier mon mot de passe" : "Set / change my password"}</button>
            {showPassword && <AccountPasswordForm key={userId} userId={userId} fr={fr} recovery={recovery} onSaved={() => {setShowPassword(false);setRecovery(false);setMessage(fr ? "Mot de passe enregistré." : "Password saved.");}} />}
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

          <div>
            <ProfileDetails key={userId} userId={userId} fr={fr} />
          <form onSubmit={saveProfile}>
            <p className="lg-kicker">{fr ? "NOM PUBLIC" : "PUBLIC NAME"}</p>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-black/50">
              {fr
                ? "C'est ce nom qui apparaîtra sous vos commentaires. Votre email n'est jamais affiché publiquement."
                : "This name appears under your comments. Your email is never shown publicly."}
            </p>
            <label htmlFor="public-name" className="sr-only">{fr ? "Nom public" : "Public name"}</label>
            <input
              id="public-name"
              required
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
            {message && <p role="status" aria-live="polite" className="mt-4 text-sm font-bold text-black/55">{message}</p>}
          </form>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
