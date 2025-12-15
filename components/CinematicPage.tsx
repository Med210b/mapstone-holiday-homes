"use client"
import React from 'react';
import { motion } from 'framer-motion';

const CinematicPage = () => {
  return (
    // Changed to 'relative' so it sits naturally in the scroll order
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <motion.video
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        
        // POINTING TO YOUR LOCAL FILE IN THE PUBLIC FOLDER
        src="/promo.mp4" 
        
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/80 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4"
        >
          The Mapstone Experience
        </motion.p>
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tight"
        >
          TIMELESS
        </motion.h1>
      </div>
    </section>
  );
};

export default CinematicPage;