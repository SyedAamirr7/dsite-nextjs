'use client';

import { ReactNode } from 'react';
import Stylesheets from '@/components/Stylesheets';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import PopoverInit from '@/components/PopoverInit';
import { useTranslation } from '@/hooks/useTranslation';

export interface DashboardLayoutProps {
  /** Title shown in the top navbar */
  pageTitle?: string;
  /** Sidebar item key for active state (e.g. "home", "products", "ads") */
  activeItem?: string;
  /** Optional full-bleed banner above main content (e.g. domain expired alert) */
  topBanner?: ReactNode;
  /** Page content rendered below the navbar */
  children: ReactNode;
}

export default function DashboardLayout({
  pageTitle,
  activeItem = 'home',
  topBanner,
  children,
}: DashboardLayoutProps) {
  const { t } = useTranslation();
  return (
    <>
      <Stylesheets />
      <PopoverInit />
      <div id="wrapper" className="toggled">
        <Sidebar activeItem={activeItem} />
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <Navbar pageTitle={pageTitle ?? t('nav.defaultPageTitle')} />
            {topBanner}
            <div className="page-content-wrapper">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
