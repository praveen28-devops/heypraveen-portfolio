'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedHeroBackgroundProps {
  className?: string;
}

const AnimatedHeroBackground: React.FC<AnimatedHeroBackgroundProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particlesContainer = particlesRef.current;

    // Create floating particles
    const createParticles = () => {
      if (!particlesContainer) return;

      const particleCount = window.innerWidth < 768 ? 15 : 30;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "hero-particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 20 + "s";
        particle.style.animationDuration = 15 + Math.random() * 10 + "s";
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();

    // Cleanup on unmount
    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-background-container ${className}`}
    >
      {/* Dark gradient background */}
      <div className="hero-gradient-bg" />

      {/* Animated light rays */}
      <div className="hero-light-rays">
        <div className="hero-light-ray hero-ray-1" />
        <div className="hero-light-ray hero-ray-2" />
        <div className="hero-light-ray hero-ray-3" />
        <div className="hero-light-ray hero-ray-4" />
        <div className="hero-light-ray hero-ray-5" />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="hero-particles-container" />

      {/* Camera movement overlay */}
      <div className="hero-camera-movement" />
    </div>
  );
};

export default AnimatedHeroBackground;
