'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDonations } from '@/lib/donation-context';
import { 
  Sprout, Award, Users, Cpu, Landmark, TrendingUp, CheckCircle, ArrowRight, Heart,
  ShieldCheck, Calculator, Check, ArrowUpRight, HelpCircle, Sparkles, Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRUST_CERTIFICATIONS = [
  { icon: Award, label: "Indian Trusts Act 1882", desc: "Reg No. HBL-4-00006-2021-22" },
  { icon: Landmark, label: "80G Provisional Tax Exemption", desc: "AY 2024-25 to 2026-27" },
  { icon: Users, label: "MCA CSR Approved", desc: "CSR No. CSR00059487" },
  { icon: Sprout, label: "NGO Darpan Portal", desc: "Ref: KA/2023/0342549" }
];

const IMPACT_METRICS = [
  { value: "2,500+", label: "Farmers Nourished", desc: "Seeds, soil testing & training" },
  { value: "1,200+", label: "Rural Women Skilled", desc: "Tailoring & SHG enterprise" },
  { value: "12+", label: "Districts Shielded", desc: "Throughout Karnataka state" },
  { value: "15,000+", label: "Climate Saplings", desc: "Eco climate watershed action" }
];

// Preset definitions for our interactive estimator
const ESTIMATOR_PRESETS = [
  { amount: 1500, label: "Seed Pack Sponsor" },
  { amount: 5000, label: "Tailoring Station" },
  { amount: 12000, label: "Farmer Cohort Support" },
  { amount: 35000, label: "Digital Lab Terminal" }
];

export default function HomePage() {
  const { campaigns, openModal, donations, totalDonationSum } = useDonations();
  const [estimatedValue, setEstimatedValue] = useState<number>(5000);
  const [activePreset, setActivePreset] = useState<number>(5000);

  // Show only 3 campaigns on home for a clean grid layout
  const primaryCampaigns = campaigns.slice(0, 3);

  // Math helper for splitting resource outcomes
  const calculateOutput = (val: number) => {
    return {
      seeds: Math.floor(val / 300),
      soilTests: Math.floor(val / 750),
      tailorHours: Math.floor(val / 150),
      coderHours: Math.floor(val / 200)
    };
  };

  const outputs = calculateOutput(estimatedValue);

  return (
    <div className="flex flex-col flex-1 bg-slate-50/50">
      
      {/* 1. HERO BRAND STAGE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/25 pt-12 md:pt-20 pb-32 border-b border-slate-100">
        
        {/* Subtle Organic Radial Ambient Rings */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/10 rounded-full blur-[100px] -translate-y-24 translate-x-24 select-none pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/10 rounded-full blur-[100px] translate-y-24 -translate-x-24 select-none pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Action Text - Left */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-xl text-emerald-900 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-pulse"></span>
                <span>Raita Mitra Social Trust (R)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-[0.95] sm:leading-[1.05]">
                Dignified Futures <br className="hidden sm:inline" />
                For Farmers & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-950 inline-block">
                  Rural Communities
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed text-justify w-5/6">
                Registered under the Indian Trusts Act, 1882, the Raita Mitra board of trustees operates directly at the grassroot lines in Karnataka. We build measurable, fully transparent economic self-reliance across sustainable dry-land cultivation, women tailoring collectives, and village IT literacy.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openModal()}
                  className="bg-emerald-800 hover:bg-emerald-900 hover:shadow-lg text-white font-bold px-6 py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-sm active:scale-97 flex items-center gap-2 select-none group cursor-pointer"
                >
                  <Heart className="h-4 w-4 fill-amber-300 text-amber-300 group-hover:scale-110 duration-250" />
                  <span>Sponsor Operations</span>
                </button>
                <Link
                  href="/services"
                  className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-2xs flex items-center gap-2 select-none"
                >
                  <span>Focus Sectors</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>

              {/* Instant Social Trust Indicator */}
              <div className="pt-4 flex items-center gap-8 border-t border-slate-100">
                <div className="text-left font-mono">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Audit Compliance</span>
                  <span className="text-slate-800 text-xs font-black flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 fill-emerald-50" />
                    Double-Entry Transparency
                  </span>
                </div>
                <div className="text-left font-mono">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Simulated Ledger</span>
                  <span className="text-slate-800 text-xs font-black">
                    ₹{totalDonationSum.toLocaleString('en-IN')} Raised Live
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Asymmetric Graphical Hero Stack - Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative bg-white border border-slate-150 p-6 rounded-3xl shadow-xl space-y-6">
                
                {/* Visual Cover Layer representing dynamic agricultural grid */}
                <div className="relative h-48 w-full bg-slate-900 rounded-2xl overflow-hidden group">
                  <Image
                    src="https://picsum.photos/seed/cultivation/800/600"
                    alt="Karnataka Dryland Farms"
                    fill
                    className="object-cover opacity-80 group-hover:scale-102 transition-transform duration-[600ms]"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-slate-900/10 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 text-left">
                    <span className="bg-emerald-600 text-white font-mono text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded shadow-sm inline-block mb-1">
                      Koppal Field Photo
                    </span>
                    <strong className="text-white text-sm sm:text-base font-serif font-bold block leading-tight">
                      Empowering Village Handlooms
                    </strong>
                  </div>
                </div>

                {/* Simulated Ledger Quick Roll */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-600" />
                      Dynamic Trace Ledger
                    </span>
                    <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">
                      Live Sandbox
                    </span>
                  </div>

                  <div className="space-y-2">
                    {donations.slice(0, 2).map((don, dIdx) => (
                      <div key={don.id} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex justify-between items-center text-left text-[11px]">
                        <div className="truncate max-w-[170px]">
                          <strong className="text-slate-800 font-extrabold block truncate">{don.donorName}</strong>
                          <span className="text-slate-450 text-[10px] font-mono truncate block">{don.campaignTitle}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <strong className="text-emerald-700 font-mono block">₹{don.amount.toLocaleString('en-IN')}</strong>
                          <span className="text-[9px] text-slate-400 block font-mono">{don.date}</span>
                        </div>
                      </div>
                    ))}
                    {donations.length === 0 && (
                      <div className="py-4 text-center rounded-xl border border-dashed border-slate-200 text-slate-400 font-mono text-[10px]">
                        No sandbox deposits captured yet. Use header trigger!
                      </div>
                    )}
                  </div>
                </div>

                {/* Fast Action Link */}
                <Link
                  href="/admin"
                  className="w-full bg-slate-905 bg-slate-900 text-white text-[11px] font-mono tracking-wider uppercase font-bold py-3 rounded-xl block text-center hover:bg-slate-805 transition-all text-sm group"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Open Administrative Control Hub
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. COMPLIANCE & LEGAL CERTIFICATION BAR */}
      <section className="bg-white border-b border-slate-150 py-10 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 block pb-1">Rigorous NGO Accountability</span>
            <h2 className="text-[11px] sm:text-xs font-black text-slate-900 tracking-widest uppercase font-mono inline-flex items-center gap-1.5">
              Verified Legal Registration Credentials
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_CERTIFICATIONS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="flex gap-3.5 items-start border-l border-slate-105 border-slate-200 pl-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
                    <IconComp className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-black tracking-tight text-slate-900">{item.label}</h4>
                    <p className="text-[10px] text-slate-500 font-mono font-medium leading-none">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE DONATION RESOURCE OUTCOMES ESTIMATOR (Redesigned Website Look Highlight) */}
      <section className="py-20 bg-slate-100/30 border-b border-slate-150 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-[32px] border border-slate-150 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Form input - Left half */}
          <div className="p-6 sm:p-10 md:col-span-6 space-y-6 border-b md:border-b-0 md:border-r border-slate-150 text-left">
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono tracking-widest font-black text-emerald-900 uppercase bg-emerald-50 px-2.5 py-1 rounded">
                Impact Calculator
              </span>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                Resource Estimator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Move the interactive simulator to see precisely how simulated or real donations translate into dryland agricultural supplies and community tools.
              </p>
            </div>

            {/* Presets Chips Grid */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">Select Target preset:</label>
              <div className="grid grid-cols-2 gap-2">
                {ESTIMATOR_PRESETS.map((preset) => (
                  <button
                    key={preset.amount}
                    onClick={() => {
                      setEstimatedValue(preset.amount);
                      setActivePreset(preset.amount);
                    }}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-left tracking-tight transition-all uppercase cursor-pointer ${
                      activePreset === preset.amount
                        ? 'border-emerald-850 bg-emerald-50 text-emerald-950 font-extrabold'
                        : 'border-slate-250 border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>₹{preset.amount.toLocaleString('en-IN')}</span>
                    <span className="block text-[9px] text-slate-400 font-mono mt-0.5 normal-case font-medium">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider/Manual Input Input */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-400">Custom Sponsor Amount:</span>
                <span className="text-slate-900 text-sm">₹{estimatedValue.toLocaleString('en-IN')} INR</span>
              </div>

              {/* Slider Input */}
              <div className="flex items-center gap-3">
                <Sliders className="h-4 w-4 text-emerald-800 shrink-0" />
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={estimatedValue}
                  onChange={(e) => {
                    const parsed = Number(e.target.value);
                    setEstimatedValue(parsed);
                    setActivePreset(parsed);
                  }}
                  className="w-full h-1.5 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                />
              </div>

              {/* Manual preset button */}
              <button
                onClick={() => openModal('sustainable-agriculture')}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold p-3 text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 select-none cursor-pointer"
              >
                <span>Commit ₹{estimatedValue.toLocaleString('en-IN')} To Campaign</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Graphical outputs - Right half */}
          <div className="p-6 sm:p-10 md:col-span-6 bg-slate-900 text-white flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl" />
            
            <div className="space-y-1.5 mb-6">
              <span className="text-[9px] font-mono text-emerald-400 font-extrabold tracking-widest block uppercase">ESTIMATED PHYSICAL OUTCOME</span>
              <h4 className="text-xs text-slate-403 font-serif italic text-slate-400">What your specified rupees purchase:</h4>
            </div>

            <div className="space-y-4 relative z-10">
              
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
                    <Sprout className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">High-yield Seeds Co-ops:</span>
                </div>
                <strong className="font-mono text-sm text-white">{outputs.seeds} Bags</strong>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Soil Quality Organic Assays:</span>
                </div>
                <strong className="font-mono text-sm text-white">{outputs.soilTests} Tests</strong>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Self-help sewing machine training:</span>
                </div>
                <strong className="font-mono text-sm text-white">{outputs.tailorHours} Hours</strong>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Youth basic IT/comp classes:</span>
                </div>
                <strong className="font-mono text-sm text-white">{outputs.coderHours} Hours</strong>
              </div>

            </div>

            <p className="text-[10px] text-slate-450 text-slate-400 italic leading-relaxed pt-6 border-t border-white/5 mt-6 text-justify">
              *Micro-allocation values represent field procurement averages evaluated by the Karnataka trust trustees under actual operations. Tax invoices provided for direct trace audits.
            </p>
          </div>

        </div>
      </section>

      {/* 4. ACTIVE CROWDFUNDED SECTORS HERO GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-3.5 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-900 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full">
              Live Projects Status
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-slate-900 leading-none">
              Deploying Micro-Funds
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every specific contribution mapped to direct materials delivered under actual Karnataka dry-land village operations. Review live campaigns:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {primaryCampaigns.map((camp) => {
              const currentFundPct = Math.min(100, Math.floor((camp.raisedAmount / camp.targetGoal) * 100));
              return (
                <div 
                  key={camp.id} 
                  className="bg-white rounded-3xl border border-slate-150 overflow-hidden flex flex-col justify-between hover:border-emerald-250 hover:shadow-xl transition-all duration-350 group text-left"
                >
                  
                  {/* Top sector header with dynamic accent theme */}
                  <div className={`p-6 bg-gradient-to-br ${camp.color} text-white space-y-3.5 relative overflow-hidden`}>
                    <span className="text-[8px] font-mono uppercase bg-white/10 border border-white/20 tracking-widest font-black px-2 py-0.5 rounded shadow-xs inline-block">
                      OP-CAMPAIGN FA-{camp.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-extrabold tracking-tight line-clamp-2">
                      {camp.title}
                    </h3>
                  </div>

                  {/* Operational parameters */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        {camp.description}
                      </p>

                      <ul className="space-y-1.5 border-t border-slate-50 pt-3">
                        {camp.bullets.slice(0, 3).map((bullet, bIdx) => (
                          <li key={bIdx} className="text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed">
                            <span className="p-0.5 bg-emerald-50 rounded-full shrink-0 text-emerald-900 mt-0.5">
                              <Check className="h-2.5 w-2.5 font-bold" />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress tracking bar */}
                    <div className="space-y-2 pt-2 border-t border-slate-100/70">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span className="text-slate-400 uppercase text-[9px] tracking-wider">Deposited Rupee:</span>
                        <span className="text-emerald-800">₹{camp.raisedAmount.toLocaleString('en-IN')}</span>
                      </div>
                      
                      {/* Interactive sleek progress slider */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-full transition-all duration-[1000ms]"
                          style={{ width: `${currentFundPct}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-405 text-slate-400 font-mono">
                        <span>Target Goal: ₹{camp.targetGoal.toLocaleString('en-IN')}</span>
                        <span className="font-bold text-emerald-900">{currentFundPct}% complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Triggers */}
                  <div className="p-6 pt-0 shrink-0 grid grid-cols-2 gap-2">
                    <Link
                      href={`/services/${camp.id}`}
                      className="border border-slate-205 border-slate-200 hover:border-slate-300 text-slate-650 hover:bg-slate-50 text-[11px] font-bold py-3 rounded-xl text-center uppercase tracking-wider transition-all select-none cursor-pointer"
                    >
                      Audit Details
                    </Link>
                    <button
                      onClick={() => openModal(camp.id)}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold py-3 rounded-xl uppercase tracking-wider transition-all shadow-2xs select-none cursor-pointer"
                    >
                      Fund Sprout
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-850 uppercase tracking-widest hover:text-emerald-900 transition-colors"
            >
              <span>Explore all focus operations & custom timelines</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. METRIC IMPACT INDICATORS BENTO DISPLAY */}
      <section className="bg-slate-900 text-white py-24 border-y border-slate-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/10">
              Grassroots Milestones Circular
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-none">
              Rigorous Progress Records
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 text-justify">
              Since legal commissioning in 2021, the Raita Mitra executive panel has maintained high asset-delivery ratios. We bypass programmatic intermediaries—donated volumes directly source high-yield seed buffers, certified soil chemistry assays, tailoring machineries, and IT coding hardware.
            </p>
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] space-y-2 leading-relaxed">
              <span className="font-extrabold text-white font-mono uppercase tracking-wider block mb-1">Our Accountability Guarantee:</span>
              <p className="text-slate-400 flex items-start gap-1.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Double-entry ledger matches real bank statements under regulatory auditor supervision.</span>
              </p>
              <p className="text-slate-400 flex items-start gap-1.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zero administrative payroll deductions for operations—100% micro-allocated on the ground.</span>
              </p>
            </div>
          </div>

          {/* Impact Stats Bento Grid layout */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {IMPACT_METRICS.map((metric, index) => (
              <div 
                key={index}
                className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 p-4 font-bold font-serif text-slate-800/10 text-7xl select-none pointer-events-none">
                  0{index + 1}
                </div>
                <span className="text-4xl font-black font-serif text-white block tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-2">
                  {metric.label}
                </span>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TRUST RESOLUTE PLEDGE (CTA) */}
      <section className="py-24 px-4 text-center bg-[#fbfcfa] border-b border-slate-150">
        <div className="max-w-3xl mx-auto space-y-6">
          <Heart className="h-10 w-12 text-rose-600 fill-rose-500/10 mx-auto animate-pulse" />
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight leading-none">
            Join the &quot;Annadatha&quot; League
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto text-justify sm:text-center">
            &ldquo;ದಾನವೇ ಧರ್ಮದ ಮುಖ&rdquo; (Righteous duty flourishes through purposeful benevolence). Align with us under official 80G tax rules to sponsor seed hubs, vocational tailoring labs, and student internet terminals. Ground milestone checks generated immediately.
          </p>
          <div className="pt-4 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => openModal()}
              className="bg-emerald-800 hover:bg-emerald-900 hover:shadow-lg text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 select-none cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-amber-300 text-amber-300" />
              <span>Donate Now</span>
            </button>
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-2xs select-none cursor-pointer"
            >
              Contact Board of Trustees
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
