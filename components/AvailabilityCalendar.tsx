// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, AlertCircle, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css'; 
import ICAL from 'ical.js'; 
import { Lang } from '../types';

const MotionDiv = motion.div as any;

interface PropertyData {
    id: number;
    title: string;
    price: string;
    specs: string; 
}

interface Props {
    lang: Lang;
    onClose: () => void;
    selectedProperty: PropertyData | null;
    onProceedToCheckout: (data: { dateRange: [Date, Date], guests: { adults: number, children: number } }) => void;
}

// --- CALENDAR LINKS ---
const ICAL_URLS: { [key: number]: { name: string, url: string }[] } = {
    // ID 4: Westwood Al Furjan
    4: [
        { name: "Booking.com", url: "https://ical.booking.com/v1/export?t=d5e025de-61d6-413f-8ad1-98f9d0b1ae81" },
        { name: "Airbnb", url: "https://www.airbnb.ae/calendar/ical/1580396287740208765.ics?t=9616eb9e5c8c4b0eb4375e07cfc50fb9" },
        { name: "Google", url: "https://calendar.google.com/calendar/ical/c_a385fec5acc242c4193a269335b9bd98aedada50249e0e0ff69c580005acadc6%40group.calendar.google.com/private-4ac01705b0841a446493c76f8b9e11d7/basic.ics" }
    ],
    
    // ID 5: Cloud Tower JVT
    5: [
        { name: "Booking.com", url: "https://ical.booking.com/v1/export?t=9eb975cf-0d03-442a-b801-fd8723208341" },
        { name: "Airbnb", url: "https://www.airbnb.ae/calendar/ical/1606912688736441590.ics?t=1e695148925c4d789e5397a3fdb3fb40" },
        { name: "Google", url: "https://calendar.google.com/calendar/ical/c_21e8000cdae50de6703cf877bf4e5ec81a6ccbeca6edf3b9698cc035b4c492ed%40group.calendar.google.com/private-fb57bb3e640205ada4e28d33946b5904/basic.ics" }
    ]
};

const translations = {
    en: { selectDates: "Select Dates", checkIn: "Check-in", checkOut: "Check-out", adults: "Adults", children: "Children", infant: "Infant", studioPolicy: "Studio Policy: Max 2 Adults & 1 Infant (Strictly Enforced).", selected: "Selected Property", totalStay: "Total Stay", nights: "Nights Selected", continue: "Continue to Details", alert: "Please select check-in & check-out", loading: "Syncing...", error: "Sync Issues" },
    fr: { selectDates: "Sélectionnez les Dates", checkIn: "Arrivée", checkOut: "Départ", adults: "Adultes", children: "Enfants", infant: "Bébé", studioPolicy: "Politique Studio: Max 2 Adultes & 1 Bébé (Strictement Appliqué).", selected: "Propriété Sélectionnée", totalStay: "Séjour Total", nights: "Nuits Sélectionnées", continue: "Continuer vers les Détails", alert: "Veuillez sélectionner l'arrivée et le départ", loading: "Synchronisation...", error: "Erreur de sync" },
    ar: { selectDates: "اختر التواريخ", checkIn: "تاريخ الوصول", checkOut: "تاريخ المغادرة", adults: "البالغين", children: "الأطفال", infant: "رضيع", studioPolicy: "سياسة الاستوديو: بحد أقصى 2 بالغين و 1 رضيع (تطبق بصرامة).", selected: "العقار المختار", totalStay: "إجمالي الإقامة", nights: "ليالي محددة", continue: "المتابعة للتفاصيل", alert: "يرجى اختيار تاريخ الوصول والمغادرة", loading: "جاري التحديث...", error: "فشل التحديث" }
};

