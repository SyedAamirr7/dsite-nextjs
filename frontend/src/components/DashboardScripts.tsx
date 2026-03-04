'use client';

import Script from 'next/script';

export interface DashboardScriptsProps {
  /** Include filter-domains.js (default: true) */
  includeFilterDomains?: boolean;
}

const COMMON_SCRIPTS = [
  { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', strategy: 'beforeInteractive' as const },
  { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', strategy: 'beforeInteractive' as const },
  { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', strategy: 'beforeInteractive' as const },
  { src: '/assets/js/bootstrap-tagsinput.min.js', strategy: 'lazyOnload' as const },
  { src: '/assets/js/custom.js', strategy: 'lazyOnload' as const },
  { src: '/assets/js/language-switcher.js', strategy: 'lazyOnload' as const },
];

export default function DashboardScripts({ includeFilterDomains = true }: DashboardScriptsProps) {
  return (
    <>
      {COMMON_SCRIPTS.map(({ src, strategy }) => (
        <Script key={src} src={src} strategy={strategy} />
      ))}
      {includeFilterDomains && (
        <Script src="/assets/js/filter-domains.js" strategy="lazyOnload" />
      )}
    </>
  );
}
