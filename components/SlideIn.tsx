import { motion } from "framer-motion";
import { useData } from "../context/DataContext"; // Use your data context to prevent re-animation
import { useLocation } from "react-router-dom";

export const SlideIn = ({ 
  children, 
  direction = "top", // Change default from "bottom" to "top"
  delay = 0, 
  className = "",
  distance = 50, 
  duration = 0.5,
  stiffness = 100
}) => {
  const { hasSeenHomeAnimations } = useData();
  const { visitedPaths } = useData();
  const { pathname } = useLocation();
  const hasBeenHereBefore = visitedPaths.has(pathname);

  const getInitialPosition = () => {
    // If we've seen animations, start at 100% opacity and 0 position
    if (hasBeenHereBefore) return { opacity: 1, x: 0, y: 0 };

    switch (direction) {
      case "left":
        return { opacity: 0, x: -distance };
      case "right":
        return { opacity: 0, x: distance };
      case "bottom":
        return { opacity: 0, y: distance };
      case "top": // Explicitly handle top
      default:
        return { opacity: 0, y: -distance }; // Negative Y is above the viewport
    }
  };

  const getAnimatePosition = () => ({
    opacity: 1,
    x: 0,
    y: 0
  });

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      transition={{ 
        duration, 
        delay: hasSeenHomeAnimations ? 0 : delay, // Skip delay if already seen
        type: "spring", 
        stiffness 
      }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};