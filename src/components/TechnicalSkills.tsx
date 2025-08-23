import { useEffect, useState } from 'react';
import { 
  Cloud, 
  Server, 
  Database, 
  Code, 
  GitBranch, 
  Shield, 
  Monitor, 
  Zap,
  Container,
  Settings,
  Network,
  Terminal
} from 'lucide-react';

// FloatingParticles component
const FloatingParticles = ({ particleCount = 30, colors = ['#3b82f6', '#8b5cf6', '#06b6d4'] }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-60"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 2}s`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

const TechnicalSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const skillCategories = [
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: ['AWS', 'Azure', 'Google Cloud'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Infrastructure',
      icon: Server,
      skills: ['Terraform', 'CloudFormation'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Containerization',
      icon: Container,
      skills: ['Docker', 'Kubernetes', 'Helm'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'CI/CD Tools',
      icon: GitBranch,
      skills: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps'],
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Monitoring',
      icon: Monitor,
      skills: ['Prometheus', 'Grafana'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['PostgreSQL', 'MongoDB'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Programming',
      icon: Code,
      skills: ['Python', 'Bash'],
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  const proficiencyLevels = [
    { name: 'AWS', level: 98, category: 'Cloud' },
    { name: 'Docker', level: 85, category: 'Container' },
    { name: 'Linux', level: 95, category: 'OS' },
    { name: 'Git', level: 95, category: 'Version Control' },
    { name: 'Python', level: 75, category: 'Programming' },
    { name: 'Jenkins', level: 85, category: 'CI/CD' }
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-slate-900">
      {/* Animated Background - Reduced on mobile */}
      {!isMobile && (
        <FloatingParticles 
          particleCount={40} 
          colors={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']}
        />
      )}
      {isMobile && (
        <FloatingParticles 
          particleCount={20} 
          colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
        />
      )}
      
      {/* Background Elements - Simplified for mobile */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-36 h-36 sm:w-72 sm:h-72 bg-cyan-500/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3rem,6vw,4rem)] lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Technical Skills
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 mt-4 sm:mt-6 max-w-3xl mx-auto">
            Comprehensive expertise across modern DevOps and Cloud technologies
          </p>
        </div>

        {/* Skills Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-1000 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${category.color} rounded-lg sm:rounded-xl mb-3 sm:mb-4 shadow-lg`}>
                <category.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white leading-tight">
                {category.title}
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Levels - Mobile Optimized */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'scale-100 opacity-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white">Core Competencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {proficiencyLevels.map((skill, index) => (
                <div key={index} className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-xs sm:text-sm text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 h-1.5 sm:h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${1200 + index * 150}ms`
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Preview - Mobile Optimized */}
        <div className={`mt-8 sm:mt-12 md:mt-16 transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 sm:space-x-4 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
              <span className="text-xs sm:text-sm font-medium text-white">
                AWS Certified (On Progress) • Azure Certified (On Progress) •
              </span>
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;