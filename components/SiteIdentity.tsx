import JsonLd from './JsonLd';
import {absoluteUrl,siteOrigin} from '../lib/seo';
export default function SiteIdentity(){
 if(!siteOrigin())return null;
 return <JsonLd data={{'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':absoluteUrl('/#organization'),name:'LE GOLFE',url:absoluteUrl('/')},
  {'@type':'WebSite','@id':absoluteUrl('/#website'),name:'LE GOLFE',url:absoluteUrl('/'),inLanguage:['fr-FR','en-GB'],publisher:{'@id':absoluteUrl('/#organization')}}
 ]}}/>;
}
