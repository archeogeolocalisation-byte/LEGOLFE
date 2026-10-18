import {placeImageCache} from '../data/placeImageCache';
/** Keep the source, caption and licence while serving the reviewed copy locally. */
export function localPlacePhoto<T extends {src:string}>(photo:T):T {
 const src=placeImageCache[photo.src];
 return src?{...photo,src}:photo;
}
