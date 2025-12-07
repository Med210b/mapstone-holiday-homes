import React, { useState, useEffect, useRef } from 'react';
import { GeometricLuxuryScene, WhiteLuxuryScene } from './components/QuantumScene';
import { PropertyShowcase, AmenityGrid, BookingBenefits } from './components/Diagrams';
import { WhatsAppIcon, LogoBayut, LogoDubizzle, LogoPropertyFinder, LogoBooking, LogoAirbnb } from './components/Icons';
import { PrivacyPolicy, TermsConditions, FAQs } from './components/LegalPages';
import { ArrowDown, Menu, X, Calendar, Globe, Star, Phone, Mail, ChevronDown, Search, Check, CircleHelp, MapPin, Facebook, Instagram, Smartphone, TrendingUp, Shield, BarChart3, Users, Loader2, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import { Lang, View } from './types';

// Constants for Translations and Data
const translations = {
  en: {
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
    properties: {
      label: "Locations",
      title: "Curated Residences",
      desc: "Discover our portfolio of exclusive apartments in Dubai's most sought-after neighborhoods."
    },
    landlords: {
      label: "Property Management",
      title: "For Homeowners",
      desc: "Maximize your property's potential with our comprehensive management services. We handle marketing, guest vetting, and maintenance.",
      vipTitle: "VIP App Access",
      vipDesc: "Stay connected to your investment. Our exclusive Owner App gives you real-time access to your property's performance.",
      list: ["Live Revenue Dashboard", "Real-Time Booking Calendar", "Monthly Performance Reports", "Transparent Expense Tracking"]
    },
    partners: {
      title: "Our Partners"
    },
    amenities: {
      title: "Premium Amenities",
      desc: "Every stay includes access to world-class facilities designed for your comfort."
    },
    reviews: {
      label: "Testimonials",
      title: "Guest Experiences"
    },
    footer: {
      desc: "Premium short-term rental management company in Dubai.",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      faqs: "FAQS"
    },
    booking: {
        title: "Request a Consultation",
        subtitle: "Leave your details and our team will contact you shortly.",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        time: "Best Time to Call",
        submit: "SUBMIT",
        successTitle: "Welcome to the Inner Circle,",
        successBody: "Your journey with MAPSTONE starts now. Keep an eye on your inbox."
    },
    contactPage: {
        title: "Get in Touch",
        subtitle: "We are here to assist you with your booking or property management inquiries.",
        phoneLabel: "Call Us",
        emailLabel: "Email Us",
        locationLabel: "Visit Us",
        socialLabel: "Follow Us"
    },
    servicesPage: {
        title: "Our Services",
        subtitle: "Solutions complètes de gestion immobilière conçues pour les propriétaires de luxe.",
        items: [
            { title: "Optimisation des Annonces", desc: "Photographie professionnelle et descriptions optimisées SEO pour un meilleur classement sur Airbnb, Booking.com, etc." },
            { title: "Tarification Dynamique", desc: "Stratégies de prix basées sur l'IA qui s'ajustent quotidiennement selon la demande et les événements locaux." },
            { title: "Sélection des Invités", desc: "Processus de sélection rigoureux pour garantir des invités respectueux et protéger vos actifs immobiliers." },
            { title: "Maintenance et Entretien", desc: "Inspections régulières, nettoyage professionnel et support maintenance 24/7 pour garder votre propriété impeccable." }
        ],
        app: {
            title: "Portail Propriétaire VIP",
            desc: "La transparence est clé. Nous vous offrons un accès VIP à notre application exclusive Propriétaire.",
            features: [
                "Calendrier de Réservation en Temps Réel",
                "Suivi des Revenus en Direct",
                "Rapports d'Occupation",
                "Communication Directe"
            ]
        }
    }
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", properties: "Propriétés", landlords: "Propriétaires", contact: "Nous Contacter", book: "Réserver", services: "Équipements" },
    hero: {
      location: "DUBAÏ • ÉMIRATS ARABES UNIS",
      title: "MAPSTONE",
      subtitle: "Holiday Homes",
      desc: "Découvrez le summum du luxe à Dubaï. Locations à court terme haut de gamme dans les quartiers les plus prestigieux.",
      cta: "Trouver Votre Séjour"
    },
    about: {
      label: "Notre Philosophie",
      title: "Le Luxe Redéfini",
      p1: "MAPSTONE Holiday Homes propose une sélection soignée d'appartements meublés dans les meilleurs quartiers de Dubaï. Du dynamique Downtown au serein Palm Jumeirah, nous offrons une expérience d'hospitalité sans faille.",
      p2: "Que vous visitiez pour affaires ou pour le plaisir, nos propriétés allient des équipements de qualité hôtelière au confort et à l'intimité d'un foyer."
    },
    properties: {
      label: "Emplacements",
      title: "Résidences Curatées",
      desc: "Découvrez notre portefeuille d'appartements exclusifs dans les quartiers les plus prisés de Dubaï."
    },
    landlords: {
      label: "Gestion Immobilière",
      title: "Pour les Propriétaires",
      desc: "Maximisez le potentiel de votre propriété avec nos services de gestion complets. Nous gérons le marketing, la sélection des invités et la maintenance.",
      vipTitle: "Accès App VIP",
      vipDesc: "Restez connecté à votre investissement. Notre application propriétaire exclusive vous donne un accès en temps réel aux performances de votre propriété.",
      list: ["Tableau de bord des revenus en direct", "Calendrier de réservation en temps réel", "Rapports de performance mensuels", "Suivi transparent des dépenses"]
    },
    partners: {
      title: "Nos Partenaires"
    },
    amenities: {
      title: "Équipements Premium",
      desc: "Chaque séjour comprend l'accès à des installations de classe mondiale conçues pour votre confort."
    },
    reviews: {
      label: "Témoignages",
      title: "Expériences Clients"
    },
    footer: {
      desc: "Société de gestion de location à court terme premium à Dubaï.",
      rights: "Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Termes et Conditions",
      faqs: "FAQ"
    },
    booking: {
        title: "Demander une Consultation",
        subtitle: "Laissez vos coordonnées et notre équipe vous contactera sous peu.",
        name: "Nom Complet",
        email: "Adresse Email",
        phone: "Numéro de Téléphone",
        time: "Meilleur moment pour appeler",
        submit: "SOUMETTRE",
        successTitle: "Bienvenue dans le Cercle Intérieur,",
        successBody: "Votre voyage avec MAPSTONE commence maintenant. Surveillez votre boîte de réception."
    },
    contactPage: {
        title: "Contactez-nous",
        subtitle: "Nous sommes là pour vous aider avec vos demandes de réservation ou de gestion immobilière.",
        phoneLabel: "Appelez-nous",
        emailLabel: "Envoyez-nous un email",
        locationLabel: "Visitez-nous",
        socialLabel: "Suivez-nous"
    },
    servicesPage: {
        title: "Nos Services",
        subtitle: "Solutions complètes de gestion immobilière conçues pour les propriétaires de luxe.",
        items: [
            { title: "Optimisation des Annonces", desc: "Photographie professionnelle et descriptions optimisées SEO pour un meilleur classement sur Airbnb, Booking.com, etc." },
            { title: "Tarification Dynamique", desc: "Stratégies de prix basées sur l'IA qui s'ajustent quotidiennement selon la demande et les événements locaux." },
            { title: "Sélection des Invités", desc: "Processus de sélection rigoureux pour garantir des invités respectueux et protéger vos actifs immobiliers." },
            { title: "Maintenance et Entretien", desc: "Inspections régulières, nettoyage professionnel et support maintenance 24/7 pour garder votre propriété impeccable." }
        ],
        app: {
            title: "Portail Propriétaire VIP",
            desc: "La transparence est clé. Nous vous offrons un accès VIP à notre application exclusive Propriétaire.",
            features: [
                "Calendrier de Réservation en Temps Réel",
                "Suivi des Revenus en Direct",
                "Rapports d'Occupation",
                "Communication Directe"
            ]
        }
    }
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
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Function to inject Vimeo script and initialize player
        const initVimeo = () => {
            if ((window as any).Vimeo && iframeRef.current) {
                const player = new (window as any).Vimeo.Player(iframeRef.current);
                
                // Force HD quality using embed params (in src) and method
                // player.setQuality('1080p').catch((error: any) => {
                //    // Ignore quality setting error, src param handles it mostly
                // });

                player.setVolume(0); // Ensure muted
                player.setLoop(false).catch(() => {});
                
                // When video ends, fade out
                player.on('ended', () => {
                   // Trigger exit immediately to prevent static frame "blurring" effect
                   onComplete();
                });

                player.play().catch(() => {
                    // Autoplay catch
                });
            }
        };

        if (!(window as any).Vimeo) {
            const script = document.createElement('script');
            script.src = "https://player.vimeo.com/api/player.js";
            script.async = true;
            script.onload = initVimeo;
            document.body.appendChild(script);
            
            return () => {
                // Cleanup script if component unmounts before load
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        } else {
            initVimeo();
        }
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }} // Match the 1.5s ease requested
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
            <iframe
                ref={iframeRef}
                src="https://player.vimeo.com/video/1143941535?background=1&autoplay=1&loop=0&byline=0&title=0"
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Mapstone Intro"
            ></iframe>
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

const ReviewCard = ({ name, location, text, delay }: { name: string, location: string, text: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-start p-8 bg-white rounded-none border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full max-w-sm" style={{ animationDelay: delay }}>
      <div className="flex gap-1 mb-4 text-nobel-gold">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
      <p className="text-mapstone-blue font-serif italic mb-6 leading-relaxed">"{text}"</p>
      <div className="w-8 h-0.5 bg-nobel-gold mb-3 opacity-60"></div>
      <h3 className="font-sans text-sm font-bold text-mapstone-blue uppercase tracking-wider">{name}</h3>
      <p className="text-xs text-stone-400 mt-1 uppercase">{location}</p>
    </div>
  );
};

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
             {/* Header */}
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

             {/* Income Card */}
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

             {/* Calendar Widget */}
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

             {/* Recent Activity / Status */}
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
        {/* Navigation Bar */}
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
    
    // Initialize selectedCountry for proper flag display (handles duplicates like +1 for US/Canada)
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
        
        // Using FormSubmit.co standard endpoint which is more reliable for direct email notifications
        // The /ajax/ endpoint can sometimes be strict with CORS or return different structures
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
                    // Hidden honeypot field to prevent spam
                    _honey: ""
                })
            });

            if (!response.ok) {
                // Try to parse error message if available
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

    return (
        <div className="font-sans text-stone-800 antialiased selection:bg-nobel-gold selection:text-white overflow-x-hidden">
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
                        <button 
                            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                            className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-nobel-gold transition-colors ${scrolled || currentView !== 'home' ? 'text-mapstone-blue' : 'text-white'}`}
                        >
                            <Globe size={16} />
                            {lang}
                        </button>
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
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-white flex flex-col justify-center items-center lg:hidden"
                    >
                         <div className="flex flex-col gap-6 text-center">
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
                             <button 
                                onClick={() => { setLang(lang === 'en' ? 'fr' : 'en'); setMenuOpen(false); }}
                                className="text-lg font-medium uppercase tracking-widest text-stone-500"
                            >
                                {lang === 'en' ? 'Français' : 'English'}
                            </button>
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

            {/* Main Content Area */}
            {currentView === 'home' && (
                <>
                    {/* Hero Section */}
                    <header id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-mapstone-dark border-b border-nobel-gold/20">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 w-full h-full z-0"
                        >
                             <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://i.postimg.cc/Y9ZFqfLc/69d1fa33-9d37-440c-9d9e-2b73216809f6.png')" }}
                            ></div>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 z-10"></div>
                        </div>

                        {/* Animation Canvas */}
                        <div className="absolute inset-0 z-0 opacity-60">
                           <GeometricLuxuryScene />
                        </div>
                        
                        <div className="container mx-auto px-6 relative z-20 text-center mt-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8, duration: 1 }}
                            >
                                <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-white mb-6 uppercase">
                                    {t.hero.location}
                                </span>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 tracking-tight">
                                    {t.hero.title}
                                </h1>
                                <p className="text-xl md:text-3xl font-light text-nobel-gold uppercase tracking-[0.3em] mb-8">
                                    {t.hero.subtitle}
                                </p>
                                <p className="max-w-xl mx-auto text-stone-100 mb-10 leading-relaxed drop-shadow-md font-medium text-lg">
                                    {t.hero.desc}
                                </p>
                                
                                <button 
                                    onClick={() => scrollTo('properties')}
                                    className="group relative overflow-hidden rounded-full bg-white text-mapstone-blue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white hover:shadow-xl transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t.hero.cta} <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                                    </span>
                                </button>
                            </motion.div>
                        </div>

                        {/* Bounce arrow */}
                         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70 z-20">
                            <ArrowDown size={24} />
                        </div>
                    </header>

                    {/* About Section - REDESIGNED */}
                    <section id="about" className="relative py-32 overflow-hidden bg-stone-50 border-b border-nobel-gold/20">
                        {/* 3D Physics Animation Background */}
                        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                            <WhiteLuxuryScene />
                        </div>
                        
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div className="relative group">
                                    {/* Main Luxury Image */}
                                    <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl relative z-10 transform transition-transform duration-700 hover:scale-[1.01]">
                                        <img 
                                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" 
                                            alt="Luxury Living Room" 
                                            className="w-full h-full object-cover" 
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                                    </div>
                                    
                                    {/* Secondary Detail Image - Floating */}
                                    <motion.div 
                                        className="absolute -bottom-10 -right-10 w-56 h-56 border-8 border-white shadow-2xl z-20 hidden md:block"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                    >
                                        <img 
                                            src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80" 
                                            alt="Detail" 
                                            className="w-full h-full object-cover" 
                                        />
                                    </motion.div>

                                    {/* Decorative Frame */}
                                    <div className="absolute top-[-20px] left-[-20px] w-full h-full border border-nobel-gold/30 z-0 hidden md:block"></div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 shadow-sm border border-white rounded-sm">
                                    <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-3 block flex items-center gap-2">
                                        <span className="w-8 h-px bg-nobel-gold"></span>
                                        {t.about.label}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-serif text-mapstone-blue mb-8 leading-tight">{t.about.title}</h2>
                                    <p className="text-stone-600 leading-relaxed mb-6 font-light text-lg">{t.about.p1}</p>
                                    <p className="text-stone-600 leading-relaxed mb-10 font-light text-lg">{t.about.p2}</p>
                                    
                                    <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
                                        <div className="flex flex-col">
                                            <span className="text-4xl font-serif text-nobel-gold">50+</span>
                                            <span className="text-xs uppercase tracking-widest text-mapstone-blue mt-2 font-bold">Premium Units</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-4xl font-serif text-nobel-gold">4.9</span>
                                            <span className="text-xs uppercase tracking-widest text-mapstone-blue mt-2 font-bold">Guest Rating</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Properties Section */}
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

                     {/* Amenities Section */}
                    <section id="services" className="py-24 bg-[#dbc0a1]/10 border-b border-nobel-gold/20">
                        <div className="container mx-auto px-6">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                                <div className="max-w-xl">
                                    <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-2 block">{lang === 'en' ? 'Services' : 'Services'}</span>
                                    <h2 className="text-4xl font-serif text-mapstone-blue mb-4">{t.amenities.title}</h2>
                                    <p className="text-stone-500">{t.amenities.desc}</p>
                                </div>
                                <button 
                                    onClick={() => setBookingOpen(true)}
                                    className="text-mapstone-blue font-bold uppercase tracking-widest text-xs border-b border-mapstone-blue pb-1 hover:text-nobel-gold hover:border-nobel-gold transition-colors"
                                >
                                    {lang === 'en' ? 'Know more' : 'En savoir plus'}
                                </button>
                            </div>
                            <AmenityGrid lang={lang} />
                        </div>
                    </section>

                    <section className="py-16 bg-stone-50 border-b border-nobel-gold/20">
                        <BookingBenefits lang={lang} />
                    </section>

                    {/* Landlords Section */}
                    <section id="landlords" className="py-24 bg-mapstone-blue text-white relative overflow-hidden border-b border-nobel-gold/20">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-nobel-gold/5 hidden lg:block"></div>
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="order-2 lg:order-1">
                                     <div className="relative">
                                         {/* Decorative circle behind */}
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

                                     <button 
                                        onClick={() => setBookingOpen(true)}
                                        className="bg-white text-mapstone-blue px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-white transition-colors"
                                     >
                                        {lang === 'en' ? 'List Your Property' : 'Listez Votre Propriété'}
                                     </button>
                                </div>
                            </div>
                        </div>
                    </section>

                     {/* Partners */}
                    <section className="py-16 bg-[#204c77] border-b border-nobel-gold/20 overflow-hidden">
                        <div className="container mx-auto px-6 mb-20 text-center">
                            <p className="text-3xl md:text-4xl font-serif text-white">{t.partners.title}</p>
                        </div>
                        <div className="flex overflow-hidden w-full relative">
                             <div className="flex animate-marquee whitespace-nowrap">
                                <PartnerLogos />
                                <PartnerLogos />
                                <PartnerLogos />
                                <PartnerLogos />
                             </div>
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="py-24 bg-stone-50 overflow-hidden border-b border-nobel-gold/20">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                 <span className="text-nobel-gold font-bold tracking-widest text-xs uppercase mb-2 block">{t.reviews.label}</span>
                                 <h2 className="text-4xl font-serif text-mapstone-blue">{t.reviews.title}</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <ReviewCard 
                                    name="Sarah Jenkins" 
                                    location="United Kingdom" 
                                    text="Absolutely stunning apartment. The view of the Burj Khalifa was breathtaking and the service was impeccable."
                                    delay="0s"
                                />
                                 <ReviewCard 
                                    name="Mohammed Al-Fayed" 
                                    location="Saudi Arabia" 
                                    text="Mapstone managed my stay perfectly. Privacy, luxury and comfort. Highly recommended for families."
                                    delay="0.2s"
                                />
                                 <ReviewCard 
                                    name="Elena Volkov" 
                                    location="Russia" 
                                    text="The best holiday home experience in Dubai. The interior design was beautiful and the location was central."
                                    delay="0.4s"
                                />
                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentView === 'privacy' && <PrivacyPolicy />}
            {currentView === 'terms' && <TermsConditions />}
            {currentView === 'faq' && <FAQs />}

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