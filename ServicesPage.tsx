// @ts-nocheck
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, TrendingUp, Shield, BarChart3, Users, CheckCircle2, HelpCircle } from 'lucide-react';
import { BackgroundGradientAnimation, CanvasRevealEffect, cn } from './GuestExperiences';

const translations = {
  en: {
    servicesPage: { title: "Our Services", subtitle: "Comprehensive property management solutions crafted for luxury homeowners.", items: [{title: "Listing Optimization", desc: "Professional photography and SEO-optimized descriptions for top rankings on Airbnb, Booking.com, etc."}, {title: "Dynamic Pricing", desc: "AI-driven pricing strategies that adjust daily based on demand and local events."}, {title: "Guest Vetting", desc: "Rigorous screening process to ensure respectful guests and protect your property assets."}, {title: "Maintenance & Upkeep", desc: "Regular inspections, professional cleaning, and 24/7 maintenance support to keep your property impeccable."}], app: { title: "VIP Owner Portal", desc: "Transparency is key. We offer you VIP access to our exclusive Owner App.", features: ["Real-Time Booking Calendar", "Live Revenue Tracking", "Occupancy Reports", "Direct Communication"] } }
  },
  fr: { servicesPage: { title: "Nos Services", subtitle: "Solutions complètes.", items: [{title: "Optimisation", desc: "Photos pro & SEO."}, {title: "Prix Dynamiques", desc: "Prix IA."}, {title: "Sélection Invités", desc: "Processus rigoureux."}, {title: "Maintenance", desc: "Support 24/7."}], app: { title: "Portail Propriétaire", desc: "La transparence est clé.", features: ["Calendrier", "Revenus en direct", "Rapports", "Chat"] } } },
  es: { servicesPage: { title: "Nuestros Servicios", subtitle: "Soluciones completas.", items: [{title: "Optimización", desc: "Fotografía pro & SEO."}, {title: "Precios Dinámicos", desc: "Estrategias IA."}, {title: "Selección de Huéspedes", desc: "Proceso riguroso."}, {title: "Mantenimiento", desc: "Soporte 24/7."}], app: { title: "Portal de Propietarios", desc: "La transparencia es clave.", features: ["Calendario", "Ingresos en vivo", "Informes", "Chat"] } } },
  de: { servicesPage: { title: "Unsere Dienstleistungen", subtitle: "Komplette Lösungen.", items: [{title: "Optimierung", desc: "Profi-Fotos & SEO."}, {title: "Dynamische Preise", desc: "KI-Strategien."}, {title: "Gästeprüfung", desc: "Strenger Prozess."}, {title: "Wartung", desc: "24/7 Support."}], app: { title: "Eigentümerportal", desc: "Transparenz ist der Schlüssel.", features: ["Kalender", "Live-Umsatz", "Berichte", "Chat"] } } },
  ar: { servicesPage: { title: "خدماتنا", subtitle: "حلول إدارة عقارات متكاملة.", items: [{title: "تحسين القوائم", desc: "تصوير احترافي و SEO."}, {title: "تسعير ديناميكي", desc: "استراتيجيات تسعير بالذكاء الاصطناعي."}, {title: "فحص الضيوف", desc: "عملية فحص دقيقة."}, {title: "الصيانة", desc: "دعم وتنظيف 24/7."}], app: { title: "بوابة الملاك", desc: "الشفافية هي المفتاح.", features: ["تقويم فوري", "إيرادات مباشرة", "تقارير الإشغال", "تواصل مباشر"] } } },
  ru: { servicesPage: { title: "Наши услуги", subtitle: "Комплексные решения для управления.", items: [{title: "Оптимизация объявлений", desc: "Профессиональные фото и SEO."}, {title: "Динамическое ценообразование", desc: "Стратегии на основе ИИ."}, {title: "Проверка гостей", desc: "Строгий процесс отбора."}, {title: "Техническое обслуживание", desc: "Поддержка 24/7."}], app: { title: "Портал владельца", desc: "Прозрачность — это ключ.", features: ["Календарь", "Доходы онлайн", "Отчеты", "Чат"] } } }
};

