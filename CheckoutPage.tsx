// src/components/CheckoutPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UploadCloud, CreditCard, Banknote, Search, ChevronDown, Check, Loader2, AlertCircle, FileText, X, UserPlus } from 'lucide-react';
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
    
    // Form State
    const [country, setCountry] = useState(COUNTRY_CODES.find(c => c.country === "United Arab Emirates") || COUNTRY_CODES[0]);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        whatsapp: '',
        email: '',
        paymentMethod: 'visa'
    });

    // Dynamic Guest State (For Guest 2, 3, etc.)
    const [additionalGuests, setAdditionalGuests] = useState<{name: string}[]>([]);
    
    // File State: Using a Map to store files for Main Guest (index 0) and extras
    // Index 0 = Main Guest, Index 1 = Guest 2, etc.
    const [files, setFiles] = useState<Record<number, File | null>>({});

    // Initialize additional guest fields based on adult count
    useEffect(() => {
        const extraCount = Math.max(0, bookingData.guests.adults - 1);
        setAdditionalGuests(Array(extraCount).fill({ name: '' }));
    }, [bookingData.guests.adults]);

    // Country Dropdown State
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterText, setFilterText] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => ({ ...prev, [index]: e.target.files![0] }));
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[index];
            return newFiles;
        });
    };

    // Handle Additional Guest Name Change
    const handleGuestNameChange = (index: number, value: string) => {
        const updated = [...additionalGuests];
        updated[index] = { name: value };
        setAdditionalGuests(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation: Main guest file is mandatory
        if (!files[0]) {
            alert("Please upload the Main Guest's Passport or ID.");
            return;
        }

        // Validation: All extra guests must have a name and file
        for (let i = 0; i < additionalGuests.length; i++) {
            if (!additionalGuests[i].name) {
                alert(`Please enter the name for Guest ${i + 2}.`);
                return;
            }
            if (!files[i + 1]) {
                alert(`Please upload the Passport/ID for Guest ${i + 2}.`);
                return;
            }
        }

        setIsSubmitting(true);

        const formElement = e.target as HTMLFormElement;
        const formDataObj = new FormData(formElement);

        // --- 1. CONFIGURATION ---
        formDataObj.append("_subject", `NEW BOOKING: ${formData.fullName} (Prop ID: ${bookingData.propertyId})`);
        formDataObj.append("_captcha", "false");
        formDataObj.append("_template", "table");
        formDataObj.append("_cc", "contact@mapstonegroup.com"); // Ensure copy is sent

        // --- 2. BOOKING DETAILS ---
        const checkIn = bookingData.dateRange?.[0]?.toDateString() || "N/A";
        const checkOut = bookingData.dateRange?.[1]?.toDateString() || "N/A";
        
        formDataObj.append("Property_ID", bookingData.propertyId?.toString() || "Unknown");
        formDataObj.append("Check_In", checkIn);
        formDataObj.append("Check_Out", checkOut);
        formDataObj.append("Total_Adults", bookingData.guests.adults.toString());
        formDataObj.append("Total_Children", bookingData.guests.children.toString());

        // --- 3. FILES ---
        // Append Main Guest File
        if (files[0]) {
            formDataObj.append("Passport_Main_Guest", files[0]);
        }
        // Append Extra Guest Files
        additionalGuests.forEach((_, idx) => {
            const fileKey = idx + 1;
            if (files[fileKey]) {
                formDataObj.append(`Passport_Guest_${fileKey + 1}`, files[fileKey]!);
            }
        });

        // --- 4. EXTRA GUEST NAMES ---
        // We append these manually to ensure they appear clearly in the email
        additionalGuests.forEach((guest, idx) => {
            formDataObj.append(`Guest_${idx + 2}_Name`, guest.name);
        });

        try {
            await fetch("https://formsubmit.co/contact@mapstonegroup.com", {
                method: "POST",
                body: formDataObj
            });
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            alert("Connection error. Please try again.");
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
                    <h2 className="text-3xl font-serif text-mapstone-blue mb-4">Documents Received</h2>
                    <p className="text-stone-500 mb-8 leading-relaxed">
                        Thank you, <span className="font-bold text-mapstone-blue">{formData.fullName}</span>. 
                        <br/><br/>
                        We have securely received your details and IDs. Our team will verify them and send the digital keys to <strong>{formData.email}</strong> shortly.
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
                                <div className="bg-stone-50 p-3 rounded-md">
                                    <p className="text-stone-400 text-[10px] font-bold uppercase">Property ID</p>
                                    <p className="font-bold text-mapstone-blue text-lg">#{bookingData.propertyId}</p>
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
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 space-y-8" encType="multipart/form-data">
                            
                            {/* --- SECTION 1: MAIN GUEST --- */}
                            <div>
                                <h3 className="font-serif text-xl text-mapstone-blue mb-6 pb-2 border-b border-stone-100 flex items-center gap-2">
                                    Main Guest Details
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="Main_Guest_Name" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="As shown on passport" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
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
                                        <input type="hidden" name="Main_Guest_Country" value={country.country} />

                                        {dropdownOpen && (
                                            <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white shadow-xl border border-stone-100 z-50 mt-1 rounded-sm">
                                                <div className="sticky top-0 bg-white p-2 border-b border-stone-100">
                                                    <div className="flex items-center gap-2 bg-stone-50 px-2 rounded border border-stone-200">
                                                        <Search size={14} className="text-stone-400"/>
                                                        <input type="text" className="w-full bg-transparent text-xs py-2 focus:outline-none" placeholder="Type to search..." value={filterText} onChange={(e) => setFilterText(e.target.value)} autoFocus />
                                                    </div>
                                                </div>
                                                {filteredCodes.map((c) => (
                                                    <div key={c.country} className="px-4 py-2.5 hover:bg-stone-50 cursor-pointer flex items-center gap-3 transition-colors text-sm" onClick={() => { setCountry(c); setDropdownOpen(false); setFilterText(''); }}>
                                                        <span className="text-xl w-6">{c.flag}</span>
                                                        <span className="font-medium">{c.country}</span>
                                                        <span className="text-stone-400 text-xs ml-auto">{c.code}</span>
                                                    </div>
                                                ))}
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
                                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">WhatsApp <span className="text-stone-300 font-normal normal-case">(Optional)</span></label>
                                            <div className="flex bg-stone-50 border rounded-sm">
                                                <span className="p-3 text-stone-500 border-r bg-white">{country.code}</span>
                                                <input type="tel" name="whatsapp" className="w-full p-3 bg-transparent focus:outline-none" placeholder="123 4567" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                        <input type="email" name="email" required className="w-full border p-3 rounded-sm bg-stone-50 focus:outline-none focus:border-nobel-gold" placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        <p className="text-[10px] text-nobel-gold mt-2 flex items-start gap-1 p-2 bg-amber-50 rounded-sm border border-amber-100">
                                            <AlertCircle size={12} className="mt-0.5 shrink-0" />
                                            <strong>Important:</strong> We will send your digital property keys to this email.
                                        </p>
                                    </div>

                                    {/* Main Guest File Upload */}
                                    <div className="pt-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Main Guest ID/Passport <span className="text-red-500">*</span></label>
                                        {!files[0] ? (
                                            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center bg-stone-50 hover:bg-white hover:border-nobel-gold transition-colors relative">
                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, 0)} />
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <UploadCloud size={20} className="text-stone-400" />
                                                    <span className="text-xs font-bold text-mapstone-blue">Click to Upload</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={18} className="text-green-600" />
                                                    <span className="text-xs text-green-700 font-medium truncate max-w-[150px]">{files[0].name}</span>
                                                </div>
                                                <button type="button" onClick={() => removeFile(0)} className="text-green-400 hover:text-green-700"><X size={16} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* --- SECTION 2: ADDITIONAL GUESTS (DYNAMIC) --- */}
                            {additionalGuests.length > 0 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="font-serif text-xl text-mapstone-blue mb-6 pb-2 border-b border-stone-100 flex items-center gap-2">
                                        <UserPlus size={20} className="text-nobel-gold"/> Additional Guests
                                    </h3>
                                    <div className="space-y-6">
                                        {additionalGuests.map((guest, idx) => (
                                            <div key={idx} className="bg-stone-50 p-5 rounded-lg border border-stone-200">
                                                <p className="text-xs font-bold uppercase text-stone-400 mb-3">Guest {idx + 2}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <input 
                                                            type="text" 
                                                            placeholder={`Guest ${idx + 2} Full Name`}
                                                            required
                                                            className="w-full border p-3 rounded-sm bg-white focus:outline-none focus:border-nobel-gold text-sm"
                                                            value={guest.name}
                                                            onChange={(e) => handleGuestNameChange(idx, e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        {!files[idx + 1] ? (
                                                            <div className="border-2 border-dashed border-stone-300 rounded-sm p-2 text-center bg-white hover:border-nobel-gold relative h-full flex items-center justify-center">
                                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, idx + 1)} />
                                                                <span className="text-xs text-stone-400 flex items-center gap-2"><UploadCloud size={14}/> Upload ID/Passport</span>
                                                            </div>
                                                        ) : (
                                                            <div className="border border-green-200 bg-green-50 rounded-sm p-3 h-full flex items-center justify-between">
                                                                <span className="text-xs text-green-700 font-medium truncate">{files[idx + 1]?.name}</span>
                                                                <button type="button" onClick={() => removeFile(idx + 1)} className="text-green-400 hover:text-green-700"><X size={14} /></button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- SECTION 3: PAYMENT --- */}
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