'use client';

import { useState } from 'react';
import Link from 'next/link';
import AcpPage from '@/components/AcpPage';
import { useTranslation } from '@/hooks/useTranslation';

interface Slide {
  id: number;
  title: string;
  imageSrc: string;
  status: boolean;
}

const SLIDER_IMAGES = [
  '/assets/img/slider/Rectangle 5002.png',
  '/assets/img/slider/Rectangle 5002-1.png',
  '/assets/img/slider/Rectangle 5002-2.png',
  '/assets/img/slider/Rectangle 5002-3.png',
];

export default function PresentationSlidesPage() {
  const { t } = useTranslation();
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: 'Welcome', imageSrc: SLIDER_IMAGES[0], status: true },
    { id: 2, title: 'Welcome', imageSrc: SLIDER_IMAGES[1], status: true },
    { id: 3, title: 'Welcome', imageSrc: SLIDER_IMAGES[2], status: true },
    { id: 4, title: 'Welcome', imageSrc: SLIDER_IMAGES[3], status: true },
  ]);

  const handleStatusToggle = (id: number) => {
    setSlides(slides.map((slide) =>
      slide.id === id ? { ...slide, status: !slide.status } : slide
    ));
  };

  const handleDelete = (id: number) => {
    if (typeof window !== 'undefined' && window.confirm(t('presentationSlides.confirmDelete'))) {
      setSlides(slides.filter((s) => s.id !== id));
    }
  };

  return (
    <AcpPage pageTitle={t('sidebar.presentationSlides')} activeItem="presentation-slides">
        <div className="row">
                <div className="col-lg-12">
                  <div className="text-left mb-4">
                    <Link href="/acp/presentation-slides/edit" className="btn btn-warning text-white">
                      <i className="fa fa-plus ml-2"></i>
                      {t('common.addPage')}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table" id="table">
                          <thead>
                            <tr>
                              <th></th>
                              <th></th>
                              <th>{t('presentationSlides.slides')}</th>
                              <th>{t('common.status')}</th>
                              <th>{t('common.action')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {slides.map((slide, index) => (
                              <tr key={slide.id} id={`slider_${slide.id}`}>
                                <td>{index + 1}</td>
                                <td>
                                  <span className="sort-btn ml-3">
                                    <span role="button" tabIndex={0} className="drag-handle ui-sortable-handle" onClick={(e) => e.preventDefault()} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                                      <img src="/assets/img/sort.svg" alt="sort" />
                                    </span>
                                  </span>
                                </td>
                                <td className="d-flex align-items-center">
                                  <div className="slider-box">
                                    <div className="slider-pic ml-3">
                                      <img
                                        src={slide.imageSrc}
                                        alt=""
                                      />
                                    </div>
                                    <div className="slider-content">
                                      <h2 className="title">{slide.title}</h2>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <label className="label-switch switch-success">
                                    <input
                                      type="checkbox"
                                      className="switch switch-bootstrap status"
                                      name={`slider-${slide.id}`}
                                      checked={slide.status}
                                      onChange={() => handleStatusToggle(slide.id)}
                                    />
                                    <span className="lable"></span>
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center gap-2 flex-wrap">
                                    {slide.id === 1 ? (
                                      <div className="dropdown">
                                        <button
                                          type="button"
                                          className="btn btn-light px-4 border rounded dropdown-toggle"
                                          id={`dropdownAction-${slide.id}`}
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          {t('common.action')}
                                        </button>
                                        <div
                                          className="dropdown-menu"
                                          aria-labelledby={`dropdownAction-${slide.id}`}
                                        >
                                          <Link
                                            href="/acp/presentation-slides/edit"
                                            className="dropdown-item"
                                          >
                                            {t('common.edit')}
                                          </Link>
                                          <button
                                            type="button"
                                            className="dropdown-item border-0 bg-transparent w-100 text-left"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleDelete(slide.id)}
                                          >
                                            {t('common.delete')}
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <Link
                                          href={`/acp/presentation-slides/edit?id=${slide.id}`}
                                          className="btn btn-light px-4 border rounded text-dark"
                                          style={{ minWidth: '90px' }}
                                        >
                                          {t('common.edit')}
                                        </Link>
                                        <button
                                          type="button"
                                          className="btn btn-light px-4 border rounded text-dark"
                                          style={{ minWidth: '90px' }}
                                          onClick={() => handleDelete(slide.id)}
                                        >
                                          {t('common.delete')}
                                        </button>
                                      </>
                                    )}
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
  );
}
