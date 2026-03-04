'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

interface LangContent {
  title: string;
  summary: string;
  details: string;
}

function PageEditContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [en, setEn] = useState<LangContent>({ title: '', summary: '', details: '' });
  const [ar, setAr] = useState<LangContent>({ title: '', summary: '', details: '' });
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    if (id) {
      // Optional: load existing page data by id
      setEn((prev) => ({ ...prev, title: `Page ${id}` }));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save page', { id, en, ar, keywords });
    router.push('/pages');
  };

  return (
    <>
      <AcpPage pageTitle={t('sidebar.pages')} activeItem="pages">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-right mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/pages" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('pagesApp.backToPages')}
                    </Link>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <nav className="nav nav-tabs language-tab">
                      <button
                        type="button"
                        className={`nav-link ${activeLang === 'en' ? 'active' : ''}`}
                        onClick={() => setActiveLang('en')}
                      >
                        {t('common.english')}
                      </button>
                      <button
                        type="button"
                        className={`nav-link ${activeLang === 'ar' ? 'active' : ''}`}
                        onClick={() => setActiveLang('ar')}
                      >
                        {t('common.arabic')}
                      </button>
                    </nav>

                    <div className="tab-content">
                      <div className={`tab-pane fade ${activeLang === 'en' ? 'show active' : ''}`} id="lang_en" dir="ltr">
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('pagesApp.pageTitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    placeholder={t('pagesApp.titlePlaceholder', undefined, 'en')}
                                    className="form-control"
                                    value={en.title}
                                    onChange={(e) => setEn((p) => ({ ...p, title: e.target.value }))}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('pagesApp.pageSummary', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <div className="form-group">
                                  <textarea
                                    rows={3}
                                    placeholder={t('pagesApp.summaryPlaceholder', undefined, 'en')}
                                    className="form-control"
                                    value={en.summary}
                                    onChange={(e) => setEn((p) => ({ ...p, summary: e.target.value }))}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('pagesApp.pageDetails', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <div className="form-group">
                                  <textarea
                                    rows={8}
                                    className="form-control"
                                    placeholder={t('pagesApp.detailsPlaceholder', undefined, 'en')}
                                    value={en.details}
                                    onChange={(e) => setEn((p) => ({ ...p, details: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`tab-pane fade ${activeLang === 'ar' ? 'show active' : ''}`} id="lang_ar" dir="rtl">
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('pagesApp.pageTitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    dir="rtl"
                                    placeholder={t('pagesApp.titlePlaceholder', undefined, 'ar')}
                                    className="form-control"
                                    value={ar.title}
                                    onChange={(e) => setAr((p) => ({ ...p, title: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('pagesApp.pageSummary', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <div className="form-group">
                                  <textarea
                                    rows={3}
                                    dir="rtl"
                                    placeholder={t('pagesApp.summaryPlaceholder', undefined, 'ar')}
                                    className="form-control"
                                    value={ar.summary}
                                    onChange={(e) => setAr((p) => ({ ...p, summary: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('pagesApp.pageDetails', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <div className="form-group">
                                  <textarea
                                    rows={8}
                                    dir="rtl"
                                    className="form-control"
                                    placeholder={t('pagesApp.detailsPlaceholder', undefined, 'ar')}
                                    value={ar.details}
                                    onChange={(e) => setAr((p) => ({ ...p, details: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('pagesApp.preferences')}</h3>
                        <div className="row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('about.fullContent')}</label>
                          </div>
                          <div className="col-xl-6 col-lg-9">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder={t('about.wordsKeywords')}
                                className="form-control"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 text-left" dir="rtl">
                        <button type="submit" className="btn btn-primary px-4">
                          {t('common.save')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>
    </>
  );
}

export default function PageEditPage() {
  return (
    <Suspense fallback={null}>
      <PageEditContent />
    </Suspense>
  );
}
