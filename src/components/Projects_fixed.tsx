import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ExternalLink, 
  Github, 
  Cloud, 
  Server, 
  Database, 
  Shield,
  Monitor,
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';
import { useMobile } from '../hooks/use-mobile';

// Mock Button component for demonstration
const Button = ({ children, variant, size, className, onClick, ...props }) => (
  <button 
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// Enhanced FloatingParticles component with minimal animation
const FloatingParticles = ({ particleCount, className }) => (
  <div className={className}>
    {[...Array(particleCount)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full opacity-40"
        style={{
          width: `${2 + Math.random() * 3}px`,
          height: `${2 + Math.random() * 3}px`,
          backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
  </div>
);

// GeometricShapes component
const GeometricShapes = ({ shapeCount = 10 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(shapeCount)].map((_, i) => (
      <div
        key={i}
        className={`absolute opacity-10 ${
          i % 3 === 0 ? 'w-8 h-8' : i % 3 === 1 ? 'w-6 h-6' : 'w-4 h-4'
        } ${
          i % 4 === 0 ? 'bg-blue-500' : i % 4 === 1 ? 'bg-purple-500' : i % 4 === 2 ? 'bg-cyan-500' : 'bg-green-500'
        } ${
          i % 2 === 0 ? 'rounded-full' : 'rotate-45'
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${4 + Math.random() * 6}s`,
          animationDelay: `${Math.random() * 3}s`
        }}
      />
    ))}
  </div>
);

// Type definitions for analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, any>
    ) => void;
  }
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState(null);
  const { isMobile } = useMobile();
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

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []); 

  const projects = [
    {
      title: ' 3-Tier Scalable Web Application on AWS ',
      description: 'Architected and deployed a highly available 3-tier web application on AWS using EC2, RDS, and S3 with load balancing, auto scaling, and secure VPC networking.',
      icon: Zap,
      technologies: ['EC2', 'RDS', 'S3', 'IAM', 'VPC'],
      highlights: [
        'Achieved 60fps animations on low-end mobile devices',
        'Reduced animation bundle size by 40%', 
        'Implemented adaptive performance based on device capability'
      ],
      metrics: {
        performance: '35% lower latency',
        cost: '40% smaller bundle',
        reliability: '99.9% uptime'
      },
      color: 'from-blue-500 to-cyan-500',
      priority: 'high'
    },
    {
      title: 'AWS Fully Serverless Architecture with CI/CD',
      description: 'Implemented a production-grade serverless API architecture using AWS Lambda, API Gateway, and Aurora Serverless, with infrastructure provisioned via Terraform and CI/CD powered by GitHub Actions.',
      icon: Monitor,
      technologies: ['Lambda', 'API Gateway', 'Terraform', 'GitHub Actions'],
      highlights: [
        'Automated deployments via GitHub Actions CI/CD pipeline',
        'Achieved secure, scalable API delivery with private VPC endpoints and Secrets Manager',
      ],
      metrics: {
        performance: '100% serverless uptime',
        cost: 'Touch-optimized UX',
        reliability: 'Fully automated deployments'
      },
      color: 'from-purple-500 to-violet-500',
      priority: 'medium'
    },
    {
      title: 'AWS Infrastructure Automation with Terraform & GitLab CI/CD',
      description: 'Developed a DevOps pipeline to provision and manage AWS infrastructure using Terraform, fully automated with GitLab CI/CD for seamless deployments.',
      icon: Server,
      technologies: ['Terraform', 'GitLab CI/CD', 'EC2', 'S3', 'VPC'],
      highlights: [
        'Automated multi-environment AWS provisioning with Terraform',
        'Enabled zero-touch deployments through GitLab CI/CD pipelines',
      ],
      metrics: {
        performance: 'Faster infrastructure provisioning',
        cost: 'Network-adaptive quality',
        reliability: 'Consistent, error-free deployments'
      },
      color: 'from-orange-500 to-red-500',
      priority: 'medium'
    }
  ];

  const handleProjectInteraction = (index: number, isEntering: boolean) => {
    if (!isMobile) {
      setHoveredProject(isEntering ? index : null);
    }
  };

  const handleProjectClick = (index: number) => {
    if (isMobile) {
      setActiveProject(activeProject === index ? null : index);
    }
    setHoveredProject(index);

    // Enhanced analytics tracking for conversion optimization
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'project_interaction', {
        project_title: projects[index].title,
        interaction_type: 'click',
        device_type: isMobile ? 'mobile' : 'desktop'
      });
    }
  };

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 relative overflow-hidden bg-black min-h-screen">
      {/* Minimal Background Effects */}
      {!isMobile && <GeometricShapes shapeCount={6} />}
      <FloatingParticles 
        particleCount={isMobile ? 12 : 20} 
        className="absolute inset-0 opacity-30" 
      />
      
      {/* ENHANCED: Perfect Circular Background Elements with Modern Blur Effects */}
      <div className="absolute inset-0 opacity-10">
        {/* Primary Blue Orb - Perfect Circle with Modern Blur */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        
        {/* Secondary Cyan Orb - Perfect Circle with Modern Blur */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        {/* Tertiary Purple Orb - Perfect Circle with Modern Blur */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Featured Projects
          </h2>
          <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto" style={{ borderRadius: '2px' }}></div>
          <p className="text-sm sm:text-base text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Showcasing innovative solutions that drive operational excellence and business growth
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 overflow-hidden transition-all duration-500 cursor-pointer group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } ${hoveredProject === index ? 'scale-[1.02] translate-y-[-4px] shadow-xl border-slate-600/70' : 'hover:scale-[1.01] hover:shadow-lg'} ${
                activeProject === index ? 'ring-2 ring-cyan-500/50' : ''
              }`}
              style={{ 
                transitionDelay: `${150 + index * 100}ms`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '20px', // Perfect rounded corners
              }}
              onMouseEnter={() => handleProjectInteraction(index, true)}
              onMouseLeave={() => handleProjectInteraction(index, false)}
              onClick={() => handleProjectClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick(index);
                }
              }}
            >
              {/* Project Header */}
              <div 
                className={`p-2.5 sm:p-3 md:p-4 bg-gradient-to-r ${project.color} relative overflow-hidden group-hover:bg-gradient-to-br transition-all duration-400`}
                style={{ borderRadius: '20px 20px 0 0' }} // Perfect top rounded corners
              >
                {/* Priority Badge */}
                {project.priority === 'high' && (
                  <div className="absolute top-2 right-2 z-20">
                    <div 
                      className="flex items-center space-x-1.5 bg-white/25 backdrop-blur-sm px-2.5 py-1.5 shadow-lg"
                      style={{ borderRadius: '20px' }} // Perfect rounded badge
                    >
                      <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-300 fill-current" />
                      <span className="text-xs sm:text-sm font-semibold text-white">Featured</span>
                    </div>
                  </div>
                )}
                
                {/* Perfect Circular Background Elements in Header */}
                <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-400">
                  <div 
                    className="absolute -top-1 -right-1 bg-white/20 animate-pulse"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      filter: 'blur(8px)'
                    }}
                  />
                  <div 
                    className="absolute -bottom-1 -left-1 bg-white/10 animate-pulse"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      filter: 'blur(10px)',
                      animationDelay: '1s'
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/15 group-hover:scale-125 transition-transform duration-500"
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      filter: 'blur(4px)'
                    }}
                  />
                </div>
                
                {/* Header Content */}
                <div className="relative z-10">
                  <div className="flex items-start space-x-2 sm:space-x-2.5 mb-2 sm:mb-2.5">
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0 group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300"
                      style={{ borderRadius: '12px' }} // Perfect rounded icon container
                    >
                      <project.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white group-hover:animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight group-hover:scale-105 transition-transform duration-300 pr-16 sm:pr-20">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Action Buttons removed (no external links) */}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-2.5 sm:p-3 md:p-4">
                <p className="text-slate-400 mb-2.5 sm:mb-3 leading-relaxed text-xs sm:text-sm">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-2.5 sm:mb-3">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1.5 sm:mb-2">Key Achievements</h4>
                  <div className="space-y-1">
                    {project.highlights.slice(0, isMobile ? 1 : 2).map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-start space-x-1.5">
                        <div className="w-1 h-1 bg-cyan-400 mt-1.5 flex-shrink-0" style={{ borderRadius: '50%' }} />
                        <p className="text-xs text-slate-400 leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-2.5 sm:mb-3">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1.5">Impact</h4>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Performance:</span>
                      <span className="text-cyan-400 font-medium text-xs">{project.metrics.performance}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Reliability:</span>
                      <span className="text-cyan-400 font-medium text-xs">{project.metrics.reliability}</span>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-semibold text-blue-400 mb-1.5">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, isMobile ? 2 : 3).map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-1.5 sm:px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-600/50 hover:text-cyan-400 transition-colors duration-200"
                        style={{ borderRadius: '12px' }} // Perfect rounded tags
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tech}
                      </span>
                    ))}
                    {isMobile && project.technologies.length > 2 && (
                      <span 
                        className="px-1.5 py-0.5 bg-slate-700/30 text-slate-500 text-xs"
                        style={{ borderRadius: '12px' }}
                      >
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-6 sm:mt-8 md:mt-10 transition-all duration-800 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button 
            type="button"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-semibold px-5 sm:px-6 py-2 sm:py-2.5 transition-all duration-300 text-sm sm:text-base group"
            style={{ borderRadius: '25px' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof window !== 'undefined') {
                window.open('https://github.com/praveen28-devops/praveen28-devops', '_blank', 'noopener,noreferrer');
              }
            }}
          >
            View All Projects
            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-1.5 sm:ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

// Add CSS for minimal particle animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) translateX(0px) rotate(0deg);
      opacity: 0.4;
    }
    25% { 
      transform: translateY(-20px) translateX(10px) rotate(90deg);
      opacity: 0.6;
    }
    50% { 
      transform: translateY(-10px) translateX(-15px) rotate(180deg);
      opacity: 0.3;
    }
    75% { 
      transform: translateY(-30px) translateX(5px) rotate(270deg);
      opacity: 0.5;
    }
  }
  
  @keyframes drift {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg);
      opacity: 0.2;
    }
    33% { 
      transform: translate(20px, -15px) rotate(120deg);
      opacity: 0.4;
    }
    66% { 
      transform: translate(-10px, 10px) rotate(240deg);
      opacity: 0.1;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}