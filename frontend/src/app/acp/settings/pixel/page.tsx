'use client';

import { useState } from 'react';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

interface PixelTracking {
  id: number;
  name: string;
  pixelId: string;
  status: boolean;
  isActive: boolean;
}

export default function PixelPage() {
  const { t } = useTranslation();
  const [pixels, setPixels] = useState<PixelTracking[]>([
    { id: 1, name: 'Facebook', pixelId: '', status: false, isActive: true },
    { id: 2, name: 'Google Analytics', pixelId: '', status: false, isActive: false },
    { id: 3, name: 'Google tag', pixelId: '', status: false, isActive: false },
    { id: 4, name: 'Instagram', pixelId: '', status: false, isActive: false },
    { id: 5, name: 'Snapchat', pixelId: '', status: false, isActive: false },
    { id: 6, name: 'Twitter', pixelId: '', status: false, isActive: false },
  ]);

  const handleStatusToggle = (id: number) => {
    setPixels(pixels.map(pixel =>
      pixel.id === id ? { ...pixel, status: !pixel.status } : pixel
    ));
  };

  const handleActivate = (id: number) => {
    // Handle activation - would typically show a modal to enter pixel ID
    console.log('Activate pixel:', id);
  };

  const handleUpdate = (id: number) => {
    // Handle update - would typically show a modal to update pixel ID
    console.log('Update pixel:', id);
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.pixelTracking')} activeItem="pixel">
        <SettingsConfigTabs activeTab="pixel" />
        <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive overflow-auto">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th className="text-gray">{t('common.name')}</th>
                              <th className="text-gray">{t('settings.numberIntroductory')}</th>
                              <th className="text-gray">{t('common.status')}</th>
                              <th className="text-gray text-right">{t('common.action')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pixels.map((pixel) => (
                              <tr key={pixel.id}>
                                <td>{pixel.name}</td>
                                <td></td>
                                <td>
                                  {pixel.isActive ? (
                                    <label className="label-switch switch-success mb-0" dir="ltr">
                                      <input
                                        type="checkbox"
                                        className="switch switch-bootstrap status"
                                        checked={pixel.status}
                                        onChange={() => handleStatusToggle(pixel.id)}
                                      />
                                      <span className="lable"></span>
                                    </label>
                                  ) : null}
                                </td>
                                <td className="text-right">
                                  {pixel.isActive ? (
                                    <button
                                      type="button"
                                      className="btn btn-light px-4 border rounded"
                                      onClick={() => handleUpdate(pixel.id)}
                                    >
                                      {t('common.update')}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-light px-4 border rounded"
                                      onClick={() => handleActivate(pixel.id)}
                                    >
                                      {t('settings.activate')}
                                    </button>
                                  )}
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
      </AcpPage>
    </>
  );
}
