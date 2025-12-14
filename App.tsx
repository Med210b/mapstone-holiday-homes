// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { GeometricLuxuryScene, WhiteLuxuryScene } from './components/QuantumScene';
import { PropertyShowcase, BookingBenefits } from './components/Diagrams';
import PremiumAmenities from './components/PremiumAmenities';
import PageTransition from './components/PageTransition'; 
import { WhatsAppIcon, LogoBayut, LogoDubizzle, LogoPropertyFinder, LogoBooking, LogoAirbnb } from './components/Icons';
import { PrivacyPolicy, TermsConditions, FAQs } from './components/LegalPages';
import { ArrowDown, Menu, X, Calendar, Globe, Star, Phone, Mail, ChevronDown, Search, Check, HelpCircle, MapPin, Facebook, Instagram, Smartphone, TrendingUp, Shield, BarChart3, Users, Loader2, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import { Lang, View } from './types';
import GuestExperiences from './GuestExperiences';

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
    about: {
      label: "Our Philosophy",
      title: "Luxury Living, Redefined",
      p1: "MAPSTONE Holiday Homes offers a curated selection of furnished apartments in Dubai's prime districts. From the vibrant Downtown to the serene Palm Jumeirah, we provide a seamless hospitality experience.",
      p2: "Whether you are visiting for business or leisure, our properties blend hotel-grade amenities with the comfort and privacy of a home."
    },
    properties: { label: "Locations", title: "Curated Residences", desc: "Discover our portfolio of exclusive apartments in Dubai's most sought-after neighborhoods." },
    landlords: {
      label: "Property Management",
      title: "For Homeowners",
      desc: "Maximize your property's potential with our comprehensive management services. We handle marketing, guest vetting, and maintenance.",
      vipTitle: "VIP App Access",
      vipDesc: "Stay connected to your investment. Our exclusive Owner App gives you real-time access to your property's performance.",
      list: ["Live Revenue Dashboard", "Real-Time Booking Calendar", "Monthly Performance Reports", "Transparent Expense Tracking"]
    },
    partners: { title: "Our Partners" },
    amenities: { title: "Premium Amenities", desc: "Every stay includes access to world-class facilities designed for your comfort." },
    reviews: { label: "Testimonials", title: "Guest Experiences" },
    footer: { desc: "Premium short-term rental management company in Dubai.", rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms & Conditions", faqs: "FAQS" },
    booking: { title: "Request a Consultation", subtitle: "Leave your details and our team will contact you shortly.", name: "Full Name", email: "Email Address", phone: "Phone Number", time: "Best Time to Call", submit: "SUBMIT", successTitle: "Welcome to the Inner Circle,", successBody: "Your journey with MAPSTONE starts now. Keep an eye on your inbox." },
    contactPage: { title: "Get in Touch", subtitle: "We are here to assist you with your booking or property management inquiries.", phoneLabel: "Call Us", emailLabel: "Email Us", locationLabel: "Visit Us", socialLabel: "Follow Us" },
    servicesPage: { title: "Our Services", subtitle: "Solutions complètes de gestion immobilière conçues pour les propriétaires de luxe.", items: [{title: "Optimisation des Annonces", desc: "Photographie professionnelle et descriptions optimisées SEO pour un meilleur classement sur Airbnb, Booking.com, etc."}, {title: "Tarification Dynamique", desc: "Stratégies de prix basées sur l'IA qui s'ajustent quotidiennement selon la demande et les événements locaux."}, {title: "Sélection des Invités", desc: "Processus de sélection rigoureux pour garantir des invités respectueux et protéger vos actifs immobiliers."}, {title: "Maintenance et Entretien", desc: "Inspections régulières, nettoyage professionnel et support maintenance 24/7 pour garder votre propriété impeccable."}], app: { title: "Portail Propriétaire VIP", desc: "La transparence est clé. Nous vous offrons un accès VIP à notre application exclusive Propriétaire.", features: ["Calendrier de Réservation en Temps Réel", "Suivi des Revenus en Direct", "Rapports d'Occupation", "Communication Directe"] } }
  },
  fr: {
    name: "Français",
    nav: { home: "Accueil", about: "À propos", properties: "Propriétés", landlords: "Propriétaires", contact: "Nous Contacter", book: "Réserver", services: "Équipements" },
    hero: { location: "DUBAÏ • ÉMIRATS ARABES UNIS", title: "MAPSTONE", subtitle: "Maisons de Vacances", desc: "Découvrez le summum du luxe à Dubaï. Locations à court terme haut de gamme dans les quartiers les plus prestigieux.", cta: "Trouver Votre Séjour" },
    about: { label: "Notre Philosophie", title: "Le Luxe Redéfini", p1: "MAPSTONE Holiday Homes propose une sélection soignée d'appartements meublés dans les meilleurs quartiers de Dubaï. Du dynamique Downtown au serein Palm Jumeirah, nous offrons une expérience d'hospitalité sans faille.", p2: "Que vous visitiez pour affaires ou pour le plaisir, nos propriétés allient des équipements de qualité hôtelière au confort et à l'intimité d'un foyer." },
    properties: { label: "Emplacements", title: "Résidences Curatées", desc: "Découvrez notre portefeuille d'appartements exclusifs dans les quartiers les plus prisés de Dubaï." },
    landlords: { label: "Gestion Immobilière", title: "Pour les Propriétaires", desc: "Maximisez le potentiel de votre propriété avec nos services de gestion complets. Nous gérons le marketing, la sélection des invités et la maintenance.", vipTitle: "Accès App VIP", vipDesc: "Restez connecté à votre investissement. Notre application propriétaire exclusive vous donne un accès en temps réel aux performances de votre propriété.", list: ["Tableau de bord des revenus en direct", "Calendrier de réservation en temps réel", "Rapports de performance mensuels", "Suivi transparent des dépenses"] },
    partners: { title: "Nos Partenaires" },
    amenities: { title: "Équipements Premium", desc: "Chaque séjour comprend l'accès à des installations de classe mondiale conçues pour votre confort." },
    reviews: { label: "Témoignages", title: "Expériences Clients" },
    footer: { desc: "Société de gestion de location à court terme premium à Dubaï.", rights: "Tous droits réservés.", privacy: "Politique de Confidentialité", terms: "Termes et Conditions", faqs: "FAQ" },
    booking: { title: "Demander une Consultation", subtitle: "Laissez vos coordonnées et notre équipe vous contactera sous peu.", name: "Nom Complet", email: "Adresse Email", phone: "Numéro de Téléphone", time: "Meilleur moment pour appeler", submit: "SOUMETTRE", successTitle: "Bienvenue dans le Cercle Intérieur,", successBody: "Votre voyage avec MAPSTONE commence maintenant. Surveillez votre boîte de réception." },
    contactPage: { title: "Contactez-nous", subtitle: "Nous sommes là pour vous aider avec vos demandes de réservation ou de gestion immobilière.", phoneLabel: "Appelez-nous", emailLabel: "Envoyez-nous un email", locationLabel: "Visitez-nous", socialLabel: "Suivez-nous" },
    servicesPage: { title: "Nos Services", subtitle: "Solutions complètes.", items: [{title: "Optimisation", desc: "Photos pro & SEO."}, {title: "Prix Dynamiques", desc: "Prix IA."}, {title: "Sélection Invités", desc: "Processus rigoureux."}, {title: "Maintenance", desc: "Support 24/7."}], app: { title: "Portail Propriétaire", desc: "La transparence est clé.", features: ["Calendrier", "Revenus en direct", "Rapports", "Chat"] } }
  },
  es: {
    name: "Español",
    nav: { home: "Inicio", about: "Nosotros", properties: "Propiedades", landlords: "Propietarios", contact: "Contacto", book: "Reservar", services: "Servicios" },
    hero: { location: "DUBÁI • EMIRATOS ÁRABES UNIDOS", title: "MAPSTONE", subtitle: "Casas Vacacionales", desc: "Experimente el pináculo de la vida de lujo en Dubái. Alquileres premium a corto plazo.", cta: "Buscar Estancia" },
    about: { label: "Nuestra Filosofía", title: "Lujo Redefinido", p1: "MAPSTONE ofrece una selección curada de apartamentos amueblados en los mejores distritos de Dubái.", p2: "Nuestras propiedades combinan servicios de calidad hotelera con la comodidad de un hogar." },
    properties: { label: "Ubicaciones", title: "Residencias Curadas", desc: "Descubra nuestra cartera de apartamentos exclusivos." },
    landlords: { label: "Gestión de Propiedades", title: "Para Propietarios", desc: "Maximice el potencial de su propiedad con nuestros servicios integrales.", vipTitle: "Acceso App VIP", vipDesc: "Manténgase conectado con su inversión.", list: ["Panel de ingresos en vivo", "Calendario en tiempo real", "Informes mensuales", "Rastreo de gastos"] },
    partners: { title: "Nuestros Socios" },
    amenities: { title: "Comodidades Premium", desc: "Cada estancia incluye acceso a instalaciones de clase mundial." },
    reviews: { label: "Testimonios", title: "Experiencias de Huéspedes" },
    footer: { desc: "Empresa de gestión de alquileres premium en Dubái.", rights: "Todos los derechos reservados.", privacy: "Privacidad", terms: "Términos y Condiciones", faqs: "Preguntas" },
    booking: { title: "Solicitar Consulta", subtitle: "Deje sus datos y nuestro equipo le contactará.", name: "Nombre Completo", email: "Correo", phone: "Teléfono", time: "Mejor hora para llamar", submit: "ENVIAR", successTitle: "Bienvenido,", successBody: "Su viaje con MAPSTONE comienza ahora." },
    contactPage: { title: "Contáctenos", subtitle: "Estamos aquí para ayudarle.", phoneLabel: "Llámenos", emailLabel: "Envíenos un email", locationLabel: "Visítenos", socialLabel: "Síganos" },
    servicesPage: { title: "Nuestros Servicios", subtitle: "Soluciones completas.", items: [{title: "Optimización", desc: "Fotografía pro & SEO."}, {title: "Precios Dinámicos", desc: "Estrategias IA."}, {title: "Selección de Huéspedes", desc: "Proceso riguroso."}, {title: "Mantenimiento", desc: "Soporte 24/7."}], app: { title: "Portal de Propietarios", desc: "La transparencia es clave.", features: ["Calendario", "Ingresos en vivo", "Informes", "Chat"] } }
  },
  de: {
    name: "Deutsch",
    nav: { home: "Startseite", about: "Über uns", properties: "Immobilien", landlords: "Eigentümer", contact: "Kontakt", book: "Buchen", services: "Ausstattung" },
    hero: { location: "DUBAI • VEREINIGTE ARABISCHE EMIRATE", title: "MAPSTONE", subtitle: "Ferienwohnungen", desc: "Erleben Sie den Höhepunkt des luxuriösen Wohnens in Dubai. Premium-Kurzzeitvermietungen.", cta: "Aufenthalt Finden" },
    about: { label: "Unsere Philosophie", title: "Luxus Neu Definiert", p1: "MAPSTONE bietet eine kuratierte Auswahl an möblierten Apartments in den besten Vierteln Dubais.", p2: "Unsere Immobilien verbinden hotelähnliche Annehmlichkeiten mit dem Komfort eines Zuhauses." },
    properties: { label: "Standorte", title: "Kuratierte Residenzen", desc: "Entdecken Sie unser Portfolio an exklusiven Apartments." },
    landlords: { label: "Immobilienverwaltung", title: "Für Eigentümer", desc: "Maximieren Sie das Potenzial Ihrer Immobilie mit unseren umfassenden Dienstleistungen.", vipTitle: "VIP App Zugang", vipDesc: "Bleiben Sie mit Ihrer Investition verbunden.", list: ["Live-Umsatz-Dashboard", "Echtzeit-Buchungskalender", "Monatliche Berichte", "Ausgabenverfolgung"] },
    partners: { title: "Unsere Partner" },
    amenities: { title: "Premium Ausstattung", desc: "Jeder Aufenthalt beinhaltet Zugang zu erstklassigen Einrichtungen." },
    reviews: { label: "Bewertungen", title: "Gästeerlebnisse" },
    footer: { desc: "Premium-Kurzzeitvermietungsmanagement in Dubai.", rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz", terms: "AGB", faqs: "FAQ" },
    booking: { title: "Beratung Anfordern", subtitle: "Hinterlassen Sie Ihre Daten, unser Team kontaktiert Sie.", name: "Vollständiger Name", email: "E-Mail", phone: "Telefon", time: "Beste Anrufzeit", submit: "ABSENDEN", successTitle: "Willkommen,", successBody: "Ihre Reise mit MAPSTONE beginnt jetzt." },
    contactPage: { title: "Kontaktieren Sie uns", subtitle: "Wir sind hier, um zu helfen.", phoneLabel: "Anrufen", emailLabel: "E-Mail senden", locationLabel: "Besuchen Sie uns", socialLabel: "Folgen Sie uns" },
    servicesPage: { title: "Unsere Dienstleistungen", subtitle: "Komplette Lösungen.", items: [{title: "Optimierung", desc: "Profi-Fotos & SEO."}, {title: "Dynamische Preise", desc: "KI-Strategien."}, {title: "Gästeprüfung", desc: "Strenger Prozess."}, {title: "Wartung", desc: "24/7 Support."}], app: { title: "Eigentümerportal", desc: "Transparenz ist der Schlüssel.", features: ["Kalender", "Live-Umsatz", "Berichte", "Chat"] } }
  },
  ar: {
    name: "العربية",
    nav: { home: "الرئيسية", about: "من نحن", properties: "عقاراتنا", landlords: "الملاك", contact: "تواصل معنا", book: "احجز الآن", services: "المميزات" },
    hero: { location: "دبي • الإمارات العربية المتحدة", title: "مابستون", subtitle: "بيوت العطلات", desc: "استمتع بقمة الرفاهية في دبي. إيجارات قصيرة الأجل فاخرة في أرقى المواقع.", cta: "ابحث عن إقامتك" },
    about: { label: "فلسفتنا", title: "مفهوم جديد للرفاهية", p1: "تقدم مابستون مجموعة مختارة من الشقق المفروشة في أرقى أحياء دبي. من وسط المدينة النابض بالحياة إلى نخلة جميرا الهادئة.", p2: "تجمع عقاراتنا بين وسائل الراحة الفندقية وخصوصية المنزل." },
    properties: { label: "المواقع", title: "إقامات مميزة", desc: "اكتشف محفظتنا من الشقق الحصرية في أكثر الأحياء طلباً في دبي." },
    landlords: { label: "إدارة العقارات", title: "لأصحاب المنازل", desc: "ضاعف إمكانات عقارك مع خدمات الإدارة الشاملة لدينا.", vipTitle: "تطبيق كبار الشخصيات", vipDesc: "ابق على اتصال باستثمارك من خلال تطبيق الملاك الحصري.", list: ["لوحة متابعة الإيرادات", "تقويم الحجوزات المباشر", "تقارير الأداء الشهرية", "تتبع المصاريف بشفافية"] },
    partners: { title: "شركاؤنا" },
    amenities: { title: "وسائل الراحة", desc: "تشمل كل إقامة الوصول إلى مرافق عالمية المستوى مصممة لراحتك." },
    reviews: { label: "آراء الضيوف", title: "تجارب الضيوف" },
    footer: { desc: "شركة إدارة تأجير قصير الأجل متميزة في دبي.", rights: "جميع الحقوق محفوظة.", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", faqs: "الأسئلة الشائعة" },
    booking: { title: "طلب استشارة", subtitle: "اترك بياناتك وسيقوم فريقنا بالاتصال بك قريباً.", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف", time: "أفضل وقت للاتصال", submit: "إرسال", successTitle: "مرحباً بك في الدائرة المقربة،", successBody: "رحلتك مع مابستون تبدأ الآن." },
    contactPage: { title: "تواصل معنا", subtitle: "نحن هنا لمساعدتك في استفساراتك.", phoneLabel: "اتصل بنا", emailLabel: "راسلنا", locationLabel: "زورونا", socialLabel: "تابعونا" },
    servicesPage: { title: "خدماتنا", subtitle: "حلول إدارة عقارات متكاملة.", items: [{title: "تحسين القوائم", desc: "تصوير احترافي و SEO."}, {title: "تسعير ديناميكي", desc: "استراتيجيات تسعير بالذكاء الاصطناعي."}, {title: "فحص الضيوف", desc: "عملية فحص دقيقة."}, {title: "الصيانة", desc: "دعم وتنظيف 24/7."}], app: { title: "بوابة الملاك", desc: "الشفافية هي المفتاح.", features: ["تقويم فوري", "إيرادات مباشرة", "تقارير الإشغال", "تواصل مباشر"] } }
  },
  ru: {
    name: "Русский",
    nav: { home: "Главная", about: "О нас", properties: "Объекты", landlords: "Собственникам", contact: "Контакты", book: "Забронировать", services: "Удобства" },
    hero: { location: "ДУБАЙ • ОБЪЕДИНЕННЫЕ АРАБСКИЕ ЭМИРАТЫ", title: "MAPSTONE", subtitle: "Дома для отдыха", desc: "Испытайте вершину роскошной жизни в Дубае. Премиальная краткосрочная аренда в самых престижных районах города.", cta: "Найти жилье" },
    about: { label: "Наша философия", title: "Новое определение роскоши", p1: "MAPSTONE предлагает избранную коллекцию меблированных апартаментов в лучших районах Дубая. От оживленного центра до безмятежной Пальмы Джумейра.", p2: "Наши объекты сочетают в себе удобства гостиничного класса с комфортом и уединением дома." },
    properties: { label: "Районы", title: "Избранные резиденции", desc: "Откройте для себя наше портфолио эксклюзивных апартаментов в самых востребованных районах Дубая." },
    landlords: { label: "Управление недвижимостью", title: "Для владельцев", desc: "Максимизируйте потенциал вашей недвижимости с нашими комплексными услугами управления.", vipTitle: "VIP-доступ к приложению", vipDesc: "Оставайтесь на связи с вашими инвестициями через наше эксклюзивное приложение для владельцев.", list: ["Панель доходов в реальном времени", "Календарь бронирований онлайн", "Ежемесячные отчеты об эффективности", "Прозрачное отслеживание расходов"] },
    partners: { title: "Наши партнеры" },
    amenities: { title: "Премиальные удобства", desc: "Каждое проживание включает доступ к удобствам мирового класса, созданным для вашего комфорта." },
    reviews: { label: "Отзывы", title: "Впечатления гостей" },
    footer: { desc: "Премиальная управляющая компания по краткосрочной аренде в Дубае.", rights: "Все права защищены.", privacy: "Политика конфиденциальности", terms: "Условия использования", faqs: "FAQ" },
    booking: { title: "Запросить консультацию", subtitle: "Оставьте свои данные, и наша команда свяжется с вами в ближайшее время.", name: "ФИО", email: "Email", phone: "Номер телефона", time: "Лучшее время для звонка", submit: "ОТПРАВИТЬ", successTitle: "Добро пожаловать,", successBody: "Ваше путешествие с MAPSTONE начинается сейчас." },
    contactPage: { title: "Свяжитесь с нами", subtitle: "Мы здесь, чтобы помочь вам с бронированием или вопросами управления.", phoneLabel: "Позвонить", emailLabel: "Написать Email", locationLabel: "Наш офис", socialLabel: "Подписаться" },
    servicesPage: { title: "Наши услуги", subtitle: "Комплексные решения для управления.", items: [{title: "Оптимизация объявлений", desc: "Профессиональные фото и SEO."}, {title: "Динамическое ценообразование", desc: "Стратегии на основе ИИ."}, {title: "Проверка гостей", desc: "Строгий процесс отбора."}, {title: "Техническое обслуживание", desc: "Поддержка 24/7."}], app: { title: "Портал владельца", desc: "Прозрачность — это ключ.", features: ["Календарь", "Доходы онлайн", "Отчеты", "Чат"] } }
  }
};

const COUNTRY_CODES = [
    { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
    { code: "+355", country: "Albania", flag: "🇦🇱" },
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+1-684", country: "American Samoa", flag: "🇦🇸" },
    { code: "+376", country: "Andorra", flag: "🇦🇩" },
    { code: "+244", country: "Angola", flag: "🇦🇴" },
    { code: "+1-264", country: "Anguilla", flag: "🇦🇮" },
    { code: "+672", country: "Antarctica", flag: "🇦🇶" },
    { code: "+1-268", country: "Antigua and Barbuda", flag: "🇦🇬" },
    { code: "+54", country: "Argentina", flag: "🇦🇷" },
    { code: "+374", country: "Armenia", flag: "🇦🇲" },
    { code: "+297", country: "Aruba", flag: "🇦🇼" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+43", country: "Austria", flag: "🇦🇹" },
    { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
    { code: "+1-242", country: "Bahamas", flag: "🇧🇸" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+1-246", country: "Barbados", flag: "🇧🇧" },
    { code: "+375", country: "Belarus", flag: "🇧🇾" },
    { code: "+32", country: "Belgium", flag: "🇧🇪" },
    { code: "+501", country: "Belize", flag: "🇧🇿" },
    { code: "+229", country: "Benin", flag: "🇧🇯" },
    { code: "+1-441", country: "Bermuda", flag: "🇧🇲" },
    { code: "+975", country: "Bhutan", flag: "🇧🇹" },
    { code: "+591", country: "Bolivia", flag: "🇧🇴" },
    { code: "+387", country: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { code: "+267", country: "Botswana", flag: "🇧🇼" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴" },
    { code: "+1-284", country: "British Virgin Islands", flag: "🇻🇬" },
    { code: "+673", country: "Brunei", flag: "🇧🇳" },
    { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
    { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
    { code: "+257", country: "Burundi", flag: "🇧🇮" },
    { code: "+855", country: "Cambodia", flag: "🇰🇭" },
    { code: "+237", country: "Cameroon", flag: "🇨🇲" },
    { code: "+1", country: "Canada", flag: "🇨🇦" },
    { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
    { code: "+1-345", country: "Cayman Islands", flag: "🇰🇾" },
    { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
    { code: "+235", country: "Chad", flag: "🇹🇩" },
    { code: "+56", country: "Chile", flag: "🇨🇱" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+61", country: "Christmas Island", flag: "🇨🇽" },
    { code: "+61", country: "Cocos (Keeling) Islands", flag: "🇨🇨" },
    { code: "+57", country: "Colombia", flag: "🇨🇴" },
    { code: "+269", country: "Comoros", flag: "🇰🇲" },
    { code: "+682", country: "Cook Islands", flag: "🇨🇰" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+385", country: "Croatia", flag: "🇭🇷" },
    { code: "+53", country: "Cuba", flag: "🇨🇺" },
    { code: "+599", country: "Curacao", flag: "🇨🇼" },
    { code: "+357", country: "Cyprus", flag: "🇨🇾" },
    { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
    { code: "+243", country: "Democratic Republic of the Congo", flag: "🇨🇩" },
    { code: "+45", country: "Denmark", flag: "🇩🇰" },
    { code: "+253", country: "Djibouti", flag: "🇩🇯" },
    { code: "+1-767", country: "Dominica", flag: "🇩🇲" },
    { code: "+1-809", country: "Dominican Republic", flag: "🇩🇴" },
    { code: "+670", country: "East Timor", flag: "🇹🇱" },
    { code: "+593", country: "Ecuador", flag: "🇪🇨" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+503", country: "El Salvador", flag: "🇸🇻" },
    { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
    { code: "+291", country: "Eritrea", flag: "🇪🇷" },
    { code: "+372", country: "Estonia", flag: "🇪🇪" },
    { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "+500", country: "Falkland Islands", flag: "🇫🇰" },
    { code: "+298", country: "Faroe Islands", flag: "🇫🇴" },
    { code: "+679", country: "Fiji", flag: "🇫🇯" },
    { code: "+358", country: "Finland", flag: "🇫🇮" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+594", country: "French Guiana", flag: "🇬🇫" },
    { code: "+689", country: "French Polynesia", flag: "🇵🇫" },
    { code: "+241", country: "Gabon", flag: "🇬🇦" },
    { code: "+220", country: "Gambia", flag: "🇬🇲" },
    { code: "+995", country: "Georgia", flag: "🇬🇪" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
    { code: "+30", country: "Greece", flag: "🇬🇷" },
    { code: "+299", country: "Greenland", flag: "🇬🇱" },
    { code: "+1-473", country: "Grenada", flag: "🇬🇩" },
    { code: "+1-671", country: "Guam", flag: "🇬🇺" },
    { code: "+502", country: "Guatemala", flag: "🇬🇹" },
    { code: "+44-1481", country: "Guernsey", flag: "🇬🇬" },
    { code: "+224", country: "Guinea", flag: "🇬🇳" },
    { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
    { code: "+592", country: "Guyana", flag: "🇬🇾" },
    { code: "+509", country: "Haiti", flag: "🇭🇹" },
    { code: "+504", country: "Honduras", flag: "🇭🇳" },
    { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
    { code: "+36", country: "Hungary", flag: "🇭🇺" },
    { code: "+354", country: "Iceland", flag: "🇮🇸" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+98", country: "Iran", flag: "🇮🇷" },
    { code: "+964", country: "Iraq", flag: "🇮🇶" },
    { code: "+353", country: "Ireland", flag: "🇮🇪" },
    { code: "+44-1624", country: "Isle of Man", flag: "🇮🇲" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+225", country: "Ivory Coast", flag: "🇨🇮" },
    { code: "+1-876", country: "Jamaica", flag: "🇯🇲" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+44-1534", country: "Jersey", flag: "🇯🇪" },
    { code: "+962", country: "Jordan", flag: "🇯🇴" },
    { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+686", country: "Kiribati", flag: "🇰🇮" },
    { code: "+383", country: "Kosovo", flag: "🇽🇰" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
    { code: "+856", country: "Laos", flag: "🇱🇦" },
    { code: "+371", country: "Latvia", flag: "🇱🇻" },
    { code: "+961", country: "Lebanon", flag: "🇱🇧" },
    { code: "+266", country: "Lesotho", flag: "🇱🇸" },
    { code: "+231", country: "Liberia", flag: "🇱🇾" },
    { code: "+218", country: "Libya", flag: "🇱🇾" },
    { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
    { code: "+370", country: "Lithuania", flag: "🇱🇹" },
    { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
    { code: "+853", country: "Macau", flag: "🇲🇴" },
    { code: "+389", country: "Macedonia", flag: "🇲🇰" },
    { code: "+261", country: "Madagascar", flag: "🇲🇬" },
    { code: "+265", country: "Malawi", flag: "🇲🇼" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+960", country: "Maldives", flag: "🇲🇻" },
    { code: "+223", country: "Mali", flag: "🇲🇱" },
    { code: "+356", country: "Malta", flag: "🇲🇹" },
    { code: "+692", country: "Marshall Islands", flag: "🇲🇭" },
    { code: "+222", country: "Mauritania", flag: "🇲🇷" },
    { code: "+230", country: "Mauritius", flag: "🇲🇺" },
    { code: "+262", country: "Mayotte", flag: "YT" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+691", country: "Micronesia", flag: "🇫🇲" },
    { code: "+373", country: "Moldova", flag: "🇲🇩" },
    { code: "+377", country: "Monaco", flag: "🇲🇨" },
    { code: "+976", country: "Mongolia", flag: "🇲🇳" },
    { code: "+382", country: "Montenegro", flag: "🇲🇪" },
    { code: "+1-664", country: "Montserrat", flag: "🇲🇸" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+258", country: "Mozambique", flag: "🇲🇿" },
    { code: "+95", country: "Myanmar", flag: "🇲🇲" },
    { code: "+264", country: "Namibia", flag: "🇳🇦" },
    { code: "+674", country: "Nauru", flag: "🇳🇷" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
    { code: "+599", country: "Netherlands Antilles", flag: "🇧🇶" },
    { code: "+687", country: "New Caledonia", flag: "🇳🇨" },
    { code: "+64", country: "New Zealand", flag: "🇳🇿" },
    { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
    { code: "+227", country: "Niger", flag: "🇳🇪" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+683", country: "Niue", flag: "🇳🇺" },
    { code: "+850", country: "North Korea", flag: "🇰🇵" },
    { code: "+1-670", country: "Northern Mariana Islands", flag: "🇲🇵" },
    { code: "+47", country: "Norway", flag: "🇳🇴" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
    { code: "+680", country: "Palau", flag: "🇵🇼" },
    { code: "+970", country: "Palestine", flag: "🇵🇸" },
    { code: "+507", country: "Panama", flag: "🇵🇦" },
    { code: "+675", country: "Papua New Guinea", flag: "🇵🇬" },
    { code: "+595", country: "Paraguay", flag: "🇵🇾" },
    { code: "+51", country: "Peru", flag: "🇵🇪" },
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+64", country: "Pitcairn", flag: "🇵🇳" },
    { code: "+48", country: "Poland", flag: "🇵🇱" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+1-787", country: "Puerto Rico", flag: "🇵🇷" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+242", country: "Republic of the Congo", flag: "🇨🇬" },
    { code: "+262", country: "Reunion", flag: "🇷🇪" },
    { code: "+40", country: "Romania", flag: "🇷🇴" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+250", country: "Rwanda", flag: "🇷🇼" },
    { code: "+590", country: "Saint Barthelemy", flag: "🇧🇱" },
    { code: "+290", country: "Saint Helena", flag: "🇸🇭" },
    { code: "+1-869", country: "Saint Kitts and Nevis", flag: "🇰🇳" },
    { code: "+1-758", country: "Saint Lucia", flag: "🇱🇨" },
    { code: "+590", country: "Saint Martin", flag: "🇲🇫" },
    { code: "+508", country: "Saint Pierre and Miquelon", flag: "🇵🇲" },
    { code: "+1-784", country: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
    { code: "+685", country: "Samoa", flag: "🇼🇸" },
    { code: "+378", country: "San Marino", flag: "🇸🇲" },
    { code: "+239", country: "Sao Tome and Principe", flag: "🇸🇹" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+221", country: "Senegal", flag: "🇸🇳" },
    { code: "+381", country: "Serbia", flag: "🇷🇸" },
    { code: "+248", country: "Seychelles", flag: "🇸🇨" },
    { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+1-721", country: "Sint Maarten", flag: "🇸🇽" },
    { code: "+421", country: "Slovakia", flag: "🇸🇰" },
    { code: "+386", country: "Slovenia", flag: "🇸🇮" },
    { code: "+677", country: "Solomon Islands", flag: "🇸🇧" },
    { code: "+252", country: "Somalia", flag: "🇸🇴" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+211", country: "South Sudan", flag: "🇸🇸" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
    { code: "+249", country: "Sudan", flag: "🇸🇩" },
    { code: "+597", country: "Suriname", flag: "🇸🇷" },
    { code: "+47", country: "Svalbard and Jan Mayen", flag: "🇸🇯" },
    { code: "+268", country: "Swaziland", flag: "🇸🇿" },
    { code: "+46", country: "Sweden", flag: "🇸🇪" },
    { code: "+41", country: "Switzerland", flag: "🇨🇭" },
    { code: "+963", country: "Syria", flag: "🇸🇾" },
    { code: "+886", country: "Taiwan", flag: "🇹🇼" },
    { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
    { code: "+255", country: "Tanzania", flag: "🇹🇿" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+228", country: "Togo", flag: "🇹🇬" },
    { code: "+690", country: "Tokelau", flag: "🇹🇰" },
    { code: "+676", country: "Tonga", flag: "🇹🇴" },
    { code: "+1-868", country: "Trinidad and Tobago", flag: "🇹🇹" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+90", country: "Turkey", flag: "🇹🇷" },
    { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
    { code: "+1-649", country: "Turks and Caicos Islands", flag: "🇹🇨" },
    { code: "+688", country: "Tuvalu", flag: "🇹🇻" },
    { code: "+1-340", country: "U.S. Virgin Islands", flag: "🇻🇮" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+380", country: "Ukraine", flag: "🇺🇦" },
    { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+598", country: "Uruguay", flag: "🇺🇾" },
    { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
    { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
    { code: "+379", country: "Vatican", flag: "🇻🇦" },
    { code: "+58", country: "Venezuela", flag: "🇻🇪" },
    { code: "+84", country: "Vietnam", flag: "🇻🇳" },
    { code: "+681", country: "Wallis and Futuna", flag: "🇼🇫" },
    { code: "+212", country: "Western Sahara", flag: "🇪🇭" },
    { code: "+967", country: "Yemen", flag: "🇾🇪" },
    { code: "+260", country: "Zambia", flag: "🇿🇲" },
    { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
].sort((a, b) => a.country.localeCompare(b.country));

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

const SuccessAnimation = () => {
  return (
    <div className="relative w-24 h-24 mb-8">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full text-nobel-gold"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            hidden: { pathLength: 0, rotate: -90 },
            visible: { pathLength: 1, rotate: -90, transition: { duration: 1.5, ease: "easeInOut" } }
          }}
        />
        <motion.path
          d="M30 50 L45 65 L70 35"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1, transition: { delay: 1.5, duration: 0.5, ease: "easeOut" } }
          }}
        />
      </motion.svg>
      <motion.div 
        className="absolute inset-0 bg-nobel-gold rounded-full blur-xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </div>
  );
};

const OwnerAppMockup = () => (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[520px] w-[280px] shadow-2xl flex flex-col justify-start overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 z-20">
        <div className="absolute top-0 w-full h-6 bg-gray-800 z-10 flex justify-center">
            <div className="h-4 w-28 bg-black rounded-b-xl"></div>
        </div>
        <div className="bg-stone-50 flex-1 overflow-hidden font-sans pt-8 px-4 relative">
             <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Welcome Back</p>
                    <h3 className="text-mapstone-blue font-serif text-lg leading-none mb-1">Hi, David</h3>
                    <div className="flex items-center gap-1.5 mt-1 bg-nobel-gold/10 px-2 py-0.5 rounded-full border border-nobel-gold/20 w-fit">
                        <Crown size={10} className="text-nobel-gold" />
                        <span className="text-[8px] font-bold text-nobel-gold uppercase tracking-wider">MAPSTONE VIP Client</span>
                    </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100" alt="David" />
                </div>
             </div>
             <div className="bg-mapstone-blue text-white p-4 rounded-2xl shadow-lg mb-4 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Total Revenue (Nov)</p>
                    <h4 className="text-2xl font-serif mb-3">AED 42,500</h4>
                    <div className="flex items-end gap-1 h-12">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-nobel-gold/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
                 <div className="absolute -right-4 -top-4 w-20 h-20 bg-nobel-gold/20 rounded-full blur-xl"></div>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 mb-4">
                 <div className="flex justify-between items-center mb-3">
                     <span className="font-bold text-mapstone-blue text-xs">December 2024</span>
                     <Calendar size={14} className="text-stone-400"/>
                 </div>
                 <div className="grid grid-cols-7 gap-1 text-[8px] text-center text-stone-500 mb-1">
                     <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                 </div>
                 <div className="grid grid-cols-7 gap-1 text-[8px] text-center font-medium">
                     {[...Array(30)].map((_, i) => {
                         const day = i + 1;
                         const isBooked = [5, 6, 7, 12, 13, 14, 15, 20, 21, 24, 25].includes(day);
                         return (
                             <div key={i} className={`h-5 w-full flex items-center justify-center rounded-sm ${isBooked ? 'bg-nobel-gold text-white' : 'text-stone-600'}`}>
                                 {day}
                             </div>
                         )
                     })}
                 </div>
             </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                     <CheckCircle2 size={16} />
                 </div>
                 <div>
                     <p className="text-xs font-bold text-mapstone-blue">Unit Occupied</p>
                     <p className="text-[10px] text-stone-400">Guest checking out in 2 days</p>
                 </div>
              </div>
        </div>
        <div className="bg-white h-12 flex justify-around items-center px-4 border-t border-stone-100">
            <div className="text-mapstone-blue"><BarChart3 size={18} /></div>
            <div className="text-stone-300"><Calendar size={18} /></div>
            <div className="text-stone-300"><Mail size={18} /></div>
            <div className="text-stone-300"><Users size={18} /></div>
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
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, lang }) => {
    const t = translations[lang].booking;
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [selectedCountry, setSelectedCountry] = useState(
        COUNTRY_CODES.find(c => c.country === "United Arab Emirates") || COUNTRY_CODES[0]
    );

    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        countryCode: selectedCountry.code, 
        time: '' 
    });
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterText, setFilterText] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCodes = COUNTRY_CODES.filter(c => 
        c.country.toLowerCase().includes(filterText.toLowerCase()) || 
        c.code.includes(filterText)
    );

    const handleCountrySelect = (country: typeof COUNTRY_CODES[0]) => {
          setSelectedCountry(country);
          setFormData({...formData, countryCode: country.code, phone: ''});
          setDropdownOpen(false);
          setFilterText('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        
        const endpoint = "https://formsubmit.co/contact@mapstonegroup.com";
        
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Consultation Request - ${formData.name}`,
                    _captcha: "false",
                    _template: "table",
                    name: formData.name,
                    email: formData.email,
                    phone: `${formData.countryCode} ${formData.phone}`,
                    preferred_time: formData.time,
                    _honey: ""
                })
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    // Ignore JSON parse error
                }
                console.error("Submission failed:", errorData || response.statusText);
                throw new Error("Submission failed");
            }

            setSubmitted(true);
        } catch (error: any) {
            console.error("Form submission error:", error);
            setErrorMessage(lang === 'en' ? "Unable to send request. Please try again." : "Impossible d'envoyer la demande. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className="absolute inset-0 bg-mapstone-blue/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            
            <motion.div 
                className="relative bg-white w-full max-w-lg shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-mapstone-blue transition-colors z-10">
                    <X size={24} />
                </button>

                {!submitted ? (
                    <div className="p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h2 className="font-serif text-3xl text-mapstone-blue mb-2">{t.title}</h2>
                            <p className="text-stone-500 text-sm font-light">{t.subtitle}</p>
                        </div>

                        {errorMessage && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm flex items-start gap-3 text-sm mb-6 animate-fade-in">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-mapstone-blue mb-1.5">{t.name}</label>
                                <input type="text" required className="w-full border-b border-stone-300 py-2 text-mapstone-blue focus:outline-none focus:border-nobel-gold transition-colors bg-transparent placeholder-stone-300" placeholder="e.g. Mourad Al-Sayed" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isSubmitting} />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-mapstone-blue mb-1.5">{t.email}</label>
                                <input type="email" required className="w-full border-b border-stone-300 py-2 text-mapstone-blue focus:outline-none focus:border-nobel-gold transition-colors bg-transparent placeholder-stone-300" placeholder="e.g. contact@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isSubmitting} />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-mapstone-blue mb-1.5">{t.phone}</label>
                                <div className="flex gap-4">
                                    <div className="relative w-1/3" ref={dropdownRef}>
                                        <button type="button" disabled={isSubmitting} className="w-full border-b border-stone-300 py-2 text-mapstone-blue text-left flex justify-between items-center focus:outline-none disabled:opacity-50" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            <div className="flex items-center gap-2 truncate">
                                                <span className="text-xl leading-none">{selectedCountry.flag}</span>
                                                <span className="font-medium">{selectedCountry.code}</span>
                                            </div>
                                            <ChevronDown size={14} className="text-stone-400 shrink-0" />
                                        </button>
                                        
                                        {dropdownOpen && !isSubmitting && (
                                            <div className="absolute top-full left-0 w-[280px] max-h-60 overflow-y-auto bg-white shadow-xl border border-stone-100 z-50 mt-1">
                                                <div className="sticky top-0 bg-white p-2 border-b border-stone-100">
                                                    <div className="flex items-center gap-2 bg-stone-50 px-2 rounded">
                                                        <Search size={14} className="text-stone-400"/>
                                                        <input type="text" className="w-full bg-transparent text-xs py-2 focus:outline-none" placeholder="Search..." value={filterText} onChange={(e) => setFilterText(e.target.value)} autoFocus />
                                                    </div>
                                                </div>
                                                {filteredCodes.map((c) => (
                                                    <div key={c.code + c.country} className="px-4 py-2.5 hover:bg-stone-50 cursor-pointer flex items-center gap-3 transition-colors" onClick={() => handleCountrySelect(c)}>
                                                        <span className="text-xl leading-none w-8 text-center">{c.flag}</span>
                                                        <span className="font-bold text-mapstone-blue w-12 text-sm">{c.code}</span>
                                                        <span className="truncate flex-1 text-xs text-stone-500 font-medium">{c.country}</span>
                                                        {selectedCountry.country === c.country && <Check size={14} className="text-nobel-gold shrink-0"/>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <IMaskInput
                                        mask={selectedCountry.code === '+971' ? '00 000 0000' : selectedCountry.code === '+1' ? '000 000 0000' : '0'.repeat(16)}
                                        definitions={{
                                            '0': /[0-9]/
                                        }}
                                        value={formData.phone}
                                        onAccept={(value: string) => setFormData({ ...formData, phone: value })}
                                        required
                                        className="flex-1 border-b border-stone-300 py-2 text-mapstone-blue focus:outline-none focus:border-nobel-gold transition-colors bg-transparent placeholder-stone-300 disabled:opacity-50"
                                        placeholder={selectedCountry.code === '+971' ? "55 123 4567" : "123 456 7890"}
                                        disabled={isSubmitting}
                                        type="tel"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-mapstone-blue mb-1.5">{t.time}</label>
                                <input type="text" className="w-full border-b border-stone-300 py-2 text-mapstone-blue focus:outline-none focus:border-nobel-gold transition-colors bg-transparent placeholder-stone-300 disabled:opacity-50" placeholder="e.g. 10:00 AM - 2:00 PM (Dubai Time)" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} disabled={isSubmitting} />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-nobel-gold text-white py-4 mt-4 font-bold tracking-widest uppercase hover:bg-mapstone-blue transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>{lang === 'en' ? 'Processing...' : 'Traitement...'}</span>
                                    </>
                                ) : (
                                    t.submit
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-12 flex flex-col items-center justify-center text-center h-[500px] bg-mapstone-blue text-white">
                        <SuccessAnimation />
                        <h2 className="font-serif text-3xl mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                            {t.successTitle} <span className="text-nobel-gold block mt-2">{formData.name}.</span>
                        </h2>
                        <p className="text-stone-300 font-light text-lg max-w-xs animate-fade-in-up leading-relaxed" style={{animationDelay: '0.2s'}}>
                            {t.successBody}
                        </p>
                    </div>
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
    const [langDropdownOpen, setLangDropdownOpen] = useState(false); // New state for desktop dropdown
    const t = translations[lang];

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

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        if (currentView !== 'home') {
            setCurrentView('home');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };

    const handleFooterLinkClick = (view: View) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (langDropdownOpen && !(e.target as Element).closest('.lang-dropdown')) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [langDropdownOpen]);

    const languageOptions: { code: Lang; label: string; flag: string }[] = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'ar', label: 'العربية', flag: '🇦🇪' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' }
    ];

    return (
        <div 
            className={`font-sans text-stone-800 antialiased selection:bg-nobel-gold selection:text-white overflow-x-hidden ${lang === 'ar' ? 'font-arabic' : ''}`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
            <AnimatePresence>
                {loading && <VideoPreloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Navbar */}
            <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 z-50 cursor-pointer" onClick={() => scrollTo('home')}>
                        {/* Logo Image */}
                        <img 
                            src="https://i.postimg.cc/qBQmntz0/logo-holiday.png" 
                            alt="MAPSTONE" 
                            className="h-12 md:h-20 w-auto object-contain transition-all duration-300"
                        />
                    </div>

                    {/* Desktop Nav */}
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
                        {/* Desktop Language Dropdown */}
                        <div className="relative lang-dropdown">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setLangDropdownOpen(!langDropdownOpen); }}
                                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-nobel-gold transition-colors ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}
                            >
                                <Globe size={16} />
                                {lang === 'ar' ? 'AR' : lang.toUpperCase()}
                                <ChevronDown size={12} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                                {langDropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className={`absolute top-full mt-4 w-40 bg-white shadow-xl border border-stone-100 rounded-sm overflow-hidden ${lang === 'ar' ? 'left-0' : 'right-0'}`}
                                    >
                                        {languageOptions.map((opt) => (
                                            <button
                                                key={opt.code}
                                                onClick={() => { setLang(opt.code); setLangDropdownOpen(false); }}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-stone-50 flex items-center gap-3 transition-colors ${lang === opt.code ? 'bg-stone-50 text-nobel-gold font-bold' : 'text-stone-600'}`}
                                                dir="ltr" 
                                            >
                                                <span className="text-lg">{opt.flag}</span>
                                                <span>{opt.label}</span>
                                                {lang === opt.code && <Check size={14} className="ml-auto" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button 
                            onClick={() => setBookingOpen(true)}
                            className="bg-nobel-gold text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg"
                        >
                            {t.nav.book}
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className={`lg:hidden z-50 ${scrolled || menuOpen || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: lang === 'ar' ? '-100%' : '100%' }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: lang === 'ar' ? '-100%' : '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-white flex flex-col justify-center items-center lg:hidden overflow-y-auto"
                    >
                         <div className="flex flex-col gap-6 text-center w-full max-w-xs py-10">
                            {navLinks.map(link => (
                                <button 
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className="text-2xl font-serif text-mapstone-blue hover:text-nobel-gold transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <div className="w-12 h-px bg-stone-200 mx-auto my-4"></div>
                            
                            {/* Mobile Language List */}
                            <div className="grid grid-cols-1 gap-2">
                                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">Select Language</p>
                                {languageOptions.map((opt) => (
                                    <button
                                        key={opt.code}
                                        onClick={() => { setLang(opt.code); setMenuOpen(false); }}
                                        className={`py-2 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 ${lang === opt.code ? 'bg-nobel-gold text-white shadow-md' : 'text-stone-600 hover:bg-stone-50'}`}
                                        dir="ltr"
                                    >
                                        <span>{opt.flag}</span>
                                        <span className="font-medium">{opt.label}</span>
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={() => { setBookingOpen(true); setMenuOpen(false); }}
                                className="mt-4 bg-nobel-gold text-white px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest"
                            >
                                {t.nav.book}
                            </button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area with Page Transition */}
            <AnimatePresence mode="wait">
                {currentView === 'home' && (
                    <PageTransition key="home" className="w-full">
                        {/* Hero Section */}
                        <header id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-mapstone-dark border-b border-nobel-gold/20">
                            <div className="absolute inset-0 w-full h-full z-0">
                                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/Y9ZFqfLc/69d1fa33-9d37-440c-9d9e-2b73216809f6.png')" }}></div>
                                 <div className="absolute inset-0 bg-black/30 z-10"></div>
                            </div>
                            <div className="absolute inset-0 z-0 opacity-60"><GeometricLuxuryScene /></div>
                            <div className="container mx-auto px-6 relative z-20 text-center mt-20">
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}>
                                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-white mb-6 uppercase">{t.hero.location}</span>
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 tracking-tight">{t.hero.title}</h1>
                                    <p className="text-xl md:text-3xl font-light text-nobel-gold uppercase tracking-[0.3em] mb-8">{t.hero.subtitle}</p>
                                    <p className="max-w-xl mx-auto text-stone-100 mb-10 leading-relaxed drop-shadow-md font-medium text-lg">{t.hero.desc}</p>
                                    <button onClick={() => scrollTo('properties')} className="group relative overflow-hidden rounded-full bg-white text-mapstone-blue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white hover:shadow-xl transition-all duration-300">
                                        <span className="relative z-10 flex items-center gap-2">{t.hero.cta} <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" /></span>
                                    </button>
                                </motion.div>
                            </div>
                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70 z-20"><ArrowDown size={24} /></div>
                        </header>

                        {/* About Section */}
                        <section id="about" className="relative py-32 overflow-hidden bg-stone-50 border-b border-nobel-gold/20">
                             <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"><WhiteLuxuryScene /></div>
                             <div className="container mx-auto px-6 relative z-10">
                                <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div className="relative group">
                                        <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl relative z-10 transform transition-transform duration-700 hover:scale-[1.01]">
                                            <img src="https://i.postimg.cc/fRh9wRZ8/5.jpg" alt="Luxury Living Room" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                                        </div>
                                        <motion.div className={`absolute -bottom-10 w-56 h-56 border-8 border-white shadow-2xl z-20 hidden md:block ${lang === 'ar' ? '-left-10' : '-right-10'}`} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                                            <img src="https://i.postimg.cc/fRh9wRZ8/5.jpg" alt="Detail" className="w-full h-full object-cover" />
                                        </motion.div>
                                        <div className="absolute top-[-20px] left-[-20px] w-full h-full border border-nobel-gold/30 z-0 hidden md:block"></div>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 shadow-sm border border-white rounded-sm">
                                        <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-3 block flex items-center gap-2"><span className="w-8 h-px bg-nobel-gold"></span>{t.about.label}</span>
                                        <h2 className="text-4xl md:text-5xl font-serif text-mapstone-blue mb-8 leading-tight">{t.about.title}</h2>
                                        <p className="text-stone-600 leading-relaxed mb-6 font-light text-lg">{t.about.p1}</p>
                                        <p className="text-stone-600 leading-relaxed mb-10 font-light text-lg">{t.about.p2}</p>
                                        <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
                                            <div className="flex flex-col"><span className="text-4xl font-serif text-nobel-gold">50+</span><span className="text-xs uppercase tracking-widest text-mapstone-blue mt-2 font-bold">Premium Units</span></div>
                                            <div className="flex flex-col"><span className="text-4xl font-serif text-nobel-gold">4.9</span><span className="text-xs uppercase tracking-widest text-mapstone-blue mt-2 font-bold">Guest Rating</span></div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </section>

                        <section id="properties" className="py-24 bg-[#204c77]/10 border-b border-nobel-gold/20">
                            <div className="container mx-auto px-6">
                                <div className="text-center max-w-2xl mx-auto mb-16">
                                    <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-2 block">{t.properties.label}</span>
                                    <h2 className="text-4xl font-serif text-mapstone-blue mb-4">{t.properties.title}</h2>
                                    <p className="text-stone-500">{t.properties.desc}</p>
                                </div>
                                <PropertyShowcase lang={lang} onBook={() => setBookingOpen(true)} />
                            </div>
                        </section>

                        <PremiumAmenities lang={lang} onBook={() => setBookingOpen(true)} />

                        <section className="py-16 bg-stone-50 border-b border-nobel-gold/20">
                            <BookingBenefits lang={lang} />
                        </section>

                        <section id="landlords" className="py-24 bg-mapstone-blue text-white relative overflow-hidden border-b border-nobel-gold/20">
                             <div className="absolute top-0 right-0 w-1/2 h-full bg-nobel-gold/5 hidden lg:block"></div>
                             <div className="container mx-auto px-6 relative z-10">
                                 <div className="grid lg:grid-cols-2 gap-16 items-center">
                                     <div className="order-2 lg:order-1">
                                          <div className="relative">
                                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
                                              <OwnerAppMockup />
                                          </div>
                                     </div>
                                     <div className="order-1 lg:order-2">
                                          <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-2 block">{t.landlords.label}</span>
                                          <h2 className="text-4xl font-serif mb-6">{t.landlords.title}</h2>
                                          <p className="text-stone-300 leading-relaxed mb-8 text-lg">{t.landlords.desc}</p>
                                          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 mb-8">
                                              <h3 className="font-serif text-xl mb-2 text-nobel-gold">{t.landlords.vipTitle}</h3>
                                              <p className="text-sm text-stone-300 mb-4">{t.landlords.vipDesc}</p>
                                              <ul className="grid grid-cols-1 gap-3">
                                                    {t.landlords.list.map((item, idx) => (
                                                        <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></div>
                                                            {item}
                                                        </li>
                                                    ))}
                                               </ul>
                                          </div>
                                          <button onClick={() => setBookingOpen(true)} className="bg-white text-mapstone-blue px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white transition-colors">
                                              {lang === 'en' ? 'List Your Property' : 'Listez Votre Propriété'}
                                          </button>
                                     </div>
                                 </div>
                             </div>
                        </section>

                        <section className="py-16 bg-white border-b border-nobel-gold/20 overflow-hidden">
                            <div className="container mx-auto px-6 mb-20 text-center"><p className="text-3xl md:text-4xl font-serif text-mapstone-blue">{t.partners.title}</p></div>
                            <div className="flex overflow-hidden w-full relative">
                                <div className="flex animate-marquee whitespace-nowrap"><PartnerLogos /><PartnerLogos /><PartnerLogos /><PartnerLogos /></div>
                            </div>
                        </section>

                        <GuestExperiences lang={lang} />
                    </PageTransition>
                )}

                {currentView === 'privacy' && (
                    <PageTransition key="privacy">
                        <PrivacyPolicy />
                    </PageTransition>
                )}
                
                {currentView === 'terms' && (
                    <PageTransition key="terms">
                        <TermsConditions />
                    </PageTransition>
                )}
                
                {currentView === 'faq' && (
                    <PageTransition key="faq">
                        <FAQs />
                    </PageTransition>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer id="contact" className="bg-[#204c77] pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <p className="text-stone-300 text-sm leading-relaxed mb-6">
                                {t.footer.desc}
                            </p>
                            <div className="flex gap-4">
                                <a 
                                    href="https://www.instagram.com/mapstone_holiday_homes/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-mapstone-blue transition-colors"
                                >
                                    <Instagram size={18} />
                                </a>
                                <a 
                                    href="https://www.facebook.com/profile.php?id=61582980871159" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-mapstone-blue transition-colors"
                                >
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">{t.contactPage.locationLabel}</h4>
                            <p className="text-stone-300 text-sm mb-2 flex items-start gap-2">
                                <MapPin size={16} className="shrink-0 mt-0.5" />
                                <span>Al Barsha First - Al Barsha<br/>Business Centre, Dubai,<br/>United Arab Emirates</span>
                            </p>
                        </div>

                         <div>
                            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">{t.contactPage.phoneLabel}</h4>
                            <p className="text-stone-300 text-sm mb-2 flex items-center gap-2">
                                <Phone size={16} />
                                <a href="tel:+971585928787" className="hover:text-nobel-gold transition-colors">+971 58 592 8787</a>
                            </p>
                             <p className="text-stone-300 text-sm mb-2 flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:contact@mapstonegroup.com" className="hover:text-nobel-gold transition-colors">contact@mapstonegroup.com</a>
                            </p>
                        </div>

                         <div>
                            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Links</h4>
                            <ul className="space-y-3 text-sm text-stone-300">
                                <li><button onClick={() => handleFooterLinkClick('privacy')} className="hover:text-nobel-gold transition-colors text-left">{t.footer.privacy}</button></li>
                                <li><button onClick={() => handleFooterLinkClick('terms')} className="hover:text-nobel-gold transition-colors text-left">{t.footer.terms}</button></li>
                                <li><button onClick={() => handleFooterLinkClick('faq')} className="hover:text-nobel-gold transition-colors text-left">{t.footer.faqs}</button></li>
                                <li><button onClick={() => scrollTo('contact')} className="hover:text-nobel-gold transition-colors text-left">{t.nav.contact}</button></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
                        <p>&copy; {new Date().getFullYear()} MAPSTONE HOLIDAY HOMES RENTAL L.L.C , {t.footer.rights}</p>
                        <p>Designed with excellence in Dubai.</p>
                    </div>
                </div>
            </footer>

            <WhatsAppButton />
            <AnimatePresence>
                {bookingOpen && (
                    <BookingModal 
                        key="booking-modal" 
                        isOpen={bookingOpen} 
                        onClose={() => setBookingOpen(false)} 
                        lang={lang} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;

// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

// Colors matching the video vibe (Red, Dark Blue, Gold, Orange)
const transitionColors = [
  'bg-[#e63946]', 
  'bg-[#1a3a5c]', 
  'bg-[#cf9f43]', 
  'bg-[#ff5a1f]', 
];

const columnVariants = {
  // State 1: Start fully covering the screen
  initial: {
    y: "0%", 
  },
  // State 2: Slide UP (-100%) to reveal the content
  enter: (i: number) => ({
    y: "-100%", 
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], // Custom "luxury" easing curve
      delay: i * 0.05, // Stagger effect (columns move one by one)
    },
  }),
  // State 3: Slide DOWN (0%) to cover the screen again before leaving
  exit: (i: number) => ({
    y: "0%", 
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
};

export default function PageTransition({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className} min-h-screen`}>
      {/* OVERLAY COLUMNS */}
      {/* z-[9999] ensures this sits on top of EVERYTHING, including the navbar */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-row h-screen w-full">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={columnVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`relative h-full w-1/4 ${transitionColors[i]}`}
          />
        ))}
      </div>

      {/* PAGE CONTENT */}
      {/* Content fades in slightly after columns start moving for a smoother look */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}