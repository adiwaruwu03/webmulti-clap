"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "id" | "en";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "id",
  setLang: () => {},
});

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("lang-change", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("lang-change", cb);
  };
}

function getSnapshot(): Lang {
  try {
    return localStorage.getItem("lang") === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  // server and first client render use "id"; stored choice applies right after hydration
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => "id" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem("lang", l);
    } catch {}
    window.dispatchEvent(new Event("lang-change"));
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Inline translation: children = Indonesian (default, SEO), en = English. */
export function T({ en, children }: { en: ReactNode; children: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : children}</>;
}

/** For attributes such as placeholder: const t = useT(); t("Nama", "Name") */
export function useT() {
  const { lang } = useLang();
  return (id: string, en: string) => (lang === "en" ? en : id);
}
