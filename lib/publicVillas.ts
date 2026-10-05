import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {villas} from '../data/villas';
import {parsePublicVilla,type VillaListing} from './villaListing';
export async function getPublicVilla(id:string):Promise<VillaListing|null>{
 const demo=villas.find(v=>v.id===id);if(demo)return {...demo,photos:[{src:demo.image,alt:`${demo.name} — photo de présentation`}],amenities:[demo.pool?'Pool':'',demo.heatedPool?'Heated pool':'',demo.seaView?'Sea view':'',demo.quiet?'Quiet setting':''].filter(Boolean),highlights:[]};
 if(!/^property-[a-zA-Z0-9-]{1,100}$/.test(id))return null;
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from('villa_listings').select('id,payload').eq('id',id).eq('status','published').eq('visibility','public').abortSignal(AbortSignal.timeout(8000)).maybeSingle();
 if(error){if(['42P01','PGRST205'].includes(error.code))return null;throw new Error('Impossible de charger cette annonce. Réessayez dans un instant.');}
 return data?parsePublicVilla(id,data.payload):null;
}

export async function getPublishedVillas():Promise<VillaListing[]>{
 try{const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});const {data,error}=await db.from('villa_listings').select('id,payload').eq('status','published').eq('visibility','public').order('created_at',{ascending:false}).limit(200).abortSignal(AbortSignal.timeout(5000));if(error)return [];return (data||[]).flatMap(row=>{const villa=parsePublicVilla(row.id,row.payload);return villa?[villa]:[];});}catch{return [];}
}
