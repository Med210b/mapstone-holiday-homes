import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UploadCloud, FileText, X, Loader2, Check, UserPlus, AlertTriangle } from 'lucide-react';

// --- FIX: Bypass strict type check for framer-motion ---
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
    const [showSecondGuest, setShowSecondGuest] = useState(false);
    const [formError, setFormError] = useState('');
    
    // File Upload State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        guest2Name: '',
        guest2Phone: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setFormError(''); // Clear error on fix
        }
    };

    const removeFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        // 1. Strict Validation for Main Guest
        if (!formData.fullName || !formData.phone || !formData.email || !selectedFile) {
            setFormError("Please fill in all Main Guest details and upload your ID.");
            return;
        }

        // 2. Strict Validation for Second Guest (if enabled)
        if (showSecondGuest) {
            if (!formData.guest2Name || !formData.guest2Phone) {
                setFormError("You enabled Second Guest. Please fill their details or uncheck the box.");
                return;
            }
        }

        setIsSubmitting(true);

        const formElement = e.target as HTMLFormElement;
        const formDataObj = new FormData(formElement);

        formDataObj.append("_subject", `New Reservation: ${bookingData.propertyName}`);
        formDataObj.append("_captcha", "false");
        formDataObj.append("_template", "table");
        
        const checkIn = bookingData.dateRange?.[0]?.toDateString() || "N/A";
        const checkOut = bookingData.dateRange?.[1]?.toDateString() || "N/A";
        
        formDataObj.append("Property", bookingData.propertyName || "Unknown");
        formDataObj.append("Check-in", checkIn);
        formDataObj.append("Check-out", checkOut);
        formDataObj.append("Total Guests", `${bookingData.guests.adults} Adults, ${bookingData.guests.children} Children`);

        if (showSecondGuest) {
            formDataObj.append("Second Guest Name", formData.guest2Name);
            formDataObj.append("Second Guest Phone", formData.guest2Phone);
        }

        try {
            await fetch("https://formsubmit.co/contact@mapstonegroup.com", {
                method: "POST",
                body: formDataObj
            });
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            alert("Something went wrong. Please try again.");
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
                        We have received your documents and booking details.
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
                    {/* LEFT: BOOKING SUMMARY */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 sticky top-32">
                            <h3 className="font-serif text-xl text-mapstone-blue mb-4">Your Booking</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-stone-400 text-xs font-bold uppercase">Property</p>
                                    <p className="font-medium text-mapstone-blue">{bookingData.propertyName}</p>
                                </div>
                                <div>
                                    <p className="text-stone-400 text-xs font-bold uppercase">Dates</p>
                                    <p className="font-medium text-stone-700">
                                        {bookingData.dateRange?.[0]?.toLocaleDateString()} — {bookingData.dateRange?.[1]?.toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-stone-400 text-xs font-bold uppercase">Guests</p>
                                    <p className="font-medium text-stone-700">
                                        {bookingData.guests.adults} Adults, {bookingData.guests.children} Children
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: THE FORM */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 space-y-6" encType="multipart/form-data">
                            
                            {/* ERROR MESSAGE */}
                            {formError && (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm flex items-start gap-3 animate-pulse">
                                    <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                                    <p className="text-sm font-bold">{formError}</p>
                                </div>
                            )}

                            <h3 className="font-serif text-xl text-mapstone-blue border-b border-stone-100 pb-2">Main Guest Details</h3>
                            
                            {/* Personal Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="fullName" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="As shown on ID" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                                        <input type="tel" name="phone" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="+971 50 ..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                        <input type="email" name="email" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                    </div>
                                </div>
                            </div>

                            {/* Documents Upload */}
                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue mt-8 mb-4 border-b border-stone-100 pb-2">Identification</h3>
                                <p className="text-xs text-stone-400 mb-4">Please upload a clear copy of your Passport or Emirates ID. This is required by Dubai Tourism law.</p>
                                
                                {!selectedFile ? (
                                    <div className={`border-2 border-dashed rounded-lg p-8 text-center bg-stone-50 hover:bg-white transition-colors group cursor-pointer relative ${formError && !selectedFile ? 'border-red-300 bg-red-50' : 'border-stone-300 hover:border-nobel-gold'}`}>
                                        <input 
                                            type="file" 
                                            name="attachment" 
                                            accept=".pdf,.jpg,.jpeg,.png" 
                                            required 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={handleFileChange}
                                        />
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 text-stone-400 group-hover:text-nobel-gold transition-colors">
                                            <UploadCloud size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-mapstone-blue">Upload Passport / ID <span className="text-red-500">*</span></p>
                                    </div>
                                ) : (
                                    <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={20} /></div>
                                            <div>
                                                <p className="text-sm font-bold text-green-800">File Selected</p>
                                                <p className="text-xs text-green-600 truncate max-w-[200px]">{selectedFile.name}</p>
                                            </div>
                                        </div>
                                        <button onClick={removeFile} className="text-green-400 hover:text-green-700 p-2"><X size={20} /></button>
                                    </div>
                                )}
                            </div>

                            {/* SECOND GUEST SECTION - FIX APPLIED HERE */}
                            <div className="pt-6 border-t border-stone-100">
                                <label className="flex items-center gap-3 cursor-pointer mb-6 group">
                                    <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${showSecondGuest ? 'bg-nobel-gold border-nobel-gold text-white' : 'border-stone-300 bg-white'}`}>
                                        {showSecondGuest && <Check size={14} />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={showSecondGuest} onChange={() => setShowSecondGuest(!showSecondGuest)} />
                                    <span className="font-bold text-mapstone-blue flex items-center gap-2">
                                        <UserPlus size={18} /> Add Second Guest Details
                                    </span>
                                </label>

                                {showSecondGuest && (
                                    <MotionDiv 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-4 pl-4 border-l-2 border-stone-200"
                                    >
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Guest 2 Full Name <span className="text-red-500">*</span></label>
                                            <input type="text" name="guest2Name" className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="Full Name" value={formData.guest2Name} onChange={e => setFormData({...formData, guest2Name: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Guest 2 Phone / WhatsApp <span className="text-red-500">*</span></label>
                                            <input type="tel" name="guest2Phone" className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="+971..." value={formData.guest2Phone} onChange={e => setFormData({...formData, guest2Phone: e.target.value})} />
                                        </div>
                                    </MotionDiv>
                                )}
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