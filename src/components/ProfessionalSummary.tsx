import { useEffect, useState, useCallback, useRef } from 'react';
import { Code, Cloud, Zap, Shield, Award, Target, Clock, Users, Star, Sparkles, ArrowRight } from 'lucide-react';

// Minimal Floating Elements (Apple-style)
const MinimalParticles = ({ particleCount, className }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(particleCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  return (
    <div className={className}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            opacity: particle.opacity,
            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Apple-style Magnetic Button
const AppleButton = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    buttonRef.current.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = 'translate(0px, 0px)';
    setIsHovered(false);
  }, []);

  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out overflow-hidden group";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl",
    secondary: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full"
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center space-x-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
};

// Apple-style Scroll Progress
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
      <div 
        className="h-full bg-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Apple-style Card Component
const FeatureCard = ({ icon: Icon, title, description, color, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-700 ease-out hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  );
};

// Apple-style Stat Counter
const StatCounter = ({ value, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, delay]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1500, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div ref={elementRef} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const ProfessionalSummary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Quick Learner',
      description: 'Rapidly acquiring new technologies and development practices with a focus on modern solutions.',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Enthusiast',
      description: 'Passionate about AWS, Azure, and modern cloud architectures that drive business innovation.',
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Problem Solver',
      description: 'Analytical approach to troubleshooting and optimization with creative thinking.',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Quality Focused',
      description: 'Committed to best practices and secure coding standards in every project.',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    }
  ];

  const stats = [
    { value: 15, label: 'Projects', suffix: '+' },
    { value: 8, label: 'Technologies', suffix: '+' },
    { value: 3, label: 'Certifications', suffix: '' },
    { value: 100, label: 'Availability', suffix: '%' }
  ];

  return (
    <>
      <ScrollProgress />
      <section 
        id="summary" 
        className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-black"
      >
        {/* Apple-style Minimal Background */}
        <div className="absolute inset-0">
          {/* Subtle gradient overlay with enhanced parallax */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
                linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)
              `,
              transform: `translateY(${scrollY * 0.15}px)`
            }}
          />
          
          {/* Minimal floating elements */}
          <MinimalParticles particleCount={12} className="absolute inset-0 opacity-30" />
          
          {/* Single accent orb with parallax */}
          <div 
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"
            style={{
              transform: `translateY(${scrollY * 0.08}px)`
            }}
          />
        </div>

        <div 
          className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          {/* Hero Section - Apple Style */}
          <div className={`text-center mb-20 lg:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Professional
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Summary
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              A dedicated Cloud & DevOps professional ready to contribute 
              to innovative projects with cutting-edge solutions.
            </p>
          </div>

          {/* Main Content Card - Apple Style */}
          <div className={`mb-20 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
              
              {/* About Section */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-blue-600/20 rounded-full px-4 py-2 mb-8">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-blue-400">Available Now</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                  Why Choose Me?
                </h2>
                
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    I am a <span className="text-white font-semibold">B.Tech Information Technology student</span> passionate about 
                    <span className="text-blue-400 font-semibold"> Cloud Computing and DevOps</span>. My expertise includes 
                    <span className="text-cyan-400 font-semibold"> AWS services, CI/CD pipelines, infrastructure automation, and modern development practices</span>.
                    <br /><br />
                    With a commitment to continuous learning and innovative problem-solving, I am 
                    <span className="text-green-400 font-semibold"> immediately available</span> and excited to 
                    <span className="text-purple-400 font-semibold"> drive impactful results</span> in cutting-edge DevOps environments.
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    color={feature.color}
                    delay={index * 100}
                  />
                ))}
              </div>

              {/* Stats Section */}
              <div className="border-t border-white/10 pt-16">
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                  By the Numbers
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <StatCounter
                      key={stat.label}
                      value={stat.value}
                      label={stat.label}
                      suffix={stat.suffix}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action - Apple Style */}
          <div className={`text-center transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 lg:p-16">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Make an Impact
              </h3>
              
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how I can drive innovation and efficiency in your organization.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <AppleButton
                  variant="primary"
                  onClick={() => window.location.href = 'mailto:praveen.dev.cloud@gmail.com'}
                  className="text-lg px-10 py-4"
                >
                  <span>Contact Me</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </AppleButton>
                
                <AppleButton
                  variant="secondary"
                  onClick={() => window.open('/Praveen A-Resume.pdf', '_blank')}
                  className="text-lg px-10 py-4"
                >
                  View Resume
                </AppleButton>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                Response within <span className="text-blue-400 font-semibold">24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>
    </>
  );
};

export default ProfessionalSummary;