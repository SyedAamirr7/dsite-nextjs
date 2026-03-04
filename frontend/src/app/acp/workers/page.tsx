'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'workers',
  pageTitleKey: 'workers.title',
  basePath: '/acp/workers',
  editPath: '/acp/workers/edit',
  rowIdPrefix: 'worker_',
  confirmDeleteKey: 'workers.confirmDelete',
  titleColumnKey: 'workers.work',
  settingsTitleKey: 'workers.pageSettings',
  showImage: true,
};

export default function WorkersListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('workers');

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
