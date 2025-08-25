import { useEffect, useState } from 'react';
import { 
  Users, 
  Award, 
  Heart, 
  BookOpen, 
  Lightbulb, 
  Target,
  Globe,
  Star
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

// GeometricShapes component
const GeometricShapes = ({ shapeCount = 10 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: shapeCount }).map((_, i) => (
        <div
          key={i}
          className={`absolute opacity-10 ${i % 3 === 0 ? 'w-8 h-8' : i % 3 === 1 ? 'w-6 h-6' : 'w-4 h-4'} ${
            i % 4 === 0 ? 'bg-purple-500' : i % 4 === 1 ? 'bg-pink-500' : i % 4 === 2 ? 'bg-cyan-500' : 'bg-orange-500'
          } ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 3}s`,
            animation: `drift ${4 + Math.random() * 6}s ease-in-out infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

const Volunteering = () => {
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

    const element = document.getElementById('volunteering');
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

  const volunteeringExperience = [
    {
      title: 'Community Volunteer',
      organization: 'Atchayam Trust',
      period: '2024 - Present',
      description: 'Supporting community events and elder care initiatives.',
      icon: BookOpen,
      contributions: [
        'Volunteered at old age homes during functions.',
        'Distributed food, clothing, and essential supplies.',
        'Fostered intergenerational connections through activities and conversations',
        'Assisted in event planning and logistics for community welfare programs.'
      ],
      impact: 'Improved quality of life for elders and promoted community bonding.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Community Volunteer',
      organization: 'Ullash Trust',
      period: '2023 - Present',
      description: 'Educating and mentoring tribal students in Sittling, Dharmapuri.',
      icon: Heart,
      contributions: [
        'Taught 10th–12th grade tribal students in Sittling, Dharmapuri.',
        'Encouraged learning despite resource and infrastructure challenges.',
        'Organized interactive workshops to improve problem-solving and critical thinking skills.'
      ],
      impact: 'Empowered rural students with knowledge and confidence to pursue higher education.',
      color: 'from-red-500 to-orange-500'
    },
  ];

  return (
    <section id="volunteering" className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-black transition-all duration-700 animate-fade-in-up">
      {/* Animated Background Effects */}
      {!isMobile && <GeometricShapes shapeCount={8} />}
      <FloatingParticles 
        particleCount={isMobile ? 12 : 20} 
        colors={['#8b5cf6', '#ec4899', '#06b6d4', '#f97316']}
      />
      
      {/* Background Elements - Enhanced for animations */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3rem,6vw,4rem)] lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Volunteering
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 mt-4 sm:mt-6 max-w-3xl mx-auto">
            Making a positive impact through community engagement and knowledge sharing
          </p>
        </div>

        {/* Volunteering Experience */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h3 className={`text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12 text-white transition-all duration-1000 delay-300 ${isVisible ? '-translate-x-0 opacity-100' : 'opacity-0 -translate-x-10'}`}>
            Volunteering Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {volunteeringExperience.map((experience, index) => (
              <div
                key={index}
                className={`bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-700 group hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${experience.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2.5 sm:mb-3 md:mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <experience.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover:animate-pulse" />
                </div>
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight">{experience.title}</h4>
                <p className="text-purple-400 font-semibold mb-1 text-xs sm:text-sm">{experience.organization}</p>
                <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3 md:mb-4">{experience.period}</p>
                <p className="text-slate-300 mb-2.5 sm:mb-3 md:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3">{experience.description}</p>
                
                <div className="mb-2.5 sm:mb-3 md:mb-4">
                  <h5 className="text-xs font-semibold text-white mb-1.5 sm:mb-2">Contributions</h5>
                  <div className="space-y-1">
                    {experience.contributions.slice(0, 3).map((contribution, cIndex) => (
                      <div key={cIndex} className="flex items-start space-x-1.5">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-xs text-slate-400 line-clamp-1">{contribution}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/20 p-2 sm:p-2.5 md:p-3 rounded-lg border-l-2 sm:border-l-3 border-l-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/80 transition-all duration-300">
                  <p className="text-xs text-slate-200 font-medium group-hover:text-purple-300 transition-colors duration-300">{experience.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Volunteering;