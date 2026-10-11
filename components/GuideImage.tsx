import Image, { type StaticImageData } from "next/image";
import pampelonne from "../public/media/guides/pampelonne-cover.webp";
import ramatuelle from "../public/media/guides/ramatuelle-cover.webp";
import saintTropez from "../public/media/guides/saint-tropez-car-free-cover.webp";
import rainyDay from "../public/media/guides/rainy-day-cover.webp";
import whereToStay from "../public/media/guides/where-to-stay-cover.webp";
import sanPeire from "../public/media/guides/san-peire-cover.webp";
import capLardier from "../public/media/guides/cap-lardier-cover.webp";
import pontDesFees from "../public/media/guides/pont-des-fees.webp";
import type { Guide } from "../data/guides";
import type { Locale } from "../lib/i18n";

type GuideMedia = { photo: StaticImageData; kind: "illustration" } | {
  photo: StaticImageData; kind: "photograph"; credit: string; license: string; licenseUrl: string; source: string;
};
export const guideMedia: Record<string, GuideMedia> = {
  "pampelonne-cover": { photo: pampelonne, kind: "illustration" },
  "ramatuelle-cover": { photo: ramatuelle, kind: "illustration" },
  "saint-tropez-car-free-cover": { photo: saintTropez, kind: "illustration" },
  "rainy-day-cover": { photo: rainyDay, kind: "illustration" },
  "where-to-stay-cover": { photo: whereToStay, kind: "illustration" },
  "san-peire-cover": { photo: sanPeire, kind: "illustration" },
  "cap-lardier-cover": { photo: capLardier, kind: "illustration" },
  "pont-des-fees": { photo: pontDesFees, kind: "photograph", credit: "Grimaud Tourisme", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Pont_des_F%C3%A9es_Grimaud.jpg" },
};

export function mediaForGuide(guide: Guide) { return guideMedia[guide.image]; }

export default function GuideImage({ guide, locale, hero = false }: { guide: Guide; locale: Locale; hero?: boolean }) {
  const media = mediaForGuide(guide);
  const illustrated = media.kind === "illustration";
  return <figure>
    <div className={`lg-image relative ${illustrated ? "aspect-[3/2]" : hero ? "aspect-[4/3] md:aspect-[16/7]" : "aspect-[4/3]"}`}>
      <Image src={media.photo} alt={guide.imageAlt[locale]} fill sizes={hero ? "(max-width: 1500px) 100vw, 1440px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"} preload={hero} style={illustrated ? { objectFit: "contain", transform: "none" } : undefined} />
    </div>
    <figcaption className="mt-3 text-[10px] leading-5 text-black/60">
      {guide.imageCaption[locale]}
      {media.kind === "photograph" ? <> · <a className="underline underline-offset-2" href={media.source} target="_blank" rel="noreferrer">{media.credit} / Wikimedia Commons</a> · <a className="underline underline-offset-2" href={media.licenseUrl} target="_blank" rel="noreferrer">{media.license}</a> · {locale === "fr" ? "Redimensionnement, conversion WebP et recadrage d’affichage" : "Resized, converted to WebP and cropped for display"}</> : null}
    </figcaption>
  </figure>;
}