const IconMap: any = {
    "Listing Optimization": TrendingUp, "Dynamic Pricing": BarChart3, "Guest Vetting": Shield, "Maintenance & Upkeep": CheckCircle2, 
    "Optimisation des Annonces": TrendingUp, "Tarification Dynamique": BarChart3, "Sélection des Invités": Shield, "Maintenance et Entretien": CheckCircle2,
    "Optimización": TrendingUp, "Precios Dinámicos": BarChart3, "Selección de Huéspedes": Shield, "Mantenimiento": CheckCircle2,
    "تحسين القوائم": TrendingUp, "تسعير ديناميكي": BarChart3, "فحص الضيوف": Shield, "الصيانة": CheckCircle2,
    "Оптимизация объявлений": TrendingUp, "Динамическое ценообразование": BarChart3, "Проверка гостей": Shield, "Техническое обслуживание": CheckCircle2,
};

function ServiceCard({ item, index, lang }: any) {
    const [hovered, setHovered] = useState(false);
    const IconComponent = IconMap[item.title] || HelpCircle; 
    
    const cardVariants = {
        initial: { scale: 1, y: 0, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' },
        hover: { 
            scale: 1.02, 
            y: -5,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 10 } 
        }
    };
    
    const canvasColors = [[207, 159, 67], [34, 76, 120]]; 
    const canvasBgColor = "bg-[#1A3F68]"; 

    return (
        <motion.div
            className="relative rounded-xl overflow-hidden h-full flex flex-col group/card cursor-pointer bg-mapstone-blue text-white min-h-[250px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            key={index}
        >
            <AnimatePresence>
                 {hovered && (
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 z-0 h-full w-full"
                     >
                        <CanvasRevealEffect 
                            animationSpeed={3} 
                            containerClassName={cn(canvasBgColor)} 
                            colors={canvasColors} 
                            dotSize={2} 
                        />
                        <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/40" />
                    </motion.div>
                 )}
            </AnimatePresence>
            
            <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="p-4 mb-4 rounded-lg bg-nobel-gold text-mapstone-blue w-fit">
                    <IconComponent size={32} />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-nobel-gold">{item.title}</h3>
                <p className="text-stone-300 flex-1 text-base">{item.desc}</p>
            </div>
        </motion.div>
    );
}

export default function ServicesPage({ lang }: any) {
    
    const t = translations[lang] || translations.en; 
    const pageT = t.servicesPage;

    const serviceList = translations.en.servicesPage.items.map((item: any, index: number) => ({
        title: pageT.items[index]?.title || item.title,
        desc: pageT.items[index]?.desc || item.desc,
    }));
    
    return (
        <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(34, 76, 120)" 
            gradientBackgroundEnd="rgb(207, 159, 67)" 
            firstColor="34, 76, 120"
            secondColor="207, 159, 67"
            thirdColor="34, 76, 120"
            fourthColor="207, 159, 67"
            fifthColor="34, 76, 120"
            pointerColor="207, 159, 67"
            containerClassName="py-32 min-h-screen" 
        >
            <div className="max-w-7xl mx-auto px-6 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6 }} 
                    className="text-center mb-16"
                >
                    <p className="text-[#cf9f43] text-sm tracking-widest uppercase mb-3">{pageT.title}</p>
                    <h1 className="font-serif text-white text-4xl md:text-5xl italic">{pageT.subtitle}</h1>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {serviceList.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            <ServiceCard item={item} index={index} lang={lang} />
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto bg-white/10 border border-nobel-gold/10 p-8 md:p-12 rounded-xl backdrop-blur-sm shadow-2xl">
                    <h2 className="text-3xl font-serif text-nobel-gold mb-4 flex items-center gap-3">
                        <Smartphone size={32} />
                        {pageT.app.title}
                    </h2>
                    <p className="text-stone-300 mb-8 max-w-2xl">{pageT.app.desc}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {pageT.app.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 text-lg text-white">
                                <CheckCircle2 size={18} className="text-nobel-gold shrink-0" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
}