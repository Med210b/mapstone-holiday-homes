import React from 'react';

export const WhatsAppIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

export const LogoBayut = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 200 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 10 H40 V25 H50 C65 25 65 10 50 10 H45 V5 H50 C70 5 75 25 55 35 C75 35 70 55 50 55 H20 V10 Z M30 15 V50 H45 C60 50 65 40 50 35 H30 V30 H45 C60 30 60 15 45 15 H30 Z" />
    <text x="80" y="45" fontFamily="sans-serif" fontWeight="bold" fontSize="36" letterSpacing="-1">bayut</text>
    <circle cx="185" cy="40" r="4" fill="currentColor"/>
  </svg>
);

export const LogoDubizzle = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 200 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="45" fontFamily="sans-serif" fontWeight="900" fontSize="40" letterSpacing="-1">dubizzle</text>
  </svg>
);

export const LogoPropertyFinder = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 240 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30 L25 15 L40 30 V50 H10 V30 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
    <text x="50" y="25" fontFamily="sans-serif" fontWeight="bold" fontSize="20">property</text>
    <text x="50" y="48" fontFamily="sans-serif" fontWeight="bold" fontSize="20">finder</text>
  </svg>
);

export const LogoBooking = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 240 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="32" letterSpacing="-1">Booking.com</text>
  </svg>
);

export const LogoAirbnb = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 200 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path transform="translate(10, 5) scale(1.5)" d="M16 1c-4 0-7.5 2.5-9 6-1.5 4-1 9 1 12.5 1 2 3.5 5.5 8 9.5 4.5-4 7-7.5 8-9.5 2-3.5 2.5-8.5 1-12.5-1.5-3.5-5-6-9-6zm0 2c3 0 5.5 2 6.5 4.5 1.5 3 .5 6.5-1 9-1 1.5-2.5 3.5-5.5 6.5-3-3-4.5-5-5.5-6.5-1.5-2.5-2.5-6-1-9C10.5 5 13 3 16 3z" />
     <text x="60" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="32" letterSpacing="-1">airbnb</text>
  </svg>
);