'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

interface ApplicantItem {
  id: number;
  name: string;
  email: string;
}

const INITIAL_APPLICANTS: ApplicantItem[] = [
  { id: 1, name: 'Osama Gad Bilal', email: 'osama_gad@yahoo.com' },
  { id: 2, name: 'Osama Gad Bilal', email: 'osama_gad@yahoo.com' },
  { id: 3, name: 'Osama Gad Bilal', email: 'osama_gad@yahoo.com' },
  { id: 4, name: 'Osama Gad Bilal', email: 'osama_gad@yahoo.com' },
  { id: 5, name: 'Osama Gad Bilal', email: 'osama_gad@yahoo.com' },
  { id: 6, name: 'Osama Gad Bilal', email: 'osama_gad@yahoo.com' },
];

function JobApplicantsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const [items] = useState<ApplicantItem[]>(INITIAL_APPLICANTS);
  const { t } = useTranslation();

  return (
    <>
      <AcpPage pageTitle={t('jobsApp.viewApplication')} activeItem="jobs">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3" dir="ltr">
                    <Link href="/acp/jobs" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('jobsApp.backToJobs')}
                    </Link>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-5">
                        <h3 className="text-blue">{t('jobsApp.viewApplication')}</h3>
                        <div className="d-flex align-items-center gap-2">
                          <a href="/assets/img/download.jpg" className="btn btn-primary px-md-4 px-2" download>
                            {t('jobsApp.export')}
                          </a>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover" id="table">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                              <th scope="col">{t('common.name')}</th>
                              <th scope="col">{t('common.action')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => (
                              <tr key={item.id}>
                                <td className="align-middle text-center" style={{ width: 48, minWidth: 48, maxWidth: 48 }}>
                                  <span
                                    role="button"
                                    tabIndex={0}
                                    className="drag-handle ui-sortable-handle d-inline-flex"
                                    onClick={(e) => e.preventDefault()}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    aria-label={t('common.dragToReorder')}
                                  >
                                    <img src="/assets/img/sort.svg" alt="" />
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <div className="product-box d-flex align-items-center">
                                    <div className="product-content">
                                      <h2 className="title">{item.name}</h2>
                                      <p className="info">{item.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <Link
                                    href={`/acp/jobs/application/details?id=${item.id}${jobId ? `&jobId=${jobId}` : ''}`}
                                    className="btn btn-light px-4 border"
                                    style={{ minWidth: '110px' }}
                                  >
                                    {t('jobsApp.details')}
                                  </Link>
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

export default function JobApplicantsPage() {
  return (
    <Suspense fallback={null}>
      <JobApplicantsContent />
    </Suspense>
  );
}
