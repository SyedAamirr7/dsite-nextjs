'use client';

import { Suspense, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

function EditAdministratorContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState(true);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save administrator', { id, fullName, email, phone, status });
    router.push('/settings/administrators');
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.administrators')} activeItem="administrators">
        <SettingsConfigTabs activeTab="administrators" />
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-right mb-4">
                    <Link href="/acp/settings/administrators" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('settings.backToAdministrators')}
                    </Link>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="card">
                      <div className="card-body">
                        <div className="form-group row align-items-center">
                          <div className="col-lg-2 col-md-3">
                            <label className="form-label">{t('settings.personalPhoto')}</label>
                          </div>
                          <div className="col-lg-5 col-md-8">
                            <div className="review-user-pic">
                              <label className="review-img ml-4" htmlFor="pic-1">
                                <div className="upload">
                                  {photoPreview ? (
                                    <img src={photoPreview} className="pic-1" alt="" style={{ maxWidth: '100%', height: 'auto' }} />
                                  ) : (
                                    <img src="/assets/img/user-pic-default.svg" className="pic-1" alt="" />
                                  )}
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  id="pic-1"
                                  className="d-none form-control"
                                  accept="image/*"
                                  onChange={handlePhotoChange}
                                />
                              </label>
                              <div className="review-img-action d-flex align-items-center gap-2 flex-wrap">
                                <label htmlFor="pic-1" className="btn btn-light shadow-sm mb-0 d-inline-flex align-items-center">
                                  <img src="/assets/img/change.svg" className="ml-2" alt="" />
                                  {t('settings.changeImage')}
                                </label>
                                <button type="button" className="btn btn-light shadow-sm mb-0 d-inline-flex align-items-center" onClick={removePhoto}>
                                  <img src="/assets/img/trash.svg" className="ml-2" alt="" />
                                  {t('settings.deleteImage')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-4">
                            <label className="form-label">{t('settings.fullName')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t('settings.exampleFullName')}
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3">
                            <label className="form-label">{t('common.email')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="email"
                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                              className="form-control"
                              placeholder={t('settings.exampleEmail')}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3">
                            <label className="form-label">{t('settings.phone')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="ex: 966-56-5948485"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-2 col-md-3">
                            <label className="form-label">{t('settings.pin')}</label>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="**********"
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
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
                      <button type="submit" className="btn btn-primary px-5">
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

export default function EditAdministratorPage() {
  return (
    <Suspense fallback={null}>
      <EditAdministratorContent />
    </Suspense>
  );
}
