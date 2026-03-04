'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'clients',
  pageTitleKey: 'sidebar.clients',
  basePath: '/acp/clients',
  editPath: '/acp/clients/edit',
  rowIdPrefix: 'client_',
  confirmDeleteKey: 'clientsApp.confirmDelete',
  titleColumnKey: 'clientsApp.partner',
  settingsTitleKey: 'sidebar.clients',
  showImage: true,
};

export default function ClientsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('clients');

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
