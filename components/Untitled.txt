// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';

const ThankYouPage = ({ onHome }: { onHome: () => void }) => {
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-white p-12 rounded-[2rem] shadow-2xl text-center max-w-2xl w-full border border-stone-100"
            >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <CheckCircle2 size={48} />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif text-mapstone-blue mb-6">Thank You</h1>
                
                <div className="space-y-6 text-stone-500 text-lg leading-relaxed mb-10">
                    <p>
                        We have successfully received your booking details and your identification documents.
                    </p>
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl text-amber-900 flex flex-col items-center gap-3">
                        <Mail size={32} className="text-nobel-gold"/>
                        <p className="font-medium">
                            Please check your email shortly. <br/>
                            We will send you a <strong>Payment Link</strong> to finalize your reservation.
                        </p>
                    </div>
                </div>

                <button 
                    onClick={onHome} 
                    className="bg-mapstone-blue text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-nobel-gold transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                    Return to Home <ArrowRight size={20}/>
                </button>
            </motion.div>
        </div>
    );
};

export default ThankYouPage;