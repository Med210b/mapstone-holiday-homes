// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, Building2, TrendingUp, ShieldCheck, Phone, CheckCircle2, Crown, BarChart3, Calendar, Mail, Users } from 'lucide-react';
import { Lang } from '../types';

const MotionDiv = motion.div as any;

const translations = {
    en: {
        title: "Maximize Your Property's Potential",
        subtitle: "Property Management",
        desc: "Partner with MAPSTONE for premium property management. We handle everything from marketing to maintenance, ensuring high occupancy and peace of mind.",
        benefit1: "Higher Occupancy Rates",
        benefit2: "Premium Guest Screening",
        benefit3: "24/7 Property Care",
        formTitle: "List Your Property",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        propType: "Property Type",
        propLoc: "Property Location",
        submit: "Submit Request",
        submitting: "Sending...",
        success: "Request Sent Successfully!",
        types: { apt: "Apartment", villa: "Villa", pent: "Penthouse" },
        vipTitle: "VIP App Access",
        vipDesc: "Stay connected to your investment. Our exclusive Owner App gives you real-time access to your property's performance.",
        list: ["Live Revenue Dashboard", "Real-Time Booking Calendar", "Monthly Performance Reports", "Transparent Expense Tracking"],
        cta: "List Your Property"
    },
    fr: {
        title: "Maximisez le Potentiel de votre Propriété",
        subtitle: "Gestion Immobilière",
        desc: "Associez-vous à MAPSTONE pour une gestion immobilière haut de gamme. Nous gérons tout, du marketing à la maintenance.",
        benefit1: "Taux d'Occupation Élevés",
        benefit2: "Sélection Premium des Invités",
        benefit3: "Entretien 24/7",
        formTitle: "Listez votre Propriété",
        name: "Nom Complet",
        email: "Adresse E-mail",
        phone: "Numéro de Téléphone",
        propType: "Type de Propriété",
        propLoc: "Emplacement",
        submit: "Envoyer la Demande",
        submitting: "Envoi...",
        success: "Demande Envoyée !",
        types: { apt: "Appartement", villa: "Villa", pent: "Penthouse" },
        vipTitle: "Accès VIP à l'Application",
        vipDesc: "Restez connecté à votre investissement. Notre application propriétaire exclusive vous donne un accès en temps réel aux performances de votre propriété.",
        list: ["Tableau de bord des revenus", "Calendrier de réservation", "Rapports mensuels", "Suivi des dépenses"],
        cta: "Listez votre Propriété"
    },
    ar: {
        title: "عظم إمكانات عقارك",
        subtitle: "إدارة العقارات",
        desc: "شراكة مع مابستون لإدارة الممتلكات المتميزة. نحن نتعامل مع كل شيء من التسويق إلى الصيانة.",
        benefit1: "معدلات إشغال أعلى",
        benefit2: "فحص دقيق للضيوف",
        benefit3: "رعاية للعقار 24/7",
        formTitle: "اعرض عقارك معنا",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        propType: "نوع العقار",
        propLoc: "موقع العقار",
        submit: "إرسال الطلب",
        submitting: "جاري الإرسال...",
        success: "تم الإرسال بنجاح!",
        types: { apt: "شقة", villa: "فيلا", pent: "بنثهاوس" },
        vipTitle: "تطبيق كبار الشخصيات",
        vipDesc: "ابق على اتصال باستثمارك من خلال تطبيق الملاك الحصري.",
        list: ["لوحة متابعة الإيرادات", "تقويم الحجوزات المباشر", "تقارير الأداء الشهرية", "تتبع المصاريف بشفافية"],
        cta: "أدرج عقارك معنا"
    }
};

