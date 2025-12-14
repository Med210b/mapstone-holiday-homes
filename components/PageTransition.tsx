// components/PageTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';

const transitionColors = [
  'bg-[#e63946]', // Red (matches the flower in video)
  'bg-[#1a3a5c]', // Deep Blue/Purple (matches the abstract shape)
  'bg-[#cf9f43]', // Gold (matches the leaf)
  'bg-[#ff5a1f]', // Orange (matches the stairs)
];

const anim = {
  initial: {
    y: "100%",
  },
  enter: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1], // Custom bezier for that smooth "luxury" slide
      delay: i * 0.05, // The stagger effect (0.05s delay per column)
    },
  }),
  exit: (i: number) => ({
    y: "-100%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
};

export default function PageTransition({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* The 4 Sliding Columns Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-row h-screen w-screen top-0 left-0">
        {/* We create 4 columns (like the video) */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={anim}
            initial="initial"
            animate="exit" 
            exit="enter" 
            className={`relative h-full w-1/4 ${transitionColors[i]}`} // w-1/4 = 25% width each
          />
        ))}
      </div>

      {/* The Actual Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }} // Wait for columns to clear before showing content
      >
        {children}
      </motion.div>
    </div>
  );
}