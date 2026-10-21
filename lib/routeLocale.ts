import type {Locale} from './i18n';
export function routeLocale(path:string):Locale{
 return path==='/fr'||path.startsWith('/fr/')||path.startsWith('/villa/')||path==='/match'||path==='/requests'?'fr':'en';
}
