'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

export default function DownloadAppPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>('/assets/img/application.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iosUrl, setIosUrl] = useState('');
  const [androidUrl, setAndroidUrl] = useState('');
  const [appGalleryUrl, setAppGalleryUrl] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('/assets/img/application.svg');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save download app', {
      titleEn,
      titleAr,
      imageFile,
      iosUrl,
      androidUrl,
      appGalleryUrl,
    });
    router.push('/downloadapp');
  };

  return (
    <>
      <AcpPage pageTitle={t('sidebar.downloadApp')} activeItem="downloadapp">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4">
                    <Link
                      href="/acp/setting"
                      className="btn btn-secondary"
                      title={t('sidebar.downloadApp')}
                    >
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
                              <div className="col-lg-2 col-md-4">
                                <label className="form-label">{t('downloadAppPage.title', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('downloadAppPage.titlePlaceholder', undefined, 'en')}
                                  value={titleEn}
                                  onChange={(e) => setTitleEn(e.target.value)}
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
                              <div className="col-lg-2 col-md-4">
                                <label className="form-label">{t('downloadAppPage.title', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('downloadAppPage.titlePlaceholder', undefined, 'ar')}
                                  value={titleAr}
                                  onChange={(e) => setTitleAr(e.target.value)}
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
                        <h3 className="card-body_title">{t('downloadAppPage.preferences')}</h3>
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('downloadAppPage.imageApply')}</label>
                          </div>
                          <div className="col-lg-5 col-md-8">
                            <div className="review-user-pic review-product-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img ml-4 mb-0" htmlFor="pic-1">
                                <div className="upload rounded">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={imagePreview || '/assets/img/application.svg'} className="pic-1" alt={t('downloadAppPage.imageApply')} />
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  id="pic-1"
                                  className="d-none form-control"
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                                <div className="invalid-feedback">{t('common.required')}</div>
                                <small className="form-label text-center d-block">{t('downloadAppPage.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="pic-1" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="ml-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('downloadAppPage.changeImages')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={handleRemoveImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('downloadAppPage.deleteImages')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('downloadAppPage.ios')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="url"
                              dir="ltr"
                              className="form-control"
                              placeholder={t('downloadAppPage.linkPlaceholder')}
                              value={iosUrl}
                              onChange={(e) => setIosUrl(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('downloadAppPage.android')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="url"
                              dir="ltr"
                              className="form-control"
                              placeholder={t('downloadAppPage.linkPlaceholder')}
                              value={androidUrl}
                              onChange={(e) => setAndroidUrl(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('downloadAppPage.appGallery')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="url"
                              dir="ltr"
                              className="form-control"
                              placeholder={t('downloadAppPage.linkPlaceholder')}
                              value={appGalleryUrl}
                              onChange={(e) => setAppGalleryUrl(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{t('common.required')}</div>
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
