"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageDirection() {
  const { lang } = useLanguage();

  useEffect(() => {
    // Automatically switch to Right-to-Left when Arabic is selected
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return null; // This component doesn't render anything visible
}