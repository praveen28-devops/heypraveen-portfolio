import { useState, useEffect } from 'react';

interface MobileState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
}

export const useMobile = (): MobileState => {
  const [mobileState, setMobileState] = useState<MobileState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'portrait'
  });

  useEffect(() => {
    const updateMobileState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setMobileState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height,
        orientation: width > height ? 'landscape' : 'portrait'
      });
    };

    // Initial check
    updateMobileState();

    // Add event listeners
    window.addEventListener('resize', updateMobileState);
    window.addEventListener('orientationchange', updateMobileState);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateMobileState);
      window.removeEventListener('orientationchange', updateMobileState);
    };
  }, []);

  return mobileState;
};

// Additional mobile utilities
export const useMobileOptimizations = () => {
  const { isMobile, isTablet } = useMobile();

  const getResponsiveValue = <T,>(
    mobile: T,
    tablet: T,
    desktop: T
  ): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getResponsiveSpacing = (mobile: number, tablet: number, desktop: number): string => {
    const value = getResponsiveValue(mobile, tablet, desktop);
    return `${value}rem`;
  };

  const getResponsiveFontSize = (mobile: string, tablet: string, desktop: string): string => {
    return getResponsiveValue(mobile, tablet, desktop);
  };

  return {
    isMobile,
    isTablet,
    getResponsiveValue,
    getResponsiveSpacing,
    getResponsiveFontSize
  };
};

// Touch interaction utilities
export const useTouchInteractions = () => {
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);

  const handleTouchStart = () => {
    setIsTouching(true);
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    const touchDuration = Date.now() - touchStartTime;
    
    // Long press detection (optional)
    if (touchDuration > 500) {
      // Handle long press
    }
  };

  return {
    isTouching,
    handleTouchStart,
    handleTouchEnd
  };
};

// Performance optimization for mobile
export const useMobilePerformance = () => {
  const { isMobile } = useMobile();

  const shouldReduceAnimations = isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getAnimationDuration = (defaultDuration: number): number => {
    return shouldReduceAnimations ? defaultDuration * 0.5 : defaultDuration;
  };

  const getParticleCount = (defaultCount: number): number => {
    return shouldReduceAnimations ? Math.floor(defaultCount * 0.3) : defaultCount;
  };

  return {
    shouldReduceAnimations,
    getAnimationDuration,
    getParticleCount
  };
};
