
"use client";
import { useLocale } from "@/components/i18n";
export function LanguageSwitcher({ className }: { className?: string }) {
 const { locale,setLocale }=useLocale();
 return <select className={className+" rounded-inner px-3 py-2 text-sm"} value={locale}
 onChange={e=>{setLocale(e.target.value as any); localStorage.setItem("lang",e.target.value);}}>
 <option value="en">English</option>
 <option value="fr">Français</option>
 </select>
}
