"use client"
import React from 'react';
import { motion } from 'framer-motion';

const CinematicPage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Video Background */}
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        // REPLACE THIS URL WITH YOUR OWN VIDEO LINK OR LOCAL FILE (e.g., "/my-video.mp4")
        src="https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_30fps.mp4" 
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Optional Center Text */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/80 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4"
        >
          The Mapstone Experience
        </motion.p>
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tight"
        >
          TIMELESS
        </motion.h1>
      </div>
    </div>
  );
};

export default CinematicPage;