import { useEffect, useRef, useState, useCallback } from "react";
import { useMobile } from "./use-mobile";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  animationType?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "blur";
  duration?: number;
  easing?: string;
}

interface ScrollAnimationState {
  isVisible: boolean;
  hasTriggered: boolean;
  progress: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    staggerDelay = 100,
    animationType = "fadeIn",
    duration = 600,
    easing = "cubic-bezier(0.34, 1.56, 0.64, 1)",
  } = options;

  const { isMobile } = useMobile();
  const elementRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrollAnimationState>({
    isVisible: false,
    hasTriggered: false,
    progress: 0,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const intersectionRatio = entry.intersectionRatio;

        setState((prev) => ({
          isVisible: isIntersecting,
          hasTriggered: prev.hasTriggered || isIntersecting,
          progress: intersectionRatio,
        }));

        if (isIntersecting) {
          // Add mobile-specific animation classes
          element.classList.add("animate-in");
          element.classList.add(`animate-${animationType}`);

          // Apply mobile-optimized animation duration
          const mobileDuration = isMobile ? duration * 0.8 : duration;
          element.style.animationDuration = `${mobileDuration}ms`;
          element.style.animationTimingFunction = easing;

          // Handle stagger animations for child elements
          const children = element.querySelectorAll("[data-stagger]");
          children.forEach((child, index) => {
            const delay = index * staggerDelay;
            (child as HTMLElement).style.animationDelay = `${delay}ms`;
            child.classList.add("animate-in");
          });
        } else if (!triggerOnce) {
          element.classList.remove("animate-in");
          element.classList.remove(`animate-${animationType}`);
        }
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i * 0.1),
        rootMargin: isMobile ? "0px 0px -30px 0px" : rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    threshold,
    rootMargin,
    triggerOnce,
    staggerDelay,
    animationType,
    duration,
    easing,
    isMobile,
  ]);

  return {
    ref: elementRef,
    isVisible: state.isVisible,
    hasTriggered: state.hasTriggered,
    progress: state.progress,
  };
};

// Advanced scroll progress hook for parallax effects
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / scrollHeight, 1);

      setScrollProgress(progress);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    const throttledUpdate = throttle(updateScrollProgress, 16); // 60fps
    window.addEventListener("scroll", throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledUpdate);
    };
  }, [lastScrollY]);

  return { scrollProgress, scrollDirection };
};

// Mobile-optimized section transitions
export const useSectionTransition = (sectionId: string) => {
  const { isMobile } = useMobile();
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);

        if (entry.isIntersecting) {
          // Add mobile-specific section classes
          element.classList.add("section-active");

          // Update URL hash for mobile navigation
          if (isMobile && sectionId) {
            history.replaceState(null, "", `#${sectionId}`);
          }
        } else {
          element.classList.remove("section-active");
        }
      },
      {
        threshold: isMobile ? 0.3 : 0.5,
        rootMargin: isMobile ? "-20% 0px -20% 0px" : "-30% 0px -30% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, isMobile]);

  return {
    ref: sectionRef,
    isActive,
  };
};

// Staggered children animation hook
export const useStaggeredAnimation = (
  childSelector: string = "[data-stagger]",
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobile();

  const triggerStaggeredAnimation = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    const delay = isMobile ? 50 : 100;

    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add("stagger-animate-in");
      }, index * delay);
    });
  }, [childSelector, isMobile]);

  return {
    ref: containerRef,
    triggerAnimation: triggerStaggeredAnimation,
  };
};

// Utility function for throttling
function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Mobile touch-based scroll animations
export const useTouchScrollAnimation = () => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setIsScrolling(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      // Trigger smooth scroll to next/previous section
      const sections = document.querySelectorAll("section[id]");
      const currentSection = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const nextIndex = distance > 0 ? currentIndex + 1 : currentIndex - 1;
        const targetSection = sections[nextIndex];

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  };

  return {
    isScrolling,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
