'use client';

import React, { useState, useEffect, useCallback } from "react";

type IntensityLevel = "low" | "medium" | "high";

interface ParticleSystemProps {
  count?: number;
  className?: string;
  interactive?: boolean;
  colorPalette?: string[];
  intensity?: IntensityLevel;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  animationDelay: number;
  touchEffect?: boolean;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count,
  className = "",
  interactive = true,
  colorPalette = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
  intensity = "medium",
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [touchPosition, setTouchPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Detect mobile device and screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(mobile);
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate adaptive particle count based on device and performance
  const getAdaptiveCount = useCallback(() => {
    if (count) return count;

    const baseCount = {
      low: isMobile ? 4 : 12,
      medium: isMobile ? 6 : 18,
      high: isMobile ? 8 : 25,
    }[intensity];

    // Aggressive reduction for mobile performance
    if (dimensions.width < 480) return Math.floor(baseCount * 0.4);
    if (dimensions.width < 640) return Math.floor(baseCount * 0.6);

    return baseCount;
  }, [count, intensity, isMobile, dimensions.width]);

  // Initialize particles
  useEffect(() => {
    const particleCount = getAdaptiveCount();

    const newParticles: Particle[] = Array.from(
      { length: particleCount },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.3),
        size: Math.random() * (isMobile ? 3 : 6) + (isMobile ? 1 : 2),
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        opacity: Math.random() * 0.6 + 0.3,
        animationDelay: Math.random() * 10,
        touchEffect: false,
      }),
    );

    setParticles(newParticles);
  }, [getAdaptiveCount, isMobile, colorPalette]);

  // Handle touch/mouse interactions
  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (!interactive) return;

      const rect = document
        .querySelector(".particle-container")
        ?.getBoundingClientRect();
      if (!rect) return;

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      setTouchPosition({ x, y });

      setParticles((prev) =>
        prev.map((particle) => {
          const dx = particle.x - x;
          const dy = particle.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < (isMobile ? 25 : 20)) {
            return {
              ...particle,
              vx: dx * (isMobile ? 0.2 : 0.3),
              vy: dy * (isMobile ? 0.2 : 0.3),
              touchEffect: true,
              opacity: Math.min(particle.opacity + 0.3, 1),
            };
          }
          return particle;
        }),
      );

      // Clear touch effect after delay
      const clearTouchEffect = () => {
        setTouchPosition(null);
        const resetTouchEffect = (p: Particle) => ({ ...p, touchEffect: false });
        setParticles((prev) => prev.map(resetTouchEffect));
      };
      setTimeout(clearTouchEffect, isMobile ? 1000 : 800);
    },
    [interactive, isMobile],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // Prevent on mobile to avoid conflicts
    handleInteraction(e.clientX, e.clientY);
  };

  // Animation loop for particle movement
  useEffect(() => {
    if (!interactive) return;

    const interval = setInterval(
      () => {
        const updateParticle = (particle: Particle): Particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx * 0.98; // Friction
          let newVy = particle.vy * 0.98;

          // Boundary bouncing
          if (newX <= 0 || newX >= 100) {
            newVx = -newVx * 0.8;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            newVy = -newVy * 0.8;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            opacity: particle.touchEffect
              ? particle.opacity
              : Math.max(particle.opacity - 0.002, 0.3),
          };
        };
        setParticles((prev) => prev.map(updateParticle));
      },
      isMobile ? 100 : 50,
    ); // Much slower on mobile for performance

    return () => clearInterval(interval);
  }, [interactive, isMobile]);

  return (
    <section
      className={`particle-container ${className}`}
      onTouchStart={interactive ? handleTouchStart : undefined}
      onMouseMove={interactive ? handleMouseMove : undefined}
      aria-label={interactive ? "Interactive particle system" : undefined}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        touchAction: interactive ? "none" : "auto",
      }}
    >
      {/* Touch indicator */}
      {touchPosition && (
        <div
          className="touch-indicator"
          style={{
            position: "absolute",
            left: `${touchPosition.x}%`,
            top: `${touchPosition.y}%`,
            width: isMobile ? "60px" : "40px",
            height: isMobile ? "60px" : "40px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            animation: "ripple 0.8s ease-out forwards",
          }}
        />
      )}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            borderRadius: "50%",
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
            transition: particle.touchEffect
              ? "all 0.3s ease"
              : "opacity 0.5s ease",
            boxShadow: particle.touchEffect
              ? `0 0 ${particle.size * 2}px ${particle.color}40`
              : `0 0 ${particle.size}px ${particle.color}20`,
            animation: `float ${8 + particle.animationDelay}s infinite ease-in-out`,
            animationDelay: `${particle.animationDelay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }

        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        @media (max-width: 767px) {
          .particle {
            animation-duration: 15s !important;
            will-change: auto !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* Mobile performance optimizations */
        @media (max-width: 767px) {
          .particle-container {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          
          .particle {
            backface-visibility: hidden;
            transform-style: flat;
          }
        }
      `}</style>
    </section>
  );
};

// Demo component to showcase the enhanced particle system
const ParticleDemo: React.FC = () => {
  const [currentIntensity, setCurrentIntensity] = useState<IntensityLevel>("medium");
  const [isInteractive, setIsInteractive] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Enhanced Particle System
        </h1>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <label htmlFor="intensity-select" className="text-white text-sm font-medium">
                Intensity:
              </label>
              <select
                id="intensity-select"
                value={currentIntensity}
                onChange={(e) =>
                  setCurrentIntensity(
                    e.target.value as IntensityLevel,
                  )
                }
                className="bg-white/20 text-white rounded px-3 py-1 text-sm border border-white/30"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="interactive-toggle" className="text-white text-sm font-medium">
                Interactive:
              </label>
              <button
                id="interactive-toggle"
                onClick={() => setIsInteractive(!isInteractive)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  isInteractive
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 text-white/70"
                }`}
              >
                {isInteractive ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          <p className="text-white/70 text-xs mt-3 text-center">
            {isInteractive
              ? "Touch or hover to interact with particles"
              : "Particles are in display-only mode"}
          </p>
        </div>

        {/* Particle Container */}
        <div className="relative h-96 md:h-[500px] bg-black/20 rounded-lg overflow-hidden">
          <ParticleSystem
            intensity={currentIntensity}
            interactive={isInteractive}
            colorPalette={[
              "#3b82f6",
              "#8b5cf6",
              "#06b6d4",
              "#10b981",
              "#f59e0b",
              "#ef4444",
            ]}
          />
        </div>

        {/* Features List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">
              Mobile Optimizations
            </h3>
            <ul className="text-white/70 space-y-1">
              <li>• Adaptive particle count</li>
              <li>• Touch-friendly interactions</li>
              <li>• Optimized animations</li>
              <li>• Reduced motion support</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">
              Interactive Features
            </h3>
            <ul className="text-white/70 space-y-1">
              <li>• Touch/mouse repulsion</li>
              <li>• Dynamic particle physics</li>
              <li>• Visual touch feedback</li>
              <li>• Customizable intensity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticleDemo;
