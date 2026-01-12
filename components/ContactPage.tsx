// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Lang } from '../types';

const MotionDiv = motion.div as any;

const translations = {
    en: { title: "Get in Touch", subtitle: "We are here to assist you.", formTitle: "Send a Message", name: "Name", email: "Email", msg: "Message", send: "Send Message", address: "Al Barsha First, Dubai, UAE", phone: "+971 58 592 8787", hours: "Mon - Sun: 9:00 AM - 6:00 PM" },
    fr: { title: "Contactez-nous", subtitle: "Nous sommes là pour vous aider.", formTitle: "Envoyer un Message", name: "Nom", email: "E-mail", msg: "Message", send: "Envoyer", address: "Al Barsha First, Dubaï, EAU", phone: "+971 58 592 8787", hours: "Lun - Dim : 9h00 - 18h00" },
    ar: { title: "تواصل معنا", subtitle: "نحن هنا لمساعدتك.", formTitle: "أرسل رسالة", name: "الاسم", email: "البريد", msg: "الرسالة", send: "إرسال", address: "البرشاء الأولى، دبي، الإمارات", phone: "+971 58 592 8787", hours: "السبت - الخميس: 9:00 ص - 6:00 م" }
};

const ContactPage = ({ lang }: { lang: Lang }) => {
    const t = translations[lang] || translations['en'];

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6">
                <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-mapstone-blue mb-4">{t.title}</h1>
                    <p className="text-stone-500 text-lg">{t.subtitle}</p>
                </MotionDiv>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-stone-100">
                        <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center text-nobel-gold mx-auto mb-4"><Phone size={24}/></div>
                        <h3 className="font-serif text-lg text-mapstone-blue mb-2">Phone</h3>
                        <p className="text-stone-500">{t.phone}</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-stone-100">
                        <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center text-nobel-gold mx-auto mb-4"><Mail size={24}/></div>
                        <h3 className="font-serif text-lg text-mapstone-blue mb-2">Email</h3>
                        <p className="text-stone-500">contact@mapstonegroup.com</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-stone-100">
                        <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center text-nobel-gold mx-auto mb-4"><MapPin size={24}/></div>
                        <h3 className="font-serif text-lg text-mapstone-blue mb-2">Office</h3>
                        <p className="text-stone-500">{t.address}</p>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-stone-100">
                    <h3 className="font-serif text-2xl text-mapstone-blue mb-6 text-center">{t.formTitle}</h3>
                    <form action="https://formsubmit.co/contact@mapstonegroup.com" method="POST" className="space-y-6">
                        <input type="hidden" name="_subject" value="New Contact Message" />
                        <input type="hidden" name="_next" value="https://www.mapstoneholidayhome.com/?success=true" />
                        <div><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">{t.name}</label><input type="text" name="name" required className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-nobel-gold"/></div>
                        <div><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">{t.email}</label><input type="email" name="email" required className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-nobel-gold"/></div>
                        <div><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">{t.msg}</label><textarea name="message" required rows={4} className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-nobel-gold"></textarea></div>
                        <button type="submit" className="w-full bg-mapstone-blue text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-nobel-gold transition-colors">{t.send}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;