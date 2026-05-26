'use client';

import React from 'react';
import Link from 'next/link';
import { useDonations } from '@/lib/donation-context';
import { 
  Sprout, Users, Cpu, Heart, Leaf, Briefcase, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { motion } from 'motion/react';

const ICON_MAP: Record<string, any> = {
  Sprout: Sprout,
  Users: Users,
  Cpu: Cpu,
  Heart: Heart,
  Leaf: Leaf,
  Briefcase: Briefcase,
};

export default function ServicesClient() {
  const { campaigns, openModal } = useDonations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map((camp) => {
        const IconComponent = ICON_MAP[camp.icon] || Sprout;
        const currentFundPct = Math.min(100, Math.floor((camp.raisedAmount / camp.targetGoal) * 100));

        return (
          <motion.div 
            key={camp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-250 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Category Banner strip */}
              <div className={`p-5 bg-gradient-to-r ${camp.color} text-white flex items-center justify-between`}>
                <div className="space-y-1.5 flex-1 pr-4">
                  <span className="text-[9px] font-mono font-bold tracking-widest border border-white/20 px-2 py-0.5 rounded uppercase bg-white/10">
                    Focus Area {camp.number}
                  </span>
                  <h3 className="text-base font-extrabold tracking-tight block line-clamp-1">
                    {camp.title}
                  </h3>
                </div>
                <div className="p-2 bg-white/10 rounded-xl border border-white/10 shrink-0">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Body description */}
              <div className="p-5 space-y-4">
                <p className="text-xs sm:text-sm text-slate-505 text-justify leading-relaxed">
                  {camp.description}
                </p>

                {/* Bullet elements from document */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Main Initiatives:</h4>
                  <ul className="space-y-1.5">
                    {camp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-650 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                        <span className="text-slate-600 font-sans">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Focus block */}
                <div className="p-3 bg-emerald-500/5 border border-emerald-600/10 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-emerald-800 tracking-wider block uppercase">Impact Focus:</span>
                  <p className="text-xs leading-relaxed text-slate-705 italic font-serif">
                    &quot;{camp.impactFocus}&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking meter */}
            <div className="mt-auto border-t border-slate-50 p-5 space-y-4 shrink-0">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs font-mono font-medium">
                  <span className="text-slate-500 font-bold">Raised: ₹{(camp.raisedAmount).toLocaleString('en-IN')}</span>
                  <span className="text-emerald-700 font-bold">{currentFundPct}% Funded</span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                    style={{ width: `${currentFundPct}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Goal: ₹{(camp.targetGoal).toLocaleString('en-IN')}</span>
                  <span>Karnataka Districts</span>
                </div>
              </div>

              {/* Program links */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/services/${camp.id}`}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 rounded-xl text-center tracking-wide transition-all shadow-xs"
                >
                  Detailed Blueprint
                </Link>
                <button
                  onClick={() => openModal(camp.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-md text-white text-xs font-bold py-2.5 rounded-xl text-center tracking-wide transition-all shadow-xs"
                >
                  Sponsor Camp
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
