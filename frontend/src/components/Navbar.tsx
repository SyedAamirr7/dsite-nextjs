'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useDarkMode } from '@/context/DarkModeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useWebsite } from '@/context/WebsiteContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getMyWebsites } from '@/services/myWebsitesService';

interface NavbarProps {
  pageTitle?: string;
}
export default function Navbar({ pageTitle }: NavbarProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleDarkMode } = useDarkMode();
  const { websiteId, setWebsiteId, websites, setWebsites, setLoading } = useWebsite();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [domainFilter, setDomainFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    getMyWebsites()
      .then((list) => {
        setWebsites(list);
        if (list.length > 0) {
          const inList = list.some((w) => w.id === websiteId);
          if (!inList) setWebsiteId(list[0].id);
        }
      })
      .catch(() => setWebsites([]))
      .finally(() => setLoading(false));
  }, [setWebsites, setLoading, setWebsiteId, websiteId]);

  const currentWebsite = websites.find((w) => w.id === websiteId);
  const displayTitle = currentWebsite?.domain ?? (currentWebsite ? `Website ${currentWebsite.id}` : '—');
  const displayDomain = currentWebsite?.domain ?? '—';
  const filteredWebsites = domainFilter.trim()
    ? websites.filter(
        (w) =>
          w.domain.toLowerCase().includes(domainFilter.toLowerCase())
      )
    : websites;

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/acp/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      const text = await res.text();
      let data: { redirect?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        // Response may be HTML (e.g. redirect page); still redirect to login
      }
      const redirectTo = data?.redirect ?? '/acp/login';
      router.push(redirectTo);
    } catch {
      router.push('/acp/login');
    }
  };

  const languageLabel = language === 'ar' ? t('common.languageEn') : t('common.languageAr');
  const languageTitle =
    language === 'ar' ? t('nav.switchToEnglish') : t('nav.switchToArabic');

  const logoutOverlay =
    typeof document !== 'undefined' &&
    isLoggingOut &&
    createPortal(
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#F0F0F0',
        }}
      />,
      document.body
    );

  return (
    <>
      {logoutOverlay}
      <nav className="navbar navbar-light main-navbar navbar-expand justify-content-between gap-4 flex-wrap">
      <div className="head d-flex align-items-center">
        <button
          type="button"
          className="menu-toggle menu-toggle-nav"
          data-react-menu-toggle
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const wrapper = document.getElementById('wrapper');
            if (wrapper) wrapper.classList.toggle('toggled');
          }}
          aria-label={t('nav.menuToggle') ?? 'Menu'}
          title={t('nav.menuToggle') ?? 'Menu'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="page-title">{pageTitle ?? t('nav.defaultPageTitle')}</h1>
      </div>

      <div className="action">
        <div className="d-flex">
          <a
            href="#"
            className="plan-status active-plan"
            onClick={(e) => e.preventDefault()}
          >
            <span className="title-status">{t('nav.planStatus')}</span>
            <span className="dot-status"></span>
          </a>
        </div>

        <div className="website-name">
          <div className="dropdown user-dropdown">
            <button
              className="btn bg-transparent border-0 dropdown-toggle no-after"
              type="button"
              id="triggerWebsiteId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="d-block text-left">
                <h2 className="website-title whiteColor_dark">
                  {displayTitle}
                </h2>
                <p className="website-domain">{displayDomain}</p>
              </div>
            </button>
            <div
              className="dropdown-menu dropdown-menu-left"
              aria-labelledby="triggerWebsiteId"
            >
              <input
                type="text"
                className="form-control"
                placeholder={t('nav.domainSearchPlaceholder')}
                id="searchDomain"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
              />
              {filteredWebsites.length === 0 ? (
                <div className="dropdown-item text-muted">
                  {websites.length === 0 ? t('nav.noWebsites') : t('nav.noMatch')}
                </div>
              ) : (
                filteredWebsites.map((w) => (
                  <a
                    key={w.id}
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setWebsiteId(w.id);
                    }}
                  >
                    <h2 className="website-title">{w.domain}</h2>
                    <p className="website-domain">www.{w.domain}</p>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>

        <a
          href="#!"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary px-md-4 px-2 d-inline-flex align-items-center ${language === 'ar' ? 'gap-2' : 'gap-0'}`}
          style={{ width: '187.5px' }}
          title={t('nav.previewSiteTitle')}
          onClick={(e) => e.preventDefault()}
        >
          <img src="/assets/img/blank.svg" alt={t('nav.previewSiteTitle')} />
          <span className={`d-md-block d-none fw-bold ${language === 'ar' ? 'ml-2' : ''}`}>{t('nav.previewSite')}</span>
        </a>

        <label
          className="dark-light_label mb-0"
          htmlFor="darkModeSwitch"
          onClick={(e) => {
            e.preventDefault();
            toggleDarkMode();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDarkMode();
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={isDark}
          aria-label={isDark ? t('nav.lightMode') : t('nav.darkMode')}
        >
          <input
            id="darkModeSwitch"
            className="d-none"
            type="checkbox"
            checked={isDark}
            readOnly
            tabIndex={-1}
            aria-hidden
          />
          <div className="icon icon--moon" title={t('nav.darkMode')}>
            <svg
              height="24"
              width="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className="icon icon--sun" title={t('nav.lightMode')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 36 36"
              aria-hidden="true"
              role="img"
              className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fill="#FFAC33"
                d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"
              />
              <circle fill="#FFAC33" cx="18" cy="18" r="10" />
            </svg>
          </div>
        </label>

        <div className="dropdown user-dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            type="button"
            id="triggerUserMenuId"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={(e) => e.preventDefault()}
          >
            <div className="user-pic">
              <img src="/assets/img/user-pic.png" alt="" />
            </div>
          </a>
          <div
            className="dropdown-menu dropdown-menu-left user-account-menu"
            aria-labelledby="triggerUserMenuId"
            dir="ltr"
          >
            <Link className="dropdown-item" href="/acp/profile">
              {t('nav.myAccount')}
            </Link>
            <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
              {t('nav.changePassword')}
            </a>
            <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
              {t('nav.settings')}
            </a>
            <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
              {t('nav.notifications')}
            </a>
            <div className="dropdown-divider"></div>
            <form action="/api/acp/auth/logout" method="post" className="d-inline w-100" onSubmit={handleLogout}>
              <button
                type="submit"
                className="dropdown-item text-danger border-0 bg-transparent w-100 text-start"
              >
                {t('nav.logout')}
              </button>
            </form>
          </div>
        </div>

        <LanguageSwitcher
          label={languageLabel}
          title={languageTitle}
          onToggle={toggleLanguage}
        />
      </div>
    </nav>
    </>
  );
}
