"use client";

// ---------------------------------------------------------------------------
// Tiny client-side i18n. English is the default; 中文 (Traditional) is the
// second language. Content fields are written as { en: "...", zh: "..." }
// and resolved with pick(). Plain strings (e.g. restaurant names from the
// Google Sheet) pass through pick() untouched — they are never translated.
// ---------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Restore the saved choice after hydration (server always renders EN).
  useEffect(() => {
    if (window.localStorage.getItem("site-lang") === "zh") setLang("zh");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("site-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Resolve a translatable field. Strings pass through unchanged. */
export function pick(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? "";
}
