'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

function BranchEditContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [nameEn, setNameEn] = useState('');
  const [detailsEn, setDetailsEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [detailsAr, setDetailsAr] = useState('');
  const [status, setStatus] = useState(true);
  const [mapLat, setMapLat] = useState('');
  const [mapLng, setMapLng] = useState('');

  useEffect(() => {
    if (id) {
      setNameEn(`Branch ${id.padStart(2, '0')}`);
      setNameAr(`فرع ${id}`);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save branch', { id, nameEn, detailsEn, nameAr, detailsAr, status, mapLat, mapLng });
    router.push('/branchs');
  };

  return (
    <>
      <AcpPage pageTitle={t('sidebar.branches')} activeItem="branchs">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/branchs" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('branchesApp.backToBranches')}
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
                                <label className="form-label">{t('branchesApp.branchName', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('branchesApp.titlePlaceholder', undefined, 'en')} value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('branchesApp.details', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea rows={5} className="form-control" placeholder={t('branchesApp.detailsPlaceholder', undefined, 'en')} value={detailsEn} onChange={(e) => setDetailsEn(e.target.value)} required />
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
                                <label className="form-label">{t('branchesApp.branchName', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('branchesApp.titlePlaceholder', undefined, 'ar')} value={nameAr} onChange={(e) => setNameAr(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('branchesApp.details', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea rows={5} dir="rtl" className="form-control" placeholder={t('branchesApp.detailsPlaceholder', undefined, 'ar')} value={detailsAr} onChange={(e) => setDetailsAr(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('branchesApp.preferences')}</h3>
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-4 align-start">
                            <label className="form-label">{t('branchesApp.siteGeographicLocation')}</label>
                          </div>
                          <div className="col-lg-10">
                            <div id="map" className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                              <span className="text-muted">{t('branchesApp.mapPlaceholder')}</span>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col-md-6">
                                <input type="text" className="form-control mt-2" placeholder={t('branchesApp.latitude')} value={mapLat} onChange={(e) => setMapLat(e.target.value)} />
                              </div>
                              <div className="col-md-6">
                                <input type="text" className="form-control mt-2" placeholder={t('branchesApp.longitude')} value={mapLng} onChange={(e) => setMapLng(e.target.value)} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3 align-start">
                            <label className="form-label">{t('common.status')}</label>
                          </div>
                          <div className="col-6">
                            <label className="label-switch switch-success mb-0">
                              <input type="checkbox" className="switch switch-bootstrap status" checked={status} onChange={(e) => setStatus(e.target.checked)} />
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

export default function BranchEditPage() {
  return (
    <Suspense fallback={null}>
      <BranchEditContent />
    </Suspense>
  );
}
