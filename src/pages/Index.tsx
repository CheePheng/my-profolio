import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import PartnersBar from "@/components/PartnersBar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import AuroraBackground from "@/components/AuroraBackground";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_115329_5e00c9c5-4d69-49b7-94c3-9c31c60bb644.mp4";


const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroVideoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen relative">
      {/* Premium animated background */}
      <AuroraBackground />

      <Navbar />

      {/* Hero with video background */}
      <div ref={heroRef} id="home" className="relative h-screen flex flex-col overflow-hidden z-[3]">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: heroVideoOpacity }}>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero_bg.jpeg"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-black/5 z-0" />
        <div className="relative z-10 flex flex-col h-full">
          <HeroContent />
          <PartnersBar />
        </div>
      </div>

      {/* Sections with dividers */}
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
