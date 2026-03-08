import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Github } from "lucide-react";

const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={ref} id="contact" className="relative py-20 px-6 md:px-16 bg-gradient-to-b from-[#10141a] to-[#0c0e14] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent pointer-events-none" />
      <motion.div style={{ y: orbY }} className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-heading italic text-white tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-white/50 font-body font-light mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I'm currently open to opportunities. Feel free to reach out!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="mailto:cheephengcheepheng@outlook.com"
            className="liquid-glass-strong rounded-full px-6 py-3 font-body text-sm font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <Mail className="h-5 w-5" />
            cheephengcheepheng@outlook.com
          </a>
          <a
            href="https://github.com/CheePheng"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-6 py-3 font-body text-sm font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <Github className="h-5 w-5" />
            github.com/CheePheng
          </a>
        </motion.div>

        <motion.p
          className="mt-16 text-xs text-white/30 font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          © 2025 Chee Pheng Ng. Built with React, Vite & Tailwind CSS.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
