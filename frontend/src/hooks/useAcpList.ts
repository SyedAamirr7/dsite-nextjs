'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiFetch, parseResponseJson } from '@/lib/api';
import { useWebsiteId } from '@/context/WebsiteContext';

export type AcpListEntity =
  | 'projects'
  | 'products'
  | 'partners'
  | 'services'
  | 'clients'
  | 'teams'
  | 'workers'
  | 'news'
  | 'gallery'
  | 'branchs'
  | 'jobs'
  | 'pages'
  | 'ads';

export interface AcpListItem {
  id: number;
  title: string;
  imageSrc?: string;
  status: boolean;
  totalApplications?: number;
}

export function useAcpList(entity: AcpListEntity) {
  const [items, setItems] = useState<AcpListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const websiteId = useWebsiteId();

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(
        `/api/acp/list/${entity}?websiteId=${encodeURIComponent(websiteId)}`
      );
      if (!res.ok) {
        const data = await parseResponseJson<{ message?: string; error?: string }>(res).catch(
          (): { message?: string; error?: string } => ({})
        );
        throw new Error(data.message || data.error || `Failed to load ${entity}`);
      }
      const data = await parseResponseJson<AcpListItem[]>(res);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load list');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [entity, websiteId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const updateStatus = useCallback((id: number, status: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    // TODO: call backend PATCH when API is ready
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    // TODO: call backend DELETE when API is ready
  }, []);

  return {
    items,
    setItems,
    loading,
    error,
    refetch: fetchList,
    updateStatus,
    removeItem,
  };
}
