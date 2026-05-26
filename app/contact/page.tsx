'use client';

import React, { useState } from 'react';
import { CONTACT_INFO, LEGAL_COMPLIANCE } from '@/lib/data';
import { 
  Mail, Phone, MapPin, Landmark, Clock, Send, CheckCircle2, AlertCircle, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    setLoading(true);
    // Simulate API storage delay
    setTimeout(() => {
      setTicketId(Math.floor(2000 + Math.random() * 8000).toString());
      setSubmitted(true);
      setLoading(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="flex-grow bg-slate-50 font-sans pb-16">
      
      {/* Page Banner */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
            Official Touchpoint
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 leading-none">
            Get in Touch With Trustees
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Have questions about CSR eligibility, 80G tax exemptions, or site evaluations? Write to us or call our Hubballi registered office directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Contact Form Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2">
              Corporate Correspondence Desk
            </h2>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-emerald-500/[0.03] border border-emerald-600/15 rounded-xl text-center space-y-3"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h3 className="font-extrabold text-sm text-emerald-950">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    Your correspondence has been received under ticket number RMST-{ticketId}. Our trustees evaluate correspondence cycles within 24 to 48 working hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-emerald-700 font-bold hover:underline"
                  >
                    Submit another question
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anand Gowda"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-sm outline-none px-4 py-2.5 rounded-lg focus:border-emerald-500 transition-all text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Email Coordinates *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. anand@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-sm outline-none px-4 py-2.5 rounded-lg focus:border-emerald-500 transition-all text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 80G Tax Invoice inquiry / CSR Audit"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-sm outline-none px-4 py-2.5 rounded-lg focus:border-emerald-500 transition-all text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Detailed Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Detail your question here..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-sm outline-none px-4 py-2.5 rounded-lg focus:border-emerald-500 transition-all text-slate-800 text-justify"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold w-full py-3 rounded-lg text-xs tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-all select-none"
                  >
                    {loading ? "Transmitting..." : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Secure Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Vector Map Grid to prevent sandbox errors */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office Location Map</h3>
            
            <div className="h-64 bg-emerald-50 rounded-xl relative border border-slate-150 overflow-hidden flex flex-col justify-between">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-[0.14]">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="border-r border-b border-slate-900"></div>
                ))}
              </div>

              {/* Simulated Gokul Road Highways path */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
                <path d="M0 45 Q 50 40 100 50" stroke="#047857" strokeWidth="8" fill="none" />
                <path d="M40 0 L 50 100" stroke="#047857" strokeWidth="5" fill="none" />
                <path d="M10 10 Q 70 80 90 90" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="2" />
              </svg>

              {/* Office pin bubble */}
              <div className="absolute top-[42%] left-[45%] flex flex-col items-center">
                <div className="bg-slate-950 text-white text-[9px] font-bold font-mono px-2 py-1 rounded shadow-md border border-slate-800 whitespace-nowrap">
                  📍 RAITA MITRA PRIDE ICON
                </div>
                <div className="h-3 w-0.5 bg-slate-950"></div>
              </div>

              <div className="p-4 bg-slate-950/90 text-white space-y-1 relative z-10 mx-4 mt-4 rounded-lg border border-slate-850">
                <h4 className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Registered Headquarters</h4>
                <p className="text-[11px] font-semibold text-slate-100">PRIDE ICON • Gokul Road hub</p>
                <p className="text-[10px] text-slate-400 font-mono">Latitude: 15.3524° N • Longitude: 75.1245° E • Hubli-Dharwad</p>
              </div>

              <div className="p-3 bg-white border-t border-slate-150 text-[10px] text-slate-505 font-medium relative z-10 flex justify-between items-center px-4 bg-white">
                <span>📍 Gokul Road Metro/Bus Terminal is adjacent (5 mins walk)</span>
                <span className="text-emerald-700 font-bold font-mono text-[9px]">G-ROAD EXIT SECTOR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Coordinates Details Panels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main info parameters card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-250 pb-3 border-b border-white/10">
              Registration & Office Detail
            </h3>

            <ul className="space-y-4 text-xs">
              <li className="flex gap-3.5 items-start">
                <MapPin className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed">
                  <strong className="text-slate-200 block">Registered Office</strong>
                  <span className="text-slate-400 block text-justify">{CONTACT_INFO.address}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Operational Area: Karnataka State</span>
                </div>
              </li>

              <li className="flex gap-3.5 items-start">
                <Phone className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed">
                  <strong className="text-slate-200 block">Active Helpline Channels</strong>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-slate-350 hover:text-emerald-400 font-mono block text-sm font-bold">
                    {CONTACT_INFO.phone}
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono">Mon to Sat: 10:00 AM to 6:00 PM</span>
                </div>
              </li>

              <li className="flex gap-3.5 items-start">
                <Mail className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed">
                  <strong className="text-slate-200 block">Electronic Mailing</strong>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-350 hover:text-emerald-400 font-mono block break-all font-bold">
                    {CONTACT_INFO.email}
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono">Corporate & CSR communication desk</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick AI Advisor Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 border border-slate-150 rounded-2xl p-6 text-slate-800 space-y-4">
            <div className="flex gap-2.5 items-center">
              <div className="p-1.5 bg-emerald-600/10 rounded-lg">
                <MessageSquare className="h-5 w-5 text-emerald-700 animate-pulse" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Need Immediate Audit Assistance?</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              You can query our grounded **Smart Mitra** AI Counselor immediately by clicking the messenger icon floating in the lower-right of the screen! Our agent is active 24/7 to answer compliance, registration, operational districts, and section 80G tax benefit parameters instantly.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
