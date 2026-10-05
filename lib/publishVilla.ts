import {supabase} from './supabase';
import {photoBlob} from './hostPhotos';
import {propertyVilla,parsePublicVilla} from './villaListing';
import type {Property} from '../components/HostDesk';
export async function publishVilla(p:Property){
 if(!p.id.startsWith('property-'))throw new Error('Dupliquez cette annonce de démonstration pour créer votre propre annonce.');
 if(p.visibility!=='public'||p.status!=='published')throw new Error('Choisissez le statut Publiée et la visibilité Public avant de mettre en ligne.');
 const {data:{user},error}=await supabase.auth.getUser();if(error||!user)throw new Error('Connectez-vous à votre compte pour mettre cette annonce en ligne. L’aperçu reste disponible.');
 const villa=propertyVilla(p),uploaded:string[]=[];let writing=false;
 try{
 for(let i=0;i<villa.photos.length;i++){
 const photo=villa.photos[i];if(photo.src.startsWith('local-photo:')){
  const blob=await photoBlob(photo.src);if(!blob)throw new Error('Une photo locale est indisponible. Ajoutez-la à nouveau.');
  const path=`${user.id}/${p.id}/${crypto.randomUUID()}.jpg`;
  const {error:e}=await supabase.storage.from('villa-photos').upload(path,blob,{contentType:'image/jpeg',upsert:false});if(e)throw e;uploaded.push(path);
  photo.src=supabase.storage.from('villa-photos').getPublicUrl(path).data.publicUrl;
 }else if(photo.src.startsWith('/')){throw new Error('Remplacez les photos de démonstration par vos photos ou des URL HTTPS avant la mise en ligne.');}
 }
 if(!parsePublicVilla(p.id,villa))throw new Error('Annonce incomplète ou photos invalides.');
 writing=true;const {error:e}=await supabase.from('villa_listings').upsert({id:p.id,owner_id:user.id,status:p.status,visibility:p.visibility,payload:villa},{onConflict:'id'}).select('id').abortSignal(AbortSignal.timeout(15000)).single();if(e)throw e;
 return {...p,images:villa.photos.map(x=>x.src),online:true};
 }catch(e){if(!writing&&uploaded.length)await supabase.storage.from('villa-photos').remove(uploaded);throw e;}
}
export async function pauseVilla(id:string){const {error}=await supabase.from('villa_listings').update({status:'paused'}).eq('id',id).select('id').single();if(error)throw error;}
export async function removeVilla(id:string){const {error}=await supabase.from('villa_listings').delete().eq('id',id).select('id').single();if(error)throw error;}
