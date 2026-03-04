'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'news',
  pageTitleKey: 'sidebar.news',
  basePath: '/acp/news',
  editPath: '/acp/news/edit',
  rowIdPrefix: 'news_',
  confirmDeleteKey: 'newsApp.confirmDelete',
  titleColumnKey: 'newsApp.theNews',
  settingsTitleKey: 'sidebar.news',
  showImage: true,
};

export default function NewsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('news');

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
