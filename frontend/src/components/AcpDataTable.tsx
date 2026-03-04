'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardScripts from '@/components/DashboardScripts';
import { useTranslation } from '@/hooks/useTranslation';
import { useAcpLayout } from '@/context/AcpLayoutContext';
import type { AcpListItem } from '@/hooks/useAcpList';

export interface AcpDataTableConfig {
  /** Sidebar active item key */
  activeItem: string;
  /** Page title translation key */
  pageTitleKey: string;
  /** Base path for this section (e.g. /acp/projects) */
  basePath: string;
  /** Edit page path (e.g. /acp/projects/edit) */
  editPath: string;
  /** Row id prefix for table rows (e.g. project_) */
  rowIdPrefix: string;
  /** Confirm delete translation key */
  confirmDeleteKey: string;
  /** Title column header translation key */
  titleColumnKey: string;
  /** Settings button tooltip translation key (optional) */
  settingsTitleKey?: string;
  /** Show settings (cog) button */
  showSettingsButton?: boolean;
  /** Show add button */
  showAddButton?: boolean;
  /** Show image column */
  showImage?: boolean;
  /** Optional: link for "total applications" column (e.g. /acp/projects/order) */
  orderPath?: string;
  /** Optional: show total applications column without link (e.g. products) */
  showTotalCount?: boolean;
  /** Optional: extra action button label key and path (e.g. jobs: View Application, /acp/jobs/application) */
  extraActionLabelKey?: string;
  extraActionPath?: (id: number) => string;
  /** Add button label key (default: common.addPage) */
  addButtonKey?: string;
}

export interface AcpDataTableProps {
  config: AcpDataTableConfig;
  items: AcpListItem[];
  loading: boolean;
  error: string | null;
  onStatusToggle: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
}

