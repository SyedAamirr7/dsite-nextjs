'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';
type LinkType = 'description' | 'otherLink' | 'off';

interface LangContent {
  mainTitle: string;
  subtitle: string;
  shortDescription: string;
  content: string;
}

function WorkerEditContent() {
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

  const [en, setEn] = useState<LangContent>({ mainTitle: '', subtitle: '', shortDescription: '', content: '' });
  const [ar, setAr] = useState<LangContent>({ mainTitle: '', subtitle: '', shortDescription: '', content: '' });
  const [status, setStatus] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [linkType, setLinkType] = useState<LinkType>('description');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    if (id) {
      setEn((prev) => ({ ...prev, mainTitle: `Work ${id}` }));
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
    console.log('Save worker', { id, en, ar, status, linkType, linkUrl });
    router.push('/workers');
  };

  return (
    <>
      <AcpPage pageTitle={t('workers.title')} activeItem="workers">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/workers" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('workers.backToWorkers')}
                    </Link>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <nav className="nav nav-tabs language-tab">
                      <button type="button" className={`nav-link ${activeLang === 'en' ? 'active' : ''}`} onClick={() => setActiveLang('en')}>{t('common.english')}</button>
                      <button type="button" className={`nav-link ${activeLang === 'ar' ? 'active' : ''}`} onClick={() => setActiveLang('ar')}>{t('common.arabic')}</button>
                    </nav>

                    <div className="tab-content">
                      <div className={`tab-pane fade ${activeLang === 'en' ? 'show active' : ''}`} id="lang_en" dir="ltr">
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.mainTitle', undefined, 'en')}</label></div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('workers.mainTitle', undefined, 'en')} value={en.mainTitle} onChange={(e) => setEn((p) => ({ ...p, mainTitle: e.target.value }))} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.subtitle', undefined, 'en')}</label></div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder={t('workers.subtitle', undefined, 'en')} value={en.subtitle} onChange={(e) => setEn((p) => ({ ...p, subtitle: e.target.value }))} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.shortDescription', undefined, 'en')}</label></div>
                              <div className="col-lg-6">
                                <textarea rows={3} className="form-control" placeholder={t('workers.shortDescription', undefined, 'en')} value={en.shortDescription} onChange={(e) => setEn((p) => ({ ...p, shortDescription: e.target.value }))} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.content', undefined, 'en')}</label></div>
                              <div className="col-lg-10">
                                <textarea rows={8} className="form-control" placeholder={t('workers.content', undefined, 'en')} value={en.content} onChange={(e) => setEn((p) => ({ ...p, content: e.target.value }))} />
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
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.mainTitle', undefined, 'ar')}</label></div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('workers.mainTitle', undefined, 'ar')} value={ar.mainTitle} onChange={(e) => setAr((p) => ({ ...p, mainTitle: e.target.value }))} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.subtitle', undefined, 'ar')}</label></div>
                              <div className="col-lg-6">
                                <input type="text" dir="rtl" className="form-control" placeholder={t('workers.subtitle', undefined, 'ar')} value={ar.subtitle} onChange={(e) => setAr((p) => ({ ...p, subtitle: e.target.value }))} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.shortDescription', undefined, 'ar')}</label></div>
                              <div className="col-lg-6">
                                <textarea rows={3} dir="rtl" className="form-control" placeholder={t('workers.shortDescription', undefined, 'ar')} value={ar.shortDescription} onChange={(e) => setAr((p) => ({ ...p, shortDescription: e.target.value }))} required />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.content', undefined, 'ar')}</label></div>
                              <div className="col-lg-10">
                                <textarea rows={8} dir="rtl" className="form-control" placeholder={t('workers.content', undefined, 'ar')} value={ar.content} onChange={(e) => setAr((p) => ({ ...p, content: e.target.value }))} />
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title font-weight-bold mb-4">{t('workers.preferences')}</h3>
                        <div className="form-group row align-items-center">
                          <div className="col-xl-2 col-md-3 align-start">
                            <label className="form-label">{t('workers.imageWork')}</label>
                          </div>
                          <div className="col-lg-6 col-md-8">
                            <div className="review-user-pic review-product-pic d-flex align-items-flex-start gap-3">
                              <label className="review-img mb-0" htmlFor="work-pic">
                                <div className="upload rounded overflow-hidden border flex-shrink-0" style={{ width: '181px', height: '181px' }}>
                                  {imagePreview ? <img src={imagePreview} className="w-100 h-100" style={{ objectFit: 'cover' }} alt="Preview" /> : <img src="/assets/img/portfolio/Rectangle 5002.png" className="w-100 h-100" style={{ objectFit: 'cover' }} alt="" />}
                                </div>
                                <input ref={fileInputRef} type="file" id="work-pic" className="d-none form-control" accept="image/*" onChange={handleImageChange} />
                                <small className="form-label text-muted d-block mt-2">{t('workers.imageSizeHint')}</small>
                              </label>
                              <div className="review-img-action d-flex flex-column gap-2 flex-shrink-0">
                                <label htmlFor="work-pic" className="btn btn-light btn-block shadow-sm mb-3 text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }}>
                                  <img src="/assets/img/change.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} /><span>{t('workers.changeImages')}</span>
                                </label>
                                <button type="button" className="btn btn-light shadow-sm text-uppercase d-inline-flex align-items-center" style={{ letterSpacing: '0.02em' }} onClick={removeImage}>
                                  <img src="/assets/img/trash.svg" className="mr-2 flex-shrink-0" alt="" style={{ width: '15px', height: '15px' }} /><span>{t('workers.deleteImages')}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.selectLinkType')}</label></div>
                          <div className="col-lg-6">
                            <select className="form-control" value={linkType} onChange={(e) => setLinkType(e.target.value as LinkType)}>
                              <option value="description">{t('workers.linkTypeSubPage')}</option>
                              <option value="otherLink">{t('workers.linkTypeExternalLink')}</option>
                              <option value="off">{t('workers.linkTypeOff')}</option>
                            </select>
                          </div>
                        </div>
                        {linkType === 'otherLink' && (
                          <div className="form-group row">
                            <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('workers.link')}</label></div>
                            <div className="col-lg-6">
                              <input type="url" className="form-control" placeholder={t('workers.linkPlaceholder')} value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                            </div>
                          </div>
                        )}
                        <div className="form-group row">
                          <div className="col-xl-2 col-md-3 align-start"><label className="form-label">{t('common.status')}</label></div>
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
                      <button type="submit" className="btn btn-primary px-5 text-uppercase" style={{ letterSpacing: '0.05em' }}>{t('common.save')}</button>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>
    </>
  );
}

export default function WorkerEditPage() {
  return (
    <Suspense fallback={null}>
      <WorkerEditContent />
    </Suspense>
  );
}
