'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JQuery = any;

/**
 * Re-initializes Bootstrap popovers and tooltips when route changes.
 * Fixes the issue where popovers don't work after client-side navigation
 * because custom.js only runs once on initial load.
 */
export default function PopoverInit() {
  const pathname = usePathname();

  useEffect(() => {
    const w = typeof window !== 'undefined' ? window : null;
    const $ = w && ((w as Window & { $?: JQuery }).$ ?? (w as Window & { jQuery?: JQuery }).jQuery);
    if (!$) return;

    const initPopoversAndTooltips = () => {
      $('[data-toggle="popover"]').each(function (this: HTMLElement) {
        const el = $(this);
        if (el.data?.('bs.popover')) {
          el.popover('dispose');
        }
        el.popover();
      });
      $('[data-toggle="tooltip"]').each(function (this: HTMLElement) {
        const el = $(this);
        if (el.data?.('bs.tooltip')) {
          el.tooltip('dispose');
        }
        el.tooltip();
      });
    };

    // Small delay to ensure DOM has finished rendering
    const t = setTimeout(initPopoversAndTooltips, 0);

    return () => {
      clearTimeout(t);
      $('[data-toggle="popover"]').each(function (this: HTMLElement) {
        const el = $(this);
        if (el.data?.('bs.popover')) {
          el.popover('dispose');
        }
      });
      $('[data-toggle="tooltip"]').each(function (this: HTMLElement) {
        const el = $(this);
        if (el.data?.('bs.tooltip')) {
          el.tooltip('dispose');
        }
      });
    };
  }, [pathname]);

  return null;
}
