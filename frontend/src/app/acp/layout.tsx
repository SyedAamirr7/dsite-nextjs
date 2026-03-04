'use client';

import { usePathname } from 'next/navigation';
import { getAcpLayoutConfig } from '@/lib/acpLayoutConfig';
import { AcpLayoutProvider } from '@/context/AcpLayoutContext';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardScripts from '@/components/DashboardScripts';
import { useTranslation } from '@/hooks/useTranslation';

export default function AcpLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const config = pathname ? getAcpLayoutConfig(pathname) : null;

  if (pathname === '/acp/login' || !config) {
    return <>{children}</>;
  }

  const pageTitle = t(config.pageTitleKey);

  return (
    <AcpLayoutProvider value={{ layoutProvided: true }}>
      <DashboardLayout
        activeItem={config.activeItem}
        pageTitle={pageTitle}
      >
        <DashboardScripts />
        {children}
      </DashboardLayout>
    </AcpLayoutProvider>
  );
}
