// @ts-nocheck
import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Globe, Clock, Phone, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lang: Lang;
}

const countryCodes = [
    { code: "+971", country: "UAE 🇦🇪" },
    { code: "+1", country: "USA/Canada 🇺🇸" },
    { code: "+44", country: "UK 🇬🇧" },
    { code: "+33", country: "France 🇫🇷" },
    { code: "+49", country: "Germany 🇩🇪" },
    { code: "+7", country: "Russia 🇷🇺" },
    { code: "+966", country: "KSA 🇸🇦" },
    { code: "+965", country: "Kuwait 🇰🇼" },
    { code: "+974", country: "Qatar 🇶🇦" },
    { code: "+973", country: "Bahrain 🇧🇭" },
    { code: "+968", country: "Oman 🇴🇲" },
    { code: "+86", country: "China 🇨🇳" },
    { code: "+91", country: "India 🇮🇳" },
    { code: "+92", country: "Pakistan 🇵🇰" },
    { code: "+20", country: "Egypt 🇪🇬" },
    { code: "+34", country: "Spain 🇪🇸" },
    { code: "+39", country: "Italy 🇮🇹" },
    { code: "+90", country: "Turkey 🇹🇷" },
    { code: "+61", country: "Australia 🇦🇺" },
];

const dubaiTimes = [
    "09:00 AM (Dubai Time)", "10:00 AM (Dubai Time)", "11:00 AM (Dubai Time)",
    "12:00 PM (Dubai Time)", "01:00 PM (Dubai Time)", "02:00 PM (Dubai Time)",
    "03:00 PM (Dubai Time)", "04:00 PM (Dubai Time)", "05:00 PM (Dubai Time)",
    "06:00 PM (Dubai Time)", "07:00 PM (Dubai Time)", "08:00 PM (Dubai Time)"
];

const translations = {
    en: {
        title: "Request a Consultation",
        subtitle: "Leave your details and our team will contact you shortly.",
        name: "Full Name",
        phone: "Phone Number",
        whatsapp: "WhatsApp Number",
        email: "Email Address",
        time: "Best Time to Contact",
        submit: "SUBMIT REQUEST",
        sending: "Sending...",
        successTitle: "Request Received",
        successMsg: (name: string, time: string) => `Thank you ${name}. We have received your request and will contact you around ${time}.`
    },
    fr: {
        title: "Demander une Consultation",
        subtitle: "Laissez vos coordonnées et notre équipe vous contactera sous peu.",
        name: "Nom Complet",
        phone: "Numéro de Téléphone",
        whatsapp: "Numéro WhatsApp",
        email: "Adresse E-mail",
        time: "Meilleur moment pour contacter",
        submit: "ENVOYER LA DEMANDE",
        sending: "Envoi...",
        successTitle: "Demande Reçue",
        successMsg: (name: string, time: string) => `Merci ${name}. Nous avons bien reçu votre demande et vous contacterons vers ${time}.`
    },
    ar: {
        title: "طلب استشارة",
        subtitle: "اترك بياناتك وسيقوم فريقنا بالاتصال بك قريباً.",
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        whatsapp: "رقم الواتساب",
        email: "البريد الإلكتروني",
        time: "أفضل وقت للاتصال",
        submit: "إرسال الطلب",
        sending: "جاري الإرسال...",
        successTitle: "تم استلام الطلب",
        successMsg: (name: string, time: string) => `شكراً ${name}. لقد تلقينا طلبك وسنتصل بك في حدود الساعة ${time}.`
    }
};

const BookingModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
    const t = translations[lang] || translations['en'];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        code: '+971',
        phone: '',
        whatsappCode: '+971',
        whatsapp: '',
        email: '',
        time: dubaiTimes[0]
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formBody = new FormData();
        formBody.append("_subject", `Consultation Request: ${formData.name}`);
        formBody.append("Name", formData.name);
        formBody.append("Phone", `${formData.code} ${formData.phone}`);
        formBody.append("WhatsApp", `${formData.whatsappCode} ${formData.whatsapp}`);
        formBody.append("Email", formData.email);
        formBody.append("Best_Time_Dubai", formData.time);
        formBody.append("_captcha", "false");

        try {
            await fetch("https://formsubmit.co/ajax/contact@mapstonegroup.com", {
                method: "POST",
                body: formBody
            });
            setIsSuccess(true);
        } catch (err) {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="bg-mapstone-blue p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-serif">{t.title}</h2>
                        <p className="text-white/70 text-sm mt-1">{t.subtitle}</p>
                    </div>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={24} /></button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {isSuccess ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-serif text-mapstone-blue mb-4">{t.successTitle}</h3>
                            <p className="text-stone-500 leading-relaxed">
                                {t.successMsg(formData.name, formData.time)}
                            </p>
                            <button onClick={onClose} className="mt-8 bg-mapstone-blue text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-nobel-gold transition-colors w-full">
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.name}</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-3 text-stone-400" />
                                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full border border-stone-200 rounded-sm py-2.5 ${lang === 'ar' ? 'pr-10' : 'pl-10'} focus:outline-none focus:border-nobel-gold`} />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.phone}</label>
                                <div className="flex gap-2">
                                    <select className="border border-stone-200 rounded-sm py-2.5 px-2 bg-stone-50 text-sm focus:outline-none focus:border-nobel-gold w-1/3" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})}>
                                        {countryCodes.map(c => <option key={c.code} value={c.code}>{c.country} {c.code}</option>)}
                                    </select>
                                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-2/3 border border-stone-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-nobel-gold" placeholder="50 123 4567"/>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.whatsapp}</label>
                                <div className="flex gap-2">
                                    <select className="border border-stone-200 rounded-sm py-2.5 px-2 bg-stone-50 text-sm focus:outline-none focus:border-nobel-gold w-1/3" value={formData.whatsappCode} onChange={e => setFormData({...formData, whatsappCode: e.target.value})}>
                                        {countryCodes.map(c => <option key={c.code} value={c.code}>{c.country} {c.code}</option>)}
                                    </select>
                                    <input type="tel" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-2/3 border border-stone-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-nobel-gold" placeholder="Optional"/>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.email}</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-3 text-stone-400" />
                                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full border border-stone-200 rounded-sm py-2.5 ${lang === 'ar' ? 'pr-10' : 'pl-10'} focus:outline-none focus:border-nobel-gold`} />
                                </div>
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.time}</label>
                                <div className="relative">
                                    <Clock size={18} className="absolute left-3 top-3 text-stone-400" />
                                    <select value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className={`w-full border border-stone-200 rounded-sm py-2.5 ${lang === 'ar' ? 'pr-10' : 'pl-10'} bg-white focus:outline-none focus:border-nobel-gold appearance-none`}>
                                        {dubaiTimes.map(time => <option key={time} value={time}>{time}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-nobel-gold text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg flex items-center justify-center gap-2">
                                {isSubmitting ? <><Loader2 size={18} className="animate-spin"/> {t.sending}</> : t.submit}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default BookingModal;