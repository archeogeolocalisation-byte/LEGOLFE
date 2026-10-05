import type { FeatureMediaSet } from "./featureMedia";

// Permission applies to this gallery's images when presenting the named hotel.
// Evidence and checked sources are recorded in press/README.md.
export const pressMedia: Record<string, FeatureMediaSet> = {
  "la-voile": {
    hero: {
      src: "https://www.michelreybierhospitality.com/wp-content/uploads/2023/08/lrr_property_interior_lavoile_terrasse_bygregoiregardette_bd-2-1620x1080.jpg",
      alt: "Terrasse de La Voile à La Réserve Ramatuelle, autour d’un olivier",
      credit: "Grégoire Gardette / La Réserve Ramatuelle",
      license: "Usage éditorial lié à La Réserve Ramatuelle",
      source: "https://www.michelreybierhospitality.com/fr/press-image-gallery/",
    },
  },
};
