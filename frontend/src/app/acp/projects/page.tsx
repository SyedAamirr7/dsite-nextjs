'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'projects',
  pageTitleKey: 'projects.title',
  basePath: '/acp/projects',
  editPath: '/acp/projects/edit',
  rowIdPrefix: 'project_',
  confirmDeleteKey: 'projects.confirmDelete',
  titleColumnKey: 'projects.project',
  settingsTitleKey: 'projects.pageSettings',
  showSettingsButton: true,
  showAddButton: true,
  showImage: true,
  orderPath: '/acp/projects/order',
};

export default function ProjectsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('projects');

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
