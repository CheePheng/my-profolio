import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
}

const BlurText = ({
  text,
  className = "",
  delay = 100,
  animateBy = "words",
  direction = "bottom",
}: BlurTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const units = animateBy === "words" ? text.split(" ") : text.split("");
  const yStart = direction === "bottom" ? 50 : -50;

  return (
    <span ref={ref} className={`flex flex-wrap ${className}`}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: yStart }}
          animate={
            inView
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : { filter: "blur(10px)", opacity: 0, y: yStart }
          }
          transition={{
            duration: 0.35,
            delay: (i * delay) / 1000,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.3em" : undefined }}
        >
          {unit}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
