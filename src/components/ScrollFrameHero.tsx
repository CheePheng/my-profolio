import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";
import BlurText from "./BlurText";
import { scrollTo } from "@/lib/scrollTo";

const FRAME_COUNT = 192;
const getFrameSrc = (i: number) => `/frames/${String(i).padStart(5, "0")}.png`;

/** Draw an image cover-fit into a canvas */
const drawFrame = (canvas: HTMLCanvasElement | null, img: HTMLImageElement) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width: cw, height: ch } = canvas;
  const { naturalWidth: iw, naturalHeight: ih } = img;
  const scale = Math.max(cw / iw, ch / ih);
  const x = (cw - iw * scale) / 2;
  const y = (ch - ih * scale) / 2;
  ctx.drawImage(img, x, y, iw * scale, ih * scale);
};

const ScrollFrameHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<Set<number>>(new Set());
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ═══════════════════════════════════════
     TEXT TIMING (scroll progress 0 → 1)
     ═══════════════════════════════════════
     0.00        Hero text visible immediately
     0.00 – 0.30 Hero text visible (cherry blossoms)
     0.30 – 0.45 Hero text fades OUT
     0.50 – 0.60 Underwater text fades IN
     0.60 – 0.80 Underwater text visible (koi)
     0.80 – 0.90 Underwater text fades OUT
     0.90 – 1.00 Fade to dark → content below
     ═══════════════════════════════════════ */

  // Canvas dolly-zoom — camera pulls back as you scroll
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);

  // Hero text — visible from the start
  const heroOpacity = useTransform(scrollYProgress, [0, 0.30, 0.45], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.30, 0.45], [1.05, 1.0, 0.95]);

  // Tech stack bar
  const techOpacity = useTransform(scrollYProgress, [0, 0.28, 0.40], [1, 1, 0]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.01, 0.10, 0.18], [1, 1, 1, 0]);

  // Underwater text
  const underwaterOpacity = useTransform(scrollYProgress, [0.50, 0.60, 0.80, 0.88], [0, 1, 1, 0]);
  const underwaterY = useTransform(scrollYProgress, [0.50, 0.60], [40, 0]);
  const underwaterScale = useTransform(scrollYProgress, [0.50, 0.60], [0.92, 1.0]);

  // Dark overlays
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.50, 0.55, 0.80, 0.92],
    [0, 0, 0.15, 0.18, 0.12, 0.3]
  );
  const exitOverlay = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  // ─── Find nearest loaded frame ───
  const findNearest = (target: number): number => {
    const loaded = loadedRef.current;
    if (loaded.has(target)) return target;
    let lo = target - 1, hi = target + 1;
    while (lo >= 0 || hi < FRAME_COUNT) {
      if (lo >= 0 && loaded.has(lo)) return lo;
      if (hi < FRAME_COUNT && loaded.has(hi)) return hi;
      lo--; hi++;
    }
    return 0;
  };

  // ─── CANVAS SIZING ───
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-draw current frame after resize
      const imgs = imagesRef.current;
      if (imgs.length > 0 && loadedRef.current.size > 0) {
        const progress = scrollYProgress.get();
        const target = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
        const best = findNearest(target);
        const img = imgs[best];
        if (img?.complete) drawFrame(canvas, img);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [scrollYProgress]);

  // ─── PROGRESSIVE FRAME LOADING ───
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) imgs.push(new Image());
    imagesRef.current = imgs;

    const load = (index: number) => {
      const img = imgs[index];
      if (img.src) return; // already loading
      img.onload = () => {
        loadedRef.current.add(index);
        if (index === 0) {
          drawFrame(canvasRef.current, img);
          setReady(true);
        }
      };
      img.src = getFrameSrc(index + 1); // files are 1-indexed (00001.png)
    };

    // Batch 1: key frames (every 8th) for instant scroll coverage
    const keyFrames = [0, ...Array.from({ length: FRAME_COUNT }, (_, i) => i).filter((i) => i % 8 === 0)];
    keyFrames.forEach(load);

    // Batch 2: fill remaining frames after key frames have a head start
    const timer = setTimeout(() => {
      for (let i = 0; i < FRAME_COUNT; i++) load(i);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // ─── DRAW FRAME ON SCROLL (with nearest-frame fallback) ───
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const canvas = canvasRef.current;
    const imgs = imagesRef.current;
    if (!canvas || imgs.length === 0 || loadedRef.current.size === 0) return;

    const target = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
    const best = findNearest(target);
    const img = imgs[best];
    if (img?.complete) drawFrame(canvas, img);
  });

  return (
    <>
      {/* 400vh = 4 screens of scroll — cinematic but not excessive */}
      <div ref={containerRef} id="home" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Dark background shown while frames load */}
          <div className="absolute inset-0 bg-[#07070d]" />

          {/* ─── CANVAS (dolly-zoom) ─── */}
          <motion.div className="absolute inset-0" style={{ scale: canvasScale }}>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
            />
          </motion.div>

          {/* Atmosphere overlay */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />

          {/* Exit fade to dark */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: exitOverlay,
              background: "linear-gradient(to bottom, rgba(7,7,13,0.3) 0%, rgba(7,7,13,1) 70%)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />

          {/* ════════════════════════════════════
              SCENE 1: HERO TEXT (cherry blossoms)
              ════════════════════════════════════ */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          >
            <motion.div
              className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-4"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold font-body"
                style={{ background: "white", color: "black" }}
              >
                Open to Work
              </span>
              <span
                className="text-sm text-white pr-3 font-body font-medium"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              >
                Cloud Computing Graduate · DkIT 2025
              </span>
            </motion.div>

            <div style={{ filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.6))" }}>
              <BlurText
                text="Hi, I'm Chee Pheng"
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
                delay={100}
                animateBy="words"
                direction="bottom"
              />
            </div>

            <motion.p
              className="mt-5 text-sm md:text-base max-w-xl font-body font-light leading-relaxed text-white/90"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              A Cloud Computing graduate passionate about building modern web and mobile
              applications. Experienced in full-stack development with TypeScript, React,
              Java, and C#.
            </motion.p>

            <motion.div
              className="flex items-center gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <button
                onClick={() => scrollTo("about")}
                className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                View Projects
                <ArrowUpRight className="h-5 w-5" />
              </button>
              <a
                href="https://github.com/CheePheng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white font-body"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
              >
                GitHub
                <Github className="h-4 w-4" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }} />
              </a>
            </motion.div>
          </motion.div>

          {/* ─── TECH STACK BAR ─── */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-3"
            style={{ opacity: techOpacity }}
          >
            <span
              className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            >
              Tech Stack
            </span>
            <div className="flex items-center gap-6 md:gap-14 flex-wrap justify-center">
              {["TypeScript", "React", "Java", "C#", "Cloud"].map((name) => (
                <span
                  key={name}
                  className="text-xl md:text-2xl font-heading italic text-white tracking-tight"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ─── SCROLL INDICATOR ─── */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <span
              className="text-[10px] font-body text-white/70 uppercase tracking-[0.2em] font-medium"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-white/60" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }} />
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════
              SCENE 2: UNDERWATER TEXT (koi fish)
              ════════════════════════════════════ */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: underwaterOpacity, y: underwaterY, scale: underwaterScale }}
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-heading italic text-white mb-5"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
            >
              Dive into my work
            </h2>
            <p
              className="text-sm md:text-lg font-body font-light text-white/80 max-w-md leading-relaxed"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              Explore my projects, education, and transcripts below.
            </p>
            <motion.div className="mt-8">
              <button
                onClick={() => scrollTo("about")}
                className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                Explore Below
                <ChevronDown className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ScrollFrameHero;
