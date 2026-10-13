import type {VillagePhoto} from './villageMedia';
export type FactPhoto=VillagePhoto & {width:number;height:number};
export const placeFactsMedia:Record<string,FactPhoto> = {
  "grimaud-village": {
    "src": "/media/place-facts/grimaud-village.webp",
    "alt": "Le village de Grimaud (2023)",
    "caption": {
      "fr": "Le village de Grimaud (2023)",
      "en": "Grimaud village (2023)"
    },
    "credit": "Grimaud Tourisme / Wikimedia Commons",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Grimaud_%28Var%29.jpg",
    "width": 1400,
    "height": 933
  },
  "port-grimaud": {
    "src": "/media/place-facts/port-grimaud.webp",
    "alt": "Port Grimaud vu du ciel (2024)",
    "caption": {
      "fr": "Port Grimaud vu du ciel (2024)",
      "en": "Port Grimaud from above (2024)"
    },
    "credit": "Cyril Carpentier / Grimaud Tourisme / Wikimedia Commons",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:La_cit%C3%A9_lacustre_de_Port_Grimaud%2C_vue_du_ciel.jpg",
    "width": 1400,
    "height": 899
  },
  "sainte-maxime-village": {
    "src": "/media/place-facts/sainte-maxime-village.webp",
    "alt": "Le port, la Tour Carrée et l’église de Sainte-Maxime (2019)",
    "caption": {
      "fr": "Le port, la Tour Carrée et l’église de Sainte-Maxime (2019)",
      "en": "Sainte-Maxime harbour, Tour Carrée and church (2019)"
    },
    "credit": "Jibi44 / Wikimedia Commons",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Sainte-Maxime_port_tour_carr%C3%A9_%C3%A9glise.jpg",
    "width": 1400,
    "height": 1050
  },
  "cogolin-village": {
    "src": "/media/place-facts/cogolin-village.webp",
    "alt": "Rue du Piquet dans le vieux Cogolin (2018)",
    "caption": {
      "fr": "Rue du Piquet dans le vieux Cogolin (2018)",
      "en": "Rue du Piquet in old Cogolin (2018)"
    },
    "credit": "Villedecogolin / Wikimedia Commons",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Cogolin_-_Rue_du_piquet.jpg",
    "width": 1400,
    "height": 933
  }
};
