'use client';

import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { useWebsiteId } from '@/context/WebsiteContext';
import {
  getSiteInformation,
  saveSiteInformation,
  type SiteInformationData,
} from '@/services/siteInformationService';
import { COUNTRY_AR_NAMES } from '@/data/countryNamesAr';

type LangTab = 'en' | 'ar';

/** Ensure these countries always appear in the dropdown even if missing from API/database */
const REQUIRED_COUNTRIES: { country_code: string; country_enName: string; country_arName: string }[] = [
  { country_code: 'SA', country_enName: 'Saudi Arabia', country_arName: 'المملكة العربية السعودية' },
];

function mergeCountries(
  fromApi: { country_code: string; country_enName: string; country_arName: string }[]
): { country_code: string; country_enName: string; country_arName: string }[] {
  const byCode = new Map<string, { country_code: string; country_enName: string; country_arName: string }>();
  [...REQUIRED_COUNTRIES, ...fromApi].forEach((c) => byCode.set(c.country_code, c));
  return Array.from(byCode.values()).sort((a, b) => a.country_enName.localeCompare(b.country_enName));
}

const defaultFormState = {
  website_title_en: '',
  website_title_ar: '',
  website_description_en: '',
  website_description_ar: '',
  website_tag_en: '',
  website_tag_ar: '',
  website_default_language: '1',
  website_language: '1',
  website_country_en: '',
  website_country_ar: '',
  website_status: 1,
  facebook: '',
  twitter: '',
  linkedin: '',
  youtube: '',
  instagram: '',
  whatsapp: '',
  snapchat: '',
  tiktok: '',
};

function dataToFormState(data: SiteInformationData | null): typeof defaultFormState {
  if (!data) return { ...defaultFormState };
  return {
    website_title_en: data.website_title_en ?? '',
    website_title_ar: data.website_title_ar ?? '',
    website_description_en: data.website_description_en ?? '',
    website_description_ar: data.website_description_ar ?? '',
    website_tag_en: data.website_tag_en ?? '',
    website_tag_ar: data.website_tag_ar ?? '',
    website_default_language: String(data.website_default_language ?? '1'),
    website_language: String(data.website_language ?? '1'),
    website_country_en: data.website_country_en ?? '',
    website_country_ar: data.website_country_ar ?? '',
    website_status: data.websiteStatus ?? data.website_status ?? 1,
    facebook: data.facebook ?? '',
    twitter: data.twitter ?? '',
    linkedin: data.linkedin ?? '',
    youtube: data.youtube ?? '',
    instagram: data.instagram ?? '',
    whatsapp: data.whatsapp ?? '',
    snapchat: data.snapchat ?? '',
    tiktok: data.tiktok ?? '',
  };
}

