import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css'; 
import { Lang } from '../types';

// --- FIX: Bypass strict type check for motion.div ---
const MotionDiv = motion.div as any;

interface PropertyData {
    id: number;
    title: string;
    location: string;
    price: string;
    specs: string; 
}

interface Props {
    lang: Lang;
    onClose: () => void;
    selectedProperty: PropertyData | null;
    onProceedToCheckout: (data: { dateRange: [Date, Date], guests: { adults: number, children: number } }) => void;
}

const AvailabilityCalendar: React.FC<Props> = ({ lang, onClose, selectedProperty, onProceedToCheckout }) => {
    // State for Date Range (Start & End)
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    
    // State for Guests
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    // LOGIC: Check if property is a Studio
    const isStudio = selectedProperty?.specs?.toLowerCase().includes('studio') || selectedProperty?.title?.toLowerCase().includes('studio');

    // Validation Limits
    const MAX_ADULTS = isStudio ? 2 : 6; // Studio max 2 adults
    const MAX_CHILDREN = isStudio ? 1 : 4; // Studio max 1 infant

    const handleDateChange = (value: any) => {
        setDateRange(value);
    };

    const handleProceed = () => {
        if (dateRange[0] && dateRange[1]) {
            onProceedToCheckout({
                dateRange: [dateRange[0], dateRange[1]],
                guests: { adults, children }
            });
        }
    };

    // Calculate nights
    const nights = dateRange[0] && dateRange[1] 
        ? Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24)) 
        : 0;

    return (
        <MotionDiv 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]"
        >
            {/* Left Side: Property Info & Guest Select */}
            <div className="bg-mapstone-blue p-8 text-white md:w-1/3 flex flex-col relative">
                <button onClick={onClose} className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors md:hidden">
                    <X size={24} />
                </button>

                <div className="mt-8 md:mt-0">
                    <p className="text-nobel-gold text-xs font-bold uppercase tracking-widest mb-2">Selected Property</p>
                    <h2 className="font-serif text-2xl md:text-3xl mb-4 leading-tight">{selectedProperty?.title}</h2>
                    <div className="h-1 w-12 bg-nobel-gold mb-6"></div>
                    
                    {isStudio && (
                        <div className="bg-white/10 p-3 rounded-sm border border-white/20 mb-6 flex gap-3">
                            <AlertCircle className="text-nobel-gold shrink-0" size={20} />
                            <p className="text-xs text-stone-300 leading-relaxed">
                                <strong>Studio Policy:</strong> Maximum occupancy is 2 Adults & 1 Infant (under 2 years) as per Dubai Tourism regulations.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-auto space-y-6">
                    {/* Adult Counter */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold uppercase tracking-wider">Adults</span>
                            <span className="text-xl font-serif">{adults}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-sm p-1">
                            <button 
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="flex-1 hover:bg-white/20 rounded-sm py-2 transition-colors"
                            >-</button>
                            <button 
                                onClick={() => setAdults(Math.min(MAX_ADULTS, adults + 1))}
                                disabled={adults >= MAX_ADULTS}
                                className="flex-1 hover:bg-white/20 rounded-sm py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >+</button>
                        </div>
                    </div>

                    {/* Children Counter */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold uppercase tracking-wider">
                                {isStudio ? 'Infant (<2yr)' : 'Children'}
                            </span>
                            <span className="text-xl font-serif">{children}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-sm p-1">
                            <button 
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="flex-1 hover:bg-white/20 rounded-sm py-2 transition-colors"
                            >-</button>
                            <button 
                                onClick={() => setChildren(Math.min(MAX_CHILDREN, children + 1))}
                                disabled={children >= MAX_CHILDREN}
                                className="flex-1 hover:bg-white/20 rounded-sm py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Calendar */}
            <div className="bg-white p-6 md:p-8 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-mapstone-blue font-serif text-xl">Select Dates</h3>
                    <button onClick={onClose} className="text-stone-300 hover:text-mapstone-blue transition-colors hidden md:block">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 calendar-wrapper">
                    <style>{`
                        .react-calendar { width: 100%; border: none; font-family: 'Lato', sans-serif; }
                        .react-calendar__navigation button { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #1B365D; }
                        .react-calendar__tile { height: 45px; border-radius: 0.5rem; font-size: 0.9rem; }
                        .react-calendar__tile--active { background: #1B365D !important; color: white !important; }
                        .react-calendar__tile--now { background: transparent; color: #C5A059; border: 1px solid #C5A059; }
                        .react-calendar__tile--range { background: #e0e6ed; color: #1B365D; }
                        .react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd { background: #1B365D !important; color: white !important; }
                    `}</style>
                    <Calendar 
                        onChange={handleDateChange} 
                        selectRange={true}
                        minDate={new Date()}
                        nextLabel={<ChevronRight size={16} />}
                        prevLabel={<ChevronLeft size={16} />}
                        className="w-full"
                    />
                </div>

                <div className="mt-6 border-t border-stone-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        {dateRange[0] && dateRange[1] ? (
                            <div>
                                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total Stay</p>
                                <p className="text-mapstone-blue font-serif text-lg">{nights} Nights Selected</p>
                            </div>
                        ) : (
                            <p className="text-sm text-stone-400 italic">Please select check-in and check-out</p>
                        )}
                    </div>
                    
                    <button 
                        onClick={handleProceed}
                        disabled={!dateRange[0] || !dateRange[1]}
                        className="w-full md:w-auto bg-nobel-gold text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        Continue to Details
                    </button>
                </div>
            </div>
        </MotionDiv>
    );
};

export default AvailabilityCalendar;