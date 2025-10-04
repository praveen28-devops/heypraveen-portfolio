import { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  GraduationCap,
  FolderOpen,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ResumeActions from "./ResumeActions";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { id: "hero", label: "Home", icon: Home, path: "/" },
      { id: "summary", label: "Summary", icon: User, path: "/" },
      { id: "skills", label: "Skills", icon: Code, path: "/" },
      { id: "education", label: "Education", icon: GraduationCap, path: "/" },
      { id: "projects", label: "Projects", icon: FolderOpen, path: "/" },
      { id: "volunteering", label: "Volunteering", icon: Users, path: "/" },
    ],
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string, path: string) => {
    if (path !== "/") {
      // Navigate to different page
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".mobile-menu-container")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-slate-700/50 transition-all duration-700 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-wide"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              PRAVEEN A
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) =>
                item.path === "/" ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id, item.path)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id && location.pathname === "/"
                        ? "text-violet-400"
                        : "text-slate-300 hover:text-violet-400"
                    }`}
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {item.label}
                    {activeSection === item.id && location.pathname === "/" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full"></div>
                    )}
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? "text-violet-400"
                        : "text-slate-300 hover:text-violet-400"
                    }`}
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full"></div>
                    )}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden mobile-menu-container">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-violet-400 hover:bg-slate-800/50 transition-colors duration-300 touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mobile-menu-container">
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 animate-slide-down">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) =>
                item.path === "/" ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id, item.path)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-300 rounded-xl touch-manipulation ${
                      activeSection === item.id && location.pathname === "/"
                        ? "text-violet-400 bg-violet-500/10 border-l-4 border-violet-400"
                        : "text-slate-300 hover:text-violet-400 hover:bg-slate-800/50"
                    }`}
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium text-base">{item.label}</span>
                    {activeSection === item.id && location.pathname === "/" && (
                      <div className="ml-auto w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-300 rounded-xl touch-manipulation ${
                      location.pathname === item.path
                        ? "text-violet-400 bg-violet-500/10 border-l-4 border-violet-400"
                        : "text-slate-300 hover:text-violet-400 hover:bg-slate-800/50"
                    }`}
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium text-base">{item.label}</span>
                    {location.pathname === item.path && (
                      <div className="ml-auto w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                ),
              )}
            </div>

            {/* Mobile menu footer with resume actions */}
            <div
              className="px-4 py-4 border-t border-slate-700/50"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              <div className="text-center mb-3">
                <p className="text-sm text-slate-400 font-medium">
                  Available for opportunities
                </p>
                <div className="flex justify-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-500 font-normal">
                    Open to work
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <ResumeActions variant="compact" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
