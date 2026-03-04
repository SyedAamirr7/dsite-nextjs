'use client';

import { useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import enLocale from '@/locales/en.json';
import arLocale from '@/locales/ar.json';

type LocaleKey = string;
export type TranslationParams = Record<string, string | number>;

function flattenKeys(
  obj: Record<string, unknown>,
  prefix: string
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenKeys(value as Record<string, unknown>, fullKey)
      );
    } else if (typeof value === 'string') {
      result[fullKey] = value;
    }
  }
  return result;
}

const enFlat = flattenKeys(enLocale as Record<string, unknown>, '');
const arFlat = flattenKeys(arLocale as Record<string, unknown>, '');

const localeMap: Record<'en' | 'ar', Record<string, string>> = {
  en: enFlat,
  ar: arFlat,
};

export function useTranslation() {
  const { language } = useLanguage();

  const t = useCallback(
    (key: LocaleKey, params?: TranslationParams, localeOverride?: 'en' | 'ar'): string => {
      const resolvedLocale = localeOverride ?? language;
      const locale = localeMap[resolvedLocale] ?? localeMap.en;
      let value = locale[key];
      if (typeof value !== 'string' || value.length === 0) {
        value = localeMap.en[key];
      }
      if (typeof value !== 'string') return key;
      if (params) {
        return Object.entries(params).reduce(
          (str, [k, v]) => str.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v)),
          value
        );
      }
      return value;
    },
    [language]
  );

  return { t, language };
}
