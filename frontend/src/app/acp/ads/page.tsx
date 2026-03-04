'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'ads',
  pageTitleKey: 'ads.title',
  basePath: '/acp/ads',
  editPath: '/acp/ads/edit',
  rowIdPrefix: 'adver_',
  confirmDeleteKey: 'ads.confirmDelete',
  titleColumnKey: 'ads.title',
  showSettingsButton: false,
  showImage: false,
};

export default function AdsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('ads');

  return (
    <AcpDataTable
      config={CONFIG}
      items={items}
      loading={loading}
      error={error}
      onStatusToggle={updateStatus}
      onDelete={removeItem}
    />
  );
}
