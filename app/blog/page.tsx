'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDonations } from '@/lib/donation-context';
import { Search, Calendar, User, Clock, ArrowRight, Tag, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = ["All", "Sustainable Agriculture", "Women Empowerment", "Digital Skills", "Health & Well-being", "Climate Action"];

export default function BlogListingPage() {
  const { blogs } = useDonations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter published blogs
  const publishedBlogs = blogs.filter(b => b.published !== false);

  const filteredBlogs = publishedBlogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredBlogs[0];
  const regularPosts = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-[#fbfcfa] pb-20 font-sans">
      
      {/* Banner/Header */}
      <section className="relative overflow-hidden bg-slate-900 py-16 border-b border-slate-100 text-center">
        {/* Background Image with dark elegant overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/trust-operations-journal/1920/400"
            alt="Chronicle Journal Banner"
            fill
            className="object-cover opacity-25"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-900/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-[10px] font-mono tracking-widest font-extrabold text-emerald-300 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-full uppercase inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3 fill-emerald-300" />
            Trust Operations Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            The Raita Mitra Chronicle
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Official field reports, programmatic blueprints, and grassroot milestone reviews directly under our charitable charge in Karnataka.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Search and Category Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports or field stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>

          {/* Categories Pill Grid */}
          <div className="flex flex-wrap gap-1.5 justify-center w-full md:w-auto">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-all uppercase select-none cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
                }`}
              >
                {category === 'All' ? 'All Areas' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state conditional */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center space-y-4 max-w-md mx-auto">
            <div className="p-3 bg-slate-100 rounded-2xl inline-block">
              <BookOpen className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm">No Publications Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No articles match the criteria &ldquo;{searchQuery}&rdquo; in the selected sector. Try shifting filters or resetting.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Post (Big Card) */}
            {featuredPost && !searchQuery && selectedCategory === 'All' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-350"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 relative h-64 sm:h-96 w-full bg-slate-100">
                    <Image
                      src={featuredPost.image || "https://picsum.photos/seed/trust/1200/600"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-800 text-white font-mono text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Featured Report
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                        <span>{featuredPost.category}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black tracking-tight text-slate-900 leading-tight">
                        <Link href={`/blog/${featuredPost.id}`} className="hover:text-emerald-900 transition-colors">
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-slate-500 text-xs sm:text-sm text-justify leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-50 rounded-xl">
                          <User className="h-4 w-4 text-emerald-800" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-800 block leading-none">{featuredPost.author}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                            {new Date(featuredPost.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.id}`}
                        className="p-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-all shadow-xs group cursor-pointer"
                      >
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchQuery || selectedCategory !== 'All' ? filteredBlogs : regularPosts).map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-200 duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover image banner */}
                    <div className="relative h-48 w-full bg-slate-150">
                      <Image
                        src={post.image || `https://picsum.photos/seed/mitra-${post.id}/800/600`}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-slate-900/85 backdrop-blur-xs text-white font-mono text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Meta info & content */}
                    <div className="p-5 space-y-3.5">
                      <div className="flex items-center gap-2.5 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-800 block line-clamp-2 leading-snug group-hover:text-emerald-900 transition-colors">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-slate-500 text-xs line-clamp-3 text-justify leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card footer block */}
                  <div className="p-5 border-t border-slate-50 mt-auto flex items-center justify-between shrink-0">
                    <span className="text-[10px] text-slate-400 italic font-medium truncate max-w-[150px]">
                      By {post.author.split(',')[0]}
                    </span>

                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-xs font-black text-emerald-800 group-hover:text-emerald-950 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Read Report
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        )}

        {/* Newsletter widget */}
        <section className="bg-emerald-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-800/20 relative overflow-hidden flex flex-col items-center text-center space-y-6">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-800/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-850/10 rounded-full blur-3xl"></div>

          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif font-black text-xl sm:text-2xl tracking-tight leading-none">
              Receive Trustees Monthly Circulars
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-md mx-auto">
              Get detailed report sheets, expense balance drafts, and newly active community focus campaigns directly in your box. No marketing spill.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('We have subscribed you! Circular updates will follow.'); }} className="w-full max-w-md flex flex-col sm:flex-row gap-2.5 relative z-10">
            <input
              type="email"
              placeholder="Your professional email id..."
              required
              className="flex-1 px-4 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-white placeholder-emerald-100/40 font-medium"
            />
            <button
              type="submit"
              className="bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs py-2.5 px-6 rounded-xl tracking-wider uppercase transition-all duration-200 hover:shadow-md cursor-pointer"
            >
              Join Gazette
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
