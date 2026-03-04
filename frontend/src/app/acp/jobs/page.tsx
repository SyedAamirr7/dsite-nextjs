'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'jobs',
  pageTitleKey: 'jobsApp.title',
  basePath: '/acp/jobs',
  editPath: '/acp/jobs/edit',
  rowIdPrefix: 'career_',
  confirmDeleteKey: 'jobsApp.confirmDelete',
  titleColumnKey: 'jobsApp.titleLabel',
  settingsTitleKey: 'jobsApp.pageSettingsTitle',
  showImage: false,
  addButtonKey: 'jobsApp.add',
  extraActionLabelKey: 'jobsApp.viewApplication',
  extraActionPath: (id: number) => `/acp/jobs/application?id=${id}`,
};

export default function JobsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('jobs');

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
