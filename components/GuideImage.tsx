import Image from "next/image";
import pampelonne from "../public/media/guides/pampelonne.webp";
import ramatuelle from "../public/media/guides/ramatuelle.webp";
import saintTropez from "../public/media/guides/saint-tropez.webp";
import sainteMaxime from "../public/media/guides/sainte-maxime.webp";
import planDeLaTour from "../public/media/guides/plan-de-la-tour.webp";
import capLardier from "../public/media/guides/cap-lardier.webp";
import pontDesFees from "../public/media/guides/pont-des-fees.webp";
import type { Guide } from "../data/guides";
import type { Locale } from "../lib/i18n";

export const guideMedia = {
  "plan-de-la-tour": { photo: planDeLaTour, credit: "Patricia.fidi", license: "Public domain", licenseUrl: "https://commons.wikimedia.org/wiki/File:Plan-de-la-tour-01.jpg", source: "https://commons.wikimedia.org/wiki/File:Plan-de-la-tour-01.jpg" },
  "cap-lardier": { photo: capLardier, credit: "Gnrc", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", source: "https://commons.wikimedia.org/wiki/File:Cap_Taillat,_depuis_cap_Lardier,_La_Croix-Valmer,_France.jpg" },
  "pont-des-fees": { photo: pontDesFees, credit: "Grimaud Tourisme", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Pont_des_F%C3%A9es_Grimaud.jpg" },
  pampelonne: { photo: pampelonne, credit: "dronepicr", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Pampelonne_Beach,_Saint-Tropez,_France_(52723263302).jpg" },
  "ramatuelle-village": { photo: ramatuelle, credit: "En-bateau", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg" },
  "saint-tropez-village": { photo: saintTropez, credit: "Starus", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_-_Vue_a%C3%A9rienne_(3).jpg" },
  "sainte-maxime-village": { photo: sainteMaxime, credit: "Jibi44", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Sainte-Maxime_port_tour_carr%C3%A9_%C3%A9glise.jpg" },
};

export function mediaForGuide(guide: Guide) { return guideMedia[guide.image as keyof typeof guideMedia]; }

export default function GuideImage({ guide, locale, hero = false }: { guide: Guide; locale: Locale; hero?: boolean }) {
  const media = mediaForGuide(guide);
  return <figure>
    <div className={`lg-image relative ${hero ? "aspect-[4/3] md:aspect-[16/7]" : "aspect-[4/3]"}`}>
      <Image src={media.photo} alt={guide.imageAlt[locale]} fill sizes={hero ? "(max-width: 1500px) 100vw, 1440px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"} preload={hero} />
    </div>
    <figcaption className="mt-3 text-[10px] leading-5 text-black/60">
      {guide.imageCaption[locale]} · <a className="underline underline-offset-2" href={media.source} target="_blank" rel="noreferrer">{media.credit} / Wikimedia Commons</a> · <a className="underline underline-offset-2" href={media.licenseUrl} target="_blank" rel="noreferrer">{media.license}</a> · {locale === "fr" ? "Redimensionnement, conversion WebP et recadrage d’affichage" : "Resized, converted to WebP and cropped for display"}
    </figcaption>
  </figure>;
}
