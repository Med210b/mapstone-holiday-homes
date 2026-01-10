// src/components/CheckoutPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, CreditCard, Banknote, Search, ChevronDown, Check, Loader2, AlertCircle, FileText, X } from 'lucide-react';
import { COUNTRY_CODES } from '../data/countries';

interface Props {
    lang: string;
    onBack: () => void;
    bookingData: {
        dateRange: [Date, Date] | null;
        guests: { adults: number; children: number };
        propertyId: number | null;
    };
}

export const CheckoutPage: React.FC<Props> = ({ lang, onBack, bookingData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    // File Upload State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // Form State
    const [country, setCountry] = useState(COUNTRY_CODES.find(c => c.country === "United Arab Emirates") || COUNTRY_CODES[0]);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        whatsapp: '',
        email: '',
        paymentMethod: 'visa'
    });

    // Country Dropdown State
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterText, setFilterText] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter Logic
    const filteredCodes = COUNTRY_CODES.filter(c => 
        c.country.toLowerCase().startsWith(filterText.toLowerCase()) || 
        c.country.toLowerCase().includes(filterText.toLowerCase()) ||
        c.code.includes(filterText)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const removeFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Manual Validation Check (Double Safety)
        if (!formData.fullName || !formData.phone || !formData.email || !selectedFile) {
            // The browser's "required" attribute usually handles this, 
            // but if the file is missing, we alert manually since custom file inputs can be tricky.
            if (!selectedFile) alert("Please upload your Passport or ID copy.");
            return;
        }

        setIsSubmitting(true);

        const formElement = e.target as HTMLFormElement;
        const formDataObj = new FormData(formElement);

        // Add Configuration Fields for FormSubmit.co
        formDataObj.append("_subject", `New Reservation: ${formData.fullName} - ${bookingData.propertyId}`);
        formDataObj.append("_captcha", "false");
        formDataObj.append("_template", "table");
        
        // Add Booking Context
        const checkIn = bookingData.dateRange?.[0]?.toDateString() || "N/A";
        const checkOut = bookingData.dateRange?.[1]?.toDateString() || "N/A";
        formDataObj.append("Property ID", bookingData.propertyId?.toString() || "Unknown");
        formDataObj.append("Check-in", checkIn);
        formDataObj.append("Check-out", checkOut);
        formDataObj.append("Guests", `${bookingData.guests.adults} Adults, ${bookingData.guests.children} Children`);

        try {
            await fetch("https://formsubmit.co/contact@mapstonegroup.com", {
                method: "POST",
                body: formDataObj
            });
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            alert("Something went wrong. Please try again or contact us via WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-lg border border-stone-100">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                    </div>
                    <h2 className="text-3xl font-serif text-mapstone-blue mb-4">Request Sent Successfully</h2>
                    <p className="text-stone-500 mb-8 leading-relaxed">
                        Thank you, <span className="font-bold text-mapstone-blue">{formData.fullName}</span>. 
                        <br/><br/>
                        We have received your documents and booking details. Our team is reviewing them now and will send the digital keys to your email shortly.
                    </p>
                    <button onClick={onBack} className="bg-mapstone-blue text-white px-8 py-3 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-nobel-gold transition-colors shadow-lg">
                        Return to Properties
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-28 pb-20 px-4 md:px-0">
            <div className="container mx-auto max-w-4xl">
                <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-mapstone-blue transition-colors mb-8 font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={16} /> Back to Properties
                </button>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* LEFT: BOOKING SUMMARY */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 sticky top-32">
                            <h3 className="font-serif text-xl text-mapstone-blue mb-4">Booking Summary</h3>
                            <div className="space-y-4 text-sm">
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
                                <div className="pt-4 border-t border-stone-100">
                                    <p className="text-xs text-orange-500 flex items-start gap-2">
                                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                        Complete the form to proceed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: THE FORM */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 space-y-8" encType="multipart/form-data">
                            
                            {/* Personal Details */}
                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue mb-6 pb-2 border-b border-stone-100">Guest Details</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="fullName" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold invalid:border-red-300 focus:invalid:border-red-500" placeholder="As shown on passport" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                                    </div>

                                    {/* Country Searchable Dropdown */}
                                    <div className="relative" ref={dropdownRef}>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Country / Nationality <span className="text-red-500">*</span></label>
                                        <div className="w-full border p-3 rounded-sm bg-stone-50 flex justify-between items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{country.flag}</span>
                                                <span>{country.country} ({country.code})</span>
                                            </div>
                                            <ChevronDown size={16} className="text-stone-400" />
                                        </div>
                                        <input type="hidden" name="country" value={country.country} />
                                        <input type="hidden" name="countryCode" value={country.code} />

                                        {dropdownOpen && (
                                            <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white shadow-xl border border-stone-100 z-50 mt-1 rounded-sm">
                                                <div className="sticky top-0 bg-white p-2 border-b border-stone-100">
                                                    <div className="flex items-center gap-2 bg-stone-50 px-2 rounded border border-stone-200">
                                                        <Search size={14} className="text-stone-400"/>
                                                        <input type="text" className="w-full bg-transparent text-xs py-2 focus:outline-none" placeholder="Type to search (e.g. Tunisia)" value={filterText} onChange={(e) => setFilterText(e.target.value)} autoFocus />
                                                    </div>
                                                </div>
                                                {filteredCodes.map((c) => (
                                                    <div key={c.country} className="px-4 py-2.5 hover:bg-stone-50 cursor-pointer flex items-center gap-3 transition-colors text-sm" onClick={() => { setCountry(c); setDropdownOpen(false); setFilterText(''); }}>
                                                        <span className="text-xl w-6">{c.flag}</span>
                                                        <span className="font-medium">{c.country}</span>
                                                        <span className="text-stone-400 text-xs ml-auto">{c.code}</span>
                                                    </div>
                                                ))}
                                                {filteredCodes.length === 0 && <div className="p-4 text-center text-xs text-stone-400">No country found</div>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                                            <div className="flex bg-stone-50 border rounded-sm">
                                                <span className="p-3 text-stone-500 border-r bg-white">{country.code}</span>
                                                <input type="tel" name="phone" required className="w-full p-3 bg-transparent focus:outline-none" placeholder="123 4567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">WhatsApp Number <span className="text-stone-300 font-normal normal-case">(Optional)</span></label>
                                            <div className="flex bg-stone-50 border rounded-sm">
                                                <span className="p-3 text-stone-500 border-r bg-white">{country.code}</span>
                                                <input type="tel" name="whatsapp" className="w-full p-3 bg-transparent focus:outline-none" placeholder="123 4567" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                        <input type="email" name="email" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold invalid:border-red-300" placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        <p className="text-[10px] text-nobel-gold mt-2 flex items-start gap-1 p-2 bg-amber-50 rounded-sm border border-amber-100">
                                            <AlertCircle size={12} className="mt-0.5 shrink-0" />
                                            <strong>Important:</strong> Please ensure this email is correct. We will send your digital property keys and access codes to this address.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Upload - UPDATED UI */}
                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue mb-6 pb-2 border-b border-stone-100">Identification</h3>
                                
                                {!selectedFile ? (
                                    <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center bg-stone-50 hover:bg-white hover:border-nobel-gold transition-colors group cursor-pointer relative transition-all duration-300">
                                        <input 
                                            type="file" 
                                            name="attachment" 
                                            accept=".pdf,.jpg,.jpeg,.png,.webp" 
                                            required 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={handleFileChange}
                                        />
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 text-stone-400 group-hover:text-nobel-gold transition-colors">
                                            <UploadCloud size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-mapstone-blue">Upload Passport or Emirates ID <span className="text-red-500">*</span></p>
                                        <p className="text-xs text-stone-400 mt-1">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                                    </div>
                                ) : (
                                    <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between animate-fade-in-up">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-green-800">File Selected Successfully</p>
                                                <p className="text-xs text-green-600 truncate max-w-[200px]">{selectedFile.name}</p>
                                            </div>
                                        </div>
                                        <button onClick={removeFile} className="text-green-400 hover:text-green-700 transition-colors p-2">
                                            <X size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue mb-6 pb-2 border-b border-stone-100">Payment Method <span className="text-red-500">*</span></h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'visa' ? 'border-nobel-gold bg-amber-50/20 ring-1 ring-nobel-gold' : 'border-stone-200 hover:border-stone-300'}`}>
                                        <input type="radio" name="paymentMethod" value="visa" className="accent-nobel-gold w-5 h-5" checked={formData.paymentMethod === 'visa'} onChange={() => setFormData({...formData, paymentMethod: 'visa'})} />
                                        <div className="flex-1">
                                            <p className="font-bold text-mapstone-blue flex items-center gap-2"><CreditCard size={18} /> Visa / Mastercard</p>
                                            <p className="text-xs text-stone-400">Secure online payment link will be sent</p>
                                        </div>
                                    </label>

                                    <label className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'cash' ? 'border-nobel-gold bg-amber-50/20 ring-1 ring-nobel-gold' : 'border-stone-200 hover:border-stone-300'}`}>
                                        <input type="radio" name="paymentMethod" value="cash" className="accent-nobel-gold w-5 h-5" checked={formData.paymentMethod === 'cash'} onChange={() => setFormData({...formData, paymentMethod: 'cash'})} />
                                        <div className="flex-1">
                                            <p className="font-bold text-mapstone-blue flex items-center gap-2"><Banknote size={18} /> Cash</p>
                                            <p className="text-xs text-stone-400">Only if you are inside UAE currently</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-nobel-gold text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : 'Confirm Reservation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};