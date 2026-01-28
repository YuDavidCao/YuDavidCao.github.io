import { Suspense, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion, useDeviceCapability } from "../hooks/useReducedMotion";
import { useMousePosition } from "../hooks/useMousePosition";
import { HeroFallback } from "./HeroFallback";
import { GeometricShapes } from "./GeometricShapes";

interface HeroSceneProps {
  isDark: boolean;
}

interface SceneProps {
  isDark: boolean;
  mouseX: number;
  mouseY: number;
}

// Error boundary for Three.js errors
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Scene({ isDark, mouseX, mouseY }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color={isDark ? "#818cf8" : "#6366f1"} />
      <GeometricShapes
        isDark={isDark}
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </>
  );
}

function HeroCanvas({ isDark }: HeroSceneProps) {
  const mousePosition = useMousePosition();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Scene
          isDark={isDark}
          mouseX={mousePosition.normalizedX}
          mouseY={mousePosition.normalizedY}
        />
      </Canvas>
    </div>
  );
}

export function HeroScene({ isDark }: HeroSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isLowPower, isMobile } = useDeviceCapability();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Delay 3D loading until after initial paint
    const timer = setTimeout(() => {
      if (!prefersReducedMotion && !isLowPower && !isMobile) {
        setShouldRender3D(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, isLowPower, isMobile]);

  // Show fallback for mobile, low-power devices, or reduced motion preference
  if (!shouldRender3D) {
    return <HeroFallback isDark={isDark} />;
  }

  return (
    <ErrorBoundary fallback={<HeroFallback isDark={isDark} />}>
      <Suspense fallback={<HeroFallback isDark={isDark} />}>
        <HeroCanvas isDark={isDark} />
      </Suspense>
    </ErrorBoundary>
  );
}
