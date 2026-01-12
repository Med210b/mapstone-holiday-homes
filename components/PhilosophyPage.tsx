// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Lang } from '../types';

const MotionDiv = motion.div as any;

const translations = {
    en: {
        title: "The Art of Living",
        p1: "MAPSTONE Holiday Homes was born from a desire to bridge the gap between luxury hospitality and the comfort of home. We believe that a stay in Dubai should be more than just a visit; it should be an experience.",
        p2: "Our philosophy is rooted in detail. From the thread count of our linens to the curation of local art in our living spaces, every element is chosen to evoke a sense of belonging and exclusivity.",
        p3: "We don't just manage properties; we steward lifestyles. Whether you are here for business or leisure, MAPSTONE ensures your environment reflects your standards."
    },
    fr: {
        title: "L'Art de Vivre",
        p1: "MAPSTONE Holiday Homes est né du désir de combler le fossé entre l'hospitalité de luxe et le confort de la maison. Nous pensons qu'un séjour à Dubaï doit être plus qu'une simple visite.",
        p2: "Notre philosophie est ancrée dans le détail. Du nombre de fils de nos draps à la sélection d'art local, chaque élément est choisi pour évoquer un sentiment d'appartenance et d'exclusivité.",
        p3: "Nous ne gérons pas seulement des propriétés ; nous gérons des styles de vie. Que vous soyez ici pour affaires ou pour le plaisir, MAPSTONE veille à ce que votre environnement reflète vos standards."
    },
    ar: {
        title: "فن الحياة",
        p1: "تأسست MAPSTONE بيوت العطلات من رغبة في سد الفجوة بين ضيافة الفنادق الفاخرة وراحة المنزل. نحن نؤمن بأن الإقامة في دبي يجب أن تكون أكثر من مجرد زيارة.",
        p2: "فلسفتنا متجذرة في التفاصيل. من جودة بياضاتنا إلى اختيار الفن المحلي في مساحات المعيشة لدينا، يتم اختيار كل عنصر لإثارة شعور بالانتماء والتميز.",
        p3: "نحن لا ندير العقارات فحسب؛ نحن نرعى أنماط الحياة. سواء كنت هنا للعمل أو الترفيه، تضمن MAPSTONE أن بيئتك تعكس معاييرك."
    }
};

const PhilosophyPage = ({ lang = 'en' }: { lang?: Lang }) => {
    const t = translations[lang] || translations['en'];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <span className="text-nobel-gold font-bold uppercase tracking-[0.2em] text-xs mb-4 block">About Us</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-mapstone-blue mb-12">{t.title}</h1>
                    <div className="w-24 h-1 bg-nobel-gold mx-auto mb-12"></div>
                    <div className="space-y-8 text-stone-500 text-lg leading-loose font-light">
                        <p>{t.p1}</p>
                        <p>{t.p2}</p>
                        <p>{t.p3}</p>
                    </div>
                    <div className="mt-16">
                        {/* Updated Image */}
                        <img 
                            src="https://i.postimg.cc/VL4QXvSx/luxury-Dubai-inspire.png" 
                            alt="Dubai Skyline" 
                            className="w-full h-96 object-cover rounded-sm shadow-2xl transition-all duration-1000 hover:scale-[1.01]" 
                        />
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
};

export default PhilosophyPage;