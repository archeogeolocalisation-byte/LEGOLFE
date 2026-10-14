"use client";
import Link from 'next/link';
import {FormEvent,useEffect,useRef,useState} from 'react';
import {supabase} from '../lib/supabase';
import AdminModeration from './AdminModeration';
type Listing={id:string;owner_id:string;ownerEmail:string;status:string;visibility:string;created_at:string;payload:Record<string,unknown>};
type Member={id:string;email:string;name:string;role:string;protected:boolean;createdAt:string;confirmed:boolean};
const errors:Record<string,[string,string]>={SIGN_IN_REQUIRED:['Connectez-vous à votre compte administrateur.','Sign in with your administrator account.'],ADMIN_REQUIRED:['Ce compte n’a pas accès à l’administration.','This account cannot access administration.'],ADMIN_NOT_CONFIGURED:['L’administration doit encore être activée pour ce site.','Administration still needs to be enabled for this site.'],OWNER_NOT_FOUND:['Ce compte propriétaire est introuvable.','Owner account not found.']};
function message(code:string,fr:boolean){return errors[code]?.[fr?0:1]||(fr?'Opération indisponible. Réessayez.':'Operation unavailable. Please retry.');}
export default function AdminDesk({locale}:{locale:'fr'|'en'}){
  const fr=locale==='fr';const [staffRole,setStaffRole]=useState<'admin'|'moderator'|null>(null);const [section,setSection]=useState<'listings'|'users'|'moderation'>('moderation');const [page,setPage]=useState(1);const [search,setSearch]=useState('');const [query,setQuery]=useState('');const [refresh,setRefresh]=useState(0);const [listings,setListings]=useState<Listing[]>([]);const [users,setUsers]=useState<Member[]>([]);const [hasNext,setHasNext]=useState(false);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [notice,setNotice]=useState('');const [busy,setBusy]=useState(false);const [editing,setEditing]=useState<Listing|null>(null);const generation=useRef(0);
  useEffect(()=>{
    let active=true;
    async function resolveRole(){try{const {data}=await supabase.auth.getSession();if(!data.session)return;const r=await fetch('/api/admin?access=1',{headers:{Authorization:'Bearer '+data.session.access_token},cache:'no-store'});if(!r.ok)return;const body=await r.json();if(active)setStaffRole(body.role==='admin'?'admin':'moderator');}catch{if(active)setStaffRole(null);}}
    void resolveRole();
    const {data:{subscription}}=supabase.auth.onAuthStateChange(()=>{generation.current++;setListings([]);setUsers([]);setEditing(null);setError('');setLoading(true);setStaffRole(null);void resolveRole();setSection('moderation');setRefresh(v=>v+1);});
    return()=>{active=false;generation.current++;subscription.unsubscribe();};
  },[]);
  useEffect(()=>{
    const controller=new AbortController();const ticket=++generation.current;
    async function load(){
      setLoading(true);setListings([]);setUsers([]);setHasNext(false);setError('');
      try{
        const {data}=await supabase.auth.getSession();if(!data.session)throw new Error('SIGN_IN_REQUIRED');
        const params=new URLSearchParams({section,page:String(page),q:query});
        const response=await fetch(`/api/admin?${params}`,{headers:{Authorization:`Bearer ${data.session.access_token}`},cache:'no-store',signal:controller.signal});
        const result=await response.json();if(!response.ok)throw new Error(result.error);
        if(ticket!==generation.current)return;
        setListings(result.listings||[]);setUsers(result.users||[]);setHasNext(result.hasNext===true);
      }catch(e){if(ticket===generation.current&&!controller.signal.aborted)setError(message(e instanceof Error?e.message:'',fr));}
      finally{if(ticket===generation.current)setLoading(false);}
    }
    void load();return()=>{controller.abort();generation.current++;};
  },[section,page,query,refresh,fr]);
  async function save(change:object){
    const ticket=generation.current;setBusy(true);setError('');setNotice('');
    try{
      const {data}=await supabase.auth.getSession();if(!data.session)throw new Error('SIGN_IN_REQUIRED');
      const response=await fetch('/api/admin',{method:'PATCH',headers:{Authorization:`Bearer ${data.session.access_token}`,'Content-Type':'application/json'},body:JSON.stringify(change)});
      const result=await response.json();if(!response.ok)throw new Error(result.error);
      if(ticket===generation.current){setNotice(fr?'Modifications enregistrées.':'Changes saved.');setEditing(null);setRefresh(v=>v+1);}
    }catch(e){if(ticket===generation.current)setError(message(e instanceof Error?e.message:'',fr));}
    finally{setBusy(false);}
  }
  function submitListing(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(!editing)return;
    const fd=new FormData(event.currentTarget);
    const ownerId=String(fd.get('ownerId'));
    if(ownerId!==editing.owner_id&&!window.confirm(fr?'Rattacher cette annonce au compte indiqué ? Ses demandes et son calendrier seront accessibles au nouveau propriétaire.':'Transfer this listing to the specified account? Its enquiries and calendar will become available to the new owner.'))return;
    void save({kind:'listing',id:editing.id,ownerId,...Object.fromEntries(['name','location','description','descriptionEn','status','visibility'].map(key=>[key,String(fd.get(key)||'')]))});
  }
  return <section className="lg-shell py-12 md:py-20"><p className="lg-kicker lg-accent">LE GOLFE / ADMIN</p><h1 className="lg-title mt-5 text-5xl md:text-7xl">{fr?'Piloter le site.':'Manage the site.'}</h1><p className="mt-5 max-w-2xl text-sm leading-6 text-black/65">{fr?'Retrouvez les inscrits et les annonces enregistrées en ligne, quel que soit leur propriétaire. Les brouillons conservés uniquement sur un appareil restent dans l’espace propriétaire.':'Find registered members and online listings across all owners. Drafts saved only on a device remain in the host workspace.'}</p>
    <div className="mt-8 flex flex-wrap gap-3">{(['moderation','listings','users'] as const).filter(value=>value==='moderation'||staffRole==='admin').map(value=><button key={value} disabled={busy} onClick={()=>{setSection(value);setPage(1);setEditing(null);setNotice('');}} className={`lg-btn ${section===value?'lg-btn--dark':''}`} aria-pressed={section===value}>{value==='listings'?(fr?'Annonces':'Listings'):value==='users'?(fr?'Inscrits':'Members'):(fr?'Commentaires & photos':'Comments & photos')}</button>)}<button disabled={loading||busy} className="lg-btn" onClick={()=>setRefresh(v=>v+1)}>{fr?'Actualiser':'Refresh'} ↻</button></div>
    {section==='listings'&&<form onSubmit={e=>{e.preventDefault();setPage(1);setQuery(search.trim());setRefresh(v=>v+1);}} className="mt-6 flex max-w-xl flex-wrap gap-3"><label className="min-w-48 flex-1"><span className="sr-only">{fr?'Rechercher une annonce par nom':'Search listing name'}</span><input type="search" maxLength={160} value={search} onChange={e=>setSearch(e.target.value)} placeholder={fr?'Ex. Mas de la Haumière':'Listing name'} className="field"/></label><button disabled={busy} className="lg-btn lg-btn--dark">{fr?'Rechercher':'Search'}</button></form>}
    {section==='moderation'&&<AdminModeration fr={fr} locale={locale}/>}
    {error&&<p role="alert" className="mt-6 border border-red-700 p-4 text-sm text-red-800">{error} <Link href={`/${locale}/account`} className="underline">{fr?'Mon compte':'My account'}</Link></p>}{notice&&<p role="status" className="mt-6 text-sm font-bold">{notice}</p>}
    {section!=='moderation'&&(loading?<p role="status" className="mt-8">{fr?'Chargement…':'Loading…'}</p>:!error&&<>
      {section==='listings'?<div className="mt-8">{listings.length===0&&<p>{fr?'Aucune annonce trouvée. Essayez une partie du nom.':'No listings found. Try part of the name.'}</p>}{listings.map(row=><article key={row.id} className="flex flex-wrap items-start justify-between gap-5 border-t border-black/20 py-6"><div className="min-w-0"><h2 className="text-2xl font-black">{String(row.payload.name||row.id)}</h2><p className="mt-2 text-sm">{String(row.payload.location||'')} · {row.status} · {row.visibility}</p><p className="mt-2 break-all text-sm">{fr?'Propriétaire : ':'Owner: '}{row.ownerEmail}</p><p className="mt-1 break-all text-xs text-black/60">{row.owner_id}</p><p className="mt-1 break-all text-xs text-black/60">{row.id}</p></div><div className="flex flex-wrap gap-3"><button disabled={busy} className="lg-btn lg-btn--dark" onClick={()=>setEditing(row)}>{fr?'Gérer':'Manage'}</button>{row.status==='published'&&row.visibility==='public'&&<Link className="lg-btn" href={`/${locale}/villa/${row.id}`}>{fr?'Voir la fiche':'View listing'} ↗</Link>}</div></article>)}</div>:<div className="mt-8">{users.length===0&&<p>{fr?'Aucun inscrit sur cette page.':'No members on this page.'}</p>}{users.map(user=><article key={user.id} className="flex flex-wrap justify-between gap-5 border-t border-black/20 py-6"><div><h2 className="break-all text-xl font-black">{user.name||user.email}</h2><p className="mt-2 break-all text-sm">{user.email}</p><p className="mt-2 text-xs">{new Date(user.createdAt).toLocaleDateString(fr?'fr-FR':'en-GB')} · {user.confirmed?(fr?'Email confirmé':'Email confirmed'):(fr?'Email à confirmer':'Email unconfirmed')}</p><p className="mt-2 break-all text-xs text-black/60">{user.id}</p></div><form className="flex flex-wrap items-end gap-3" onSubmit={e=>{e.preventDefault();void save({kind:'user',id:user.id,role:new FormData(e.currentTarget).get('role')});}}><label className="text-xs font-bold">{fr?'Rôle':'Role'}<select name="role" key={user.role} defaultValue={user.role} disabled={busy||user.protected} className="field mt-2"><option value="user">User</option><option value="moderator">Moderator</option><option value="admin">Admin</option></select></label><button disabled={busy||user.protected} className="lg-btn">{fr?'Enregistrer':'Save'}</button></form></article>)}</div>}
      <div className="mt-8 flex items-center gap-4"><button disabled={page===1||busy} className="lg-btn disabled:opacity-50" onClick={()=>setPage(v=>v-1)}>← {fr?'Précédente':'Previous'}</button><span className="text-sm">Page {page}</span><button disabled={!hasNext||busy} className="lg-btn disabled:opacity-50" onClick={()=>setPage(v=>v+1)}>{fr?'Suivante':'Next'} →</button></div>
    </>)}
    {editing&&<section className="mt-10 border-t-4 border-[var(--lg-blue)] bg-neutral-100 p-6"><h2 className="text-2xl font-black">{fr?'Modifier l’annonce':'Edit listing'} · {String(editing.payload.name)}</h2><form key={editing.id} onSubmit={submitListing} className="mt-5 grid gap-5 md:grid-cols-2">{(['name','location','description','descriptionEn'] as const).map(key=><label key={key} className="text-sm font-bold">{({name:fr?'Nom':'Name',location:fr?'Commune':'Town',description:fr?'Description française':'French description',descriptionEn:'English description'})[key]}{key.startsWith('description')?<textarea name={key} rows={7} maxLength={4000} defaultValue={String(editing.payload[key]||'')} className="field mt-2"/>:<input name={key} required maxLength={key==='name'?160:120} defaultValue={String(editing.payload[key]||'')} className="field mt-2"/>}</label>)}<label className="text-sm font-bold">{fr?'Statut':'Status'}<select name="status" defaultValue={editing.status} className="field mt-2"><option value="draft">{fr?'Brouillon':'Draft'}</option><option value="published">{fr?'Publiée':'Published'}</option><option value="paused">{fr?'En pause':'Paused'}</option></select></label><label className="text-sm font-bold">{fr?'Visibilité':'Visibility'}<select name="visibility" defaultValue={editing.visibility} className="field mt-2"><option value="public">Public</option><option value="request">{fr?'Sur demande':'On request'}</option><option value="private">{fr?'Privée':'Private'}</option></select></label><label className="text-sm font-bold md:col-span-2">{fr?'Identifiant du compte propriétaire (copiez-le depuis Inscrits)':'Owner account ID (copy from Members)'}<input required name="ownerId" defaultValue={editing.owner_id} className="field mt-2"/></label><div className="flex flex-wrap gap-3 md:col-span-2"><button disabled={busy} className="lg-btn lg-btn--dark">{busy?(fr?'Enregistrement…':'Saving…'):(fr?'Enregistrer':'Save')}</button><button type="button" disabled={busy} onClick={()=>setEditing(null)} className="lg-btn">{fr?'Annuler':'Cancel'}</button></div></form></section>}
  </section>;
}
