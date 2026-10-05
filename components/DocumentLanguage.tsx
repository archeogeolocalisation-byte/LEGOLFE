"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function DocumentLanguage(){
 const path=usePathname();
 useEffect(()=>{document.documentElement.lang=path === "/fr" || path.startsWith("/fr/") || path.startsWith("/villa/") || path === "/match" ? "fr" : "en";},[path]);
 return null;
}
