// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

const LegalLayout = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="pt-32 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 rounded-sm">
                <h1 className="font-serif text-4xl text-mapstone-blue mb-8 border-b border-nobel-gold/20 pb-4">{title}</h1>
                <div className="prose prose-stone max-w-none text-stone-600 font-light leading-relaxed space-y-4">
                    {children}
                </div>
            </motion.div>
        </div>
    </div>
);

export const PrivacyPolicy = () => (
    <LegalLayout title="Privacy Policy">
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">1. Introduction</h3>
        <p>Welcome to Mapstone Holiday Homes. We respect your privacy and are committed to protecting your personal data.</p>
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">2. Data We Collect</h3>
        <p>We collect Identity, Contact, and Financial data to process your bookings securely.</p>
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">5. Contact Us</h3>
        <p>If you have any questions, please contact us at contact@mapstonegroup.com.</p>
    </LegalLayout>
);

export const TermsConditions = () => (
    <LegalLayout title="Terms and Conditions">
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">1. Agreement</h3>
        <p>By accessing our website, you agree to these Terms and Conditions.</p>
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">2. Booking</h3>
        <p>All bookings are subject to availability and confirmation.</p>
    </LegalLayout>
);

export const FAQs = () => (
    <LegalLayout title="Frequently Asked Questions">
        <div className="space-y-8">
            <div><h4 className="font-bold text-mapstone-blue text-lg mb-2">Check-in / Check-out?</h4><p>Check-in: 3:00 PM | Check-out: 11:00 AM.</p></div>
            <div><h4 className="font-bold text-mapstone-blue text-lg mb-2">Security Deposit?</h4><p>Yes, a refundable deposit is required for all stays.</p></div>
        </div>
    </LegalLayout>
);