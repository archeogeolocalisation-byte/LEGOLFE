import { supabase } from "./supabase";
import type { GolfeEvent } from "../data/events";
import type { LocalNewsItem } from "../data/localNews";

export async function getApprovedEvents():Promise<GolfeEvent[]>{
  try {
  const {data,error}=await supabase.from("editorial_inbox")
    .select("*").eq("status","approved").eq("content_type","event")
    .order("start_date",{ascending:true});
  if(error||!data)return [];
  return data.filter(x=>x.start_date).map((x:any)=>({
    id:`live-${x.id}`,title:x.title,titleFr:x.title_fr||x.title,start:x.start_date,end:x.end_date||undefined,
    time:x.event_time||undefined,location:x.location||"Golfe de Saint-Tropez",venue:x.venue||undefined,
    category:(["music","culture","sport","local","family","sailing"].includes(x.category)?x.category:"local"),
    summary:x.summary||"",summaryFr:x.summary_fr||x.summary||"",
    why:x.why||"Selected from an official local source.",whyFr:x.why_fr||"Sélectionné depuis une source locale officielle.",
    source:x.external_url,sourceLabel:x.source_label
  }));
  } catch { return []; }
}

export async function getApprovedNews():Promise<LocalNewsItem[]>{
  try {
  const {data,error}=await supabase.from("editorial_inbox")
    .select("*").eq("status","approved").eq("content_type","news")
    .order("start_date",{ascending:false});
  if(error||!data)return [];
  return data.filter(x=>x.start_date).map((x:any)=>({
    id:`live-${x.id}`,kind:(["need","new","around"].includes(x.category)?x.category:"around"),
    date:x.start_date,location:x.location||"Golfe de Saint-Tropez",
    title:x.title,titleFr:x.title_fr||x.title,summary:x.summary||"",summaryFr:x.summary_fr||x.summary||"",
    why:x.why||"Useful local update.",whyFr:x.why_fr||"Information locale utile.",
    source:x.external_url,sourceLabel:x.source_label,featured:false
  }));
  } catch { return []; }
}
