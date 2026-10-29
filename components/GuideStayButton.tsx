'use client';
import {useEffect,useState} from 'react';
import type {Locale} from '../lib/i18n';
const key='le-golfe-saved-places';
export function savedPlaceIds(raw:string|null):string[]{
 const value:unknown=raw?JSON.parse(raw):[];
 return Array.isArray(value)?value.filter((id):id is string=>typeof id==='string'):[];
}
export default function GuideStayButton({ids,locale}:{ids:string[];locale:Locale}){
 const fr=locale==='fr';
 const [saved,setSaved]=useState(false),[error,setError]=useState('');
 const signature=JSON.stringify(ids);
 useEffect(()=>{
  const selected:string[]=JSON.parse(signature);
  const refresh=()=>{try{const current=savedPlaceIds(window.localStorage.getItem(key));setSaved(selected.length>0&&selected.every(id=>current.includes(id)));}catch{setSaved(false);}};
  refresh();window.addEventListener('storage',refresh);window.addEventListener('le-golfe:saved-places',refresh);
  return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('le-golfe:saved-places',refresh);};
 },[signature]);
 function save(){
  try{
   const current=savedPlaceIds(window.localStorage.getItem(key));
   window.localStorage.setItem(key,JSON.stringify([...new Set([...current,...ids])]));
   setSaved(true);setError('');window.dispatchEvent(new Event('le-golfe:saved-places'));
  }catch{setError(fr?'Impossible d’enregistrer sur cet appareil. Réessayez ou ouvrez les fiches des lieux.':'Could not save on this device. Try again or open the place pages.');}
 }
 return <div><button type="button" className="lg-btn" onClick={save} disabled={saved||ids.length===0}>{saved?(fr?'Lieux enregistrés ✓':'Places saved ✓'):(fr?'Garder ces lieux dans Mon séjour':'Save these places in My stay')} {!saved&&'+'}</button>{error&&<p role="alert" className="mt-3 text-sm">{error}</p>}<span role="status" className="sr-only">{saved?(fr?'Ces lieux sont dans Mon séjour.':'These places are in My stay.'):''}</span></div>;
}
