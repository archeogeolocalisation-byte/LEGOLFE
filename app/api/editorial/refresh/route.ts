import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { editorialSources } from "../../../../data/agendaSources";
import { fetchSourceCandidates } from "../../../../lib/editorialIngest";

export const dynamic="force-dynamic";

export async function POST(req:NextRequest){
  const token=req.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
  if(!token)return NextResponse.json({error:"Missing access token"},{status:401});
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)return NextResponse.json({error:"Supabase environment variables missing"},{status:500});

  const supabase=createClient(url,key,{global:{headers:{Authorization:`Bearer ${token}`}}});
  const {data:{user},error:userError}=await supabase.auth.getUser(token);
  if(userError||!user)return NextResponse.json({error:"Invalid session"},{status:401});
  const {data:isMod}=await supabase.rpc("is_community_moderator");
  if(!isMod)return NextResponse.json({error:"Moderator access required"},{status:403});

  const reports:any[]=[];
  let inserted=0;
  for(const source of editorialSources){
    try{
      const candidates=await fetchSourceCandidates(source);
      let added=0;
      for(const candidate of candidates){
        const {error}=await supabase.from("editorial_inbox").upsert(candidate,{onConflict:"fingerprint",ignoreDuplicates:true});
        if(!error){added++; inserted++;}
      }
      reports.push({key:source.key,label:source.label,found:candidates.length,processed:added});
    }catch(error:any){
      reports.push({key:source.key,label:source.label,error:error?.message||"Fetch failed"});
    }
  }
  return NextResponse.json({ok:true,inserted,reports});
}
