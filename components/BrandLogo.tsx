import Link from "next/link";
import type { Locale } from "../lib/i18n";

export function BrandLogo({locale="en",light=true,compact=false}:{locale?:Locale;light?:boolean;compact?:boolean}){
  return <Link href={`/${locale}`} aria-label="LE GOLFE" className={`inline-flex items-end gap-3 ${light?"text-black":"text-white"}`}>
    <span className={`${compact?"text-[24px] md:text-[30px]":"text-[30px] md:text-[38px]"} font-black uppercase leading-[.78] tracking-[-.075em]`}>LE GOLFE</span>
    {!compact&&<span className="hidden pb-[2px] text-[7px] font-black uppercase leading-none tracking-[.22em] opacity-55 lg:block">Saint-Tropez<br/>Villages · Plages</span>}
  </Link>
}

export function BrandMonogram({light=true}:{light?:boolean}){
  return <span aria-label="LE GOLFE" className={`relative inline-grid h-10 w-10 place-items-center ${light?"text-black":"text-white"}`}>
    <span className="absolute left-0 top-0 text-[29px] font-black leading-none tracking-[-.13em]">L</span>
    <span className="absolute bottom-0 right-0 text-[29px] font-black leading-none tracking-[-.13em]">G</span>
  </span>
}