const LandlordsPage = ({ lang, onBook }: { lang: Lang; onBook: () => void }) => {
    const t = translations[lang] || translations['en'];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const isAr = lang === 'ar';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
        }, 1500);
    };

    // Mockup Component
    const OwnerAppMockup = () => (
        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[520px] w-[280px] shadow-2xl flex flex-col justify-start overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 z-20">
            <div className="absolute top-0 w-full h-6 bg-gray-800 z-10 flex justify-center">
                <div className="h-4 w-28 bg-black rounded-b-xl"></div>
            </div>
            <div className="bg-stone-50 flex-1 overflow-hidden font-sans pt-8 px-4 relative">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Welcome Back</p>
                        <h3 className="text-mapstone-blue font-serif text-lg leading-none mb-1">Hi, Owner</h3>
                        <div className="flex items-center gap-1.5 mt-1 bg-nobel-gold/10 px-2 py-0.5 rounded-full border border-nobel-gold/20 w-fit">
                            <Crown size={10} className="text-nobel-gold" />
                            <span className="text-[8px] font-bold text-nobel-gold uppercase tracking-wider">VIP Client</span>
                        </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100" alt="Owner" />
                    </div>
                </div>
                <div className="bg-mapstone-blue text-white p-4 rounded-2xl shadow-lg mb-4 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Total Revenue</p>
                        <h4 className="text-2xl font-serif mb-3">AED 42,500</h4>
                        <div className="flex items-end gap-1 h-12">
                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} className="flex-1 bg-nobel-gold/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 mb-4">
                     <div className="flex justify-between items-center mb-3">
                       <span className="font-bold text-mapstone-blue text-xs">Occupancy</span>
                       <Calendar size={14} className="text-stone-400"/>
                     </div>
                     <div className="grid grid-cols-7 gap-1 text-[8px] text-center font-medium">
                       {[...Array(28)].map((_, i) => (
                           <div key={i} className={`h-5 w-full flex items-center justify-center rounded-sm ${[1,2,3,10,11,12].includes(i) ? 'bg-nobel-gold text-white' : 'bg-stone-100 text-stone-400'}`}>
                             {i+1}
                           </div>
                       ))}
                     </div>
                </div>
            </div>
            <div className="bg-white h-12 flex justify-around items-center px-4 border-t border-stone-100">
                <BarChart3 size={18} className="text-mapstone-blue"/>
                <Calendar size={18} className="text-stone-300"/>
                <Mail size={18} className="text-stone-300"/>
                <Users size={18} className="text-stone-300"/>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <MotionDiv initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-6xl font-serif text-mapstone-blue mb-6">{t.title}</h1>
                        <p className="text-stone-500 text-lg mb-8 leading-relaxed">{t.desc}</p>
                        
                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center text-nobel-gold"><TrendingUp size={24} /></div>
                                <span className="font-serif text-xl text-mapstone-blue">{t.benefit1}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center text-nobel-gold"><ShieldCheck size={24} /></div>
                                <span className="font-serif text-xl text-mapstone-blue">{t.benefit2}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center text-nobel-gold"><Building2 size={24} /></div>
                                <span className="font-serif text-xl text-mapstone-blue">{t.benefit3}</span>
                            </div>
                        </div>
                    </MotionDiv>

                    <MotionDiv initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="bg-white p-10 rounded-xl shadow-xl border border-stone-100">
                            {isSent ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40} /></div>
                                    <h3 className="text-2xl font-serif text-mapstone-blue">{t.success}</h3>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-serif text-mapstone-blue mb-6">{t.formTitle}</h3>
                                    <input type="text" placeholder={t.name} required className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-nobel-gold transition-colors" />
                                    <input type="email" placeholder={t.email} required className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-nobel-gold transition-colors" />
                                    <input type="tel" placeholder={t.phone} required className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-nobel-gold transition-colors" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <select className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-nobel-gold bg-transparent">
                                            <option>{t.types.apt}</option>
                                            <option>{t.types.villa}</option>
                                            <option>{t.types.pent}</option>
                                        </select>
                                        <input type="text" placeholder={t.propLoc} className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-nobel-gold" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-mapstone-blue text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-nobel-gold transition-colors mt-4">
                                        {isSubmitting ? t.submitting : t.submit}
                                    </button>
                                </form>
                            )}
                        </div>
                    </MotionDiv>
                </div>

                {/* VIP SECTION */}
                <div className="bg-mapstone-blue text-white rounded-3xl p-10 relative overflow-hidden">
                     <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className={`order-2 ${isAr ? 'lg:order-2 text-right' : 'lg:order-1'}`}>
                            <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-2 block">{t.subtitle}</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6">{t.vipTitle}</h2>
                            <p className="text-stone-300 leading-relaxed mb-8 text-lg max-w-lg">{t.vipDesc}</p>
                            <ul className="grid grid-cols-1 gap-4 mb-8">
                                {t.list.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-6 h-6 rounded-full bg-nobel-gold/20 flex items-center justify-center text-nobel-gold shrink-0">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    {item}
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}>
                            <OwnerAppMockup />
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default LandlordsPage;