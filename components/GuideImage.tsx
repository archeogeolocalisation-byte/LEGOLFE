import Image from "next/image";
import type { Guide } from "../data/guides";
import type { Locale } from "../lib/i18n";
import { mediaForGuide } from "../lib/guideMedia";
export { mediaForGuide } from "../lib/guideMedia";

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
