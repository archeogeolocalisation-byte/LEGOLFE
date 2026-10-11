"use client";
import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { matchingPasswords } from "../lib/accountTypes";

export default function AccountPasswordForm({ fr, recovery, userId, onSaved }: {
  fr: boolean; recovery: boolean; userId: string; onSaved: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [current, setCurrent] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function save(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (!matchingPasswords(password, confirmation)) {
      setMessage(fr ? "Les mots de passe doivent être identiques et contenir entre 12 et 128 caractères." : "Passwords must match and contain 12 to 128 characters."); return;
    }
    setBusy(true); setMessage("");
    try {
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError || data.user?.id !== userId) { setMessage(fr ? "Reconnectez-vous avant de modifier le mot de passe." : "Sign in again before changing your password."); return; }
      const { error } = await supabase.auth.updateUser({ password, ...(!recovery && current ? { current_password: current } : {}) });
      if (error) setMessage(fr ? "Modification impossible. Vérifiez votre mot de passe actuel ou demandez un nouvel email de récupération." : "Unable to update. Check your current password or request a new recovery email.");
      else { setPassword(""); setConfirmation(""); setCurrent(""); onSaved(); }
    } catch { setMessage(fr ? "Service indisponible. Réessayez." : "Service unavailable. Please try again."); }
    finally { setBusy(false); }
  }
  return <form onSubmit={save} className="mt-10 border-t border-black/20 pt-8" aria-label={fr ? "Nouveau mot de passe" : "New password"}>
    <h2 className="text-2xl font-black">{fr ? "Définir un mot de passe" : "Set a password"}</h2>
    {!recovery && <label className="mt-5 block text-sm font-bold">{fr ? "Mot de passe actuel, si vous en avez déjà un" : "Current password, if you already have one"}
      <input type="password" autoComplete="current-password" value={current} onChange={event => setCurrent(event.target.value)} className="mt-2 h-12 w-full border-b border-black bg-transparent outline-none" />
    </label>}
    <label className="mt-5 block text-sm font-bold">{fr ? "Nouveau mot de passe — 12 caractères minimum" : "New password — at least 12 characters"}
      <input required type="password" autoComplete="new-password" minLength={12} maxLength={128} value={password} onChange={event => setPassword(event.target.value)} className="mt-2 h-12 w-full border-b border-black bg-transparent outline-none" />
    </label>
    <label className="mt-5 block text-sm font-bold">{fr ? "Confirmer le mot de passe" : "Confirm password"}
      <input required type="password" autoComplete="new-password" minLength={12} maxLength={128} value={confirmation} onChange={event => setConfirmation(event.target.value)} className="mt-2 h-12 w-full border-b border-black bg-transparent outline-none" />
    </label>
    <button disabled={busy} className="lg-btn lg-btn--dark mt-6 disabled:opacity-40">{busy ? (fr ? "Enregistrement…" : "Saving…") : (fr ? "Enregistrer le mot de passe" : "Save password")}</button>
    <p role="status" aria-live="polite" className="mt-4 text-sm font-bold text-black/65">{message}</p>
  </form>;
}
