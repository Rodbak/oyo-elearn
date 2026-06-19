
"use client";
import React,{createContext,useContext,useState,useEffect} from "react";

export type Locale="en"|"fr";

const LocaleContext=createContext<any>(null);

export const LocaleProvider=({children}:{children:React.ReactNode})=>{
 const [locale,setLocaleState]=useState<Locale>("en");
 useEffect(()=>{
   const saved=typeof window!=="undefined"?localStorage.getItem("lang"):null;
   if(saved==="en"||saved==="fr") setLocaleState(saved);
 },[]);
 const setLocale=(l:Locale)=>{
   localStorage.setItem("lang",l);
   setLocaleState(l);
 };
 const t=(key:string)=>key;
 return <LocaleContext.Provider value={{locale,setLocale,t}}>{children}</LocaleContext.Provider>;
};

export const useLocale=()=>{
 const ctx=useContext(LocaleContext);
 if(!ctx){ return {locale:"en", setLocale:()=>{}, t:(k:string)=>k}; }
 return ctx;
};

export default LocaleProvider;
