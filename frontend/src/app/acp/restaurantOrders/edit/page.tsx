'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

const CATEGORY_OPTIONS = [
  { value: 'hot-drinks', labelKey: 'categoryHotDrinks' as const },
  { value: 'cold-drinks', labelKey: 'categoryColdDrinks' as const },
  { value: 'ice-cream', labelKey: 'categoryIceCream' as const },
  { value: 'sweets', labelKey: 'categorySweets' as const },
  { value: 'sandwich', labelKey: 'categorySandwich' as const },
];

interface LangContent {
  category: string;
  mainTitle: string;
  subtitle: string;
  description: string;
  content: string;
}

function RestaurantOrderEditContent() {
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

  const [en, setEn] = useState<LangContent>({ category: '', mainTitle: '', subtitle: '', description: '', content: '' });
  const [ar, setAr] = useState<LangContent>({ category: '', mainTitle: '', subtitle: '', description: '', content: '' });
  const [imagePreview, setImagePreview] = useState<string | null>('/assets/img/application.svg');
  const [price, setPrice] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (id) {
      setEn((p) => ({ ...p, mainTitle: `Product ${id}` }));
      setAr((p) => ({ ...p, mainTitle: `منتج ${id}` }));
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('/assets/img/application.svg');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save restaurant order', { id, en, ar, price, productNumber, status });
    router.push('/restaurantOrders');
  };

  return (
    <>
      <AcpPage pageTitle={t('restaurantOrdersApp.title')} activeItem="restaurantOrders">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/restaurantOrders" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('restaurantOrdersApp.backToOrders')}
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
                                <label className="form-label">{t('restaurantOrdersApp.category', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <select
                                  className="form-control"
                                  value={en.category}
                                  onChange={(e) => setEn((p) => ({ ...p, category: e.target.value }))}
                                  required
                                >
                                  <option value="" disabled>{t('restaurantOrdersApp.selectPlaceholder', undefined, 'en')}</option>
                                  {CATEGORY_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{t(`restaurantOrdersApp.${opt.labelKey}`, undefined, 'en')}</option>
                                  ))}
                                </select>
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.mainTitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.mainTitle', undefined, 'en')}
                                  value={en.mainTitle}
                                  onChange={(e) => setEn((p) => ({ ...p, mainTitle: e.target.value }))}
                                  autoComplete="off"
                                  required
                                />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.subtitle', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.subtitle', undefined, 'en')}
                                  value={en.subtitle}
                                  onChange={(e) => setEn((p) => ({ ...p, subtitle: e.target.value }))}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-3 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.description', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.description', undefined, 'en')}
                                  value={en.description}
                                  onChange={(e) => setEn((p) => ({ ...p, description: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-3 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.content', undefined, 'en')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={6}
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.content', undefined, 'en')}
                                  value={en.content}
                                  onChange={(e) => setEn((p) => ({ ...p, content: e.target.value }))}
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
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.category', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <select
                                  className="form-control"
                                  value={ar.category}
                                  onChange={(e) => setAr((p) => ({ ...p, category: e.target.value }))}
                                >
                                  <option value="" disabled>{t('restaurantOrdersApp.selectPlaceholder', undefined, 'ar')}</option>
                                  {CATEGORY_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{t(`restaurantOrdersApp.${opt.labelKey}`, undefined, 'ar')}</option>
                                  ))}
                                </select>
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.mainTitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.mainTitle', undefined, 'ar')}
                                  value={ar.mainTitle}
                                  onChange={(e) => setAr((p) => ({ ...p, mainTitle: e.target.value }))}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-4 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.subtitle', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="text"
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.subtitle', undefined, 'ar')}
                                  value={ar.subtitle}
                                  onChange={(e) => setAr((p) => ({ ...p, subtitle: e.target.value }))}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-3 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.description', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.description', undefined, 'ar')}
                                  value={ar.description}
                                  onChange={(e) => setAr((p) => ({ ...p, description: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-2 col-md-3 align-start">
                                <label className="form-label">{t('restaurantOrdersApp.content', undefined, 'ar')}</label>
                              </div>
                              <div className="col-lg-10">
                                <textarea
                                  rows={6}
                                  dir="rtl"
                                  className="form-control"
                                  placeholder={t('restaurantOrdersApp.content', undefined, 'ar')}
                                  value={ar.content}
                                  onChange={(e) => setAr((p) => ({ ...p, content: e.target.value }))}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-3">
                            <label className="form-label">{t('restaurantOrdersApp.image')}</label>
                          </div>
                          <div className="col-lg-5 col-md-8">
                            <div className="review-user-pic review-product-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img ml-4" htmlFor="pic-1">
                                <div className="upload rounded">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={imagePreview || '/assets/img/application.svg'} className="pic-1" alt={t('restaurantOrdersApp.orderImgAlt')} />
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  id="pic-1"
                                  className="d-none form-control"
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                                <small className="form-label text-center d-block">{t('restaurantOrdersApp.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="pic-1" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="ml-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('restaurantOrdersApp.changeImages')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={handleRemoveImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} />
                                  {t('restaurantOrdersApp.deleteImages')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('restaurantOrdersApp.productPrice')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t('restaurantOrdersApp.productPrice')}
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('restaurantOrdersApp.productNumber')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t('restaurantOrdersApp.productNumber')}
                              value={productNumber}
                              onChange={(e) => setProductNumber(e.target.value)}
                              autoComplete="off"
                            />
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
                        {t('common.update')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>
    </>
  );
}

export default function RestaurantOrderEditPage() {
  return (
    <Suspense fallback={null}>
      <RestaurantOrderEditContent />
    </Suspense>
  );
}
