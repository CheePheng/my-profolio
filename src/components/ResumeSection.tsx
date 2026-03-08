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
  const orbY = useTransform(scrollYProgress, [0, 1], [50, -70]);

  return (
    <section ref={ref} id="resume" className="section-premium dot-grid relative py-24 px-6 md:px-16 overflow-hidden">
      <motion.div style={{ y: orbY }} className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="glow-dot" />
            <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">Credentials</span>
            <div className="glow-dot" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading italic gradient-text tracking-tight mb-4">
            Transcripts
          </h2>
          <p className="text-white/40 font-body font-light">
            View or download my academic transcripts below.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {transcripts.map((t, i) => (
            <motion.div
              key={t.label}
              className="premium-card rounded-2xl p-6 flex items-center gap-4 w-full text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-semibold text-white">{t.label}</p>
                <p className="text-xs font-body text-white/40 truncate">{t.title}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  href={t.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-card rounded-full p-2.5 border border-white/[0.06] hover:border-violet-500/30 transition-all"
                  title="View"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="h-4 w-4 text-white/60" />
                </motion.a>
                <motion.a
                  href={t.downloadUrl}
                  className="premium-card rounded-full p-2.5 border border-white/[0.06] hover:border-violet-500/30 transition-all"
                  title="Download"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-4 w-4 text-white/60" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
