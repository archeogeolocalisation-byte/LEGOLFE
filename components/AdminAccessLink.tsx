"use client";
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {supabase} from '../lib/supabase';

export default function AdminAccessLink({locale}:{locale:'fr'|'en'}){
  const [allowed,setAllowed]=useState(false);
  useEffect(()=>{
    let active=true,generation=0;
    async function check(){
      const ticket=++generation;setAllowed(false);
      try{
        const {data}=await supabase.auth.getSession();if(!data.session)return;
        const result=await fetch('/api/admin?access=1',{headers:{Authorization:`Bearer ${data.session.access_token}`},cache:'no-store'});
        if(active&&ticket===generation)setAllowed(result.ok);
      }catch{/* Hide the link when access cannot be verified. */}
    }
    void check();
    const {data:{subscription}}=supabase.auth.onAuthStateChange(()=>{generation++;setAllowed(false);queueMicrotask(()=>{if(active)void check();});});
    return()=>{active=false;generation++;subscription.unsubscribe();};
  },[]);
  return allowed?<Link href={`/${locale}/admin`} className="lg-btn lg-btn--dark">{locale==='fr'?'Administration':'Administration'} ↗</Link>:null;
}
