// @ts-nocheck
import React, { useState } from "react";
import { Wifi, UtensilsCrossed, Waves, Car, Tv, Wind, Shield, Zap } from 'lucide-react';

// --- TRANSLATIONS FOR AMENITIES ---
const amenitiesData = {
  en: [
    { icon: Wifi, title: "High-Speed Wi-Fi", description: "Fiber optic connection" },
    { icon: UtensilsCrossed, title: "Fully Equipped Kitchen", description: "Cook like a chef" },
    { icon: Waves, title: "Pool & Gym Access", description: "Wellness facilities" },
    { icon: Car, title: "Private Parking", description: "Secure designated spots" },
    { icon: Tv, title: "Smart Entertainment", description: "Netflix & Satellite TV" },
    { icon: Wind, title: "Premium A/C", description: "Climate control" },
    { icon: Shield, title: "24/7 Security", description: "Concierge & CCTV" },
    { icon: Zap, title: "Hotel-Grade Linens", description: "Fresh towels & sheets" },
  ],
  fr: [
    { icon: Wifi, title: "Wi-Fi Haut Débit", description: "Connexion fibre optique" },
    { icon: UtensilsCrossed, title: "Cuisine Équipée", description: "Cuisinez comme un chef" },
    { icon: Waves, title: "Piscine & Salle de Sport", description: "Installations bien-être" },
    { icon: Car, title: "Parking Privé", description: "Places sécurisées" },
    { icon: Tv, title: "Divertissement Smart", description: "Netflix & TV Satellite" },
    { icon: Wind, title: "Climatisation Premium", description: "Contrôle climatique" },
    { icon: Shield, title: "Sécurité 24/7", description: "Concierge & CCTV" },
    { icon: Zap, title: "Linge Qualité Hôtel", description: "Serviettes & draps frais" },
  ],
  es: [
    { icon: Wifi, title: "Wi-Fi de Alta Velocidad", description: "Conexión de fibra óptica" },
    { icon: UtensilsCrossed, title: "Cocina Equipada", description: "Cocina como un chef" },
    { icon: Waves, title: "Acceso a Piscina y Gimnasio", description: "Instalaciones de bienestar" },
    { icon: Car, title: "Estacionamiento Privado", description: "Lugares seguros designados" },
    { icon: Tv, title: "Entretenimiento Inteligente", description: "Netflix y TV Satelital" },
    { icon: Wind, title: "Aire Acondicionado Premium", description: "Control climático" },
    { icon: Shield, title: "Seguridad 24/7", description: "Conserjería y CCTV" },
    { icon: Zap, title: "Ropa de Cama de Hotel", description: "Toallas y sábanas frescas" },
  ],
  de: [
    { icon: Wifi, title: "High-Speed WLAN", description: "Glasfaserverbindung" },
    { icon: UtensilsCrossed, title: "Vollausgestattete Küche", description: "Kochen wie ein Chef" },
    { icon: Waves, title: "Pool & Fitnessstudio", description: "Wellness-Einrichtungen" },
    { icon: Car, title: "Privatparkplatz", description: "Sichere Stellplätze" },
    { icon: Tv, title: "Smart Entertainment", description: "Netflix & Satelliten-TV" },
    { icon: Wind, title: "Premium Klimaanlage", description: "Klimakontrolle" },
    { icon: Shield, title: "24/7 Sicherheit", description: "Concierge & CCTV" },
    { icon: Zap, title: "Hotelbettwäsche", description: "Frische Handtücher & Laken" },
  ],
  ar: [
    { icon: Wifi, title: "واي فاي عالي السرعة", description: "اتصال الألياف البصرية" },
    { icon: UtensilsCrossed, title: "مطبخ مجهز بالكامل", description: "اطبخ كالشيف" },
    { icon: Waves, title: "مسبح وصالة رياضية", description: "مرافق صحية" },
    { icon: Car, title: "موقف سيارات خاص", description: "أماكن مخصصة آمنة" },
    { icon: Tv, title: "ترفيه ذكي", description: "نتفليكس وقنوات فضائية" },
    { icon: Wind, title: "تكييف ممتاز", description: "تحكم بالمناخ" },
    { icon: Shield, title: "أمن 24/7", description: "كونسيرج وكاميرات مراقبة" },
    { icon: Zap, title: "بياضات فندقية", description: "مناشف وملاءات نظيفة" },
  ],
  ru: [
    { icon: Wifi, title: "Высокоскоростной Wi-Fi", description: "Оптоволоконное соединение" },
    { icon: UtensilsCrossed, title: "Полностью оборудованная кухня", description: "Готовьте как шеф-повар" },
    { icon: Waves, title: "Бассейн и спортзал", description: "Оздоровительные удобства" },
    { icon: Car, title: "Частная парковка", description: "Охраняемые места" },
    { icon: Tv, title: "Smart TV", description: "Netflix и спутниковое ТВ" },
    { icon: Wind, title: "Премиум кондиционер", description: "Климат-контроль" },
    { icon: Shield, title: "Круглосуточная охрана", description: "Консьерж и видеонаблюдение" },
    { icon: Zap, title: "Белье отельного качества", description: "Свежие полотенца и простыни" },
  ],
};

