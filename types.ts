export type Lang = 'en' | 'fr';
export type View = 'home' | 'privacy' | 'terms' | 'faq' | 'contact' | 'services';

export interface TranslationStructure {
  nav: { [key: string]: string };
  hero: { [key: string]: string };
  about: { [key: string]: string };
  properties: { [key: string]: string };
  landlords: { 
    label: string;
    title: string;
    desc: string;
    list: string[];
  };
  partners: { title: string };
  amenities: { title: string; desc: string };
  reviews: { label: string; title: string };
  footer: { [key: string]: string };
  booking: { [key: string]: string };
  contactPage: { [key: string]: string };
  servicesPage: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
    app: {
      title: string;
      desc: string;
      features: string[];
    };
  };
}