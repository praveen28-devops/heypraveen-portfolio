
import Seo from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProfessionalSummary from '@/components/ProfessionalSummary';
import TechnicalSkills from '@/components/TechnicalSkills';
import Education from '@/components/Education';
import Projects from '@/components/Projects_fixed';
import Volunteering from '@/components/Volunteering';


const Index = () => {
  return (
    <div className="min-h-screen relative bg-black transition-all duration-700">
      <Seo
        title="Praveen A - Cloud & DevOps Engineer | Portfolio"
        description="Portfolio of Praveen A, B.Tech IT Graduate specializing in Cloud Computing and DevOps. AWS, Docker, Kubernetes, CI/CD, automation. Ready for immediate joining."
        keywords="DevOps Engineer, Cloud Computing, AWS, Docker, Kubernetes, CI/CD, Automation, B.Tech IT, Portfolio, Praveen A, India, Resume, Projects, Skills"
      />
      <Navigation />
      <Hero />
      <ProfessionalSummary />
      <TechnicalSkills />
      <Education />
      <Projects />
      <Volunteering />
    </div>
  );
};

export default Index;
