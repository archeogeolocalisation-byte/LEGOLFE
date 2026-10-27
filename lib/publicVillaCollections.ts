import 'server-only';
import type {SupabaseClient} from '@supabase/supabase-js';
import {collectionFromReview} from './villaCollections';
import type {VillaListing} from './villaListing';
export async function withReviewedCollections(db:SupabaseClient,villas:VillaListing[]):Promise<VillaListing[]>{
 if(!villas.length)return villas;
 // RLS only returns reviews matching the current published payload. Missing setup fails closed.
 try{
  const {data,error}=await db.from('villa_collection_reviews').select('listing_id,collection,reason_fr,reason_en').in('listing_id',villas.map(v=>v.id)).abortSignal(AbortSignal.timeout(5000));
  if(error)return villas;
  const reviews=new Map((data||[]).map(row=>[row.listing_id,collectionFromReview(row)]));
  return villas.map(v=>({...v,...reviews.get(v.id)}));
 }catch{return villas;}
}
