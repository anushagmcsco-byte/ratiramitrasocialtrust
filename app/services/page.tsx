import React from 'react';
import Image from 'next/image';
import ServicesClient from './services-client';

export const metadata = {
  title: 'Focus Areas & Campaigns - Raita Mitra Social Trust',
  description: 'Support active crowdfunding drives for agriculture, women weavers, child education, wellness clinics, and watershed conservation in Karnataka.',
};

export default function ServicesPage() {
  return (
    <div className="flex-grow bg-[#fbfcfa] font-sans pb-16">
      
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-slate-900 py-16 border-b border-slate-100 text-center">
        {/* Background Image with dark elegant overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/rural-development-services/1920/400"
            alt="Focus Areas Banner"
            fill
            className="object-cover opacity-25"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-900/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-full uppercase inline-block">
            6 Campaigns Active
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white leading-none">
            Our Focus Areas & Programs
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Discover the central campaigns under our charge. Every campaign comprises verified sub-projects and real-time physical supplies, tracking 100% trace efficiency.
          </p>
        </div>
      </section>

      {/* Main campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ServicesClient />
      </div>

    </div>
  );
}
