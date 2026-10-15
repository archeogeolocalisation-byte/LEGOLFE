import {places} from "../data/places";
import {placeMapPoints} from "../data/placeMapPoints";
import {validMapPoint} from "./villaMapLocation";

// Great-circle distance between verified geographic reference points, not a
// driving distance, walking distance, route or estimated travel time.
function airKm(a:{latitude:number;longitude:number},b:{latitude:number;longitude:number}){
 const rad=Math.PI/180;
 const dLat=(b.latitude-a.latitude)*rad,dLon=(b.longitude-a.longitude)*rad;
 const h=Math.sin(dLat/2)**2+Math.cos(a.latitude*rad)*Math.cos(b.latitude*rad)*Math.sin(dLon/2)**2;
 return 12742*Math.asin(Math.min(1,Math.sqrt(h)));
}
export function nearbyExplorer(placeId:string,max=4){
 const center=placeMapPoints[placeId]?.[0];
 if(!center||!validMapPoint(center.latitude,center.longitude))return [];
 return places.flatMap(place=>{
  if(place.id===placeId||place.category==="services")return [];
  const pt=placeMapPoints[place.id]?.[0];
  if(!pt||!validMapPoint(pt.latitude,pt.longitude)||!pt.source.startsWith("https://"))return [];
  const distance=airKm(center,pt);
  if(distance>12)return [];
  return [{place,distance,kind:pt.kind}];
 }).sort((a,b)=>a.distance-b.distance||a.place.name.localeCompare(b.place.name)).slice(0,max);
}
