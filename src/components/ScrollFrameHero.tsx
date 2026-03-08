import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";
import BlurText from "./BlurText";

const FRAME_COUNT = 192;
const FRAME_PATH = "/frames/";

// 5-digit zero-padded: 00001.png ... 00192.png
const frameSrc = (n: number) => `${FRAME_PATH}${String(n).padStart(5, "0")}.png`;

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
  const rafRef = useRef<number>(0);

  // Scroll tracking over tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ═══════════════════════════════════════
     TEXT TIMING (scroll progress 0 → 1)
     ═══════════════════════════════════════
     0.00 – 0.08  Hero text fades IN
     0.08 – 0.18  Hero text visible (cherry blossoms)
     0.18 – 0.28  Hero text fades OUT (camera moving)
     0.35 – 0.42  "Scroll deeper" subtle prompt
     0.50 – 0.58  Underwater text fades IN
     0.58 – 0.72  Underwater text visible (koi scene)
     0.72 – 0.82  Underwater text fades OUT
     0.85 – 1.00  Fade to dark → content below
     ═══════════════════════════════════════ */

  // Hero text (above water scene)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.04, 0.18, 0.28], [0, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.04, 0.28], [30, 0, -80]);
  const heroScale = useTransform(scrollYProgress, [0.18, 0.28], [1, 0.95]);

  // Tech stack bar
  const techOpacity = useTransform(scrollYProgress, [0.02, 0.06, 0.16, 0.22], [0, 1, 1, 0]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.02, 0.06, 0.1], [0, 1, 1, 0]);

  // Mid-journey hint
  const midHintOpacity = useTransform(scrollYProgress, [0.32, 0.37, 0.42, 0.47], [0, 0.6, 0.6, 0]);

  // Underwater text
  const underwaterOpacity = useTransform(scrollYProgress, [0.50, 0.58, 0.72, 0.80], [0, 1, 1, 0]);
  const underwaterY = useTransform(scrollYProgress, [0.50, 0.58, 0.80], [50, 0, -40]);
  const underwaterScale = useTransform(scrollYProgress, [0.50, 0.58], [0.96, 1]);

  // Overall canvas darkening for atmosphere
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.55, 0.75, 0.9, 1],
    [0, 0, 0.12, 0.18, 0.12, 0.3, 0.6]
  );

  // Subtle canvas scale for depth (JeskoJets-like zoom effect)
  const canvasScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.03]);

  // Final fade to dark before content
  const exitOverlay = useTransform(scrollYProgress, [0.88, 1], [0, 0.85]);

  // ─── PRELOAD FRAMES ───
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Load first frame immediately for instant visual
    const firstImg = new Image();
    firstImg.src = frameSrc(1);
    firstImg.onload = () => {
      images[0] = firstImg;
      drawFrame(0);
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setLoaded(true);
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

  // ─── CANVAS RESIZE ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded]);

  // ─── DRAW FRAME (object-cover) ───
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cW = canvas.width / dpr;
    const cH = canvas.height / dpr;
    const iW = img.naturalWidth;
    const iH = img.naturalHeight;

    const scale = Math.max(cW / iW, cH / iH);
    const drawW = iW * scale;
    const drawH = iH * scale;
    const x = (cW - drawW) / 2;
    const y = (cH - drawH) / 2;

    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(img, x, y, drawW, drawH);
  }, []);

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // ─── UPDATE FRAME ON SCROLL (with RAF for smoothness) ───
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  return (
    <>
      {/* Tall scrollable container — 800vh = very slow & cinematic */}
      <div ref={containerRef} style={{ height: "800vh" }}>
        {/* Sticky viewport fills the screen */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ─── LOADING SCREEN ─── */}
          {!loaded && (
            <div className="absolute inset-0 z-50 bg-[#07070d] flex flex-col items-center justify-center gap-5">
              <div className="relative w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-blue-400 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-white/30 text-xs font-body tracking-wider uppercase">
                Loading experience · {loadProgress}%
              </p>
            </div>
          )}

          {/* ─── CANVAS ─── */}
          <motion.div style={{ scale: canvasScale }} className="absolute inset-0 origin-center">
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
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
              background: "linear-gradient(to bottom, rgba(7,7,13,0.2) 0%, rgba(7,7,13,1) 80%)",
            }}
          />

          {/* Vignette (always on) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
            }}
          />

          {/* ════════════════════════════════════
              SCENE 1: HERO TEXT (cherry blossoms)
              ════════════════════════════════════ */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          >
            {/* Badge */}
            <motion.div
              className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-4"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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

            {/* Name */}
            <div style={{ filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.6))" }}>
              <BlurText
                text="Hi, I'm Chee Pheng"
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
                delay={100}
                animateBy="words"
                direction="bottom"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              className="mt-5 text-sm md:text-base max-w-xl font-body font-light leading-relaxed text-white/90"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              A Cloud Computing graduate passionate about building modern web and mobile
              applications. Experienced in full-stack development with TypeScript, React,
              Java, and C#.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
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
                <Github
                  className="h-4 w-4"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}
                />
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
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
              <ChevronDown
                className="h-4 w-4 text-white/60"
                style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}
              />
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════
              SCENE 2: MID HINT (water surface)
              ════════════════════════════════════ */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ opacity: midHintOpacity }}
          >
            <p
              className="text-sm md:text-base font-body font-light text-white/80 tracking-wider uppercase"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)", letterSpacing: "0.25em" }}
            >
              Keep scrolling
            </p>
          </motion.div>

          {/* ════════════════════════════════════
              SCENE 3: UNDERWATER TEXT (koi fish)
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

      {/* Smooth transition element: sits right after the scroll container */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(to bottom, #07070d, transparent)",
          marginTop: "-1px",
        }}
      />
    </>
  );
};

export default ScrollFrameHero;
