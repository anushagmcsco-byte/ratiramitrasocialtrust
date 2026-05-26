'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDonations } from '@/lib/donation-context';
import Logo from './logo';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Focus Areas' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const pathname = usePathname();
  const { openModal } = useDonations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-1.5 py-1">
          <Logo className="h-10 sm:h-12" showText={true} />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Donation and Hamburger menu */}
        <div className="flex items-center gap-2.5">
          {/* Quick Donate Button */}
          <button
            onClick={() => openModal()}
            className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-md text-white font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-97 select-none"
          >
            <Heart className="h-4 w-4 fill-white text-emerald-100" />
            <span>Donate Now</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 focus:outline-none md:hidden rounded-lg hover:bg-slate-50"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer sheet using frame permissions style animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 pt-2.5 pb-6 space-y-1.5 shadow-inner">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-semibold p-3 rounded-xl transition-all ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50/75 pl-4'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:pl-4'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-slate-100 text-center flex flex-col items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <Sparkles className="h-3 w-3" />
                  <span>80G Taxes Exemption Provisional Active</span>
                </div>
                <span>Regd: Indian Trusts Act, 1882 No. HBL-4-00006-2021-22</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
