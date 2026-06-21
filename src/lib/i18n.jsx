import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/* ── Bilingual FR/EN layer ──
   Components call `const t = useT()` then wrap copy as t('Texte FR', 'EN text').
   Default language is French; the choice is persisted to localStorage. */

const LangContext = createContext({ lang: 'fr', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('fr');

  useEffect(() => {
    const stored = localStorage.getItem('sae-lang');
    if (stored === 'en' || stored === 'fr') setLangState(stored);
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('sae-lang', l); } catch { /* ignore */ }
    if (typeof document !== 'undefined') document.documentElement.lang = l;
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/* Returns t(fr, en) -> the string for the active language (falls back to fr). */
export function useT() {
  const { lang } = useContext(LangContext);
  return useCallback((fr, en) => (lang === 'en' ? (en ?? fr) : fr), [lang]);
}
