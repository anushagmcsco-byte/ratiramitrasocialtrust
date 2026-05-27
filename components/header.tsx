'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDonations } from '@/lib/donation-context';
import Logo from './logo';
import { Menu, X, Heart, Sparkles, Shield, Orbit, Activity, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Focus Areas' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const pathname = usePathname();
  const { openModal } = useDonations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP TRUST ANNOUNCEMENT BAR */}
      <div className="bg-slate-950 text-emerald-100/90 py-2 px-4 text-[10px] font-mono font-bold tracking-widest text-center flex flex-wrap justify-center items-center gap-x-6 gap-y-1 border-b border-emerald-950 select-none">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          80G TAX EXEMPTION PROVISIONAL ACTIVE
        </span>
        <span className="hidden sm:inline text-slate-700">•</span>
        <span className="hidden sm:inline">MCA CSR NO: CSR00059487</span>
        <span className="hidden md:inline text-slate-700">•</span>
        <span className="hidden md:inline">REGD TRUST NO: HBL-4-00006-2021-22</span>
        <span className="hidden xl:inline text-slate-700">•</span>
        <span className="hidden xl:inline">HUBBALLI, KARNATAKA</span>
      </div>

      {/* 2. DYNAMIC FLOATING/STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo and Emblem */}
          <Link href="/" className="flex items-center hover:opacity-95 transition-opacity shrink-0">
            <Logo className="h-10 sm:h-11" showText={true} />
          </Link>

          {/* Desktop Navigation - Centered with broad website-style gaps */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 h-full">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] font-semibold tracking-tight transition-all duration-200 h-20 flex items-center border-b-2 translate-y-[1px] ${
                    isActive
                      ? 'text-emerald-900 border-emerald-800 font-bold'
                      : 'text-slate-600 hover:text-slate-950 border-transparent hover:border-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Utility Controls & CTA - Right aligned */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Elegant Separated Admin/CMS Console Link (Desktop) */}
            <Link
              href="/admin"
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider border select-none transition-all duration-200 ${
                pathname === '/admin'
                  ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-2xs'
                  : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Shield className="h-3.5 w-3.5 text-emerald-800" />
              <span>Admin Panel</span>
            </Link>

            {/* CTA Donation Hub Trigger */}
            <button
              onClick={() => openModal()}
              className="bg-emerald-800 hover:bg-emerald-900 hover:shadow-md text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-97 select-none cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-amber-300 text-amber-300" />
              <span>Donate Now</span>
            </button>

            {/* Hamburger Icon (Mobile Drawer) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-500 hover:text-slate-800 focus:outline-none md:hidden rounded-xl hover:bg-slate-50 cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 pt-3 pb-6 space-y-2 shadow-inner">
                {NAV_LINKS.map(link => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-sm font-bold p-3.5 rounded-xl transition-all ${
                        isActive
                          ? 'text-emerald-700 bg-emerald-50 pl-5 font-extrabold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:pl-5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Separated Admin Link for Mobile */}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider border border-dashed transition-all ${
                    pathname === '/admin'
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span>Administrative Control Console</span>
                </Link>
                
                <div className="pt-5 border-t border-slate-100 text-center flex flex-col items-center gap-1 text-[9px] font-mono text-slate-450 text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>80G TAXES EXEMPTION ACTIVE</span>
                  </div>
                  <span>Regd: Indian Trusts Act, 1882 No. HBL-4-00006-2021-22</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
