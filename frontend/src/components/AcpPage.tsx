'use client';

import { ReactNode } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardScripts from '@/components/DashboardScripts';
import { useAcpLayout } from '@/context/AcpLayoutContext';

export interface AcpPageProps {
  pageTitle?: string;
  activeItem?: string;
  topBanner?: ReactNode;
  children: ReactNode;
}

/**
 * When ACP layout already provides DashboardLayout (layoutProvided), only renders children.
 * Otherwise wraps in DashboardLayout + DashboardScripts so pages work without the shared layout too.
 */
export default function AcpPage({ pageTitle, activeItem = 'home', topBanner, children }: AcpPageProps) {
  const { layoutProvided } = useAcpLayout();

  if (layoutProvided) {
    return <>{children}</>;
  }

  return (
    <>
      <DashboardLayout pageTitle={pageTitle} activeItem={activeItem} topBanner={topBanner}>
        {children}
      </DashboardLayout>
      <DashboardScripts />
    </>
  );
}
