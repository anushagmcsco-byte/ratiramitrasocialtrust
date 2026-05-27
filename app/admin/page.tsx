'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDonations, BlogPost } from '@/lib/donation-context';
import { FocusArea } from '@/lib/data';
import { 
  Building, BookOpen, Receipt, Sparkles, Plus, Trash2, Edit2, RotateCcw, 
  TrendingUp, Users, Heart, Clipboard, CheckCircle, FileText, Download, Briefcase 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { 
    campaigns, donations, blogs, totalDonationSum,
    addBlogPost, updateBlogPost, deleteBlogPost, resetBlogsToDefault,
    addCampaign, updateCampaign, deleteCampaign, resetCampaignsToDefault
  } = useDonations();

  // Selected administrative tab
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'donations' | 'blogs'>('overview');

  // Notification Banner
  const [notifyMessage, setNotifyMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotifyMessage(msg);
    setTimeout(() => {
      setNotifyMessage(null);
    }, 4000);
  };

  // --- form states for campaign ---
  const [campaignEditingId, setCampaignEditingId] = useState<string | null>(null);
  const [campTitle, setCampTitle] = useState('');
  const [campShortTitle, setCampShortTitle] = useState('');
  const [campDescription, setCampDescription] = useState('');
  const [campTarget, setCampTarget] = useState(300000);
  const [campImpact, setCampImpact] = useState('');
  const [campBulletsText, setCampBulletsText] = useState('');

  // --- form states for blogs ---
  const [blogEditingId, setBlogEditingId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogCategory, setBlogCategory] = useState('Sustainable Agriculture');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('4 min read');

  // Submit/Add campaign
  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitle || !campShortTitle || !campDescription) {
      alert('Please fill out essential title and descriptions.');
      return;
    }

    const bullets = campBulletsText
      .split('\n')
      .map(b => b.trim())
      .filter(b => b.length > 0);

    const defaultBullets = bullets.length ? bullets : ["Empowering local dry sectors", "Delivering physical seed packages", "Evaluating trace balances"];

    if (campaignEditingId) {
      // Edit
      updateCampaign(campaignEditingId, {
        title: campTitle,
        shortTitle: campShortTitle,
        description: campDescription,
        targetGoal: Number(campTarget),
        impactFocus: campImpact || "Ensuring local economic stability",
        bullets: defaultBullets
      });
      showNotification('Campaign credentials updated successfully!');
      setCampaignEditingId(null);
    } else {
      // Add
      const cleanId = campShortTitle.toLowerCase().replace(/[^a-z0-5]/g, '-');
      addCampaign({
        id: cleanId,
        title: campTitle,
        shortTitle: campShortTitle,
        description: campDescription,
        targetGoal: Number(campTarget),
        impactFocus: campImpact || "Ensuring local economic stability",
        bullets: defaultBullets,
        icon: 'Sprout',
        color: 'from-emerald-600 to-teal-600',
        bannerSeed: 'cultivate',
        projects: [
          { name: "Initial Project Assessment", description: "Verifying dry border farms and registering local families.", status: "active" }
        ]
      });
      showNotification('New crowdfunding campaign launched!');
    }

    // Reset Form
    setCampTitle('');
    setCampShortTitle('');
    setCampDescription('');
    setCampTarget(300000);
    setCampImpact('');
    setCampBulletsText('');
  };

  const startEditCampaign = (camp: FocusArea) => {
    setCampaignEditingId(camp.id);
    setCampTitle(camp.title);
    setCampShortTitle(camp.shortTitle);
    setCampDescription(camp.description);
    setCampTarget(camp.targetGoal);
    setCampImpact(camp.impactFocus);
    setCampBulletsText(camp.bullets.join('\n'));
    // Scroll to form
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Submit/Add blog post
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogAuthor || !blogContent || !blogExcerpt) {
      alert('All major text attributes (title, excerpt, content, author) are mandatory.');
      return;
    }

    if (blogEditingId) {
      // Edit
      updateBlogPost(blogEditingId, {
        title: blogTitle,
        author: blogAuthor,
        category: blogCategory,
        excerpt: blogExcerpt,
        content: blogContent,
        readTime: blogReadTime
      });
      showNotification('Blog report published successfully!');
      setBlogEditingId(null);
    } else {
      // Add
      addBlogPost({
        title: blogTitle,
        author: blogAuthor,
        category: blogCategory,
        excerpt: blogExcerpt,
        content: blogContent,
        readTime: blogReadTime,
        image: `https://picsum.photos/seed/${blogTitle.substring(0,4)}/1200/600`,
        published: true
      });
      showNotification('New operational story added to public journal!');
    }

    // Reset Form
    setBlogTitle('');
    setBlogAuthor('');
    setBlogCategory('Sustainable Agriculture');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogReadTime('4 min read');
  };

  const startEditBlog = (post: BlogPost) => {
    setBlogEditingId(post.id);
    setBlogTitle(post.title);
    setBlogAuthor(post.author);
    setBlogCategory(post.category);
    setBlogExcerpt(post.excerpt);
    setBlogContent(post.content);
    setBlogReadTime(post.readTime);
    // Scroll to form
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Derived calculations
  const totalBaseAllocated = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);

  return (
    <div className="min-h-screen bg-[#fbfcfa] pb-20 font-sans text-slate-700">
      
      {/* Banner / Admin Header */}
      <section className="relative overflow-hidden bg-slate-950 py-12 border-b border-slate-800 text-white">
        {/* Background Image with dark elegant overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/institutional-dashboard/1920/400"
            alt="Admin Suite Banner"
            fill
            className="object-cover opacity-15"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-mono tracking-widest font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full uppercase inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3 fill-emerald-400" />
              Sovereign Board Console
            </span>
            <h1 className="text-3xl font-serif font-black tracking-tight leading-none">
              Raita Mitra Admin Suite
            </h1>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Maintain regulatory compliances, manage active crowdsourcing campaigns, compile blog journals, and inspect real-time trace ledger.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { resetCampaignsToDefault(); showNotification('All campaigns restored to defaults.'); }}
              className="border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Campaigns
            </button>
            <button
              onClick={() => { resetBlogsToDefault(); showNotification('Blogs database restored.'); }}
              className="border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Blogs
            </button>
          </div>
        </div>
      </section>

      {/* Floating Notification */}
      <AnimatePresence>
        {notifyMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/100 border border-emerald-500 text-white text-xs px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{notifyMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Responsive Navigation Tabs */}
        <div className="flex border-b border-slate-205 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-emerald-850 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Metrics Overview
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'campaigns'
                ? 'border-emerald-850 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manage Campaigns ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'donations'
                ? 'border-emerald-850 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Donation Ledger ({donations.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'blogs'
                ? 'border-emerald-850 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Blog CMS Manager ({blogs.length})
          </button>
        </div>

        {/* --- TAB CONTENT --- */}
        
        {/* OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-[10px] font-mono text-slate-400 font-black tracking-widest block uppercase">CRUCIAL ALLOCATION SUM</span>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-black font-mono text-slate-900">₹{(totalBaseAllocated + totalDonationSum).toLocaleString('en-IN')}</h3>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-[10px] text-slate-450 leading-relaxed text-slate-400">Pre-loaded campaigns seed funding + simulate test deposits.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-[10px] font-mono text-slate-400 font-black tracking-widest block uppercase">SIMULATED DONATIONS TRACED</span>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-black font-mono text-slate-900">₹{totalDonationSum.toLocaleString('en-IN')}</h3>
                  <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                </div>
                <p className="text-[10px] text-slate-450 leading-relaxed text-slate-400">Total volume deposited directly during current sandbox phase.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-[10px] font-mono text-slate-400 font-black tracking-widest block uppercase">SANDBOX DONATIONS COUNT</span>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-black font-mono text-slate-900">{donations.length} Deposits</h3>
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-[10px] text-slate-450 leading-relaxed text-slate-400">Count of simulated transactions generated securely locally.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-[10px] font-mono text-slate-400 font-black tracking-widest block uppercase">JOURNAL ALIGNMENT FILES</span>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-black font-mono text-slate-900">{blogs.length} Stories</h3>
                  <BookOpen className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-[10px] text-slate-450 leading-relaxed text-slate-400">Active circulars compiled and running live under /blog menu.</p>
              </div>

            </div>

            {/* Explainer section */}
            <div className="bg-emerald-50 text-emerald-950 border border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-emerald-800" />
                <h4 className="font-serif font-black text-sm sm:text-base">Reviewing Sandbox Trace Capabilities</h4>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900/85 leading-relaxed text-justify">
                Raita Mitra Social Trust (R) utilizes decentralized data structures. Every transaction registered using the public &ldquo;Donate Now&ldquo; screen is appended natively to the local records array. You may verify that simulated deposits scale campaign values immediately under <strong>Focus Areas</strong> or the frontend catalogs, showing rigorous compliance trace capabilities in milliseconds!
              </p>
            </div>
          </div>
        )}

        {/* CAMPAIGN MANAGER */}
        {activeTab === 'campaigns' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side campaign lists */}
            <div className="lg:col-span-12 space-y-4">
              
              {/* Card form creator */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                    {campaignEditingId ? `✏️ Adjusting Campaign Details (ID: ${campaignEditingId})` : '🚀 Launch New Crowdfunding Campaign'}
                  </h3>
                  {campaignEditingId && (
                    <button 
                      onClick={() => {
                        setCampaignEditingId(null);
                        setCampTitle('');
                        setCampShortTitle('');
                        setCampDescription('');
                        setCampImpact('');
                        setCampBulletsText('');
                      }} 
                      className="text-xs text-slate-400 underline hover:text-slate-800"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-500 block">Full Campaign Title:</label>
                    <input
                      type="text"
                      value={campTitle}
                      onChange={(e) => setCampTitle(e.target.value)}
                      placeholder="e.g. Traditional Handloom Clusters & Silk Cooperatives"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-500 block">Short Menu Tag Name:</label>
                    <input
                      type="text"
                      value={campShortTitle}
                      onChange={(e) => setCampShortTitle(e.target.value)}
                      placeholder="e.g. Weaving Clusters"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="font-bold text-slate-500 block">Active Campaign Description (Aimed at Sponsoring Crowds):</label>
                    <textarea
                      value={campDescription}
                      onChange={(e) => setCampDescription(e.target.value)}
                      placeholder="Provide comprehensive details on target beneficiaries, direct supplies purchased, and districts touched..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-500 block">Funding Goal Amount (INR ₹):</label>
                    <input
                      type="number"
                      value={campTarget}
                      onChange={(e) => setCampTarget(Number(e.target.value))}
                      placeholder="300000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-500 block">Primary Impact Focus Tagline:</label>
                    <input
                      type="text"
                      value={campImpact}
                      onChange={(e) => setCampImpact(e.target.value)}
                      placeholder="e.g. Guaranteeing wage standards for 150+ female knitters"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="font-bold text-slate-500 block">Target Operations Bullet Points (One per line):</label>
                    <textarea
                      value={campBulletsText}
                      onChange={(e) => setCampBulletsText(e.target.value)}
                      placeholder="Providing high-performance motorized sewing workstations&#10;Onboarding onto state e-craft hubs&#10;Compiling monthly bank files"
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl w-full text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{campaignEditingId ? 'Update Existing Campaign Parameters' : 'Launch New Focus Program Now'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Campaign Table/Entries */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm overflow-x-auto">
                <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 uppercase tracking-wider text-xs font-mono mb-4">Active Crowdsourcing Drives List</h3>
                <table className="w-full text-xs text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <th className="p-3">Program No. / ID</th>
                      <th className="p-3">Title & Area</th>
                      <th className="p-3 font-mono">Simulated Goal (₹)</th>
                      <th className="p-3 font-mono">Raised Volume (₹)</th>
                      <th className="p-3">Impact Focus</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map(camp => (
                      <tr key={camp.id} className="border-b border-slate-55 hover:bg-slate-50/50">
                        <td className="p-3 font-mono text-slate-400">FA-{camp.number} <br /> <span className="text-[10px] text-slate-500 block">({camp.id})</span></td>
                        <td className="p-3 font-bold text-slate-900">
                          {camp.shortTitle}
                          <span className="text-[10px] font-normal text-slate-500 block truncate max-w-[200px]">{camp.title}</span>
                        </td>
                        <td className="p-3 font-mono">₹{camp.targetGoal.toLocaleString('en-IN')}</td>
                        <td className="p-3 font-mono text-emerald-700 font-bold">₹{camp.raisedAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3 truncate max-w-[200px]" title={camp.impactFocus}>{camp.impactFocus}</td>
                        <td className="p-3">
                          <div className="flex gap-1.5 justify-center">
                            <button
                              onClick={() => startEditCampaign(camp)}
                              className="p-1 px-2 border border-slate-200 text-slate-650 hover:bg-slate-100 rounded-md transition-all flex items-center gap-1"
                              title="Modify campaign numbers"
                            >
                              <Edit2 className="h-3 w-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => { if (confirm('Are you absolutely certain? This triggers irreversible changes.')) { deleteCampaign(camp.id); showNotification(`Campaign deleted.`); } }}
                              className="p-1 px-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-md transition-all flex items-center gap-1"
                              title="Archive camp"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* DONATION LEDGER */}
        {activeTab === 'donations' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm overflow-x-auto space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-150 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-mono">Real-Time Crowdfunding Activity Ledger</h3>
                <p className="text-[10px] text-slate-400">Total sandbox donations processed. All tax eligibility calculations evaluated provisionally.</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
                Ledger Yield: ₹{totalDonationSum.toLocaleString('en-IN')} INR
              </span>
            </div>

            {donations.length === 0 ? (
              <div className="py-20 text-center space-y-3 max-w-sm mx-auto">
                <Receipt className="h-8 w-8 text-slate-300 mx-auto animate-pulse" />
                <h4 className="font-bold text-xs text-slate-550">No sandbox donations made yet</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Trigger transactions using the quick donate module located on the top header or services pages.
                </p>
              </div>
            ) : (
              <table className="w-full text-xs text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <th className="p-3 font-mono">Date</th>
                    <th className="p-3">Donor Credentials</th>
                    <th className="p-3">Campaign Allocation</th>
                    <th className="p-3 font-mono">Amount (₹)</th>
                    <th className="p-3 font-mono">80G Reg. Ticket / PAN</th>
                    <th className="p-3 text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(don => (
                    <tr key={don.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="p-3 font-mono text-slate-400">{don.date}</td>
                      <td className="p-3">
                        <strong className="text-slate-900 block font-bold">{don.donorName}</strong>
                        <span className="text-[10px] text-slate-500 block font-mono">{don.donorEmail} • {don.donorPhone}</span>
                      </td>
                      <td className="p-3 font-medium text-slate-700 truncate max-w-[200px]" title={don.campaignTitle}>{don.campaignTitle}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">₹{don.amount.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className="font-mono text-slate-600 block font-bold">{don.receiptNumber}</span>
                        <span className="font-mono text-[9px] text-emerald-700 block bg-emerald-50 max-w-max px-1.5 rounded uppercase mt-0.5 font-bold">PAN: {don.donorPan}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold tracking-tight px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                          Verified Trace
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* BLOGS CMS MANAGER */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            
            {/* Form writing */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                  {blogEditingId ? '✏️ Modify Operational Report' : '✍️ Write & Publish Operational Report'}
                </h3>
                {blogEditingId && (
                  <button 
                    onClick={() => {
                      setBlogEditingId(null);
                      setBlogTitle('');
                      setBlogAuthor('');
                      setBlogCategory('Sustainable Agriculture');
                      setBlogExcerpt('');
                      setBlogContent('');
                      setBlogReadTime('4 min read');
                    }}
                    className="text-xs text-slate-400 underline hover:text-slate-800"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveBlog} className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                
                <div className="space-y-2 md:col-span-2">
                  <label className="font-bold text-slate-500 block">Report / Circular Title:</label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. Free Sanjeevini Camp Outreaches Koppal Sectors"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-500 block">Category Focus:</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none font-bold"
                  >
                    <option value="Sustainable Agriculture">Sustainable Agriculture</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Digital Skills">Digital Skills</option>
                    <option value="Health & Well-being">Health & Well-being</option>
                    <option value="Climate Action">Climate Action</option>
                    <option value="General News">General News</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-500 block">Author Initials & Title:</label>
                  <input
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    placeholder="Dr. Sunita K., General Secretary"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-500 block">Read Time Indicator:</label>
                  <input
                    type="text"
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    placeholder="4 min read"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-50 block text-transparent">Actions</span>
                  <div className="border border-dashed border-slate-200 p-2.5 rounded-xl text-[10px] text-slate-400 font-mono text-center">
                    🖼️ Auto Image Generation Seeded
                  </div>
                </div>

                <div className="space-y-2 md:col-span-3">
                  <label className="font-bold text-slate-500 block">Short Circular Excerpt (Appears on public listings search):</label>
                  <input
                    type="text"
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Summary of this report details in 1-2 concise overview sentences..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 outline-none text-slate-600 font-medium"
                  />
                </div>

                <div className="space-y-2 md:col-span-3">
                  <label className="font-bold text-slate-500 block">Circular Content (Raw text, split double enter for paragraphs):</label>
                  <textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Use standard text. Supporting formatting elements:&#10;## Header Level 2&#10;### Header Level 3&#10;- Bullet Point&#10;> Blockquote highlight statements"
                    rows={8}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-emerald-500 font-serif leading-relaxed text-sm"
                  />
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl w-full text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{blogEditingId ? 'Save & Push Edits Live' : 'Publish Report to Public Chronicle'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List entries */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm overflow-x-auto">
              <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 uppercase tracking-wide text-xs font-mono mb-4">Chronicle Archives CMS</h3>
              <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <th className="p-3 font-mono">Date Published</th>
                    <th className="p-3">Title & Area</th>
                    <th className="p-3">Author Designation</th>
                    <th className="p-3 font-mono">Read Time</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(post => (
                    <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="p-3 font-mono text-slate-400">{post.date}</td>
                      <td className="p-3 font-bold text-slate-900">
                        {post.title}
                        <span className="text-[10px] font-mono text-emerald-800 block uppercase mt-0.5">{post.category}</span>
                      </td>
                      <td className="p-3 font-medium">{post.author}</td>
                      <td className="p-3 font-mono text-slate-450">{post.readTime}</td>
                      <td className="p-3">
                        <div className="flex gap-1.5 justify-center">
                          <button
                            onClick={() => startEditBlog(post)}
                            className="p-1 px-2 border border-slate-200 text-slate-650 hover:bg-slate-100 rounded-md transition-all flex items-center gap-1"
                          >
                            <Edit2 className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => { if (confirm('Are you certain you wish to delete this blog story?')) { deleteBlogPost(post.id); showNotification(`Blog post removed.`); } }}
                            className="p-1 px-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-md transition-all flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
