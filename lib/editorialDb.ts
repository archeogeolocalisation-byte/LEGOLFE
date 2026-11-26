import "server-only";
import {createClient} from "@supabase/supabase-js";
import {unstable_cache} from "next/cache";
import type { GolfeEvent } from "../data/events";
import type { LocalNewsItem } from "../data/localNews";

// Only anonymous, approved editorial data belongs in the shared cache.
function publicDb(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});}
const columns="id,title,title_fr,start_date,end_date,event_time,location,venue,category,summary,summary_fr,why,why_fr,external_url,source_label";
const backend=process.env.NEXT_PUBLIC_SUPABASE_URL??"unconfigured";

const cachedEvents=unstable_cache(async():Promise<GolfeEvent[]>=>{
  const supabase=publicDb();
  const {data,error}=await supabase.from("editorial_inbox")
    .select(columns).eq("status","approved").eq("content_type","event")
    .order("start_date",{ascending:true}).limit(1000).abortSignal(AbortSignal.timeout(5000));
  if(error)throw error;
  if(!data)return [];
  return data.filter(x=>x.start_date).map((x:any)=>({
    id:`live-${x.id}`,title:x.title,titleFr:x.title_fr||x.title,start:x.start_date,end:x.end_date||undefined,
    time:x.event_time||undefined,location:x.location||"Golfe de Saint-Tropez",venue:x.venue||undefined,
    category:(["music","culture","sport","local","family","sailing","cinema"].includes(x.category)?x.category:"local"),
    summary:x.summary||"",summaryFr:x.summary_fr||x.summary||"",
    why:x.why||"Selected from an official local source.",whyFr:x.why_fr||"Sélectionné depuis une source locale officielle.",
    source:x.external_url,sourceLabel:x.source_label
  }));
},["public-editorial-events-v1",backend],{revalidate:300});
export async function getApprovedEvents():Promise<GolfeEvent[]>{try{return await cachedEvents();}catch{return [];}}

const cachedNews=unstable_cache(async():Promise<LocalNewsItem[]>=>{
  const supabase=publicDb();
  const {data,error}=await supabase.from("editorial_inbox")
    .select(columns).eq("status","approved").eq("content_type","news")
    .order("start_date",{ascending:false}).limit(1000).abortSignal(AbortSignal.timeout(5000));
  if(error)throw error;
  if(!data)return [];
  return data.filter(x=>x.start_date).map((x:any)=>({
    id:`live-${x.id}`,kind:(["need","new","around"].includes(x.category)?x.category:"around"),
    date:x.start_date,location:x.location||"Golfe de Saint-Tropez",
    title:x.title,titleFr:x.title_fr||x.title,summary:x.summary||"",summaryFr:x.summary_fr||x.summary||"",
    why:x.why||"Useful local update.",whyFr:x.why_fr||"Information locale utile.",
    source:x.external_url,sourceLabel:x.source_label,featured:false
  }));
},["public-editorial-news-v1",backend],{revalidate:300});
export async function getApprovedNews():Promise<LocalNewsItem[]>{try{return await cachedNews();}catch{return [];}}
