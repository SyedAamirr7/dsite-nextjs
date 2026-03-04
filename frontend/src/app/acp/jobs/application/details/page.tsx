'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

const SAMPLE_APPLICANT = {
  name: 'Hazrat Bilal',
  email: 'bil_haz@yahoo.com',
  gender: 'male',
  phone: '34234234',
  nationality: 'Australia',
  orderNumber: '0',
  dateOfBirth: '2024-07-04',
  positionAppliedFor: 'Sales Manager',
  cityOfResidence: 'Ahad Rifaydah',
  applicationDate: '04-07-2024',
  cvUrl: '/assets/img/download.jpg',
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-bottom">
      <span className="applicant_title">{label}</span>
      <span className="applicant_info">{value}</span>
    </div>
  );
}

function ApplicantDetailContent() {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get('id');
  const jobId = searchParams.get('jobId');
  const applicant = SAMPLE_APPLICANT;
  const { t } = useTranslation();

  return (
    <>
      <AcpPage pageTitle={t('jobsApp.applicationDetails')} activeItem="jobs">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3">
                    <Link
                      href={jobId ? `/acp/jobs/application?id=${jobId}` : '/acp/jobs/application'}
                      className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('jobsApp.backToApplications')}
                    </Link>
                  </div>





                  <div className="card">
                    <div className="card-body">
                      <h3 className="text-blue mb-5">{t('jobsApp.applicationDetails')}</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <DetailRow label={t('common.name')} value={applicant.name} />
                          <DetailRow label={t('jobsApp.gender')} value={applicant.gender} />
                          <DetailRow label={t('jobsApp.phoneNumber')} value={applicant.phone} />
                          <DetailRow label={t('jobsApp.nationality')} value={applicant.nationality} />
                          <DetailRow label={t('jobsApp.orderNumber')} value={applicant.orderNumber} />
                        </div>
                        <div className="col-md-6">
                          <DetailRow label={t('common.email')} value={applicant.email} />
                          <DetailRow label={t('jobsApp.dateOfBirth')} value={applicant.dateOfBirth} />
                          <DetailRow label={t('jobsApp.positionAppliedFor')} value={applicant.positionAppliedFor} />
                          <DetailRow label={t('jobsApp.cityOfResidence')} value={applicant.cityOfResidence} />
                          <DetailRow label={t('jobsApp.applicationDate')} value={applicant.applicationDate} />
                        </div>
                        <div className="col-md-12">
                          <div className="py-3">
                            <span className="applicant_title">{t('jobsApp.cv')}</span>
                            <span className="applicant_info">
                              <a
                                className="btn btn-warning px-4"
                                href={applicant.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {t('jobsApp.viewCv')}
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>
      </AcpPage>
    </>
  );
}

export default function ApplicantDetailPage() {
  return (
    <Suspense fallback={null}>
      <ApplicantDetailContent />
    </Suspense>
  );
}
