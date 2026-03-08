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
  TypeScript: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  "C#": "bg-purple-500/15 text-purple-300 border-purple-500/20",
  Java: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  Python: "bg-green-500/15 text-green-300 border-green-500/20",
  HTML: "bg-red-500/15 text-red-300 border-red-500/20",
};

const ProjectsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="projects" className="section-premium relative py-24 px-6 md:px-16 overflow-hidden">
      <motion.div style={{ y: glowY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
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
            <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">My Work</span>
            <div className="glow-dot" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading italic gradient-text tracking-tight mb-4">
            Projects
          </h2>
          <p className="text-white/40 font-body font-light max-w-lg mx-auto">
            A selection of projects I've built throughout my studies and personal time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.a
              key={project.repo}
              href={`https://github.com/CheePheng/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-card rounded-2xl p-6 flex flex-col gap-3 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-body font-semibold text-white group-hover:text-violet-200 transition-colors">
                  {project.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-violet-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
              </div>
              <p className="text-sm font-body text-white/40 leading-relaxed flex-1">
                {project.description}
              </p>
              <span className={`text-xs font-body font-medium rounded-full px-3 py-1 w-fit border ${techColors[project.tech] || "bg-gray-500/15 text-gray-300 border-gray-500/20"}`}>
                {project.tech}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/CheePheng?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-card rounded-full px-7 py-3 text-sm font-medium text-white font-body inline-flex items-center gap-2 border border-white/[0.06] hover:border-violet-500/30 transition-all"
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
