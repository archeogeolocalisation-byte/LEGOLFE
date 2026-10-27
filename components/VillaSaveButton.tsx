'use client';
import type {Locale} from '../lib/i18n';
import {useSavedVilla} from '../lib/useSavedVilla';

export default function VillaSaveButton({id,name,locale}:{id:string;name:string;locale:Locale}){
 const {saved,saveError,toggle}=useSavedVilla(id),fr=locale==='fr';
 const label=saved?(fr?`Retirer ${name} de Mon séjour`:`Remove ${name} from My stay`):(fr?`Enregistrer ${name} dans Mon séjour`:`Save ${name} to My stay`);
 return <div className="villa-card-save"><button type="button" className="villa-save-button" aria-label={label} title={label} aria-pressed={saved} onClick={toggle}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill={saved?'currentColor':'none'} stroke="currentColor" strokeWidth="1.7"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>{saveError&&<p role="alert" className="villa-save-error">{fr?'Enregistrement impossible. Autorisez le stockage de votre navigateur puis réessayez.':'Unable to save. Allow browser storage and try again.'}</p>}</div>;
}
