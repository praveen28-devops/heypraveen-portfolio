import FloatingParticles from "./FloatingParticles";
import ResumeActions from "./ResumeActions";
import AnimatedHeroBackground from "./AnimatedHeroBackground";

const LinkedInSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <line x1="16" y1="11" x2="16" y2="16" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <line x1="8" y1="8" x2="8" y2="8" />
    <line x1="16" y1="8" x2="16" y2="8" />
  </svg>
);
import { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import profilePhoto from "../assets/profile-photo.png";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactItems = [
    {
      icon: MapPin,
      text: "Namakkal, Tamil Nadu, India",
      href: "https://maps.app.goo.gl/TmHd9zgFyMdSK8Kc7",
      color: "text-red-500",
    },
    {
      icon: Mail,
      text: "praveen.dev.cloud@gmail.com",
      href: "mailto:praveen.dev.cloud@gmail.com",
    },
    { icon: Phone, text: "+91 6382832865", href: "tel:+916382832865" },
    {
      icon: LinkedInSvg,
      text: "Linkedin",
      href: "https://www.linkedin.com/in/praveen-a-devops",
    },
  ];

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("summary");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 bg-black transition-colors duration-700"
    >
      {/* Animated Hero Background */}
      <AnimatedHeroBackground className="absolute inset-0 z-0" />

      <FloatingParticles
        particleCount={60}
        colors={[
          "#3b82f6",
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ]}
        className="absolute inset-0 pointer-events-none"
        opacity={0.5}
        enableMouse={true}
        enableTouch={true}
        mobileOptimizations={true}
      />

      <div className="absolute inset-0 opacity-15 sm:opacity-25 md:opacity-30">
        <div className="absolute top-16 sm:top-24 md:top-32 left-8 sm:left-16 md:left-30 w-32 h-32 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-accent/30 rounded-full blur-xl sm:blur-2xl md:blur-3xl floating-card"></div>
        <div className="absolute bottom-8 sm:bottom-16 md:bottom-20 right-4 sm:right-8 md:right-10 w-40 h-40 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary-glow/25 rounded-full blur-xl sm:blur-2xl md:blur-3xl floating-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-highlight-teal/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl floating-slow"></div>
        <div
          className="absolute top-12 sm:top-20 md:top-32 right-12 sm:right-20 md:right-32 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-highlight-blue/15 rounded-full blur-xl sm:blur-2xl md:blur-3xl floating-card"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 animate-fade-in-up">
        <div className="text-center">
          <div
            className={`mb-3 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-1200 ${isVisible ? "fade-in-scale" : "opacity-0"}`}
          >
            <div className="relative inline-block mb-2 sm:mb-3 md:mb-4 lg:mb-6">
              <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px] mx-auto rounded-full">
                <div className="w-full h-full rounded-full overflow-hidden relative image-overlay">
                  <img
                    src={profilePhoto}
                    alt="Praveen A - Cloud & DevOps Engineer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-accent rounded-full glow-accent animate-ping"></div>
              <div
                className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 md:-bottom-2 md:-left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 bg-primary-glow rounded-full glow-liteblue"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>

          <div
            className={`mb-3 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-1400 delay-300 ${isVisible ? "slide-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-[clamp(2rem,8vw,3.5rem)] sm:text-[clamp(2.5rem,7vw,4.5rem)] md:text-[clamp(3rem,7vw,5.5rem)] lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-glow-blue leading-tight">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-600 animate-pulse">
                Praveen A
              </span>
            </h1>
            <h2 className="text-[clamp(1.125rem,4vw,1.5rem)] sm:text-[clamp(1.25rem,4vw,2rem)] md:text-[clamp(1.5rem,4vw,2.5rem)] lg:text-3xl xl:text-4xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 text-glow leading-tight">
              Cloud & DevOps Engineer
            </h2>
            <p className="text-[clamp(0.875rem,3.5vw,1rem)] sm:text-[clamp(1rem,3.5vw,1.125rem)] md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 md:px-6">
              B.Tech Information Technology Graduate | DevOps Enthusiast |
              Automation Specialist | Ready for Immediate Joining
            </p>
          </div>

          <div
            className={`mb-3 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-1400 delay-500 ${isVisible ? "slide-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-4xl mx-auto">
              {contactItems.map((item, index) => (
                <a
                  key={item.text}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-slate-800/80 backdrop-blur-sm rounded-full hover:bg-slate-700/80 transition-all duration-300 text-white/90 hover:text-white group touch-manipulation border border-slate-700/50 hover:border-slate-600/50 ${
                    item.color ? item.color : ""
                  }`}
                  onClick={(e) => {
                    if (
                      item.href.startsWith("tel:") ||
                      item.href.startsWith("mailto:")
                    ) {
                      e.preventDefault();
                      window.open(item.href, "_self");
                    }
                  }}
                >
                  <item.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs sm:text-sm md:text-base font-medium group-hover:scale-105 transition-transform duration-300">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div
            className={`mb-4 sm:mb-6 md:mb-8 lg:mb-10 transition-all duration-1400 delay-700 ${isVisible ? "slide-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <ResumeActions />

              <Button
                variant="outline"
                onClick={scrollToNextSection}
                className="border-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 hover:text-white hover:border-slate-500 font-semibold px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] text-sm sm:text-base md:text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 touch-manipulation group"
              >
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 group-hover:animate-bounce" />
                Learn More
              </Button>
            </div>
          </div>

          <div
            className={`transition-all duration-1400 delay-900 ${isVisible ? "slide-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto">
              <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem] text-white/90 border border-slate-700/50">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <span className="text-xs sm:text-sm md:text-base font-medium">
                  AWS Certified
                </span>
              </div>
              <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem] text-white/90 border border-slate-700/50">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span className="text-xs sm:text-sm md:text-base font-medium">
                  Ready to Join
                </span>
              </div>
              <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem] text-white/90 border border-slate-700/50">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span className="text-xs sm:text-sm md:text-base font-medium">
                  Fast Learner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center space-y-2 text-slate-400 hover:text-white transition-colors duration-300 group touch-manipulation"
        >
          <span className="text-xs sm:text-sm font-medium">Scroll Down</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce group-hover:animate-pulse" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
