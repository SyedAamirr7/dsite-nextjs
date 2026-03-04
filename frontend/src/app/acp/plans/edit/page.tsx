'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';
type Duration = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface LangContent {
  title: string;
  description: string;
}

interface FeatureRow {
  id: number;
  en: string;
  ar: string;
}

function PlanEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const [en, setEn] = useState<LangContent>({ title: '', description: '' });
  const [ar, setAr] = useState<LangContent>({ title: '', description: '' });
  const [features, setFeatures] = useState<FeatureRow[]>([{ id: 1, en: '', ar: '' }]);
  const [duration, setDuration] = useState<Duration>('yearly');
  const [price, setPrice] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>('/assets/img/download.jpg');
  const [status, setStatus] = useState(true);
  const [nextFeatureId, setNextFeatureId] = useState(2);

  useEffect(() => {
    if (id) {
      setEn((p) => ({ ...p, title: `Plan ${id}`, description: `Description for plan ${id}` }));
      setAr((p) => ({ ...p, title: `باقة ${id}`, description: `وصف الباقة ${id}` }));
    }
  }, [id]);

  const updateFeature = (id: number, field: 'en' | 'ar', value: string) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const addFeature = () => {
    setFeatures([...features, { id: nextFeatureId, en: '', ar: '' }]);
    setNextFeatureId((n) => n + 1);
  };

  const removeFeature = (id: number) => {
    if (features.length > 1) setFeatures(features.filter((f) => f.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save plan', { id, en, ar, features, duration, price, status, image: !!imagePreview });
    router.push('/plans');
  };

  return (
    <>
      <AcpPage pageTitle={t('plans.title')} activeItem="plans">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/plans" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('plans.backToPlans')}
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
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('plans.packageTitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('plans.packageTitle', undefined, 'en')}
                                  value={en.title}
                                  onChange={(e) => setEn((p) => ({ ...p, title: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('plans.packageDescription', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder={t('plans.packageDescription', undefined, 'en')}
                                  value={en.description}
                                  onChange={(e) => setEn((p) => ({ ...p, description: e.target.value }))}
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
                                <label className="form-label">{t('plans.packageTitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('plans.packageTitle', undefined, 'ar')}
                                  value={ar.title}
                                  onChange={(e) => setAr((p) => ({ ...p, title: e.target.value }))}
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('plans.packageDescription', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('plans.packageDescription', undefined, 'ar')}
                                  value={ar.description}
                                  onChange={(e) => setAr((p) => ({ ...p, description: e.target.value }))}
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
                            <label className="form-label">{t('plans.features')}</label>
                          </div>
                          <div className="col-lg-8">
                            {features.map((f) => (
                              <div key={f.id} className="input-group mt-2">
                                <input
                                  type="text"
                                  className="form-control rounded m-2"
                                  placeholder={t('plans.featurePlaceholderEn')}
                                  value={f.en}
                                  onChange={(e) => updateFeature(f.id, 'en', e.target.value)}
                                />
                                <input
                                  type="text"
                                  className="form-control rounded m-2"
                                  placeholder={t('plans.featurePlaceholderAr')}
                                  value={f.ar}
                                  onChange={(e) => updateFeature(f.id, 'ar', e.target.value)}
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-danger m-2"
                                  onClick={() => removeFeature(f.id)}
                                  disabled={features.length <= 1}
                                  title={t('plans.removeFeature')}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            ))}
                            <button type="button" className="btn btn-success mt-2" onClick={addFeature}>
                              <span className="bi bi-plus-square-dotted"> </span>
                              {t('plans.addFeature')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('plans.preferences')}</h3>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4 align-start">
                            <label className="form-label">{t('plans.duration')}</label>
                          </div>
                          <div className="col-lg-6">
                            <select
                              className="form-control"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value as Duration)}
                            >
                              <option value="daily">{t('plans.durationDaily')}</option>
                              <option value="weekly">{t('plans.durationWeekly')}</option>
                              <option value="monthly">{t('plans.durationMonthly')}</option>
                              <option value="yearly">{t('plans.durationYearly')}</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4 align-start">
                            <label className="form-label">{t('plans.price')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t('plans.price')}
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{t('common.required')}</div>
                          </div>
                        </div>
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-3 align-start">
                            <label className="form-label">{t('plans.image')}</label>
                          </div>
                          <div className="col-lg-5 col-md-8">
                            <div className="review-user-pic review-product-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img ml-4" htmlFor="pic-1">
                                <div className="upload rounded border">
                                  {imagePreview ? (
                                    <img src={imagePreview} className="pic-1" alt="" style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }} />
                                  ) : (
                                    <div className="p-4 text-muted">{t('plans.noImage')}</div>
                                  )}
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  id="pic-1"
                                  className="d-none form-control"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                                <small className="form-label text-center d-block">{t('plans.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="pic-1" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="ml-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('plans.changeImages')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={handleRemoveImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('plans.deleteImages')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3 align-start">
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

export default function PlanEditPage() {
  return (
    <Suspense fallback={null}>
      <PlanEditContent />
    </Suspense>
  );
}
