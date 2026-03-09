import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, Code, Cloud } from "lucide-react";

const skills = [
  "TypeScript", "React", "Java", "C#", "HTML/CSS", "SQL",
  "Cloud Architecture", "Mobile Development", "REST APIs", "Git",
  "Node.js", "IoT", "Agile", "Docker",
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section ref={ref} id="about" className="section-premium dot-grid relative py-16 md:py-24 px-6 md:px-16 overflow-hidden">
      <motion.div style={{ y: orbY1 }} className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y: orbY2 }} className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="glow-dot" />
            <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">Get to know me</span>
            <div className="glow-dot" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading italic gradient-text tracking-tight">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-violet-400" />
              <h3 className="text-xl font-body font-semibold text-white">Who I Am</h3>
            </div>
            <p className="text-white/60 font-body font-light leading-relaxed mb-6">
              I'm Chee Pheng Ng, a Cloud Computing graduate from Dundalk Institute of Technology (DkIT).
              I completed 3 years of Computer Science in Software Development, then pursued an additional
              Honours year (Level 8) in Computing in Cloud Computing, graduating in 2025 with Second Class
              Honours Grade 2.
            </p>
            <p className="text-white/60 font-body font-light leading-relaxed mb-8">
              I'm passionate about building modern applications — from full-stack web apps to mobile
              and cloud-based systems. I enjoy working with diverse technologies and solving real-world
              problems through code.
            </p>

            <h4 className="text-xs font-body font-semibold text-violet-300/50 uppercase tracking-[0.15em] mb-4">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-tag premium-card rounded-full px-3.5 py-1.5 text-xs font-body text-white/70 border border-white/[0.06]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-5 w-5 text-violet-400" />
              <h3 className="text-xl font-body font-semibold text-white">Education</h3>
            </div>

            <div className="space-y-5">
              <motion.div className="premium-card rounded-2xl p-6" whileHover={{ y: -2, transition: { duration: 0.2 } }}>
                <div className="flex items-center gap-2 mb-3">
                  <Cloud className="h-4 w-4 text-violet-400" />
                  <span className="text-xs font-body text-violet-300/50 font-medium">2024 – 2025</span>
                </div>
                <h4 className="text-base sm:text-lg font-body font-semibold text-white mb-1">
                  BSc (Honours) Level 8 — Computing in Cloud Computing
                </h4>
                <p className="text-sm font-body text-white/50 mb-3">
                  Dundalk Institute of Technology (DkIT) · Add-on Year
                </p>
                <p className="text-sm font-body text-white/40 leading-relaxed">
                  Second Class Honours Grade 2 · Specialised in cloud architecture,
                  distributed systems, and modern DevOps practices.
                </p>
              </motion.div>

              <motion.div className="premium-card rounded-2xl p-6" whileHover={{ y: -2, transition: { duration: 0.2 } }}>
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-4 w-4 text-violet-400" />
                  <span className="text-xs font-body text-violet-300/50 font-medium">2020 – 2023</span>
                </div>
                <h4 className="text-base sm:text-lg font-body font-semibold text-white mb-1">
                  BSc Computer Science — Software Development
                </h4>
                <p className="text-sm font-body text-white/50 mb-3">
                  Dundalk Institute of Technology (DkIT) · 3 Years
                </p>
                <p className="text-sm font-body text-white/40 leading-relaxed">
                  Core foundation in programming, databases, networking, web development,
                  and software engineering principles.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
