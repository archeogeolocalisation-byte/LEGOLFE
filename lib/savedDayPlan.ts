import type {Place} from "../data/places";
export const SAVED_DAY_PLAN_KEY="le-golfe-day-plan-v1";
export const SAVED_DAY_PLAN_EVENT="le-golfe:day-plan";
export type SavedDayPlan={version:1;format:"half"|"full";placeIds:string[];updatedAt:string};
export function validateSavedDayPlan(value:unknown,places:readonly Pick<Place,"id">[]):SavedDayPlan|null{
 if(!value||typeof value!=="object")return null;
 const v=value as Partial<SavedDayPlan>;
 if(v.version!==1||(v.format!=="half"&&v.format!=="full")||!Array.isArray(v.placeIds)||typeof v.updatedAt!=="string")return null;
 const valid=new Set(places.map(p=>p.id));const unique:string[]=[];
 for(const id of v.placeIds){if(typeof id==="string"&&valid.has(id)&&!unique.includes(id))unique.push(id);}
 if(!unique.length)return null;
 return {version:1,format:v.format,placeIds:unique.slice(0,6),updatedAt:v.updatedAt};
}
export function parseSavedDayPlan(raw:string|null,places:readonly Pick<Place,"id">[]):SavedDayPlan|null{
 if(!raw)return null;
 try{return validateSavedDayPlan(JSON.parse(raw),places)}catch{return null}
}
export function makeSavedDayPlan(ids:string[],format:"half"|"full",places:readonly Pick<Place,"id">[],now:string):SavedDayPlan|null{
 return validateSavedDayPlan({version:1,format,placeIds:ids,updatedAt:now},places);
}
