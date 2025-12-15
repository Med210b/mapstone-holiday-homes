"use client"
import React from 'react';
import { motion } from 'framer-motion';

const CinematicPage = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <motion.video
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-cover"
        
        // Ensure this matches your file name in the public folder
        src="/promo.mp4" 
        
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Optional: A very light overlay to blend the video edges if needed, otherwise removed */}
      <div className="absolute inset-0 bg-black/10 z-10" />
    </section>
  );
};

export default CinematicPage;