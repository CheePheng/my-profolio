import Navbar from "@/components/Navbar";
import ScrollFrameHero from "@/components/ScrollFrameHero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import AuroraBackground from "@/components/AuroraBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Premium animated background (behind content sections) */}
      <AuroraBackground />

      <Navbar />

      {/* Scroll-controlled frame-by-frame hero — immersive JeskoJets style */}
      <ScrollFrameHero />

      {/* Content sections */}
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <ResumeSection />
      <div className="section-divider" />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
};

export default Index;
