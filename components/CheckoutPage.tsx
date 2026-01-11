// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UploadCloud, FileText, X, Loader2, Check, UserPlus, AlertTriangle, Users, CreditCard, Banknote, Globe } from 'lucide-react';

const MotionDiv = motion.div as any;

const COUNTRY_CODES = [
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
];

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

export const CheckoutPage: React.FC<Props> = ({ lang, onBack, bookingData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formError, setFormError] = useState('');
    
    const requiresSecondGuest = bookingData.guests.adults > 1;

    // File Upload State
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    
    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        guest2Name: '',
        guest2Phone: '',
        paymentMethod: 'visa'
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isSecondGuest: boolean) => {
        if (e.target.files && e.target.files.length > 0) {
            if (isSecondGuest) {
                setFile2(e.target.files[0]);
            } else {
                setFile1(e.target.files[0]);
            }
            setFormError(''); 
        }
    };

    const removeFile = (e: React.MouseEvent, isSecondGuest: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSecondGuest) setFile2(null);
        else setFile1(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        // 1. Strict Validation
        if (!formData.fullName || !formData.phone || !formData.email || !file1) {
            setFormError("Please fill in all Main Guest details and upload your ID.");
            return;
        }

        if (requiresSecondGuest) {
            if (!formData.guest2Name || !formData.guest2Phone || !file2) {
                setFormError("Second Guest details and ID are required.");
                return;
            }
        }

        setIsSubmitting(true);

        const formElement = e.target as HTMLFormElement;
        const formDataObj = new FormData(formElement);

        const endpoint = "https://formsubmit.co/ajax/contact@mapstonegroup.com";
        
        formDataObj.append("_subject", `New Reservation: ${bookingData.propertyName}`);
        formDataObj.append("_template", "table");
        
        const checkIn = bookingData.dateRange?.[0]?.toDateString() || "N/A";
        const checkOut = bookingData.dateRange?.[1]?.toDateString() || "N/A";
        
        formDataObj.append("Property", bookingData.propertyName || "Unknown");
        formDataObj.append("Check-in", checkIn);
        formDataObj.append("Check-out", checkOut);
        formDataObj.append("Total Guests", `${bookingData.guests.adults} Adults, ${bookingData.guests.children} Children`);
        
        let paymentLabel = "Visa / Mastercard";
        if (formData.paymentMethod === 'paypal') paymentLabel = "PayPal";
        if (formData.paymentMethod === 'cash') paymentLabel = "Cash (UAE)";
        formDataObj.append("Payment Method", paymentLabel);

        // --- FILE HANDLING FIX ---
        // FormSubmit looks for inputs named "attachment". 
        // We ensure we append them with specific keys that might help, 
        // but the 'attachment' name in input is key.
        formDataObj.delete("attachment"); // clear auto-capture to be safe
        formDataObj.delete("attachment2");

        if (file1) formDataObj.append("attachment", file1);
        if (requiresSecondGuest && file2) formDataObj.append("attachment2", file2);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: formDataObj
            });
            
            const result = await response.json();
            
            if (response.ok || result.success === "true") {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                 throw new Error("Submission failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please check your internet connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
                <MotionDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-lg">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                    </div>
                    <h2 className="text-3xl font-serif text-mapstone-blue mb-4">Request Sent</h2>
                    <p className="text-stone-500 mb-8">
                        Thank you, <span className="font-bold text-mapstone-blue">{formData.fullName}</span>. 
                        We have received your booking and documents.
                    </p>
                    <button onClick={onBack} className="bg-mapstone-blue text-white px-8 py-3 rounded-sm uppercase font-bold hover:bg-nobel-gold transition-colors">
                        Back to Properties
                    </button>
                </MotionDiv>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-4 md:px-0">
            <div className="container mx-auto max-w-4xl">
                <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-mapstone-blue transition-colors mb-8 font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={16} /> Change Dates / Guests
                </button>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 sticky top-32">
                            <h3 className="font-serif text-xl text-mapstone-blue mb-4">Your Booking</h3>
                            <div className="space-y-4 text-sm">
                                <div><p className="text-stone-400 text-xs font-bold uppercase">Property</p><p className="font-medium text-mapstone-blue">{bookingData.propertyName}</p></div>
                                <div><p className="text-stone-400 text-xs font-bold uppercase">Dates</p><p className="font-medium text-stone-700">{bookingData.dateRange?.[0]?.toLocaleDateString()} — {bookingData.dateRange?.[1]?.toLocaleDateString()}</p></div>
                                <div><p className="text-stone-400 text-xs font-bold uppercase">Guests</p><p className="font-medium text-stone-700">{bookingData.guests.adults} Adults, {bookingData.guests.children} Children</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 space-y-8" encType="multipart/form-data">
                            {formError && (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm flex items-start gap-3 animate-pulse">
                                    <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                                    <p className="text-sm font-bold">{formError}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue border-b border-stone-100 pb-2 mb-6">Main Guest Details</h3>
                                <div className="space-y-4">
                                    <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Full Name <span className="text-red-500">*</span></label><input type="text" name="fullName" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="As shown on ID" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Phone Number <span className="text-red-500">*</span></label><input type="tel" name="phone" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="+971 50 ..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Email Address <span className="text-red-500">*</span></label><input type="email" name="email" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                                    </div>
                                    <div className="pt-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Upload Main Guest Passport / ID <span className="text-red-500">*</span></label>
                                        {!file1 ? (
                                            <div className={`border-2 border-dashed rounded-lg p-6 text-center bg-stone-50 hover:bg-white transition-colors group cursor-pointer relative ${formError && !file1 ? 'border-red-300 bg-red-50' : 'border-stone-300 hover:border-nobel-gold'}`}>
                                                {/* IMPORTANT: name="attachment" is key for FormSubmit email attachments */}
                                                <input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, false)} />
                                                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-2 text-stone-400 group-hover:text-nobel-gold transition-colors"><UploadCloud size={20} /></div>
                                                <p className="text-xs font-bold text-mapstone-blue">Click to Upload Document</p>
                                            </div>
                                        ) : (
                                            <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3"><div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={16} /></div><div><p className="text-xs font-bold text-green-800">Ready to upload</p><p className="text-[10px] text-green-600 truncate max-w-[150px]">{file1.name}</p></div></div>
                                                <button onClick={(e) => removeFile(e, false)} className="text-green-400 hover:text-green-700 p-2"><X size={18} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {requiresSecondGuest && (
                                <MotionDiv initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-8 border-t border-stone-100">
                                    <div className="flex items-center gap-2 mb-6"><div className="bg-nobel-gold/10 p-2 rounded-full text-nobel-gold"><Users size={20} /></div><h3 className="font-serif text-xl text-mapstone-blue">Second Guest Details</h3></div>
                                    <div className="bg-stone-50/50 p-6 rounded-lg border border-stone-200 space-y-4">
                                        <p className="text-xs text-stone-400 mb-2 font-medium flex items-center gap-1"><AlertTriangle size={12} className="text-nobel-gold" /> Required because you selected {bookingData.guests.adults} adults.</p>
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Guest 2 Full Name <span className="text-red-500">*</span></label><input type="text" name="guest2Name" className="w-full border p-3 rounded-sm bg-white focus:outline-none focus:border-nobel-gold" placeholder="Full Name" value={formData.guest2Name} onChange={e => setFormData({...formData, guest2Name: e.target.value})} /></div>
                                        <div><label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Guest 2 Phone / WhatsApp <span className="text-red-500">*</span></label><input type="tel" name="guest2Phone" className="w-full border p-3 rounded-sm bg-white focus:outline-none focus:border-nobel-gold" placeholder="+971..." value={formData.guest2Phone} onChange={e => setFormData({...formData, guest2Phone: e.target.value})} /></div>
                                        <div className="pt-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Upload Guest 2 Passport / ID <span className="text-red-500">*</span></label>
                                            {!file2 ? (
                                                <div className={`border-2 border-dashed rounded-lg p-6 text-center bg-white hover:bg-stone-50 transition-colors group cursor-pointer relative ${formError && !file2 ? 'border-red-300 bg-red-50' : 'border-stone-300 hover:border-nobel-gold'}`}>
                                                    {/* IMPORTANT: name="attachment2" for second file */}
                                                    <input type="file" name="attachment2" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, true)} />
                                                    <div className="w-10 h-10 bg-stone-100 rounded-full shadow-sm flex items-center justify-center mx-auto mb-2 text-stone-400 group-hover:text-nobel-gold transition-colors"><UploadCloud size={20} /></div>
                                                    <p className="text-xs font-bold text-mapstone-blue">Click to Upload Document</p>
                                                </div>
                                            ) : (
                                                <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={16} /></div><div><p className="text-xs font-bold text-green-800">Ready to upload</p><p className="text-[10px] text-green-600 truncate max-w-[150px]">{file2.name}</p></div></div>
                                                    <button onClick={(e) => removeFile(e, true)} className="text-green-400 hover:text-green-700 p-2"><X size={18} /></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </MotionDiv>
                            )}
                            
                            <div className="pt-8 border-t border-stone-100">
                                <h3 className="font-serif text-xl text-mapstone-blue mb-6">Payment Method</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'visa' ? 'border-nobel-gold bg-amber-50/20 ring-1 ring-nobel-gold' : 'border-stone-200 hover:border-stone-300'}`}>
                                        <input type="radio" name="paymentMethod" value="visa" className="accent-nobel-gold w-5 h-5" checked={formData.paymentMethod === 'visa'} onChange={() => setFormData({...formData, paymentMethod: 'visa'})} />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><CreditCard size={18} /> Visa / Mastercard</p><p className="text-xs text-stone-400">A secure payment link will be sent to your email.</p></div>
                                    </label>
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-nobel-gold bg-amber-50/20 ring-1 ring-nobel-gold' : 'border-stone-200 hover:border-stone-300'}`}>
                                        <input type="radio" name="paymentMethod" value="paypal" className="accent-nobel-gold w-5 h-5" checked={formData.paymentMethod === 'paypal'} onChange={() => setFormData({...formData, paymentMethod: 'paypal'})} />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><Globe size={18} /> PayPal</p><p className="text-xs text-stone-400">You will receive an official invoice.</p></div>
                                    </label>
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'cash' ? 'border-nobel-gold bg-amber-50/20 ring-1 ring-nobel-gold' : 'border-stone-200 hover:border-stone-300'}`}>
                                        <input type="radio" name="paymentMethod" value="cash" className="accent-nobel-gold w-5 h-5" checked={formData.paymentMethod === 'cash'} onChange={() => setFormData({...formData, paymentMethod: 'cash'})} />
                                        <div className="flex-1"><p className="font-bold text-mapstone-blue flex items-center gap-2"><Banknote size={18} /> Cash</p><p className="text-xs text-stone-400">Available for UAE residents or payment upon arrival only.</p></div>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-nobel-gold text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg flex justify-center items-center gap-2">
                                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : 'Complete Reservation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};