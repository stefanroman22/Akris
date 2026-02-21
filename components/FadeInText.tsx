import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLocation } from "react-router-dom";

export const FadeInText = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  const { visitedPaths = new Set() } = useData();
  const { pathname } = useLocation();

  // Check if this path has been visited before
  const hasBeenHereBefore = visitedPaths.has(pathname);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren:  0.12, // Skip stagger if seen before
        delayChildren:  delay 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      // If we've been here before, the "hidden" state is actually the final state
      opacity: hasBeenHereBefore ? 1 : 0,
      y: hasBeenHereBefore ? 0 : 20,
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-x-1 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};