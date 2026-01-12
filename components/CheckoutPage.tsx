// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UploadCloud, Loader2, Check, AlertTriangle, Users, CreditCard, Wallet, Smartphone, Globe, Key } from 'lucide-react';

const MotionDiv = motion.div as any;

interface Props {
    lang: string;
    onBack: () => void;
    bookingData: {
        propertyName?: string;
        propertyId: number | null;
        dateRange: [Date, Date] | null;
        guests: { adults: number; children: number };
    };
}

const translations = {
    en: { back: "Back", yourBooking: "Your Booking", property: "Property", dates: "Dates", guests: "Guests", mainGuest: "Main Guest Details", fullName: "Full Name", passport: "Passport / Emirates ID No", phone: "Phone", email: "Email", eKey: "Important: Digital E-Keys will be sent to this email.", uploadMain: "Upload Main Guest Passport/ID", upload2: "Upload Guest 2 Passport/ID", clickUpload: "Click to Upload Document", secondGuest: "Second Guest Details", payment: "Payment Method", complete: "Complete Reservation", visa: "Visa / Mastercard", apple: "Apple Pay", google: "Google Pay", paypal: "PayPal", uploading: "Uploading Booking & Documents...", errorMsg: "Please upload all required documents." },
    fr: { back: "Retour", yourBooking: "Votre Réservation", property: "Propriété", dates: "Dates", guests: "Voyageurs", mainGuest: "Détails de l'Invité Principal", fullName: "Nom Complet", passport: "Passeport / ID", phone: "Téléphone", email: "E-mail", eKey: "Important : Les clés numériques seront envoyées à cet e-mail.", uploadMain: "Télécharger Passeport/ID (Principal)", upload2: "Télécharger Passeport/ID (Invité 2)", clickUpload: "Cliquez pour Télécharger", secondGuest: "Détails du 2ème Invité", payment: "Méthode de Paiement", complete: "Terminer la Réservation", visa: "Visa / Mastercard", apple: "Apple Pay", google: "Google Pay", paypal: "PayPal", uploading: "Téléchargement en cours...", errorMsg: "Veuillez télécharger tous les documents requis." },
    ar: { back: "رجوع", yourBooking: "حجزك", property: "العقار", dates: "التواريخ", guests: "الضيوف", mainGuest: "تفاصيل الضيف الرئيسي", fullName: "الاسم الكامل", passport: "رقم الجواز / الهوية", phone: "الهاتف", email: "البريد الإلكتروني", eKey: "مهم: سيتم إرسال المفاتيح الرقمية إلى هذا البريد.", uploadMain: "تحميل جواز/هوية الضيف الرئيسي", upload2: "تحميل جواز/هوية الضيف الثاني", clickUpload: "اضغط لتحميل المستند", secondGuest: "تفاصيل الضيف الثاني", payment: "طريقة الدفع", complete: "إتمام الحجز", visa: "فيزا / ماستركارد", apple: "أبل باي", google: "جوجل باي", paypal: "باي بال", uploading: "جاري المعالجة...", errorMsg: "يرجى تحميل جميع المستندات المطلوبة." }
};

