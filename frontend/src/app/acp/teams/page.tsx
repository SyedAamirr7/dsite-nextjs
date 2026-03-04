'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'teams',
  pageTitleKey: 'teamsApp.title',
  basePath: '/acp/teams',
  editPath: '/acp/teams/edit',
  rowIdPrefix: 'team_',
  confirmDeleteKey: 'teamsApp.confirmDelete',
  titleColumnKey: 'common.name',
  settingsTitleKey: 'teamsApp.pageSettingsTitle',
  showImage: true,
};

export default function TeamsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('teams');

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
