'use client';
import {useRef,useState} from 'react';
import {villaEnquiryDraft,type VillaEnquiryDraftValues} from '../lib/villaEnquiryDraft';
import type {Locale} from '../lib/i18n';
import styles from './VillaEnquiryDraft.module.css';
export default function VillaEnquiryDraft({villa,locale}:{villa:{name:string;location:string;guests:number};locale:Locale}){
 const fr=locale==='fr', [values,setValues]=useState<VillaEnquiryDraftValues>({period:'',guests:String(Math.min(2,villa.guests)),details:''}),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 const preview=useRef<HTMLTextAreaElement>(null),revision=useRef(0),draft=villaEnquiryDraft(villa,values,locale);
 function change(key:keyof VillaEnquiryDraftValues,value:string){revision.current++;setStatus('');setValues(previous=>({...previous,[key]:value}));}
 async function copy(){
  if(!draft){setStatus(fr?'Choisissez un nombre de voyageurs adapté à la maison.':'Choose a guest count within the home’s capacity.');return;}
  const ticket=revision.current;setBusy(true);setStatus('');
  try{await navigator.clipboard.writeText(draft);if(ticket===revision.current)setStatus(fr?'Message copié. Vous pouvez le coller dans votre échange avec le propriétaire.':'Message copied. Paste it into your conversation with the owner.');}
  catch{if(ticket===revision.current){preview.current?.focus();preview.current?.select();setStatus(fr?'La copie automatique est indisponible. Le texte est sélectionné : copiez-le manuellement.':'Automatic copying is unavailable. The text is selected: copy it manually.');}}
  finally{setBusy(false);}
 }
 return <details className={styles.draft}><summary>{fr?'Préparer mon message':'Prepare my message'}</summary><p className={styles.intro}>{fr?'Quelques repères pour faciliter le premier échange. Préparez votre message, puis copiez-le pour l’envoyer vous-même.':'A few details make the first conversation easier. Prepare your message, then copy it to send it yourself.'}</p>
  <label>{fr?'Période envisagée · facultatif':'Preferred period · optional'}<input type="text" maxLength={100} value={values.period} placeholder={fr?'Ex. : une semaine en juillet':'E.g. one week in July'} onChange={e=>change('period',e.target.value)}/></label>
  <label>{fr?'Nombre de voyageurs':'Number of guests'}<select value={values.guests} onChange={e=>change('guests',e.target.value)}>{Array.from({length:villa.guests},(_,i)=><option key={i+1} value={String(i+1)}>{i+1}</option>)}</select></label>
  <label>{fr?'Vos questions · facultatif':'Your questions · optional'}<textarea rows={3} maxLength={600} value={values.details} placeholder={fr?'Un lit bébé, un animal, une arrivée tardive…':'A cot, a pet, a late arrival…'} onChange={e=>change('details',e.target.value)}/></label>
  <label>{fr?'Votre message à copier':'Your message to copy'}<textarea ref={preview} readOnly rows={10} value={draft} className={styles.preview}/></label>
  <button type="button" disabled={busy} onClick={()=>void copy()}>{busy?(fr?'Copie…':'Copying…'):(fr?'Copier mon message':'Copy my message')}</button><p role="status" aria-live="polite" className={styles.status}>{status}</p>
  <p className={styles.note}>{fr?'Aucun envoi automatique. Ce brouillon n’est pas enregistré sur le site et ne confirme ni disponibilité ni réservation. Connectez-vous pour consulter les coordonnées partagées plus haut.':'Nothing is sent automatically. This draft is not saved on the site and does not confirm availability or a booking. Sign in to view the shared contact details above.'}</p>
 </details>;
}