// Fallback logic
const getAmenities = (lang: string) => amenitiesData[lang as keyof typeof amenitiesData] || amenitiesData['en'];

function AmenityCard({ amenity, index }: { amenity: any; index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const Icon = amenity.icon;

  return (
    <div
      className="amenity-card-wrapper h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
        animationDelay: `${index * 0.15}s`,
      }}
    >
      <div
        className="amenity-card group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center h-full flex flex-col items-center justify-center border border-white/10 overflow-hidden transition-all duration-700 ease-out cursor-pointer"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateZ(20px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)",
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 30px 60px -12px rgba(184, 153, 104, 0.4), 0 0 80px rgba(184, 153, 104, 0.3)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Effects (Shine, Border, Particles) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b89968]/30 via-transparent to-[#4a6a7c]/30 animate-shine" />
        </div>
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl border-2 border-[#b89968]/50 animate-border-glow" />
        </div>
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-center mb-6">
            <div className="relative transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-[360deg]">
              <Icon className="w-10 h-10 text-[#b89968] relative z-10 drop-shadow-2xl" strokeWidth={1.5} />
              <div className="absolute inset-0 blur-xl bg-[#b89968] opacity-0 group-hover:opacity-80 transition-all duration-700 animate-pulse-slow" />
            </div>
          </div>
          <h3 className="text-white text-lg font-serif mb-2 transition-all duration-500 group-hover:text-[#b89968]">
            {amenity.title}
          </h3>
          <p className="text-white/60 text-sm transition-all duration-500 group-hover:text-white/95">
            {amenity.description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface PremiumAmenitiesProps {
  lang: string;
  onBook: () => void;
}

export default function PremiumAmenities({ lang, onBook }: PremiumAmenitiesProps) {
  const list = getAmenities(lang);
  
  // Texts for headers
  const texts = {
    en: { label: "Services", title: "Premium Amenities", desc: "Every stay includes access to world-class facilities designed for your comfort.", button: "Request Consultation" },
    fr: { label: "Services", title: "Équipements Premium", desc: "Chaque séjour comprend l'accès à des installations de classe mondiale.", button: "Demander une Consultation" },
    es: { label: "Servicios", title: "Comodidades Premium", desc: "Cada estancia incluye acceso a instalaciones de clase mundial.", button: "Solicitar Consulta" },
    de: { label: "Ausstattung", title: "Premium Ausstattung", desc: "Jeder Aufenthalt beinhaltet Zugang zu erstklassigen Einrichtungen.", button: "Beratung Anfordern" },
    ar: { label: "المميزات", title: "وسائل الراحة", desc: "تشمل كل إقامة الوصول إلى مرافق عالمية المستوى.", button: "طلب استشارة" },
    ru: { label: "Удобства", title: "Премиальные удобства", desc: "Каждое проживание включает доступ к удобствам мирового класса.", button: "Запросить консультацию" },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#2c3e50] to-[#8c734b] animate-gradient">
       {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#b89968]/20 via-transparent to-[#4a6a7c]/20 animate-gradient-reverse pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,153,104,0.1),transparent_50%)] animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[#b89968] uppercase tracking-wider text-sm font-medium mb-3">{t.label}</p>
            <h2 className="text-white text-4xl md:text-5xl font-serif italic mb-4">{t.title}</h2>
            <p className="text-white/90 text-base md:text-lg">
              {t.desc}
            </p>
          </div>
          <button
            onClick={onBook}
            className="text-white text-sm font-medium uppercase tracking-wider border-b-2 border-[#b89968] hover:text-[#b89968] transition-colors pb-1 hidden md:block"
          >
            {t.button}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((amenity, index) => (
            <AmenityCard key={index} amenity={amenity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}