'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

interface LangContent {
  name: string;
}

function PartnerEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [en, setEn] = useState<LangContent>({ name: '' });
  const [ar, setAr] = useState<LangContent>({ name: '' });
  const [link, setLink] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>('/assets/img/partners/Rectangle 5002.png');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (id) {
      setEn((p) => ({ ...p, name: `Partner ${id}` }));
      setAr((p) => ({ ...p, name: `شريك ${id}` }));
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save partner', { id, en, ar, link, status, image: !!imagePreview });
    router.push('/partners');
  };

  return (
    <>
      <AcpPage pageTitle={t('partnersApp.title')} activeItem="partners">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/partners" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('partnersApp.backToPartners')}
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
                                <label className="form-label">{t('partnersApp.partnerNameLabel', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('partnersApp.partnerNamePlaceholder', undefined, 'en')}
                                  value={en.name}
                                  onChange={(e) => setEn((p) => ({ ...p, name: e.target.value }))}
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
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('partnersApp.partnerNameLabel', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('partnersApp.partnerNamePlaceholder', undefined, 'ar')}
                                  value={ar.name}
                                  onChange={(e) => setAr((p) => ({ ...p, name: e.target.value }))}
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
                      <div className="card-body">
                        <h3 className="card-body_title">{t('partnersApp.preferences')}</h3>
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-3 align-start">
                            <label className="form-label">{t('partnersApp.image')}</label>
                          </div>
                          <div className="col-lg-5 col-md-8">
                            <div className="review-user-pic review-product-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img ml-4" htmlFor="pic-1">
                                <div className="upload rounded border">
                                  {imagePreview ? (
                                    <img src={imagePreview} className="pic-1" alt="" style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }} />
                                  ) : (
                                    <div className="p-4 text-muted">{t('partnersApp.noImage')}</div>
                                  )}
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  id="pic-1"
                                  className="d-none form-control"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                                <small className="form-label text-center d-block">{t('partnersApp.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="pic-1" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="ml-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('partnersApp.changeImages')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={handleRemoveImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('partnersApp.deleteImages')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3 align-start">
                            <label className="form-label">{t('partnersApp.link')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="url"
                              dir="ltr"
                              className="form-control"
                              placeholder={t('partnersApp.linkPlaceholder')}
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
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

export default function PartnerEditPage() {
  return (
    <Suspense fallback={null}>
      <PartnerEditContent />
    </Suspense>
  );
}
