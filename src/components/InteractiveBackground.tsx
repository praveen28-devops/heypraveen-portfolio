import React, { useRef, useEffect, useState } from 'react';

// Optimized CSS-only animated particles for better performance
const AnimatedParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const particleCount = window.innerWidth < 768 ? 8 : 15;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: particleCount }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Gradient waves */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, hsl(var(--primary)) 0%, transparent 50%)`,
          transform: `scale(${1 + Math.abs(mousePosition.x + mousePosition.y) * 0.1})`,
          transition: 'all 0.3s ease-out'
        }}
      />
      
      {/* Secondary gradient wave */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse at ${30 - mousePosition.x * 20}% ${70 - mousePosition.y * 20}%, hsl(var(--accent)) 0%, transparent 60%)`,
          transform: `scale(${1.2 + Math.abs(mousePosition.y) * 0.1}) rotate(${mousePosition.x * 10}deg)`,
          transition: 'all 0.5s ease-out'
        }}
      />
    </div>
  );
};

const InteractiveBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Detect low-performance devices
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      setIsLowPerformance(isMobile && isLowEnd);
    };

    checkPerformance();

    // Mouse/touch movement handler
    const handleMove = (event: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      
      if ('touches' in event) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      setMousePosition({
        x: (clientX / window.innerWidth) * 2 - 1,
        y: -(clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Use CSS-only animations for better mobile performance
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        {isLowPerformance ? (
          // Static fallback for low-performance devices
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        ) : (
          // Interactive animated background
          <AnimatedParticles mousePosition={mousePosition} />
        )}
      </div>
      
      {/* CSS gradient overlay for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-transparent to-background/70 pointer-events-none"></div>
    </div>
  );
};

export default InteractiveBackground;