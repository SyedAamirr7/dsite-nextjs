'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

interface LangContent {
  serviceName: string;
  serviceDescription: string;
  content: string;
}

function AdsEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [en, setEn] = useState<LangContent>({ serviceName: '', serviceDescription: '', content: '' });
  const [ar, setAr] = useState<LangContent>({ serviceName: '', serviceDescription: '', content: '' });

  useEffect(() => {
    if (id) {
      setEn((p) => ({ ...p, serviceName: `Ad Service ${id}` }));
      setAr((p) => ({ ...p, serviceName: `إعلان ${id}` }));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save ad', { id, en, ar });
    router.push('/ads');
  };

  return (
    <>
      <AcpPage pageTitle={t('ads.editTitle')} activeItem="ads">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/ads" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('ads.backToAds')}
                    </Link>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation dsite-ad_form" noValidate>
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
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('ads.serviceName', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('ads.serviceName', undefined, 'en')}
                                  value={en.serviceName}
                                  onChange={(e) => setEn((p) => ({ ...p, serviceName: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('ads.serviceDescription', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder={t('ads.serviceDescription', undefined, 'en')}
                                  value={en.serviceDescription}
                                  onChange={(e) => setEn((p) => ({ ...p, serviceDescription: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('ads.content', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={6}
                                  className="form-control"
                                  placeholder={t('ads.content', undefined, 'en')}
                                  value={en.content}
                                  onChange={(e) => setEn((p) => ({ ...p, content: e.target.value }))}
                                  required
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
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('ads.serviceName', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('ads.serviceName', undefined, 'ar')}
                                  value={ar.serviceName}
                                  onChange={(e) => setAr((p) => ({ ...p, serviceName: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('ads.serviceDescription', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('ads.serviceDescription', undefined, 'ar')}
                                  value={ar.serviceDescription}
                                  onChange={(e) => setAr((p) => ({ ...p, serviceDescription: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('ads.content', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={6}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('ads.content', undefined, 'ar')}
                                  value={ar.content}
                                  onChange={(e) => setAr((p) => ({ ...p, content: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body card-body_custom">
                        <h3 className="card-body_title">{t('ads.preferences')}</h3>
                        <p className="text-muted">{t('ads.preferencesHint')}</p>
                      </div>
                    </div>

                    <div className="text-left mt-4" dir="rtl">
                      <button type="submit" className="btn btn-primary px-5 text-uppercase" style={{ letterSpacing: '0.05em' }}>
                        {t('common.save')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>
    </>
  );
}

export default function AdsEditPage() {
  return (
    <Suspense fallback={null}>
      <AdsEditContent />
    </Suspense>
  );
}
