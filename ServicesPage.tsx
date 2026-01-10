// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

// Colors matching the video vibe (Red, Dark Blue, Gold, Orange)
const transitionColors = [
  'bg-[#e63946]', 
  'bg-[#1a3a5c]', 
  'bg-[#cf9f43]', 
  'bg-[#ff5a1f]', 
];

const columnVariants = {
  initial: {
    y: "0%", 
  },
  enter: (i) => ({
    y: "-100%", 
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], 
      delay: i * 0.05, 
    },
  }),
  exit: (i) => ({
    y: "0%", 
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
};

export default function PageTransition({ children }) {
  return (
    // Centering logic is hardcoded here (flex-col items-center justify-center)
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      
      {/* OVERLAY COLUMNS (The sliding animation) */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-row h-screen w-full top-0 left-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={columnVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`relative h-full w-1/4 ${transitionColors[i]}`}
          />
        ))}
      </div>

      {/* PAGE CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}