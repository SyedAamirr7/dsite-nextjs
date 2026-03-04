'use client';

import { useState } from 'react';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

interface PlanTransaction {
  id: number;
  name: string;
  subscriptions: number;
  type: string;
  typeThe: string;
  tadButton: string;
  date: string;
}

export default function SubscriptionsPage() {
  const { t } = useTranslation();
  const [planName] = useState('Basic plan');
  const [planSubtitle] = useState('(dnet)');
  const [planStatus] = useState<'active' | 'warning' | 'inactive'>('active');
  const [expiryDate] = useState('Oct 20, 2024.');
  const [price] = useState('199');

  const [transactions] = useState<PlanTransaction[]>([
    { id: 1, name: 'Basic plan', subscriptions: 3, type: 'Created', typeThe: '-', tadButton: '-', date: 'Oct 20, 2024 12:06:18' },
    { id: 2, name: 'Basic plan', subscriptions: 3, type: 'Created', typeThe: '-', tadButton: '-', date: 'Oct 20, 2024 12:06:18' },
    { id: 3, name: 'Basic plan', subscriptions: 3, type: 'Created', typeThe: '-', tadButton: '-', date: 'Oct 20, 2024 12:06:18' },
  ]);

  return (
    <>
      <AcpPage pageTitle={t('settings.subscriptions')} activeItem="subscriptions">
        <div className="plan-info_wrapper">
          <SettingsConfigTabs activeTab="subscriptions" />
          {/* Plan details */}
          <div className="row mb-5">
                <div className="col px-0">
                  <div className="myPlan_details">
                    <div className="mb-5 text-start">
                      <h2 className="card-title m-0 p-0">{t('settings.plan')}</h2>
                    </div>
                    <div className="row align-items-center mt-0">
                      <div className="col-md-3">
                        <p className="mb-0"><b>{t('settings.nameColon')}</b></p>
                      </div>
                      <div className="col-md-6 d-flex align-items-center justify-content-md-start justify-content-center gap-4 flex-wrap flex-md-row flex-column mt-md-0 mt-4">
                        <h3 className="mb-0 plan_name">
                          {planName}
                          <small className="content_subtitle">{planSubtitle}</small>
                        </h3>
                        <Link href="/acp/plans" className="myPlan_link mx-md-4 mx-0">
                          {t('settings.changeThe')}
                        </Link>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <p className="mb-0"><b>{t('settings.theThe')}</b></p>
                      </div>
                      <div className="col-md-4 mt-md-0 mt-4">
                        <div className="d-flex justify-content-md-start justify-content-center">
                          {planStatus === 'active' && (
                            <div className="plan-status active-plan">
                              <span className="title-status">{t('settings.active')}</span>
                              <span className="dot-status"></span>
                            </div>
                          )}
                          {planStatus === 'warning' && (
                            <div className="plan-status warning-plan">
                              <span className="title-status">{t('settings.active')}</span>
                              <span className="dot-status"></span>
                            </div>
                          )}
                          {planStatus === 'inactive' && (
                            <div className="plan-status inactive-plan">
                              <span className="title-status">{t('settings.inactive')}</span>
                              <span className="dot-status"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <p className="mb-0"><b>{t('settings.dateNoNTA')}</b></p>
                      </div>
                      <div className="col-md-6 d-flex align-items-center justify-content-md-start justify-content-center gap-4 flex-wrap flex-md-row flex-column mt-md-0 mt-4">
                        <p className="mb-0 plan_expiry-day">{expiryDate}</p>
                        <Link href="/acp/plans" className="myPlan_link mx-md-4 mx-0">
                          {t('settings.newPlan')}
                        </Link>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <p className="mb-0"><b>{t('settings.aThe')}</b></p>
                      </div>
                      <div className="col-md-4 text-md-left text-center mt-md-0 mt-4">
                        <p className="mb-0 plan_price">{price} <span>{t('settings.riyalsPerYear')}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction history / Date Plan */}
              <div className="transaction-history text-center table-responsive mb-5">
                <div className="mb-5 text-start">
                  <h2 className="card-title m-0 p-0">{t('settings.datePlan')}</h2>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>{t('common.name')}</th>
                      <th>{t('settings.subscriptionsCount')}</th>
                      <th>{t('common.type')}</th>
                      <th>{t('settings.typeThe')}</th>
                      <th>{t('settings.tadButton')}</th>
                      <th>{t('common.date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <h3 className="mb-0 plan_name">
                            {row.name}
                            <small className="content_subtitle">(dnet)</small>
                          </h3>
                        </td>
                        <td>{row.subscriptions}</td>
                        <td>{row.type}</td>
                        <td>{row.typeThe}</td>
                        <td>{row.tadButton}</td>
                        <td>
                          <p className="mb-0 plan_expiry-day">{row.date}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        </div>
      </AcpPage>
    </>
  );
}
