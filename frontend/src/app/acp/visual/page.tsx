'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';
type BgColor = 'system' | 'light' | 'dark';

function getEmbedUrl(url: string): string {
  if (!url || !url.trim()) return 'https://www.youtube.com/embed/bZnrExAoXwA';
  try {
    const u = url.trim();
    const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  } catch {
    // ignore
  }
  return url;
}

export default function VisualPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [titleEn, setTitleEn] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=bZnrExAoXwA');
  const [bgColor, setBgColor] = useState<BgColor>('system');

  const embedUrl = useMemo(() => getEmbedUrl(videoUrl), [videoUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save introductory video', { titleEn, subtitleEn, titleAr, subtitleAr, videoUrl, bgColor });
    router.push('/visual');
  };

  return (
    <>
      <AcpPage pageTitle={t('visual.introductoryVideo')} activeItem="visual">
        <div className="row">
                <div className="col-lg-12">
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
                                <label className="form-label">{t('visual.title', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('visual.titlePlaceholder', undefined, 'en')}
                                  value={titleEn}
                                  onChange={(e) => setTitleEn(e.target.value)}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('visual.subtitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('visual.subtitlePlaceholder', undefined, 'en')}
                                  value={subtitleEn}
                                  onChange={(e) => setSubtitleEn(e.target.value)}
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
                                <label className="form-label">{t('visual.title', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('visual.titlePlaceholder', undefined, 'ar')}
                                  value={titleAr}
                                  onChange={(e) => setTitleAr(e.target.value)}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('visual.subtitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('visual.subtitlePlaceholder', undefined, 'ar')}
                                  value={subtitleAr}
                                  onChange={(e) => setSubtitleAr(e.target.value)}
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
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4 align-start">
                            <label className="form-label">{t('visual.videoLink')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="url"
                              dir="ltr"
                              className="form-control"
                              placeholder={t('visual.videoLinkPlaceholder')}
                              value={videoUrl}
                              onChange={(e) => setVideoUrl(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-6 offset-lg-2 offset-md-4">
                            <iframe
                              width="100%"
                              height="400"
                              src={embedUrl}
                              title={t('visual.videoPlayerTitle')}
                              frameBorder={0}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4 align-start">
                            <label className="form-label d-flex align-items-center">
                              {t('visual.backgroundColor')}
                              <span className="ml-2 text-muted" title={t('visual.backgroundTooltip')} style={{ cursor: 'help' }}>
                                <i className="fas fa-info-circle"></i>
                              </span>
                            </label>
                          </div>
                          <div className="col-lg-6">
                            <select
                              className="form-control"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value as BgColor)}
                            >
                              <option value="system">{t('visual.system')}</option>
                              <option value="light">{t('settings.light')}</option>
                              <option value="dark">{t('settings.dark')}</option>
                            </select>
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
