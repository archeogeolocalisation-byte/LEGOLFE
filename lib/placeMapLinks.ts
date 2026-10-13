import {validMapPoint} from './villaMapLocation';
export type MapPoint={id:string;label:{fr:string;en:string};latitude:number;longitude:number;source:string;checked:string;kind:'venue'|'area';directionsQuery?:string;note:{fr:string;en:string}};
export function osmMapUrl(point:MapPoint){
 if(!validMapPoint(point.latitude,point.longitude))return undefined;
 const dx=point.kind==='area'?.014:.006,dy=dx*.7;
 const query=new URLSearchParams({bbox:[point.longitude-dx,point.latitude-dy,point.longitude+dx,point.latitude+dy].join(','),layer:'mapnik',marker:[point.latitude,point.longitude].join(',')});
 return `https://www.openstreetmap.org/export/embed.html?${query}`;
}
export function directionsUrl(destination:string){return 'https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',destination}).toString();}
export function pointDirectionsUrl(point:MapPoint){return directionsUrl(point.directionsQuery||`${point.latitude},${point.longitude}`);}
export function pointMapUrl(point:MapPoint){return `https://www.openstreetmap.org/?mlat=${point.latitude}&mlon=${point.longitude}#map=15/${point.latitude}/${point.longitude}`;}
export function placeSearchUrl(name:string,location:string){return 'https://www.google.com/maps/search/?'+new URLSearchParams({api:'1',query:`${name}, ${location}, France`}).toString();}
