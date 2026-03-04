'use client';

import { useState, useRef, useEffect } from 'react';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';
import * as profileService from '@/services/profileService';
import type { ProfileData } from '@/types/api';

export default function ProfilePage() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setFullName(data.fullname || '');
        setEmail(data.email || '');
        setCurrentEmail(data.email || '');
        setPhoneNumber(data.phone || '');
        setAddress(data.address || '');
        const photoUrl = profileService.getProfilePhotoUrl(data.photo);
        if (photoUrl) {
          setCurrentPhoto(photoUrl);
          setPhotoPreview(photoUrl);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    loadProfile();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await profileService.deletePhoto();
        setPhotoPreview(null);
        setCurrentPhoto(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setSuccessMessage('Photo deleted successfully');
        setTimeout(() => setSuccessMessage(null), 5000);
      } catch {
        setErrorMessage('Failed to delete photo');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullname', fullName);
      formData.append('email', email);
      formData.append('current_email', currentEmail);
      if (phoneNumber) formData.append('phone', phoneNumber);
      if (address) formData.append('address', address);
      const photoFile = fileInputRef.current?.files?.[0];
      if (photoFile) formData.append('photo', photoFile);

      const result = await profileService.updateProfile(formData);
      setSuccessMessage(result.message || 'Profile updated successfully');
      setCurrentEmail(email);
      const photoUrl = profileService.getProfilePhotoUrl(result.photo);
      if (photoUrl) {
        setCurrentPhoto(photoUrl);
        setPhotoPreview(photoUrl);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update profile');
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPhotoSrc = () => {
    if (photoPreview) return photoPreview;
    if (currentPhoto) return currentPhoto;
    return '/assets/img/user-pic-default.svg';
  };

  return (
    <AcpPage pageTitle={t('profile.title')} activeItem="home">
      <div className="page-content-wrapper">
        <form onSubmit={handleSubmit} className="needs-validation" encType="multipart/form-data" noValidate>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="lang_ar">
                  <div className="card">
                    <div className="card-body">
                      {/* Success Message */}
                      {successMessage && (
                        <div className="col-xs-12 alert alert-success">
                          <a
                            href="#"
                            className="close"
                            onClick={(e) => {
                              e.preventDefault();
                              setSuccessMessage(null);
                            }}
                            aria-label="close"
                          >
                            ×
                          </a>
                          {successMessage}
                        </div>
                      )}

                      {/* Error Message */}
                      {errorMessage && (
                        <div className="col-xs-12 alert alert-danger">
                          <a
                            href="#"
                            className="close"
                            onClick={(e) => {
                              e.preventDefault();
                              setErrorMessage(null);
                            }}
                            aria-label="close"
                          >
                            ×
                          </a>
                          {errorMessage}
                        </div>
                      )}

                      {/* Profile Photo Section */}
                      <div className="form-group row mb-3">
                        <div className="col-lg-2 col-md-4">
                          <label className="form-label">{t('profile.profilePicture')}</label>
                        </div>
                        <div className="col-lg-10">
                          <div className="review-user-pic page-view d-block text-center">
                            <label className="review-img mb-4" htmlFor="page-view-pic">
                              <div className="upload rounded" style={{ width: '150px', height: '150px' }}>
                                <img
                                  src={getPhotoSrc()}
                                  className="page-view-pic img-fluid"
                                  alt="Profile image"
                                  style={{ borderRadius: '50%', objectFit: 'cover', width: '150px', height: '150px' }}
                                />
                              </div>
                              <input
                                ref={fileInputRef}
                                type="file"
                                name="photo"
                                id="page-view-pic"
                                className="d-none form-control"
                                onChange={handlePhotoChange}
                                accept="image/*"
                                autoComplete="off"
                              />
                              <div className="invalid-feedback">{t('common.required')}</div>
                            </label>
                            <div className="review-img-action d-flex justify-content-center align-items-center gap-2 flex-wrap">
                              <label
                                htmlFor="page-view-pic"
                                className="btn btn-light shadow-sm mb-0 d-inline-flex align-items-center"
                              >
                                <img src="/assets/img/change.svg" className="me-2" alt="" style={{ flexShrink: 0 }} />
                                <span>{t('profile.changePicture')}</span>
                              </label>
                              <button
                                type="button"
                                className="btn btn-light shadow-sm d-inline-flex align-items-center"
                                onClick={removePhoto}
                              >
                                <img src="/assets/img/trash.svg" className="me-2" alt="" style={{ flexShrink: 0 }} />
                                <span>{t('profile.deletePicture')}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div className="row mb-2">
                        <div className="col-xl-2 col-md-3">
                          <label className="form-label">{t('profile.fullName')}</label>
                        </div>
                        <div className="col-lg-10">
                          <div className="form-group mb-0">
                            <input
                              type="text"
                              name="fullname"
                              placeholder={t('profile.fullName')}
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="row mb-2">
                        <div className="col-xl-2 col-md-3">
                          <label className="form-label">{t('profile.email')}</label>
                        </div>
                        <div className="col-lg-10">
                          <div className="form-group mb-0">
                            <input type="hidden" name="current_email" value={currentEmail} />
                            <input
                              type="email"
                              name="email"
                              placeholder={t('profile.email')}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="row mb-2">
                        <div className="col-xl-2 col-md-3">
                          <label className="form-label">{t('profile.phoneNumber')}</label>
                        </div>
                        <div className="col-lg-10">
                          <div className="form-group mb-0">
                            <input
                              type="text"
                              name="phone"
                              style={{ direction: 'ltr' }}
                              placeholder={t('profile.phonePlaceholder')}
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="row mb-0">
                        <div className="col-xl-2 col-md-3">
                          <label className="form-label">{t('profile.address')}</label>
                        </div>
                        <div className="col-lg-10">
                          <div className="form-group mb-0">
                            <textarea
                              rows={3}
                              name="address"
                              placeholder={t('profile.addressPlaceholder')}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="row mt-4" style={{ direction: 'rtl' }}>
            <div className="col-12 text-right">
              <button
                type="submit"
                name="submit"
                className="btn btn-primary px-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : t('common.update')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AcpPage>
  );
}
