'use client';

import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';

interface DnsRecord {
  id: number;
  name: string;
  type: string;
  action: string;
}

export default function DomainPage() {
  const { t } = useTranslation();
  const [domain] = useState('osama.pro');
  const [nameServers] = useState([
    'dns2.registrar-servers.com',
    'dns1.registrar-servers.com'
  ]);
  const [cloudflareServers] = useState([
    'anastasia.ns.cloudflare.com',
    'jakub.ns.cloudflare.com'
  ]);
  const [dnsRecords] = useState<DnsRecord[]>([
    { id: 1, name: '-', type: '-', action: '-' },
    { id: 2, name: '-', type: '-', action: '-' },
    { id: 3, name: '-', type: '-', action: '-' }
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.domain')} activeItem="domain">
        <SettingsConfigTabs activeTab="domain" />
        {/* Domain Information Card */}
        <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-5 text-start">
                        <h2 className="card-title m-0 p-0">{t('settings.domain')}</h2>
                      </div>
                      
                      <div className="row mt-3 align-items-center">
                        <div className="col-md-4">
                          <p className="mb-0 font-weight-bold">{t('settings.theDomain')}</p>
                        </div>
                        <div className="col-md-4 my-md-0 my-3">
                          <input
                            value={domain}
                            style={{ textAlign: 'center' }}
                            className="form-control"
                            autoComplete="off"
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <button
                            className="btn btn-link text-danger p-0 d-inline-flex align-items-center"
                            onClick={() => console.log('Edit domain')}
                          >
                            <svg
                              width="24"
                              height="24"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              className="mx-1"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 22L12.0005 19M15 16L12.0005 19M12.0005 19L9 16M12.0005 19L15 22"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {t('settings.offline')}
                          </button>
                        </div>
                      </div>

                      {/* Name Servers */}
                      <p className="mt-5 mb-3 font-weight-bold">{t('settings.serversName')}</p>
                      {nameServers.map((server, index) => (
                        <div key={index} className="row mb-3">
                          <p className="domain-name__server text-primary mb-0 col-sm-6 col-xl-4">
                            {server}
                          </p>
                        </div>
                      ))}

                      {/* Cloudflare Servers */}
                      <p className="mt-5 mb-3 font-weight-bold">
                      {t('settings.replaceServerDomain')}
                      </p>
                      {cloudflareServers.map((server, index) => (
                        <div key={index} className="row mb-3 align-items-center">
                          <p className="domain-name__server text-primary mb-0 col-12 col-md-6 col-xl-4 mb-2 mb-md-0">
                            {server}
                          </p>
                          <div className="copy-button col-12 col-md-6 col-xl-2 d-flex justify-content-center">
                            <div className="centralize">
                              <button
                                type="button"
                                onClick={() => handleCopy(server, index)}
                                className={`domain-copy-btn${copiedIndex === index ? ' active' : ''}`}
                              >
                                <span>
                                  <svg
                                    viewBox="0 0 467 512.22"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    width="14"
                                    height="14"
                                    aria-hidden
                                  >
                                    <path
                                      d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z"
                                      fillRule="nonzero"
                                    />
                                  </svg>
                                  {t('settings.clickToCopy')}
                                </span>
                                <span>{t('settings.copied')}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add DNS Record Button */}
              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="text-left mb-4">
                    <Link 
                      href="/acp/settings/domain/edit" 
                      className="btn btn-warning text-white"
                    >
                      <i className="fa fa-plus mr-2"></i>
                      {t('settings.addDnsRecord')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* DNS Records Table */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-5 text-start">
                        <h2 className="card-title m-0 p-0">{t('settings.dnsRecords')}</h2>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>{t('common.name')}</th>
                              <th>{t('common.type')}</th>
                              <th>{t('common.action')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dnsRecords.map((record) => (
                              <tr key={record.id}>
                                <td>{record.name}</td>
                                <td>{record.type}</td>
                                <td>
                                  {record.action === '-' ? (
                                    record.action
                                  ) : (
                                    <div className="btn-group" role="group">
                                      <Link
                                        href={`/acp/settings/domain/edit?id=${record.id}`}
                                        className="btn btn-sm btn-light border"
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Link>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-light border"
                                        onClick={() => console.log('Delete record:', record.id)}
                                      >
                                        <i className="fas fa-trash text-danger"></i>
                                      </button>
                                    </div>
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
      <Script src="/assets/js/settings.js" strategy="lazyOnload" />
    </>
  );
}
