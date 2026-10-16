import Link from 'next/link';
import type {Locale} from '../lib/i18n';

export default function ProfileShortcuts({locale}:{locale:Locale}){
 const fr=locale==='fr';
 return <nav className="profile-shortcuts" aria-label={fr?'Mon espace personnel':'My personal space'}>
  <Link href={`/${locale}/saved#mes-adresses`}><span className="lg-kicker">01 / {fr?'MES FAVORIS':'MY FAVORITES'}</span><strong>{fr?'Mes adresses, mes envies':'My places, my inspiration'} ↗</strong><span>{fr?'Retrouver mes lieux enregistrés.':'Find my saved places.'}</span></Link>
  <Link href={`/${locale}/saved`}><span className="lg-kicker">02 / {fr?'MON SÉJOUR':'MY STAY'}</span><strong>{fr?'Préparer mes journées':'Plan my days'} ↗</strong><span>{fr?'Mes maisons et mon programme.':'My houses and my day plan.'}</span></Link>
  <Link href={`/${locale}/host`}><span className="lg-kicker">03 / {fr?'MES ANNONCES':'MY LISTINGS'}</span><strong>{fr?'Présenter ma maison':'Share my home'} ↗</strong><span>{fr?'Créer et gérer mes annonces.':'Create and manage my listings.'}</span></Link>
 </nav>;
}
