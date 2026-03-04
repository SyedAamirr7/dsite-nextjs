'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'branchs',
  pageTitleKey: 'sidebar.branches',
  basePath: '/acp/branchs',
  editPath: '/acp/branchs/edit',
  rowIdPrefix: 'branch_',
  confirmDeleteKey: 'branchesApp.confirmDelete',
  titleColumnKey: 'branchesApp.branch',
  settingsTitleKey: 'sidebar.branches',
  showImage: true,
};

export default function BranchsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('branchs');

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
