import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import BlurText from "./BlurText";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const HeroContent = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
      {/* Badge */}
      <motion.div
        className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-2"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="rounded-full px-3 py-1 text-xs font-semibold font-body" style={{ background: "white", color: "black" }}>
          Open to Work
        </span>
        <span
          className="text-sm text-white pr-3 font-body font-medium"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          Cloud Computing Graduate · DkIT 2025
        </span>
      </motion.div>

      {/* Heading */}
      <div style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))" }}>
        <BlurText
          text="Hi, I'm Chee Pheng"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
          delay={100}
          animateBy="words"
          direction="bottom"
        />
      </div>

      {/* Subheading */}
      <motion.p
        className="mt-3 text-sm md:text-base max-w-2xl font-body font-light leading-tight text-white"
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.3)" }}
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        A Cloud Computing graduate passionate about building modern web and mobile
        applications. Experienced in full-stack development with TypeScript, React,
        Java, and C#.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex items-center gap-6 mt-4"
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <button
          onClick={() => scrollTo("projects")}
          className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)" }}
        >
          View Projects
          <ArrowUpRight className="h-5 w-5" />
        </button>
        <a
          href="https://github.com/CheePheng"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-white font-body"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          GitHub
          <Github className="h-4 w-4" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }} />
        </a>
      </motion.div>
    </div>
  );
};

export default HeroContent;
