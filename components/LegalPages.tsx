import React from 'react';
import { motion } from 'framer-motion';

const LegalLayout = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="pt-32 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 rounded-sm"
            >
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
        <p>Welcome to Mapstone Holiday Homes. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">2. Data We Collect</h3>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Identity Data:</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data:</strong> includes bank account and payment card details.</li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
        </ul>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">3. How We Use Your Data</h3>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>To perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">4. Data Security</h3>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">5. Contact Us</h3>
        <p>If you have any questions about this privacy policy, please contact us at contact@mapstonegroup.com.</p>
    </LegalLayout>
);

export const TermsConditions = () => (
    <LegalLayout title="Terms and Conditions">
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">1. Agreement to Terms</h3>
        <p>By accessing our website and using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">2. Booking and Reservations</h3>
        <p>All bookings are subject to availability and confirmation by Mapstone Holiday Homes. A deposit may be required to secure your reservation. The balance must be paid in accordance with the payment schedule provided at the time of booking.</p>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">3. Cancellation Policy</h3>
        <p>Cancellations must be made in writing. Refunds are subject to the specific cancellation policy attached to your booking confirmation. We recommend obtaining travel insurance to cover unexpected cancellations.</p>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">4. Property Use</h3>
        <p>Properties are to be used for residential purposes only. Parties, events, and large gatherings are strictly prohibited unless explicitly authorized in writing. Guests are responsible for keeping the property in good condition.</p>

        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">5. Liability</h3>
        <p>Mapstone Holiday Homes shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use of our services or properties, except where such liability cannot be excluded by law.</p>
        
        <h3 className="text-xl font-bold text-mapstone-blue mt-6 mb-2">6. Governing Law</h3>
        <p>These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.</p>
    </LegalLayout>
);

export const FAQs = () => (
    <LegalLayout title="Frequently Asked Questions">
        <div className="space-y-8">
            <div>
                <h4 className="font-bold text-mapstone-blue text-lg mb-2">What are the check-in and check-out times?</h4>
                <p>Standard check-in is from 3:00 PM onwards, and check-out is by 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability and potentially an additional fee.</p>
            </div>
            <div>
                <h4 className="font-bold text-mapstone-blue text-lg mb-2">Is a security deposit required?</h4>
                <p>Yes, a refundable security deposit is required for all stays to cover any potential damages or incidentals. This is typically refunded within 7-14 days after check-out, pending a property inspection.</p>
            </div>
            <div>
                <h4 className="font-bold text-mapstone-blue text-lg mb-2">Are pets allowed?</h4>
                <p>Pet policies vary by property. Some of our units are pet-friendly while others are not due to building regulations. Please check the specific property details or contact our team for assistance.</p>
            </div>
             <div>
                <h4 className="font-bold text-mapstone-blue text-lg mb-2">What is included in the rental price?</h4>
                <p>The rental price typically includes the cost of the stay, all utilities (water, electricity, AC), high-speed Wi-Fi, cable TV, and access to building amenities like the pool and gym. Fresh linens and towels are provided upon arrival.</p>
            </div>
            <div>
                <h4 className="font-bold text-mapstone-blue text-lg mb-2">Do you offer cleaning services during the stay?</h4>
                <p>Your booking includes a cleaning fee for the cleaning performed after your departure. Additional housekeeping services during your stay can be arranged for an extra charge.</p>
            </div>
        </div>
    </LegalLayout>
);