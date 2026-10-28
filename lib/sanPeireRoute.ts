import trail from '../data/sanPeireTrail.json';
import loop from '../data/sanPeireLoop.json';
import {hikingMapFrame} from './hikingTrack';
export const sanPeireTrail=trail;
export const sanPeireLoop=loop;
export const sanPeireVisorando='https://www.visorando.com/randonnee-pic-de-san-peire/';
export const sanPeireTopo='https://www.golfe-saint-tropez-information.com/files/visitgolfe/docs/randos-web-2023-gardefreinet-plandelatour-fr.pdf';
export function sanPeireMapFrame(width=800,height=480,coordinates:readonly {lat:number;lon:number}[]=trail.points){return hikingMapFrame(width,height,coordinates);}
export function sanPeireDirections(start:'village'|'vernades'){
 const p=start==='village'?sanPeireTrail.points[0]:{lat:43.311004,lon:6.550222};
 return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`;
}
