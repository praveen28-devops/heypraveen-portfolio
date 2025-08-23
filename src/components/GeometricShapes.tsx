import { useEffect, useRef } from 'react';

const GeometricShapes = ({ 
  shapeCount = 8,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing shapes
    container.innerHTML = '';

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      const shapeType = Math.random() > 0.5 ? 'circle' : 'polygon';
      const size = Math.random() * 60 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;

      shape.className = `absolute opacity-20 animate-float-slow`;
      
      if (shapeType === 'circle') {
        shape.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)));
          border-radius: 50%;
          left: ${left}%;
          top: ${top}%;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
          filter: blur(1px);
        `;
      } else {
        shape.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)));
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          left: ${left}%;
          top: ${top}%;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
          filter: blur(1px);
        `;
      }

      container.appendChild(shape);
    }
  }, [shapeCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
};

export default GeometricShapes;