'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import { Mail, Phone, MapPin, ExternalLink, HelpCircle, Heart, Shield } from 'lucide-react';
import { LEGAL_COMPLIANCE, CONTACT_INFO } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      {/* Top Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Col 1: About the trust */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-white/5 p-3 rounded-2xl inline-block border border-white/10">
            <Logo className="h-10 text-white" showText={false} />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-bold text-white tracking-tight">Raita Mitra Social Trust (R)</h3>
            <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Empowering Farmers, Strengthening Communities</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 text-justify">
            Established in 2021 in Hubballi, Karnataka, we operate across multiple districts. We build sustainable livelihoods, improve educational access, provide healthcare camps, and stimulate rural entrepreneurship.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[10px] font-mono font-bold bg-white/5 text-slate-400 px-3 py-1.5 rounded-lg border border-white/5 inline-flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              80G Tax-Exempt Status
            </span>
            <span className="text-[10px] font-mono font-bold bg-white/5 text-slate-400 px-3 py-1.5 rounded-lg border border-white/5 inline-flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
              NGO Darpan Registered
            </span>
          </div>
        </div>

        {/* Col 2: Fast Navigation links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
            Camp Services
          </h4>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li>
              <Link href="/services#sustainable-agriculture" className="hover:text-emerald-400 hover:pl-1 transition-all flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                Farmer Empowerment
              </Link>
            </li>
            <li>
              <Link href="/services#women-empowerment" className="hover:text-emerald-400 hover:pl-1 transition-all flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                Women Cooperatives
              </Link>
            </li>
            <li>
              <Link href="/services#digital-skills" className="hover:text-emerald-400 hover:pl-1 transition-all flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                Digital & AI Literacy
              </Link>
            </li>
            <li>
              <Link href="/services#health-wellbeing" className="hover:text-emerald-400 hover:pl-1 transition-all flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                Community Health Camps
              </Link>
            </li>
            <li>
              <Link href="/services#climate-action" className="hover:text-emerald-400 hover:pl-1 transition-all flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                Eco Livelihoods
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Coordinates contact */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
            Registered Office
          </h4>
          <ul className="space-y-4 text-sm leading-relaxed">
            <li className="flex gap-3 items-start">
              <MapPin className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-slate-450 text-sm">
                <span className="font-bold text-white block mb-0.5">Headquarters:</span>
                {CONTACT_INFO.address}
              </div>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
              <div className="text-slate-450 text-sm">
                <span className="font-bold text-white block mb-0.5">Call Helpline:</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-emerald-400 font-mono transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
              <div className="text-slate-450 text-sm">
                <span className="font-bold text-white block mb-0.5">Corporate Email:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-emerald-400 font-mono break-all transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance / Registration Banner Strip */}
      <div className="bg-slate-950/65 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 leading-relaxed font-mono">
          <div>
            <strong className="text-slate-400 font-sans block mb-0.5">TRUST ACT REGISTRATION</strong>
            <span>Indian Trusts Act, 1882 No. HBL-4-00006-2021-22</span>
          </div>
          <div>
            <strong className="text-slate-400 font-sans block mb-0.5">FEDERAL NGO CODES</strong>
            <span>NGO Darpan ID: {LEGAL_COMPLIANCE.ngoDarpanId} • PAN: {LEGAL_COMPLIANCE.pan}</span>
          </div>
          <div>
            <strong className="text-slate-400 font-sans block mb-0.5">CSR CERTIFICATIONS</strong>
            <span>Ministry of Corporate Affairs ID: {LEGAL_COMPLIANCE.csrNo}</span>
          </div>
          <div>
            <strong className="text-slate-400 font-sans block mb-0.5">TAX COMPLIANCES</strong>
            <span>Income Tax Division approval Section 80G Provisional valid to FY27</span>
          </div>
        </div>
      </div>

      {/* Bottom copyrights panel */}
      <div className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-600 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {currentYear} Raita Mitra Social Trust (R). All Rights Reserved. Hubballi, Karnataka.</p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Heart className="h-3 w-3 text-red-700 fill-red-700" />
            <span>Built offline-first with 80G Tax-Credit Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
