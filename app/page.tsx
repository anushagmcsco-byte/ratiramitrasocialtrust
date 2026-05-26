'use client';

import React from 'react';
import Link from 'next/link';
import { useDonations } from '@/lib/donation-context';
import { 
  Sprout, Award, Users, Cpu, IndianRupee, Landmark, TrendingUp, CheckCircle, ArrowRight, Heart
} from 'lucide-react';
import { motion } from 'motion/react';

const TRUST_CERTIFICATIONS = [
  { icon: Award, label: "Indian Trusts Act 1882", desc: "Reg No. HBL-4-00006-2021-22" },
  { icon: Landmark, label: "80G Provisional Tax Exemption", desc: "AY 2024-25 to 2026-27" },
  { icon: Users, label: "MCA CSR Approved", desc: "CSR No. CSR00059487" },
  { icon: Sprout, label: "NGO Darpan Portal", desc: "KA/2023/0342549" }
];

const IMPACT_METRICS = [
  { value: "2,500+", label: "Farmers Empowered", desc: "Seeds, soil testing & training" },
  { value: "1,200+", label: "Rural Women Skilled", desc: "Tailoring & SHG enterprise" },
  { value: "12+", label: "Districts Active", desc: "Throughout Karnataka state" },
  { value: "15,000+", label: "Saplings Sustained", desc: "Eco climate watershed action" }
];

