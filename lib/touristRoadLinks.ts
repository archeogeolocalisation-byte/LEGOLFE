import {directionsUrl} from './placeMapLinks';

/** Google Maps URLs: external navigation, no API key or SDK required. */
export function touristRoadMapUrl(traffic=false){
 const params=new URLSearchParams({api:'1',map_action:'map',center:'43.26,6.57',zoom:'11',basemap:'roadmap'});
 if(traffic)params.set('layer','traffic');
 return `https://www.google.com/maps/@?${params}`;
}
export function touristDirectionsUrl(name:string){
 // Commune centroids on the illustrated map are not safe arrival addresses.
 return directionsUrl(`${name}, Var, France`);
}
