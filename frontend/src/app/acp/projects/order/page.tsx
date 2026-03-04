'use client';

import { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

interface ApplicationItem {
  id: number;
  applicantName: string;
  email: string;
  submittedAt: string;
  phone?: string;
}

const PROJECT_NAMES: Record<string, string> = {
  '1': 'Residential complex project in Al Nada',
  '2': 'Restaurant complex project',
  '3': 'Marketplace',
  '4': 'Ajada Business Center',
};

const SAMPLE_APPLICATIONS: ApplicationItem[] = [
  { id: 1, applicantName: 'Ahmed Ali', email: 'ahmed.ali@example.com', submittedAt: '2025-01-15', phone: '+966 50 123 4567' },
  { id: 2, applicantName: 'Sara Mohammed', email: 'sara.m@example.com', submittedAt: '2025-01-14', phone: '+966 55 234 5678' },
  { id: 3, applicantName: 'Omar Hassan', email: 'omar.h@example.com', submittedAt: '2025-01-13', phone: '+966 54 345 6789' },
  { id: 4, applicantName: 'Fatima Khalid', email: 'fatima.k@example.com', submittedAt: '2025-01-12', phone: '+966 53 456 7890' },
  { id: 5, applicantName: 'Youssef Ibrahim', email: 'youssef.i@example.com', submittedAt: '2025-01-11', phone: '+966 56 567 8901' },
];

const PER_PAGE = 3;

function ProjectOrdersContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId') || '';
  const { t } = useTranslation();
  const projectTitle = useMemo(
    () =>
      (projectId && PROJECT_NAMES[projectId]) ||
      (projectId ? t('projects.projectIdFallback', { id: projectId }) : t('projects.allApplications')),
    [projectId, t]
  );

  const [applications, setApplications] = useState<ApplicationItem[]>(SAMPLE_APPLICATIONS);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(applications.length / PER_PAGE));
  const start = (currentPage - 1) * PER_PAGE;
  const paginatedApplications = applications.slice(start, start + PER_PAGE);

  const handleDelete = (id: number) => {
    if (typeof window !== 'undefined' && window.confirm(t('projects.removeApplication'))) {
      const next = applications.filter((a) => a.id !== id);
      setApplications(next);
      const maxPage = Math.max(1, Math.ceil(next.length / PER_PAGE));
      setCurrentPage((p) => (p > maxPage ? maxPage : p));
    }
  };

  return (
    <>
      <AcpPage pageTitle={t('projects.applicationsTitle')} activeItem="projects">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-3 flex-wrap">
                    <Link href="/acp/projects" className="btn btn-light border">
                      <i className="fas fa-arrow-left mr-2"></i>
                      {t('projects.backToProjects')}
                    </Link>
                    {projectId && (
                      <span className="text-muted align-self-center">
                        <strong>{projectTitle}</strong>
                      </span>
                    )}
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="mb-4">
                        <h2 className="card-title m-0 p-0">{t('projects.applications')}</h2>
                        {projectId && (
                          <p className="text-muted mb-0 mt-1 small">{t('projects.applicationsForProject')}</p>
                        )}
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover" id="table">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}>#</th>
                              <th scope="col">{t('projects.applicant')}</th>
                              <th scope="col">{t('common.email')}</th>
                              <th scope="col">{t('projects.phone')}</th>
                              <th scope="col">{t('projects.submitted')}</th>
                              <th scope="col">{t('common.action')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedApplications.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="text-center text-muted py-5">
                                  {t('projects.noApplications')}
                                </td>
                              </tr>
                            ) : (
                              paginatedApplications.map((app, index) => (
                                <tr key={app.id}>
                                  <td className="align-middle text-muted text-center" style={{ width: 48, minWidth: 48, maxWidth: 48 }}>{start + index + 1}</td>
                                  <td className="align-middle">{app.applicantName}</td>
                                  <td className="align-middle">{app.email}</td>
                                  <td className="align-middle">{app.phone || '—'}</td>
                                  <td className="align-middle">{app.submittedAt}</td>
                                  <td className="align-middle">
                                    <div className="d-flex align-items-center gap-2">
                                      <button
                                        type="button"
                                        className="btn btn-light border btn-sm px-3"
                                        style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}
                                        title={t('projects.viewDetails')}
                                      >
                                        {t('projects.view')}
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-light border btn-sm px-3 text-danger"
                                        style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}
                                        onClick={() => handleDelete(app.id)}
                                      >
                                        {t('common.delete')}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      {applications.length > 0 && (
                        <nav className="mt-4 d-flex justify-content-end" aria-label="Applications pagination">
                          <ul className="pagination mb-0 rounded overflow-hidden border">
                            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                              <button
                                type="button"
                                className="page-link border-0 rounded-0"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage <= 1}
                                aria-label={t('common.previous')}
                              >
                                {t('common.previous')}
                              </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button
                                  type="button"
                                  className="page-link border-0 rounded-0"
                                  onClick={() => setCurrentPage(page)}
                                  aria-current={currentPage === page ? 'page' : undefined}
                                >
                                  {page}
                                </button>
                              </li>
                            ))}
                            <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                              <button
                                type="button"
                                className="page-link border-0 rounded-0"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage >= totalPages}
                                aria-label={t('common.next')}
                              >
                                {t('common.next')}
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
      </AcpPage>
    </>
  );
}

export default function ProjectOrdersPage() {
  return (
    <Suspense fallback={null}>
      <ProjectOrdersContent />
    </Suspense>
  );
}
