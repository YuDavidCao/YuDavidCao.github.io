import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleFieldProps {
  isDark: boolean;
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
}

export function ParticleField({
  isDark,
  particleCount = 150,
  connectionDistance = 100,
  mouseRadius = 200,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const particleColor = isDark ? "147, 197, 253" : "99, 102, 241";
    const lineColor = isDark ? "147, 197, 253" : "99, 102, 241";

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction - particles are attracted to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius && !prefersReducedMotion) {
          // Attract particles toward cursor
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        } else {
          // Slowly return to base position
          p.x += (p.baseX - p.x) * 0.03;
          p.y += (p.baseY - p.y) * 0.03;
        }

        // Gentle floating motion for base position
        if (!prefersReducedMotion) {
          p.baseX += p.speedX;
          p.baseY += p.speedY;

          // Wrap around edges
          if (p.baseX < -10) p.baseX = dimensions.width + 10;
          if (p.baseX > dimensions.width + 10) p.baseX = -10;
          if (p.baseY < -10) p.baseY = dimensions.height + 10;
          if (p.baseY > dimensions.height + 10) p.baseY = -10;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connection to mouse if close enough
        if (distance < mouseRadius && mouse.x > 0) {
          const opacity = (1 - distance / mouseRadius) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, isDark, particleCount, connectionDistance, mouseRadius, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-radial from-indigo-500/5 via-transparent to-transparent"
              : "bg-gradient-radial from-indigo-400/5 via-transparent to-transparent"
          }`}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}
