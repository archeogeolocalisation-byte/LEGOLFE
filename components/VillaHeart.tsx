'use client';

import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {supabase} from '../lib/supabase';
import {villaHeartRequest,type VillaHeartSummary} from '../lib/villaHearts';
import {villaHref} from '../lib/villaPaths';
import type {Locale} from '../lib/i18n';

export default function VillaHeart({id,locale}:{id:string;locale:Locale}){
 const fr=locale==='fr';
 const [summary,setSummary]=useState<VillaHeartSummary|null>(null);
 const [state,setState]=useState<'loading'|'ready'|'hidden'|'error'>('loading');
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const generation=useRef(0),lock=useRef<number|null>(null);
 useEffect(()=>{
  let timer:ReturnType<typeof setTimeout>|undefined;
  function invalidate(){generation.current++;lock.current=null;}
  async function refresh(){
   const ticket=++generation.current;
   try{const next=await villaHeartRequest(id);if(ticket===generation.current){setSummary(next);setState('ready');setError('');setBusy(false);}}
   catch(e){if(ticket===generation.current){setSummary(null);setState(e instanceof Error&&e.message==='HEART_NOT_ENABLED'?'hidden':'error');}}
  }
  void refresh();
  const {data:{subscription}}=supabase.auth.onAuthStateChange(()=>{
   // Invalidate pending writes immediately, then read outside the Auth callback.
   invalidate();setSummary(null);setState('loading');setError('');setBusy(false);
   clearTimeout(timer);timer=setTimeout(()=>void refresh(),0);
  });
  return()=>{invalidate();clearTimeout(timer);subscription.unsubscribe();};
 },[id]);
 async function vote(){
  if(lock.current!==null||!summary?.canVote)return;
  const ticket=generation.current;lock.current=ticket;setBusy(true);setError('');
  try{const next=await villaHeartRequest(id,!summary.liked);if(ticket===generation.current)setSummary(next);}
  catch{if(ticket===generation.current)setError(fr?'Le vote n’a pas pu être confirmé. Réessayez.':'Your vote could not be confirmed. Please retry.');}
  finally{if(lock.current===ticket)lock.current=null;if(ticket===generation.current)setBusy(false);}
 }
 if(state==='hidden')return null;
 return <section className="villa-heart" aria-label={fr?'Les coups de cœur':'Community favourites'}>
  <p className="lg-kicker">{fr?'LE CHOIX DES ENVIES':'FOLLOW YOUR HEART'}</p>
  <h3 className="mt-3 text-xl font-bold">{fr?'Elle vous fait envie ?':'Does this home inspire you?'}</h3>
  <p className="mt-2 text-xs leading-6 text-[#385765]">{fr?'Le coup de cœur exprime une envie de séjour, pas un avis après location.':'A heart expresses interest in staying here, not a review after a stay.'}</p>
  {state==='loading'?<p role="status" className="mt-4 text-xs">{fr?'Chargement des coups de cœur…':'Loading community favourites…'}</p>:state==='error'?<p role="status" className="mt-4 text-xs">{fr?'Les coups de cœur sont momentanément indisponibles.':'Community favourites are temporarily unavailable.'}</p>:summary&&<>
   {summary.canVote?<button type="button" onClick={()=>void vote()} disabled={busy} aria-pressed={summary.liked} className={`lg-btn mt-4 w-full ${summary.liked?'lg-btn--dark':''}`}><span aria-hidden="true">{summary.liked?'♥':'♡'}</span> {busy?(fr?'Enregistrement…':'Saving…'):summary.liked?(fr?'Mon coup de cœur':'My favourite'):(fr?'Coup de cœur':'Give a heart')}</button>:!summary.signedIn?<Link href={`/${locale}/account?next=${encodeURIComponent(villaHref(id,locale))}`} className="lg-btn mt-4 w-full">♡ {fr?'Se connecter pour voter':'Sign in to give a heart'}</Link>:<p className="mt-4 text-xs leading-6">{fr?'Les coups de cœur de votre maison sont réservés aux autres membres.':'Hearts for your own home are reserved for other members.'}</p>}
   <p className="mt-3 text-xs font-semibold" role="status" aria-live="polite">{summary.count>0?`${summary.count} ${fr?(summary.count===1?'coup de cœur':'coups de cœur'):(summary.count===1?'heart':'hearts')}`:(fr?'Les premiers coups de cœur restent à écrire.':'Be part of the first community favourites.')}</p>
   {summary.liked&&<p className="mt-2 text-xs leading-6">{fr?'Touchez à nouveau le bouton pour retirer votre vote.':'Tap again to remove your heart.'}</p>}
  </>}
  {error&&<p role="alert" className="mt-3 text-xs font-semibold text-red-800">{error}</p>}
 </section>;
}
