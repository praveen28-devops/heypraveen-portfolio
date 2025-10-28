'use client';

import { useEffect, useState } from 'react';
import {
  Code,
  Cloud,
  Zap,
  Shield,
  Award,
  Target,
  Clock,
  Users,
} from "lucide-react";

interface FloatingParticlesProps {
  particleCount: number;
  className?: string;
  colors?: string[];
}

const FloatingParticles = ({ particleCount, className, colors = [] }: FloatingParticlesProps) => (
  <div className={className}>
    {[...Array(particleCount)].map((_, i) => (
      <div
        key={`floating-particle-${Math.random().toString(36).slice(2, 11)}`}
        className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
          backgroundColor:
            colors[i % colors.length] || "rgba(59, 130, 246, 0.3)",
        }}
      />
    ))}
  </div>
);

interface GeometricShapesProps {
  shapeCount: number;
}

const GeometricShapes = ({ shapeCount }: GeometricShapesProps) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(shapeCount)].map((_, i) => (
      <div
        key={`geometric-shape-${Math.random().toString(36).slice(2, 11)}`}
        className="absolute w-2 h-2 bg-purple-400/20 rotate-45 animate-spin"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 5}s`,
          borderRadius: "2px",
        }}
      />
    ))}
  </div>
);

const ProfessionalSummary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "50px" },
    );

    const element = document.getElementById("summary");
    if (element) {
      observer.observe(element);
    }

    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  const highlights = [
    {
      icon: Code,
      title: "Quick Learner",
      description:
        "Rapidly acquiring new technologies and development practices",
      color: "text-blue-400",
    },
    {
      icon: Cloud,
      title: "Cloud Enthusiast",
      description:
        "Passionate about AWS, Azure, and modern cloud architectures",
      color: "text-cyan-400",
    },
    {
      icon: Zap,
      title: "Problem Solver",
      description: "Analytical approach to troubleshooting and optimization",
      color: "text-yellow-400",
    },
    {
      icon: Shield,
      title: "Quality Focused",
      description: "Committed to best practices and secure coding standards",
      color: "text-green-400",
    },
  ];

  const recruiterHighlights = [
    {
      icon: Award,
      title: "AWS Certified",
      description: "Professional cloud computing certification",
      color: "text-orange-400",
    },
    {
      icon: Target,
      title: "Ready to Join",
      description: "Available for immediate employment",
      color: "text-green-400",
    },
    {
      icon: Clock,
      title: "Fast Learner",
      description: "Quickly adapts to new technologies",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Collaborative and communication skills",
      color: "text-purple-400",
    },
  ];

  return (
    <section
      id="summary"
      className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden bg-black min-h-screen transition-all duration-700 animate-fade-in-up"
    >
      {/* 3D Spline Object - Removed */}

      {!isMobile && !isTablet && (
        <>
          <FloatingParticles
            particleCount={25}
            colors={[
              "rgba(59, 130, 246, 0.4)",
              "rgba(34, 211, 238, 0.4)",
              "rgba(59, 130, 246, 0.2)",
              "rgba(34, 211, 238, 0.2)",
            ]}
            className="absolute inset-0 opacity-20"
          />
          <GeometricShapes shapeCount={5} />
        </>
      )}
      {isTablet && (
        <FloatingParticles
          particleCount={18}
          colors={["rgba(59, 130, 246, 0.4)", "rgba(34, 211, 238, 0.4)"]}
          className="absolute inset-0 opacity-20"
        />
      )}
      {isMobile && (
        <FloatingParticles
          particleCount={12}
          colors={["rgba(59, 130, 246, 0.4)", "rgba(34, 211, 238, 0.4)"]}
          className="absolute inset-0 opacity-20"
        />
      )}

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-8 sm:top-16 md:top-20 right-8 sm:right-16 md:right-20 animate-pulse"
          style={{
            width: "clamp(96px, 15vw, 256px)",
            height: "clamp(96px, 15vw, 256px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.4), rgba(34, 211, 238, 0.1))",
            filter: "blur(40px)",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />

        <div
          className="absolute bottom-8 sm:bottom-16 md:bottom-20 left-8 sm:left-16 md:left-20 animate-pulse"
          style={{
            width: "clamp(128px, 20vw, 320px)",
            height: "clamp(128px, 20vw, 320px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.35), rgba(59, 130, 246, 0.08))",
            filter: "blur(45px)",
            animationDelay: "3s",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />

        <div
          className="absolute top-1/3 left-1/3 animate-pulse"
          style={{
            width: "clamp(64px, 12vw, 160px)",
            height: "clamp(64px, 12vw, 160px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.05))",
            filter: "blur(32px)",
            animationDelay: "1.5s",
            animationDuration: "4s",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />

        <div
          className="absolute bottom-1/3 right-1/3 animate-pulse"
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "clamp(80px, 14vw, 200px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.25), rgba(16, 185, 129, 0.05))",
            filter: "blur(35px)",
            animationDelay: "2.5s",
            animationDuration: "5s",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-5 sm:mb-6 md:mb-8 lg:mb-12 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Professional Summary
          </h2>
          <div
            className="w-10 sm:w-12 md:w-16 lg:w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto"
            style={{ borderRadius: "2px" }}
          />
          <p className="text-sm sm:text-base md:text-lg text-slate-400 mt-2 sm:mt-3 md:mt-4 max-w-3xl mx-auto">
            A dedicated Cloud & DevOps professional ready to contribute to
            innovative projects
          </p>
        </div>

        <div
          className={`mb-6 sm:mb-8 md:mb-12 lg:mb-16 transition-all duration-800 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div
            className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 p-3 sm:p-4 md:p-6 lg:p-8"
            style={{ borderRadius: "24px" }}
          >
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-400 mb-2 sm:mb-3 md:mb-4">
                Why Choose Me?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">
                I am a{" "}
                <strong className="text-white">
                  B.Tech Information Technology student
                </strong>{" "}
                passionate about{" "}
                <strong className="text-white">
                  Cloud Computing and DevOps
                </strong>
                . My skills include{" "}
                <strong className="text-white">
                  AWS services, CI/CD pipelines, infrastructure automation, and
                  modern development practices
                </strong>
                . With a strong commitment to continuous learning and{" "}
                problem-solving, I am
                <strong className="text-cyan-400">
                  {" "}
                  available for immediate joining
                </strong>{" "}
                and eager to
                <strong className="text-white">
                  {" "}
                  contribute to impactful projects
                </strong>{" "}
                while advancing my expertise in the DevOps field.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className={`bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 p-3 sm:p-4 md:p-5 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-slate-500/50 hover:bg-slate-700/70 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    borderRadius: "20px",
                  }}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 bg-slate-800/50 flex items-center justify-center ${highlight.color}`}
                    style={{ borderRadius: "16px" }}
                  >
                    <highlight.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-blue-400 mb-1 sm:mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-600/30 pt-4 sm:pt-6 md:pt-8">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-blue-400 mb-3 sm:mb-4 md:mb-6 text-center">
                Key Advantages for Employers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {recruiterHighlights.map((highlight, index) => (
                  <div
                    key={highlight.title}
                    className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-slate-700/30 border border-slate-600/20 transition-all duration-300 hover:bg-slate-600/40 hover:border-slate-500/40 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 100}ms`,
                      borderRadius: "16px",
                    }}
                  >
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 bg-slate-800/50 flex items-center justify-center ${highlight.color}`}
                      style={{ borderRadius: "12px" }}
                    >
                      <highlight.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-medium text-blue-400">
                        {highlight.title}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSummary;
