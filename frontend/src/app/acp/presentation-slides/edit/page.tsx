'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type SliderType = 'sliderImg' | 'sliderVideo';
type LangTab = 'en' | 'ar';

export default function PresentationSlideEditPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [sliderType, setSliderType] = useState<SliderType>('sliderImg');
  const [status, setStatus] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [en, setEn] = useState({ mainTitle: '', subtitle: '', content: '', button: '', buttonLink: '' });
  const [ar, setAr] = useState({ mainTitle: '', subtitle: '', content: '', button: '', buttonLink: '' });
  const [videoUrl, setVideoUrl] = useState('');

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
    console.log('Submit slide', { en, ar, sliderType, videoUrl, status });
    router.push('/acp/presentation-slides');
  };

  return (
    <AcpPage pageTitle={t('sidebar.presentationSlides')} activeItem="presentation-slides">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/presentation-slides" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('presentationSlides.backToSlides')}
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
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.mainTitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('presentationSlides.enterMainTitle', undefined, 'en')}
                                  value={en.mainTitle}
                                  onChange={(e) => setEn((p) => ({ ...p, mainTitle: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.subtitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('presentationSlides.subtitlePlaceholder', undefined, 'en')}
                                  value={en.subtitle}
                                  onChange={(e) => setEn((p) => ({ ...p, subtitle: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.content', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <textarea
                                  rows={5}
                                  className="form-control"
                                  placeholder={t('presentationSlides.contentPlaceholder', undefined, 'en')}
                                  value={en.content}
                                  onChange={(e) => setEn((p) => ({ ...p, content: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.button', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('presentationSlides.buttonPlaceholder', undefined, 'en')}
                                  value={en.button}
                                  onChange={(e) => setEn((p) => ({ ...p, button: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.buttonLink', undefined, 'en')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="url"
                                  dir="ltr"
                                  className="form-control"
                                  placeholder={t('presentationSlides.buttonLinkPlaceholder', undefined, 'en')}
                                  value={en.buttonLink}
                                  onChange={(e) => setEn((p) => ({ ...p, buttonLink: e.target.value }))}
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
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.mainTitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('presentationSlides.enterMainTitle', undefined, 'ar')}
                                  value={ar.mainTitle}
                                  onChange={(e) => setAr((p) => ({ ...p, mainTitle: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.subtitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('presentationSlides.subtitlePlaceholder', undefined, 'ar')}
                                  value={ar.subtitle}
                                  onChange={(e) => setAr((p) => ({ ...p, subtitle: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.content', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <textarea
                                  rows={5}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('presentationSlides.contentPlaceholder', undefined, 'ar')}
                                  value={ar.content}
                                  onChange={(e) => setAr((p) => ({ ...p, content: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.button', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('presentationSlides.buttonPlaceholder', undefined, 'ar')}
                                  value={ar.button}
                                  onChange={(e) => setAr((p) => ({ ...p, button: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.buttonLink', undefined, 'ar')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="url"
                                  dir="ltr"
                                  className="form-control"
                                  placeholder={t('presentationSlides.buttonLinkPlaceholder', undefined, 'ar')}
                                  value={ar.buttonLink}
                                  onChange={(e) => setAr((p) => ({ ...p, buttonLink: e.target.value }))}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('presentationSlides.preferences')}</h3>
                        <div className="form-group row">
                          <div className="col-xl-2 col-lg-3 col-md-4">
                            <label className="form-label">{t('presentationSlides.fileType')}</label>
                          </div>
                          <div className="col-xl-6 col-lg-9">
                            <select
                              className="form-control"
                              id="sliderType"
                              value={sliderType}
                              onChange={(e) => setSliderType(e.target.value as SliderType)}
                            >
                              <option value="sliderImg">{t('presentationSlides.image')}</option>
                              <option value="sliderVideo">{t('presentationSlides.video')}</option>
                            </select>
                          </div>
                        </div>

                        {sliderType === 'sliderImg' && (
                          <div id="sliderImg" className="mt-4">
                            <div className="form-group row align-items-center">
                              <div className="col-lg-3 col-md-4">
                                <p className="form-label">{t('presentationSlides.backgroundImage')}</p>
                              </div>
                              <div className="col-xl-10">
                                <div className="slider-view d-flex flex-md-row flex-column align-items-center gap-4">
                                  <label className="review-img" htmlFor="pic-2" style={{ width: 400, height: 250 }}>
                                    <div className="upload h-100">
                                      {imagePreview ? (
                                        <img src={imagePreview} alt={t('presentationSlides.backgroundImage')} className="pic-2 w-100 h-100" style={{ objectFit: 'cover' }} />
                                      ) : (
                                        <img src="/assets/img/page.png" className="pic-2" alt="" />
                                      )}
                                    </div>
                                    <div className="text-center">
                                      <small className="form-label">{t('presentationSlides.sendAcceptPage')}</small>
                                    </div>
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      id="pic-2"
                                      className="d-none form-control"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                    />
                                  </label>
                                  <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0 mt-md-0 mt-4">
                                    <label htmlFor="pic-2" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                      <img src="/assets/img/change.svg" className="ml-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                      {t('presentationSlides.changeImages')}
                                    </label>
                                    <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={removeImage}>
                                      <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                      {t('presentationSlides.deleteImages')}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {sliderType === 'sliderVideo' && (
                          <div id="sliderVideo" className="mt-4">
                            <div className="form-group row">
                              <div className="col-xl-2 col-lg-3 col-md-4">
                                <label className="form-label">{t('presentationSlides.linkVideo')}</label>
                              </div>
                              <div className="col-xl-6 col-lg-9">
                                <input
                                  type="url"
                                  className="form-control"
                                  placeholder="https://vimeo.com/416846984"
                                  autoComplete="off"
                                  value={videoUrl}
                                  onChange={(e) => setVideoUrl(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="form-group row mt-5">
                          <div className="col-3">
                            <label className="form-label">{t('common.status')}</label>
                          </div>
                          <div className="col-3">
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
                      <button type="submit" className="btn btn-primary px-5">
                        {t('presentationSlides.addSlider')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
    </AcpPage>
  );
}
