// @ts-nocheck
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Utensils, Waves, Car, Tv, Wind, MapPin, CheckCircle2, BadgeCheck, Zap, ChevronLeft, ChevronRight, X, CalendarCheck } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Lang } from '../types';

// --- TYPES ---
export interface PropertyData {
    id: number;
    title: string;
    location: string;
    images: string[];
    price: string;
    specs: string;
}

// --- DATA: PRICES UPDATED ---
export const getProperties = (lang: Lang): PropertyData[] => [
    {
        id: 1,
        title: lang === 'en' ? "The Address Downtown" : "The Address Centre-ville",
        location: "Downtown Dubai",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
        ],
        price: "AED 1,200 / night",
        specs: "2 Beds • 1,400 sqft"
    },
    {
        id: 2,
        title: lang === 'en' ? "Palm Jumeirah Villa" : "Villa Palm Jumeirah",
        location: "Palm Jumeirah",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512918760532-3edbed72481b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1575517111478-7f60e9715b50?auto=format&fit=crop&w=800&q=80"
        ],
        price: "AED 3,500 / night",
        specs: "5 Beds • Beach Access"
    },
    {
        id: 3,
        title: lang === 'en' ? "Marina Gate Penthouse" : "Marina Gate Penthouse",
        location: "Dubai Marina",
        images: [
            "https://i.postimg.cc/nchK2cxx/1_Untitled_design.png",
            "https://i.postimg.cc/BQn5pQ3G/2_Untitled_design.png",
            "https://i.postimg.cc/GhmPKhR3/3_Untitled_design.png",
            "https://i.postimg.cc/4NxvPNGf/4_Untitled_design.png",
            "https://i.postimg.cc/xTpv4Djs/5_Untitled_design.png",
            "https://i.postimg.cc/MK37F2Zr/6_Untitled_design.png",
            "https://i.postimg.cc/SxX60TjG/7_Untitled_design.png",
            "https://i.postimg.cc/sgBYF61q/8_Untitled_design.png",
            "https://i.postimg.cc/8CMLc7R6/9_Untitled_design.png",
            "https://i.postimg.cc/Xvd9qrfQ/10_Untitled_design.png",
            "https://i.postimg.cc/5tL8yXBL/11_Untitled_design.png",
            "https://i.postimg.cc/nLBqrX43/12_Untitled_design.png"
        ],
        price: "AED 2,100 / night",
        specs: "3 Beds • Marina View"
    },
    {
        id: 4,
        title: lang === 'en' ? "Brand New Luxury Studio" : "Studio",
        location: "Al Furjan",
        images: [
            "https://i.postimg.cc/5NG59J8F/w14.png",
            "https://i.postimg.cc/tCfdRbFW/w15.png",
            "https://i.postimg.cc/tCfdRbF3/w16.png",
            "https://i.postimg.cc/dtXRQFGR/w17.png",
            "https://i.postimg.cc/NfV8GtRx/w18.png",
            "https://i.postimg.cc/xT7GjQLg/w19.png",
            "https://i.postimg.cc/GhNP3Rv7/w2.png",
            "https://i.postimg.cc/yY5h6K0r/w20.png",
            "https://i.postimg.cc/28JdjYnJ/w200.png",
            "https://i.postimg.cc/dtXRQFGz/w21.png",
            "https://i.postimg.cc/y8ZmkGTv/w22.png",
            "https://i.postimg.cc/13qGfdKd/w23.png",
            "https://i.postimg.cc/3xvXdqZs/w24.png",
            "https://i.postimg.cc/sghYvLcR/w3.png",
            "https://i.postimg.cc/HkywVN2d/w300.png",
            "https://i.postimg.cc/K8MPRWNz/w4.png",
            "https://i.postimg.cc/BvfxDCYs/w400.png",
            "https://i.postimg.cc/cJGQYc9L/w5.png",
            "https://i.postimg.cc/6QxdRhj3/w500.png",
            "https://i.postimg.cc/k5Px8y1x/w6.png",
            "https://i.postimg.cc/nLKq1Qg7/w600.png",
            "https://i.postimg.cc/ZqP6Ly2H/w7.png",
            "https://i.postimg.cc/TPjncWFc/w8.png,",
            "https://i.postimg.cc/LskjVZwy/w9.png"
        ],
        price: "AED 399 / night",
        specs: "Studio • 460 sqft"
    },
    {
        id: 5,
        title: lang === 'en' ? "Spacious Executive 1BR" : "1BHK",
        location: "Jumeirah Village Triangle(JVT)",
        images: [
            "https://i.postimg.cc/zBC9J39c/1-cloud.png",
            "https://i.postimg.cc/d1PbPGS3/CLOUD-10.jpg",
            "https://i.postimg.cc/85Q2QLnF/cloud-11.jpg",
            "https://i.postimg.cc/QtG2GcnF/cloud-12.jpg",
            "https://i.postimg.cc/nzbybqwK/cloud-13.png",
            "https://i.postimg.cc/V6QxQXH7/cloud-14.png",
            "https://i.postimg.cc/LXKcKj0Q/cloud-15.png",
            "https://i.postimg.cc/ZR81T011/cloud-18.png",
            "https://i.postimg.cc/Ss6wyjw1/cloud-19.jpg",
            "https://i.postimg.cc/HnTFjdmD/cloud-2.png",
            "https://i.postimg.cc/4d6rJnDG/cloud-21.jpg",
            "https://i.postimg.cc/mDY0bhvT/cloud-23.jpg",
            "https://i.postimg.cc/0QYL8rT8/cloud-25.jpg",
            "https://i.postimg.cc/vTGCDbyG/cloud-26.jpg",
            "https://i.postimg.cc/HnTFjdm5/cloud-27.png",
            "https://i.postimg.cc/zvq438NG/cloud-29.jpg",
            "https://i.postimg.cc/vTXkVk86/cloud-3.png",
            "https://i.postimg.cc/Kc5dwk7v/cloud-30.png",
            "https://i.postimg.cc/GtzVyV3K/cloud-4.png",
            "https://i.postimg.cc/XNgTmGKB/cloud-6.png",
            "https://i.postimg.cc/3rZPV4jD/cloud-7.png",
            "https://i.postimg.cc/bYRKWD0d/CLOUD-8.jpg",
            "https://i.postimg.cc/7PNpdG1N/cloud17.png",
            "https://i.postimg.cc/ry9v30GS/cloud20.jpg",
            "https://i.postimg.cc/Kc5dwk7P/cloud22.jpg",
            "https://i.postimg.cc/05CLFMGn/cloud23.jpg",
            "https://i.postimg.cc/zXX9rzp7/cloud28.png",
            "https://i.postimg.cc/Kvvd2GQ7/cloud31.jpg",
            "https://i.postimg.cc/zXX9rzpF/CLOUD9.jpg"
        ],
        price: "AED 499 / night",
        specs: "1BHK • 549 sqft"
    }
];

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

