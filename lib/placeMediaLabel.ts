import type {Locale} from './i18n';
/** Label the supplied media status without inferring it from the picture. */
export function placeMediaLabel(media:{diagram?:boolean;illustrative?:boolean;contextual?:boolean},locale:Locale):string|undefined{
 const fr=locale==='fr';
 if(media.diagram)return fr?'Schéma de parcours':'Route diagram';
 if(media.illustrative)return fr?'Image d’illustration':'Illustrative image';
 if(media.contextual)return fr?'Photo des environs':'Surroundings photograph';
 return undefined;
}
