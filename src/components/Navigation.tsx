import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, GraduationCap, FolderOpen, Users, Mail, Download } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'summary', label: 'Summary', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'volunteering', label: 'Volunteering', icon: Users }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-design-xl sm:text-design-2xl font-design-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 focus-ring"
            >
              PRAVEEN A
            </button>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 lg:px-4 py-2 text-design-sm font-design-medium rounded-lg transition-all duration-300 focus-ring touch-target ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-slate-800/50'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/30'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex items-center space-x-2 ml-4 lg:ml-6">
              <a
                href="mailto:praveen.dev.cloud@gmail.com"
                className="inline-flex items-center px-3 lg:px-4 py-2 text-design-xs lg:text-design-sm font-design-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/70 rounded-lg transition-all duration-300 focus-ring touch-target"
                aria-label="Send email to Praveen A"
              >
                <Mail className="h-4 w-4 mr-1.5" />
                Contact
              </a>
              <a
                href="/Praveen A-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 lg:px-4 py-2 text-design-xs lg:text-design-sm font-design-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus-ring touch-target"
                aria-label="Download Praveen A's resume"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Resume
              </a>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden mobile-menu-container">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300 touch-target focus-ring"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mobile-menu-container">
          <div className="bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/50 shadow-2xl animate-slide-down">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-300 rounded-xl touch-target focus-ring ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-design-medium text-design-base">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Enhanced Mobile CTA Section */}
            <div className="px-4 py-4 border-t border-slate-700/50">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <a
                    href="mailto:praveen.dev.cloud@gmail.com"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-design-sm font-design-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/70 rounded-lg transition-all duration-300 focus-ring touch-target"
                    onClick={() => setIsOpen(false)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Me
                  </a>
                  <a
                    href="/Praveen A-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-design-sm font-design-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg transition-all duration-300 focus-ring touch-target"
                    onClick={() => setIsOpen(false)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </a>
                </div>
                
                {/* Status indicator */}
                <div className="text-center pt-2">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-design-xs text-slate-400 font-design-medium">Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Enhanced mobile menu item animations */
        .mobile-menu-container button {
          animation: mobile-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: translateX(-20px);
        }
        
        @keyframes mobile-slide-in {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;