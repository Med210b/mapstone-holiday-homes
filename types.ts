export type Lang = 'en' | 'fr' | 'es' | 'de' | 'ar' | 'ru';

export type View = 
  | 'home' 
  | 'about' 
  | 'properties' 
  | 'services' 
  | 'landlords' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'faq'
  | 'checkout'   // Added for booking flow
  | 'calendar'   // Added for booking flow
  | 'thankyou';  // Added for success page

export interface TranslationStructure {
  nav: { [key: string]: string };
  hero: { [key: string]: string };
  about: { [key: string]: string };
  properties: { [key: string]: string };
  landlords: { [key: string]: string }; 
  partners: { title: string };
  amenities: { title: string; desc: string };
  footer: { [key: string]: string };
  booking: { [key: string]: string };
  contactPage: { [key: string]: string };
  
  // New Home Page Sections
  standard?: { label: string; title: string; desc: string };
  concierge?: { 
    label: string; 
    title: string; 
    item1Title: string; item1Desc: string;
    item2Title: string; item2Desc: string;
    item3Title: string; item3Desc: string;
  };
  testimonials?: { text: string; author: string; location: string };
  cityGuide?: { label: string; title: string; desc: string; cta: string };
}