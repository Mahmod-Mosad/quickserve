import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

type Language = 'en' | 'ar';

const dictionaries: Record<Language, Record<string, unknown>> = { en, ar };

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('quickserve-language');
    return saved === 'ar' ? 'ar' : 'en';
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('quickserve-language', language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  }

  function t(key: string): string {
    const keys = key.split('.');
    let result: unknown = dictionaries[language];

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
}