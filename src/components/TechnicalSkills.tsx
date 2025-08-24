import { useEffect, useState, useRef } from 'react';
import { 
  Cloud, 
  Server, 
  Database, 
  Code, 
  GitBranch, 
  Shield, 
  Monitor, 
  Container,
  CheckCircle,
  Star
} from 'lucide-react';

// Minimal floating elements for Apple-style subtlety
const MinimalParticles = ({ particleCount, className }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(particleCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.2 + 0.05,
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
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            opacity: particle.opacity,
            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Apple-style skill card component
const SkillCard = ({ icon: Icon, title, skills, gradient, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-700 ease-out hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 transition-all duration-300 ${
              isHovered ? 'translate-x-2' : ''
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full opacity-70" />
            <span className="text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Apple-style proficiency bar
const ProficiencyBar = ({ skill, level, category, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
            // Animate the bar
            let start = 0;
            const duration = 1500;
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              
              setAnimatedLevel(level * easeOut);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, level, delay]);

  return (
    <div ref={barRef} className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-white font-semibold text-lg">{skill}</span>
          <div className="text-sm text-gray-400 font-medium">{category}</div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-400">
            {Math.round(animatedLevel)}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-150 ease-out shadow-lg"
            style={{
              width: `${animatedLevel}%`,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
            }}
          />
        </div>
        {/* Glow effect */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50 blur-sm transition-all duration-150"
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  );
};

// Apple-style certification badge
const CertificationBadge = ({ icon: Icon, title, status, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const badgeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={badgeRef}
      className={`flex items-center space-x-4 bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        <p className="text-gray-400 text-sm">{status}</p>
      </div>
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
      </div>
    </div>
  );
};

const TechnicalSkills = () => {
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

  const skillCategories = [
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: ['AWS', 'Azure', 'Google Cloud'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Infrastructure',
      icon: Server,
      skills: ['Terraform', 'CloudFormation'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Containerization',
      icon: Container,
      skills: ['Docker', 'Kubernetes', 'Helm'],
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      title: 'CI/CD Tools',
      icon: GitBranch,
      skills: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Monitoring',
      icon: Monitor,
      skills: ['Prometheus', 'Grafana'],
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['PostgreSQL', 'MongoDB'],
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Programming',
      icon: Code,
      skills: ['Python', 'Bash'],
      gradient: 'from-yellow-500 to-amber-500'
    }
  ];

  const proficiencyLevels = [
    { name: 'AWS', level: 98, category: 'Cloud Platform' },
    { name: 'Docker', level: 85, category: 'Containerization' },
    { name: 'Linux', level: 95, category: 'Operating System' },
    { name: 'Git', level: 95, category: 'Version Control' },
    { name: 'Python', level: 75, category: 'Programming' },
    { name: 'Jenkins', level: 85, category: 'CI/CD Pipeline' }
  ];

  const certifications = [
    { title: 'AWS Certified', status: 'In Progress', icon: Cloud },
    { title: 'Azure Certified', status: 'In Progress', icon: Shield },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black py-20 lg:py-32 overflow-hidden"
    >
      {/* Apple-style minimal background */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        
        {/* Minimal floating elements */}
        <MinimalParticles particleCount={15} className="absolute inset-0 opacity-40" />
        
        {/* Parallax floating orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.12}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full filter blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        />
      </div>

      <div 
        className="relative z-10 max-w-7xl mx-auto px-6"
        style={{ transform: `translateY(${scrollY * 0.04}px)` }}
      >
        {/* Hero Section */}
        <div className={`text-center mb-20 lg:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Technical
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Comprehensive expertise across modern DevOps and Cloud technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className={`mb-20 lg:mb-32 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={index}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
                gradient={category.gradient}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div className={`mb-20 lg:mb-32 transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="text-center mb-12 lg:mb-16">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Core Competencies
              </h3>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Proficiency levels in key technologies and frameworks
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {proficiencyLevels.map((skill, index) => (
                <ProficiencyBar
                  key={index}
                  skill={skill.name}
                  level={skill.level}
                  category={skill.category}
                  delay={index * 150}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className={`text-center transition-all duration-800 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Certifications & Credentials
              </h3>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Continuously expanding knowledge through industry-recognized certifications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <CertificationBadge
                  key={index}
                  icon={cert.icon}
                  title={cert.title}
                  status={cert.status}
                  delay={index * 200}
                />
              ))}
            </div>
            
            {/* Achievement indicator */}
            <div className="mt-12 inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full px-6 py-3 border border-blue-500/30">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-white font-medium">
                Committed to continuous learning and professional development
              </span>
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
  );
};

export default TechnicalSkills;