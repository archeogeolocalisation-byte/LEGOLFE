export type VillaMapLocation={mode:'approximate'|'exact';latitude:number;longitude:number};
export const golfeMapCenter={latitude:43.24,longitude:6.55};
export const regionBounds={south:43.05,north:43.5,west:6.2,east:6.9};
export function validMapPoint(latitude:number,longitude:number){return Number.isFinite(latitude)&&Number.isFinite(longitude)&&latitude>=regionBounds.south&&latitude<=regionBounds.north&&longitude>=regionBounds.west&&longitude<=regionBounds.east;}
export function normalizeMapLocation(value:unknown):VillaMapLocation|undefined{
 if(!value||typeof value!=='object')return undefined;const p=value as VillaMapLocation;if(!['approximate','exact'].includes(p.mode)||typeof p.latitude!=='number'||typeof p.longitude!=='number'||!validMapPoint(p.latitude,p.longitude))return undefined;
 // Approximate mode deliberately discards fine coordinates before storage or publication.
 const round=(n:number)=>Number(n.toFixed(p.mode==='approximate'?2:6));return {mode:p.mode,latitude:round(p.latitude),longitude:round(p.longitude)};
}
export function mapPointPixels(latitude:number,longitude:number,zoom:number){const size=256*2**zoom,s=Math.sin(latitude*Math.PI/180);return {x:(longitude+180)/360*size,y:(.5-Math.log((1+s)/(1-s))/(4*Math.PI))*size};}
export function pixelsMapPoint(x:number,y:number,zoom:number){const size=256*2**zoom,n=Math.PI-2*Math.PI*y/size;return {latitude:Math.atan(Math.sinh(n))*180/Math.PI,longitude:x/size*360-180};}
export function clampMapPoint(point:{latitude:number;longitude:number}){return {latitude:Math.max(regionBounds.south,Math.min(regionBounds.north,point.latitude)),longitude:Math.max(regionBounds.west,Math.min(regionBounds.east,point.longitude))};}
