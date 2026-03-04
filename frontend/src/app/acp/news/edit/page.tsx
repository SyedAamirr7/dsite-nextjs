'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

interface LangContent {
  title: string;
  subtitle: string;
  briefDescription: string;
  details: string;
}

function NewsEditContent() {
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

  const [en, setEn] = useState<LangContent>({ title: '', subtitle: '', briefDescription: '', details: '' });
  const [ar, setAr] = useState<LangContent>({ title: '', subtitle: '', briefDescription: '', details: '' });
  const [status, setStatus] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('');
  const [date, setDate] = useState('');
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    if (id) {
      setEn((p) => ({ ...p, title: `News ${id}` }));
      setAr((p) => ({ ...p, title: `خبر ${id}` }));
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
    console.log('Save news', { id, en, ar, status, buttonText, date, keywords });
    router.push('/news');
  };

  return (
    <>
      <AcpPage pageTitle={t('sidebar.news')} activeItem="news">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/news" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('newsApp.backToNews')}
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
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.title', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('newsApp.titlePlaceholder', undefined, 'en')} value={en.title} onChange={(e) => setEn((p) => ({ ...p, title: e.target.value }))} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.subtitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('newsApp.subtitlePlaceholder', undefined, 'en')} value={en.subtitle} onChange={(e) => setEn((p) => ({ ...p, subtitle: e.target.value }))} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.briefDescription', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea rows={3} className="form-control" placeholder={t('newsApp.briefDescriptionPlaceholder', undefined, 'en')} value={en.briefDescription} onChange={(e) => setEn((p) => ({ ...p, briefDescription: e.target.value }))} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.details', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea rows={6} className="form-control" placeholder={t('newsApp.detailsPlaceholder', undefined, 'en')} value={en.details} onChange={(e) => setEn((p) => ({ ...p, details: e.target.value }))} />
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
                                <label className="form-label">{t('newsApp.title', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('newsApp.titlePlaceholder', undefined, 'ar')} value={ar.title} onChange={(e) => setAr((p) => ({ ...p, title: e.target.value }))} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.subtitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('newsApp.subtitlePlaceholder', undefined, 'ar')} value={ar.subtitle} onChange={(e) => setAr((p) => ({ ...p, subtitle: e.target.value }))} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.briefDescription', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea rows={3} dir="rtl" className="form-control" placeholder={t('newsApp.briefDescriptionPlaceholder', undefined, 'ar')} value={ar.briefDescription} onChange={(e) => setAr((p) => ({ ...p, briefDescription: e.target.value }))} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('newsApp.details', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea rows={6} dir="rtl" className="form-control" placeholder={t('newsApp.detailsPlaceholder', undefined, 'ar')} value={ar.details} onChange={(e) => setAr((p) => ({ ...p, details: e.target.value }))} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title font-weight-bold mb-4">{t('newsApp.preferences')}</h3>

                        <div className="form-group row align-items-center">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('newsApp.image')}</label>
                          </div>
                          <div className="col-lg-6 col-md-8">
                            <div className="review-user-pic review-product-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img mb-0" htmlFor="news-pic">
                                <div className="upload rounded overflow-hidden border flex-shrink-0" style={{ width: '181px', height: '120px' }}>
                                  {imagePreview ? (
                                    <img src={imagePreview} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={t('newsApp.image')} />
                                  ) : (
                                    <img src="/assets/img/topics/Rectangle 5002.png" className="w-100 h-100" style={{ objectFit: 'cover' }} alt="" />
                                  )}
                                </div>
                                <input ref={fileInputRef} type="file" id="news-pic" className="d-none form-control" accept="image/*" onChange={handleImageChange} />
                                <small className="form-label text-muted d-block mt-2">{t('newsApp.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="news-pic" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('newsApp.changeImages')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={removeImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('newsApp.deleteImages')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('newsApp.buttonText')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input type="text" className="form-control" placeholder={t('newsApp.buttonTextPlaceholder')} value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('common.date')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('newsApp.keywords')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input type="text" className="form-control" placeholder={t('newsApp.keywordsPlaceholder')} value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
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

                    <div className="text-right mt-4" dir="rtl">
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

export default function NewsEditPage() {
  return (
    <Suspense fallback={null}>
      <NewsEditContent />
    </Suspense>
  );
}