// ... (Rest of your existing BackgroundGradientAnimation and CometCard code - Keep it here) ...
const BackgroundGradientAnimation = ({ gradientBackgroundStart = "rgb(30, 72, 116)", gradientBackgroundEnd = "rgb(15, 36, 58)", firstColor = "204, 157, 66", secondColor = "30, 72, 116", thirdColor = "204, 157, 66", fourthColor = "30, 72, 116", fifthColor = "255, 255, 255", pointerColor = "204, 157, 66", size = "80%", blendingValue = "hard-light", children, className, interactive = true, containerClassName }: any) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div className={cn("h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]", containerClassName)}>
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div className={cn("gradients-container h-full w-full blur-lg", isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]")}>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:center_center]`, `animate-first`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-400px)]`, `animate-second`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%+400px)]`, `animate-third`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-200px)]`, `animate-fourth`, `opacity-70`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-800px)_calc(50%+800px)]`, `animate-fifth`, `opacity-100`)}></div>
        {interactive && (
          <div ref={interactiveRef} onMouseMove={handleMouseMove} className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`, `opacity-70`)}></div>
        )}
      </div>
    </div>
  );
};

// Fix for TypeScript red lines
const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

const CometCard = ({ rotateDepth = 17.5, translateDepth = 20, className, children }: { rotateDepth?: number; translateDepth?: number; className?: string; children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const touch = e.touches[0];
    const width = rect.width;
    const height = rect.height;
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    const xPct = touchX / width - 0.5;
    const yPct = touchY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const handleTouchEnd = () => { x.set(0); y.set(0); };

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <MotionDiv
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ rotateX, rotateY, translateX, translateY, boxShadow: "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px" }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{ scale: 1.05, z: 50, transition: { duration: 0.2 } }}
        whileTap={{ scale: 1.02, transition: { duration: 0.1 } }}
        className="relative rounded-2xl bg-white"
      >
        {children}
        <MotionDiv className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay" style={{ background: glareBackground, opacity: 0.6 }} transition={{ duration: 0.2 }} />
      </MotionDiv>
    </div>
  );
};


// --- PROPERTY COMPONENTS ---

interface PropertyCardProps {
    prop: PropertyData;
    lang: Lang;
    onBook: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ prop, lang, onBook }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        if (isLightboxOpen) return;
        const timer = setInterval(() => {
             setCurrentImageIndex((prev) => (prev + 1) % prop.images.length);
        }, 4000); 
        return () => clearInterval(timer);
    }, [prop.images.length, isLightboxOpen]);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % prop.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + prop.images.length) % prop.images.length);
    };

    const openLightbox = () => setIsLightboxOpen(true);
    const closeLightbox = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLightboxOpen(false);
    };

    return (
        <>
            <div className="group cursor-pointer overflow-hidden relative rounded-2xl h-full flex flex-col">
                <div className="relative h-64 overflow-hidden bg-stone-50" onClick={openLightbox}>
                    <AnimatePresence mode="popLayout">
                        <MotionImg 
                            key={currentImageIndex}
                            src={prop.images[currentImageIndex]} 
                            alt={prop.title} 
                            loading="lazy"
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, zIndex: -1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                        <button onClick={prevImage} className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full text-mapstone-blue hover:bg-white transition-all">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextImage} className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full text-mapstone-blue hover:bg-white transition-all">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest text-mapstone-blue uppercase shadow-sm z-20 rounded-sm">
                        {prop.location}
                    </div>
                </div>
                <div className="p-6 bg-white flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl text-mapstone-blue group-hover:text-nobel-gold transition-colors">{prop.title}</h3>
                    </div>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-4">{prop.specs}</p>
                    
                    <div className="mt-auto pt-4 border-t border-stone-100">
                        <div className="flex justify-between items-center mb-4">
                             <span className="text-sm font-medium text-stone-600">{prop.price}</span>
                        </div>
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); onBook(prop.id); }}
                            className="w-full flex items-center justify-center gap-2 bg-mapstone-blue text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold transition-colors shadow-md"
                        >
                            <CalendarCheck size={16} />
                            {lang === 'ar' ? 'تحقق من التوفر' : 'Check Availability'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <MotionDiv 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-20 p-2">
                            <X size={40} />
                        </button>

                        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
                            <button onClick={prevImage} className="absolute left-0 md:-left-4 z-20 text-white/70 hover:text-nobel-gold transition-colors p-4">
                                <ChevronLeft size={60} strokeWidth={1} />
                            </button>

                            <MotionImg 
                                key={currentImageIndex}
                                src={prop.images[currentImageIndex]} 
                                alt={prop.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                                onClick={(e: any) => e.stopPropagation()}
                            />

                            <button onClick={nextImage} className="absolute right-0 md:-right-4 z-20 text-white/70 hover:text-nobel-gold transition-colors p-4">
                                <ChevronRight size={60} strokeWidth={1} />
                            </button>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    )
}

export const PropertyShowcase = ({ lang, onBook }: { lang: Lang; onBook: (id: number) => void }) => {
    // We now get the properties from the exported function
    const properties = getProperties(lang);

    return (
        <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(30, 72, 116)"
            gradientBackgroundEnd="rgb(15, 36, 58)"
            firstColor="30, 72, 116"
            secondColor="204, 157, 66"
            thirdColor="30, 72, 116"
            fourthColor="204, 157, 66"
            fifthColor="30, 72, 116"
            pointerColor="204, 157, 66"
        >
            <div className="absolute z-50 inset-0 overflow-y-auto pointer-events-auto">
                <div className="container mx-auto px-6 py-20 lg:py-32">
                    <div className="text-center mb-12">
                        <span className="text-[#cc9d42] font-bold tracking-widest text-xs uppercase mb-2 block animate-in fade-in slide-in-from-bottom-4 duration-700">Locations</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">Curated Residences</h2>
                        <p className="text-white/70 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">Discover our portfolio of exclusive apartments in Dubai's most sought-after neighborhoods.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                        {properties.map((prop, idx) => (
                            <MotionDiv
                                key={prop.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <CometCard className="h-full">
                                    <PropertyCard prop={prop} lang={lang} onBook={onBook} />
                                </CometCard>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
};

export const AmenityGrid = ({ lang }: { lang: Lang }) => {
    const amenities = [
        { icon: <Wifi size={24} />, title: "High-Speed Wi-Fi", desc: "Fiber optic connection" },
        { icon: <Utensils size={24} />, title: "Fully Equipped Kitchen", desc: "Cook like a chef" },
        { icon: <Waves size={24} />, title: "Pool & Gym Access", desc: "Wellness facilities" },
        { icon: <Car size={24} />, title: "Private Parking", desc: "Secure designated spots" },
        { icon: <Tv size={24} />, title: "Smart Entertainment", desc: "Netflix & Satellite TV" },
        { icon: <Wind size={24} />, title: "Premium A/C", desc: "Climate control" },
        { icon: <BadgeCheck size={24} />, title: "24/7 Security", desc: "Concierge & CCTV" },
        { icon: <Zap size={24} />, title: "Hotel-Grade Linens", desc: "Fresh towels & sheets" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 border border-transparent hover:border-stone-100 hover:bg-stone-50 transition-all duration-300 rounded-sm">
                    <div className="mb-4 text-nobel-gold p-3 bg-white shadow-sm rounded-full">
                        {item.icon}
                    </div>
                    <h4 className="font-serif text-mapstone-blue text-sm md:text-base mb-1">{item.title}</h4>
                    <p className="text-stone-400 text-xs font-light">{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export const BookingBenefits = ({ lang }: { lang: Lang }) => {
    const benefits = [
        {
            title: "Best Rate Guarantee",
            desc: "Book directly with us to avoid platform fees and get the lowest price.",
            icon: <CheckCircle2 size={32} />
        },
        {
            title: "Prime Locations",
            desc: "Every property is handpicked for its proximity to Dubai's landmarks.",
            icon: <MapPin size={32} />
        },
        {
            title: "Instant Confirmation",
            desc: "Secure your dates immediately with our streamlined booking process.",
            icon: <Zap size={32} />
        }
    ];

    return (
        <div className="container mx-auto px-6">
            <MotionDiv 
                className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
                }}
            >
                {/* Connecting line for desktop - Animated */}
                <MotionDiv 
                    className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-stone-200 z-0 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                ></MotionDiv>

                {benefits.map((item: any, idx: number) => (
                    <MotionDiv 
                        key={idx} 
                        className="relative z-10 group"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                        }}
                    >
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            {/* Pulse Circle */}
                            <MotionDiv 
                                className="absolute inset-0 rounded-full bg-nobel-gold/10"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                            />
                            {/* Icon Container */}
                            <MotionDiv 
                                className="w-full h-full bg-white border border-stone-100 rounded-full flex items-center justify-center shadow-md text-nobel-gold relative z-10 transition-colors duration-300 group-hover:border-nobel-gold group-hover:text-mapstone-blue"
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                {item.icon}
                            </MotionDiv>
                        </div>
                        <h3 className="font-serif text-xl text-mapstone-blue mb-2">{item.title}</h3>
                        <p className="text-stone-500 text-sm px-4 md:px-8 leading-relaxed">{item.desc}</p>
                    </MotionDiv>
                ))}
            </MotionDiv>
        </div>
    );
};