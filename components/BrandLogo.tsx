import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../lib/i18n";

const logo = "/media/brand/legolfe-saint-tropez-v2.webp";

export function BrandLogo({locale="en",light=true,compact=false}:{locale?:Locale;light?:boolean;compact?:boolean}){
  return <Link href={`/${locale}`} aria-label="LE GOLFE — Saint-Tropez" className={`inline-flex min-h-11 shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${light?"text-[var(--lg-blue)]":"text-white"}`}>
    <Image src={logo} width={1200} height={274} alt="LEGOLFE — SAINT-TROPEZ" unoptimized loading="eager" className={`block h-auto ${compact?"w-32 sm:w-[170px] md:w-[200px]":"w-[210px] md:w-[260px]"} ${light?"":"brightness-0 invert"}`}/>
  </Link>
}

export function BrandMonogram({light=true}:{light?:boolean}){
  return <span aria-label="LE GOLFE" className={`relative inline-grid h-10 w-10 place-items-center ${light?"text-[var(--lg-blue)]":"text-white"}`}>
    <span className="absolute left-0 top-0 text-[29px] font-black leading-none tracking-[-.13em]">L</span>
    <span className="absolute bottom-0 right-0 text-[29px] font-black leading-none tracking-[-.13em]">G</span>
  </span>
}
