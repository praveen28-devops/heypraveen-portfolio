import { useEffect, useState, useRef, useCallback } from 'react';
import { 
  ExternalLink, 
  Cloud, 
  Server, 
  Database, 
  Shield,
  Monitor,
  Zap,
  ArrowRight,
  Star,
  Code,
  Layers
} from 'lucide-react';

// Mock Button component for demonstration
const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => (
  <button 
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// Mock FloatingParticles component
const FloatingParticles = ({ particleCount, className }) => (
  <div className={className}>
    {[...Array(particleCount)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

// Mock GeometricShapes component
const GeometricShapes = ({ shapeCount }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(shapeCount)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-purple-400/20 rotate-45 animate-spin"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 5}s`
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
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Enhanced mobile detection with breakpoint optimization
  const checkMobile = useCallback(() => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
  }, []);

  // Mouse tracking for card interactions
  const handleMouseMove = useCallback((e: React.MouseEvent, index: number) => {
    if (isMobile) return;
    
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
  }, [isMobile]);

  const handleMouseLeave = useCallback((e: React.MouseEvent, index: number) => {
    if (isMobile) return;
    
    const card = e.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    // Enhanced scroll progress tracking
    const handleScroll = () => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        const progress = Math.min(Math.max((scrollTop - elementTop + window.innerHeight) / elementHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkMobile]);

  const projects = [
    {
      title: 'AWS Two-Tier Infrastructure with Terraform',
      description: 'Deployed a secure and scalable two-tier AWS architecture using Terraform with modular design, featuring VPC, ALB, Auto Scaling, RDS, and comprehensive security controls.',
      fullDescription: 'Built a production-ready two-tier infrastructure with Terraform modules for VPC, load balancing, auto scaling, managed databases, DNS management, WAF protection, and CDN acceleration. Implemented IAM security, SSL certificates, and Infrastructure as Code best practices.',
      icon: Cloud,
      technologies: ['Terraform', 'AWS', 'VPC', 'ALB', 'Auto Scaling', 'RDS', 'Route 53', 'CloudFront', 'WAF', 'ACM', 'IAM'],
      highlights: [
        'Modular Terraform structure for reusability and maintainability',
        'Secure VPC with public/private subnets and NAT Gateway',
        'Application Load Balancer with health checks and SSL termination',
        'Auto Scaling Group for dynamic capacity management',
        'Managed RDS database with backup and encryption',
        'CloudFront CDN for global content delivery',
        'WAF protection against web exploits',
        'Route 53 DNS management with health checks'
      ],
      metrics: {
        security: 'WAF + IAM + SSL/TLS',
        scalability: 'Auto-scaling EC2 instances',
        availability: 'Multi-AZ deployment',
        performance: 'CloudFront CDN acceleration'
      },
      color: 'from-orange-500 via-red-500 to-pink-600',
      demoUrl: '',
      codeUrl: '',
      priority: 'high'
    },
    {
      title: '3-Tier Scalable Web Application on AWS',
      description: 'Architected and deployed a highly available 3-tier web application on AWS using EC2, RDS, and S3 with load balancing, auto scaling, and secure VPC networking.',
      fullDescription: 'Built a production-ready application infrastructure that handles massive traffic spikes with automatic scaling, disaster recovery, and multi-AZ deployment for maximum reliability.',
      icon: Zap,
      technologies: ['AWS', 'EC2', 'RDS', 'S3', 'IAM', 'VPC', 'Load Balancer', 'Auto Scaling'],
      highlights: [
        'Achieved 99.9% uptime with multi-AZ deployment',
        'Reduced infrastructure costs by 40% with auto-scaling', 
        'Implemented zero-downtime deployments',
        'Secured with VPC, IAM roles, and encryption at rest'
      ],
      metrics: {
        performance: '35% lower latency',
        cost: '40% cost reduction',
        reliability: '99.9% uptime',
        scalability: 'Auto-scales to 1000+ users'
      },
      color: 'from-blue-500 via-indigo-500 to-purple-600',
      demoUrl: '',
      codeUrl: '',
      priority: 'high'
    },
    {
      title: 'CI/CD Pipeline with Jenkins & Docker',
      description: 'Designed and implemented a comprehensive CI/CD pipeline using Jenkins, Docker, and Kubernetes for automated testing, building, and deployment of microservices.',
      fullDescription: 'Created a robust DevOps pipeline that reduced deployment time by 75% and eliminated manual errors through automated testing, containerization, and orchestration.',
      icon: Server,
      technologies: ['Jenkins', 'Docker', 'Kubernetes', 'Git', 'SonarQube', 'Ansible'],
      highlights: [
        'Reduced deployment time from 2 hours to 30 minutes',
        'Achieved 100% automated testing coverage',
        'Zero-downtime deployments with blue-green strategy',
        'Integrated security scanning and code quality gates'
      ],
      metrics: {
        efficiency: '75% faster deployments',
        quality: '100% test automation',
        reliability: 'Zero failed deployments',
        security: 'Automated vulnerability scanning'
      },
      color: 'from-green-500 via-teal-500 to-blue-600',
      demoUrl: '',
      codeUrl: '',
      priority: 'high'
    },
    {
      title: 'Infrastructure as Code with Terraform',
      description: 'Developed comprehensive Infrastructure as Code solutions using Terraform to provision and manage cloud resources across multiple environments with version control.',
      fullDescription: 'Implemented scalable infrastructure automation that ensures consistent environments, reduces manual configuration errors, and enables rapid environment provisioning.',
      icon: Cloud,
      technologies: ['Terraform', 'AWS', 'Azure', 'Git', 'Ansible', 'CloudFormation'],
      highlights: [
        'Automated provisioning of 50+ cloud resources',
        'Reduced environment setup time by 80%',
        'Implemented multi-cloud deployment strategy',
        'Version-controlled infrastructure with rollback capability'
      ],
      metrics: {
        automation: '95% infrastructure automated',
        speed: '80% faster provisioning',
        consistency: '100% environment parity',
        cost: '30% infrastructure cost savings'
      },
      color: 'from-orange-500 via-red-500 to-pink-600',
      demoUrl: '',
      codeUrl: '',
      priority: 'high'
    }
  ];

  const handleProjectClick = useCallback((projectIndex: number) => {
    setActiveProject(activeProject === projectIndex ? null : projectIndex);
    
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'project_interaction', {
        event_category: 'engagement',
        event_label: projects[projectIndex].title,
        value: 1
      });
    }
  }, [activeProject, projects]);

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Effects */}
      <FloatingParticles particleCount={30} className="absolute inset-0 pointer-events-none" />
      <GeometricShapes shapeCount={8} />
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing enterprise-level DevOps solutions that drive business transformation through automation, scalability, and reliability.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => {
            const isActive = activeProject === index;
            const IconComponent = project.icon;
            
            return (
              <div
                key={index}
                className={`group relative glass-card ultra-rounded-lg p-6 lg:p-8 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  isActive ? 'ring-2 ring-blue-500 shadow-2xl' : 'hover:shadow-xl'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => handleProjectClick(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={(e) => handleMouseLeave(e, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onTouchStart={() => setActiveProject(index === activeProject ? null : index)}
              >
                {/* Project Icon & Priority Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${project.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  {project.priority === 'high' && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                      <Star className={`w-4 h-4 text-amber-600 ${isActive ? 'animate-pulse' : ''}`} />
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Featured</span>
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isActive ? project.fullDescription : project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, isActive ? project.technologies.length : 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {!isActive && project.technologies.length > 4 && (
                      <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isActive && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Key Highlights */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Impact Metrics:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons removed (no Live Demo / Code links) */}

                {/* Expand/Collapse Indicator */}
                <div className="flex justify-center mt-6">
                  <Button
                    size="sm"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(index);
                    }}
                  >
                    <Layers className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Transform Your Infrastructure?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how these proven DevOps solutions can accelerate your business goals and drive operational excellence.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold border-0"
            onClick={() => {}}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
