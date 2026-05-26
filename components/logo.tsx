'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-11", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Dynamic Emblem with layered leaves representing growth */}
      <svg
        viewBox="0 0 160 160"
        className="h-full w-auto flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Core stem of the tree */}
        <path
          d="M80 120V65"
          className="stroke-emerald-600"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Golden branching network (Raita Mitra iconic tree branches) */}
        <path
          d="M80 65C80 65 65 50 65 35C65 20 80 12 80 12C80 12 95 20 95 35C95 50 80 65 80 65Z"
          className="fill-amber-400 stroke-amber-500"
          strokeWidth="2"
        />
        <path
          d="M80 80C80 80 50 65 50 48C50 31 70 24 70 24"
          className="stroke-amber-400"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M80 80C80 80 110 65 110 48C110 31 90 24 90 24"
          className="stroke-amber-400"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M80 95C80 95 35 80 35 60C35 40 58 35 58 35"
          className="stroke-amber-400"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M80 95C80 95 125 80 125 60C125 40 102 35 102 35"
          className="stroke-amber-400"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Golden outer budding points */}
        <circle cx="80" cy="12" r="3" className="fill-amber-500" />
        <circle cx="65" cy="35" r="3" className="fill-amber-500" />
        <circle cx="95" cy="35" r="3" className="fill-amber-500" />
        <circle cx="50" cy="48" r="3" className="fill-amber-500" />
        <circle cx="110" cy="48" r="3" className="fill-amber-500" />
        <circle cx="35" cy="60" r="3" className="fill-amber-500" />
        <circle cx="125" cy="60" r="3" className="fill-amber-500" />

        {/* Base Green overlapping leaves representing agriculture (Farmer Support) */}
        {/* Layer 1: Inner leaves */}
        <path
          d="M80 120C65 110 55 90 55 75C70 85 80 105 80 120Z"
          className="fill-emerald-500 stroke-emerald-600"
          strokeWidth="1.5"
        />
        <path
          d="M80 120C95 110 105 90 105 75C90 85 80 105 80 120Z"
          className="fill-emerald-500 stroke-emerald-600"
          strokeWidth="1.5"
        />

        {/* Layer 2: Broad outer agricultural wings */}
        <path
          d="M80 132C50 125 25 100 25 80C50 85 75 115 80 132Z"
          className="fill-green-600 stroke-emerald-700"
          strokeWidth="2"
        />
        <path
          d="M80 132C110 125 135 100 135 80C110 85 85 115 80 132Z"
          className="fill-green-600 stroke-emerald-700"
          strokeWidth="2"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-baseline line-clamp-1 leading-none">
            <span className="font-serif text-[21px] font-bold text-slate-900 tracking-tight">Raita</span>
            <span className="font-sans text-[21px] font-semibold text-emerald-600 tracking-tight ml-[2px]">Mitra</span>
          </div>
          <span className="font-mono text-[9px] font-medium tracking-widest text-slate-500 uppercase leading-none mt-[2px] block">
            Social Trust®
          </span>
        </div>
      )}
    </div>
  );
}
