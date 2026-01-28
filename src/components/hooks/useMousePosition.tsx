import { useState, useEffect, createContext, useContext, type ReactNode } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

const defaultPosition: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
};

const MousePositionContext = createContext<MousePosition>(defaultPosition);

export function MousePositionProvider({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState<MousePosition>(defaultPosition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(clientY / window.innerHeight) * 2 + 1;

      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <MousePositionContext.Provider value={mousePosition}>
      {children}
    </MousePositionContext.Provider>
  );
}

export function useMousePosition(): MousePosition {
  return useContext(MousePositionContext);
}

export function useLocalMousePosition(elementRef: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5, isHovering: false });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setPosition({ x, y, isHovering: true });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0.5, y: 0.5, isHovering: false });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return position;
}
