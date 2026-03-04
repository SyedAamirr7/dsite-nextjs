'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

interface SectionLang {
  title: string;
  subpage: string;
  tags: string;
}

interface ConfigRow {
  id: number;
  active: boolean;
  label: string;
  placeholder: string;
  required: boolean;
}

const INITIAL_CONFIG_ROWS: ConfigRow[] = [
  { id: 1, active: false, label: '', placeholder: 'Placeholder', required: false },
  { id: 2, active: false, label: '', placeholder: 'Placeholder', required: false },
  { id: 3, active: false, label: '', placeholder: 'Placeholder', required: false },
];

export default function SettingsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);
  const [activeConfigLang, setActiveConfigLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
    setActiveConfigLang(language);
  }, [language]);
  const [en, setEn] = useState<SectionLang>({ title: '', subpage: '', tags: '' });
  const [ar, setAr] = useState<SectionLang>({ title: '', subpage: '', tags: '' });
  const [nmOrder, setNmOrder] = useState(false);
  const [configRows, setConfigRows] = useState<ConfigRow[]>(INITIAL_CONFIG_ROWS);

  const updateConfigRow = (id: number, field: keyof ConfigRow, value: boolean | string) => {
    setConfigRows(configRows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save settings', { en, ar, nmOrder, configRows });
    router.push('/acp/home');
  };

  return (
    <>
      <AcpPage pageTitle={t('settingPage.title')} activeItem="site-information">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3" dir="ltr">
                    <Link href="/acp/home" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('settingPage.backToDashboard')}
                    </Link>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <nav className="nav nav-tabs language-tab" role="tablist">
                      <button
                        type="button"
                        role="tab"
                        id="tab-lang_en"
                        aria-selected={activeLang === 'en'}
                        aria-controls="lang_en"
                        className={`nav-link ${activeLang === 'en' ? 'active' : ''}`}
                        onClick={() => setActiveLang('en')}
                      >
                        {t('common.english')}
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id="tab-lang_ar"
                        aria-selected={activeLang === 'ar'}
                        aria-controls="lang_ar"
                        className={`nav-link ${activeLang === 'ar' ? 'active' : ''}`}
                        onClick={() => setActiveLang('ar')}
                      >
                        {t('common.arabic')}
                      </button>
                    </nav>

                    <div className="tab-content">
                      <div
                        className={`tab-pane fade ${activeLang === 'en' ? 'show active' : ''}`}
                        id="lang_en"
                        dir="ltr"
                        role="tabpanel"
                        aria-labelledby="tab-lang_en"
                        style={{ display: activeLang === 'en' ? 'block' : 'none' }}
                      >
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('settingPage.titleLabel', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t('settingPage.titlePlaceholder', undefined, 'en')}
                                    value={en.title}
                                    onChange={(e) => setEn((p) => ({ ...p, title: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('settingPage.subpage', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <textarea
                                    rows={3}
                                    className="form-control"
                                    placeholder={t('settingPage.subpagePlaceholder', undefined, 'en')}
                                    value={en.subpage}
                                    onChange={(e) => setEn((p) => ({ ...p, subpage: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('settingPage.tags', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t('settingPage.tagsPlaceholder', undefined, 'en')}
                                    value={en.tags}
                                    onChange={(e) => setEn((p) => ({ ...p, tags: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`tab-pane fade ${activeLang === 'ar' ? 'show active' : ''}`}
                        id="lang_ar"
                        dir="rtl"
                        role="tabpanel"
                        aria-labelledby="tab-lang_ar"
                        style={{ display: activeLang === 'ar' ? 'block' : 'none' }}
                      >
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('settingPage.titleLabel', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    dir="rtl"
                                    className="form-control"
                                    placeholder={t('settingPage.titlePlaceholder', undefined, 'ar')}
                                    value={ar.title}
                                    onChange={(e) => setAr((p) => ({ ...p, title: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('settingPage.subpage', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <textarea
                                    rows={3}
                                    dir="rtl"
                                    className="form-control"
                                    placeholder={t('settingPage.subpagePlaceholder', undefined, 'ar')}
                                    value={ar.subpage}
                                    onChange={(e) => setAr((p) => ({ ...p, subpage: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label className="form-label">{t('settingPage.tags', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    dir="rtl"
                                    className="form-control"
                                    placeholder={t('settingPage.tagsPlaceholder', undefined, 'ar')}
                                    value={ar.tags}
                                    onChange={(e) => setAr((p) => ({ ...p, tags: e.target.value }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <nav className="nav nav-tabs language-tab mt-4" role="tablist">
                      <button
                        type="button"
                        role="tab"
                        id="tab-lang_en-config"
                        aria-selected={activeConfigLang === 'en'}
                        aria-controls="lang_en-config"
                        className={`nav-link ${activeConfigLang === 'en' ? 'active' : ''}`}
                        onClick={() => setActiveConfigLang('en')}
                      >
                        {t('common.english')}
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id="tab-lang_ar-config"
                        aria-selected={activeConfigLang === 'ar'}
                        aria-controls="lang_ar-config"
                        className={`nav-link ${activeConfigLang === 'ar' ? 'active' : ''}`}
                        onClick={() => setActiveConfigLang('ar')}
                      >
                        {t('common.arabic')}
                      </button>
                    </nav>

                    <div className="tab-content">
                      <div
                        className={`tab-pane fade ${activeConfigLang === 'en' ? 'show active' : ''}`}
                        id="lang_en-config"
                        dir="ltr"
                        role="tabpanel"
                        aria-labelledby="tab-lang_en-config"
                        style={{ display: activeConfigLang === 'en' ? 'block' : 'none' }}
                      >
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <h3 className="card-body_title align-start font-weight-bold">{t('settingPage.preferences', undefined, 'en')}</h3>
                            <div className="row mb-2">
                              <div className="col-md-3 align-start">
                                <label className="form-label">{t('settingPage.nmOrder', undefined, 'en')}</label>
                              </div>
                              <div className="col-md-2">
                                <label className="label-switch switch-success mb-0">
                                  <input
                                    type="checkbox"
                                    className="switch switch-bootstrap status"
                                    checked={nmOrder}
                                    onChange={(e) => setNmOrder(e.target.checked)}
                                  />
                                  <span className="lable"></span>
                                </label>
                              </div>
                            </div>
                            <div className="table-responsive mt-4">
                              <table className="section-config_form table table-hover w-100" style={{ minWidth: '800px' }}>
                                <thead>
                                  <tr>
                                    <th className="text-gray">{t('settingPage.active', undefined, 'en')}</th>
                                    <th className="text-gray">{t('settingPage.label', undefined, 'en')}</th>
                                    <th className="text-gray">{t('settingPage.placeholder', undefined, 'en')}</th>
                                    <th className="text-gray text-center">{t('settingPage.required', undefined, 'en')}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {configRows.map((row) => (
                                    <tr key={row.id}>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={row.active}
                                          onChange={(e) => updateConfigRow(row.id, 'active', e.target.checked)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          placeholder={t('settingPage.fullnamePlaceholder', undefined, 'en')}
                                          className="form-control w-100"
                                          value={row.label}
                                          onChange={(e) => updateConfigRow(row.id, 'label', e.target.value)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          placeholder={t('settingPage.placeholder', undefined, 'en')}
                                          className="form-control w-100"
                                          value={row.placeholder}
                                          onChange={(e) => updateConfigRow(row.id, 'placeholder', e.target.value)}
                                        />
                                      </td>
                                      <td className="text-center">
                                        <button
                                          type="button"
                                          className="btn btn-link p-0 border-0"
                                          onClick={() => updateConfigRow(row.id, 'required', !row.required)}
                                          title={row.required ? t('settingPage.required', undefined, 'en') : t('settingPage.optional', undefined, 'en')}
                                        >
                                          {row.required ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3459a5" viewBox="0 0 16 16">
                                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                            </svg>
                                          )}
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`tab-pane fade ${activeConfigLang === 'ar' ? 'show active' : ''}`}
                        id="lang_ar-config"
                        dir="rtl"
                        role="tabpanel"
                        aria-labelledby="tab-lang_ar-config"
                        style={{ display: activeConfigLang === 'ar' ? 'block' : 'none' }}
                      >
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <h3 className="card-body_title align-start font-weight-bold">{t('settingPage.preferences', undefined, 'ar')}</h3>
                            <div className="row mb-2">
                              <div className="col-md-3 align-start">
                                <label className="form-label">{t('settingPage.nmOrder', undefined, 'ar')}</label>
                              </div>
                              <div className="col-md-2">
                                <label className="label-switch switch-success mb-0" dir="ltr">
                                  <input
                                    type="checkbox"
                                    className="switch switch-bootstrap status"
                                    checked={nmOrder}
                                    onChange={(e) => setNmOrder(e.target.checked)}
                                  />
                                  <span className="lable"></span>
                                </label>
                              </div>
                            </div>
                            <div className="table-responsive mt-4">
                              <table className="section-config_form table table-hover w-100" style={{ minWidth: '800px' }}>
                                <thead>
                                  <tr>
                                    <th className="text-gray">{t('settingPage.active', undefined, 'ar')}</th>
                                    <th className="text-gray">{t('settingPage.label', undefined, 'ar')}</th>
                                    <th className="text-gray">{t('settingPage.placeholder', undefined, 'ar')}</th>
                                    <th className="text-gray text-center">{t('settingPage.required', undefined, 'ar')}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {configRows.map((row) => (
                                    <tr key={row.id}>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={row.active}
                                          onChange={(e) => updateConfigRow(row.id, 'active', e.target.checked)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          placeholder={t('settingPage.fullnamePlaceholder', undefined, 'ar')}
                                          className="form-control w-100"
                                          value={row.label}
                                          onChange={(e) => updateConfigRow(row.id, 'label', e.target.value)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          placeholder={t('settingPage.placeholder', undefined, 'ar')}
                                          className="form-control w-100"
                                          value={row.placeholder}
                                          onChange={(e) => updateConfigRow(row.id, 'placeholder', e.target.value)}
                                        />
                                      </td>
                                      <td className="text-center">
                                        <button
                                          type="button"
                                          className="btn btn-link p-0 border-0"
                                          onClick={() => updateConfigRow(row.id, 'required', !row.required)}
                                          title={row.required ? t('settingPage.required', undefined, 'ar') : t('settingPage.optional', undefined, 'ar')}
                                        >
                                          {row.required ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3459a5" viewBox="0 0 16 16">
                                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                            </svg>
                                          )}
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 text-left" dir="rtl">
                        <button type="submit" className="btn btn-primary px-5 text-uppercase" style={{ letterSpacing: '0.05em' }}>
                          {t('common.save')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>
    </>
  );
}
