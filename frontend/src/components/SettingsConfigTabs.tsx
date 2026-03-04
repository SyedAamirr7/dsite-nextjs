'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const SETTINGS_TAB_IDS = [
  'site-information',
  'site-content',
  'design',
  'administrators',
  'pixel',
  'forms',
  'domain',
  'subscriptions',
] as const;

const SETTINGS_TAB_LABEL_KEYS: Record<string, string> = {
  'site-information': 'siteInformation',
  'site-content': 'siteContent',
  'design': 'design',
  'administrators': 'administrators',
  'pixel': 'pixel',
  'forms': 'forms',
  'domain': 'domain',
  'subscriptions': 'subscriptions',
};

interface SettingsConfigTabsProps {
  activeTab: string;
}

export default function SettingsConfigTabs({ activeTab }: SettingsConfigTabsProps) {
  const { t } = useTranslation();

  const tabs = SETTINGS_TAB_IDS.map((id) => ({
    id,
    href: `/acp/settings/${id}`,
    label: t(`settings.${SETTINGS_TAB_LABEL_KEYS[id]}`),
  }));

  return (
    <div className="row">
      <div className="col-lg-12">
        <nav className="nav nav-tabs config-tab mb-4">
          {tabs.map(({ id, href, label }) => (
            <Link
              key={id}
              href={href}
              className={`nav-link ${activeTab === id ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
