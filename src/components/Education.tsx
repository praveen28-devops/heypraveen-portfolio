import { useEffect, useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useScrollAnimation, useSectionTransition, useStaggeredAnimation } from '../hooks/use-scroll-animations';
import { useMobile } from '../hooks/use-mobile';

// GeometricShapes component
const GeometricShapes = ({ shapeCount = 10 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: shapeCount }).map((_, i) => (
        <div
          key={i}
          className={`absolute opacity-10 ${i % 3 === 0 ? 'w-8 h-8' : i % 3 === 1 ? 'w-6 h-6' : 'w-4 h-4'} ${
            i % 4 === 0 ? 'bg-blue-500' : i % 4 === 1 ? 'bg-purple-500' : i % 4 === 2 ? 'bg-cyan-500' : 'bg-green-500'
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

const Education = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const { isMobile } = useMobile();
  
  // Advanced scroll animations
  const headerAnimation = useScrollAnimation({ 
    animationType: 'fadeIn', 
    threshold: 0.2,
    duration: 800 
  });
  
  const educationSectionAnimation = useScrollAnimation({ 
    animationType: 'slideLeft', 
    threshold: 0.15,
    duration: 600,
    staggerDelay: 150 
  });
  
  const certificationAnimation = useScrollAnimation({ 
    animationType: 'slideRight', 
    threshold: 0.1,
    duration: 500,
    staggerDelay: 100 
  });
  
  const sectionTransition = useSectionTransition('education');
  const staggeredCerts = useStaggeredAnimation('[data-cert-card]');

  const education = [
    {
      degree: 'Bachelor of Engineering',
      field: 'Information Technology',
      institution: 'K S Rangasamy College of Technology',
      location: 'Namakkal, Tamil Nadu',
      period: '2023 - 2027',
      grade: 'CGPA: 7.8/10',
      highlights: [
        'Specialized in Cloud Computing and DevOps',
        'Member of Zealous Information Technology Association'
      ]
    },
    {
      degree: 'Higher Secondary Certificate',
      field: 'Science',
      institution: 'Sri Vidya Mandir Matriculation Higher Secondary School',
      location: 'Namakkal, Tamil Nadu',
      period: '2022 - 2023',
      grade: 'Percentage: 81%',
      highlights: [
        'Active participant in Science Exhibitions',
        'Led school technology club'
      ]
    }
  ];

  const certifications = [
    {
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle',
      credentialUrl: 'https://catalog-education.oracle.com/apex/f?p=1010:2:106302833521560::::P2_AUTHCODE,P2_AUTH_KEY,P2_ARG_INVALID_CNT:MX238423qH73c,NtFPU238351Ytjh244ElkC,0',
      date: "2025",
      level: 'Associate',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Terraform',
      issuer: 'Udemy',
      date: 'Aug 2025',
      credentialUrl: 'https://www.udemy.com/certificate/UC-f452bc1b-656a-4536-94be-a7833351afee/',
      level: 'Associate',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AWS Bootcamp of devops',
      issuer: 'Udemy',
      date: 'JUN 2025',
      credentialUrl: 'https://www.udemy.com/certificate/UC-1eea3c49-5f33-4209-b5b3-b8a9801528c2/',
      level: 'Associate',
      color: 'from-blue-500 to-purple-500'
    },

    {
      title: 'Azure DevOps Engineer Expert',
      issuer: 'Microsoft',
      date: 'On Progress',
      credentialUrl: 'https://www.credly.com/badges/azure-devops-engineer-expert',
      level: 'Expert',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      title: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: 'On Progress',
      credentialUrl: 'https://www.credential.net/google-cloud-professional-architect',
      level: 'Professional',
      color: 'from-green-500 to-blue-500'
    },
    
    

    {
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: 'On Progress',
      credentialUrl: 'https://www.credly.com/badges/docker-certified-associate',
      level: 'Associate',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const toggleCardFlip = (index) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section 
      ref={sectionTransition.ref}
      id="education" 
      className={`py-12 sm:py-16 md:py-20 relative overflow-hidden bg-black transition-all duration-1000 animate-fade-in-up ${
        sectionTransition.isActive ? 'section-active' : ''
      }`}
    >
      {/* Animated Background Effects */}
      {!isMobile && <GeometricShapes shapeCount={10} />}
      <FloatingParticles 
        particleCount={isMobile ? 10 : 18} 
        colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
      />
      
      {/* Background Elements - Enhanced for animations */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 sm:w-56 sm:h-56 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerAnimation.ref}
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            headerAnimation.isVisible 
              ? isMobile 
                ? 'animate-mobile-scroll-reveal opacity-100' 
                : 'translate-y-0 opacity-100' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3rem,6vw,4rem)] lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Education & Certifications
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Education Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h3 
            ref={educationSectionAnimation.ref}
            className={`text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white transition-all duration-1000 delay-300 ${
              educationSectionAnimation.isVisible 
                ? isMobile 
                  ? 'animate-mobile-slide-left opacity-100' 
                  : '-translate-x-0 opacity-100' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
            Academic Background
          </h3>
          <div className="space-y-6 sm:space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                data-stagger
                className={`bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-1000 ${
                  educationSectionAnimation.isVisible 
                    ? isMobile 
                      ? 'animate-mobile-float-up opacity-100' 
                      : 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
                style={{ 
                  transitionDelay: `${400 + index * 150}ms`,
                  animationDelay: isMobile ? `${index * 200}ms` : undefined
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 sm:lg:space-x-8">
                  <div className="flex-shrink-0 mb-3 sm:mb-4 lg:mb-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 sm:mb-4">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1">{edu.degree}</h4>
                        <p className="text-base sm:text-lg text-cyan-400 font-semibold">{edu.field}</p>
                        <p className="text-sm sm:text-base text-slate-300">{edu.institution}</p>
                      </div>
                      <div className="mt-2 lg:mt-0 lg:text-right">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{edu.location}</span>
                        </div>
                        <p className="text-cyan-400 font-semibold text-sm sm:text-base">{edu.grade}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      {edu.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm text-slate-400">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 
            ref={certificationAnimation.ref}
            className={`text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white transition-all duration-1000 delay-700 ${
              certificationAnimation.isVisible 
                ? isMobile 
                  ? 'animate-mobile-slide-right opacity-100' 
                  : 'translate-x-0 opacity-100' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            Professional Certifications
          </h3>
          <div 
            ref={staggeredCerts.ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cert-card
                className={`relative group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                  certificationAnimation.isVisible 
                    ? isMobile 
                      ? 'animate-mobile-card-flip opacity-100' 
                      : 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${700 + index * 150}ms`,
                  animationDelay: isMobile ? `${index * 100}ms` : undefined
                }}
              >
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 h-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-cyan-500/20 group-hover:bg-gradient-to-br group-hover:from-slate-800 group-hover:to-cyan-500/5">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${cert.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover:animate-pulse" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">{cert.title}</h4>
                  <p className="text-cyan-400 font-semibold mb-1 text-xs sm:text-sm group-hover:scale-105 transition-transform duration-300">{cert.issuer}</p>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3">{cert.date}</p>
                  <div className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${cert.color} text-white text-xs font-medium rounded-full group-hover:scale-105 transition-transform duration-300`}>
                    {cert.level}
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;