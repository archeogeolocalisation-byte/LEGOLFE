import {agendaTowns} from '../data/agendaTowns';
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function sourceTownSlug(location:string){return Object.entries(agendaTowns).find(([,name])=>normalize(name)===normalize(location))?.[0];}
export function agendaTownSlug(location:string){const slug=sourceTownSlug(location);return slug==='rayol-canadel-sur-mer'?'rayol-canadel':slug;}
export function agendaTownHref(location:string,locale:'fr'|'en'){const slug=agendaTownSlug(location);return slug?`/${locale}/destinations/${slug}`:undefined;}
