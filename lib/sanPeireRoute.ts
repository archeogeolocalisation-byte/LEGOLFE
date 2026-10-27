import trail from '../data/sanPeireTrail.json';
import {mapPointPixels} from './villaMapLocation';
export const sanPeireTrail=trail;
export const sanPeireVisorando='https://www.visorando.com/randonnee-pic-de-san-peire/';
export const sanPeireWidget='https://www.visorando.com/index.php?component=externe&task=showCarte&idRandonnee=65442977&carte=1&navigation=1&panZoom=1&scaleLine=1';
export const sanPeireTopo='https://www.golfe-saint-tropez-information.com/files/visitgolfe/docs/randos-web-2023-gardefreinet-plandelatour-fr.pdf';
export function sanPeireMapFrame(width=800,height=480){
 const points=trail.points.map(p=>mapPointPixels(p.lat,p.lon,0)),xs=points.map(p=>p.x),ys=points.map(p=>p.y);
 const center={x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2};
 const zoom=Math.max(10,Math.min(16,Math.floor(Math.log2(Math.min(Math.max(140,width-72)/(Math.max(...xs)-Math.min(...xs)),Math.max(180,height-64)/(Math.max(...ys)-Math.min(...ys)))))));
 return {center:{x:center.x*2**zoom,y:center.y*2**zoom},zoom};
}
export function sanPeireDirections(start:'village'|'vernades'){
 const p=start==='village'?sanPeireTrail.points[0]:{lat:43.311004,lon:6.550222};
 return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`;
}
