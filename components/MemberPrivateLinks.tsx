'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {supabase} from '../lib/supabase';
import type {Locale} from '../lib/i18n';
import ProfileShortcuts from './ProfileShortcuts';

export default function MemberPrivateLinks({memberId,locale}:{memberId:string;locale:Locale}){
 const [viewerId,setViewerId]=useState<string|null>(null);
 useEffect(()=>{
  let active=true,changed=false;
  void supabase.auth.getUser().then(({data,error})=>{if(active&&!changed)setViewerId(error?null:data.user?.id??null);}).catch(()=>{if(active&&!changed)setViewerId(null);});
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{changed=true;if(active)setViewerId(session?.user.id??null);});
  return()=>{active=false;subscription.unsubscribe();};
 },[]);
 if(viewerId!==memberId)return null;
 const fr=locale==='fr';
 return <section className="member-private"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="lg-kicker">{fr?'MON ESPACE PRIVÉ':'MY PRIVATE SPACE'}</p><h2 className="mt-3 text-2xl font-black">{fr?'Mes envies dans le Golfe':'My Golfe plans'}</h2></div><Link href={`/${locale}/account`} className="lg-btn">{fr?'Modifier mon profil':'Edit my profile'} ↗</Link></div><ProfileShortcuts locale={locale}/></section>;
}
