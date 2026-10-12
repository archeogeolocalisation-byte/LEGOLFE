"use client";
import {useState} from 'react';
import type {Property} from './HostDesk';

export default function RecoverLocalDrafts({fr,currentIds,onRecover}:{fr:boolean;currentIds:string[];onRecover:(property:Property)=>void}){
  const [drafts,setDrafts]=useState<Property[]|null>(null);const [error,setError]=useState('');
  function scan(){
    try{
      const found=new Map<string,Property>();
      // Only pre-account drafts; never inspect another signed-in account's storage.
      for(const key of ['legolfe_host_properties','legolfe_host_properties:anonymous']){
        const rows:unknown=JSON.parse(localStorage.getItem(key)||'[]');
        if(Array.isArray(rows))for(const row of rows){
          if(row&&typeof row.id==='string'&&row.id.startsWith('property-')&&typeof row.name==='string'&&row.online!==true&&!currentIds.includes(row.id))found.set(row.id,row);
        }
      }
      setDrafts([...found.values()]);setError('');
    }catch{setError(fr?'Impossible de lire les anciens brouillons sur cet appareil.':'Unable to read older drafts on this device.');}
  }
  return <details className="mt-6 border border-black/20 p-5"><summary className="cursor-pointer text-sm font-bold">{fr?'Une annonce manque ? Retrouver un ancien brouillon':'Missing a listing? Find an older draft'}</summary><p className="mt-4 max-w-2xl text-sm leading-6">{fr?'Si vous avez créé la maison avant de vous connecter, son brouillon peut être conservé sur ce navigateur. Faites cette recherche sur l’appareil et le navigateur utilisés lors de sa création. Les annonces en ligne sont chargées depuis votre compte ; une annonce rattachée à un autre compte nécessite l’intervention de l’administrateur.':'If you created the home before signing in, its draft may be saved in this browser. Search on the device and browser you originally used. Online listings load from your account; a listing assigned to another account requires administrator assistance.'}</p><button type="button" className="lg-btn mt-4" onClick={scan}>{fr?'Chercher sur cet appareil':'Search this device'}</button>{error&&<p role="alert" className="mt-4 text-sm">{error}</p>}{drafts&&<div className="mt-4">{drafts.length===0?<p role="status" className="text-sm">{fr?'Aucun ancien brouillon trouvé ici. Essayez le navigateur d’origine.':'No older drafts found here. Try the original browser.'}</p>:drafts.map(p=><div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-black/20 py-4"><span className="text-sm font-bold">{p.name}</span><button type="button" className="lg-btn" onClick={()=>{onRecover({...p,id:`property-${crypto.randomUUID()}`,online:false,status:'draft',visibility:'private'});setDrafts(rows=>rows?.filter(row=>row.id!==p.id)||[]);}}>{fr?'Copier dans mes brouillons':'Copy to my drafts'}</button></div>)}</div>}</details>;
}
