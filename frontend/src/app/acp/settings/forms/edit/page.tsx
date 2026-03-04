'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LangTab = 'en' | 'ar';

type FieldType = 'text' | 'number' | 'email' | 'date' | 'time' | 'multiSelect' | 'oneSelect' | 'textarea';

type Localized<T> = { en: T; ar: T };

interface FormField {
  id: string;
  type: FieldType;
  required: boolean;
  label: Localized<string>;
  options?: Localized<string[]>;
}

function createId() {
  return `fld_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function isOptionField(type: FieldType) {
  return type === 'multiSelect' || type === 'oneSelect';
}

function GripDotsIcon() {
  // 3x3 “grip” dots like the screenshot
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <g fill="currentColor">
        {[
          [3, 3], [9, 3], [15, 3],
          [3, 9], [9, 9], [15, 9],
          [3, 15], [9, 15], [15, 15],
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx - 1.5} y={cy - 1.5} width={3} height={3} rx={0.8} />
        ))}
      </g>
    </svg>
  );
}

function FieldIcon({ type }: { type: FieldType }) {
  // Use the same icons seen in the legacy HTML for consistent look
  if (type === 'text') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479z" />
      </svg>
    );
  }

  if (type === 'number') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
        <path d="M13.2379 3.63416C13.312 3.22663 13.0417 2.83619 12.6342 2.7621C12.2266 2.688 11.8362 2.9583 11.7621 3.36584L13.2379 3.63416ZM9.7621 14.3658C9.688 14.7734 9.9583 15.1638 10.3658 15.2379C10.7734 15.312 11.1638 15.0417 11.2379 14.6342L9.7621 14.3658ZM8.2379 3.63416C8.312 3.22663 8.0417 2.83619 7.63416 2.7621C7.22663 2.688 6.83619 2.9583 6.7621 3.36584L8.2379 3.63416ZM4.7621 14.3658C4.688 14.7734 4.9583 15.1638 5.36584 15.2379C5.77337 15.312 6.16381 15.0417 6.2379 14.6342L4.7621 14.3658ZM4 5.75C3.58579 5.75 3.25 6.08579 3.25 6.5C3.25 6.91421 3.58579 7.25 4 7.25V5.75ZM15 7.25C15.4142 7.25 15.75 6.91421 15.75 6.5C15.75 6.08579 15.4142 5.75 15 5.75V7.25ZM3 10.75C2.58579 10.75 2.25 11.0858 2.25 11.5C2.25 11.9142 2.58579 12.25 3 12.25V10.75ZM14 12.25C14.4142 12.25 14.75 11.9142 14.75 11.5C14.75 11.0858 14.4142 10.75 14 10.75V12.25ZM11.7621 3.36584L9.7621 14.3658L11.2379 14.6342L13.2379 3.63416L11.7621 3.36584ZM6.7621 3.36584L4.7621 14.3658L6.2379 14.6342L8.2379 3.63416L6.7621 3.36584ZM4 7.25H15V5.75H4V7.25ZM3 12.25H14V10.75H3V12.25Z" />
      </svg>
    );
  }

  if (type === 'email') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
      </svg>
    );
  }

  if (type === 'date') {
    // Light calendar (close to screenshot)
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M6 2.5V4.5M12 2.5V4.5M3.75 6.5H14.25M4.5 4H13.5C14.3284 4 15 4.67157 15 5.5V13.5C15 14.3284 14.3284 15 13.5 15H4.5C3.67157 15 3 14.3284 3 13.5V5.5C3 4.67157 3.67157 4 4.5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'time') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
      </svg>
    );
  }

  if (type === 'textarea') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
      </svg>
    );
  }

  // multiSelect / oneSelect
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
    </svg>
  );
}

export default function FormEditPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>(language);
  const [activeConfigLang, setActiveConfigLang] = useState<LangTab>(language);

  useEffect(() => {
    setActiveLang(language);
    setActiveConfigLang(language);
  }, [language]);

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [formStatus, setFormStatus] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const initialFields = useMemo<FormField[]>(
    () => [
      { id: createId(), type: 'text', required: true, label: { en: 'Fullname', ar: 'الاسم الكامل' } },
      { id: createId(), type: 'text', required: true, label: { en: 'Contact', ar: 'الاتصال' } },
      { id: createId(), type: 'email', required: true, label: { en: 'Email', ar: 'البريد الإلكتروني' } },
      { id: createId(), type: 'date', required: true, label: { en: 'Date', ar: 'التاريخ' } },
      { id: createId(), type: 'time', required: true, label: { en: 'Time', ar: 'الوقت' } },
      { id: createId(), type: 'textarea', required: true, label: { en: 'Paragraph', ar: 'فقرة' } },
      {
        id: createId(),
        type: 'oneSelect',
        required: true,
        label: { en: 'Options', ar: 'خيارات' },
        options: { en: ['value1', 'value2'], ar: ['قيمة 1', 'قيمة 2'] },
      },
    ],
    []
  );

  const [fields, setFields] = useState<FormField[]>(initialFields);

  const moveField = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    setFields((prev) => {
      const fromIdx = prev.findIndex((f) => f.id === fromId);
      const toIdx = prev.findIndex((f) => f.id === toId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const next = [...prev];
      const [item] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, item);
      return next;
    });
  };

  const toggleRequired = (id: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f)));
  };

  const setFieldLabel = (id: string, lang: LangTab, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label: { ...f.label, [lang]: value } } : f))
    );
  };

  const addField = (type: FieldType) => {
    const defaultLabel: Localized<string> =
      type === 'text'
        ? { en: 'Text', ar: 'نص' }
        : type === 'number'
          ? { en: 'Number', ar: 'رقم' }
          : type === 'email'
            ? { en: 'Email', ar: 'بريد إلكتروني' }
            : type === 'date'
              ? { en: 'Date', ar: 'تاريخ' }
              : type === 'time'
                ? { en: 'Time', ar: 'وقت' }
                : type === 'multiSelect'
                  ? { en: 'Multi select', ar: 'اختيار متعدد' }
                  : type === 'oneSelect'
                    ? { en: 'Radio', ar: 'زر اختيار' }
                    : { en: 'Text area', ar: 'منطقة نص' };

    const base: FormField = {
      id: createId(),
      type,
      required: true,
      label: defaultLabel,
    };

    const withOptions: FormField = isOptionField(type)
      ? { ...base, options: { en: ['option'], ar: ['خيار'] } }
      : base;

    setFields((prev) => [...prev, withOptions]);
  };

  const setOption = (fieldId: string, lang: LangTab, index: number, value: string) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId || !f.options) return f;
        const nextArr = [...f.options[lang]];
        nextArr[index] = value;
        return { ...f, options: { ...f.options, [lang]: nextArr } };
      })
    );
  };

  const addOption = (fieldId: string) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId || !f.options) return f;
        return {
          ...f,
          options: {
            en: [...f.options.en, 'option'],
            ar: [...f.options.ar, 'خيار'],
          },
        };
      })
    );
  };

  const removeOption = (fieldId: string, index: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId || !f.options) return f;
        return {
          ...f,
          options: {
            en: f.options.en.filter((_, i) => i !== index),
            ar: f.options.ar.filter((_, i) => i !== index),
          },
        };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save form', { titleEn, titleAr, formStatus, fields });
    router.push('/acp/settings/forms');
  };

  return (
    <>
      <AcpPage pageTitle={t('settings.formTitle')} activeItem="forms">
        <SettingsConfigTabs activeTab="forms" />
        <div className="row">
          <div className="col-lg-12">
            <div className="text-left mb-4 d-flex align-items-center gap-3" dir="ltr">
              <Link href="/acp/settings/forms" className="btn btn-light border">
                <i className="fas fa-arrow-left mr-2"></i>
                {t('settings.backToForms')}
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              {/* Form title – language tabs */}
              <nav className="nav nav-tabs language-tab" role="tablist">
                <button
                  type="button"
                  role="tab"
                  id="tab-lang_en"
                  aria-selected={activeLang === 'en'}
                  aria-controls="lang_en"
                  className={`nav-link ${activeLang === 'en' ? 'active' : ''}`}
                  onClick={() => setActiveLang('en')}
                >
                  {t('common.english')}
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-lang_ar"
                  aria-selected={activeLang === 'ar'}
                  aria-controls="lang_ar"
                  className={`nav-link ${activeLang === 'ar' ? 'active' : ''}`}
                  onClick={() => setActiveLang('ar')}
                >
                  {t('common.arabic')}
                </button>
              </nav>

              <div className="tab-content">
                <div
                  className={`tab-pane fade ${activeLang === 'en' ? 'show active' : ''}`}
                  id="lang_en"
                  dir="ltr"
                  role="tabpanel"
                  aria-labelledby="tab-lang_en"
                  style={{ display: activeLang === 'en' ? 'block' : 'none' }}
                >
                  <div className="card page-content_lang">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-2 col-md-3 align-start">
                          <label className="form-label">{t('settings.formTitle')}</label>
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('settings.formTitle')}
                            value={titleEn}
                            onChange={(e) => setTitleEn(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${activeLang === 'ar' ? 'show active' : ''}`}
                  id="lang_ar"
                  dir="rtl"
                  role="tabpanel"
                  aria-labelledby="tab-lang_ar"
                  style={{ display: activeLang === 'ar' ? 'block' : 'none' }}
                >
                  <div className="card page-content_lang">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-2 col-md-3 align-start">
                          <label className="form-label">{t('settings.formTitle')}</label>
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            dir="rtl"
                            className="form-control"
                            placeholder={t('settings.formTitle')}
                            value={titleAr}
                            onChange={(e) => setTitleAr(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences – language tabs */}
              <nav className="nav nav-tabs language-tab mt-4" role="tablist">
                <button
                  type="button"
                  role="tab"
                  id="tab-pref_en"
                  aria-selected={activeConfigLang === 'en'}
                  aria-controls="pref_en"
                  className={`nav-link ${activeConfigLang === 'en' ? 'active' : ''}`}
                  onClick={() => setActiveConfigLang('en')}
                >
                  {t('common.english')}
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-pref_ar"
                  aria-selected={activeConfigLang === 'ar'}
                  aria-controls="pref_ar"
                  className={`nav-link ${activeConfigLang === 'ar' ? 'active' : ''}`}
                  onClick={() => setActiveConfigLang('ar')}
                >
                  {t('common.arabic')}
                </button>
              </nav>

              <div className="tab-content">
                <div
                  className={`tab-pane fade ${activeConfigLang === 'en' ? 'show active' : ''}`}
                  id="pref_en"
                  dir="ltr"
                  role="tabpanel"
                  aria-labelledby="tab-pref_en"
                  style={{ display: activeConfigLang === 'en' ? 'block' : 'none' }}
                >
                  <div className="card page-content_lang mt-0">
                    <div className="card-body">
                      <h3 className="card-body_title align-start font-weight-bold mb-4">
                        {t('settingPage.preferences', undefined, 'en')}
                      </h3>
                      <div className="row mb-2">
                        <div className="col-md-3 align-start">
                          <label className="form-label">{t('settings.formStatus', undefined, 'en')}</label>
                        </div>
                        <div className="col-md-2">
                          <label className="label-switch switch-success mb-0">
                            <input
                              type="checkbox"
                              className="switch switch-bootstrap status"
                              checked={formStatus}
                              onChange={(e) => setFormStatus(e.target.checked)}
                            />
                            <span className="lable"></span>
                          </label>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-8">
                          <div id="BuildForm" className="mt-5">
                            {fields.map((field, idx) => {
                              const containerClass = isOptionField(field.type)
                                ? 'build-menu border rounded d-flex flex-column align-items-center w-100'
                                : `build-input_${idx + 1} border rounded d-flex align-items-center w-100`;

                              const header = (
                                <div className="d-flex align-items-center w-100 border-bottom">
                                  <span className="sort-btn">
                                    <a href="#!" className="drag-handle" onClick={(e) => e.preventDefault()} aria-label="Drag to reorder">
                                      <GripDotsIcon />
                                    </a>
                                  </span>
                                  <div className="flex-grow-1 px-2">
                                    <FieldIcon type={field.type} />
                                    <input
                                      type="text"
                                      className="border-0"
                                      value={field.label.en}
                                      onChange={(e) => setFieldLabel(field.id, 'en', e.target.value)}
                                      placeholder={field.type}
                                      aria-label="Field label"
                                    />
                                  </div>
                                  <div className="buttons px-2">
                                    <button
                                      type="button"
                                      title="Make this field required"
                                      className={`required_btn ${field.required ? 'active' : ''}`}
                                      onClick={() => toggleRequired(field.id)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-asterisk required_icon" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              );

                              const optionsBody =
                                isOptionField(field.type) && field.options ? (
                                  <div className="p-3 w-100 d-flex flex-column align-items-center justify-content-center text-end">
                                    <div className="w-75 js-form-options">
                                      {field.options.en.map((opt, optIdx) => (
                                        <div key={`${field.id}_en_opt_${optIdx}`} className="input-group mt-2">
                                          <input
                                            type="text"
                                            placeholder="option"
                                            className="form-control border rounded"
                                            value={opt}
                                            onChange={(e) => setOption(field.id, 'en', optIdx, e.target.value)}
                                          />
                                          <div className="input-group-append">
                                            <button
                                              type="button"
                                              className="btn btn-link text-danger px-2 js-remove-option"
                                              aria-label="Remove option"
                                              onClick={() => removeOption(field.id, optIdx)}
                                            >
                                              <i className="fas fa-trash-alt"></i>
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="w-75">
                                      <button type="button" className="mt-2 p-0 btn btn-link js-add-option" style={{ color: '#2a4480' }} onClick={() => addOption(field.id)}>
                                        add option
                                      </button>
                                    </div>
                                  </div>
                                ) : null;

                              return (
                                <div
                                  key={field.id}
                                  id="BuildFormInput"
                                  className={containerClass}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.effectAllowed = 'move';
                                    setDraggingId(field.id);
                                  }}
                                  onDragEnd={() => setDraggingId(null)}
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'move';
                                  }}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    if (draggingId) moveField(draggingId, field.id);
                                  }}
                                  style={draggingId === field.id ? { opacity: 0.6 } : undefined}
                                >
                                  {isOptionField(field.type) ? (
                                    <>
                                      {header}
                                      {optionsBody}
                                    </>
                                  ) : (
                                    <div className="d-flex align-items-center w-100">
                                      <span className="sort-btn">
                                        <a href="#!" className="drag-handle" onClick={(e) => e.preventDefault()} aria-label="Drag to reorder">
                                          <GripDotsIcon />
                                        </a>
                                      </span>
                                      <div className="flex-grow-1 px-2">
                                        <FieldIcon type={field.type} />
                                        <input
                                          type="text"
                                          className="border-0"
                                          value={field.label.en}
                                          onChange={(e) => setFieldLabel(field.id, 'en', e.target.value)}
                                          placeholder={field.type}
                                          aria-label="Field label"
                                        />
                                      </div>
                                      <div className="buttons px-2">
                                        <button
                                          type="button"
                                          title="Make this field required"
                                          className={`required_btn ${field.required ? 'active' : ''}`}
                                          onClick={() => toggleRequired(field.id)}
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-asterisk required_icon" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="col-lg-4 mt-4 mt-lg-0" dir="ltr">
                          <select
                            id="selectFormType"
                            className="custom-select"
                            defaultValue="None"
                            onChange={(e) => {
                              const val = e.target.value as FieldType | 'None';
                              if (val !== 'None') addField(val);
                              e.currentTarget.value = 'None';
                            }}
                          >
                            <option disabled value="None">
                              CHOOSE INPUT TYPE
                            </option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="time">Time</option>
                            <option value="multiSelect">Multi select</option>
                            <option value="oneSelect">Radio</option>
                            <option value="textarea">Text area</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${activeConfigLang === 'ar' ? 'show active' : ''}`}
                  id="pref_ar"
                  dir="rtl"
                  role="tabpanel"
                  aria-labelledby="tab-pref_ar"
                  style={{ display: activeConfigLang === 'ar' ? 'block' : 'none' }}
                >
                  <div className="card page-content_lang mt-0">
                    <div className="card-body">
                      <h3 className="card-body_title align-start font-weight-bold mb-4">
                        {t('settingPage.preferences', undefined, 'ar')}
                      </h3>
                      <div className="row mb-2">
                        <div className="col-md-3 align-start">
                          <label className="form-label">{t('settings.formStatus', undefined, 'ar')}</label>
                        </div>
                        <div className="col-md-2">
                          <label className="label-switch switch-success mb-0" dir="ltr">
                            <input
                              type="checkbox"
                              className="switch switch-bootstrap status"
                              checked={formStatus}
                              onChange={(e) => setFormStatus(e.target.checked)}
                            />
                            <span className="lable"></span>
                          </label>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-8">
                          <div id="BuildForm_ar" className="mt-5">
                            {fields.map((field, idx) => {
                              const containerClass = isOptionField(field.type)
                                ? 'build-menu border rounded d-flex flex-column align-items-center w-100'
                                : `build-input_${idx + 1} border rounded d-flex align-items-center w-100`;

                              const header = (
                                <div className="d-flex align-items-center w-100 border-bottom">
                                  <span className="sort-btn">
                                    <a href="#!" className="drag-handle" onClick={(e) => e.preventDefault()} aria-label="اسحب لإعادة الترتيب">
                                      <GripDotsIcon />
                                    </a>
                                  </span>
                                  <div className="flex-grow-1 px-2">
                                    <FieldIcon type={field.type} />
                                    <input
                                      type="text"
                                      className="border-0"
                                      dir="rtl"
                                      value={field.label.ar}
                                      onChange={(e) => setFieldLabel(field.id, 'ar', e.target.value)}
                                      placeholder={field.type}
                                      aria-label="Field label"
                                    />
                                  </div>
                                  <div className="buttons px-2">
                                    <button
                                      type="button"
                                      title="جعل هذا الحقل مطلوباً"
                                      className={`required_btn ${field.required ? 'active' : ''}`}
                                      onClick={() => toggleRequired(field.id)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-asterisk required_icon" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              );

                              const optionsBody =
                                isOptionField(field.type) && field.options ? (
                                  <div className="p-3 w-100 d-flex flex-column align-items-center justify-content-center text-end">
                                    <div className="w-75 js-form-options">
                                      {field.options.ar.map((opt, optIdx) => (
                                        <div key={`${field.id}_ar_opt_${optIdx}`} className="input-group mt-2">
                                          <input
                                            type="text"
                                            dir="rtl"
                                            placeholder="خيار"
                                            className="form-control border rounded"
                                            value={opt}
                                            onChange={(e) => setOption(field.id, 'ar', optIdx, e.target.value)}
                                          />
                                          <div className="input-group-append">
                                            <button
                                              type="button"
                                              className="btn btn-link text-danger px-2 js-remove-option"
                                              aria-label="إزالة الخيار"
                                              onClick={() => removeOption(field.id, optIdx)}
                                            >
                                              <i className="fas fa-trash-alt"></i>
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="w-75">
                                      <button type="button" className="mt-2 p-0 btn btn-link js-add-option" style={{ color: '#2a4480' }} onClick={() => addOption(field.id)}>
                                        إضافة خيار
                                      </button>
                                    </div>
                                  </div>
                                ) : null;

                              return (
                                <div
                                  key={field.id}
                                  id="BuildFormInput"
                                  className={containerClass}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.effectAllowed = 'move';
                                    setDraggingId(field.id);
                                  }}
                                  onDragEnd={() => setDraggingId(null)}
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'move';
                                  }}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    if (draggingId) moveField(draggingId, field.id);
                                  }}
                                  style={draggingId === field.id ? { opacity: 0.6 } : undefined}
                                >
                                  {isOptionField(field.type) ? (
                                    <>
                                      {header}
                                      {optionsBody}
                                    </>
                                  ) : (
                                    <div className="d-flex align-items-center w-100">
                                      <span className="sort-btn">
                                        <a href="#!" className="drag-handle" onClick={(e) => e.preventDefault()} aria-label="اسحب لإعادة الترتيب">
                                          <GripDotsIcon />
                                        </a>
                                      </span>
                                      <div className="flex-grow-1 px-2">
                                        <FieldIcon type={field.type} />
                                        <input
                                          type="text"
                                          dir="rtl"
                                          className="border-0"
                                          value={field.label.ar}
                                          onChange={(e) => setFieldLabel(field.id, 'ar', e.target.value)}
                                          placeholder={field.type}
                                          aria-label="Field label"
                                        />
                                      </div>
                                      <div className="buttons px-2">
                                        <button
                                          type="button"
                                          title="جعل هذا الحقل مطلوباً"
                                          className={`required_btn ${field.required ? 'active' : ''}`}
                                          onClick={() => toggleRequired(field.id)}
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-asterisk required_icon" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="col-lg-4 mt-4 mt-lg-0" dir="rtl">
                          <select
                            id="selectFormType_ar"
                            className="custom-select"
                            defaultValue="None"
                            onChange={(e) => {
                              const val = e.target.value as FieldType | 'None';
                              if (val !== 'None') addField(val);
                              e.currentTarget.value = 'None';
                            }}
                          >
                            <option disabled value="None">
                              اختر نوع الحقل
                            </option>
                            <option value="text">نص</option>
                            <option value="number">رقم</option>
                            <option value="email">بريد إلكتروني</option>
                            <option value="date">تاريخ</option>
                            <option value="time">وقت</option>
                            <option value="multiSelect">اختيار متعدد</option>
                            <option value="oneSelect">زر اختيار</option>
                            <option value="textarea">منطقة نص</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12 text-left" dir="rtl">
                  <button type="submit" className="btn btn-primary px-5 text-uppercase" style={{ letterSpacing: '0.05em' }}>
                    {t('common.save')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AcpPage>
    </>
  );
}
