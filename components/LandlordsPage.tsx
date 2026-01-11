// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown, BarChart3, Calendar, Mail, Users } from 'lucide-react';
import { Lang } from '../types';

interface Props {
    lang: Lang;
    onBook: () => void;
}

const LandlordsPage: React.FC<Props> = ({ lang, onBook }) => {
    const isAr = lang === 'ar';
    
    // Translations specific to this page
    const content = {
        en: {
            title: "For Homeowners",
            subtitle: "Property Management",
            desc: "Maximize your property's potential with our comprehensive management services. We handle marketing, guest vetting, and maintenance so you don't have to.",
            vipTitle: "VIP App Access",
            vipDesc: "Stay connected to your investment. Our exclusive Owner App gives you real-time access to your property's performance.",
            list: ["Live Revenue Dashboard", "Real-Time Booking Calendar", "Monthly Performance Reports", "Transparent Expense Tracking"],
            cta: "List Your Property"
        },
        ar: {
            title: "لأصحاب المنازل",
            subtitle: "إدارة العقارات",
            desc: "ضاعف إمكانات عقارك مع خدمات الإدارة الشاملة لدينا. نحن نتولى التسويق وفحص الضيوف والصيانة.",
            vipTitle: "تطبيق كبار الشخصيات",
            vipDesc: "ابق على اتصال باستثمارك من خلال تطبيق الملاك الحصري.",
            list: ["لوحة متابعة الإيرادات", "تقويم الحجوزات المباشر", "تقارير الأداء الشهرية", "تتبع المصاريف بشفافية"],
            cta: "أدرج عقارك معنا"
        }
        // Add other languages as needed, defaulting to EN for now
    };

    const t = content[lang === 'ar' ? 'ar' : 'en'];

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
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 bg-mapstone-blue text-white min-h-screen relative overflow-hidden"
        >
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-nobel-gold/5 hidden lg:block pointer-events-none"></div>
             
             <div className="container mx-auto px-6 relative z-10">
                 <div className="grid lg:grid-cols-2 gap-16 items-center">
                   
                   {/* Text Content */}
                   <div className={`order-2 ${isAr ? 'lg:order-2 text-right' : 'lg:order-1'}`}>
                      <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-2 block">{t.subtitle}</span>
                      <h2 className="text-4xl md:text-5xl font-serif mb-6">{t.title}</h2>
                      <p className="text-stone-300 leading-relaxed mb-8 text-lg max-w-lg">{t.desc}</p>
                      
                      <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10 mb-8">
                        <h3 className="font-serif text-xl mb-3 text-nobel-gold flex items-center gap-2">
                            {t.vipTitle}
                        </h3>
                        <p className="text-sm text-stone-300 mb-6">{t.vipDesc}</p>
                        <ul className="grid grid-cols-1 gap-4">
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
                      
                      <button 
                        onClick={onBook} 
                        className="bg-white text-mapstone-blue px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white transition-colors shadow-lg"
                      >
                          {t.cta}
                      </button>
                   </div>

                   {/* Mockup */}
                   <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}>
                      <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                        <OwnerAppMockup />
                      </div>
                   </div>

                 </div>
             </div>
        </motion.div>
    );
};

export default LandlordsPage;