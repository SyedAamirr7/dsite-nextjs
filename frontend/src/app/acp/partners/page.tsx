'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'partners',
  pageTitleKey: 'partnersApp.title',
  basePath: '/acp/partners',
  editPath: '/acp/partners/edit',
  rowIdPrefix: 'partner_',
  confirmDeleteKey: 'partnersApp.confirmDelete',
  titleColumnKey: 'partnersApp.customer',
  settingsTitleKey: 'partnersApp.pageSettingsTitle',
  showImage: true,
};

export default function PartnersListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('partners');

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
