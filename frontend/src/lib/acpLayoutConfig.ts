/**
 * Maps ACP pathname to sidebar activeItem and navbar pageTitleKey.
 * Used by shared ACP layout so navbar/sidebar don't remount on navigation.
 */
export function getAcpLayoutConfig(pathname: string): { activeItem: string; pageTitleKey: string } | null {
  if (!pathname.startsWith('/acp')) return null;
  const segments = pathname.replace(/^\/acp\/?/, '').split('/').filter(Boolean);
  if (segments[0] === 'login') return null;

  // /acp (redirect to home) or /acp/home (dashboard home)
  if (segments.length === 0) return { activeItem: 'home', pageTitleKey: 'nav.defaultPageTitle' };

  const first = segments[0];
  if (first === 'home') return { activeItem: 'home', pageTitleKey: 'dashboard.controlDashboard' };
  const second = segments[1];

  if (first === 'settings') {
    const sub = second || 'site-information';
    const titleMap: Record<string, string> = {
      'site-information': 'settings.title',
      'site-content': 'settings.siteContent',
      'design': 'settings.design',
      'administrators': 'settings.administrators',
      'pixel': 'settings.pixelTracking',
      'forms': 'settings.title',
      'domain': 'settings.domain',
      'subscriptions': 'settings.subscriptions',
    };
    return {
      activeItem: ['site-information', 'site-content', 'design', 'administrators', 'pixel', 'forms', 'domain', 'subscriptions'].includes(sub) ? sub : 'site-information',
      pageTitleKey: titleMap[sub] ?? 'settings.title',
    };
  }

  if (first === 'presentation-slides') return { activeItem: 'presentation-slides', pageTitleKey: 'sidebar.presentationSlides' };
  if (first === 'about') return { activeItem: 'about', pageTitleKey: 'about.aboutUs' };
  if (first === 'pages') return { activeItem: 'pages', pageTitleKey: 'sidebar.pages' };
  if (first === 'services') return { activeItem: 'services', pageTitleKey: 'services.title' };
  if (first === 'products') return { activeItem: 'products', pageTitleKey: 'products.ourProducts' };
  if (first === 'projects') return { activeItem: 'projects', pageTitleKey: 'projects.title' };
  if (first === 'workers') return { activeItem: 'workers', pageTitleKey: 'workers.title' };
  if (first === 'teams') return { activeItem: 'teams', pageTitleKey: 'teamsApp.title' };
  if (first === 'gallery') return { activeItem: 'gallery', pageTitleKey: 'sidebar.galleryImages' };
  if (first === 'news') return { activeItem: 'news', pageTitleKey: 'sidebar.news' };
  if (first === 'visual') return { activeItem: 'visual', pageTitleKey: 'visual.introductoryVideo' };
  if (first === 'branchs') return { activeItem: 'branchs', pageTitleKey: 'sidebar.branches' };
  if (first === 'clients') return { activeItem: 'clients', pageTitleKey: 'sidebar.clients' };
  if (first === 'marketing') return { activeItem: 'marketing', pageTitleKey: 'sidebar.contentMarketing' };
  if (first === 'downloadapp') return { activeItem: 'downloadapp', pageTitleKey: 'sidebar.downloadApp' };
  if (first === 'ads') return { activeItem: 'ads', pageTitleKey: 'ads.title' };
  if (first === 'restaurants') return { activeItem: 'restaurants', pageTitleKey: 'restaurantsApp.title' };
  if (first === 'restaurantOrders') return { activeItem: 'restaurantOrders', pageTitleKey: 'restaurantOrdersApp.title' };
  if (first === 'jobs') return { activeItem: 'jobs', pageTitleKey: 'jobsApp.title' };
  if (first === 'partners') return { activeItem: 'partners', pageTitleKey: 'partnersApp.title' };
  if (first === 'plans') return { activeItem: 'plans', pageTitleKey: 'plans.title' };
  if (first === 'inbox') return { activeItem: 'inbox', pageTitleKey: 'inboxApp.title' };
  if (first === 'profile') return { activeItem: 'home', pageTitleKey: 'profile.title' };
  if (first === 'setting') return { activeItem: 'site-information', pageTitleKey: 'settingPage.title' };

  return { activeItem: first, pageTitleKey: 'nav.defaultPageTitle' };
}
