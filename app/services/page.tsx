import React from 'react';
import ServicesClient from './services-client';

export const metadata = {
  title: 'Focus Areas & Campaigns - Raita Mitra Social Trust',
  description: 'Support active crowdfunding drives for agriculture, women weavers, child education, wellness clinics, and watershed conservation in Karnataka.',
};

export default function ServicesPage() {
  return (
    <div className="flex-grow bg-slate-50 font-sans pb-16">
      
      {/* Page Banner */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
            6 Campaigns Active
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 leading-none">
            Our Focus Areas & Programs
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
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
