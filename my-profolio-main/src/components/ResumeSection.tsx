import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Download, FileText, Eye } from "lucide-react";

const transcripts = [
  {
    year: "2024",
    title: "BSc Computer Science — Software Development",
    label: "2024 Transcript",
    viewUrl: "https://drive.google.com/file/d/1HKvUkcNMkJ_1XF438dfNJvHOkUnxq_9y/view",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=1HKvUkcNMkJ_1XF438dfNJvHOkUnxq_9y&export=download",
  },
  {
    year: "2025",
    title: "BSc (Hons) Computing in Cloud Computing",
    label: "2025 Transcript",
    viewUrl: "https://drive.google.com/file/d/1CxvIhBSTedeEFiU-pupYORTKKkhisRSX/view",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=1CxvIhBSTedeEFiU-pupYORTKKkhisRSX&export=download",
  },
  {
    year: "2025",
    title: "European Diploma Supplement",
    label: "Diploma Supplement",
    viewUrl: "https://drive.google.com/file/d/1BZz6BoMlbnmkDFjLBuKH_dVEh148av72/view",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=1BZz6BoMlbnmkDFjLBuKH_dVEh148av72&export=download",
  },
];

const ResumeSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const orbY = useTransform(scrollYProgress, [0, 1], [50, -70]);

  return (
    <section ref={ref} id="resume" className="relative py-20 px-6 md:px-16 bg-gradient-to-b from-[#0d1117] to-[#10141a] overflow-hidden">
      <motion.div style={{ y: lineY }} className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent pointer-events-none" />
      <motion.div style={{ y: orbY }} className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-heading italic text-white tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Transcripts
        </motion.h2>
        <motion.p
          className="text-white/50 font-body font-light mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          View or download my academic transcripts below.
        </motion.p>

        <div className="flex flex-col gap-5">
          {transcripts.map((t, i) => (
            <motion.div
              key={t.label}
              className="liquid-glass-strong rounded-2xl p-6 flex items-center gap-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <FileText className="h-8 w-8 text-blue-400 shrink-0" />
              <div className="text-left flex-1">
                <p className="text-sm font-body font-semibold text-white">{t.label}</p>
                <p className="text-xs font-body text-white/50">{t.title}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={t.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full p-2.5 hover:bg-white/10 transition-colors"
                  title="View"
                >
                  <Eye className="h-4 w-4 text-white/70" />
                </a>
                <a
                  href={t.downloadUrl}
                  className="liquid-glass rounded-full p-2.5 hover:bg-white/10 transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4 text-white/70" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
