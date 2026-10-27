'use client';
import {useEffect,useState} from 'react';

const key='le-golfe-saved-villas';
const event='le-golfe:saved-villas';
export function readSavedVillaIds():string[]{
 const value:unknown=JSON.parse(window.localStorage.getItem(key)||'[]');
 return Array.isArray(value)?value.filter((id):id is string=>typeof id==='string'):[];
}
export function toggleSavedVilla(id:string){
 const ids=readSavedVillaIds();
 const next=ids.includes(id)?ids.filter(value=>value!==id):[...ids,id];
 window.localStorage.setItem(key,JSON.stringify(next));
 window.dispatchEvent(new Event(event));
 return next.includes(id);
}
export function useSavedVilla(id:string){
 const [saved,setSaved]=useState(false),[saveError,setSaveError]=useState(false);
 useEffect(()=>{
  function refresh(){try{setSaved(readSavedVillaIds().includes(id));}catch{setSaved(false);}}
  refresh();window.addEventListener(event,refresh);window.addEventListener('storage',refresh);
  return()=>{window.removeEventListener(event,refresh);window.removeEventListener('storage',refresh);};
 },[id]);
 function toggle(){try{setSaved(toggleSavedVilla(id));setSaveError(false);}catch{setSaveError(true);}}
 return {saved,saveError,toggle};
}
