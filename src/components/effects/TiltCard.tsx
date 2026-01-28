import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  scaleOnHover?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  scaleOnHover = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      scale.set(scaleOnHover);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  if (prefersReducedMotion) {
    return (
      <div className={`transition-shadow duration-300 hover:shadow-card-hover dark:hover:shadow-card-dark-hover ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className="perspective-1000" style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        className={`tilt-card ${className}`}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
