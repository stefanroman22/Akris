import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      // Smooth fade out when unmounting
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0e1210]"
    >
      <div className="relative flex flex-col items-center">
        
        {/* The Animated Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="h-16 w-16 rounded-full border-2 border-primary/20 border-t-primary"
        />

        {/* The Branding Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col items-center"
        >
          <h2 className="text-xl font-display font-black tracking-widest text-white uppercase">
            Akris
          </h2>
          
          {/* Animated Progress Bar/Line */}
          <div className="mt-2 h-[1px] w-12 overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
          
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">
            Loading Experience
          </p>
        </motion.div>

        {/* Ambient Background Glow (Green Gradient) */}
        <div className="absolute -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;