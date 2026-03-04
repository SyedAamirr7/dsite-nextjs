'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AppPreferences() {
  const { language } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    html.setAttribute('lang', language);
    html.setAttribute('dir', dir);
    html.setAttribute('data-dir', dir);
  }, [language]);

  return null;
}