export default function AcpDataTable({
  config,
  items,
  loading,
  error,
  onStatusToggle,
  onDelete,
}: AcpDataTableProps) {
  const { t } = useTranslation();
  const { layoutProvided } = useAcpLayout();
  const {
    activeItem,
    pageTitleKey,
    basePath,
    editPath,
    rowIdPrefix,
    confirmDeleteKey,
    titleColumnKey,
    settingsTitleKey,
    showSettingsButton = true,
    showAddButton = true,
    showImage = true,
    orderPath,
    showTotalCount,
    extraActionLabelKey,
    extraActionPath,
    addButtonKey = 'common.addPage',
  } = config;

  const handleDelete = (id: number) => {
    if (typeof window !== 'undefined' && window.confirm(t(confirmDeleteKey))) {
      onDelete(id);
    }
  };

  return (
    <>
      {layoutProvided ? (
        <>
          <div className="row">
            <div className="col-lg-12">
            <div className="text-right mb-4 d-flex align-items-center gap-2" dir="rtl">
              {showSettingsButton && (
                <Link
                  href="/acp/setting"
                  className="btn btn-secondary"
                  title={settingsTitleKey ? t(settingsTitleKey) : undefined}
                >
                  <i className="fas fa-cog"></i>
                </Link>
              )}
              {showAddButton && (
                <Link href={`${basePath}/edit`} className="btn btn-warning text-white" dir="ltr">
                  <i className="fa fa-plus ml-2"></i>
                  {t(addButtonKey)}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {loading ? null : (
                  <div className="table-responsive">
                    <table className="table table-hover" id="table">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                          <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                          <th scope="col">{t(titleColumnKey)}</th>
                          {(orderPath || showTotalCount) && (
                            <th scope="col" className="px-2">
                              {t('projects.totalApplications')}
                            </th>
                          )}
                          <th scope="col">{t('common.status')}</th>
                          <th scope="col">{t('common.action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={item.id} id={`${rowIdPrefix}${item.id}`}>
                            <td
                              className="align-middle text-muted text-center"
                              style={{ width: 48, minWidth: 48, maxWidth: 48 }}
                            >
                              {index + 1}
                            </td>
                            <td
                              className="align-middle text-center"
                              style={{ width: 48, minWidth: 48, maxWidth: 48 }}
                            >
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
                              {showImage && (item.imageSrc || item.title) ? (
                                <div className={orderPath ? 'projects-box' : 'product-box d-flex align-items-center'}>
                                  {showImage && item.imageSrc && (
                                    <div className={orderPath ? 'projects-pic ml-3' : 'product-pic ml-3'}>
                                      <img src={item.imageSrc.startsWith('/') ? item.imageSrc : `/${item.imageSrc}`} alt="" />
                                    </div>
                                  )}
                                  <div className={orderPath ? 'projects-content' : 'product-content'}>
                                    <h2 className="title">{item.title}</h2>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  {item.title}
                                </div>
                              )}
                            </td>
                            {orderPath && (
                              <td className="align-middle px-2">
                                <Link
                                  href={`${orderPath}?projectId=${item.id}`}
                                  className="text-primary"
                                >
                                  {item.totalApplications ?? 0}
                                </Link>
                              </td>
                            )}
                            {showTotalCount && !orderPath && (
                              <td className="align-middle px-2">
                                <span className="text-muted">{item.totalApplications ?? 0}</span>
                              </td>
                            )}
                            <td className="align-middle">
                              <label className="label-switch switch-success mb-0">
                                <input
                                  type="checkbox"
                                  className="switch switch-bootstrap status"
                                  name={`${rowIdPrefix.replace('_', '-')}-${item.id}`}
                                  checked={item.status}
                                  onChange={() => onStatusToggle(item.id, !item.status)}
                                />
                                <span className="lable"></span>
                              </label>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center gap-2 flex-wrap">
                                <Link
                                  href={`${editPath}?id=${item.id}`}
                                  className="btn btn-light border text-dark px-3"
                                  style={{
                                    minWidth: '90px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  {t('common.edit')}
                                </Link>
                                {extraActionLabelKey && extraActionPath && (
                                  <Link
                                    href={extraActionPath(item.id)}
                                    className="btn btn-light border text-dark px-3"
                                    style={{ minWidth: '110px' }}
                                  >
                                    {t(extraActionLabelKey)}
                                  </Link>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-light border text-dark px-3"
                                  style={{
                                    minWidth: '90px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.02em',
                                  }}
                                  onClick={() => handleDelete(item.id)}
                                >
                                  {t('common.delete')}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        <>
      <DashboardLayout pageTitle={t(pageTitleKey)} activeItem={activeItem}>
        <div className="row">
          <div className="col-lg-12">
            <div className="text-right mb-4 d-flex align-items-center gap-2" dir="rtl">
              {showSettingsButton && (
                <Link
                  href="/acp/setting"
                  className="btn btn-secondary"
                  title={settingsTitleKey ? t(settingsTitleKey) : undefined}
                >
                  <i className="fas fa-cog"></i>
                </Link>
              )}
              {showAddButton && (
                <Link href={`${basePath}/edit`} className="btn btn-warning text-white" dir="ltr">
                  <i className="fa fa-plus ml-2"></i>
                  {t(addButtonKey)}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {loading ? null : (
                  <div className="table-responsive">
                    <table className="table table-hover" id="table">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                          <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                          <th scope="col">{t(titleColumnKey)}</th>
                          {(orderPath || showTotalCount) && (
                            <th scope="col" className="px-2">
                              {t('projects.totalApplications')}
                            </th>
                          )}
                          <th scope="col">{t('common.status')}</th>
                          <th scope="col">{t('common.action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={item.id} id={`${rowIdPrefix}${item.id}`}>
                            <td
                              className="align-middle text-muted text-center"
                              style={{ width: 48, minWidth: 48, maxWidth: 48 }}
                            >
                              {index + 1}
                            </td>
                            <td
                              className="align-middle text-center"
                              style={{ width: 48, minWidth: 48, maxWidth: 48 }}
                            >
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
                              {showImage && (item.imageSrc || item.title) ? (
                                <div className={orderPath ? 'projects-box' : 'product-box d-flex align-items-center'}>
                                  {showImage && item.imageSrc && (
                                    <div className={orderPath ? 'projects-pic ml-3' : 'product-pic ml-3'}>
                                      <img src={item.imageSrc.startsWith('/') ? item.imageSrc : `/${item.imageSrc}`} alt="" />
                                    </div>
                                  )}
                                  <div className={orderPath ? 'projects-content' : 'product-content'}>
                                    <h2 className="title">{item.title}</h2>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  {item.title}
                                </div>
                              )}
                            </td>
                            {orderPath && (
                              <td className="align-middle px-2">
                                <Link
                                  href={`${orderPath}?projectId=${item.id}`}
                                  className="text-primary"
                                >
                                  {item.totalApplications ?? 0}
                                </Link>
                              </td>
                            )}
                            {showTotalCount && !orderPath && (
                              <td className="align-middle px-2">
                                <span className="text-muted">{item.totalApplications ?? 0}</span>
                              </td>
                            )}
                            <td className="align-middle">
                              <label className="label-switch switch-success mb-0">
                                <input
                                  type="checkbox"
                                  className="switch switch-bootstrap status"
                                  name={`${rowIdPrefix.replace('_', '-')}-${item.id}`}
                                  checked={item.status}
                                  onChange={() => onStatusToggle(item.id, !item.status)}
                                />
                                <span className="lable"></span>
                              </label>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center gap-2 flex-wrap">
                                <Link
                                  href={`${editPath}?id=${item.id}`}
                                  className="btn btn-light border text-dark px-3"
                                  style={{
                                    minWidth: '90px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  {t('common.edit')}
                                </Link>
                                {extraActionLabelKey && extraActionPath && (
                                  <Link
                                    href={extraActionPath(item.id)}
                                    className="btn btn-light border text-dark px-3"
                                    style={{ minWidth: '110px' }}
                                  >
                                    {t(extraActionLabelKey)}
                                  </Link>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-light border text-dark px-3"
                                  style={{
                                    minWidth: '90px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.02em',
                                  }}
                                  onClick={() => handleDelete(item.id)}
                                >
                                  {t('common.delete')}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <DashboardScripts />
        </>
      )}
    </>
  );
}
