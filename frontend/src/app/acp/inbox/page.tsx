'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';
type BgColor = 'system' | 'light' | 'dark';

export default function InboxPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);
  const [titleEn, setTitleEn] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [detailsEn, setDetailsEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [detailsAr, setDetailsAr] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [contactEmailSettings, setContactEmailSettings] = useState('');
  const [bgColor, setBgColor] = useState<BgColor>('light');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save inbox', {
      titleEn,
      subtitleEn,
      detailsEn,
      titleAr,
      subtitleAr,
      detailsAr,
      email,
      phone,
      fax,
      contactEmailSettings,
      bgColor,
    });
    router.push('/inbox');
  };

  return (
    <>
      <AcpPage pageTitle={t('inboxApp.title')} activeItem="inbox">
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
                                <label className="form-label">{t('inboxApp.pageTitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('inboxApp.titlePlaceholder', undefined, 'en')}
                                  value={titleEn}
                                  onChange={(e) => setTitleEn(e.target.value)}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('inboxApp.pageSubtitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('inboxApp.pageSubtitlePlaceholder', undefined, 'en')}
                                  value={subtitleEn}
                                  onChange={(e) => setSubtitleEn(e.target.value)}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('inboxApp.pageDetails', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={8}
                                  className="form-control"
                                  placeholder={t('inboxApp.pageDetailsPlaceholder', undefined, 'en')}
                                  value={detailsEn}
                                  onChange={(e) => setDetailsEn(e.target.value)}
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
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('inboxApp.pageTitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('inboxApp.titlePlaceholder', undefined, 'ar')}
                                  value={titleAr}
                                  onChange={(e) => setTitleAr(e.target.value)}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('inboxApp.pageSubtitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('inboxApp.pageSubtitlePlaceholder', undefined, 'ar')}
                                  value={subtitleAr}
                                  onChange={(e) => setSubtitleAr(e.target.value)}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('inboxApp.pageDetails', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={8}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('inboxApp.pageDetailsPlaceholder', undefined, 'ar')}
                                  value={detailsAr}
                                  onChange={(e) => setDetailsAr(e.target.value)}
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
                        <h3 className="card-body_title">{t('inboxApp.preferences')}</h3>
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('inboxApp.emailAddress')}</label>
                          </div>
                          <div className="col-lg-6">
                            <div className="input_wrapper form-control d-flex align-items-center p-0 overflow-hidden">
                              <input
                                type="email"
                                className="w-100 h-100 border-0 px-3"
                                placeholder={t('inboxApp.emailAddress')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                              <span className="input_svg h-100 d-flex align-items-center pr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                </svg>
                              </span>
                            </div>
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('inboxApp.phoneNumber')}</label>
                          </div>
                          <div className="col-lg-6">
                            <div className="input_wrapper form-control d-flex align-items-center p-0 overflow-hidden">
                              <input
                                type="text"
                                style={{ direction: 'ltr' }}
                                className="w-100 h-100 border-0 px-3"
                                placeholder={t('inboxApp.phoneNumber')}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                              />
                              <span className="input_svg h-100 d-flex align-items-center pr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg>
                              </span>
                            </div>
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('inboxApp.fax')}</label>
                          </div>
                          <div className="col-lg-6">
                            <div className="input_wrapper form-control d-flex align-items-center p-0 overflow-hidden">
                              <input
                                type="text"
                                style={{ direction: 'ltr' }}
                                className="w-100 h-100 border-0 px-3"
                                placeholder={t('inboxApp.fax')}
                                value={fax}
                                onChange={(e) => setFax(e.target.value)}
                              />
                              <span className="input_svg h-100 d-flex align-items-center pr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label d-flex align-items-center">
                              {t('inboxApp.emailAddress')}
                              <span className="ml-2 text-muted" title={t('inboxApp.contactEmailTooltip')}>
                                <i className="fas fa-envelope"></i>
                              </span>
                            </label>
                          </div>
                          <div className="col-lg-6">
                            <div className="input_wrapper form-control d-flex align-items-center p-0 overflow-hidden">
                              <input
                                type="email"
                                className="w-100 h-100 border-0 px-3"
                                placeholder={t('inboxApp.emailAddress')}
                                value={contactEmailSettings}
                                onChange={(e) => setContactEmailSettings(e.target.value)}
                                required
                              />
                              <span className="input_svg h-100 d-flex align-items-center pr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                </svg>
                              </span>
                            </div>
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <div className="form-group row">
                          <div className="col-lg-2 align-start">
                            <label className="form-label d-flex align-items-center">
                              {t('inboxApp.backgroundColor')}
                              <span className="ml-2 text-muted" title={t('inboxApp.backgroundTooltip')} style={{ cursor: 'help' }}>
                                <i className="fas fa-info-circle"></i>
                              </span>
                            </label>
                          </div>
                          <div className="col-lg-6">
                            <select className="form-control" value={bgColor} onChange={(e) => setBgColor(e.target.value as BgColor)}>
                              <option value="system">{t('inboxApp.bgSystem')}</option>
                              <option value="light">{t('inboxApp.bgLight')}</option>
                              <option value="dark">{t('inboxApp.bgDark')}</option>
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
