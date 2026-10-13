import {absoluteUrl,siteOrigin} from './seo';
import {mediaForGuide} from './guideMedia';
import type {Guide} from '../data/guides';
import type {Locale} from './i18n';

export function guideArticleSchema(guide:Guide,locale:Locale){
 if(!siteOrigin())return null;
 const copy=guide.copy[locale],url=absoluteUrl(`/${locale}/guides/${guide.slug}`);
 return {'@context':'https://schema.org','@type':'Article','@id':`${url}#article`,headline:copy.seoTitle,description:copy.description,inLanguage:locale==='fr'?'fr-FR':'en-GB',datePublished:`${guide.published}T12:00:00+02:00`,dateModified:`${guide.verified}T12:00:00+02:00`,mainEntityOfPage:{'@type':'WebPage','@id':url},image:[absoluteUrl(mediaForGuide(guide).photo.src)],articleSection:guide.category[locale],author:{'@type':'Organization','@id':absoluteUrl('/#organization'),name:'LE GOLFE',url:absoluteUrl(`/${locale}`)},publisher:{'@type':'Organization','@id':absoluteUrl('/#organization'),name:'LE GOLFE',url:absoluteUrl('/')},citation:guide.sources.map(source=>source.url)};
}
