import { useEffect, useState } from "react";

interface HeroFallbackProps {
  isDark: boolean;
}

export function HeroFallback({ isDark }: HeroFallbackProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${
          isDark
            ? "bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent"
            : "bg-gradient-radial from-indigo-400/15 via-purple-400/10 to-transparent"
        }`}
        style={{
          top: "-10%",
          left: "-10%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] transition-opacity duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${
          isDark
            ? "bg-gradient-radial from-violet-500/15 via-fuchsia-500/8 to-transparent"
            : "bg-gradient-radial from-violet-400/12 via-fuchsia-400/6 to-transparent"
        }`}
        style={{
          top: "30%",
          right: "-5%",
          animation: "float 10s ease-in-out 1s infinite",
        }}
      />

      <div
        className={`absolute w-[400px] h-[400px] rounded-full blur-[80px] transition-opacity duration-1000 delay-400 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${
          isDark
            ? "bg-gradient-radial from-purple-500/12 via-indigo-500/6 to-transparent"
            : "bg-gradient-radial from-purple-400/10 via-indigo-400/5 to-transparent"
        }`}
        style={{
          bottom: "10%",
          left: "20%",
          animation: "float 12s ease-in-out 2s infinite",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 ${
          isDark ? "opacity-[0.03]" : "opacity-[0.02]"
        }`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px),
                           linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
