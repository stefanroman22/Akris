// components/SlideInFromBottom.jsx
import { motion } from "framer-motion";

export const SlideInFromBottom = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      // 1. Initial State: Hidden and shifted DOWN (50px)
      initial={{ opacity: 0, y: 50 }}
      
      // 2. Animate to original position
      whileInView={{ opacity: 1, y: 0 }}
      
      // 3. Animation settings
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring", 
        stiffness: 100 
      }}
      
      // 4. animate once. 
      // 'margin: -50px' means the element must be 50px inside the screen 
      // before it triggers, preventing it from flashing at the very bottom edge.
      viewport={{ once: true }}
      
      className={className}
    >
      {children}
    </motion.div>
  );
};