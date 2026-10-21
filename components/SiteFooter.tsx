import Link from 'next/link';
import {navigation,type Locale} from '../lib/i18n';
import {BrandLogo,BrandMonogram} from './BrandLogo';
import styles from './SiteFooter.module.css';

export default function SiteFooter({locale='en',path}:{locale?:Locale;path?:string}){
 const fr=locale==='fr',labels=navigation[locale],base=`/${locale}`;
 const groups=[
  {title:fr?'Découvrir':'Discover',links:[['/explore',labels.explore],['/carte-touristique',labels.touristMap],['/destinations',fr?'Les communes':'The towns'],['/guides',labels.guides]]},
  {title:fr?'Vivre le Golfe':'Enjoy the Golfe',links:[['/whats-on',labels.agenda],['/local',labels.local],['/stay',labels.stay],['/saved',fr?'Mon séjour & favoris':'My stay & saved places']]},
  {title:'LE GOLFE',links:[['/a-propos',fr?'À propos':'About us'],['/contact','Contact'],['/how-it-works',fr?'Comment ça fonctionne':'How it works'],['/account',fr?'Mon compte':'My account']]},
 ];
 const languageHref=(language:Locale)=>path&&/^\/(fr|en)(\/|$)/.test(path)?path.replace(/^\/(fr|en)(?=\/|$)/,`/${language}`):`/${language}`;
 return <footer className={styles.root}>
  <div className="lg-shell">
   <div className={styles.intro}>
    <div><BrandLogo locale={locale} light={false}/><p className={styles.signature}>{fr?'Le Golfe, à votre rythme.':'The Golfe, at your pace.'}</p><p className={styles.description}>{fr?'Des adresses à découvrir, des journées à imaginer et la vie locale à portée de main. Pour ceux qui vivent ici comme pour ceux qui viennent en profiter.':'Places to discover, days to plan and local life close at hand. For those who live here and those who come to enjoy it.'}</p></div>
    <div className={styles.contact}><p className={styles.kicker}>{fr?'ON GARDE LE LIEN':'LET’S KEEP IN TOUCH'}</p><h2>{fr?'Une adresse, une idée, un mot ?':'A place, an idea, a hello?'}</h2><p>{fr?'Partagez une découverte ou aidez-nous à garder le guide à jour.':'Share a discovery or help us keep the guide up to date.'}</p><Link className={styles.action} href={`${base}/contact`}>{fr?'Écrivez-nous':'Get in touch'} <span aria-hidden="true">↗</span></Link></div>
   </div>
   <div className={styles.navigation}>{groups.map((group,index)=><nav key={group.title} aria-labelledby={`footer-heading-${index}`}><h2 id={`footer-heading-${index}`}>{group.title}</h2><ul>{group.links.map(([href,label])=><li key={href}><Link href={`${base}${href}`}>{label}</Link></li>)}</ul></nav>)}</div>
   <div className={styles.bottom}><p>© LE GOLFE · GOLFE DE SAINT-TROPEZ</p><nav aria-label={fr?'Langue du site':'Site language'} className={styles.languages}><Link href={languageHref('fr')} hrefLang="fr" lang="fr" aria-current={fr?'page':undefined}>Français</Link><span aria-hidden="true">/</span><Link href={languageHref('en')} hrefLang="en" lang="en" aria-current={!fr?'page':undefined}>English</Link></nav><BrandMonogram light={false}/></div>
  </div>
 </footer>;
}
