import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";
import BlurText from "./BlurText";

const FRAME_COUNT = 80;
const FRAME_PATH = "/frames/ezgif-frame-";

const padNum = (n: number) => String(n).padStart(3, "0");

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const ScrollFrameHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text opacity zones based on scroll progress
  // 0-0.25: Hero text visible (above water)
  // 0.25-0.45: Hero text fades out (entering water)
  // 0.55-0.75: Underwater text fades in
  // 0.75-1.0: Underwater text visible then fades
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const underwaterTextOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.85, 1], [0, 1, 1, 0]);
  const underwaterTextY = useTransform(scrollYProgress, [0.5, 0.65], [40, 0]);
  const overlayDarkness = useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.85], [0, 0.15, 0.15, 0]);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${padNum(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;
  }, []);

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame on resize
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded]);

  // Draw a specific frame on the canvas (cover mode)
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imagesRef.current[frameIndex];
      if (!canvas || !ctx || !img || !img.complete) return;

      const cW = canvas.width;
      const cH = canvas.height;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      // Cover: fill canvas while maintaining aspect ratio
      const scale = Math.max(cW / iW, cH / iH);
      const drawW = iW * scale;
      const drawH = iH * scale;
      const x = (cW - drawW) / 2;
      const y = (cH - drawH) / 2;

      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, x, y, drawW, drawH);
    },
    []
  );

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // Update canvas frame on scroll
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      drawFrame(frameIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading screen */}
        {!loaded && (
          <div className="absolute inset-0 z-50 bg-[#07070d] flex flex-col items-center justify-center gap-4">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-white/40 text-sm font-body">Loading {loadProgress}%</p>
          </div>
        )}

        {/* Canvas — the frame animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* Dynamic dark overlay for underwater feel */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayDarkness }}
        />

        {/* Subtle vignette always on */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* ─── HERO TEXT (Above water: frames 1-25) ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-16"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          {/* Badge */}
          <motion.div
            className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-3"
            style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold font-body"
              style={{ background: "white", color: "black" }}
            >
              Open to Work
            </span>
            <span
              className="text-sm text-white pr-3 font-body font-medium"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
            >
              Cloud Computing Graduate · DkIT 2025
            </span>
          </motion.div>

          {/* Name */}
          <div style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.6))" }}>
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
            className="mt-4 text-sm md:text-base max-w-2xl font-body font-light leading-relaxed text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            A Cloud Computing graduate passionate about building modern web and mobile
            applications. Experienced in full-stack development with TypeScript, React,
            Java, and C#.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-6 mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <button
              onClick={() => scrollTo("about")}
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
            >
              View Projects
              <ArrowUpRight className="h-5 w-5" />
            </button>
            <a
              href="https://github.com/CheePheng"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white font-body"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
            >
              GitHub
              <Github className="h-4 w-4" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }} />
            </a>
          </motion.div>
        </motion.div>

        {/* ─── SCROLL INDICATOR ─── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span
            className="text-xs font-body text-white/80 font-medium"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white/70" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }} />
          </motion.div>
        </motion.div>

        {/* ─── UNDERWATER TEXT (frames 50-70) ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: underwaterTextOpacity, y: underwaterTextY }}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-heading italic text-white mb-4"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
          >
            Dive into my work
          </h2>
          <p
            className="text-base md:text-lg font-body font-light text-white/80 max-w-md"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            Scroll down to explore my projects, experience, and transcripts.
          </p>
        </motion.div>

        {/* ─── TECH STACK BAR (bottom, visible during above-water) ─── */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 z-10 flex flex-col items-center gap-3"
          style={{ opacity: heroTextOpacity }}
        >
          <span
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            Tech Stack
          </span>
          <div className="flex items-center gap-6 md:gap-12 flex-wrap justify-center">
            {["TypeScript", "React", "Java", "C#", "Cloud"].map((name) => (
              <span
                key={name}
                className="text-xl md:text-2xl font-heading italic text-white tracking-tight"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollFrameHero;
