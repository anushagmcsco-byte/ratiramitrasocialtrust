'use client';

import React from 'react';
import { useDonations } from '@/lib/donation-context';
import { FocusArea } from '@/lib/data';
import { IndianRupee, Heart, Landmark, HelpCircle, PackageOpen } from 'lucide-react';

interface ClientDetailWrapperProps {
  campaignId: string;
  campTitle: string;
  initialCampaign: FocusArea;
}

export function ClientDetailWrapper({ campaignId, campTitle, initialCampaign }: ClientDetailWrapperProps) {
  const { campaigns, openModal } = useDonations();
  
  // Resolve campaign from live list in state
  const liveCamp = campaigns.find(c => c.id === campaignId) || initialCampaign;
  
  const currentFundPct = Math.min(100, Math.floor((liveCamp.raisedAmount / liveCamp.targetGoal) * 100));

  // Determine custom sponsor packages based on category
  const getSponsorshipPackages = (id: string) => {
    switch (id) {
      case 'sustainable-agriculture':
        return [
          { name: "Organic Seed Package", value: 500, desc: "Sponsors native organic seed packs for 1 dryland farmer." },
          { name: "Soil Wellness Testing", value: 1500, desc: "Provides professional chemical soil testing kit & consultation." },
          { name: "Micro-Irrigation Setup", value: 5000, desc: "Sponsor farm pond setup and drip networks for 1 marginal farmer." },
        ];
      case 'women-empowerment':
        return [
          { name: "Weaving Vocational Lesson", value: 600, desc: "Sponsors 1 complete sewing & fabric cutting professional lesson." },
          { name: "Self-Help Kit package", value: 2000, desc: "Equips 1 tailoring enterprise with a customized vocational package." },
          { name: "SHG Enterprise Seed Grants", value: 6000, desc: "Interest-free seed capital assistance to start village food markets." },
        ];
      case 'digital-skills':
        return [
          { name: "Keyboard & Code Syllabus", value: 800, desc: "Supplies computer hardware entry units and local textbooks." },
          { name: "Smart Classroom Tech Hub", value: 3000, desc: "Sponsors village school smart projection setup for a week." },
          { name: "TechLab Learning Workstation", value: 10000, desc: "Sponsors 1 desktop PC terminal with full AI applications syllabus." },
        ];
      default:
        return [
          { name: "Community Basic Sponsorship", value: 500, desc: "Provides basic supplies for village camp arrangements." },
          { name: "Middle Program Package", value: 2000, desc: "Covers local training expenses, resources, and expert costs for 5 days." },
          { name: "Grand Institutional Grant", value: 10000, desc: "Sustains complete village center infrastructure & counselor rents." },
        ];
    }
  };

  const packages = getSponsorshipPackages(campaignId);

  return (
    <div className="space-y-6">
      
      {/* 1. Live Progress Panel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-1.5">
          <Heart className="h-4.5 w-4.5 text-rose-500 fill-rose-500" />
          Live Crowdfunding Progress
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-baseline text-xs font-mono">
            <span className="text-slate-500 font-bold">Raised: ₹{(liveCamp.raisedAmount).toLocaleString('en-IN')}</span>
            <span className="text-emerald-700 font-bold">{currentFundPct}% Funded</span>
          </div>

          <div className="w-full h-3 bg-slate-150 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-1000"
              style={{ width: `${currentFundPct}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Target Goal: ₹{(liveCamp.targetGoal).toLocaleString('en-IN')}</span>
            <span>Karnataka, IN</span>
          </div>
        </div>

        <button
          onClick={() => openModal(campaignId)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-md text-white font-extrabold py-3 rounded-xl text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-1.5 select-none"
        >
          <Heart className="h-4 w-4 fill-white" />
          <span>Donate to this Campaign</span>
        </button>
      </div>

      {/* 2. Sponsorship Packages catalog */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-1.5">
          <PackageOpen className="h-4.5 w-4.5 text-emerald-600" />
          Choose Direct Impact Sponsorship
        </h3>
        
        <div className="space-y-3">
          {packages.map((pkg, index) => (
            <button
              key={index}
              onClick={() => {
                // Set the exact package amount and open modal
                const searchParams = new URLSearchParams(window.location.search);
                localStorage.setItem('raitamitra_campaigns_amount', pkg.value.toString());
                openModal(campaignId);
                // Pre-populate input if possible
                setTimeout(() => {
                  const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                  if (input) {
                    input.value = pkg.value.toString();
                    const trigger = new Event('input', { bubbles: true });
                    input.dispatchEvent(trigger);
                  }
                }, 100);
              }}
              className="w-full text-left bg-slate-50 border border-slate-150 rounded-xl p-3.5 hover:border-emerald-55 hover:bg-emerald-500/[0.02] transition-all flex flex-col gap-1 cursor-pointer focus:outline-none"
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-black text-slate-900 leading-tight">{pkg.name}</span>
                <span className="text-xs font-mono font-extrabold text-emerald-700 bg-white border border-slate-150 px-2 py-0.5 rounded shadow-2xs">
                  ₹{pkg.value.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal text-justify pr-2">{pkg.desc}</p>
            </button>
          ))}
        </div>

        <div className="p-3 bg-amber-500/[0.03] border border-amber-500/10 text-[10px] leading-relaxed text-amber-800 rounded-xl flex gap-2">
          <Landmark className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <span className="font-bold text-amber-900 block">Section 80G Compliant Support</span>
            50% of your sponsored amount is deducted from taxable income under the central Income Tax codes. Invoices generated dynamically.
          </div>
        </div>
      </div>

    </div>
  );
}
