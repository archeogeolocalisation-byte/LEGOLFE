import type {AskDayPlan} from "./askMatching";
import type {MapPoint} from "./placeMapLinks";
import {validMapPoint} from "./villaMapLocation";
import {placeMapPoints} from "../data/placeMapPoints";

export type AskPlanMarker={id:string;name:string;location:string;order:number;point:MapPoint};
export function mapAskPlan(plan:AskDayPlan,pointsById:Record<string,MapPoint[]>=placeMapPoints){
 const mapped:AskPlanMarker[]=[],missing:{id:string;name:string;order:number}[]=[];
 for(const [index,step] of plan.steps.entries()){
  const place=step.match.p;
  // Only sourced locations. Do not fall back to inferred city centres or
  // unsourced place.latitude/longitude values.
  const point=pointsById[place.id]?.find(p=>p.source.startsWith("https://")&&validMapPoint(p.latitude,p.longitude));
  if(point)mapped.push({id:place.id,name:place.name,location:place.location,order:index+1,point});
  else missing.push({id:place.id,name:place.name,order:index+1});
 }
 return {mapped,missing,total:plan.steps.length};
}
