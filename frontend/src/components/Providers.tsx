'use client';

import { type ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { WebsiteProvider } from '@/context/WebsiteContext';
import AppPreferences from '@/components/AppPreferences';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <DarkModeProvider>
        <WebsiteProvider>
          <AppPreferences />
          {children}
        </WebsiteProvider>
      </DarkModeProvider>
    </LanguageProvider>
  );
}
