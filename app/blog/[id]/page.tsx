'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDonations } from '@/lib/donation-context';
import { ArrowLeft, User, Calendar, Clock, Tag, Share2, CornerDownRight, Sprout, Heart, Users, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { blogs } = useDonations();
  const resolvedParams = React.use(params);
  const post = blogs.find(b => b.id === resolvedParams.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fbfcfa] flex items-center justify-center p-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center max-w-md w-full space-y-5 shadow-sm">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <User className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-serif font-black text-slate-905">Article Not Found</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              The editorial circular or field report you are seeking does not exist or has been archived by the trust trustees.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Chronicle
          </Link>
        </div>
      </div>
    );
  }

  // Parse custom text to paragraphs, checklists, and headings
  const renderParagraphs = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4" />;

      // Header h3
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm sm:text-base font-bold text-slate-900 font-sans tracking-tight mt-6 mb-2">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }
      // Header h2
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-extrabold text-slate-900 font-sans tracking-tight mt-8 mb-3">
            {trimmed.replace('## ', '')}
          </h3>
        );
      }
      // List element
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2.5 pl-4 py-1 text-slate-650 text-xs sm:text-sm leading-relaxed text-justify">
            <CornerDownRight className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
            <span>{trimmed.substring(2)}</span>
          </div>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-emerald-800 bg-emerald-500/[0.03] p-4 my-6 rounded-r-xl italic text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-serif">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify font-sans text-slate-600 my-4 space-y-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article className="min-h-screen bg-[#fbfcfa] pb-20 font-sans">
      
      {/* Dynamic Cover Hero */}
      <section className="relative w-full h-64 sm:h-[420px] bg-slate-900 overflow-hidden">
        <Image
          src={post.image || "https://picsum.photos/seed/trust-cover/1200/600"}
          alt={post.title}
          fill
          className="object-cover opacity-85"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-905/70 to-transparent"></div>
        
        {/* Absolute floating controls */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 select-none px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Chronical Hub</span>
          </Link>
        </div>

        {/* Hero Meta inside the Cover */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-10">
          <div className="max-w-4xl mx-auto px-4 space-y-3">
            <span className="bg-emerald-800 text-white font-mono text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md inline-block">
              {post.category}
            </span>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight leading-snug">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-300 font-mono font-medium pt-1 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-emerald-400" />
                {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-400" />
                {post.readTime}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-emerald-400" />
                Authored by {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main post columns wrapper */}
      <div className="max-w-5xl mx-auto px-4 mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left main content col */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-10 shadow-xs">
          
          {/* Excerpt panel */}
          <div className="border-b border-slate-100 pb-5 mb-6 text-xs sm:text-sm font-medium text-slate-500 text-justify leading-relaxed italic">
            &ldquo;{post.excerpt}&rdquo;
          </div>

          {/* Formatted content paragraphs */}
          <div className="space-y-1.5 text-slate-700">
            {renderParagraphs(post.content)}
          </div>

          {/* Share widget */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">TRACE INTEGRITY VERIFIED</span>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Article URL copied to clipboard!'); }}
              className="flex items-center gap-1 text-xs font-bold text-slate-650 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Circular</span>
            </button>
          </div>
        </div>

        {/* Right sidebar column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Trust identity badge */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-xs">
            <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-50 pb-2">Institutional Author</h4>
            <div className="flex gap-3 items-center">
              <div className="p-3 bg-emerald-50/50 border border-emerald-100/30 rounded-xl shrink-0">
                <User className="h-5 w-5 text-emerald-800" />
              </div>
              <div className="text-left space-y-0.5 min-w-0">
                <strong className="text-xs font-bold text-slate-800 block truncate">{post.author.split(',')[0]}</strong>
                <span className="text-[10px] text-slate-450 font-mono block truncate">{post.author.split(',').slice(1).join(',') || 'Mitra Trustee Board'}</span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-450 text-slate-400 text-justify">
              This circular constitutes official publications validated by the board of trustees of Raita Mitra Social Trust (R), Hubballi.
            </p>
          </div>

          {/* Urgent appeal card */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 space-y-5 shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-800/20 rounded-full blur-2xl"></div>
            <div className="space-y-1.5">
              <span className="text-[8px] font-mono font-extrabold text-emerald-300 tracking-widest uppercase bg-emerald-800/50 px-2 py-0.5 rounded">COMMUNITY PLEDGE</span>
              <h3 className="font-serif font-black text-sm sm:text-base leading-none tracking-tight text-white mt-1">
                Support Active Grassroots Crowdfunding
              </h3>
            </div>
            
            <p className="text-[11px] leading-relaxed text-emerald-100/70 text-justify">
              Each blog story maps directly to an active physical campaign. Sponsoring assets guarantees 100% micro-allocated trace efficiency.
            </p>

            <Link
              href="/services"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl block text-center tracking-wide transition-all shadow-sm select-none cursor-pointer"
            >
              Browse Active Focus Programs
            </Link>
          </div>

        </div>

      </div>

    </article>
  );
}