const AvailabilityCalendar: React.FC<Props> = ({ lang, onClose, selectedProperty, onProceedToCheckout }) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDateStr, setStartDateStr] = useState('');
    const [endDateStr, setEndDateStr] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    
    // Calendar State
    const [disabledDates, setDisabledDates] = useState<Date[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statuses, setStatuses] = useState<{name: string, status: 'pending'|'success'|'error'}[]>([]);

    const t = translations[lang] || translations['en'];
    const isStudio = (selectedProperty?.specs?.toLowerCase().includes('studio') || selectedProperty?.title?.toLowerCase().includes('studio') || selectedProperty?.title?.includes('استوديو'));
    const MAX_ADULTS = isStudio ? 2 : 6;
    const MAX_CHILDREN = isStudio ? 1 : 4;

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!selectedProperty || !ICAL_URLS[selectedProperty.id]) return;
            
            setIsLoading(true);
            const sources = ICAL_URLS[selectedProperty.id];
            setStatuses(sources.map(s => ({ name: s.name, status: 'pending' })));
            
            const blockedDates: Date[] = [];
            
            // PROXY LIST (Prioritizing allorigins for stability)
            const getProxies = (target: string) => [
                `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`,
                `https://corsproxy.io/?${encodeURIComponent(target)}`
            ];

            await Promise.all(sources.map(async (source, index) => {
                // SMART URL BUILDER: Checks for '?' to avoid breaking the link
                const separator = source.url.includes('?') ? '&' : '?';
                const cacheBuster = `nocache=${Date.now()}`; // Unique timestamp
                const finalUrl = `${source.url}${separator}${cacheBuster}`;
                
                const proxies = getProxies(finalUrl);
                let fetched = false;

                for (const proxy of proxies) {
                    if (fetched) break;
                    try {
                        const response = await fetch(proxy);
                        if (!response.ok) throw new Error("Network error");
                        
                        let data;
                        // Handle different proxy response formats
                        if (proxy.includes('allorigins')) {
                            const json = await response.json();
                            data = json.contents;
                        } else {
                            data = await response.text();
                        }
                        
                        if (!data || !data.includes("BEGIN:VCALENDAR")) throw new Error("Invalid Data");

                        const jcalData = ICAL.parse(data);
                        const comp = new ICAL.Component(jcalData);
                        const vevents = comp.getAllSubcomponents('vevent');

                        vevents.forEach((event) => {
                            const dtstart = event.getFirstPropertyValue('dtstart');
                            const dtend = event.getFirstPropertyValue('dtend');
                            
                            if (dtstart && dtend) {
                                const start = dtstart.toJSDate();
                                const end = dtend.toJSDate();
                                
                                let current = new Date(start);
                                // Block dates strictly
                                while (current < end) {
                                    blockedDates.push(new Date(current));
                                    current.setDate(current.getDate() + 1);
                                }
                            }
                        });
                        fetched = true;
                        setStatuses(prev => {
                            const newS = [...prev];
                            newS[index].status = 'success';
                            return newS;
                        });
                    } catch (err) {
                        // console.log(`Proxy failed for ${source.name}:`, err);
                    }
                }
                
                if (!fetched) {
                    setStatuses(prev => {
                        const newS = [...prev];
                        newS[index].status = 'error';
                        return newS;
                    });
                }
            }));

            setDisabledDates(blockedDates);
            setIsLoading(false);
        };

        fetchAvailability();
    }, [selectedProperty]);

    // Calendar Tile Logic
    const isTileDisabled = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            if (date < new Date(new Date().setHours(0,0,0,0))) return true;
            return disabledDates.some(d => 
                date.getFullYear() === d.getFullYear() &&
                date.getMonth() === d.getMonth() &&
                date.getDate() === d.getDate()
            );
        }
        return false;
    };

    const handleManualChange = (type: 'start' | 'end', value: string) => {
        if (type === 'start') {
            setStartDateStr(value);
            const newStart = value ? new Date(value) : null;
            setDateRange([newStart, dateRange[1]]);
        } else {
            setEndDateStr(value);
            const newEnd = value ? new Date(value) : null;
            setDateRange([dateRange[0], newEnd]);
        }
    };

    const handleCalendarChange = (value: any) => {
        const [start, end] = value;
        setDateRange([start, end]);
        if (start) setStartDateStr(start.toISOString().split('T')[0]);
        if (end) setEndDateStr(end.toISOString().split('T')[0]);
        else setEndDateStr('');
    };

    const handleProceed = () => {
        if (dateRange[0] && dateRange[1]) {
            onProceedToCheckout({ dateRange: [dateRange[0], dateRange[1]], guests: { adults, children } });
        } else {
            alert(t.alert);
        }
    };

    const nights = dateRange[0] && dateRange[1] 
        ? Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24)) 
        : 0;

    return (
        <MotionDiv initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="bg-mapstone-blue p-8 text-white md:w-1/3 flex flex-col relative">
                <button onClick={onClose} className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors md:hidden"><X size={24} /></button>
                <div className="mt-8 md:mt-0">
                    <p className="text-nobel-gold text-xs font-bold uppercase tracking-widest mb-2">{t.selected}</p>
                    <h2 className="font-serif text-2xl md:text-3xl mb-2 leading-tight">{selectedProperty?.title}</h2>
                    <p className="text-lg font-medium text-stone-300 mb-4">{selectedProperty?.price}</p>
                    <div className="h-1 w-12 bg-nobel-gold mb-6"></div>
                    {isStudio && <div className="bg-white/10 p-3 rounded-sm border border-white/20 mb-6 flex gap-3"><AlertCircle className="text-nobel-gold shrink-0" size={20} /><p className="text-xs text-stone-300 leading-relaxed"><strong>{t.studioPolicy}</strong></p></div>}
                </div>
                
                {/* DEBUG STATUS AREA */}
                <div className="mt-4 bg-black/20 p-3 rounded-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Sync Status</p>
                    <div className="space-y-1">
                        {statuses.map((s, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <span className="text-white/80">{s.name}</span>
                                {s.status === 'pending' && <RefreshCw size={10} className="animate-spin text-nobel-gold"/>}
                                {s.status === 'success' && <CheckCircle2 size={12} className="text-green-400"/>}
                                {s.status === 'error' && <XCircle size={12} className="text-red-400"/>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto space-y-6">
                     <div className="bg-white/5 p-4 rounded-sm border border-white/10">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t.checkIn}</label>
                        <input type="date" min={new Date().toISOString().split('T')[0]} value={startDateStr} onChange={(e) => handleManualChange('start', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-sm p-2 text-white text-sm focus:outline-none focus:border-nobel-gold mb-3"/>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t.checkOut}</label>
                        <input type="date" min={startDateStr || new Date().toISOString().split('T')[0]} value={endDateStr} onChange={(e) => handleManualChange('end', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-sm p-2 text-white text-sm focus:outline-none focus:border-nobel-gold"/>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1"><span className="text-sm font-bold uppercase tracking-wider">{t.adults}</span><span className="text-xl font-serif">{adults}</span></div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-sm p-1 mb-2"><button onClick={() => setAdults(Math.max(1, adults - 1))} className="flex-1 hover:bg-white/20 py-1">-</button><button onClick={() => setAdults(Math.min(MAX_ADULTS, adults + 1))} disabled={adults >= MAX_ADULTS} className="flex-1 hover:bg-white/20 py-1 disabled:opacity-30">+</button></div>
                        <div className="flex justify-between items-center mb-1"><span className="text-sm font-bold uppercase tracking-wider">{isStudio ? t.infant : t.children}</span><span className="text-xl font-serif">{children}</span></div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-sm p-1"><button onClick={() => setChildren(Math.max(0, children - 1))} className="flex-1 hover:bg-white/20 py-1">-</button><button onClick={() => setChildren(Math.min(MAX_CHILDREN, children + 1))} disabled={children >= MAX_CHILDREN} className="flex-1 hover:bg-white/20 py-1 disabled:opacity-30">+</button></div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 md:p-8 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-mapstone-blue font-serif text-xl">{t.selectDates}</h3>
                        {isLoading && <span className="text-[10px] text-nobel-gold animate-pulse flex items-center gap-1"><RefreshCw size={10} className="animate-spin"/> {t.loading}</span>}
                    </div>
                    <button onClick={onClose} className="text-stone-300 hover:text-mapstone-blue transition-colors hidden md:block"><X size={24} /></button>
                </div>
                <div className="flex-1 calendar-wrapper overflow-y-auto">
                    <style>{`.react-calendar { width: 100%; border: none; font-family: 'Lato', sans-serif; } .react-calendar__navigation button { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #1B365D; } .react-calendar__tile { height: 42px; border-radius: 0.5rem; font-size: 0.9rem; } .react-calendar__tile--active { background: #1B365D !important; color: white !important; } .react-calendar__tile--now { background: transparent; color: #C5A059; border: 1px solid #C5A059; } .react-calendar__tile--range { background: #e0e6ed; color: #1B365D; } .react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd { background: #1B365D !important; color: white !important; } .react-calendar__tile:disabled { background-color: #f3f3f3; color: #d1d1d1; cursor: not-allowed; text-decoration: line-through; opacity: 0.6; }`}</style>
                    <Calendar 
                        onChange={handleCalendarChange} 
                        value={dateRange} 
                        selectRange={true} 
                        minDate={new Date()} 
                        tileDisabled={isTileDisabled} 
                        nextLabel={<ChevronRight size={16} />} 
                        prevLabel={<ChevronLeft size={16} />} 
                        className="w-full"
                    />
                </div>
                <div className="mt-4 border-t border-stone-100 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">{dateRange[0] && dateRange[1] ? (<div><p className="text-xs text-stone-400 font-bold uppercase tracking-wider">{t.totalStay}</p><p className="text-mapstone-blue font-serif text-lg">{nights} {t.nights}</p></div>) : (<p className="text-sm text-stone-400 italic text-red-400 flex items-center gap-1"><AlertCircle size={14}/> {t.alert}</p>)}</div>
                    <button onClick={handleProceed} disabled={!dateRange[0] || !dateRange[1]} className="w-full md:w-auto bg-nobel-gold text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-mapstone-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">{t.continue}</button>
                </div>
            </div>
        </MotionDiv>
    );
};

export default AvailabilityCalendar;