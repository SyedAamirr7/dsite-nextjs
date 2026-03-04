'use client';

import { useAcpList } from '@/hooks/useAcpList';
import AcpDataTable from '@/components/AcpDataTable';

const CONFIG = {
  activeItem: 'products',
  pageTitleKey: 'products.ourProducts',
  basePath: '/acp/products',
  editPath: '/acp/products/edit',
  rowIdPrefix: 'product_',
  confirmDeleteKey: 'products.confirmDelete',
  titleColumnKey: 'products.product',
  settingsTitleKey: 'products.productsPageSettings',
  showImage: true,
  showTotalCount: true,
};

export default function ProductsListPage() {
  const { items, loading, error, updateStatus, removeItem } = useAcpList('products');

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
