/**
 * Language Tabs Swipe Handler
 * Enables swipe gestures to switch between English and Arabic tabs
 * Works with Bootstrap tabs (data-toggle="tab")
 */

(function() {
    'use strict';

    // Configuration
    const SWIPE_THRESHOLD = 50; // Minimum distance in pixels for a swipe
    const SWIPE_VELOCITY_THRESHOLD = 0.3; // Minimum velocity for a swipe
    const MAX_VERTICAL_DIFF = 100; // Maximum vertical movement to consider it a horizontal swipe

    // Initialize when DOM is ready
    $(document).ready(function() {
        initLanguageTabsSwipe();
    });

    /**
     * Initialize swipe functionality for all language tabs
     */
    function initLanguageTabsSwipe() {
        // Find all language tab containers
        $('.language-tab').each(function() {
            const $tabNav = $(this);
            
            // Find tab-content - could be next sibling or inside a form
            let $tabContent = $tabNav.next('.tab-content');
            if ($tabContent.length === 0) {
                // Try finding it in the next sibling (could be a form)
                const $nextSibling = $tabNav.next();
                if ($nextSibling.length > 0) {
                    $tabContent = $nextSibling.find('.tab-content').first();
                }
            }
            
            // If still not found, search in parent container
            if ($tabContent.length === 0) {
                $tabContent = $tabNav.parent().find('.tab-content').first();
            }
            
            if ($tabContent.length === 0) {
                return; // Skip if no tab content found
            }

            // Get tab links
            const $enTab = $tabNav.find('a[href="#lang_en"]');
            const $arTab = $tabNav.find('a[href="#lang_ar"]');
            
            if ($enTab.length === 0 || $arTab.length === 0) {
                return; // Skip if tabs are not properly structured
            }

            // Skip if already initialized
            if ($tabNav.data('swipeInitialized')) {
                return;
            }
            
            // Mark as initialized
            $tabNav.data('swipeInitialized', true);

            // Create callback function for swipe handling
            const swipeCallback = function(direction) {
                handleTabSwipe(direction, $enTab, $arTab);
            };

            // Initialize swipe on tab content area
            initSwipeOnElement($tabContent, swipeCallback);
            $tabContent.data('swipeInitialized', true);
            
            // Also initialize swipe on card elements inside tabs for better coverage
            $tabContent.find('.card.page-content_lang, .card-body').each(function() {
                const $card = $(this);
                if (!$card.data('swipeInitialized')) {
                    initSwipeOnElement($card, swipeCallback);
                    $card.data('swipeInitialized', true);
                }
            });
        });
    }

    /**
     * Initialize swipe detection on an element
     * @param {jQuery} $element - Element to attach swipe listeners
     * @param {Function} callback - Callback function with direction ('left' or 'right')
     */
    function initSwipeOnElement($element, callback) {
        let touchStartX = null;
        let touchStartY = null;
        let touchStartTime = null;
        let isScrolling = false;

        // Touch start
        $element.on('touchstart', function(e) {
            // Only handle if touching the tab content directly, not form inputs or interactive elements
            const $target = $(e.target);
            if ($target.is('input, textarea, select, button, a, label') || 
                $target.closest('input, textarea, select, button, a, label').length > 0 ||
                $target.closest('.form-control, .btn, .switch').length > 0) {
                return;
            }

            const touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            if (!touch) return;
            
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchStartTime = Date.now();
            isScrolling = false;
        });

        // Touch move - detect if user is scrolling vertically
        $element.on('touchmove', function(e) {
            if (touchStartX === null || touchStartY === null) {
                return;
            }

            const touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            const deltaY = Math.abs(touch.clientY - touchStartY);
            const deltaX = Math.abs(touch.clientX - touchStartX);

            // If vertical movement is greater than horizontal, user is scrolling
            if (deltaY > deltaX && deltaY > 10) {
                isScrolling = true;
            }
        });

        // Touch end - detect swipe gesture
        $element.on('touchend', function(e) {
            if (touchStartX === null || touchStartY === null || isScrolling) {
                touchStartX = null;
                touchStartY = null;
                touchStartTime = null;
                isScrolling = false;
                return;
            }

            const touch = e.originalEvent.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = Math.abs(touch.clientY - touchStartY);
            const deltaTime = Date.now() - touchStartTime;
            const velocity = Math.abs(deltaX) / deltaTime;

            // Reset touch data
            touchStartX = null;
            touchStartY = null;
            touchStartTime = null;

            // Check if it's a valid horizontal swipe
            if (deltaY > MAX_VERTICAL_DIFF) {
                isScrolling = false;
                return; // Too much vertical movement, ignore
            }

            // Check if swipe distance and velocity meet thresholds
            if (Math.abs(deltaX) > SWIPE_THRESHOLD && velocity > SWIPE_VELOCITY_THRESHOLD) {
                e.preventDefault();
                e.stopPropagation();

                // Determine swipe direction
                const direction = deltaX > 0 ? 'right' : 'left';
                callback(direction);
            }

            isScrolling = false;
        });

        // Mouse events for desktop testing (optional)
        // Using namespaced events to avoid conflicts
        const eventNamespace = '.languageTabSwipe_' + Date.now() + '_' + Math.random();
        let mouseStartX = null;
        let mouseStartY = null;
        let mouseStartTime = null;
        let isMouseDown = false;

        $element.on('mousedown' + eventNamespace, function(e) {
            // Only handle if clicking the tab content directly, not form inputs or interactive elements
            const $target = $(e.target);
            if ($target.is('input, textarea, select, button, a, label') || 
                $target.closest('input, textarea, select, button, a, label').length > 0 ||
                $target.closest('.form-control, .btn, .switch').length > 0) {
                return;
            }

            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
            mouseStartTime = Date.now();
            isMouseDown = true;
        });

        $(document).on('mousemove' + eventNamespace, function(e) {
            if (!isMouseDown || mouseStartX === null) {
                return;
            }

            const deltaY = Math.abs(e.clientY - mouseStartY);
            const deltaX = Math.abs(e.clientX - mouseStartX);

            if (deltaY > deltaX && deltaY > 10) {
                isMouseDown = false;
            }
        });

        $(document).on('mouseup' + eventNamespace, function(e) {
            if (!isMouseDown || mouseStartX === null) {
                return;
            }

            const deltaX = e.clientX - mouseStartX;
            const deltaY = Math.abs(e.clientY - mouseStartY);
            const deltaTime = Date.now() - mouseStartTime;
            const velocity = Math.abs(deltaX) / deltaTime;

            mouseStartX = null;
            mouseStartY = null;
            mouseStartTime = null;
            isMouseDown = false;

            if (deltaY > MAX_VERTICAL_DIFF) {
                return;
            }

            if (Math.abs(deltaX) > SWIPE_THRESHOLD && velocity > SWIPE_VELOCITY_THRESHOLD) {
                const direction = deltaX > 0 ? 'right' : 'left';
                callback(direction);
            }
        });

        // Store namespace for cleanup if needed
        $element.data('swipeEventNamespace', eventNamespace);
    }

    /**
     * Handle tab swipe based on direction
     * @param {string} direction - 'left' or 'right'
     * @param {jQuery} $enTab - English tab link
     * @param {jQuery} $arTab - Arabic tab link
     */
    function handleTabSwipe(direction, $enTab, $arTab) {
        const $activeTab = $enTab.closest('.nav-tabs').find('.nav-link.active');
        const activeHref = $activeTab.attr('href');
        const isEnglishActive = activeHref === '#lang_en';
        const isArabicActive = activeHref === '#lang_ar';

        // Swipe right (finger moves right) = move forward in tab order
        // Swipe left (finger moves left) = move backward in tab order
        // Tab order is always: English (#lang_en) -> Arabic (#lang_ar)
        
        if (direction === 'right') {
            // Swipe right = move forward = switch to next tab (Arabic)
            if (isEnglishActive) {
                $arTab.tab('show');
            }
        } else if (direction === 'left') {
            // Swipe left = move backward = switch to previous tab (English)
            if (isArabicActive) {
                $enTab.tab('show');
            }
        }
    }

    // Also handle Bootstrap tab events to ensure proper initialization
    // Re-initialize swipe on newly shown tab panes
    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
        const $tabNav = $(e.target).closest('.language-tab');
        if ($tabNav.length > 0) {
            const $enTab = $tabNav.find('a[href="#lang_en"]');
            const $arTab = $tabNav.find('a[href="#lang_ar"]');
            
            if ($enTab.length > 0 && $arTab.length > 0) {
                // Find the currently active tab pane
                const $activePane = $($(e.target).attr('href'));
                
                if ($activePane.length > 0) {
                    const swipeCallback = function(direction) {
                        handleTabSwipe(direction, $enTab, $arTab);
                    };
                    
                    // Initialize swipe on card elements in the newly shown pane
                    $activePane.find('.card.page-content_lang, .card-body').each(function() {
                        const $card = $(this);
                        // Only initialize if not already initialized
                        if (!$card.data('swipeInitialized')) {
                            initSwipeOnElement($card, swipeCallback);
                            $card.data('swipeInitialized', true);
                        }
                    });
                }
            }
        }
    });

})();
