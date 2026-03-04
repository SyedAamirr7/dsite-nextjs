/**
 * Language/Direction Switcher
 * Switches between RTL (Arabic) and LTR (English) layouts
 * Navigates between ar/ and en/ folders
 */

(function() {
    'use strict';

    // Get the language switcher button
    const languageSwitcher = document.getElementById('languageSwitcher');
    
    if (!languageSwitcher) {
        return; // Exit if button doesn't exist
    }

    // Get current path and determine current language
    function getCurrentLanguage() {
        const path = window.location.pathname;
        // Check for /ar/ or /en/ in the path
        if (path.includes('/ar/')) {
            return 'ar';
        } else if (path.includes('/en/')) {
            return 'en';
        }
        // Default to Arabic if not in a language folder
        return 'ar';
    }

    // Get current file name from path
    function getCurrentFileName() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p);
        let fileName = parts[parts.length - 1];
        
        // If no filename or not an HTML file, default to index.html
        if (!fileName || fileName === '' || !fileName.endsWith('.html')) {
            fileName = 'index.html';
        }
        
        return fileName;
    }

    // Switch to different language version
    function switchLanguage(targetLang) {
        const currentLang = getCurrentLanguage();
        const fileName = getCurrentFileName();
        let currentPath = window.location.pathname;
        
        // If already in target language, do nothing
        if (currentLang === targetLang) {
            return;
        }

        // Build new URL by replacing language folder
        let newPath = '';
        
        if (currentLang === 'ar' && targetLang === 'en') {
            // Switch from Arabic to English
            newPath = currentPath.replace('/ar/', '/en/');
        } else if (currentLang === 'en' && targetLang === 'ar') {
            // Switch from English to Arabic
            newPath = currentPath.replace('/en/', '/ar/');
        } else {
            // Not in a language folder, construct new path
            // Get the directory path
            const pathParts = currentPath.split('/').filter(p => p);
            const fileName = pathParts.pop() || 'index.html';
            const basePath = '/' + pathParts.join('/');
            newPath = basePath + '/' + targetLang + '/' + fileName;
        }
        
        // Navigate to new language version
        if (newPath && newPath !== currentPath) {
            window.location.href = newPath;
        }
    }

    // Initialize button based on current language
    function initLanguageButton() {
        const currentLang = getCurrentLanguage();
        
        if (currentLang === 'en') {
            // Currently in English, show AR button
            languageSwitcher.textContent = ' AR';
            languageSwitcher.setAttribute('title', 'ar language');
            languageSwitcher.setAttribute('data-language', 'ar');
        } else {
            // Currently in Arabic, show EN button
            languageSwitcher.textContent = ' EN';
            languageSwitcher.setAttribute('title', 'en language');
            languageSwitcher.setAttribute('data-language', 'en');
        }
    }

    // Event listener for the language switcher button
    languageSwitcher.addEventListener('click', function(e) {
        e.preventDefault();
        const currentLang = getCurrentLanguage();
        const targetLang = currentLang === 'ar' ? 'en' : 'ar';
        switchLanguage(targetLang);
    });

    // Initialize on page load
    initLanguageButton();

})();
