import {ramatuelleGassinMedia} from './ramatuelleGassinPlaces';
import {freinetCroixMedia} from './freinetCroixPlaces';
import {cavalaireMoleMedia} from './cavalaireMolePlaces';
import {grimaudMedia} from './grimaudPlaces';
import {sainteMaximeMedia} from './sainteMaximePlaces';
import {planDeLaTourMedia} from './planDeLaTourPlaces';
import type {VillagePhoto} from './villageMedia';
export const newExperienceMedia:Record<string,VillagePhoto[]> = {
 ...planDeLaTourMedia,
 ...sainteMaximeMedia,
 ...grimaudMedia,
 ...cavalaireMoleMedia,
 ...freinetCroixMedia,
 ...ramatuelleGassinMedia,
  "domaine-de-la-croix": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Domaine_de_La_Croix_b%C3%A2timent_actuel_%28La_Croix-Valmer%29-1220558.jpg/1280px-Domaine_de_La_Croix_b%C3%A2timent_actuel_%28La_Croix-Valmer%29-1220558.jpg",
      "alt": "Domaine de La Croix, bâtiment viticole à La Croix-Valmer",
      "caption": {
        "fr": "Le bâtiment du Domaine de La Croix, La Croix-Valmer",
        "en": "Domaine de La Croix winery building"
      },
      "credit": "Heinz Reutersberg / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "source": "https://commons.wikimedia.org/wiki/File:Domaine_de_La_Croix_b%C3%A2timent_actuel_(La_Croix-Valmer)-1220558.jpg",
      "contextual": false
    }
  ],
  "chateau-des-marres": [
    {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ramatuelle%20Panorama.jpg",
      "alt": "Vue panoramique de Ramatuelle, secteur viticole",
      "caption": {
        "fr": "Panorama de Ramatuelle — photo du secteur, non du Château des Marres",
        "en": "Ramatuelle panorama — area photograph, not Château des Marres"
      },
      "credit": "En-bateau / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg",
      "contextual": true
    }
  ],
  "base-nautique-cogolin": [
    {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port-Cogolin.JPG",
      "alt": "Port Cogolin, secteur des marines",
      "caption": {
        "fr": "Vue du secteur portuaire de Cogolin — ne représente pas l'école nautique",
        "en": "Port-Cogolin area photograph — not the watersports centre"
      },
      "credit": "Net-breuer / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://commons.wikimedia.org/wiki/File:Port-Cogolin.JPG",
      "contextual": true
    }
  ],
  "musee-gendarmerie-cinema": [
    {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gendarmerie%20de%20Saint-Tropez%20-%20Museum.jpg",
      "alt": "Ancienne gendarmerie, Musée de la Gendarmerie et du Cinéma de Saint-Tropez",
      "caption": {
        "fr": "L'ancienne gendarmerie devenue musée du Cinéma",
        "en": "The former Saint-Tropez gendarmerie, now a cinema museum"
      },
      "credit": "FR / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "source": "https://commons.wikimedia.org/wiki/File:Gendarmerie_de_Saint-Tropez_-_Museum.jpg",
      "contextual": false
    },
    {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Uniforme%20gendarmette%2C%20mus%C3%A9e%20de%20la%20Gendarmerie%20et%20du%20Cin%C3%A9ma%20de%20Saint-Tropez.jpg",
      "alt": "Uniforme exposé au musée",
      "caption": {
        "fr": "Uniforme de cinéma exposé au musée",
        "en": "Film costume displayed at the museum"
      },
      "credit": "Groupir ! / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "source": "https://commons.wikimedia.org/wiki/File:Uniforme_gendarmette,_mus%C3%A9e_de_la_Gendarmerie_et_du_Cin%C3%A9ma_de_Saint-Tropez.jpg",
      "contextual": false
    }
  ]
};
