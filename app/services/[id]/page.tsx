import React from 'react';
import Link from 'next/link';
import { FOCUS_AREAS, LEGAL_COMPLIANCE, FocusArea } from '@/lib/data';
import { 
  Sprout, Users, Cpu, Heart, Leaf, Briefcase, 
  ArrowLeft, CheckCircle2, ChevronRight, Activity, Calendar, ShieldCheck, HelpCircle
} from 'lucide-react';
import { ClientDetailWrapper } from './client-wrapper';

const ICON_MAP: Record<string, any> = {
  Sprout: Sprout,
  Users: Users,
  Cpu: Cpu,
  Heart: Heart,
  Leaf: Leaf,
  Briefcase: Briefcase,
};

// Next.js 15 static routes generation
export async function generateStaticParams() {
  return FOCUS_AREAS.map((camp) => ({
    id: camp.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const camp = FOCUS_AREAS.find((c) => c.id === resolvedParams.id);
  return {
    title: camp ? `${camp.title} - Raita Mitra Social Trust` : 'Campaign Details',
    description: camp ? camp.description : 'Explore our target programs and impact blueprints.',
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const camp = FOCUS_AREAS.find((c) => c.id === resolvedParams.id) as FocusArea;

  if (!camp) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-20 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Campaign Not Found</h2>
        <Link href="/services" className="mt-4 text-sm font-semibold text-emerald-600 hover:underline">
          Return to Focus Areas
        </Link>
      </div>
    );
  }

  const IconComponent = ICON_MAP[camp.icon] || Sprout;

  return (
    <div className="flex-grow bg-slate-50 font-sans pb-16">
      {/* 1. Breadcrumb bar */}
      <div className="bg-slate-100 border-b border-slate-200/50 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="hover:text-emerald-700 transition-colors">Focus Areas</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 truncate max-w-[200px] sm:max-w-none">{camp.shortTitle}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Content Pane */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Hero banner card */}
          <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${camp.color} text-white space-y-4 shadow-md relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-6 opacity-10 text-9xl font-black font-serif pointer-events-none select-none">
              {camp.number}
            </div>
            
            <span className="text-[10px] font-mono font-bold tracking-widest border border-white/20 px-2.5 py-1 roundeduppercase bg-white/15">
              CAMPAIGN CODENAME: {camp.id.toUpperCase()}
            </span>

            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight">
              {camp.title}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed max-w-2xl text-justify">
              {camp.description}
            </p>
          </div>

          {/* Core Initiatives List */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-50 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Core Objectives & Frameworks
            </h2>
            <ul className="grid grid-cols-1 gap-3.5">
              {camp.bullets.map((bullet, idx) => (
                <li key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">{bullet}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Sub-projects status tracking table */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 pb-1 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
              Direct Action Sub-Projects
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Raita Mitra constructs local sub-campaigns in targeted villages in Hubballi, Dharwad, and Koppal to deliver materials.
            </p>

            <div className="space-y-4">
              {camp.projects.map((proj, pIdx) => (
                <div key={pIdx} className="border border-slate-150 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900 leading-none">{proj.name}</h4>
                    <p className="text-xs text-slate-550 leading-relaxed text-justify pr-6">{proj.description}</p>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase shrink-0 ${
                    proj.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-850 border border-emerald-200' 
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {proj.status === 'active' ? '● Active Camp' : '✓ Completed'}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar wrapper */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Progress Card (Client side wrapper wraps interactive elements) */}
          <ClientDetailWrapper campaignId={camp.id} campTitle={camp.title} initialCampaign={camp} />

          {/* NGO Darpan / Compliance verification side strip */}
          <div className="p-5 bg-slate-900 text-slate-350 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h4 className="font-extrabold font-sans text-xs uppercase tracking-wider text-slate-200 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Verified Authenticity
            </h4>
            <div className="space-y-2 font-mono">
              <p>Raita Mitra Social Trust is fully federalized under the Income Tax Division:</p>
              <ul className="space-y-1 pl-2">
                <li>• Trust Reg: {LEGAL_COMPLIANCE.registrationNo}</li>
                <li>• 80G Approval: AY25 to AY27</li>
                <li>• NGO Darpan ID: KA/2023/0342549</li>
              </ul>
            </div>
          </div>

          <Link
            href="/services"
            className="flex items-center justify-center gap-1.5 font-bold text-xs text-slate-500 hover:text-slate-850 py-2 border border-slate-200/50 hover:bg-white rounded-xl transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services List
          </Link>
        </div>

      </div>
    </div>
  );
}
