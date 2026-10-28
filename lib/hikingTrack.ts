import {mapPointPixels} from './villaMapLocation';
export type HikingPoint={lat:number;lon:number;elevation:number;distanceKm:number};
export function hikingMapFrame(width=800,height=480,coordinates:readonly {lat:number;lon:number}[]){
 const points=coordinates.map(p=>mapPointPixels(p.lat,p.lon,0)),xs=points.map(p=>p.x),ys=points.map(p=>p.y);
 const center={x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2};
 const zoom=Math.max(10,Math.min(16,Math.floor(Math.log2(Math.min(Math.max(140,width-72)/(Math.max(...xs)-Math.min(...xs)),Math.max(180,height-64)/(Math.max(...ys)-Math.min(...ys)))))));
 return {center:{x:center.x*2**zoom,y:center.y*2**zoom},zoom};
}
