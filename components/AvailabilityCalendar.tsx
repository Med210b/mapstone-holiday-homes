import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, User, Mail, Phone, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css'; 
import { Lang } from '../types';

// --- Types ---
interface PropertyData {
    id: number;
    title: string;
    location: string;
    price: string;
    image?: string; // Optional: to show a thumbnail
}

interface Props {
    lang: Lang;
    onClose: () => void;
    selectedProperty: PropertyData | null; // We pass the selected property here
}

interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    date: Date;
}

// --- Animation Variants ---
const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
};

const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

const AvailabilityCalendar: React.FC<Props> = ({ lang, onClose, selectedProperty }) => {
    // Steps: 1 = Date Select, 2 = Details Form, 3 = Success
    const [step, setStep] = useState<number>(1);
    
    // Form State
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        date: new Date()
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Date Selection
    const handleDateChange = (value: any) => {
        setFormData({ ...formData, date: value });
    };

    // Submit Logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // SIMULATE API CALL
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Booking Request Sent:", { property: selectedProperty?.title, ...formData });
        setIsSubmitting(false);
        setStep(3); // Move to success step
    };

    // --- Render Helpers ---

    // STEP 1: CALENDAR
    const renderStepOne = () => (
        <motion.div 
            key="step1"
            variants={stepVariants}
            initial="hidden" animate="visible" exit="exit"
            className="flex flex-col h-full"
        >
            <div className="text-center mb-6">
                <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-2">Step 1 of 2</p>
                <h3 className="font-serif text-2xl text-mapstone-blue">
                    {lang === 'ar' ? 'اختر تاريخ الوصول' : 'Select Check-in Date'}
                </h3>
            </div>

            {/* Calendar Wrapper */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-6">
                 <style>{`
                    .react-calendar { width: 100%; border: none; font-family: 'Lato', sans-serif; }
                    .react-calendar__navigation button { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #1B365D; }
                    .react-calendar__tile { height: 50px; border-radius: 0.5rem; }
                    .react-calendar__tile--active, .react-calendar__tile--active:enabled:hover { background: #1B365D; color: white; }
                    .react-calendar__tile--now { background: transparent; color: #C5A059; border: 1px solid #C5A059; }
                `}</style>
                <Calendar 
                    onChange={handleDateChange} 
                    value={formData.date}
                    minDate={new Date()}
                    nextLabel={<ChevronRight size={16} />}
                    prevLabel={<ChevronLeft size={16} />}
                />
            </div>

            <div className="mt-auto">
                <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-mapstone-blue text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-nobel-gold transition-colors flex items-center justify-center gap-2"
                >
                    {lang === 'ar' ? 'التالي' : 'Next Step'} <ChevronRight size={18} />
                </button>
            </div>
        </motion.div>
    );

    // STEP 2: GUEST DETAILS FORM
    const renderStepTwo = () => (
        <motion.div 
            key="step2"
            variants={stepVariants}
            initial="hidden" animate="visible" exit="exit"
        >
            <button onClick={() => setStep(1)} className="text-stone-400 hover:text-mapstone-blue flex items-center gap-1 text-xs uppercase font-bold mb-4">
                <ChevronLeft size={14} /> Back
            </button>

            <div className="text-center mb-6">
                <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-2">Step 2 of 2</p>
                <h3 className="font-serif text-2xl text-mapstone-blue">
                    {lang === 'ar' ? 'تفاصيل الاتصال' : 'Your Details'}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-nobel-gold transition-colors" size={20} />
                    <input 
                        type="text" 
                        name="name"
                        placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        required
                        className="w-full bg-stone-50 border border-stone-200 rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-nobel-gold focus:ring-1 focus:ring-nobel-gold transition-all"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-nobel-gold transition-colors" size={20} />
                        <input 
                            type="email" 
                            name="email"
                            placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            required
                            className="w-full bg-stone-50 border border-stone-200 rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-nobel-gold transition-all"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-nobel-gold transition-colors" size={20} />
                        <input 
                            type="tel" 
                            name="phone"
                            placeholder={lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                            required
                            className="w-full bg-stone-50 border border-stone-200 rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-nobel-gold transition-all"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="relative group">
                    <textarea 
                        name="message"
                        rows={3}
                        placeholder={lang === 'ar' ? 'رسالة إضافية' : 'Special Requests / Message'}
                        className="w-full bg-stone-50 border border-stone-200 rounded-sm py-4 px-4 focus:outline-none focus:border-nobel-gold transition-all resize-none"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 mt-4 flex items-center justify-between">
                    <div>
                        <span className="block text-xs text-stone-400 uppercase font-bold">Checking In</span>
                        <span className="font-serif text-mapstone-blue">{formData.date.toDateString()}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs text-stone-400 uppercase font-bold">Property</span>
                        <span className="font-serif text-nobel-gold font-bold">{selectedProperty?.title || 'Selected Property'}</span>
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-nobel-gold text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                    {isSubmitting ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        lang === 'ar' ? 'إرسال الطلب' : 'Submit Booking Request'
                    )}
                </button>
            </form>
        </motion.div>
    );

    // STEP 3: SUCCESS
    const renderStepThree = () => (
        <motion.div 
            key="step3"
            variants={stepVariants}
            initial="hidden" animate="visible"
            className="flex flex-col items-center justify-center h-full text-center py-12"
        >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <CheckCircle size={40} />
            </div>
            <h3 className="font-serif text-3xl text-mapstone-blue mb-4">
                {lang === 'ar' ? 'تم استلام طلبك' : 'Request Received'}
            </h3>
            <p className="text-stone-500 max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <span className="text-nobel-gold font-bold">{formData.name}</span>. 
                We have received your enquiry for <span className="font-bold text-mapstone-blue">{selectedProperty?.title}</span>. 
                Our concierge team will contact you shortly to confirm availability.
            </p>
            <button 
                onClick={onClose}
                className="bg-stone-100 text-stone-600 px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors"
            >
                Close Window
            </button>
        </motion.div>
    );

    return (
        <motion.div 
            initial="hidden" animate="visible" exit="exit"
            variants={slideUp}
            className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-t-[2rem] md:rounded-[2rem] relative overflow-hidden flex flex-col max-h-[90vh]"
        >
            {/* Header */}
            <div className="bg-mapstone-blue p-6 md:p-8 text-center relative shrink-0">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-nobel-gold transition-colors z-10">
                    <X size={24} />
                </button>
                <div className="flex justify-center mb-3">
                    <CalendarIcon className="text-nobel-gold" size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-1">
                    {lang === 'ar' ? 'حجز إقامتك' : 'Book Your Stay'}
                </h2>
                {selectedProperty && (
                    <p className="text-white/70 text-sm font-light">
                        Enquiring for: <span className="text-nobel-gold">{selectedProperty.title}</span>
                    </p>
                )}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-10 bg-white overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    {step === 1 && renderStepOne()}
                    {step === 2 && renderStepTwo()}
                    {step === 3 && renderStepThree()}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AvailabilityCalendar;