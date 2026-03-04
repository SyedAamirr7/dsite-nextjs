'use client';

import { useState } from 'react';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

interface FormRow {
  id: number;
  title: string;
  active: boolean;
}

const INITIAL_FORMS: FormRow[] = [
  { id: 1, title: 'Contact Us', active: true },
  { id: 2, title: 'Newsletter Subscription', active: true },
  { id: 3, title: 'Feedback Form', active: false },
];

export default function FormsPage() {
  const { t } = useTranslation();
  const [forms, setForms] = useState<FormRow[]>(INITIAL_FORMS);

  const toggleStatus = (id: number) => {
    setForms(forms.map((f) => (f.id === id ? { ...f, active: !f.active } : f)));
  };

  const handleDelete = (id: number) => {
    if (typeof window !== 'undefined' && window.confirm(t('common.confirmDelete', { item: t('settings.formTitle') }))) {
      setForms(forms.filter((f) => f.id !== id));
    }
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.title')} activeItem="forms">
        <SettingsConfigTabs activeTab="forms" />
        <div className="row">
          <div className="col-lg-12">
            <div className="text-left mb-4 d-flex align-items-center gap-3" dir="ltr">
              <Link href="/acp/settings/forms/edit" className="btn btn-warning text-white">
                <i className="fa fa-plus ml-2"></i>
                {t('settings.addForm')}
              </Link>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive overflow-auto">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>{t('settings.formTitle')}</th>
                        <th>{t('common.status')}</th>
                        <th>{t('common.action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forms.map((row) => (
                        <tr key={row.id}>
                          <td>{row.title}</td>
                          <td>
                            <label className="label-switch switch-success mb-0">
                              <input
                                type="checkbox"
                                className="switch switch-bootstrap status"
                                checked={row.active}
                                onChange={() => toggleStatus(row.id)}
                              />
                              <span className="lable"></span>
                            </label>
                          </td>
                          <td>
                            <Link
                              href="/acp/settings/forms/edit"
                              className="btn btn-light px-3 border mr-2"
                            >
                              {t('common.edit')}
                            </Link>
                            <button
                              type="button"
                              className="btn btn-light px-3 border text-danger"
                              onClick={() => handleDelete(row.id)}
                            >
                              {t('common.delete')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {forms.length > 0 && (
                  <div className="d-flex justify-content-center mt-3">
                    <nav aria-label="Forms pagination">
                      <ul className="pagination mb-0">
                        <li className="page-item disabled">
                          <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item active" aria-current="page">
                          <span className="page-link">1</span>
                        </li>
                        <li className="page-item">
                          <span className="page-link">Next</span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AcpPage>
    </>
  );
}
