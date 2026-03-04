'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

function GalleryEditContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [status, setStatus] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setTitleEn(`Gallery ${id}`);
      setTitleAr(`معرض ${id}`);
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save gallery', { id, titleEn, titleAr, status });
    router.push('/gallery');
  };

  return (
    <>
      <AcpPage pageTitle={t('sidebar.galleryImages')} activeItem="gallery">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/gallery" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('gallery.backToGallery')}
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
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('gallery.titleGallery', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('gallery.titlePlaceholder', undefined, 'en')}
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
                                <label className="form-label">{t('gallery.titleGallery', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('gallery.titlePlaceholder', undefined, 'ar')}
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

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('gallery.preferences')}</h3>
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-3">
                            <label className="form-label">{t('gallery.image')}</label>
                          </div>
                          <div className="col-lg-5 col-md-8">
                            <div className="review-user-pic review-gallery-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img ml-4 mb-0" htmlFor="gallery-pic">
                                <div className="upload rounded overflow-hidden border flex-shrink-0" style={{ width: '181px', height: '120px' }}>
                                  {imagePreview ? (
                                    <img src={imagePreview} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={t('gallery.image')} />
                                  ) : (
                                    <img src="/assets/img/gallery/Rectangle 5002-6.png" className="w-100 h-100" style={{ objectFit: 'cover' }} alt="" />
                                  )}
                                </div>
                                <input
                                  ref={fileInputRef}
                                  name="Gallery_Image"
                                  type="file"
                                  id="gallery-pic"
                                  className="d-none form-control"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  autoComplete="off"
                                />
                                <div className="invalid-feedback">{t('common.required')}</div>
                                <small className="form-label text-center d-block mt-2">{t('gallery.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="gallery-pic" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="ml-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('gallery.changeImages')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={removeImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('gallery.deleteImages')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3">
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

export default function GalleryEditPage() {
  return (
    <Suspense fallback={null}>
      <GalleryEditContent />
    </Suspense>
  );
}
