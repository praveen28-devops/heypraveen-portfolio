import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  baseOpacity: number;
  pulse: number;
  pulseSpeed: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
  life: number;
  maxLife: number;
}

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface NetworkInformation extends EventTarget {
  effectiveType?: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

interface FloatingParticlesProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
  speed?: number;
  connectionDistance?: number;
  enableTrails?: boolean;
  enablePulse?: boolean;
  enableGlow?: boolean;
  enableMouse?: boolean;
  enableTouch?: boolean;
  particleSize?: { min: number; max: number };
  opacity?: number;
  mobileOptimizations?: boolean;
}

const FloatingParticles = ({
  particleCount = 50,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"],
  className = "",
  speed = 0.5,
  connectionDistance = 120,
  enableTrails = true,
  enablePulse = true,
  enableGlow = true,
  enableMouse = true,
  enableTouch = true,
  particleSize = { min: 1, max: 4 },
  opacity = 0.4,
  mobileOptimizations = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const touchRef = useRef({ x: 0, y: 0, isActive: false, touches: new Map() });
  const deviceRef = useRef({
    isMobile: false,
    isTouch: false,
    pixelRatio: 1,
    reducedMotion: false,
    batteryLevel: 1,
    connectionType: "unknown",
  });
  const performanceRef = useRef({
    lastFrameTime: 0,
    frameCount: 0,
    fps: 60,
    adaptiveQuality: 1,
    skipFrames: 0,
    targetFPS: 60,
  });

  // Device detection and capability assessment
  const detectDevice = useCallback(() => {
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) ||
      window.innerWidth < 768 ||
      "ontouchstart" in window;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    deviceRef.current = {
      isMobile,
      isTouch,
      pixelRatio,
      reducedMotion,
      batteryLevel: 1,
      connectionType: "unknown",
    };

    // Battery API support
    if ("getBattery" in navigator) {
      (navigator as NavigatorWithBattery)
        .getBattery?.()
        .then((battery: BatteryManager) => {
          deviceRef.current.batteryLevel = battery.level;
          battery.addEventListener("levelchange", () => {
            deviceRef.current.batteryLevel = battery.level;
          });
        });
    }

    // Network Information API
    if ("connection" in navigator) {
      const connection = (navigator as NavigatorWithConnection).connection;
      deviceRef.current.connectionType = connection?.effectiveType || "unknown";

      connection?.addEventListener("change", () => {
        deviceRef.current.connectionType =
          connection?.effectiveType || "unknown";
      });
    }

    // Adjust performance targets based on device
    if (isMobile) {
      performanceRef.current.targetFPS = 30; // Lower target FPS for mobile
    }
  }, []);

  // Enhanced performance monitoring with mobile considerations
  const updatePerformance = useCallback(() => {
    const now = performance.now();
    const deltaTime = now - performanceRef.current.lastFrameTime;

    if (deltaTime > 0) {
      performanceRef.current.fps = 1000 / deltaTime;
      performanceRef.current.frameCount++;

      const targetFPS = performanceRef.current.targetFPS;
      const batteryThreshold = deviceRef.current.isMobile ? 0.2 : 0.1;
      const isLowBattery = deviceRef.current.batteryLevel < batteryThreshold;
      const isSlowConnection = ["slow-2g", "2g"].includes(
        deviceRef.current.connectionType,
      );

      // More aggressive quality reduction for mobile/low battery
      if (
        performanceRef.current.fps < targetFPS * 0.7 ||
        isLowBattery ||
        isSlowConnection
      ) {
        performanceRef.current.adaptiveQuality = Math.max(
          0.2,
          performanceRef.current.adaptiveQuality * 0.9,
        );
        performanceRef.current.skipFrames = Math.min(
          3,
          performanceRef.current.skipFrames + 1,
        );
      } else if (
        performanceRef.current.fps > targetFPS * 1.1 &&
        !isLowBattery
      ) {
        performanceRef.current.adaptiveQuality = Math.min(
          1,
          performanceRef.current.adaptiveQuality * 1.005,
        );
        performanceRef.current.skipFrames = Math.max(
          0,
          performanceRef.current.skipFrames - 1,
        );
      }
    }

    performanceRef.current.lastFrameTime = now;
  }, []);

  // Touch interaction handler
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!canvasRef.current || !enableTouch) return;

      event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();

      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        const touchId = touch.identifier;

        touchRef.current.touches.set(touchId, {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
          force: touch.force || 1,
          timestamp: performance.now(),
        });
      }

      // Use primary touch for main interaction
      if (event.touches.length > 0) {
        const primaryTouch = event.touches[0];
        touchRef.current.x = primaryTouch.clientX - rect.left;
        touchRef.current.y = primaryTouch.clientY - rect.top;
        touchRef.current.isActive = true;
      }
    },
    [enableTouch],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!canvasRef.current || !enableTouch) return;

      event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();

      // Update all active touches
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        const touchId = touch.identifier;

        if (touchRef.current.touches.has(touchId)) {
          touchRef.current.touches.set(touchId, {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
            force: touch.force || 1,
            timestamp: performance.now(),
          });
        }
      }

      // Update primary touch position
      if (event.touches.length > 0) {
        const primaryTouch = event.touches[0];
        touchRef.current.x = primaryTouch.clientX - rect.left;
        touchRef.current.y = primaryTouch.clientY - rect.top;
      }
    },
    [enableTouch],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enableTouch) return;

      event.preventDefault();

      // Remove ended touches
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        touchRef.current.touches.delete(touch.identifier);
      }

      // Deactivate if no touches remain
      if (event.touches.length === 0) {
        touchRef.current.isActive = false;
      }
    },
    [enableTouch],
  );

  // Mouse interaction handler (kept for desktop)
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current || !enableMouse || deviceRef.current.isTouch)
        return;

      const rect = canvasRef.current.getBoundingClientRect();
      touchRef.current.x = event.clientX - rect.left;
      touchRef.current.y = event.clientY - rect.top;
      touchRef.current.isActive = true;
    },
    [enableMouse],
  );

  const handleMouseLeave = useCallback(() => {
    if (!deviceRef.current.isTouch) {
      touchRef.current.isActive = false;
    }
  }, []);

  // Optimized particle creation for mobile
  const getOptimizedParticleCount = useCallback(() => {
    if (!mobileOptimizations) return particleCount;

    let count = particleCount;

    if (deviceRef.current.isMobile) {
      count = Math.floor(count * 0.6); // Reduce by 40% on mobile
    }

    if (deviceRef.current.batteryLevel < 0.3) {
      count = Math.floor(count * 0.5); // Further reduce on low battery
    }

    if (["slow-2g", "2g"].includes(deviceRef.current.connectionType)) {
      count = Math.floor(count * 0.4);
    }

    return Math.max(10, count); // Minimum 10 particles
  }, [particleCount, mobileOptimizations]);

  useEffect(() => {
    detectDevice();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false, // Important for mobile performance
    });
    if (!ctx) return;

    // Optimize canvas context for mobile
    ctx.imageSmoothingEnabled = !deviceRef.current.isMobile; // Disable on mobile for performance
    if (ctx.imageSmoothingEnabled) {
      ctx.imageSmoothingQuality = deviceRef.current.isMobile ? "low" : "high";
    }

    const resizeCanvas = () => {
      const dpr = mobileOptimizations
        ? Math.min(deviceRef.current.pixelRatio, 1.5)
        : deviceRef.current.pixelRatio;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const optimizedCount = getOptimizedParticleCount();
      particlesRef.current = [];

      for (let i = 0; i < optimizedCount; i++) {
        const size =
          Math.random() * (particleSize.max - particleSize.min) +
          particleSize.min;
        const baseOpacity = Math.random() * 0.4 + 0.2;

        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size,
          opacity: baseOpacity,
          baseOpacity,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          trail: [],
          life: 0,
          maxLife: 1000 + Math.random() * 2000,
        });
      }
    };

    const updateParticle = (
      particle: Particle,
      deltaTime: number,
      canvasWidth: number,
      canvasHeight: number,
    ) => {
      const adaptiveSpeed = speed * performanceRef.current.adaptiveQuality;

      // Enhanced touch/mouse interaction with multi-touch support
      if ((enableMouse || enableTouch) && touchRef.current.isActive) {
        const dx = touchRef.current.x - particle.x;
        const dy = touchRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = deviceRef.current.isMobile ? 100 : 150;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          const forceMultiplier = deviceRef.current.isMobile ? 0.0008 : 0.001;

          particle.vx += Math.cos(angle) * force * forceMultiplier;
          particle.vy += Math.sin(angle) * force * forceMultiplier;
        }
      }

      // Additional multi-touch interactions
      if (enableTouch && touchRef.current.touches.size > 1) {
        touchRef.current.touches.forEach((touch) => {
          const dx = touch.x - particle.x;
          const dy = touch.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const force = ((80 - distance) / 80) * 0.0005;
            const angle = Math.atan2(dy, dx);

            particle.vx += Math.cos(angle) * force * (touch.force || 1);
            particle.vy += Math.sin(angle) * force * (touch.force || 1);
          }
        });
      }

      // Respect reduced motion preference
      let finalSpeed = adaptiveSpeed;
      if (deviceRef.current.reducedMotion) {
        finalSpeed *= 0.3;
      }

      // Update position with enhanced physics
      particle.x += particle.vx * finalSpeed * deltaTime * 0.1;
      particle.y += particle.vy * finalSpeed * deltaTime * 0.1;

      // Enhanced boundary handling with smooth rebounds
      const margin = particle.size * 2;
      if (particle.x < margin) {
        particle.x = margin;
        particle.vx = Math.abs(particle.vx) * 0.8;
      } else if (particle.x > canvasWidth - margin) {
        particle.x = canvasWidth - margin;
        particle.vx = -Math.abs(particle.vx) * 0.8;
      }

      if (particle.y < margin) {
        particle.y = margin;
        particle.vy = Math.abs(particle.vy) * 0.8;
      } else if (particle.y > canvasHeight - margin) {
        particle.y = canvasHeight - margin;
        particle.vy = -Math.abs(particle.vy) * 0.8;
      }

      // Velocity damping
      particle.vx *= 0.999;
      particle.vy *= 0.999;

      // Pulse animation (reduced on mobile)
      if (
        enablePulse &&
        (!deviceRef.current.isMobile ||
          performanceRef.current.adaptiveQuality > 0.5)
      ) {
        particle.pulse += particle.pulseSpeed;
        particle.opacity =
          particle.baseOpacity + Math.sin(particle.pulse) * 0.2;
      }

      // Trail system (simplified on mobile)
      if (enableTrails && performanceRef.current.adaptiveQuality > 0.4) {
        const maxTrailLength = deviceRef.current.isMobile ? 4 : 8;

        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity * 0.3,
        });

        if (particle.trail.length > maxTrailLength) {
          particle.trail.shift();
        }

        // Fade trail
        particle.trail.forEach((point) => {
          point.opacity *= 0.9;
        });
      }

      // Particle lifecycle
      particle.life++;
      if (particle.life > particle.maxLife) {
        // Respawn particle
        particle.x = Math.random() * canvasWidth;
        particle.y = Math.random() * canvasWidth;
        particle.life = 0;
        particle.vx = (Math.random() - 0.5) * speed;
        particle.vy = (Math.random() - 0.5) * speed;
      }
    };

    const drawParticle = (
      ctx: CanvasRenderingContext2D,
      particle: Particle,
    ) => {
      const quality = performanceRef.current.adaptiveQuality;
      const isMobile = deviceRef.current.isMobile;

      ctx.save();

      // Simplified trail for mobile
      if (
        enableTrails &&
        particle.trail.length > 1 &&
        quality > (isMobile ? 0.3 : 0.5)
      ) {
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * 0.3;
        ctx.lineCap = "round";

        const trailStep = isMobile ? 2 : 1; // Skip some trail points on mobile

        for (let i = trailStep; i < particle.trail.length; i += trailStep) {
          const prev = particle.trail[i - trailStep];
          const curr = particle.trail[i];

          ctx.globalAlpha = curr.opacity * opacity;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();
        }
      }

      // Simplified glow for mobile
      if (enableGlow && quality > (isMobile ? 0.6 : 0.7)) {
        const glowSize = isMobile ? particle.size * 2 : particle.size * 3;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize,
        );
        gradient.addColorStop(0, particle.color + "80");
        gradient.addColorStop(1, particle.color + "00");

        ctx.globalAlpha = particle.opacity * 0.3 * opacity;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw main particle
      ctx.globalAlpha = particle.opacity * opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Simplified highlight for mobile
      if (quality > (isMobile ? 0.7 : 0.8)) {
        ctx.globalAlpha = particle.opacity * 0.8 * opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(
          particle.x - particle.size * 0.3,
          particle.y - particle.size * 0.3,
          particle.size * 0.3,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      ctx.restore();
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      const quality = performanceRef.current.adaptiveQuality;
      const isMobile = deviceRef.current.isMobile;
      const qualityThreshold = isMobile ? 0.4 : 0.6;

      if (quality < qualityThreshold) return;

      const maxConnections = Math.floor(
        particlesRef.current.length * (isMobile ? 0.2 : 0.3) * quality,
      );
      let connectionCount = 0;
      const connectionStep = isMobile ? 2 : 1; // Skip some particles on mobile

      for (
        let i = 0;
        i < particlesRef.current.length && connectionCount < maxConnections;
        i += connectionStep
      ) {
        const particle = particlesRef.current[i];

        for (
          let j = i + connectionStep;
          j < particlesRef.current.length && connectionCount < maxConnections;
          j += connectionStep
        ) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const adjustedConnectionDistance = isMobile
            ? connectionDistance * 0.8
            : connectionDistance;

          if (distance < adjustedConnectionDistance) {
            const connectionOpacity =
              ((adjustedConnectionDistance - distance) /
                adjustedConnectionDistance) *
              (isMobile ? 0.1 : 0.15);

            ctx.save();
            ctx.globalAlpha = connectionOpacity * opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = isMobile ? 0.3 : 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();

            connectionCount++;
          }
        }
      }
    };

    const animate = (currentTime: number) => {
      updatePerformance();

      // Frame skipping for performance
      if (
        performanceRef.current.skipFrames > 0 &&
        performanceRef.current.frameCount %
          (performanceRef.current.skipFrames + 1) !==
          0
      ) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const deltaTime =
        currentTime - (performanceRef.current.lastFrameTime || currentTime);

      // Update particles
      particlesRef.current.forEach((particle) => {
        updateParticle(particle, deltaTime, rect.width, rect.height);
        drawParticle(ctx, particle);
      });

      // Draw connections
      drawConnections(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();

    // Add event listeners based on device capabilities
    if (enableMouse && !deviceRef.current.isTouch) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    if (enableTouch && deviceRef.current.isTouch) {
      canvas.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
      canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
      canvas.style.touchAction = "none"; // Prevent scrolling
    }

    animate(performance.now());

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    const handleVisibilityChange = () => {
      // Pause animation when tab is not visible to save battery
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      } else if (!document.hidden) {
        animate(performance.now());
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (enableMouse) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (enableTouch) {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    particleCount,
    colors,
    speed,
    connectionDistance,
    enableTrails,
    enablePulse,
    enableGlow,
    enableMouse,
    enableTouch,
    particleSize,
    opacity,
    mobileOptimizations,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    updatePerformance,
    detectDevice,
    getOptimizedParticleCount,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${enableTouch && deviceRef.current.isTouch ? "touch-none" : "pointer-events-none"} ${className}`}
      style={{
        opacity,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

export default FloatingParticles;
