import { useData } from "@/context/DataContext";
import { motion } from "framer-motion";

export const SlideInFromTop = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      // 1. Initial State: Hidden and shifted UP (-50px)
      initial={{ opacity: 0, y: -50 }}
      
      // 2. Animate when in view
      whileInView={{ opacity: 1, y: 0 }}
      
      // 3. Animation settings (smooth spring or ease)
      transition={{ 
        duration: 0.5, 
        delay: delay, // We use this prop to stagger items!
        type: "spring", 
        stiffness: 100 
      }}
      
      // 4. Only animate once (optional, but recommended for navbars)
      viewport={{ once: true }}
      
      // 5. Merge any custom classes passed in
      className={className}
    >
      {children}
    </motion.div>
  );
};