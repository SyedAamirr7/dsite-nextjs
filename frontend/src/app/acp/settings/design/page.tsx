'use client';

import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';
import { useWebsiteId } from '@/context/WebsiteContext';
import {
  getSiteStyles,
  saveSiteStyles,
  deleteDesignImage,
  getDesignAssetUrl,
  type SiteStylesData,
} from '@/services/designService';

const PLACEHOLDER_LOGO = '/assets/img/no-image.png';

interface LogoState {
  colorLogo: string;
  whiteLogo: string;
  favicon: string;
}

interface ColorState {
  color1: string; // Main title color
  color2: string; // Subtitle color
  color3: string; // Light
  color4: string; // Dark
  color5: string; // Button color
  color6: string; // Paragraph
  color7: string; // Footer
  color8: string; // Light background
}

export default function DesignPage() {
  const { t } = useTranslation();
  const websiteId = useWebsiteId();
  const [logos, setLogos] = useState<LogoState>({
    colorLogo: '/assets/img/logo.svg',
    whiteLogo: '/assets/img/logo.svg',
    favicon: '/assets/img/logo.svg',
  });

  const [colors, setColors] = useState<ColorState>({
    color1: '#000000',
    color2: '#f03c64',
    color3: '#f0783c',
    color4: '#f06450',
    color5: '#ffffff',
    color6: '#3cb450',
    color7: '#141414',
    color8: '#f05050',
  });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const colorLogoRef = useRef<HTMLInputElement>(null);
  const whiteLogoRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);

  const logoTypeToAttr: Record<keyof LogoState, 'website_logo_dark' | 'website_logo_light' | 'site_icon'> = {
    colorLogo: 'website_logo_dark',
    whiteLogo: 'website_logo_light',
    favicon: 'site_icon',
  };

  const designBtnStyle: React.CSSProperties = {
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontWeight: 400,
    color: '#B5B5B5',
    padding: '0 0.75rem',
    fontSize: '1rem',
    height: '38px',
    lineHeight: 1,
    boxSizing: 'border-box',
    margin: 0,
  };

  useEffect(() => {
    if (!Number.isInteger(websiteId) || websiteId < 1) {
      setLoading(false);
      setHasLoadedOnce(true);
      return;
    }
    setLoadError(null);
    setLoading(true);
    getSiteStyles(websiteId)
      .then((data: SiteStylesData) => {
        setLogos({
          colorLogo: getDesignAssetUrl(data.website_logo_dark) || PLACEHOLDER_LOGO,
          whiteLogo: getDesignAssetUrl(data.website_logo_light) || PLACEHOLDER_LOGO,
          favicon: getDesignAssetUrl(data.site_icon) || PLACEHOLDER_LOGO,
        });
        setColors({
          color1: data.color1 || '#000000',
          color2: data.color2 || '#f03c64',
          color3: data.color3 || '#f0783c',
          color4: data.color4 || '#f06450',
          color5: data.color5 || '#ffffff',
          color6: data.color6 || '#3cb450',
          color7: data.color7 || '#141414',
          color8: data.color8 || '#f05050',
        });
        setLoadError(null);
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : 'Failed to load site styles');
      })
      .finally(() => {
        setLoading(false);
        setHasLoadedOnce(true);
      });
  }, [websiteId]);

  const handleLogoChange = (type: keyof LogoState, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogos(prev => ({
          ...prev,
          [type]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoRemove = useCallback(
    (type: keyof LogoState) => {
      if (!Number.isInteger(websiteId) || websiteId < 1) return;
      const attr = logoTypeToAttr[type];
      deleteDesignImage(websiteId, attr)
        .then(() => {
          setLogos((prev) => ({ ...prev, [type]: PLACEHOLDER_LOGO }));
          if (type === 'colorLogo' && colorLogoRef.current) {
            colorLogoRef.current.value = '';
          } else if (type === 'whiteLogo' && whiteLogoRef.current) {
            whiteLogoRef.current.value = '';
          } else if (type === 'favicon' && faviconRef.current) {
            faviconRef.current.value = '';
          }
        })
        .catch((err) => {
          setSaveMessage({
            type: 'error',
            text: err instanceof Error ? err.message : t('common.error'),
          });
        });
    },
    [websiteId, t]
  );

  const handleColorChange = (colorKey: keyof ColorState, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Number.isInteger(websiteId) || websiteId < 1) return;
    setSaveMessage(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await saveSiteStyles(websiteId, formData);
      if (result.success) {
        setSaveMessage({ type: 'success', text: t('settings.designSaved') });
        if (result.website_logo_dark)
          setLogos((prev) => ({ ...prev, colorLogo: getDesignAssetUrl(result.website_logo_dark) || PLACEHOLDER_LOGO }));
        if (result.website_logo_light)
          setLogos((prev) => ({ ...prev, whiteLogo: getDesignAssetUrl(result.website_logo_light) || PLACEHOLDER_LOGO }));
        if (result.site_icon)
          setLogos((prev) => ({ ...prev, favicon: getDesignAssetUrl(result.site_icon) || PLACEHOLDER_LOGO }));
      } else {
        setSaveMessage({ type: 'error', text: result.error ?? t('common.error') });
      }
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text: err instanceof Error ? err.message : t('common.error'),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.design')} activeItem="design">
        <SettingsConfigTabs activeTab="design" />
        <div className="row">
                <div className="col-lg-12">
                  {loadError && (
                    <div className="alert alert-danger" role="alert">
                      {loadError}
                    </div>
                  )}
                  {saveMessage && (
                    <div className={`alert ${saveMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                      {saveMessage.text}
                    </div>
                  )}
                  {hasLoadedOnce && (
                  <form onSubmit={handleSubmit} className="website-design__form">
                    <div className="card">
                      <div className="card-body pt-5">
                        <div className="row">
                          {/* Logos Section */}
                          <div className="col-12 mb-5">
                            <h2 className="form-label mb-5 text-center">{t('settings.logos')}</h2>
                            <div className="d-flex gap-4 flex-wrap align-items-center justify-content-around">
                              
                              {/* Color Logo */}
                              <div className="logo-colorful-container d-flex flex-column p-0 align-items-center">
                                <p className="logo_title">{t('settings.colorLogo')}</p>
                                <label
                                  className="review-img p-3 border d-flex align-items-center justify-content-center"
                                  htmlFor="pic-3"
                                >
                                  <img
                                    id="colorful_logo"
                                    src={logos.colorLogo}
                                    className="pic-3 colorful_logo-img"
                                    alt={t('settings.colorLogo')}
                                  />
                                  <input
                                    type="file"
                                    name="img[website_logo_dark]"
                                    id="pic-3"
                                    ref={colorLogoRef}
                                    className="d-none form-control"
                                    onChange={(e) => handleLogoChange('colorLogo', e)}
                                    accept="image/*"
                                  />
                                </label>
                                <div className="btns-action__container d-flex gap-4 flex-nowrap justify-content-center align-items-center mt-2">
                                  <label htmlFor="pic-3" className="btn btn-light shadow-sm" style={designBtnStyle}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    {t('common.change')}
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-light shadow-sm delete-logo-img__website-design"
                                    onClick={() => handleLogoRemove('colorLogo')}
                                    style={designBtnStyle}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      fill="currentColor"
                                      className="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                    {t('common.remove')}
                                  </button>
                                </div>
                              </div>

                              {/* White Logo */}
                              <div className="logo-white-container d-flex flex-column p-0 align-items-center">
                                <p className="logo_title">{t('settings.whiteLogo')}</p>
                                <label
                                  className="review-img p-3 border d-flex align-items-center justify-content-center bg-secondary"
                                  htmlFor="pic-2"
                                >
                                  <img
                                    src={logos.whiteLogo}
                                    className="pic-2 white_logo-img"
                                    alt={t('settings.whiteLogo')}
                                  />
                                  <input
                                    type="file"
                                    name="img[website_logo_light]"
                                    id="pic-2"
                                    ref={whiteLogoRef}
                                    className="d-none form-control"
                                    onChange={(e) => handleLogoChange('whiteLogo', e)}
                                    accept="image/*"
                                  />
                                </label>
                                <div className="btns-action__container d-flex gap-4 flex-nowrap justify-content-center align-items-center mt-2">
                                  <label htmlFor="pic-2" className="btn btn-light shadow-sm" style={designBtnStyle}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    {t('common.change')}
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-light shadow-sm delete-logo-img__website-design"
                                    onClick={() => handleLogoRemove('whiteLogo')}
                                    style={designBtnStyle}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      fill="currentColor"
                                      className="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                    {t('common.remove')}
                                  </button>
                                </div>
                              </div>

                              {/* Favicon */}
                              <div className="domain-name-container flex-column p-0 d-flex align-items-center">
                                <p className="logo_title">{t('settings.websiteIcon')}</p>
                                <label
                                  className="review-img review-img__favicon p-1 border d-flex align-items-center justify-content-center"
                                  htmlFor="pic-1"
                                >
                                  <img
                                    src={logos.favicon}
                                    className="pic-1 favicon_logo-img"
                                    alt={t('settings.websiteIcon')}
                                  />
                                  <input
                                    type="file"
                                    name="img[site_icon]"
                                    id="pic-1"
                                    ref={faviconRef}
                                    className="d-none form-control"
                                    onChange={(e) => handleLogoChange('favicon', e)}
                                    accept="image/*"
                                  />
                                </label>
                                <div className="btns-action__container d-flex gap-4 flex-nowrap justify-content-center align-items-center mt-2">
                                  <label htmlFor="pic-1" className="btn btn-light shadow-sm" style={designBtnStyle}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    {t('common.change')}
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-light shadow-sm delete-logo-img__website-design"
                                    onClick={() => handleLogoRemove('favicon')}
                                    style={designBtnStyle}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      fill="currentColor"
                                      className="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                    {t('common.remove')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Colors Section */}
                          <div className="col-12 colors_container">
                            <h2 className="form-label mb-5 text-center">{t('settings.colors')}</h2>
                            <div className="row">
                              {/* Main title color */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="main-color" className="p-0 text-start">
                                    {t('settings.mainTitleColor')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="main-color"
                                      name="key[color1]"
                                      value={colors.color1}
                                      onChange={(e) => handleColorChange('color1', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                      >
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Subtitle color */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="secondary-color" className="p-0 text-start">
                                    {t('settings.subtitleColor')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color2]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="secondary-color"
                                      value={colors.color2}
                                      onChange={(e) => handleColorChange('color2', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Light */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="sub-1-color" className="p-0 text-start">
                                    {t('settings.light')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color3]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="sub-1-color"
                                      value={colors.color3}
                                      onChange={(e) => handleColorChange('color3', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Dark */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="sub-2-color" className="p-0 text-start">
                                    {t('settings.dark')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color4]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="sub-2-color"
                                      value={colors.color4}
                                      onChange={(e) => handleColorChange('color4', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Button color */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="sub-3-color" className="p-0 text-start">
                                    {t('settings.buttonColor')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color5]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="sub-3-color"
                                      value={colors.color5}
                                      onChange={(e) => handleColorChange('color5', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Paragraph */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="sub-4-color" className="p-0 text-start">
                                    {t('settings.paragraph')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color6]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="sub-4-color"
                                      value={colors.color6}
                                      onChange={(e) => handleColorChange('color6', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Footer */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="sub-5-color" className="p-0 text-start">
                                    {t('settings.footer')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color7]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="sub-5-color"
                                      value={colors.color7}
                                      onChange={(e) => handleColorChange('color7', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Light background */}
                              <div className="col-md-6">
                                <div className="form-group d-flex align-items-center justify-content-center gap-4">
                                  <label htmlFor="sub-6-color" className="p-0 text-start">
                                    {t('settings.lightBackground')}
                                  </label>
                                  <div className="colorInputParent position-relative border overflow-hidden">
                                    <input
                                      name="key[color8]"
                                      type="color"
                                      className="color-input border-0 w-100 h-100 cursor-pointer"
                                      id="sub-6-color"
                                      value={colors.color8}
                                      onChange={(e) => handleColorChange('color8', e.target.value)}
                                    />
                                    <span className="eyedropper__icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-left mt-4" dir="rtl">
                      <button type="submit" className="btn btn-primary px-5" disabled={saving || loading}>
                        {saving ? t('common.saving') || 'Saving...' : t('common.save')}
                      </button>
                    </div>
                  </form>
                  )}
                </div>
              </div>
      </AcpPage>
    </>
  );
}
