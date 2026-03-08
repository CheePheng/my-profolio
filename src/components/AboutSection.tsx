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
    <section ref={ref} id="about" className="relative py-20 px-6 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117] overflow-hidden">
      <motion.div style={{ y: orbY1 }} className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: orbY2 }} className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-heading italic text-white tracking-tight mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-body font-semibold text-white">Who I Am</h3>
            </div>
            <p className="text-white/70 font-body font-light leading-relaxed mb-6">
              I'm Chee Pheng Ng, a Cloud Computing graduate from Dundalk Institute of Technology (DkIT).
              I completed 3 years of Computer Science in Software Development, then pursued an additional
              Honours year (Level 8) in Computing in Cloud Computing, graduating in 2025 with Second Class
              Honours Grade 2.
            </p>
            <p className="text-white/70 font-body font-light leading-relaxed mb-8">
              I'm passionate about building modern applications — from full-stack web apps to mobile
              and cloud-based systems. I enjoy working with diverse technologies and solving real-world
              problems through code.
            </p>

            <h4 className="text-sm font-body font-semibold text-white/50 uppercase tracking-wider mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="liquid-glass rounded-full px-3 py-1 text-xs font-body text-white/80"
                >
                  {skill}
                </span>
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
              <GraduationCap className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-body font-semibold text-white">Education</h3>
            </div>

            <div className="space-y-6">
              <div className="liquid-glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-body text-white/50">2024 – 2025</span>
                </div>
                <h4 className="text-lg font-body font-semibold text-white mb-1">
                  BSc (Honours) Level 8 — Computing in Cloud Computing
                </h4>
                <p className="text-sm font-body text-white/60 mb-3">
                  Dundalk Institute of Technology (DkIT) · Add-on Year
                </p>
                <p className="text-sm font-body text-white/50">
                  Second Class Honours Grade 2 · Specialised in cloud architecture,
                  distributed systems, and modern DevOps practices.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-body text-white/50">2020 – 2023</span>
                </div>
                <h4 className="text-lg font-body font-semibold text-white mb-1">
                  BSc Computer Science — Software Development
                </h4>
                <p className="text-sm font-body text-white/60 mb-3">
                  Dundalk Institute of Technology (DkIT) · 3 Years
                </p>
                <p className="text-sm font-body text-white/50">
                  Core foundation in programming, databases, networking, web development,
                  and software engineering principles.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
