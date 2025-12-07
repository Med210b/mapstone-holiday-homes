import React, { useState, useEffect } from 'react';
import { Wifi, Utensils, Waves, Car, Tv, Wind, MapPin, ArrowRight, CheckCircle2, BadgeCheck, Zap, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '../types';

interface PropertyCardProps {
    prop: any;
    lang: Lang;
    onBook: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ prop, lang, onBook }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        if (isLightboxOpen) return; // Pause auto-scroll when lightbox is open

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

    const openLightbox = () => {
        setIsLightboxOpen(true);
    };

    const closeLightbox = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLightboxOpen(false);
    };

    return (
        <>
            <div className="group cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm overflow-hidden border border-stone-100 relative">
                <div className="relative h-64 overflow-hidden bg-stone-50" onClick={openLightbox}>
                    <AnimatePresence mode="popLayout">
                        <motion.img 
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
                    
                    {/* Carousel Controls */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                        <button 
                            onClick={prevImage} 
                            className="pointer-events-auto w-14 h-14 flex items-center justify-center bg-white shadow-2xl rounded-full text-mapstone-blue hover:bg-mapstone-blue hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 border border-stone-100 hover:border-nobel-gold"
                            aria-label="Previous Image"
                        >
                            <ChevronLeft size={34} strokeWidth={3} className="ml-[-2px]" />
                        </button>
                        <button 
                            onClick={nextImage} 
                            className="pointer-events-auto w-14 h-14 flex items-center justify-center bg-white shadow-2xl rounded-full text-mapstone-blue hover:bg-mapstone-blue hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 border border-stone-100 hover:border-nobel-gold"
                            aria-label="Next Image"
                        >
                            <ChevronRight size={34} strokeWidth={3} className="mr-[-2px]" />
                        </button>
                    </div>
                    
                    {/* Dots Indicator */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-4 pointer-events-none z-20">
                        <div className="flex gap-1.5 overflow-hidden justify-center w-full">
                            {prop.images.map((_: any, idx: number) => (
                                <div 
                                    key={idx} 
                                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm shrink-0 ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/60'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest text-mapstone-blue uppercase shadow-sm z-20">
                        {prop.location}
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl text-mapstone-blue group-hover:text-nobel-gold transition-colors">{prop.title}</h3>
                    </div>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-4">{prop.specs}</p>
                    <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                            <span className="text-sm font-medium text-stone-600">{prop.price}</span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBook();
                                }}
                                className="text-nobel-gold hover:text-mapstone-blue transition-colors p-2 hover:bg-stone-50 rounded-full"
                            >
                                <ArrowRight size={18} />
                            </button>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        <button 
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-20 p-2"
                        >
                            <X size={40} />
                        </button>

                        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
                            <button 
                                onClick={prevImage}
                                className="absolute left-0 md:-left-4 z-20 text-white/70 hover:text-nobel-gold transition-colors p-4"
                            >
                                <ChevronLeft size={60} strokeWidth={1} />
                            </button>

                            <motion.img 
                                key={currentImageIndex}
                                src={prop.images[currentImageIndex]} 
                                alt={prop.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <button 
                                onClick={nextImage}
                                className="absolute right-0 md:-right-4 z-20 text-white/70 hover:text-nobel-gold transition-colors p-4"
                            >
                                <ChevronRight size={60} strokeWidth={1} />
                            </button>

                             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                                {prop.images.map((_: any, idx: number) => (
                                    <button 
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-nobel-gold w-8' : 'bg-white/40 hover:bg-white'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export const PropertyShowcase = ({ lang, onBook }: { lang: Lang; onBook: () => void }) => {
    const properties = [
        {
            id: 1,
            title: lang === 'en' ? "The Address Downtown" : "The Address Centre-ville",
            location: "Downtown Dubai",
            images: [
                "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
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
                "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512918760532-3edbed72481b?auto=format&fit=crop&w=800&q=80"
            ],
            price: "AED 3,500 / night",
            specs: "5 Beds • Beach Access"
        },
        {
            id: 3,
            title: lang === 'en' ? "Marina Gate Penthouse" : "Penthouse Marina Gate",
            location: "Dubai Marina",
            images: [
                "https://images.unsplash.com/photo-1512632501-a63625052918?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1484154218962-a1c00207099b?auto=format&fit=crop&w=800&q=80"
            ],
            price: "AED 2,100 / night",
            specs: "3 Beds • Marina View"
        },
        {
            id: 4,
            title: lang === 'en' ? "west Wood" : "west Wood",
            location: "Al Furjan",
            images: [
              "https://i.postimg.cc/5y0jxTps/252582.jpg",
              "https://i.postimg.cc/NFMLgSbC/3.jpg",
              "https://i.postimg.cc/tJMJ7km8/6652574.jpg",
              "https://i.postimg.cc/2yKy3GXt/665654.jpg",
              "https://i.postimg.cc/Kjz4ZwQq/68686.jpg",
              "https://i.postimg.cc/SRvRjdtw/799757771_1066x800.webp",
              "https://i.postimg.cc/rsPszjP6/799757772_1066x800.webp",
              "https://i.postimg.cc/WzHzt8fG/image.webp",
              "https://i.postimg.cc/WzHzt8Hc/unnamed.jpg"
            ], 
            price: "AED 500 / night",
            specs: "Studio • 460 sqft"
        },
        {
            id: 5,
            title: lang === 'en' ? "Regina Tower" : "Regina Tower",
            location: "Jumeirah Village Circle"
            images: [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
            ],
            price: "AED 500 / night",
            specs: "Studio • 460 sqft"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
                <PropertyCard key={prop.id} prop={prop} lang={lang} onBook={onBook} />
            ))}
        </div>
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
            <motion.div 
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
                <motion.div 
                    className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-stone-200 z-0 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                ></motion.div>

                {benefits.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        className="relative z-10 group"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                        }}
                    >
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            {/* Pulse Circle */}
                            <motion.div 
                                className="absolute inset-0 rounded-full bg-nobel-gold/10"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                            />
                            {/* Icon Container */}
                            <motion.div 
                                className="w-full h-full bg-white border border-stone-100 rounded-full flex items-center justify-center shadow-md text-nobel-gold relative z-10 transition-colors duration-300 group-hover:border-nobel-gold group-hover:text-mapstone-blue"
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                {item.icon}
                            </motion.div>
                        </div>
                        <h3 className="font-serif text-xl text-mapstone-blue mb-2">{item.title}</h3>
                        <p className="text-stone-500 text-sm px-4 md:px-8 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};