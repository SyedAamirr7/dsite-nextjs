'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'isDarkMode';

interface DarkModeContextValue {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue | null>(null);

function getStoredDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  // Always start false so server and client first paint match (avoids hydration mismatch)
  const [isDark, setIsDark] = useState(false);

  // After mount, read from storage and sync (avoids hydration mismatch from server/client differing)
  useLayoutEffect(() => {
    const stored = getStoredDarkMode();
    setIsDark(stored);
    const isLoginPage = window.location.pathname === '/acp/login';
    if (!isLoginPage) {
      document.body.classList.toggle('dark', stored);
    } else {
      document.body.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-dark-mode', stored ? 'true' : 'false');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      const isLoginPage = window.location.pathname === '/acp/login';
      if (!isLoginPage) {
        document.body.classList.toggle('dark', next);
      } else {
        document.body.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-dark-mode', next ? 'true' : 'false');
      return next;
    });
  }, []);

  const value: DarkModeContextValue = { isDark, toggleDarkMode };

  return (
    <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
  );
}

export function useDarkMode(): DarkModeContextValue {
  const ctx = useContext(DarkModeContext);
  if (!ctx) {
    return {
      isDark: false,
      toggleDarkMode: () => {},
    };
  }
  return ctx;
}
