// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { GeometricLuxuryScene, WhiteLuxuryScene } from './components/QuantumScene';
import { PropertyShowcase, BookingBenefits } from './components/Diagrams';
import PremiumAmenities from './components/PremiumAmenities';
import PageTransition from './components/PageTransition';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import { WhatsAppIcon, LogoBayut, LogoDubizzle, LogoPropertyFinder, LogoBooking, LogoAirbnb } from './components/Icons';
import { PrivacyPolicy, TermsConditions, FAQs } from './components/LegalPages';
import PhilosophyPage from './components/PhilosophyPage'; 
import { ArrowDown, Menu, X, Calendar, Globe, Star, Phone, Mail, ChevronDown, Search, Check, HelpCircle, MapPin, Facebook, Instagram, Smartphone, TrendingUp, Shield, BarChart3, Users, Loader2, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import { Lang, View } from './types';

// Constants for Translations and Data (Keeping these short for readability, don't delete yours!)
const translations = {
  en: {
    name: "English",
    nav: { home: "Home", about: "About", properties: "Properties", landlords: "Landlords", contact: "Contact Us", book: "Book Now", services: "Amenities", calendar: "Availability" },
    hero: { location: "DUBAI • UNITED ARAB EMIRATES", title: "MAPSTONE", subtitle: "Holiday Homes", desc: "Experience the pinnacle of luxury living in Dubai.", cta: "Find Your Stay" },
    about: { label: "Our Philosophy", title: "Luxury Living, Redefined", p1: "MAPSTONE Holiday Homes offers a curated selection.", p2: "We provide a seamless hospitality experience." },
    properties: { label: "Locations", title: "Curated Residences", desc: "Discover our portfolio of exclusive apartments." },
    landlords: { label: "Property Management", title: "For Homeowners", desc: "Maximize your property's potential.", vipTitle: "VIP App Access", vipDesc: "Stay connected to your investment.", list: ["Live Revenue Dashboard", "Real-Time Booking Calendar", "Monthly Performance Reports", "Transparent Expense Tracking"] },
    partners: { title: "Our Partners" },
    amenities: { title: "Premium Amenities", desc: "Every stay includes access to world-class facilities." },
    reviews: { label: "Testimonials", title: "Guest Experiences" },
    footer: { desc: "Premium short-term rental management company in Dubai.", rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms & Conditions", faqs: "FAQS" },
    booking: { title: "Request a Consultation", subtitle: "Leave your details.", name: "Full Name", email: "Email Address", phone: "Phone Number", time: "Booking Details", submit: "SUBMIT", successTitle: "Welcome to the Inner Circle,", successBody: "Your journey starts now." },
    contactPage: { title: "Get in Touch", subtitle: "We are here to assist you.", phoneLabel: "Call Us", emailLabel: "Email Us", locationLabel: "Visit Us", socialLabel: "Follow Us" },
    servicesPage: { title: "Our Services", subtitle: "Solutions.", items: [], app: { title: "VIP", desc: "", features: [] } }
  },
  // ... (Include your FR, ES, DE, AR, RU translations here as normal) ...
  ar: { name: "العربية", nav: { home: "الرئيسية", about: "من نحن", properties: "عقاراتنا", landlords: "الملاك", contact: "تواصل معنا", book: "احجز الآن", services: "المميزات", calendar: "التقويم" }, hero: { location: "دبي", title: "مابستون", subtitle: "بيوت العطلات", desc: "استمتع بقمة الرفاهية", cta: "ابحث" }, about: { label: "فلسفتنا", title: "رفاهية", p1: "نقدم", p2: "تجربة" }, properties: { label: "المواقع", title: "عقارات", desc: "اكتشف" }, landlords: { label: "إدارة", title: "للملاك", desc: "ضاعف", vipTitle: "VIP", vipDesc: "تطبيق", list: [] }, partners: { title: "شركاؤنا" }, amenities: { title: "وسائل الراحة", desc: "مرافق" }, reviews: { label: "آراء", title: "تجارب" }, footer: { desc: "شركة", rights: "حقوق", privacy: "سياسة", terms: "شروط", faqs: "أسئلة" }, booking: { title: "طلب", subtitle: "اترك", name: "الاسم", email: "بريد", phone: "هاتف", time: "تفاصيل", submit: "إرسال", successTitle: "مرحبا", successBody: "رحلتك" }, contactPage: { title: "تواصل", subtitle: "نحن هنا", phoneLabel: "اتصل", emailLabel: "راسلنا", locationLabel: "زورونا", socialLabel: "تابعونا" }, servicesPage: { title: "خدماتنا", subtitle: "حلول", items: [], app: { title: "بوابة", desc: "", features: [] } } }
};

const COUNTRY_CODES = [
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  // ... (Keep full list)
].sort((a, b) => a.country.localeCompare(b.country));

const VideoPreloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
    <video src="/loader.mp4" autoPlay muted playsInline preload="auto" onEnded={onComplete} className="w-full h-full object-cover" />
  </motion.div>
);

const WhatsAppButton = () => (
  <a href="https://api.whatsapp.com/send?phone=971585928787" target="_blank" className="fixed bottom-8 right-8 z-[60] group">
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-100"></span>
    <div className="relative bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"><WhatsAppIcon className="h-8 w-8" /></div>
  </a>
);

const OwnerAppMockup = () => (
  <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[520px] w-[280px] shadow-2xl flex flex-col justify-start overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 z-20">
    <div className="absolute top-0 w-full h-6 bg-gray-800 z-10 flex justify-center"><div className="h-4 w-28 bg-black rounded-b-xl"></div></div>
    <div className="bg-stone-50 flex-1 overflow-hidden font-sans pt-8 px-4 relative">
       <div className="flex items-center justify-between mb-6"><div><h3 className="text-mapstone-blue font-serif text-lg">Hi, Owner</h3></div></div>
       <div className="bg-mapstone-blue text-white p-4 rounded-2xl shadow-lg mb-4"><h4 className="text-2xl font-serif">AED 42,500</h4></div>
       <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100"><p className="text-xs font-bold text-mapstone-blue">Unit Occupied</p></div>
    </div>
  </div>
);

const PartnerLogos = () => (
  <>
    <LogoAirbnb className="h-10 md:h-14 w-auto text-[#FF5A5F] mx-8 md:mx-12" />
    <LogoBooking className="h-8 md:h-10 w-auto text-[#006CE4] mx-8 md:mx-12" />
    <LogoPropertyFinder className="h-10 md:h-14 w-auto text-[#EF5E62] mx-8 md:mx-12" />
    <LogoBayut className="h-10 md:h-14 w-auto text-[#28B16D] mx-8 md:mx-12" />
    <LogoDubizzle className="h-10 md:h-14 w-auto text-[#E50000] mx-8 md:mx-12" />
  </>
);

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
  initialDateRange?: [Date, Date];
  guestCounts?: { adults: number; children: number };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, lang, initialDateRange, guestCounts }) => {
  const t = translations[lang]?.booking || translations['en'].booking;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const generateInitialMessage = () => {
    let msg = "";
    if (initialDateRange && initialDateRange[0] && initialDateRange[1]) {
        msg += `Check-in: ${initialDateRange[0].toDateString()}\nCheck-out: ${initialDateRange[1].toDateString()}\n`;
    }
    if (guestCounts) msg += `Guests: ${guestCounts.adults} Adults, ${guestCounts.children} Children.`;
    return msg;
  };

  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', countryCode: '+971', 
    time: generateInitialMessage() 
  });

  useEffect(() => { setFormData(prev => ({ ...prev, time: generateInitialMessage() })); }, [initialDateRange, guestCounts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const endpoint = "https://formsubmit.co/contact@mapstonegroup.com";
    try {
      await fetch(endpoint, {
        method: "POST", headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: `${formData.countryCode} ${formData.phone}`, details: formData.time })
      });
      setSubmitted(true);
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-mapstone-blue/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative bg-white w-full max-w-lg shadow-2xl rounded-lg overflow-hidden" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-mapstone-blue"><X size={24} /></button>
        {!submitted ? (
          <div className="p-8">
            <h2 className="font-serif text-3xl text-mapstone-blue mb-2 text-center">{t.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              <input type="text" required placeholder={t.name} className="w-full border-b py-2 focus:outline-none focus:border-nobel-gold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" required placeholder={t.email} className="w-full border-b py-2 focus:outline-none focus:border-nobel-gold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <div className="flex gap-2">
                  <span className="py-2 border-b text-stone-500">{formData.countryCode}</span>
                  <input type="tel" required placeholder={t.phone} className="w-full border-b py-2 focus:outline-none focus:border-nobel-gold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <textarea className="w-full border p-2 text-sm rounded bg-stone-50" rows={3} value={formData.time} readOnly />
              <button type="submit" disabled={isSubmitting} className="w-full bg-nobel-gold text-white py-4 font-bold uppercase hover:bg-mapstone-blue transition-colors">
                {isSubmitting ? '...' : t.submit}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center"><h2 className="font-serif text-3xl text-mapstone-blue">{t.successTitle}</h2></div>
        )}
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  
  // --- STATES FOR MODAL FLOW ---
  const [calendarOpen, setCalendarOpen] = useState(false); // New State for Calendar Modal
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date, Date] | undefined>(undefined);
  const [guestCounts, setGuestCounts] = useState<{adults: number, children: number} | undefined>(undefined);

  const t = translations[lang] || translations['en'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'properties', label: t.nav.properties },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === 'about') { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (id === 'properties') { setCurrentView('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (id === 'home') { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // STEP 1: User Clicks "Check Availability" on Property Card
  const handleCheckAvailability = (id: number) => {
    setSelectedPropertyId(id);
    setCalendarOpen(true); // Open Calendar Modal immediately over current view
  };

  // STEP 2: User Selects Dates & Guests in Calendar -> Opens Booking Form
  const handleBookRequest = (dateRange: [Date, Date], guests: { adults: number; children: number }) => {
      setSelectedDateRange(dateRange);
      setGuestCounts(guests);
      setCalendarOpen(false); // Close Calendar
      setBookingOpen(true);   // Open Form
  };

  const handleGeneralBookRequest = () => {
      setSelectedDateRange(undefined);
      setGuestCounts(undefined);
      setBookingOpen(true);
  }

  return (
    <div className={`font-sans text-stone-800 antialiased selection:bg-nobel-gold selection:text-white overflow-x-hidden ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {loading && <VideoPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src="https://i.postimg.cc/qBQmntz0/logo-holiday.png" alt="MAPSTONE" className="h-12 md:h-20 w-auto object-contain transition-all duration-300"/>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-sm font-medium uppercase tracking-wider hover:text-nobel-gold transition-colors ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}>
                {link.label}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="text-white font-bold">{lang.toUpperCase()}</button>
            <button onClick={() => handleGeneralBookRequest()} className="bg-nobel-gold text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg">
              {t.nav.book}
            </button>
          </div>
          <button className={`lg:hidden z-[101] ${scrolled || menuOpen || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <PageTransition key="home">
            <header id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-mapstone-dark border-b border-nobel-gold/20">
              <div className="absolute inset-0 w-full h-full z-0"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/Y9ZFqfLc/69d1fa33-9d37-440c-9d9e-2b73216809f6.png')" }}></div><div className="absolute inset-0 bg-black/30 z-10"></div></div>
              <div className="absolute inset-0 z-0 opacity-60"><GeometricLuxuryScene /></div>
              <div className="container mx-auto px-6 relative z-20 text-center mt-20">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}>
                  <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-white mb-6 uppercase">{t.hero.location}</span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 tracking-tight">{t.hero.title}</h1>
                  <p className="max-w-xl mx-auto text-stone-100 mb-10 text-lg">{t.hero.desc}</p>
                  <button onClick={() => scrollTo('properties')} className="bg-white text-mapstone-blue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white transition-all duration-300">{t.hero.cta}</button>
                </motion.div>
              </div>
            </header>
            <PremiumAmenities lang={lang} onBook={handleGeneralBookRequest} />
            <section className="py-16 bg-stone-50 border-b border-nobel-gold/20"><BookingBenefits lang={lang} /></section>
            <section id="landlords" className="py-24 bg-mapstone-blue text-white relative border-b border-nobel-gold/20">
               <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                   <OwnerAppMockup />
                   <div>
                      <h2 className="text-4xl font-serif mb-6">{t.landlords.title}</h2>
                      <p className="text-stone-300 mb-8">{t.landlords.desc}</p>
                      <button onClick={() => handleGeneralBookRequest()} className="bg-white text-mapstone-blue px-8 py-4 text-xs font-bold uppercase tracking-widest">{lang === 'en' ? 'List Your Property' : 'Listez Votre Propriété'}</button>
                   </div>
               </div>
            </section>
            <section className="py-16 bg-white border-b border-nobel-gold/20 overflow-hidden"><div className="flex animate-marquee whitespace-nowrap"><PartnerLogos /><PartnerLogos /></div></section>
          </PageTransition>
        )}

        {currentView === 'about' && <PageTransition key="about"><PhilosophyPage /></PageTransition>}
        
        {/* PROPERTIES PAGE: Passes the Handler to Open Calendar Modal */}
        {currentView === 'properties' && <PageTransition key="properties"><PropertyShowcase lang={lang} onBook={handleCheckAvailability} /></PageTransition>}
        
        {currentView === 'privacy' && <PageTransition key="privacy"><PrivacyPolicy /></PageTransition>}
        {currentView === 'terms' && <PageTransition key="terms"><TermsConditions /></PageTransition>}
        {currentView === 'faq' && <PageTransition key="faq"><FAQs /></PageTransition>}
      </AnimatePresence>

      <footer id="contact" className="bg-[#204c77] pt-20 pb-10"><div className="container mx-auto px-6"><p className="text-stone-300 text-sm mb-6">{t.footer.desc}</p></div></footer>
      <WhatsAppButton />

      {/* --- CALENDAR MODAL OVERLAY --- */}
      <AnimatePresence>
        {calendarOpen && (
            <motion.div 
                className="fixed inset-0 z-[150] flex items-center justify-center p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCalendarOpen(false)} />
                <AvailabilityCalendar 
                    lang={lang} 
                    onClose={() => setCalendarOpen(false)}
                    onBookRequest={handleBookRequest} 
                    propertyId={selectedPropertyId}
                />
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- BOOKING FORM MODAL --- */}
      <AnimatePresence>
        {bookingOpen && (
          <BookingModal 
            key="booking-modal" 
            isOpen={bookingOpen} 
            onClose={() => setBookingOpen(false)} 
            lang={lang} 
            initialDateRange={selectedDateRange} // PASS RANGE
            guestCounts={guestCounts} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;