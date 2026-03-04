'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'pages',
  pageTitleKey: 'sidebar.pages',
  basePath: '/acp/pages',
  editPath: '/acp/pages/edit',
  rowIdPrefix: 'page_',
  confirmDeleteKey: 'pagesApp.confirmDelete',
  titleColumnKey: 'pagesApp.pageTitle',
  showSettingsButton: false,
  showImage: false,
};

export default function PagesListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('pages');

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
