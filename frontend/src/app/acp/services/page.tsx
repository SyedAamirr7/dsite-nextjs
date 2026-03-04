'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'services',
  pageTitleKey: 'services.title',
  basePath: '/acp/services',
  editPath: '/acp/services/edit',
  rowIdPrefix: 'service_',
  confirmDeleteKey: 'services.confirmDelete',
  titleColumnKey: 'services.service',
  settingsTitleKey: 'services.servicesPageSettings',
  showImage: true,
};

export default function ServicesListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('services');

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
