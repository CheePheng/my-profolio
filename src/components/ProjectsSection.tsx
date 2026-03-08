import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  name: string;
  description: string;
  tech: string;
  repo: string;
}

const projects: Project[] = [
  { name: "PartyAI", description: "Play games locally with friends using AI-powered features", tech: "TypeScript", repo: "PartyAI" },
  { name: "KinshipPro", description: "Relationship management application for staying connected", tech: "TypeScript", repo: "KinshipPro" },
  { name: "WildSphere Zoo", description: "Zoo management system with animal tracking and reporting", tech: "C#", repo: "WildSphere-Zoo-" },
  { name: "AI Travel Companion", description: "AI-powered travel planning and recommendation app", tech: "TypeScript", repo: "AiTravelCompanionB" },
  { name: "NewsApp", description: "Modern news aggregation and reading application", tech: "TypeScript", repo: "NewsApp" },
  { name: "IoT Simulation", description: "IoT device simulation and data aggregation system", tech: "Python", repo: "IotSimulationAndAggregationSystem" },
  { name: "Pizza Delivery App", description: "Full-stack pizza ordering and delivery management", tech: "Java", repo: "FinalProjectPizza" },
  { name: "Network Pair", description: "TCP and UDP networking communication system", tech: "Java", repo: "CA2NetworkPair" },
  { name: "Zoo MVC", description: "MVC architecture zoo management application", tech: "C#", repo: "CA3MVC" },
];

const techColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-300",
  "C#": "bg-purple-500/20 text-purple-300",
  Java: "bg-orange-500/20 text-orange-300",
  Python: "bg-green-500/20 text-green-300",
  HTML: "bg-red-500/20 text-red-300",
};

const ProjectsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const gridX = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={ref} id="projects" className="relative py-20 px-6 md:px-16 bg-gradient-to-b from-[#0d1117] to-[#0f1923] overflow-hidden">
      <motion.div style={{ x: gridX, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} className="absolute inset-0 opacity-[0.03] pointer-events-none" />
      <motion.div style={{ y: glowY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-heading italic text-white tracking-tight mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <motion.p
          className="text-center text-white/50 font-body font-light mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A selection of projects I've built throughout my studies and personal time.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.a
              key={project.repo}
              href={`https://github.com/CheePheng/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-2xl p-5 flex flex-col gap-3 group hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-body font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {project.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white/70 transition-colors shrink-0 mt-1" />
              </div>
              <p className="text-sm font-body text-white/50 leading-relaxed flex-1">
                {project.description}
              </p>
              <span className={`text-xs font-body font-medium rounded-full px-2.5 py-0.5 w-fit ${techColors[project.tech] || "bg-gray-500/20 text-gray-300"}`}>
                {project.tech}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/CheePheng?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium text-white font-body inline-flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            View All Repositories
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
