'use client';

import { useState } from 'react';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

interface Administrator {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: boolean;
}

export default function AdministratorsPage() {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState<Administrator[]>([
    {
      id: 1,
      name: 'admin',
      email: 'info@dnet.sa',
      avatar: '/assets/img/user-pic.png',
      status: true
    },
    {
      id: 2,
      name: 'admin',
      email: 'info@dnet.sa',
      avatar: '/assets/img/user-pic.png',
      status: true
    },
    {
      id: 3,
      name: 'admin',
      email: 'info@dnet.sa',
      avatar: '/assets/img/user-pic.png',
      status: true
    }
  ]);

  const handleStatusToggle = (id: number) => {
    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, status: !admin.status } : admin
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted with admins:', admins);
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.administrators')} activeItem="administrators">
        <SettingsConfigTabs activeTab="administrators" />
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit} className="administrators-form">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>{t('common.name')}</th>
                          <th>{t('common.email')}</th>
                          <th>{t('common.status')}</th>
                          <th>{t('common.action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map((admin) => (
                          <tr key={admin.id}>
                            <td>
                              <div className="d-flex align-items-center flex-lg-row flex-column">
                                <span className="user-pic administrators-table__user-pic">
                                  <img src={admin.avatar} alt={admin.name} />
                                </span>
                                <span className="ml-3">{admin.name}</span>
                              </div>
                            </td>
                            <td>
                              <a href={`mailto:${admin.email}`} className="text-dark">
                                {admin.email}
                              </a>
                            </td>
                            <td>
                              <label className="label-switch switch-success mb-0" dir="ltr">
                                <input
                                  type="checkbox"
                                  className="switch switch-bootstrap status"
                                  checked={admin.status}
                                  onChange={() => handleStatusToggle(admin.id)}
                                />
                                <span className="lable"></span>
                              </label>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-4 flex-wrap">
                                <Link
                                  href={`/acp/settings/administrators/edit?id=${admin.id}`}
                                  className="btn btn-light px-4 border administrators-table__edit-btn"
                                >
                                  {t('common.edit')}
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
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
