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
  subPage: string;
}

function JobEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [en, setEn] = useState<LangContent>({ title: '', subPage: '' });
  const [ar, setAr] = useState<LangContent>({ title: '', subPage: '' });
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (id) {
      setEn((p) => ({ ...p, title: `Job ${id}` }));
      setAr((p) => ({ ...p, title: `وظيفة ${id}` }));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save job', { id, en, ar, status });
    router.push('/jobs');
  };

  return (
    <>
      <AcpPage pageTitle={t('jobsApp.title')} activeItem="jobs">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/jobs" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('jobsApp.backToJobs')}
                    </Link>
                  </div>

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
                                <label className="form-label">{t('jobsApp.titleLabel', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('jobsApp.jobTitlePlaceholder', undefined, 'en')}
                                  value={en.title}
                                  onChange={(e) => setEn((p) => ({ ...p, title: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('jobsApp.subPage', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={8}
                                  className="form-control"
                                  placeholder={t('jobsApp.subPagePlaceholder', undefined, 'en')}
                                  value={en.subPage}
                                  onChange={(e) => setEn((p) => ({ ...p, subPage: e.target.value }))}
                                />
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
                                <label className="form-label">{t('jobsApp.titleLabel', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('jobsApp.jobTitlePlaceholder', undefined, 'ar')}
                                  value={ar.title}
                                  onChange={(e) => setAr((p) => ({ ...p, title: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('jobsApp.subPage', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={8}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('jobsApp.subPagePlaceholder', undefined, 'ar')}
                                  value={ar.subPage}
                                  onChange={(e) => setAr((p) => ({ ...p, subPage: e.target.value }))}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('jobsApp.preferences')}</h3>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3 align-start">
                            <label className="form-label">{t('common.status')}</label>
                          </div>
                          <div className="col-6">
                            <label className="label-switch switch-success mb-0">
                              <input
                                type="checkbox"
                                className="switch switch-bootstrap status"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                              />
                              <span className="lable"></span>
                            </label>
                          </div>
                        </div>
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

export default function JobEditPage() {
  return (
    <Suspense fallback={null}>
      <JobEditContent />
    </Suspense>
  );
}
