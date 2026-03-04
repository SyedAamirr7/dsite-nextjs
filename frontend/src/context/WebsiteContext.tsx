'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getWebsiteId } from '@/config/website';

const STORAGE_KEY = 'acp_website_id';

export interface WebsiteItem {
  id: number;
  domain: string;
}

interface WebsiteContextValue {
  websiteId: number;
  setWebsiteId: (id: number) => void;
  websites: WebsiteItem[];
  setWebsites: (list: WebsiteItem[]) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}

const fallbackId = getWebsiteId();

const WebsiteContext = createContext<WebsiteContextValue | null>(null);

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const [websiteId, setWebsiteIdState] = useState<number>(() => {
    if (typeof window === 'undefined') return fallbackId;
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const n = parseInt(s, 10);
        if (Number.isInteger(n) && n > 0) return n;
      }
    } catch {
      // ignore
    }
    return fallbackId;
  });
  const [websites, setWebsites] = useState<WebsiteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const setWebsiteId = useCallback((id: number) => {
    setWebsiteIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, String(id));
    } catch {
      // ignore
    }
  }, []);

  return (
    <WebsiteContext.Provider
      value={{
        websiteId,
        setWebsiteId,
        websites,
        setWebsites,
        loading,
        setLoading,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite(): WebsiteContextValue {
  const ctx = useContext(WebsiteContext);
  if (!ctx) {
    return {
      websiteId: fallbackId,
      setWebsiteId: () => {},
      websites: [],
      setWebsites: () => {},
      loading: false,
      setLoading: () => {},
    };
  }
  return ctx;
}

/** Current website ID for ACP: from context if available, else env/default. */
export function useWebsiteId(): number {
  const ctx = useContext(WebsiteContext);
  if (ctx) return ctx.websiteId;
  return fallbackId;
}
