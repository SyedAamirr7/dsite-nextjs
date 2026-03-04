'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import Script from 'next/script';
import AcpPage from '@/components/AcpPage';
import { pluginsConfig } from '@/config/plugins';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { saveAbout, getAbout, type AboutData } from '@/services/aboutService';
import { useWebsiteId } from '@/context/WebsiteContext';

type LangTab = 'lang_en' | 'lang_ar';

type CKEditorInstance = { getData: () => string; setData: (data: string) => void; destroy: () => Promise<void> };

const CK_EDITOR_CONFIG = {
  toolbar: {
    items: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', '|', 'link', 'blockQuote', 'insertTable', 'mediaEmbed'],
    shouldNotGroupWhenFull: true,
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
      { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
    ],
  },
  link: { addTargetToExternalLinks: true, defaultProtocol: 'https://' },
  language: { ui: 'en', content: 'en' as string },
  placeholder: '',
};

export default function AboutPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<LangTab>(language === 'ar' ? 'lang_ar' : 'lang_en');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [ckEditorReady, setCkEditorReady] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const editorEnRef = useRef<CKEditorInstance | null>(null);
  const editorArRef = useRef<CKEditorInstance | null>(null);
  const websiteId = useWebsiteId();

  useEffect(() => {
    setActiveTab(language === 'ar' ? 'lang_ar' : 'lang_en');
  }, [language]);

  // Load about data for current website; refetch when selected website changes. Skip if no valid websiteId.
  useEffect(() => {
    setAboutData(undefined);
    setLoadError(null);
    if (!Number.isInteger(websiteId) || websiteId < 1) {
      setAboutData(null);
      return;
    }
    getAbout(websiteId)
      .then((data) => {
        setAboutData(data ?? null);
        setLoadError(null);
      })
      .catch((err) => {
        setAboutData(null);
        setLoadError(err instanceof Error ? err.message : 'Failed to load');
      });
  }, [websiteId]);

  // Initialize CKEditor only on the client, inside useEffect (no window/document during SSR)
  useEffect(() => {
    if (!ckEditorReady || typeof window === 'undefined') return;
    const ClassicEditor = (window as unknown as { ClassicEditor: { create: (el: HTMLElement, config: object) => Promise<CKEditorInstance> } }).ClassicEditor;
    if (!ClassicEditor) return;

    const elEn = document.querySelector('#editor-en') as HTMLElement | null;
    const elAr = document.querySelector('#editor-ar') as HTMLElement | null;
    if (!elEn || !elAr) return;

    let cancelled = false;
    const configEn = { ...CK_EDITOR_CONFIG, language: { ui: 'en', content: 'en' } };
    const configAr = { ...CK_EDITOR_CONFIG, language: { ui: 'en', content: 'ar' } };

    Promise.all([
      ClassicEditor.create(elEn, configEn),
      ClassicEditor.create(elAr, configAr),
    ])
      .then(([editorEn, editorAr]) => {
        if (cancelled) {
          editorEn.destroy();
          editorAr.destroy();
          return;
        }
        editorEnRef.current = editorEn;
        editorArRef.current = editorAr;
        const data = aboutData;
        if (data) {
          editorEn.setData(data.About_Detail_en ?? '');
          editorAr.setData(data.About_Detail_ar ?? '');
        }
      })
      .catch((err) => console.error('CKEditor init error:', err));

    return () => {
      cancelled = true;
      editorEnRef.current?.destroy();
      editorArRef.current?.destroy();
      editorEnRef.current = null;
      editorArRef.current = null;
    };
  }, [ckEditorReady, aboutData]);

  // When aboutData loads after editors are already created, set CKEditor content
  useEffect(() => {
    if (aboutData == null) return;
    if (editorEnRef.current) editorEnRef.current.setData(aboutData.About_Detail_en ?? '');
    if (editorArRef.current) editorArRef.current.setData(aboutData.About_Detail_ar ?? '');
  }, [aboutData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form) return;

      setSaveMessage(null);
      setSaving(true);

      const formData = new FormData(form);
      const payload: Record<string, string> = {};
      formData.forEach((value, key) => {
        if (typeof value === 'string') payload[key] = value;
      });

      payload.About_Content_en = editorEnRef.current?.getData() ?? '';
      payload.About_Content_ar = editorArRef.current?.getData() ?? '';

      try {
        await saveAbout(payload, websiteId);
        setSaveMessage({ type: 'success', text: String(t('common.saved') ?? 'Saved successfully.') });
      } catch (err) {
        setSaveMessage({ type: 'error', text: err instanceof Error ? err.message : String(t('common.error') ?? 'Something went wrong.') });
      } finally {
        setSaving(false);
      }
    },
    [t, websiteId]
  );

  return (
    <>
      <AcpPage pageTitle={t('about.aboutUs')} activeItem="about">
        <div className="row">
          <div className="col-lg-12">
            {loadError && (
              <div className="alert alert-danger" role="alert">{loadError}</div>
            )}
            {aboutData === undefined ? null : (
            <>
            {aboutData === null && !loadError && (
              <p className="text-info mb-3">{t('about.noContentYet') ?? 'No about content saved yet. Fill the form and click Save.'}</p>
            )}
            <form ref={formRef} onSubmit={handleSubmit} action="#!" method="post" className="needs-validation" noValidate key={`about-${websiteId}`}>
                    <nav className="nav nav-tabs language-tab" role="tablist">
                      <a
                        className={`nav-link ${activeTab === 'lang_en' ? 'active' : ''}`}
                        href="#lang_en"
                        role="tab"
                        aria-selected={activeTab === 'lang_en'}
                        aria-controls="lang_en"
                        id="tab-lang_en"
                        onClick={(e) => { e.preventDefault(); setActiveTab('lang_en'); }}
                      >
                        {t('common.english')}
                      </a>
                      <a
                        className={`nav-link ${activeTab === 'lang_ar' ? 'active' : ''}`}
                        href="#lang_ar"
                        role="tab"
                        aria-selected={activeTab === 'lang_ar'}
                        aria-controls="lang_ar"
                        id="tab-lang_ar"
                        onClick={(e) => { e.preventDefault(); setActiveTab('lang_ar'); }}
                      >
                        {t('common.arabic')}
                      </a>
                    </nav>

                    <div className="tab-content">
                      {/* English Tab */}
                      <div className={`tab-pane fade ${activeTab === 'lang_en' ? 'show active' : ''}`} id="lang_en" dir="ltr" role="tabpanel" aria-labelledby="tab-lang_en" style={{ display: activeTab === 'lang_en' ? 'block' : 'none' }}>
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.pageTitle', undefined, 'en')}</span>
                                </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                    name="About_Title_en"
                                    type="text"
                                    placeholder={t('about.pageTitle', undefined, 'en')}
                                    className="form-control"
                                    required
                                    defaultValue={aboutData?.About_Title_en ?? ''}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.briefDescription', undefined, 'en')}</span>
                                </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <textarea
                                    name="About_Summary_en"
                                    rows={3}
                                    placeholder={t('about.briefDescription', undefined, 'en')}
                                    className="form-control"
                                    defaultValue={aboutData?.About_Summary_en ?? ''}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.content', undefined, 'en')}</span>
                                </label>
                              </div>
                              <div className="col-lg-10">
                                <div className="editor-container editor-container_classic-editor editor-container_include-style" id="editor-container">
                                  <div className="editor-container__editor">
                                    <div id="editor-en"></div>
                                  </div>
                                </div>
                                <div className="invalid-feedback">{t('common.required', undefined, 'en')}</div>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <div className="col-lg-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.statistics', undefined, 'en')}</span>
                                </label>
                              </div>
                              <div className="col-lg-8">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                  <div key={num} className="row">
                                    <div className="col-6">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          dir="ltr"
                                          name={`About_Title${num}_en`}
                                          placeholder={t('about.text', undefined, 'en')}
                                          className="form-control"
                                          autoComplete="off"
                                          defaultValue={aboutData?.[`About_Title${num}_en` as keyof typeof aboutData] ?? ''}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          dir="ltr"
                                          name={`About_Title${num}_Value_en`}
                                          placeholder={t('about.statistics', undefined, 'en')}
                                          className="form-control"
                                          autoComplete="off"
                                          defaultValue={aboutData?.[`About_Title${num}_Value_en` as keyof typeof aboutData] ?? ''}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`tab-pane fade ${activeTab === 'lang_ar' ? 'show active' : ''}`} id="lang_ar" dir="rtl" role="tabpanel" aria-labelledby="tab-lang_ar" style={{ display: activeTab === 'lang_ar' ? 'block' : 'none' }}>
                        <div className="card page-content_lang">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.pageTitle', undefined, 'ar')}</span>
                                </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    name="About_Title_ar"
                                    dir="rtl"
                                    type="text"
                                    placeholder={t('about.pageTitle', undefined, 'ar')}
                                    className="form-control"
                                    autoComplete="off"
                                    defaultValue={aboutData?.About_Title_ar ?? ''}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.briefDescription', undefined, 'ar')}</span>
                                </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <textarea
                                    name="About_Summary_ar"
                                    dir="rtl"
                                    rows={3}
                                    placeholder={t('about.briefDescription', undefined, 'ar')}
                                    className="form-control"
                                    defaultValue={aboutData?.About_Summary_ar ?? ''}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.content', undefined, 'ar')}</span>
                                </label>
                              </div>
                              <div className="col-lg-10">
                                <div className="editor-container editor-container_classic-editor editor-container_include-style" id="editor-container-ar">
                                  <div className="editor-container__editor">
                                    <div id="editor-ar" />
                                  </div>
                                </div>
                                <div className="invalid-feedback">{t('common.required', undefined, 'ar')}</div>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <div className="col-lg-2 col-md-3 align-start">
                                <label htmlFor="" className="form-label">
                                  <span style={{ verticalAlign: 'inherit' }}>{t('about.statistics', undefined, 'ar')}</span>
                                </label>
                              </div>
                              <div className="col-lg-8">
                                {/* Statistics - 8 rows matching ACP about.html */}
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title1_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title1_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title1_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title1_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title2_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title2_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title2_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title2_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title3_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title3_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title3_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title3_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title4_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title4_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title4_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title4_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title5_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title5_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title5_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title5_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title6_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title6_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title6_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title6_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title7_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title7_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title7_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title7_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title8_ar" placeholder={t('about.text', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title8_ar ?? ''} />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <input type="text" dir="rtl" name="About_Title8_Value_ar" placeholder={t('about.statistics', undefined, 'ar')} className="form-control" autoComplete="off" defaultValue={aboutData?.About_Title8_Value_ar ?? ''} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h3 className="card-body_title">{t('about.preferences')}</h3>
                        <div className="row">
                          <div className="col-lg-2">
                            <label htmlFor="" className="form-label">{t('about.fullContent')}</label>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder={t('about.wordsKeywords')}
                                className="form-control tagsinput"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {saveMessage && (
                      <div className={`alert ${saveMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                        {saveMessage.text}
                      </div>
                    )}
                    <div className="text-left mt-4" dir="rtl">
                      <button type="submit" className="btn btn-primary px-5" disabled={saving}>
                        {saving ? (t('common.saving') || 'Saving...') : t('common.save')}
                      </button>
                    </div>
                  </form>
            </>
            )}
          </div>
        </div>
      </AcpPage>

      {/* External Scripts */}
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" strategy="beforeInteractive" />
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap-datepicker.min.js" strategy="lazyOnload" />
      <Script src="/assets/js/bootstrap-select.min.js" strategy="lazyOnload" />
      <Script src="/assets/js/bootstrap-tagsinput.min.js" strategy="lazyOnload" />
      
      {/* Local Scripts */}
      <Script src="/assets/js/custom.js" strategy="lazyOnload" />
      <Script src="/assets/js/filter-domains.js" strategy="lazyOnload" />
      <Script src="/assets/js/language-switcher.js" strategy="lazyOnload" />
      
      {/* CKEditor 5 - load only on client; init in useEffect after script loads (SSR-safe) */}
      <Script src={pluginsConfig.ckeditor5.script} strategy="lazyOnload" onLoad={() => setCkEditorReady(true)} />
    </>
  );
}
