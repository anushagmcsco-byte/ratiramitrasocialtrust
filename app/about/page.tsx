'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDonations } from '@/lib/donation-context';
import { LEGAL_COMPLIANCE, FOCUS_AREAS } from '@/lib/data';
import { 
  Building, Award, ShieldCheck, FileCheck, Landmark, Compass, Heart, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  const { openModal } = useDonations();

  return (
    <div className="flex-grow bg-[#fbfcfa] font-sans pb-16">
      
      {/* 1. Header Hero Page Banner */}
      <section className="relative overflow-hidden bg-slate-900 py-16 border-b border-slate-100 text-center">
        {/* Background Image with dark elegant overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/karnataka-rural-agriculture/1920/400"
            alt="About Banner"
            fill
            className="object-cover opacity-25"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-900/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-full uppercase inline-block">
            Raita Mitra Social Trust (R)
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white leading-none">
            About Our Mission & Vision
          </h1>
          <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed text-slate-300">
            Registered Public Charitable Trust since 2021. Formulated to uplift farming communities and foster self-reliant rural districts across Karnataka.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Core content block */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Background Story */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4"
          >
            <h2 className="text-xl font-bold text-slate-900 tracking-tight pb-2 border-b border-slate-50 flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-800" />
              Our Background & Origin
            </h2>
            <p className="text-sm text-slate-650 leading-relaxed text-justify">
              Raita Mitra Social Trust (R) was established with the vision of uplifting farmers and empowering rural communities. The organization was registered in 2021 in Hubballi, Karnataka, and works across multiple districts to promote sustainable agriculture, education, healthcare, environmental awareness, and skill development.
            </p>
            <p className="text-sm text-slate-650 leading-relaxed text-justify">
              We focus on improving farmers’ economic stability, enhancing community well-being, and building long-term resilience through practical programs and partnerships. Our initiatives aim to bridge the gap between rural challenges and opportunities by creating access to resources, knowledge, and support systems.
            </p>
          </motion.section>

          {/* Vision and Mission dual layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Vision */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 rounded-2xl text-white shadow-md space-y-3">
              <Compass className="h-8 w-8 text-amber-300" />
              <h3 className="text-lg font-extrabold tracking-tight font-serif">
                Our Vision
              </h3>
              <p className="text-xs text-white/50 font-mono">SELF-RELIANCE & DIGNITY</p>
              <p className="text-sm leading-relaxed text-slate-105 text-slate-205 text-slate-100 text-justify">
                To build self-reliant rural communities by empowering farmers, enhancing livelihoods, and enabling equal access to education, healthcare, and opportunities.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-6 rounded-2xl text-white shadow-md space-y-3">
              <Compass className="h-8 w-8 text-amber-200" />
              <h3 className="text-lg font-extrabold tracking-tight font-serif">
                Our Mission
              </h3>
              <p className="text-xs text-amber-100 font-mono">PRACTICAL PROGRESS FOCUS</p>
              <p className="text-sm leading-relaxed text-slate-55 text-justify">
                To support farmers and rural families through sustainable development initiatives, livelihood programs, skill training, and community development activities that promote economic growth, social equity, and environmental responsibility.
              </p>
            </div>
          </div>

          {/* Why Support Us */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight pb-2 border-b border-slate-50 flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-800" />
              Why Support Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-800 shrink-0" />
                  Government Compliant
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fully registered trust. Recognized on NGO Darpan and MCA CSR corporate portals.
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-800 shrink-0" />
                  Transparent Governance
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rigorous audits. Clear double-ledger transparency for every crowdfunding donation.
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-800 shrink-0" />
                  Grassroots Connection
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real impacts on ground. Deploys testing kits, seeds, and computer equipment directly.
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-800 shrink-0" />
                  Sustainability Priority
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We evaluate outcomes monthly, keeping the ecosystem green, circular, and durable.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar: Legal credentials and instant CTA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Legal Compliance card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200">Legal Certificates</h3>
            </div>
            
            <ul className="space-y-4 text-xs">
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">Type of Organization:</strong>
                <span className="text-white font-mono">{LEGAL_COMPLIANCE.type}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">Registered Under:</strong>
                <span className="text-white font-mono">{LEGAL_COMPLIANCE.registeredUnder}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">Registration Number:</strong>
                <span className="text-white font-mono font-bold text-emerald-400">{LEGAL_COMPLIANCE.registrationNo}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">NGO Darpan ID:</strong>
                <span className="text-white font-mono">{LEGAL_COMPLIANCE.ngoDarpanId}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">PAN Card:</strong>
                <span className="text-white font-mono uppercase">{LEGAL_COMPLIANCE.pan}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">CSR Registration No:</strong>
                <span className="text-white font-mono">{LEGAL_COMPLIANCE.csrNo}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">80G Provisional Approval:</strong>
                <span className="text-white font-mono">{LEGAL_COMPLIANCE.approval80G}</span>
              </li>
              <li className="space-y-1">
                <strong className="text-slate-400 block font-semibold">Operational Territories:</strong>
                <span className="text-slate-300 block text-justify leading-relaxed">{LEGAL_COMPLIANCE.operationalArea}</span>
              </li>
            </ul>
          </div>

          {/* Quick Support CTA card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 text-center">
            <Heart className="h-10 w-10 text-rose-500 fill-rose-500 mx-auto animate-pulse" />
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-slate-900 text-sm">Contribute to Karnataka Farmers</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Directly sponsors soil health cards, SHG tailoring workshops, and AI libraries. Eligible for tax rebates.
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
            >
              Simulate Instant Donation
            </button>
            <Link
              href="/contact"
              className="block text-xs text-slate-500 font-semibold hover:underline"
            >
              Ask legal details first
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
