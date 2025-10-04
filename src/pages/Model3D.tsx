import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Code, GraduationCap, FolderOpen, Users } from 'lucide-react';

const Model3D = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Add custom styles to hide Spline watermark
    const style = document.createElement('style');
    style.textContent = `
      /* Hide all Spline watermarks and logos - Comprehensive removal */
      .spline-watermark,
      [class*="spline"],
      [id*="spline"],
      [class*="watermark"],
      [id*="watermark"],
      [class*="logo"],
      [id*="logo"],
      iframe[src*="spline.design"] + div,
      iframe[src*="spline.design"] ~ div,
      iframe[src*="spline.design"] + *,
      iframe[src*="spline.design"] ~ *,
      div[style*="position: absolute"][style*="bottom"],
      div[style*="position: fixed"][style*="bottom"],
      div[style*="position: absolute"][style*="right"],
      div[style*="position: fixed"][style*="right"],
      div[style*="z-index: 999999"],
      div[style*="z-index: 9999"],
      div[style*="z-index: 999"],
      a[href*="spline.design"],
      a[href*="spline"],
      span[style*="background-image"],
      svg[viewBox*="89"],
      div[style*="background: linear-gradient"][style*="bottom"],
      div[style*="border-radius: 12px"][style*="bottom"],
      div[style*="width: 137px"],
      div[style*="height: 36px"],
      *[style*="spline"],
      *[class*="built"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }

      /* Multiple black overlays to hide any remaining watermarks */
      .watermark-blocker {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 200px;
        height: 80px;
        background: black;
        z-index: 1000;
        pointer-events: none;
      }

      .watermark-blocker-2 {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 180px;
        height: 60px;
        background: black;
        z-index: 1001;
        pointer-events: none;
      }

      .watermark-blocker-3 {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: linear-gradient(to top, black 0%, transparent 100%);
        z-index: 999;
        pointer-events: none;
      }

      /* Force hide any iframe overlays */
      iframe + div,
      iframe ~ div,
      iframe + *,
      iframe ~ * {
        display: none !important;
      }

      /* Override any inline styles that might show watermarks */
      * {
        --spline-display: none !important;
      }

      /* Metallic button styling */
      .metallic-button {
        background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
        border: 2px solid transparent;
        background-clip: padding-box;
        position: relative;
        overflow: hidden;
      }

      .metallic-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(145deg, #c0c0c0, #808080, #404040);
        border-radius: inherit;
        padding: 2px;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: subtract;
        -webkit-mask-composite: xor;
      }

      .metallic-button-text {
        background: linear-gradient(145deg, #e8e8e8, #c0c0c0, #a0a0a0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
        letter-spacing: 0.05em;
      }

      .metallic-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(192, 192, 192, 0.3);
      }

      .metallic-button:active {
        transform: translateY(0px) scale(0.98);
        transition: all 0.1s ease-out;
      }

      /* Click animation */
      @keyframes metallic-pulse {
        0% { 
          box-shadow: 0 0 0 0 rgba(192, 192, 192, 0.7);
          transform: scale(1);
        }
        50% {
          transform: scale(0.95);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(192, 192, 192, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(192, 192, 192, 0);
          transform: scale(1);
        }
      }

      .metallic-button.clicked {
        animation: metallic-pulse 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    `;
    document.head.appendChild(style);

    // JavaScript-based watermark removal
    const removeWatermarks = () => {
      // Remove elements by text content
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.textContent && (
          el.textContent.includes('Built with Spline') ||
          el.textContent.includes('spline.design') ||
          el.textContent.toLowerCase().includes('spline')
        )) {
          (el as HTMLElement).style.display = 'none';
          el.remove();
        }
      });

      // Remove elements by attributes
      document.querySelectorAll('[href*="spline"]').forEach(el => el.remove());
      document.querySelectorAll('[src*="spline"]').forEach(el => el.remove());
      document.querySelectorAll('.spline-watermark').forEach(el => el.remove());
      
      // Remove by common watermark positioning
      document.querySelectorAll('div[style*="position: absolute"][style*="bottom"]').forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.offsetWidth < 200 && htmlEl.offsetHeight < 100) {
          el.remove();
        }
      });
    };

    // Run watermark removal multiple times
    const intervalId = setInterval(removeWatermarks, 500);
    setTimeout(() => clearInterval(intervalId), 10000);

    // Initial removal
    setTimeout(removeWatermarks, 1000);
    setTimeout(removeWatermarks, 3000);
    setTimeout(removeWatermarks, 5000);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      clearInterval(intervalId);
    };
  }, []);

  const handleIframeLoad = () => {
    console.log('3D Model iframe loaded successfully');
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.log('3D Model iframe failed to load');
    setIsLoading(false);
    setHasError(true);
  };

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 600);
  };

  const portfolioSections = [
    { id: 'summary', label: 'Professional Summary', icon: User, description: 'Learn about my background and expertise' },
    { id: 'skills', label: 'Technical Skills', icon: Code, description: 'Explore my technical capabilities' },
    { id: 'education', label: 'Education', icon: GraduationCap, description: 'View my academic background' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, description: 'See my latest work and achievements' },
    { id: 'volunteering', label: 'Volunteering', icon: Users, description: 'Discover my community involvement' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-20 left-6 z-50 bg-red-900 p-2 rounded text-xs">
          Loading: {isLoading.toString()} | Error: {hasError.toString()}
        </div>
      )}

      {/* Professional View Portfolio Button - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <Link 
          to="/portfolio" 
          className="metallic-button px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-3 text-base font-semibold"
          onClick={handleButtonClick}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <span className="metallic-button-text">View Portfolio</span>
          <ArrowRight className="w-4 h-4 text-gray-300" />
        </Link>
      </div>

      {/* 3D Model Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center z-20 bg-black/70">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
              <span className="mt-4 text-slate-300 block font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Loading 3D Experience...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {hasError && (
          <div className="absolute inset-0 flex justify-center items-center z-20 bg-black/80">
            <div className="text-red-400 text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              <p className="text-xl font-semibold">Failed to load 3D model</p>
              <p className="text-sm text-slate-400 mt-2 font-normal">Please check your internet connection</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* 3D Model */}
        <div className="w-full h-full relative">
          <iframe 
            src='https://my.spline.design/infinity-e9gfWJzW9WxdcUij36yBQVZ5/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full block"
            title="3D Infinity Model"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="camera; microphone; xr-spatial-tracking; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="eager"
            style={{ 
              border: 'none', 
              outline: 'none',
              background: 'black',
              minHeight: '100vh'
            }}
          />
        </div>

        {/* Black overlays to hide watermark */}
        <div className="watermark-blocker"></div>
        <div className="watermark-blocker-2"></div>
        <div className="watermark-blocker-3"></div>
      </div>

      {/* Quick Navigation Section */}
      <div className="py-16 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent tracking-tight"
              style={{ fontFamily: 'Poppins, Inter, system-ui, sans-serif' }}>
            Discover My Expertise
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioSections.map((section) => (
              <Link
                key={section.id}
                to={`/portfolio#${section.id}`}
                className="group p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <section.icon className="w-8 h-8 text-gray-400 mb-4 group-hover:text-gray-300 transition-colors" />
                <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-gray-200 transition-colors tracking-tight">
                  {section.label}
                </h4>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">
                  {section.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 text-center border-t border-gray-800">
        <p className="text-slate-400 text-sm font-normal" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Interact with the 3D model above
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
};

export default Model3D;
