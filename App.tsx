// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { GeometricLuxuryScene } from './components/QuantumScene';
import { PropertyShowcase, BookingBenefits, getProperties } from './components/Diagrams';
import PremiumAmenities from './components/PremiumAmenities';
import PageTransition from './components/PageTransition';
import AvailabilityCalendar from './components/AvailabilityCalendar'; 
import { CheckoutPage } from './components/CheckoutPage'; 
import LandlordsPage from './components/LandlordsPage';
import { WhatsAppIcon, LogoBayut, LogoDubizzle, LogoPropertyFinder, LogoBooking, LogoAirbnb } from './components/Icons';
import { PrivacyPolicy, TermsConditions, FAQs } from './components/LegalPages';
import PhilosophyPage from './components/PhilosophyPage'; 
import { ArrowDown, Menu, X, Globe, Phone, Mail, ChevronDown, Check, MapPin, Facebook, Instagram } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lang, View } from './types';

// Constants for Translations and Data
const translations = {
  en: {
    name: "English",
    nav: { home: "Home", about: "About", properties: "Properties", landlords: "Landlords", contact: "Contact Us", book: "Book Now", services: "Amenities" },
    hero: {
      location: "DUBAI • UNITED ARAB EMIRATES",
      title: "MAPSTONE",
      subtitle: "Holiday Homes",
      desc: "Experience the pinnacle of luxury living in Dubai. Premium short-term rentals in the city's most prestigious locations.",
      cta: "Find Your Stay"
    },
    landlords: { title: "For Homeowners", desc: "Maximize your property's potential." },
    partners: { title: "Our Partners" },
    footer: { desc: "Premium short-term rental management company in Dubai.", rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms & Conditions", faqs: "FAQS" },
    contactPage: { locationLabel: "Visit Us", phoneLabel: "Call Us" },
    booking: { title: "Request a Consultation", subtitle: "Leave your details and our team will contact you shortly." }
  },
  ar: {
    name: "العربية",
    nav: { home: "الرئيسية", about: "من نحن", properties: "عقاراتنا", landlords: "الملاك", contact: "تواصل معنا", book: "احجز الآن", services: "المميزات" },
    hero: { location: "دبي • الإمارات العربية المتحدة", title: "مابستون", subtitle: "بيوت العطلات", desc: "استمتع بقمة الرفاهية في دبي.", cta: "ابحث عن إقامتك" },
    landlords: { title: "لأصحاب المنازل", desc: "ضاعف إمكانات عقارك." },
    partners: { title: "شركاؤنا" },
    footer: { desc: "شركة إدارة تأجير قصير الأجل متميزة في دبي.", rights: "جميع الحقوق محفوظة.", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", faqs: "الأسئلة الشائعة" },
    contactPage: { locationLabel: "زورونا", phoneLabel: "اتصل بنا" },
    booking: { title: "طلب استشارة", subtitle: "اترك بياناتك وسيقوم فريقنا بالاتصال بك قريباً." }
  }
};

const VideoPreloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <video
        src="/loader.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={onComplete}
        className="w-full h-full object-cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://api.whatsapp.com/send?phone=971585928787&text&context=Site"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[60] group"
    aria-label="Contact on WhatsApp"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-100"></span>
    <div className="relative bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20">
       <WhatsAppIcon className="h-8 w-8 drop-shadow-md" />
    </div>
  </a>
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

const BookingModal: React.FC<any> = ({ isOpen, onClose, lang }) => {
   if(!isOpen) return null;
   return (
       <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
           <div className="bg-white p-8 rounded-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
               <h2 className="text-2xl font-serif text-mapstone-blue mb-4">{translations[lang]?.booking?.title}</h2>
               <p className="text-sm text-stone-500 mb-6">{translations[lang]?.booking?.subtitle}</p>
               <button onClick={onClose} className="w-full bg-stone-100 py-3 font-bold text-xs uppercase tracking-widest">Close</button>
           </div>
       </div>
   )
};

const App = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null); 

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
    { id: 'landlords', label: t.nav.landlords },
    { id: 'contact', label: t.nav.contact },
  ];

  // --- NAVIGATION LOGIC ---
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    
    // 1. Separate Views (These act like different pages)
    if (id === 'landlords') {
        setCurrentView('landlords');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // 2. Main Page Sections (Home, About, Properties)
    if (currentView !== 'home') {
      // If we are on Landlords/Checkout page, go back to Home first
      setCurrentView('home');
      // Wait for Home to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      // If already on Home, just scroll
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleFooterLinkClick = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckAvailability = (id: number) => {
      const allProps = getProperties(lang);
      const prop = allProps.find(p => p.id === id);
      if (prop) {
        setSelectedProperty(prop);
        setCurrentView('calendar');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  const handleProceedToCheckout = (data: any) => {
      setBookingDetails(data);
      setCurrentView('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`font-sans text-stone-800 antialiased selection:bg-nobel-gold selection:text-white overflow-x-hidden ${lang === 'ar' ? 'font-arabic' : ''}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
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
              <button 
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium uppercase tracking-wider hover:text-nobel-gold transition-colors ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative lang-dropdown">
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}>
                <Globe size={16} /> {lang.toUpperCase()}
              </button>
               {langDropdownOpen && (
                  <div className="absolute top-full right-0 mt-4 w-32 bg-white shadow-xl p-2 rounded-sm">
                      <button onClick={() => {setLang('en'); setLangDropdownOpen(false)}} className="block w-full text-left p-2 hover:bg-stone-50 text-sm">English</button>
                      <button onClick={() => {setLang('fr'); setLangDropdownOpen(false)}} className="block w-full text-left p-2 hover:bg-stone-50 text-sm">Français</button>
                      <button onClick={() => {setLang('ar'); setLangDropdownOpen(false)}} className="block w-full text-left p-2 hover:bg-stone-50 text-sm">العربية</button>
                  </div>
               )}
            </div>
            <button onClick={() => setBookingOpen(true)} className="bg-nobel-gold text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg">
              {t.nav.book}
            </button>
          </div>
          <button className={`lg:hidden z-[101] ${scrolled || menuOpen || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* --- MAIN SCROLLABLE HOME PAGE --- */}
        {currentView === 'home' && (
          <PageTransition key="home">
            {/* 1. Hero Section */}
            <header id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-mapstone-dark border-b border-nobel-gold/20">
              <div className="absolute inset-0 w-full h-full z-0">
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/Y9ZFqfLc/69d1fa33-9d37-440c-9d9e-2b73216809f6.png')" }}></div>
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
              <div className="absolute inset-0 z-0 opacity-60"><GeometricLuxuryScene /></div>
              <div className="container mx-auto px-6 relative z-20 text-center mt-20">
                  <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-white mb-6 uppercase">{t.hero.location}</span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 tracking-tight">{t.hero.title}</h1>
                  <p className="text-xl md:text-3xl font-light text-nobel-gold uppercase tracking-[0.3em] mb-8">{t.hero.subtitle}</p>
                  <button onClick={() => scrollTo('properties')} className="group relative overflow-hidden rounded-full bg-white text-mapstone-blue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white hover:shadow-xl transition-all duration-300">
                    <span className="relative z-10 flex items-center gap-2">{t.hero.cta} <ArrowDown size={16} /></span>
                  </button>
              </div>
            </header>

            {/* 2. Amenities Section */}
            <div id="services">
                <PremiumAmenities lang={lang} onBook={() => setBookingOpen(true)} />
            </div>

            {/* 3. Properties Section (Restored to Homepage) */}
            <div id="properties">
                <PropertyShowcase lang={lang} onBook={handleCheckAvailability} />
            </div>

            {/* 4. About Us (Philosophy) */}
            <div id="about">
                <PhilosophyPage />
            </div>

            {/* 5. Benefits & Partners */}
            <section className="py-16 bg-stone-50"><BookingBenefits lang={lang} /></section>
            
            <section className="py-16 bg-white border-b border-nobel-gold/20 overflow-hidden">
              <div className="container mx-auto px-6 mb-20 text-center"><p className="text-3xl md:text-4xl font-serif text-mapstone-blue">{t.partners.title}</p></div>
              <div className="flex overflow-hidden w-full relative">
                <div className="flex animate-marquee whitespace-nowrap"><PartnerLogos /><PartnerLogos /><PartnerLogos /><PartnerLogos /></div>
              </div>
            </section>
          </PageTransition>
        )}

        {/* --- SEPARATE VIEWS --- */}
        
        {currentView === 'landlords' && (
            <PageTransition key="landlords">
                <LandlordsPage lang={lang} onBook={() => setBookingOpen(true)} />
            </PageTransition>
        )}

        {currentView === 'calendar' && (
            <PageTransition key="calendar">
                <div className="min-h-screen bg-stone-100 pt-32 pb-20 px-4">
                    <div className="container mx-auto">
                        <AvailabilityCalendar 
                            lang={lang} 
                            onClose={() => setCurrentView('home')} 
                            selectedProperty={selectedProperty}
                            onProceedToCheckout={handleProceedToCheckout}
                        />
                    </div>
                </div>
            </PageTransition>
        )}

        {currentView === 'checkout' && (
            <PageTransition key="checkout">
                <CheckoutPage 
                    lang={lang} 
                    onBack={() => setCurrentView('calendar')}
                    bookingData={{
                        propertyId: selectedProperty?.id,
                        propertyName: selectedProperty?.title,
                        dateRange: bookingDetails?.dateRange,
                        guests: bookingDetails?.guests
                    }}
                />
            </PageTransition>
        )}

        {currentView === 'privacy' && <PageTransition key="privacy"><PrivacyPolicy /></PageTransition>}
        {currentView === 'terms' && <PageTransition key="terms"><TermsConditions /></PageTransition>}
        {currentView === 'faq' && <PageTransition key="faq"><FAQs /></PageTransition>}

      </AnimatePresence>

      <footer id="contact" className="bg-[#204c77] pt-20 pb-10">
         <div className="container mx-auto px-6 text-white">
            <div className="grid md:grid-cols-3 gap-8">
               <div><h3 className="font-serif text-lg mb-4">MAPSTONE</h3><p className="text-sm text-stone-300">{t.footer.desc}</p></div>
               <div><h4 className="font-bold text-xs uppercase mb-4">Contact</h4><p className="text-sm text-stone-300">contact@mapstonegroup.com</p></div>
               <div><h4 className="font-bold text-xs uppercase mb-4">Legal</h4>
                 <button onClick={() => handleFooterLinkClick('privacy')} className="block text-sm text-stone-300 hover:text-white mb-2">{t.footer.privacy}</button>
                 <button onClick={() => handleFooterLinkClick('terms')} className="block text-sm text-stone-300 hover:text-white">{t.footer.terms}</button>
               </div>
            </div>
         </div>
      </footer>
      <WhatsAppButton />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} lang={lang} />
    </div>
  );
};

export default App;