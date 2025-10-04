import { useEffect } from "react";
import { useMobile, useMobilePerformance } from "../hooks/use-mobile";

interface MobileOptimizationsProps {
  children: React.ReactNode;
}

const MobileOptimizations: React.FC<MobileOptimizationsProps> = ({
  children,
}) => {
  const { isMobile } = useMobile();
  const { shouldReduceAnimations } = useMobilePerformance();

  useEffect(() => {
    if (isMobile) {
      // Disable pull-to-refresh on mobile
      document.body.style.overscrollBehavior = "none";

      // Optimize scrolling performance
      (
        document.body.style as CSSStyleDeclaration & {
          webkitOverflowScrolling?: string;
        }
      ).webkitOverflowScrolling = "touch";

      // Enable hardware acceleration for smoother animations
      document.body.style.transform = "translateZ(0)";
      document.body.style.backfaceVisibility = "hidden";

      // Prevent text selection on interactive elements
      const interactiveElements = document.querySelectorAll(
        "button, a, .touch-manipulation",
      );
      interactiveElements.forEach((element) => {
        element.addEventListener("selectstart", (e) => e.preventDefault());
        // Add mobile-specific touch classes
        element.classList.add("mobile-scale-tap");
      });

      // Add mobile-specific viewport meta tag adjustments
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
        );
      }

      return () => {
        document.body.style.overscrollBehavior = "";
        (
          document.body.style as CSSStyleDeclaration & {
            webkitOverflowScrolling?: string;
          }
        ).webkitOverflowScrolling = "";
        document.body.style.transform = "";
        document.body.style.backfaceVisibility = "";

        interactiveElements.forEach((element) => {
          element.removeEventListener("selectstart", (e) => e.preventDefault());
          element.classList.remove("mobile-scale-tap");
        });
      };
    }
  }, [isMobile]);

  useEffect(() => {
    if (shouldReduceAnimations) {
      // Add reduced motion class to body
      document.body.classList.add("reduced-motion");

      return () => {
        document.body.classList.remove("reduced-motion");
      };
    }
  }, [shouldReduceAnimations]);

  // Add mobile-specific CSS variables and scroll reveal
  useEffect(() => {
    const updateMobileVars = () => {
      const root = document.documentElement;
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;

      root.style.setProperty("--vh", `${vh}px`);
      root.style.setProperty("--vw", `${vw}px`);

      if (isMobile) {
        root.style.setProperty(
          "--mobile-safe-top",
          "env(safe-area-inset-top, 0px)",
        );
        root.style.setProperty(
          "--mobile-safe-bottom",
          "env(safe-area-inset-bottom, 0px)",
        );
        root.style.setProperty(
          "--mobile-safe-left",
          "env(safe-area-inset-left, 0px)",
        );
        root.style.setProperty(
          "--mobile-safe-right",
          "env(safe-area-inset-right, 0px)",
        );
      }
    };

    // Mobile scroll reveal observer
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Add stagger effect for card grids
          const siblings = Array.from(
            entry.target.parentElement?.children || [],
          );
          const index = siblings.indexOf(entry.target as Element);
          (entry.target as HTMLElement).style.animationDelay =
            `${index * 0.1}s`;
        }
      });
    }, observerOptions);

    // Add scroll reveal to relevant elements
    if (isMobile) {
      const revealElements = document.querySelectorAll(
        ".glass-card, .elevated-card, section > div, .project-card, .skill-item, .education-item",
      );
      revealElements.forEach((el) => {
        el.classList.add("mobile-scroll-reveal");
        scrollRevealObserver.observe(el);
      });
    }

    updateMobileVars();
    window.addEventListener("resize", updateMobileVars);
    window.addEventListener("orientationchange", updateMobileVars);

    return () => {
      window.removeEventListener("resize", updateMobileVars);
      window.removeEventListener("orientationchange", updateMobileVars);
      scrollRevealObserver.disconnect();
    };
  }, [isMobile]);

  return <>{children}</>;
};

export default MobileOptimizations;
