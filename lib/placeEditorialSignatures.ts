import type {Locale} from './i18n';

type Signature={subtitle:string;quote:string;rhythm:string;dark:string;close:string};
export const editorialSignatures:Record<string,Record<Locale,Signature>>={
 'domaine-de-la-croix':{
  fr:{subtitle:'LE GOLFE SE DÉGUSTE AUSSI DANS LES VIGNES.',quote:'À LA CROIX-VALMER, LE TERROIR A SON RENDEZ-VOUS.',rhythm:'LE TEMPS D’UN VERRE. LE TEMPS DE COMPRENDRE.',dark:'LA CAVE N’EST PAS LA VISITE.',close:'LE BON MILLÉSIME, C’EST LE BON MOMENT.'},
  en:{subtitle:'THERE IS MORE TO THE GOLFE THAN THE COAST.',quote:'IN LA CROIX-VALMER, THE LAND HAS ITS OWN STORY.',rhythm:'COME FOR A GLASS. STAY FOR THE STORY.',dark:'A TASTING ROOM IS NOT A CELLAR TOUR.',close:'THE RIGHT VINTAGE BEGINS WITH GOOD TIMING.'}
 },
 'chateau-des-marres':{
  fr:{subtitle:'ENTRE LES VIGNES ET LES PLAGES, UN AUTRE RAMATUELLE.',quote:'APRÈS LA MER, LE GOÛT DE LA TERRE.',rhythm:'VISITER. DÉGUSTER. PRENDRE SON TEMPS.',dark:'RÉSERVER CHANGE TOUT.',close:'UN DOMAINE, PLUSIEURS FAÇONS D’EN PROFITER.'},
  en:{subtitle:'BETWEEN THE VINES AND THE BEACHES, ANOTHER RAMATUELLE.',quote:'BEYOND THE SEA, A TASTE OF THE LAND.',rhythm:'TOUR. TASTE. TAKE YOUR TIME.',dark:'BOOKING AHEAD MAKES THE DIFFERENCE.',close:'ONE ESTATE. MORE THAN ONE WAY TO ENJOY IT.'}
 },
 'base-nautique-cogolin':{
  fr:{subtitle:'LE GOLFE SE DÉCOUVRE AUSSI SUR L’EAU.',quote:'NE REGARDEZ PAS SEULEMENT LA MER. PRENEZ LE LARGE.',rhythm:'APPRENDRE. GLISSER. NAVIGUER.',dark:'LE VENT DÉCIDE AUSSI DU PROGRAMME.',close:'LA BONNE SORTIE COMMENCE AUX MARINES.'},
  en:{subtitle:'THE GOLFE LOOKS DIFFERENT FROM THE WATER.',quote:'DON’T JUST WATCH THE SEA. GET OUT ON IT.',rhythm:'LEARN. PADDLE. SAIL.',dark:'THE WIND HAS A SAY IN YOUR PLANS.',close:'A GREAT DAY ON THE WATER STARTS AT LES MARINES.'}
 },
 'musee-gendarmerie-cinema':{
  fr:{subtitle:'SAINT-TROPEZ, CÔTÉ GRAND ÉCRAN.',quote:'DERRIÈRE LA FAÇADE, TOUT UN CINÉMA.',rhythm:'UNE CASERNE. DES FILMS. UN MYTHE.',dark:'BIEN PLUS QUE LOUIS DE FUNÈS.',close:'LA CULTURE AUSSI A SON ADRESSE.'},
  en:{subtitle:'SAINT-TROPEZ, BEHIND THE CAMERA.',quote:'BEHIND THIS FACADE, A WHOLE WORLD OF CINEMA.',rhythm:'A POLICE STATION. THE FILMS. THE LEGEND.',dark:'MUCH MORE THAN LOUIS DE FUNÈS.',close:'THE TOWN HAS A CULTURAL SIDE TOO.'}
 }
};
export function fallbackSignature(name:string,locale:Locale):Signature{
 const upper=name.toLocaleUpperCase(locale==='fr'?'fr-FR':'en-GB');
 return locale==='fr'
 ?{subtitle:'UNE ADRESSE À VIVRE, PAS JUSTE À COCHER.',quote:upper+'. LE GOLFE A MILLE VISAGES.',rhythm:'VOIR. COMPRENDRE. PROFITER.',dark:'LE BON MOMENT FAIT TOUTE LA DIFFÉRENCE.',close:'LES REPÈRES AVANT DE PARTIR.'}
 :{subtitle:'MORE THAN JUST ANOTHER STOP.',quote:upper+'. ANOTHER SIDE OF THE GOLFE.',rhythm:'DISCOVER. EXPLORE. ENJOY.',dark:'THE RIGHT TIMING MAKES THE DIFFERENCE.',close:'KNOW BEFORE YOU GO.'};
}
