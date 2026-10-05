import JsonLd from "./JsonLd";
import { absoluteUrl, siteOrigin } from "../lib/seo";
export default function CollectionSchema({name,path,items}:{name:string;path:string;items:{name:string;path:string}[]}){
 if(!siteOrigin())return null;
 return <JsonLd data={{"@context":"https://schema.org","@type":"CollectionPage",name,url:absoluteUrl(path),mainEntity:{"@type":"ItemList",numberOfItems:items.length,itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,url:absoluteUrl(item.path)}))}}}/>;
}
