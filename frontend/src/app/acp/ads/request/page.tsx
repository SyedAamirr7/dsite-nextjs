'use client';

import { useState } from 'react';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

interface RequestItem {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const INITIAL_REQUESTS: RequestItem[] = [
  { id: 1, name: 'Ahmed MMD Date A', phone: '(966) 0589632147', email: 'ahmed.gmail.com' },
  { id: 2, name: 'Ahmed MMD Date A', phone: '(966) 0589632147', email: 'ahmed.gmail.com' },
  { id: 3, name: 'Ahmed MMD Date A', phone: '(966) 0589632147', email: 'ahmed.gmail.com' },
  { id: 4, name: 'Ahmed MMD Date A', phone: '(966) 0589632147', email: 'ahmed.gmail.com' },
  { id: 5, name: 'Ahmed MMD Date A', phone: '(966) 0589632147', email: 'ahmed.gmail.com' },
];

export default function AdsRequestPage() {
  const [items] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const { t } = useTranslation();

  return (
    <>
      <AcpPage pageTitle={t('ads.requestsTitle')} activeItem="ads">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link href="/acp/ads" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('ads.backToAds')}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover dsite-ad_table" id="table">
                          <thead>
                            <tr>
                              <th className="px-0">{t('common.name')}</th>
                              <th className="px-0">{t('ads.phone')}</th>
                              <th className="px-0">{t('common.email')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                  <a href={`tel:${item.phone.replace(/\D/g, '')}`}>{item.phone}</a>
                                </td>
                                <td>
                                  <a href={`mailto:${item.email}`}>{item.email}</a>
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