export default function SiteInformationPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const websiteId = useWebsiteId();
  const [activeLang, setActiveLang] = useState<LangTab>(language);
  const [form, setForm] = useState<typeof defaultFormState>(defaultFormState);
  const [countries, setCountries] = useState<{ country_code: string; country_enName: string; country_arName: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const setField = useCallback((key: keyof typeof defaultFormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  useEffect(() => {
    if (!Number.isInteger(websiteId) || websiteId < 1) return;
    setLoadError(null);
    getSiteInformation(websiteId)
      .then((data) => {
        setForm(dataToFormState(data ?? null));
        setCountries(mergeCountries(data?.countries ?? []));
        setLoadError(null);
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : 'Failed to load');
      });
  }, [websiteId]);

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).jQuery) return;
    const $ = (window as any).jQuery;
    if ($.fn.selectpicker) $('select[data-live-search="true"]').selectpicker('refresh');

    if ($.fn.tagsinput) {
      // Destroy existing tagsinput so we can re-init with current form values (e.g. after load)
      $('input.tagsinput').each(function (this: HTMLElement) {
        const inst = $(this).data('tagsinput');
        if (inst && typeof inst.destroy === 'function') inst.destroy();
      });
      // Ensure DOM values match form state before re-init (plugin reads value on init)
      const tagsEnEl = document.getElementById('site-info-tags-en') as HTMLInputElement | null;
      const tagsArEl = document.getElementById('site-info-tags-ar') as HTMLInputElement | null;
      if (tagsEnEl) tagsEnEl.value = form.website_tag_en;
      if (tagsArEl) tagsArEl.value = form.website_tag_ar;
      $('.tagsinput').tagsinput();
    }
  }, [form.website_tag_en, form.website_tag_ar]);

  // Refresh bootstrap-select when country/language values change (e.g. after load) so button shows selected option, not placeholder
  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).jQuery) return;
    const $ = (window as any).jQuery;
    if ($.fn.selectpicker) {
      $('select[data-live-search="true"]').selectpicker('refresh');
    }
  }, [form.website_country_en, form.website_country_ar, form.website_language]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSaveMessage(null);
      setLoading(true);
      try {
        // Read tags from DOM in case bootstrap-tagsinput didn't sync to React state
        const tagsEnEl = document.getElementById('site-info-tags-en') as HTMLInputElement | null;
        const tagsArEl = document.getElementById('site-info-tags-ar') as HTMLInputElement | null;
        const website_tag_en = (tagsEnEl?.value ?? form.website_tag_en).trim();
        const website_tag_ar = (tagsArEl?.value ?? form.website_tag_ar).trim();

        const payload: Record<string, string | number> = {
          website_title_en: form.website_title_en,
          website_title_ar: form.website_title_ar,
          website_description_en: form.website_description_en,
          website_description_ar: form.website_description_ar,
          website_tag_en,
          website_tag_ar,
          website_default_language: form.website_default_language,
          website_language: form.website_language,
          website_country_en: form.website_country_en,
          website_country_ar: form.website_country_ar,
          website_status: form.website_status,
          facebook: form.facebook,
          twitter: form.twitter,
          linkedin: form.linkedin,
          youtube: form.youtube,
          instagram: form.instagram,
          whatsapp: form.whatsapp,
          snapchat: form.snapchat,
          tiktok: form.tiktok,
        };
        const result = await saveSiteInformation(payload, websiteId);
        if (result.success) {
          setSaveMessage({ type: 'success', text: t('common.saved') });
        } else {
          setSaveMessage({ type: 'error', text: result.error ?? t('common.saveFailed') });
        }
      } catch (err) {
        setSaveMessage({
          type: 'error',
          text: err instanceof Error ? err.message : t('common.saveFailed'),
        });
      } finally {
        setLoading(false);
      }
    },
    [form, websiteId, t]
  );

  return (
    <>
      <AcpPage pageTitle={t('settings.title')} activeItem="site-information">
        <SettingsConfigTabs activeTab="site-information" />
        <div className="page-content-wrapper" style={{ overflow: 'visible' }}>
          <div className="row" style={{ overflow: 'visible' }}>
            <div className="col-lg-12" style={{ overflow: 'visible' }}>
            {loadError && (
              <div className="alert alert-danger" role="alert">
                {loadError}
              </div>
            )}
            {saveMessage && (
              <div
                className={`alert ${saveMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                role="alert"
              >
                {saveMessage.text}
              </div>
            )}
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

            <form id="site-info-form" onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="tab-content" style={{ overflow: 'visible' }}>
                <div
                  className={`tab-pane fade ${activeLang === 'en' ? 'show active' : ''}`}
                  id="lang_en"
                  dir="ltr"
                  style={{ display: activeLang === 'en' ? 'block' : 'none', overflow: 'visible' }}
                >
                  <div className="card page-content_lang">
                    <div className="card-head border-bottom mb-3">
                      <h2 className="card-title text-right">{t('settings.siteInformation', undefined, 'en')}</h2>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.siteTitle', undefined, 'en')}
                            <span className="ml-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'en')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              value={form.website_title_en}
                              onChange={(e) => setField('website_title_en', e.target.value)}
                              placeholder={t('settings.exampleSiteTitle', undefined, 'en')}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.siteDescription', undefined, 'en')}
                            <span className="ml-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'en')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <textarea
                              rows={8}
                              value={form.website_description_en}
                              onChange={(e) => setField('website_description_en', e.target.value)}
                              placeholder={t('settings.enterSiteDescription', undefined, 'en')}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.keywords', undefined, 'en')}
                            <span className="ml-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'en')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="site-info-tags-en"
                              value={form.website_tag_en}
                              onChange={(e) => setField('website_tag_en', e.target.value)}
                              placeholder={t('settings.wordsKeywords', undefined, 'en')}
                              className="form-control tagsinput"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-4" style={{ overflow: 'visible' }}>
                    <div className="card-body" style={{ overflow: 'visible' }}>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.websiteLanguage', undefined, 'en')}
                            <span className="ml-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'en')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group website-language-select-wrap">
                            <select
                              className="form-control"
                              title={t('settings.websiteLanguage', undefined, 'en')}
                              data-live-search="true"
                              value={form.website_language}
                              onChange={(e) => setField('website_language', e.target.value)}
                            >
                              <option value="1">{t('settings.theArabic', undefined, 'en')}</option>
                              <option value="2">{t('common.english', undefined, 'en')}</option>
                              <option value="3">{t('settings.both', undefined, 'en')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.country', undefined, 'en')}
                            <span className="ml-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'en')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group country-select-wrap" style={{ overflow: 'visible' }}>
                            <select
                              className="form-control"
                              title={t('settings.selectCountry', undefined, 'en')}
                              data-live-search="true"
                              value={form.website_country_en}
                              onChange={(e) => setField('website_country_en', e.target.value)}
                            >
                              <option value="">{t('settings.selectCountry', undefined, 'en')}</option>
                              {countries.map((c) => (
                                <option key={c.country_code} value={c.country_code}>{c.country_enName}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.websiteStatus', undefined, 'en')}
                            <span className="ml-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'en')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="customRadio"
                                name="status"
                                checked={form.website_status === 1}
                                onChange={() => setField('website_status', 1)}
                              />
                              <label className="custom-control-label" htmlFor="customRadio">{t('settings.active', undefined, 'en')}</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="customRadio2"
                                name="status"
                                checked={form.website_status === 0}
                                onChange={() => setField('website_status', 0)}
                              />
                              <label className="custom-control-label" htmlFor="customRadio2">{t('settings.inactive', undefined, 'en')}</label>
                            </div>
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
                  style={{ display: activeLang === 'ar' ? 'block' : 'none', overflow: 'visible' }}
                >
                  <div className="card page-content_lang">
                    <div className="card-head border-bottom mb-3">
                      <h2 className="card-title text-right">{t('settings.siteInformation', undefined, 'ar')}</h2>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.siteTitle', undefined, 'ar')}
                            <span className="mr-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'ar')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              value={form.website_title_ar}
                              onChange={(e) => setField('website_title_ar', e.target.value)}
                              placeholder={t('settings.exampleSiteTitle', undefined, 'ar')}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.siteDescription', undefined, 'ar')}
                            <span className="mr-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'ar')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <textarea
                              rows={8}
                              value={form.website_description_ar}
                              onChange={(e) => setField('website_description_ar', e.target.value)}
                              placeholder={t('settings.enterSiteDescription', undefined, 'ar')}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.keywords', undefined, 'ar')}
                            <span className="mr-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'ar')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="site-info-tags-ar"
                              value={form.website_tag_ar}
                              onChange={(e) => setField('website_tag_ar', e.target.value)}
                              placeholder={t('settings.wordsKeywords', undefined, 'ar')}
                              className="form-control tagsinput"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-4" style={{ overflow: 'visible' }}>
                    <div className="card-body" style={{ overflow: 'visible' }}>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.websiteLanguage', undefined, 'ar')}
                            <span className="mr-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'ar')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group website-language-select-wrap">
                            <select
                              className="form-control"
                              title={t('settings.websiteLanguage', undefined, 'ar')}
                              data-live-search="true"
                              value={form.website_language}
                              onChange={(e) => setField('website_language', e.target.value)}
                            >
                              <option value="1">{t('settings.theArabic', undefined, 'ar')}</option>
                              <option value="2">{t('common.english', undefined, 'ar')}</option>
                              <option value="3">{t('settings.both', undefined, 'ar')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.country', undefined, 'ar')}
                            <span className="mr-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'ar')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group country-select-wrap" style={{ overflow: 'visible' }}>
                            <select
                              className="form-control"
                              title={t('settings.selectCountry', undefined, 'ar')}
                              data-live-search="true"
                              value={form.website_country_ar}
                              onChange={(e) => setField('website_country_ar', e.target.value)}
                            >
                              <option value="">{t('settings.selectCountry', undefined, 'ar')}</option>
                              {countries.map((c) => {
                                const code = c.country_code?.toUpperCase() ?? '';
                                const arLabel = COUNTRY_AR_NAMES[code] ?? c.country_arName ?? '';
                                const isArabicOnly = arLabel && !/[^\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(arLabel);
                                const displayLabel = isArabicOnly ? arLabel : 'دولة أخرى';
                                return <option key={c.country_code} value={c.country_code}>{displayLabel}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3">
                          <label className="form-label">
                            {t('settings.websiteStatus', undefined, 'ar')}
                            <span className="mr-2" data-placement="top" data-toggle="popover" data-content={t('settings.popoverContent', undefined, 'ar')}>
                              <i className="fas fa-info-circle"></i>
                            </span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="customRadio_ar"
                                name="status_ar"
                                checked={form.website_status === 1}
                                onChange={() => setField('website_status', 1)}
                              />
                              <label className="custom-control-label" htmlFor="customRadio_ar">{t('settings.active', undefined, 'ar')}</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="customRadio2_ar"
                                name="status_ar"
                                checked={form.website_status === 0}
                                onChange={() => setField('website_status', 0)}
                              />
                              <label className="custom-control-label" htmlFor="customRadio2_ar">{t('settings.inactive', undefined, 'ar')}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-head border-bottom mb-3">
                    <h2 className="card-title">{t('settings.socialMediaAccounts')}</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 social-media-form">
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-facebook-f"></i>
                          </div>
                          <input
                            type="url"
                            className="form-control"
                            placeholder=" https://facebook.com/"
                            value={form.facebook}
                            onChange={(e) => setField('facebook', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-twitter"></i>
                          </div>
                          <input
                            type="url"
                            className="form-control"
                            placeholder=" https://twitter.com/"
                            value={form.twitter}
                            onChange={(e) => setField('twitter', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-linkedin-in"></i>
                          </div>
                          <input
                            type="url"
                            className="form-control"
                            placeholder=" https://linkedin.com/"
                            value={form.linkedin}
                            onChange={(e) => setField('linkedin', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-youtube"></i>
                          </div>
                          <input
                            type="url"
                            className="form-control"
                            placeholder=" https://youtube.com/"
                            value={form.youtube}
                            onChange={(e) => setField('youtube', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-instagram"></i>
                          </div>
                          <input
                            type="url"
                            className="form-control"
                            placeholder=" https://instagram.com/"
                            value={form.instagram}
                            onChange={(e) => setField('instagram', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-whatsapp"></i>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('settings.whatsapp')}
                            value={form.whatsapp}
                            onChange={(e) => setField('whatsapp', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <i className="fab fa-snapchat"></i>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('settings.snapchat')}
                            value={form.snapchat}
                            onChange={(e) => setField('snapchat', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="icon">
                            <svg className="tiktok-icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('settings.tiktok')}
                            value={form.tiktok}
                            onChange={(e) => setField('tiktok', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left mt-4" dir="rtl">
              <div className="col-12 text-end">
                <button type="submit" form="site-info-form" className="btn btn-primary px-4" disabled={loading}>
                  {loading ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </AcpPage>

      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" strategy="beforeInteractive" />
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap-select.min.js" strategy="lazyOnload" />
      <Script src="/assets/js/bootstrap-tagsinput.min.js" strategy="lazyOnload" />
      <Script src="/assets/js/custom.js" strategy="lazyOnload" />
      <Script src="/assets/js/filter-domains.js" strategy="lazyOnload" />
      <Script src="/assets/js/language-switcher.js" strategy="lazyOnload" />
    </>
  );
}
