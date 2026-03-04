'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';
type BgColor = 'system' | 'light' | 'dark';

export default function MarketingPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [titleEn, setTitleEn] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [bgColor, setBgColor] = useState<BgColor>('system');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save content marketing', { titleEn, subtitleEn, contentEn, titleAr, subtitleAr, contentAr, bgColor });
    router.push('/marketing');
  };

  return (
    <>
      <AcpPage pageTitle={t('sidebar.contentMarketing')} activeItem="marketing">
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
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('marketingApp.title', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('marketingApp.titlePlaceholder', undefined, 'en')} value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('marketingApp.subtitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('marketingApp.subtitlePlaceholder', undefined, 'en')} value={subtitleEn} onChange={(e) => setSubtitleEn(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('marketingApp.content', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea rows={8} className="form-control" placeholder={t('marketingApp.contentPlaceholder', undefined, 'en')} value={contentEn} onChange={(e) => setContentEn(e.target.value)} required />
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
                                <label className="form-label">{t('marketingApp.title', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('marketingApp.titlePlaceholder', undefined, 'ar')} value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('marketingApp.subtitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('marketingApp.subtitlePlaceholder', undefined, 'ar')} value={subtitleAr} onChange={(e) => setSubtitleAr(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('marketingApp.content', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea rows={8} dir="rtl" className="form-control" placeholder={t('marketingApp.contentPlaceholder', undefined, 'ar')} value={contentAr} onChange={(e) => setContentAr(e.target.value)} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('marketingApp.preferences')}</h3>
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label d-flex align-items-center">
                              {t('marketingApp.backgroundColor')}
                              <span className="ml-2 text-muted" title={t('marketingApp.backgroundTooltip')} style={{ cursor: 'help' }}>
                                <i className="fas fa-info-circle"></i>
                              </span>
                            </label>
                          </div>
                          <div className="col-lg-6">
                            <select className="form-control" value={bgColor} onChange={(e) => setBgColor(e.target.value as BgColor)}>
                              <option value="system">{t('marketingApp.selectOption')}</option>
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
