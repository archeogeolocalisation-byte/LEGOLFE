"use client";
import {routeLocale} from "../lib/routeLocale";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function DocumentLanguage(){
 const path=usePathname();
 useEffect(()=>{document.documentElement.lang=routeLocale(path);},[path]);
 return null;
}
