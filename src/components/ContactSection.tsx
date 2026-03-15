import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Github } from "lucide-react";

const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={ref} id="contact" className="section-premium relative py-16 md:py-24 px-6 md:px-16 overflow-hidden">
      <motion.div style={{ y: orbY }} className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="glow-dot" />
            <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">Let's Connect</span>
            <div className="glow-dot" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading italic gradient-text tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-white/40 font-body font-light">
            I'm currently open to opportunities. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="mailto:cheephengcheepheng@outlook.com"
            className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold text-white flex items-center gap-3 bg-violet-600 hover:bg-violet-500 transition-all"
            style={{ boxShadow: "0 0 30px rgba(139,92,246,0.3), 0 4px 20px rgba(0,0,0,0.3)" }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Mail className="h-5 w-5 text-white shrink-0" />
            cheephengcheepheng@outlook.com
          </motion.a>
          <motion.a
            href="https://github.com/CheePheng"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-card rounded-full px-4 sm:px-6 py-3 font-body text-xs sm:text-sm font-medium text-white flex items-center gap-3 border border-white/[0.06] hover:border-violet-500/30 transition-all"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Github className="h-5 w-5 text-violet-400 shrink-0" />
            github.com/CheePheng
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-white/[0.06]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs text-white/20 font-body">
            © 2026 Chee Pheng Ng · Built with React, Vite & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
