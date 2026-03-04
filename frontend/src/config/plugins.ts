/**
 * Public assets plugins base paths.
 * Plugins live under: public/assets/plugins/
 */

const PLUGINS_BASE = '/assets/plugins';

export const pluginsConfig = {
  /** Base path for all plugins */
  base: PLUGINS_BASE,

  /** CKEditor 5 - rich text editor */
  ckeditor5: {
    base: `${PLUGINS_BASE}/ckeditor5`,
    script: 'https://cdn.ckeditor.com/ckeditor5/42.0.1/classic/ckeditor.js',
    /** Import map - for backwards compat (ckeditorNew uses CDN Classic build directly) */
    importMap: {
      'ckeditor5': `${PLUGINS_BASE}/ckeditor5/ckeditor.js`,
      'ckeditor5/': `${PLUGINS_BASE}/ckeditor5/`,
    },
  },

  /** TinyMCE 7.1.2 - rich text editor */
  tinymce: {
    base: `${PLUGINS_BASE}/tinymce_7.1.2/tinymce/js/tinymce`,
    script: `${PLUGINS_BASE}/tinymce_7.1.2/tinymce/js/tinymce/tinymce.min.js`,
  },

  /** CKFinder - file manager (e.g. for CKEditor uploads) */
  ckfinder: {
    base: `${PLUGINS_BASE}/ckfinder_php_3.7.0/ckfinder`,
    script: `${PLUGINS_BASE}/ckfinder_php_3.7.0/ckfinder/ckfinder.js`,
  },
} as const;

export default pluginsConfig;