export const CheckoutPage: React.FC<Props> = ({ lang, onBack, bookingData }) => {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [formError, setFormError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('visa');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const t = translations[lang] || translations['en'];
    const requiresSecondGuest = bookingData.guests.adults > 1;
    const formRef = useRef<HTMLFormElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isSecondGuest: boolean) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // 4MB limit prevents server timeout on free tier
            if (file.size > 4 * 1024 * 1024) { 
                alert("File too large. Max 4MB.");
                return;
            }
            if (isSecondGuest) setFile2(file);
            else setFile1(file);
            setFormError('');
        }
    };

    const validateAndSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        setFormError('');

        if (!file1) {
            setFormError(t.errorMsg);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (requiresSecondGuest && !file2) {
            setFormError(t.errorMsg);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Lock the screen and show loading
        setIsSubmitting(true);

        // Submit the form natively (Guarantees file delivery)
        if (formRef.current) {
            formRef.current.submit(); 
        }
    };

    const checkIn = bookingData.dateRange?.[0]?.toDateString() || "N/A";
    const checkOut = bookingData.dateRange?.[1]?.toDateString() || "N/A";
    const totalGuests = `${bookingData.guests.adults} Adults, ${bookingData.guests.children} Children`;

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-4 md:px-0" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto max-w-4xl">
                <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-mapstone-blue transition-colors mb-8 font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={16} /> {t.back}
                </button>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* LEFT: SUMMARY */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 sticky top-32">
                            <h3 className="font-serif text-xl text-mapstone-blue mb-4">{t.yourBooking}</h3>
                            <div className="space-y-4 text-sm">
                                <div><p className="text-stone-400 text-xs font-bold uppercase">{t.property}</p><p className="font-medium text-mapstone-blue">{bookingData.propertyName}</p></div>
                                <div><p className="text-stone-400 text-xs font-bold uppercase">{t.dates}</p><p className="font-medium text-stone-700">{bookingData.dateRange?.[0]?.toLocaleDateString()} — {bookingData.dateRange?.[1]?.toLocaleDateString()}</p></div>
                                <div><p className="text-stone-400 text-xs font-bold uppercase">{t.guests}</p><p className="font-medium text-stone-700">{totalGuests}</p></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: NATIVE FORM */}
                    <div className="md:col-span-2 relative">
                        
                        {/* FULL SCREEN LOADER ON SUBMIT */}
                        {isSubmitting && (
                            <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm h-full">
                                <Loader2 size={50} className="text-nobel-gold animate-spin mb-4" />
                                <p className="text-mapstone-blue font-serif text-xl animate-pulse">{t.uploading}</p>
                                <p className="text-xs text-stone-400 mt-2">Do not close this window</p>
                            </div>
                        )}

                        {formError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm flex items-start gap-3 mb-6 animate-pulse">
                                <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                                <p className="text-sm font-bold">{formError}</p>
                            </div>
                        )}

                        <form 
                            ref={formRef}
                            action="https://formsubmit.co/contact@mapstonegroup.com" 
                            method="POST" 
                            encType="multipart/form-data" 
                            className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 space-y-8"
                        >
                            {/* --- CRITICAL FIXES FOR 500 ERROR --- */}
                            {/* 1. Removed _template="table" (Causes crashes with files) */}
                            {/* 2. Added _captcha="false" (Speeds up process) */}
                            {/* 3. Valid _next URL */}
                            <input type="hidden" name="_subject" value={`New Booking: ${bookingData.propertyName}`} />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="https://www.mapstoneholidayhome.com/?success=true" />
                            
                            <input type="hidden" name="Property" value={bookingData.propertyName || "Unknown"} />
                            <input type="hidden" name="Check-in" value={checkIn} />
                            <input type="hidden" name="Check-out" value={checkOut} />
                            <input type="hidden" name="Total_Guests" value={totalGuests} />

                            {/* MAIN GUEST */}
                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue border-b border-stone-100 pb-2 mb-6">{t.mainGuest}</h3>
                                <div className="space-y-4">
                                    <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.fullName} <span className="text-red-500">*</span></label><input type="text" name="Main_Name" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="As shown on ID" /></div>
                                    <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.passport} <span className="text-red-500">*</span></label><input type="text" name="Main_Passport_No" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="X0000000" /></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.phone} <span className="text-red-500">*</span></label><input type="tel" name="Main_Phone" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="+971..." /></div>
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.email} <span className="text-red-500">*</span></label><input type="email" name="Main_Email" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="email@example.com" /></div>
                                    </div>
                                    <div className="bg-amber-50 text-amber-700 text-xs p-3 rounded-sm border border-amber-100 flex items-start gap-2">
                                        <Key size={14} className="shrink-0 mt-0.5"/><p><strong>{t.eKey}</strong></p>
                                    </div>

                                    {/* UPLOAD 1 - Simple Name "doc1" to prevent array issues */}
                                    <div className="pt-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">{t.uploadMain} <span className="text-red-500">*</span></label>
                                        <div className={`border-2 border-dashed rounded-lg p-6 text-center bg-stone-50 relative ${!file1 ? 'border-red-300' : 'border-green-300 bg-green-50'}`}>
                                            <input type="file" name="doc1" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, false)} />
                                            <div className="flex flex-col items-center">
                                                {file1 ? <Check className="text-green-600 mb-2"/> : <UploadCloud className="text-stone-400 mb-2"/>}
                                                <p className="text-xs font-bold text-stone-600">{file1 ? file1.name : t.clickUpload}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECOND GUEST */}
                            {requiresSecondGuest && (
                                <MotionDiv initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-8 border-t border-stone-100">
                                    <div className="flex items-center gap-2 mb-6"><div className="bg-nobel-gold/10 p-2 rounded-full text-nobel-gold"><Users size={20} /></div><h3 className="font-serif text-xl text-mapstone-blue">{t.secondGuest}</h3></div>
                                    <div className="bg-stone-50/50 p-6 rounded-lg border border-stone-200 space-y-4">
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.fullName} <span className="text-red-500">*</span></label><input type="text" name="Guest2_Name" required className="w-full border p-3 rounded-sm bg-white focus:outline-none focus:border-nobel-gold" /></div>
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.passport} <span className="text-red-500">*</span></label><input type="text" name="Guest2_Passport_No" required className="w-full border p-3 rounded-sm bg-white focus:outline-none focus:border-nobel-gold" /></div>
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">{t.phone} <span className="text-red-500">*</span></label><input type="tel" name="Guest2_Phone" required className="w-full border p-3 rounded-sm bg-white focus:outline-none focus:border-nobel-gold" /></div>
                                        
                                        {/* UPLOAD 2 - Simple Name "doc2" */}
                                        <div className="pt-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">{t.upload2} <span className="text-red-500">*</span></label>
                                            <div className={`border-2 border-dashed rounded-lg p-6 text-center bg-white relative ${!file2 ? 'border-red-300' : 'border-green-300 bg-green-50'}`}>
                                                <input type="file" name="doc2" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, true)} />
                                                <div className="flex flex-col items-center">
                                                    {file2 ? <Check className="text-green-600 mb-2"/> : <UploadCloud className="text-stone-400 mb-2"/>}
                                                    <p className="text-xs font-bold text-stone-600">{file2 ? file2.name : t.clickUpload}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </MotionDiv>
                            )}
                            
                            {/* PAYMENT */}
                            <div className="pt-8 border-t border-stone-100">
                                <h3 className="font-serif text-xl text-mapstone-blue mb-6">{t.payment}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer ${paymentMethod === 'Visa' ? 'border-nobel-gold bg-amber-50/20' : 'border-stone-200'}`}>
                                        <input type="radio" name="Payment_Method" value="Visa" checked={paymentMethod === 'Visa'} onChange={() => setPaymentMethod('Visa')} className="accent-nobel-gold w-5 h-5" />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><CreditCard size={18}/> {t.visa}</p></div>
                                    </label>
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer ${paymentMethod === 'Apple_Pay' ? 'border-nobel-gold bg-amber-50/20' : 'border-stone-200'}`}>
                                        <input type="radio" name="Payment_Method" value="Apple_Pay" checked={paymentMethod === 'Apple_Pay'} onChange={() => setPaymentMethod('Apple_Pay')} className="accent-nobel-gold w-5 h-5" />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><Wallet size={18}/> {t.apple}</p></div>
                                    </label>
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer ${paymentMethod === 'Google_Pay' ? 'border-nobel-gold bg-amber-50/20' : 'border-stone-200'}`}>
                                        <input type="radio" name="Payment_Method" value="Google_Pay" checked={paymentMethod === 'Google_Pay'} onChange={() => setPaymentMethod('Google_Pay')} className="accent-nobel-gold w-5 h-5" />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><Smartphone size={18}/> {t.google}</p></div>
                                    </label>
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer ${paymentMethod === 'PayPal' ? 'border-nobel-gold bg-amber-50/20' : 'border-stone-200'}`}>
                                        <input type="radio" name="Payment_Method" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={() => setPaymentMethod('PayPal')} className="accent-nobel-gold w-5 h-5" />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><Globe size={18}/> {t.paypal}</p></div>
                                    </label>
                                </div>
                            </div>

                            <button type="button" onClick={validateAndSubmit} disabled={isSubmitting} className="w-full bg-nobel-gold text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> {t.uploading}</> : t.complete}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};