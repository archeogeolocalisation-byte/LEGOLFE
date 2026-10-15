import {supabase} from "./supabase";
import type {SavedDayPlan} from "./savedDayPlan";
import {validateSavedDayPlan} from "./savedDayPlan";
import {places} from "../data/places";

// Every call revalidates the authenticated user. Postgres RLS remains the
// authoritative cross-account boundary; never use a service-role key here.
async function currentUserId(){
 const {data,error}=await supabase.auth.getUser();
 if(error)throw error;
 return data.user?.id??null;
}
export async function fetchCloudDayPlan():Promise<{userId:string|null;plan:SavedDayPlan|null}>{
 const userId=await currentUserId();
 if(!userId)return {userId:null,plan:null};
 const {data,error}=await supabase.from("user_day_plans").select("payload").eq("user_id",userId).maybeSingle();
 if(error)throw error;
 return {userId,plan:validateSavedDayPlan(data?.payload,places)};
}
export async function saveCloudDayPlan(value:SavedDayPlan):Promise<boolean>{
 const plan=validateSavedDayPlan(value,places);
 if(!plan)throw new Error("Invalid day plan");
 const userId=await currentUserId();
 if(!userId)return false;
 const {error}=await supabase.from("user_day_plans").upsert({user_id:userId,payload:plan,updated_at:new Date().toISOString()},{onConflict:"user_id"});
 if(error)throw error;
 const after=await currentUserId();
 return after===userId;
}
export async function deleteCloudDayPlan():Promise<boolean>{
 const userId=await currentUserId();
 if(!userId)return false;
 const {error}=await supabase.from("user_day_plans").delete().eq("user_id",userId);
 if(error)throw error;
 return (await currentUserId())===userId;
}