export default function HomePage() {
  const { campaigns, openModal } = useDonations();

  // Show only 3 campaigns on home for a clean grid layout
  const primaryCampaigns = campaigns.slice(0, 3);

  return (
    <div className="flex flex-col flex-1 bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        {/* Subtle decorative background circles representing organic fields */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full filter blur-3xl -translate-x-12 translate-y-12"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-bold font-mono uppercase tracking-wider">
              <Sprout className="h-4 w-4 text-emerald-600 animate-bounce" />
              <span>Raita Mitra Social Trust (R)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight leading-none">
              Empowering Farmers, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                Strengthening Communities
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              We are a registered non-profit organization dedicated to the empowerment of small farmers, women collectives, and rural under-served families across Karnataka. Through practical innovations in agriculture, digital education, and entrepreneurship, we construct self-reliant grassroots futures.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                onClick={() => openModal()}
                className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg text-white font-extrabold px-6 py-3.5 rounded-xl text-sm tracking-wide transition-all shadow-md active:scale-98 flex items-center gap-2"
              >
                <Heart className="h-4 w-4 fill-white" />
                <span>Urgent: Support Campaigns</span>
              </button>
              <Link
                href="/services"
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Read Focus Areas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Hero Visual Card showcasing a composite of organic farming growth */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative bg-white border border-slate-100/80 p-5 rounded-3xl shadow-2xl overflow-hidden group">
              {/* Dynamic decorative banner element */}
              <div className="h-52 w-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl relative overflow-hidden flex items-center justify-center text-white">
                <span className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></span>
                <div className="relative text-center p-4 space-y-2">
                  <Sprout className="h-12 w-12 text-amber-300 mx-auto fill-amber-300/10" />
                  <span className="block font-serif text-lg font-extrabold tracking-tight">Karnataka Livelihoods Blueprint</span>
                  <span className="block text-[10px] font-mono tracking-widest text-emerald-100">HUBLI HEADQUARTERS ACTIVE</span>
                </div>
              </div>

              {/* Trust Core pillars highlights */}
              <div className="grid grid-cols-2 gap-3.5 mt-5">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-mono font-bold text-amber-600">AGRICULTURE</span>
                  <span className="text-xs font-bold text-slate-800">Seed Banks & Soil Tests</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-mono font-bold text-emerald-600">CAPACITY</span>
                  <span className="text-xs font-bold text-slate-800">Women SHG tailoring</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-mono font-bold text-blue-600">DIFFERENCE</span>
                  <span className="text-xs font-bold text-slate-800">Youth AI & Coding lab</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-mono font-bold text-rose-600">COMPLIANT</span>
                  <span className="text-xs font-bold text-slate-800">Approved 80G credits</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEDERAL TRUST COMPLIANCE CERTIFICATION BAR */}
      <section className="bg-white border-y border-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 block pb-1">Verified Credentials</span>
            <h2 className="text-xs font-extrabold text-slate-650 uppercase tracking-widest font-sans inline-flex items-center gap-1.5">
              Legal Compliance & Certification Anchors
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_CERTIFICATIONS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="flex gap-3 items-start border-l border-slate-100 pl-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">{item.label}</h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ACTIVE CROWDFUNDED CAMPAIGNS HIGHLIGHTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Live Crowdfunding Drives
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-none">
              Deploy Your Help: Live Campaigns
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every donation represents real, quantifiable items deployed directly to Karnataka villages. Track raised status in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {primaryCampaigns.map((camp) => {
              const currentFundPct = Math.min(100, Math.floor((camp.raisedAmount / camp.targetGoal) * 100));
              return (
                <div 
                  key={camp.id} 
                  className="bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group shadow-xs"
                >
                  {/* Visual Category Banner based on icon */}
                  <div className={`p-5 bg-gradient-to-br ${camp.color} text-white space-y-2 relative overflow-hidden shrink-0`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-bold font-serif text-8xl line-clamp-1 pointer-events-none select-none">
                      {camp.number}
                    </div>
                    <span className="text-[9px] font-mono font-black border border-white/20 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-md">
                      CAMPAIGN DRIVEN
                    </span>
                    <h3 className="text-base font-extrabold tracking-tight line-clamp-1 group-hover:underline">
                      {camp.title}
                    </h3>
                  </div>

                  {/* Body Text */}
                  <div className="p-5 flex-grow space-y-4 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-slate-500 leading-relaxed text-justify line-clamp-3">
                        {camp.description}
                      </p>

                      {/* Display custom bullet preview */}
                      <ul className="mt-3.5 space-y-1">
                        {camp.bullets.slice(0, 2).map((b, bIdx) => (
                          <li key={bIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                            <span className="line-clamp-1 text-slate-500">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress Bar Module */}
                    <div className="space-y-2 pt-2 border-t border-slate-50">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span className="text-slate-500">Raised: ₹{camp.raisedAmount.toLocaleString('en-IN')}</span>
                        <span className="text-emerald-700">{currentFundPct}%</span>
                      </div>
                      
                      {/* Interactive visual progress meter */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-1000"
                          style={{ width: `${currentFundPct}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Target: ₹{camp.targetGoal.toLocaleString('en-IN')}</span>
                        <span>Karnataka, India</span>
                      </div>
                    </div>
                  </div>

                  {/* Trigger buttons */}
                  <div className="px-5 pb-5 shrink-0 grid grid-cols-2 gap-2">
                    <Link
                      href={`/services/${camp.id}`}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 rounded-xl text-center transition-all"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => openModal(camp.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs"
                    >
                      Fund Campaign
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-1 text-sm font-extrabold text-emerald-700 hover:underline"
            >
              <span>View all 6 focus campaigns and matching sub-projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GRASSROOTS IMPACT STATISTICS BENTO BOX */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/10">
              Grassroots Report Metrics
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-none text-white">
              Socio-Economic Impact Across Districts
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 text-justify">
              Since registration in 2021, Raita Mitra Social Trust has consistently engineered ground-level assets. We do not support bureaucratic overhead; funds are translated into soil quality testing kit packages, direct seed supply boxes, sewing machineries, and student IT terminals.
            </p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1 leading-relaxed">
              <span className="font-bold text-white block mb-1">Our Governance Compact:</span>
              <p className="text-slate-400">✅ Audit compliance with Karnataka Charitable Commissioner regulatory boards.</p>
              <p className="text-slate-400">✅ Double-verifier bank reconciliations for every crowdsourced rupee.</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {IMPACT_METRICS.map((metric, index) => (
              <div 
                key={index}
                className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl relative overflow-hidden"
              >
                <span className="text-3xl font-black font-serif text-white block tracking-tight">
                  {metric.value}
                </span>
                <span className="text-sm font-bold text-emerald-400 block mt-1.5">
                  {metric.label}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HEARTHWARMING CLOSING CALL TO ACTION BANNER */}
      <section className="py-20 px-4 text-center bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <Heart className="h-12 w-12 text-rose-500 fill-rose-500 animate-pulse mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-none">
            Become an &quot;Annadatha&quot; - Support Livelihoods Today
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            &quot;ದಾನವೇ ಧರ್ಮದ ಮುಖ&quot; (Charity is the gateway to righteous duty). Join us in providing clean livelihoods, vocational tools, and computer training to rural homes. Every contribution qualifies for 50% 80G tax exemptions under Indian tax codes.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => openModal()}
              className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg text-white font-extrabold px-6 py-3.5 rounded-xl text-sm tracking-wide transition-all shadow-md active:scale-98 flex items-center gap-1.5"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Donate Now</span>
            </button>
            <Link
              href="/contact"
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-xs"
            >
              Contact Board of Trustees
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
