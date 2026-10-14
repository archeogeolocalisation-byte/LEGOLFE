"use client";
import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { matchingPasswords } from "../lib/accountTypes";

type Mode = "signin" | "signup" | "reset";

export default function AccountAuthForm({ locale, onAuthenticated }: {
  locale: "fr" | "en"; onAuthenticated: () => void;
}) {
  const fr = locale === "fr";
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  function switchMode(value: Mode) {
    setMode(value); setPassword(""); setConfirmation(""); setMessage("");
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setMessage("");
    if (mode === "signup" && !matchingPasswords(password, confirmation)) {
      setMessage(fr ? "Les mots de passe doivent être identiques et contenir entre 12 et 128 caractères." : "Passwords must match and contain 12 to 128 characters."); return;
    }
    if (mode === "signup" && (name.trim().length < 2 || name.trim().length > 40)) {
      setMessage(fr ? "Choisissez un nom public entre 2 et 40 caractères." : "Choose a public name between 2 and 40 characters."); return;
    }
    setBusy(true);
    // Exact callback path, no free destination or next query in the email URL.
    const redirectTo = window.location.origin + "/" + locale + "/account";
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectTo + "/password" });
        setMessage(error ? (fr ? "Impossible d'envoyer l'email. Réessayez dans quelques instants." : "Unable to send email. Please try again shortly.") : (fr ? "Si un compte correspond à cette adresse, un email vous permettra de définir un nouveau mot de passe." : "If this address has an account, an email will let you set a new password."));
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { emailRedirectTo: redirectTo, data: { legolfe_display_name: name.trim() } },
        });
        if (error) {
          setMessage(error.code === "weak_password" ? (fr ? "Ce mot de passe ne respecte pas les règles de sécurité. Choisissez-en un autre." : "This password does not meet the security requirements. Choose another.") : (fr ? "Inscription impossible. Si vous avez déjà un compte, connectez-vous ou utilisez « Mot de passe oublié »." : "Unable to sign up. If you already have an account, sign in or use Forgot password."));
        } else {
          setPassword(""); setConfirmation("");
          if (data.session) onAuthenticated();
          else setMessage(fr ? "Consultez votre email pour confirmer l'inscription. Si vous avez déjà un compte, connectez-vous ou utilisez « Mot de passe oublié »." : "Check your email to confirm signup. If you already have an account, sign in or use Forgot password.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) setMessage(error.code === "email_not_confirmed" ? (fr ? "Confirmez votre email avant de vous connecter." : "Confirm your email before signing in.") : (fr ? "Connexion impossible. Vérifiez votre email et votre mot de passe, ou utilisez « Mot de passe oublié »." : "Unable to sign in. Check your email and password, or use Forgot password."));
        else { setPassword(""); onAuthenticated(); }
      }
    } catch { setMessage(fr ? "Connexion au service impossible. Réessayez." : "Unable to reach the service. Please try again."); }
    finally { setBusy(false); }
  }
  return <div>
    <div className="flex gap-6 border-b border-black/20 pb-4">
      {(["signin", "signup"] as const).map(value => <button key={value} type="button" disabled={busy} aria-pressed={mode === value} onClick={() => switchMode(value)} className={"text-sm font-black " + (mode === value ? "underline underline-offset-8" : "text-black/50")}>
        {value === "signin" ? (fr ? "Se connecter" : "Sign in") : (fr ? "Créer un compte" : "Create an account")}
      </button>)}
    </div>
    <form onSubmit={submit} className="mt-6" aria-label={fr ? "Accès au compte" : "Account access"}>
      {mode === "reset" && <h2 className="mb-5 text-2xl font-black">{fr ? "Mot de passe oublié" : "Forgot password"}</h2>}
      {mode === "signup" && <label className="block text-sm font-bold">{fr ? "Nom public" : "Public name"}
        <input required minLength={2} maxLength={40} autoComplete="nickname" value={name} onChange={event => setName(event.target.value)} className="mb-6 mt-2 h-12 w-full border-b border-black bg-transparent text-lg outline-none" />
      </label>}
      <label className="block text-sm font-bold">{fr?"E-mail":"Email"}
        <input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-2 h-12 w-full border-b border-black bg-transparent text-lg outline-none" />
      </label>
      {mode !== "reset" && <label className="mt-6 block text-sm font-bold">{fr ? "Mot de passe" : "Password"}
        <input required type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 12 : undefined} maxLength={mode === "signup" ? 128 : undefined} value={password} onChange={event => setPassword(event.target.value)} className="mt-2 h-12 w-full border-b border-black bg-transparent text-lg outline-none" />
      </label>}
      {mode === "signup" && <>
        <p className="mt-2 text-sm text-black/60">{fr ? "12 caractères minimum. Une phrase de passe fonctionne aussi." : "At least 12 characters. A passphrase works too."}</p>
        <label className="mt-6 block text-sm font-bold">{fr ? "Confirmer le mot de passe" : "Confirm password"}
          <input required type="password" autoComplete="new-password" minLength={12} maxLength={128} value={confirmation} onChange={event => setConfirmation(event.target.value)} className="mt-2 h-12 w-full border-b border-black bg-transparent text-lg outline-none" />
        </label>
      </>}
      <button disabled={busy} className="lg-btn lg-btn--dark mt-6 disabled:opacity-40">
        {busy ? (fr ? "Veuillez patienter…" : "Please wait…") : mode === "signup" ? (fr ? "Créer mon compte" : "Create my account") : mode === "reset" ? (fr ? "Envoyer l'email" : "Send email") : (fr ? "Se connecter" : "Sign in")} ↗
      </button>
      {mode === "signin" && <button type="button" disabled={busy} onClick={() => switchMode("reset")} className="mt-5 block text-sm font-bold underline underline-offset-4">{fr ? "Mot de passe oublié / premier mot de passe" : "Forgot password / set your first password"}</button>}
      <p role="status" aria-live="polite" className="mt-4 text-sm font-bold text-black/65">{message}</p>
    </form>
  </div>;
}
