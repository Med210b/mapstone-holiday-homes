// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { GeometricLuxuryScene } from './components/QuantumScene';
import { PropertyShowcase, BookingBenefits, getProperties } from './components/Diagrams';
import PremiumAmenities from './components/PremiumAmenities';
import PageTransition from './components/PageTransition';
import AvailabilityCalendar from './components/AvailabilityCalendar'; 
import { CheckoutPage } from './components/CheckoutPage'; 
import LandlordsPage from './components/LandlordsPage';
import ThankYouPage from './components/ThankYouPage'; 
import { WhatsAppIcon, LogoBayut, LogoDubizzle, LogoPropertyFinder, LogoBooking, LogoAirbnb } from './components/Icons';
import { PrivacyPolicy, TermsConditions, FAQs } from './components/LegalPages';
import PhilosophyPage from './components/PhilosophyPage'; 
import { ArrowDown, Menu, X, Globe, MapPin, Phone, Mail, Instagram, Facebook, Star, Utensils, Car, Key } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lang, View } from './types';

const translations = {
  en: {
    name: "English",
    nav: { home: "Home", about: "About", properties: "Properties", landlords: "Landlords", contact: "Contact Us", book: "Book Now", services: "Amenities" },
    hero: { location: "DUBAI • UNITED ARAB EMIRATES", title: "MAPSTONE", subtitle: "Holiday Homes", desc: "Experience the pinnacle of luxury living in Dubai. Premium short-term rentals in the city's most prestigious locations.", cta: "Find Your Stay" },
    about: { label: "Our Philosophy", title: "Luxury Living, Redefined" },
    properties: { label: "Locations", title: "Curated Residences", desc: "Discover our portfolio of exclusive apartments in Dubai's most sought-after neighborhoods." },
    landlords: { label: "Property Management", title: "For Homeowners", desc: "Maximize your property's potential with our comprehensive management services." },
    partners: { title: "Our Partners" },
    amenities: { title: "Premium Amenities", desc: "Every stay includes access to world-class facilities designed for your comfort." },
    footer: { desc: "Premium short-term rental management company in Dubai.", rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms & Conditions", faqs: "FAQS" },
    contactPage: { title: "Get in Touch", subtitle: "We are here to assist you.", phoneLabel: "Call Us", emailLabel: "Email Us", locationLabel: "Visit Us", socialLabel: "Follow Us" },
    booking: { title: "Request a Consultation", subtitle: "Leave your details and our team will contact you shortly." },
  },
  ar: {
    name: "العربية",
    nav: { home: "الرئيسية", about: "من نحن", properties: "عقاراتنا", landlords: "الملاك", contact: "تواصل معنا", book: "احجز الآن", services: "المميزات" },
    hero: { location: "دبي • الإمارات العربية المتحدة", title: "مابستون", subtitle: "بيوت العطلات", desc: "استمتع بقمة الرفاهية في دبي. إيجارات قصيرة الأجل فاخرة في أرقى المواقع.", cta: "ابحث عن إقامتك" },
    about: { label: "فلسفتنا", title: "مفهوم جديد للرفاهية" },
    properties: { label: "المواقع", title: "إقامات مميزة", desc: "اكتشف محفظتنا من الشقق الحصرية في أكثر الأحياء طلباً في دبي." },
    landlords: { label: "إدارة العقارات", title: "لأصحاب المنازل", desc: "ضاعف إمكانات عقارك مع خدمات الإدارة الشاملة لدينا." },
    partners: { title: "شركاؤنا" },
    amenities: { title: "وسائل الراحة", desc: "تشمل كل إقامة الوصول إلى مرافق عالمية المستوى مصممة لراحتك." },
    footer: { desc: "شركة إدارة تأجير قصير الأجل متميزة في دبي.", rights: "جميع الحقوق محفوظة.", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", faqs: "الأسئلة الشائعة" },
    contactPage: { title: "تواصل معنا", subtitle: "نحن هنا لمساعدتك.", phoneLabel: "اتصل بنا", emailLabel: "راسلنا", locationLabel: "زورونا", socialLabel: "تابعونا" },
    booking: { title: "طلب استشارة", subtitle: "اترك بياناتك وسيقوم فريقنا بالاتصال بك قريباً." },
  }
};

const VideoPreloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <video src="/loader.mp4" autoPlay muted playsInline preload="auto" onEnded={onComplete} className="w-full h-full object-cover"/>
    </motion.div>
);

const WhatsAppButton = () => (
  <a href="https://api.whatsapp.com/send?phone=971585928787&text&context=Site" target="_blank" className="fixed bottom-8 right-8 z-[60] group">
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-100"></span>
    <div className="relative bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border-2 border-white/20"><WhatsAppIcon className="h-8 w-8 drop-shadow-md" /></div>
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
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
        setLoading(false); 
        setCurrentView('thankyou'); 
        window.history.replaceState({}, '', window.location.pathname);
    }
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

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (id === 'contact') {
        if (currentView !== 'home') {
            setCurrentView('home');
            setTimeout(() => {
                const footer = document.getElementById('contact');
                if (footer) footer.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const footer = document.getElementById('contact');
            if (footer) footer.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }
    if (id === 'services') {
        if (currentView !== 'home') {
            setCurrentView('home');
            setTimeout(() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    const offset = 80;
                    const elementPosition = servicesSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 100);
        } else {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const offset = 80;
                const elementPosition = servicesSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
        return;
    }
    setCurrentView(id as View);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className={`font-sans text-stone-800 antialiased selection:bg-nobel-gold selection:text-white overflow-x-hidden ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence>{loading && <VideoPreloader onComplete={() => setLoading(false)} />}</AnimatePresence>

      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50 cursor-pointer" onClick={() => handleNavClick('home')}>
            <img src="https://i.postimg.cc/qBQmntz0/logo-holiday.png" alt="MAPSTONE" className="h-12 md:h-20 w-auto object-contain transition-all duration-300"/>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => <button key={link.id} onClick={() => handleNavClick(link.id)} className={`text-sm font-medium uppercase tracking-wider hover:text-nobel-gold transition-colors ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}>{link.label}</button>)}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative lang-dropdown">
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}><Globe size={16} /> {lang.toUpperCase()}</button>
               {langDropdownOpen && <div className="absolute top-full right-0 mt-4 w-32 bg-white shadow-xl p-2 rounded-sm"><button onClick={() => {setLang('en'); setLangDropdownOpen(false)}} className="block w-full text-left p-2 hover:bg-stone-50 text-sm">English</button><button onClick={() => {setLang('fr'); setLangDropdownOpen(false)}} className="block w-full text-left p-2 hover:bg-stone-50 text-sm">Français</button><button onClick={() => {setLang('ar'); setLangDropdownOpen(false)}} className="block w-full text-left p-2 hover:bg-stone-50 text-sm">العربية</button></div>}
            </div>
            <button onClick={() => setBookingOpen(true)} className="bg-nobel-gold text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg">{t.nav.book}</button>
          </div>
          <button className={`lg:hidden z-[201] ${scrolled || menuOpen || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && <motion.div initial={{ opacity: 0, x: lang === 'ar' ? '-100%' : '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: lang === 'ar' ? '-100%' : '100%' }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[200] bg-white flex flex-col justify-center items-center lg:hidden overflow-y-auto"><div className="flex flex-col gap-6 text-center w-full max-w-xs py-10">{navLinks.map(link => <button key={link.id} onClick={() => handleNavClick(link.id)} className="text-2xl font-serif text-mapstone-blue hover:text-nobel-gold transition-colors">{link.label}</button>)}<div className="w-12 h-px bg-stone-200 mx-auto my-4"></div><div className="flex justify-center gap-4 text-sm font-bold text-stone-500"><button onClick={() => { setLang('en'); setMenuOpen(false); }} className={lang === 'en' ? 'text-nobel-gold' : ''}>EN</button><button onClick={() => { setLang('fr'); setMenuOpen(false); }} className={lang === 'fr' ? 'text-nobel-gold' : ''}>FR</button><button onClick={() => { setLang('ar'); setMenuOpen(false); }} className={lang === 'ar' ? 'text-nobel-gold' : ''}>AR</button></div><button onClick={() => { setBookingOpen(true); setMenuOpen(false); }} className="mt-4 bg-nobel-gold text-white px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest">{t.nav.book}</button></div></motion.div>}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'thankyou' && (
            <PageTransition key="thankyou">
                <div className="pt-20">
                    <ThankYouPage onHome={() => setCurrentView('home')} />
                </div>
            </PageTransition>
        )}

        {currentView === 'home' && (
          <PageTransition key="home">
            <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-mapstone-dark border-b border-nobel-gold/20">
              <div className="absolute inset-0 w-full h-full z-0"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/Y9ZFqfLc/69d1fa33-9d37-440c-9d9e-2b73216809f6.png')" }}></div><div className="absolute inset-0 bg-black/30 z-10"></div></div>
              <div className="absolute inset-0 z-0 opacity-60"><GeometricLuxuryScene /></div>
              <div className="container mx-auto px-6 relative z-20 text-center mt-20"><span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-white mb-6 uppercase">{t.hero.location}</span><h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 tracking-tight">{t.hero.title}</h1><p className="text-xl md:text-3xl font-light text-nobel-gold uppercase tracking-[0.3em] mb-8">{t.hero.subtitle}</p><button onClick={() => handleNavClick('properties')} className="group relative overflow-hidden rounded-full bg-white text-mapstone-blue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white hover:shadow-xl transition-all duration-300"><span className="relative z-10 flex items-center gap-2">{t.hero.cta} <ArrowDown size={16} /></span></button></div>
            </header>
            
            {/* AMENITIES SECTION (Original) */}
            <PremiumAmenities lang={lang} onBook={() => setBookingOpen(true)} />

            {/* --- NEW SECTION 1: LUXURY STANDARD --- */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                 <div>
                    <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-3 block">Our Standard</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-mapstone-blue mb-6">Beyond Accommodation</h2>
                    <p className="text-stone-500 leading-relaxed text-lg mb-8">At Mapstone, we don't just provide a place to sleep; we curate a lifestyle. Every property is selected for its architectural significance and interior elegance, ensuring that your stay in Dubai is nothing short of exceptional.</p>
                    <div className="flex gap-8">
                        <div><h4 className="text-3xl font-serif text-nobel-gold mb-1">50+</h4><p className="text-xs uppercase tracking-widest text-stone-400">Properties</p></div>
                        <div><h4 className="text-3xl font-serif text-nobel-gold mb-1">24/7</h4><p className="text-xs uppercase tracking-widest text-stone-400">Support</p></div>
                        <div><h4 className="text-3xl font-serif text-nobel-gold mb-1">9.8</h4><p className="text-xs uppercase tracking-widest text-stone-400">Guest Rating</p></div>
                    </div>
                 </div>
                 <div className="h-[500px] bg-stone-200 rounded-sm overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="Luxury Interior" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                 </div>
              </div>
            </section>

            {/* --- NEW SECTION 2: CONCIERGE SERVICES --- */}
            <section className="py-24 bg-stone-50 border-y border-stone-200">
               <div className="container mx-auto px-6 text-center">
                  <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-3 block">Services</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-mapstone-blue mb-16">Bespoke Concierge</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                     <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100 hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-16 h-16 bg-mapstone-blue/5 rounded-full flex items-center justify-center mx-auto mb-6 text-nobel-gold"><Car size={32} /></div>
                        <h3 className="text-xl font-serif text-mapstone-blue mb-4">Chauffeur Service</h3>
                        <p className="text-stone-400 text-sm leading-relaxed">Arrive in style with our fleet of luxury vehicles and professional drivers available 24/7.</p>
                     </div>
                     <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100 hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-16 h-16 bg-mapstone-blue/5 rounded-full flex items-center justify-center mx-auto mb-6 text-nobel-gold"><Utensils size={32} /></div>
                        <h3 className="text-xl font-serif text-mapstone-blue mb-4">Private Chef</h3>
                        <p className="text-stone-400 text-sm leading-relaxed">Experience fine dining in the privacy of your home with curated menus by top chefs.</p>
                     </div>
                     <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100 hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-16 h-16 bg-mapstone-blue/5 rounded-full flex items-center justify-center mx-auto mb-6 text-nobel-gold"><Star size={32} /></div>
                        <h3 className="text-xl font-serif text-mapstone-blue mb-4">VIP Reservations</h3>
                        <p className="text-stone-400 text-sm leading-relaxed">Priority access to Dubai's most exclusive beach clubs, restaurants, and events.</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* --- NEW SECTION 3: TESTIMONIALS --- */}
            <section className="py-32 bg-mapstone-blue text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
               <div className="container mx-auto px-6 text-center relative z-10">
                  <div className="mb-8 text-nobel-gold opacity-50"><Star size={24} className="inline mx-1"/><Star size={24} className="inline mx-1"/><Star size={24} className="inline mx-1"/><Star size={24} className="inline mx-1"/><Star size={24} className="inline mx-1"/></div>
                  <h2 className="text-3xl md:text-5xl font-serif mb-10 leading-tight max-w-4xl mx-auto">"An absolute masterpiece of hospitality. Mapstone defined our Dubai experience with elegance and precision."</h2>
                  <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-nobel-gold/20 rounded-full flex items-center justify-center text-nobel-gold font-serif font-bold text-lg">J</div>
                      <div className="text-left">
                          <p className="text-white font-bold uppercase tracking-widest text-xs">Jonathan & Sarah</p>
                          <p className="text-white/50 text-xs">London, UK</p>
                      </div>
                  </div>
               </div>
            </section>

            {/* --- NEW SECTION 4: CITY GUIDE --- */}
            <section className="py-24 bg-white">
               <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                  <div className="order-2 md:order-1 h-[600px] grid grid-cols-2 gap-4">
                      <img src="https://images.unsplash.com/photo-1518684079-3c830dcef6c5?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover rounded-sm mt-12 shadow-lg" alt="Dubai City" />
                      <img src="https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover rounded-sm mb-12 shadow-lg" alt="Dubai Beach" />
                  </div>
                  <div className="order-1 md:order-2">
                     <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-3 block">Destination</span>
                     <h2 className="text-4xl md:text-5xl font-serif text-mapstone-blue mb-6">The Heart of Dubai</h2>
                     <p className="text-stone-500 leading-relaxed text-lg mb-8">From the pristine sands of Palm Jumeirah to the vibrant energy of Downtown, our properties place you at the center of the world's most dynamic city. Explore elite dining, world-class shopping, and iconic landmarks just moments from your door.</p>
                     <button onClick={() => handleNavClick('properties')} className="text-mapstone-blue font-bold uppercase tracking-widest text-xs border-b-2 border-nobel-gold pb-1 hover:text-nobel-gold transition-colors">Explore Locations</button>
                  </div>
               </div>
            </section>

            <section className="py-16 bg-stone-50"><BookingBenefits lang={lang} /></section>
            <section className="py-16 bg-white border-b border-nobel-gold/20 overflow-hidden"><div className="container mx-auto px-6 mb-20 text-center"><p className="text-3xl md:text-4xl font-serif text-mapstone-blue">{t.partners.title}</p></div><div className="flex overflow-hidden w-full relative"><div className="flex animate-marquee whitespace-nowrap"><PartnerLogos /><PartnerLogos /><PartnerLogos /><PartnerLogos /></div></div></section>
          </PageTransition>
        )}

        {currentView === 'properties' && <PageTransition key="properties"><div className="pt-20"><PropertyShowcase lang={lang} onBook={handleCheckAvailability} /></div></PageTransition>}
        {currentView === 'about' && <PageTransition key="about"><PhilosophyPage /></PageTransition>}
        {currentView === 'landlords' && <PageTransition key="landlords"><LandlordsPage lang={lang} onBook={() => setBookingOpen(true)} /></PageTransition>}
        {currentView === 'calendar' && <PageTransition key="calendar"><div className="min-h-screen bg-stone-100 pt-32 pb-20 px-4"><div className="container mx-auto"><AvailabilityCalendar lang={lang} onClose={() => setCurrentView('properties')} selectedProperty={selectedProperty} onProceedToCheckout={handleProceedToCheckout} /></div></div></PageTransition>}
        {currentView === 'checkout' && <PageTransition key="checkout"><CheckoutPage lang={lang} onBack={() => setCurrentView('calendar')} bookingData={{ propertyId: selectedProperty?.id, propertyName: selectedProperty?.title, dateRange: bookingDetails?.dateRange, guests: bookingDetails?.guests }} /></PageTransition>}
        {currentView === 'privacy' && <PageTransition key="privacy"><PrivacyPolicy /></PageTransition>}
        {currentView === 'terms' && <PageTransition key="terms"><TermsConditions /></PageTransition>}
        {currentView === 'faq' && <PageTransition key="faq"><FAQs /></PageTransition>}
      </AnimatePresence>

      <footer id="contact" className="bg-[#204c77] pt-20 pb-10">
         <div className="container mx-auto px-6 text-white">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
               <div className="col-span-1"><h3 className="font-serif text-lg mb-4">MAPSTONE</h3><p className="text-sm text-stone-300 mb-6">{t.footer.desc}</p><div className="flex gap-4"><a href="https://www.instagram.com/mapstone_holiday_homes/" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-mapstone-blue transition-colors"><Instagram size={18} className="text-white hover:text-mapstone-blue"/></a><a href="https://www.facebook.com/profile.php?id=61582980871159" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-mapstone-blue transition-colors"><Facebook size={18} className="text-white hover:text-mapstone-blue"/></a></div></div>
               <div><h4 className="font-bold text-white uppercase tracking-widest text-xs mb-4">{t.contactPage.locationLabel}</h4><p className="text-stone-300 text-sm mb-2 flex items-start gap-2"><MapPin size={16} className="shrink-0 mt-0.5" /> <span>Al Barsha First<br/>Dubai, UAE</span></p></div>
               <div><h4 className="font-bold text-white uppercase tracking-widest text-xs mb-4">{t.contactPage.phoneLabel}</h4><p className="text-stone-300 text-sm mb-2 flex items-center gap-2"><Phone size={16} /> +971 58 592 8787</p><p className="text-stone-300 text-sm mb-2 flex items-center gap-2"><Mail size={16} /> contact@mapstonegroup.com</p></div>
               <div><h4 className="font-bold text-white uppercase tracking-widest text-xs mb-4">Links</h4><ul className="space-y-2 text-sm text-stone-300"><li><button onClick={() => handleFooterLinkClick('privacy')} className="hover:text-white transition-colors">{t.footer.privacy}</button></li><li><button onClick={() => handleFooterLinkClick('terms')} className="hover:text-white transition-colors">{t.footer.terms}</button></li><li><button onClick={() => handleFooterLinkClick('faq')} className="hover:text-white transition-colors">{t.footer.faqs}</button></li></ul></div>
            </div>
            <div className="border-t border-white/10 pt-8 flex justify-between items-center text-xs text-stone-400"><p>&copy; {new Date().getFullYear()} MAPSTONE HOLIDAY HOMES RENTAL L.L.C</p><p>{t.footer.rights}</p></div>
         </div>
      </footer>
      <WhatsAppButton />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} lang={lang} />
    </div>
  );
};

export default App;