'use client';

import { useEffect } from 'react';

export default function Stylesheets() {
  useEffect(() => {
    // External CSS - Load first
    const externalStyles = [
      'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
    ];

    // Bootstrap CSS - Load before custom CSS
    const bootstrapStyles = [
      '/assets/css/bootstrap.css',
      'https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap4.min.css',
      'https://cdn.datatables.net/rowreorder/1.2.8/css/rowReorder.dataTables.min.css',
      '/assets/css/bootstrap-datepicker.min.css',
      '/assets/css/bootstrap-select.min.css',
      '/assets/css/bootstrap-tagsinput.css',
    ];

    // Custom CSS - Load after Bootstrap
    const customStyles = [
      '/assets/css/toastr.css',
      '/assets/css/custom.css',
      '/assets/css/update-custom.css',
      '/assets/css/config-form-info.css',
      '/assets/css/darkMode.css',
      '/assets/css/en-ltr-fixes.css',
    ];

    // CKEditor CSS (local ckeditorNew.css + CDN fallback for ckeditor5 skin; local plugin has no CSS)
    const ckeditorStyles = [
      '/assets/css/ckeditorNew.css',
      'https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css',
    ];

    const allStyles = [...externalStyles, ...bootstrapStyles, ...customStyles, ...ckeditorStyles];

    allStyles.forEach((href) => {
      // Check if stylesheet already exists
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
