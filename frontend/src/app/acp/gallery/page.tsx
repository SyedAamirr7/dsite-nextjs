'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'gallery',
  pageTitleKey: 'sidebar.galleryImages',
  basePath: '/acp/gallery',
  editPath: '/acp/gallery/edit',
  rowIdPrefix: 'gallery_',
  confirmDeleteKey: 'gallery.confirmDelete',
  titleColumnKey: 'gallery.images',
  settingsTitleKey: 'sidebar.galleryImages',
  showImage: true,
};

export default function GalleryListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('gallery');

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
