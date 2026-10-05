'use client';
import {useEffect,useState} from 'react';
import {photoBlob} from '../lib/hostPhotos';
export default function HostPhoto({src,alt='',className='',loading,fetchPriority}:{src:string;alt?:string;className?:string;loading?:'eager'|'lazy';fetchPriority?:'high'|'low'|'auto'}){
 const [local,setLocal]=useState({src:'',url:''});useEffect(()=>{let active=true,url='';if(src.startsWith('local-photo:'))photoBlob(src).then(blob=>{if(blob&&active){url=URL.createObjectURL(blob);setLocal({src,url});}}).catch(()=>{});return()=>{active=false;if(url)URL.revokeObjectURL(url);};},[src]);
 const resolved=src.startsWith('local-photo:')?(local.src===src?local.url:''):src;return resolved?<img src={resolved} alt={alt} className={className} loading={loading} fetchPriority={fetchPriority} decoding="async"/>:<div className={className+' bg-black/5 p-4 text-xs'}>Photo indisponible / unavailable</div>;
}
