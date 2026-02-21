// components/SlideInFromRight.jsx
import { motion } from "framer-motion";

export const SlideInFromRight = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      // 1. Initial State: Hidden and shifted RIGHT (50px)
      initial={{ opacity: 0, x: 50 }}
      
      // 2. Animate to original position
      whileInView={{ opacity: 1, x: 0 }}
      
      // 3. Animation settings
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring", 
        stiffness: 100 
      }}
      
      // 4. Animate once
      viewport={{ once: true }}
      
      className={className}
    >
      {children}
    </motion.div>
  );
};