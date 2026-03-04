'use client';

import { useState } from 'react';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

interface OrderItem {
  id: number;
  title: string;
  imageSrc: string;
  status: boolean;
}

const INITIAL_ORDERS: OrderItem[] = [
  { id: 1, title: 'Hot Chocolate', imageSrc: '/assets/img/Restaurant/cup-1.jpg', status: true },
  { id: 2, title: 'Cold Chocolate', imageSrc: '/assets/img/Restaurant/cup-2.jpg', status: true },
  { id: 3, title: 'Sandwich', imageSrc: '/assets/img/Restaurant/sandwich.jpg', status: true },
];

export default function RestaurantOrdersListPage() {
  const [items, setItems] = useState<OrderItem[]>(INITIAL_ORDERS);
  const { t } = useTranslation();

  const handleStatusToggle = (id: number) => {
    setItems(items.map((p) => (p.id === id ? { ...p, status: !p.status } : p)));
  };

  const handleDelete = (id: number) => {
    if (typeof window !== 'undefined' && window.confirm(t('restaurantOrdersApp.confirmDelete'))) {
      setItems(items.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <AcpPage pageTitle={t('restaurantOrdersApp.title')} activeItem="restaurantOrders">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4 d-flex align-items-center gap-2" dir="rtl">
                    <Link href="/acp/setting" className="btn btn-secondary" title={t('restaurantOrdersApp.pageSettingsTitle')}>
                      <i className="fas fa-cog"></i>
                    </Link>
                    <Link href="/acp/restaurantOrders/edit" className="btn btn-warning text-white" dir="ltr">
                      <i className="fa fa-plus ml-2"></i>
                      {t('restaurantOrdersApp.add')}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover" id="table">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                              <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                              <th scope="col">{t('restaurantOrdersApp.products')}</th>
                              <th scope="col">{t('common.status')}</th>
                              <th scope="col">{t('common.action')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, index) => (
                              <tr key={item.id} id={`order-${item.id}`}>
                                <td className="align-middle text-muted text-center" style={{ width: 48, minWidth: 48, maxWidth: 48 }}>
                                  {index + 1}
                                </td>
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
                                    <div className="product-pic ml-3">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={item.imageSrc} alt={t('restaurantOrdersApp.orderImgAlt')} />
                                    </div>
                                    <div className="product-content">
                                      <h2 className="title">{item.title}</h2>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <label className="label-switch switch-success mb-0">
                                    <input
                                      type="checkbox"
                                      className="switch switch-bootstrap status"
                                      name={`order-${item.id}`}
                                      checked={item.status}
                                      onChange={() => handleStatusToggle(item.id)}
                                    />
                                    <span className="lable"></span>
                                  </label>
                                </td>
                                <td className="align-middle">
                                  <div className="d-flex align-items-center gap-4 flex-wrap">
                                    <Link
                                      href={`/acp/restaurantOrders/edit?id=${item.id}`}
                                      className="btn btn-light px-4 border"
                                      style={{ minWidth: '110px' }}
                                    >
                                      {t('common.edit')}
                                    </Link>
                                    <button
                                      type="button"
                                      className="btn btn-light px-4 border"
                                      style={{ minWidth: '110px' }}
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
                    </div>
                  </div>
                </div>
              </div>
      </AcpPage>
    </>
  );
}
