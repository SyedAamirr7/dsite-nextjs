'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

interface RestaurantApp {
  id: number;
  enabled: boolean;
  imageSrc: string;
  imageAlt: string;
  appName: string;
  androidUrl: string;
  iosUrl: string;
}

const INITIAL_APPS: RestaurantApp[] = [
  { id: 1, enabled: true, imageSrc: '/assets/img/Restaurant/hungerStation.webp', imageAlt: 'Hunger station', appName: '', androidUrl: '', iosUrl: '' },
  { id: 2, enabled: true, imageSrc: '/assets/img/Restaurant/jahez.webp', imageAlt: 'Jahez', appName: '', androidUrl: '', iosUrl: '' },
  { id: 3, enabled: true, imageSrc: '/assets/img/Restaurant/noon.webp', imageAlt: 'Noon', appName: '', androidUrl: '', iosUrl: '' },
  { id: 4, enabled: true, imageSrc: '/assets/img/Restaurant/theChefz.webp', imageAlt: 'The Chefz', appName: '', androidUrl: '', iosUrl: '' },
];

function GooglePlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google-play" viewBox="0 0 16 16">
      <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
    </svg>
  );
}

export default function RestaurantsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [apps, setApps] = useState<RestaurantApp[]>(INITIAL_APPS);

  const updateApp = (id: number, field: keyof RestaurantApp, value: string | boolean) => {
    setApps(apps.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save restaurants', { titleEn, titleAr, apps });
    router.push('/restaurants');
  };

  return (
    <>
      <AcpPage pageTitle={t('restaurantsApp.title')} activeItem="restaurants">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4">
                    <Link href="/acp/setting" className="btn btn-secondary" title={t('restaurantsApp.pageSettingsTitle')}>
                      <i className="fas fa-cog"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <nav className="nav nav-tabs language-tab">
                      <button type="button" className={`nav-link ${activeLang === 'en' ? 'active' : ''}`} onClick={() => setActiveLang('en')}>
                        {t('common.english')}
                      </button>
                      <button type="button" className={`nav-link ${activeLang === 'ar' ? 'active' : ''}`} onClick={() => setActiveLang('ar')}>
                        {t('common.arabic')}
                      </button>
                    </nav>

                    <div className="tab-content">
                      <div className={`tab-pane fade ${activeLang === 'en' ? 'show active' : ''}`} id="lang_en" dir="ltr">
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantsApp.appTitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('restaurantsApp.restaurantTitlePlaceholder', undefined, 'en')}
                                  value={titleEn}
                                  onChange={(e) => setTitleEn(e.target.value)}
                                  autoComplete="off"
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${activeLang === 'ar' ? 'show active' : ''}`} id="lang_ar" dir="rtl">
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantsApp.appTitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6 text-left dir-ltr">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('restaurantsApp.restaurantTitlePlaceholder', undefined, 'ar')}
                                  value={titleAr}
                                  onChange={(e) => setTitleAr(e.target.value)}
                                  autoComplete="off"
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card findRestaurant-card mt-4">
                      <div className="card-body">
                        {apps.map((app) => (
                          <div key={app.id} className="form-group row align-items-center text-center">
                            <div className="col-md-1 px-0">
                              <label className="label-switch switch-success mb-0">
                                <input
                                  type="checkbox"
                                  className="switch switch-bootstrap"
                                  checked={app.enabled}
                                  onChange={(e) => updateApp(app.id, 'enabled', e.target.checked)}
                                />
                                <span className="lable"></span>
                              </label>
                            </div>
                            <div className="col-md-2">
                              <label htmlFor={`rest-${app.id}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={app.imageSrc} alt={app.imageAlt} width={80} height={80} />
                              </label>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex align-items-center p-0 form-control">
                                <input
                                  type="text"
                                  placeholder={t('restaurantsApp.appNamePlaceholder')}
                                  className="w-100 border-0 px-2"
                                  value={app.appName}
                                  onChange={(e) => updateApp(app.id, 'appName', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-3 my-md-0 my-2">
                              <div className="d-flex align-items-center p-0 form-control overflow-hidden">
                                <div className="p-2 bg-light">
                                  <GooglePlayIcon />
                                </div>
                                <input
                                  type="text"
                                  placeholder={t('restaurantsApp.storeUrlPlaceholder')}
                                  className="w-100 border-0 px-2"
                                  value={app.androidUrl}
                                  onChange={(e) => updateApp(app.id, 'androidUrl', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex align-items-center p-0 form-control overflow-hidden">
                                <div className="p-2 bg-light">
                                  <AppleIcon />
                                </div>
                                <input
                                  type="text"
                                  placeholder={t('restaurantsApp.storeUrlPlaceholder')}
                                  className="w-100 border-0 px-2"
                                  value={app.iosUrl}
                                  onChange={(e) => updateApp(app.id, 'iosUrl', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-left mt-4" dir="rtl">
                      <button type="submit" className="btn btn-primary px-5 text-uppercase" style={{ letterSpacing: '0.05em' }}>
                        {t('common.update')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>
    </>
  );
}
