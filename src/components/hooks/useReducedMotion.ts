import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useDeviceCapability(): { isLowPower: boolean; isMobile: boolean } {
  const [capability, setCapability] = useState({ isLowPower: false, isMobile: false });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const isLowPower =
      isMobile ||
      navigator.hardwareConcurrency <= 4 ||
      (navigator as { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as { deviceMemory?: number }).deviceMemory! <= 4;

    setCapability({ isLowPower, isMobile });
  }, []);

  return capability;
}
