'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'app-locale';

export type Language = 'en' | 'ar';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'ar') return stored;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' so server and client first render match (avoids hydration mismatch).
  // Stored locale is applied in useEffect after mount.
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = getStoredLanguage();
    setLanguage(stored);
    document.documentElement.setAttribute('data-locale', stored);
    document.documentElement.setAttribute('dir', stored === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', stored);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute('data-locale', next);
      document.documentElement.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', next);
      return next;
    });
  }, []);

  const value: LanguageContextValue = { language, toggleLanguage };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
