// components/CountUpNumber.jsx
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const CountUpNumber = ({ from = 0, to, duration = 2, className = "" }) => {
  const ref = useRef(null);
  // Trigger animation when the element is 50px inside the viewport
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const count = useMotionValue(from);
  
  // Convert the floating point number (e.g. 10.53) to an integer (11)
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: duration,
        // "easeOut" makes it start fast and slow down at the end
        ease: "easeOut", 
      });

      return controls.stop;
    }
  }, [inView, from, to, duration, count]);

  return (
    <motion.span 
      ref={ref} 
      className={className}
    >
      {rounded}
    </motion.span>
  );
};