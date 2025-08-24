/**
 * Enhanced Parallax Scrolling Script
 * Supports multilayer parallax with mobile-adaptive fallback
 * No animations or transitions - immediate position updates based on scroll
 */

(function() {
  'use strict';

  let isInitialized = false;
  let isMobile = false;

  // Check if device is mobile (screen width <= 767px)
  function checkMobile() {
    isMobile = window.innerWidth <= 767;
  }

  // Handle multilayer parallax for elements with data-parallax-speed
  function handleParallaxScroll() {
    // Skip on mobile for performance
    if (isMobile) return;

    const scrollY = window.scrollY;
    const elements = document.querySelectorAll('[data-parallax-speed]');
    
    elements.forEach(function(element) {
      const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0');
      const yPos = scrollY * speed;
      element.style.transform = 'translateY(' + yPos + 'px)';
    });
  }

  // Optimized scroll handler using requestAnimationFrame
  let ticking = false;
  function optimizedScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(function() {
        handleParallaxScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initialize parallax effects
  function initParallax() {
    if (isInitialized) return;

    checkMobile();
    
    // Add scroll listener for multilayer parallax
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Add resize listener to update mobile detection
    window.addEventListener('resize', function() {
      checkMobile();
    }, { passive: true });

    isInitialized = true;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
  } else {
    initParallax();
  }

  // Expose init function for manual initialization
  window.ParallaxScrolling = {
    init: initParallax,
    isMobile: function() { return isMobile; }
  };

})();
