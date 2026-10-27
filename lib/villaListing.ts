import {isVillaDistinction,type VillaDistinction,type VillaCollection} from './villaCollections';
import {normalizeMapLocation,type VillaMapLocation} from './villaMapLocation';
import type {Property} from '../components/HostDesk';
export type VillaListing={requestedCollection?:VillaDistinction;collectionPitch?:string;collection?:VillaCollection;collectionReasons?:{fr:string;en:string};mapLocation?:VillaMapLocation;district?:string;id:string;name:string;location:string;price:number;guests:number;bedrooms:number;bathrooms:number;description:string;descriptionEn?:string;titleFr?:string;titleEn?:string;highlights:string[];highlightsEn?:string[];amenities:string[];photos:{src:string;alt:string}[];announcer?:{kind:'owner'|'agency';name:string};saintTropezDistance?:number;beachDistance?:number;live?:boolean};
export function propertyVilla(p:Property):VillaListing{return {requestedCollection:p.requestedCollection,collectionPitch:p.collectionPitch?.trim()||undefined,mapLocation:normalizeMapLocation(p.mapLocation),district:p.district?.trim().slice(0,80),id:p.id,name:p.name,location:p.location,price:p.price,guests:p.guests,bedrooms:p.bedrooms,bathrooms:p.bathrooms,description:p.descriptionFr||p.description,descriptionEn:p.descriptionEn,titleFr:p.titleFr,titleEn:p.titleEn,highlights:p.highlightsFr||[],highlightsEn:p.highlightsEn,amenities:p.amenities,photos:p.images.map((src,i)=>({src,alt:`${p.name} — photo ${i+1}`})),announcer:{kind:p.announcerType==='agency'?'agency':'owner',name:p.managedBy==='Owner'?'':p.managedBy},saintTropezDistance:p.distanceFromSaintTropez||undefined};}
export function parsePublicVilla(id:string,value:unknown):VillaListing|null{
 if(!value||typeof value!=='object')return null;const p=value as VillaListing;
 if(p.id!==id||typeof p.name!=='string'||!p.name.trim()||typeof p.location!=='string'||typeof p.description!=='string')return null;
 if(![p.guests,p.bedrooms,p.bathrooms].every(n=>Number.isInteger(n)&&n>=1&&n<=100)||!Number.isFinite(p.price)||p.price<0)return null;
 if(!Array.isArray(p.photos)||p.photos.length>12||p.photos.some(x=>!x||typeof x.src!=='string'||!/^https:\/\//.test(x.src)||typeof x.alt!=='string'))return null;
 if(!Array.isArray(p.amenities)||p.amenities.some(x=>typeof x!=='string')||!Array.isArray(p.highlights)||p.highlights.some(x=>typeof x!=='string'))return null;
 if(!p.announcer||!['owner','agency'].includes(p.announcer.kind)||typeof p.announcer.name!=='string')return null;
 if(['descriptionEn','titleFr','titleEn'].some(k=>p[k as 'descriptionEn']!==undefined&&typeof p[k as 'descriptionEn']!=='string'))return null;
 if(p.highlightsEn!==undefined&&(!Array.isArray(p.highlightsEn)||p.highlightsEn.some(x=>typeof x!=='string')))return null;
 if([p.saintTropezDistance,p.beachDistance].some(n=>n!==undefined&&(!Number.isFinite(n)||n<0)))return null;
 if(p.mapLocation!==undefined&&!normalizeMapLocation(p.mapLocation))return null;if(p.district!==undefined&&(typeof p.district!=='string'||p.district.length>80))return null;
 if(p.requestedCollection!==undefined&&!isVillaDistinction(p.requestedCollection))return null;
 if(p.collectionPitch!==undefined&&(typeof p.collectionPitch!=='string'||p.collectionPitch.length>600))return null;
 // Editorial selections are loaded separately; owners cannot grant themselves a public badge.
 const ownerFields={...p};delete ownerFields.collection;delete ownerFields.collectionReasons;
 return {...ownerFields,mapLocation:normalizeMapLocation(p.mapLocation),district:p.district?.trim(),live:true};
}
