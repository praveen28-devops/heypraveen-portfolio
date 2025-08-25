import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProfessionalSummary from '@/components/ProfessionalSummary';
import TechnicalSkills from '@/components/TechnicalSkills';
import Education from '@/components/Education';
import Projects from '@/components/Projects_fixed';
import Volunteering from '@/components/Volunteering';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen relative bg-black transition-all duration-700">
      <SEO />
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
