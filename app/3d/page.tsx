'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  User,
  Code,
  GraduationCap,
  FolderOpen,
  Users,
} from "lucide-react";

export default function Model3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Add custom styles to hide Spline watermark
    const style = document.createElement("style");
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
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }

      /* Additional hiding for specific Spline elements */
      div[style*="rgb(255, 255, 255)"][style*="12px"],
      div[style*="rgb(0, 0, 0)"][style*="12px"],
      div[style*="color: rgb"][style*="font-size: 12px"],
      div[style*="font-family: Inter"][style*="12px"],
      a[style*="text-decoration: none"][style*="12px"],
      div[style*="linear-gradient"][style*="12px"],
      svg[style*="width: 16px"][style*="height: 16px"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }

      /* Container adjustments */
      .spline-container, 
      #spline-container,
      .model-3d-container {
        overflow: hidden !important;
        position: relative !important;
      }

      /* Override any inline styles that might show watermarks */
      * {
        --spline-watermark-display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up on unmount
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Model Container */}
      <div className="absolute inset-0 flex items-center justify-center model-3d-container">
        <iframe
          src="https://my.spline.design/praveen3dcopy-d8a7e7acdbe88f7b5fe0c5b18d877426/"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          title="Praveen 3D Portfolio Model"
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
        
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Loading 3D Experience...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <div className="text-center max-w-md px-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-4">3D Model Unavailable</h2>
              <p className="text-gray-300 mb-6">
                Unable to load the 3D experience. Please check your internet connection or try again later.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                View Portfolio <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Overlay */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg text-white hover:bg-opacity-70 transition-all"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Welcome Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-6 pointer-events-auto">
          <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-gray-300 font-light">
              Experience Innovation in Motion
            </p>
            <p className="text-lg mb-8 text-gray-400 max-w-2xl mx-auto">
              Discover the portfolio of Praveen A - Where Cloud Technology meets Creative Design
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                <User className="mr-2 w-5 h-5" />
                Enter Portfolio
              </Link>
              <button className="inline-flex items-center px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
                <ArrowRight className="mr-2 w-5 h-5" />
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="absolute bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <Link
            href="/#summary"
            className="p-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full text-white hover:bg-opacity-70 transition-all"
            title="Professional Summary"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link
            href="/#skills"
            className="p-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full text-white hover:bg-opacity-70 transition-all"
            title="Technical Skills"
          >
            <Code className="w-5 h-5" />
          </Link>
          <Link
            href="/#education"
            className="p-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full text-white hover:bg-opacity-70 transition-all"
            title="Education"
          >
            <GraduationCap className="w-5 h-5" />
          </Link>
          <Link
            href="/#projects"
            className="p-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full text-white hover:bg-opacity-70 transition-all"
            title="Projects"
          >
            <FolderOpen className="w-5 h-5" />
          </Link>
          <Link
            href="/#volunteering"
            className="p-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full text-white hover:bg-opacity-70 transition-all"
            title="Volunteering"
          >
            <Users className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}