import { motion, useScroll } from "framer-motion";

// Thin bar pinned to the top of the window that fills as the reader scrolls.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-sepia dark:bg-dark-sepia"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
