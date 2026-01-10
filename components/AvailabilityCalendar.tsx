// src/components/AvailabilityCalendar.tsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css'; // Basic structure
import { Lang } from '../types';

// --- 1. ADMIN AREA: MANAGE YOUR BOOKINGS HERE ---
// Format: Year, Month (0 = Jan, 11 = Dec), Day
const bookedDates = [
    new Date(2024, 0, 20), // Jan 20, 2024
    new Date(2024, 0, 21),
    new Date(2024, 1, 14), // Feb 14
];

interface Props {
    lang: Lang;
    onClose: () => void;
}

const AvailabilityCalendar: React.FC<Props> = ({ lang, onClose }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

    // Logic to disable booked dates
    const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            return bookedDates.some((bookedDate) => isSameDay(bookedDate, date));
        }
        return false;
    };

    // Handle clicking a date
    const handleDateChange = (value: any) => {
        setDate(value);
        setSelectedDateStr(value.toDateString());
        // Here you would trigger your existing BookingModal 
        // passing this date as the "check-in" date
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden rounded-t-[2rem] md:rounded-[2rem] relative"
        >
            {/* Header */}
            <div className="bg-mapstone-blue p-8 text-center relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-nobel-gold transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-3xl font-serif text-white mb-2">
                    {lang === 'ar' ? 'تحقق من التوفر' : 'Check Availability'}
                </h2>
                <p className="text-nobel-gold text-xs font-bold tracking-[0.2em] uppercase">
                    {lang === 'ar' ? 'اختر تواريخ إقامتك' : 'Select Your Stay Dates'}
                </p>
            </div>

            <div className="p-8 md:p-12 bg-stone-50">
                {/* Custom CSS Wrapper to override default Calendar styles */}
                <style>{`
                    .react-calendar { 
                        width: 100%; 
                        background: transparent; 
                        border: none; 
                        font-family: 'Lato', sans-serif;
                    }
                    /* Navigation (Month/Year) */
                    .react-calendar__navigation { margin-bottom: 2rem; }
                    .react-calendar__navigation button {
                        font-family: 'Playfair Display', serif;
                        font-size: 1.5rem;
                        color: #1B365D;
                    }
                    .react-calendar__navigation button:enabled:hover,
                    .react-calendar__navigation button:enabled:focus {
                        background-color: transparent;
                        color: #C5A059;
                    }
                    /* Weekdays */
                    .react-calendar__month-view__weekdays {
                        text-transform: uppercase;
                        font-size: 0.75rem;
                        font-weight: bold;
                        color: #9ca3af;
                        text-decoration: none;
                    }
                    .react-calendar__month-view__weekdays__weekday abbr {
                        text-decoration: none;
                    }
                    /* Days/Tiles */
                    .react-calendar__tile {
                        height: 80px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border-radius: 0.5rem;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        color: #444;
                    }
                    .react-calendar__tile:enabled:hover {
                        background-color: #f5f5f0;
                        color: #C5A059;
                    }
                    /* Active/Selected Day */
                    .react-calendar__tile--active,
                    .react-calendar__tile--active:enabled:hover,
                    .react-calendar__tile--active:enabled:focus {
                        background: #1B365D;
                        color: white;
                        box-shadow: 0 10px 15px -3px rgba(27, 54, 93, 0.3);
                    }
                    /* Today */
                    .react-calendar__tile--now {
                        background: transparent;
                        color: #C5A059;
                        border: 1px solid #C5A059;
                    }
                    /* Disabled/Booked Days */
                    .react-calendar__tile:disabled {
                        background-color: #f3f4f6;
                        color: #d1d5db;
                        text-decoration: line-through;
                        cursor: not-allowed;
                    }
                `}</style>

                <Calendar 
                    onChange={handleDateChange} 
                    value={date}
                    tileDisabled={tileDisabled}
                    minDate={new Date()} // Cannot book past dates
                    nextLabel={<ChevronRight size={20} />}
                    prevLabel={<ChevronLeft size={20} />}
                    next2Label={null}
                    prev2Label={null}
                />

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-8 pt-8 border-t border-stone-200">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-white border border-nobel-gold"></div>
                        <span className="text-xs text-stone-500 uppercase tracking-wider">Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-mapstone-blue"></div>
                        <span className="text-xs text-stone-500 uppercase tracking-wider">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-stone-200 text-stone-400 line-through"></div>
                        <span className="text-xs text-stone-500 uppercase tracking-wider">Booked</span>
                    </div>
                </div>

                {selectedDateStr && (
                    <div className="mt-8 text-center animate-fade-in-up">
                        <p className="text-mapstone-blue text-lg font-serif">
                            Requesting booking for: <span className="text-nobel-gold font-bold">{selectedDateStr}</span>
                        </p>
                        <button className="mt-4 bg-nobel-gold text-white px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors shadow-lg">
                            Proceed to Enquiry
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AvailabilityCalendar;