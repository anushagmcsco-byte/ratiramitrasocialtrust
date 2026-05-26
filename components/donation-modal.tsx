'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDonations, DonationRecord } from '@/lib/donation-context';
import { FocusArea, LEGAL_COMPLIANCE } from '@/lib/data';
import { 
  X, Heart, BookOpen, Receipt, FileText, CheckCircle2, 
  Sparkles, CreditCard, ShieldCheck, Download, Loader2, ArrowRight, ArrowLeft
} from 'lucide-react';

export default function DonationModal() {
  const { campaigns, isModalOpen, selectedCampaignId, closeModal, addDonation } = useDonations();
  
  const [step, setStep] = useState(1); // 1: Amount, 2: Info, 3: Payment, 4: Success
  const [campaignId, setCampaignId] = useState('');
  const [amount, setAmount] = useState('2000');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // States for processing / result
  const [isProcessing, setIsProcessing] = useState(false);
  const [newDonation, setNewDonation] = useState<DonationRecord | null>(null);
  const [geminiLetter, setGeminiLetter] = useState('');
  const [isLoadingLetter, setIsLoadingLetter] = useState(false);

  // Sync selected campaign when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const targetId = selectedCampaignId || (campaigns[0]?.id ?? '');
      setCampaignId(prev => prev !== targetId ? targetId : prev);
      setStep(prev => prev !== 1 ? 1 : prev);
      setGeminiLetter(prev => prev !== '' ? '' : prev);
      setNewDonation(prev => prev !== null ? null : prev);
    }
  }, [isModalOpen, selectedCampaignId, campaigns]);

  const activeCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  const presets = [
    { value: '500', label: '₹500', impact: 'Distributes climate-resilient organic seeds to 1 farming family' },
    { value: '2000', label: '₹2,000', impact: 'Equips 1 rural woman with a sewing kit & vocational toolkit' },
    { value: '5000', label: '₹5,000', impact: 'Deploys 1 micro-computer and AI syllabus to a village lab' },
    { value: '10000', label: '₹10,000', impact: 'Funds a mobile health camp to evaluate 30 village children' },
  ];

  const handleNext = () => {
    if (step === 1 && (!amount || isNaN(Number(amount)) || Number(amount) <= 0)) {
      alert("Please enter a valid amount to donate.");
      return;
    }
    if (step === 2) {
      if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
        alert("Please complete name, email, and phone fields.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(donorEmail)) {
        alert("Please enter a valid email address.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleDonateSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate transaction clearing (gives absolute credit authenticity)
    await new Promise(resolve => setTimeout(resolve, 2200));
    
    const record = addDonation(
      campaignId,
      Number(amount),
      donorName,
      donorEmail,
      donorPhone,
      donorPan
    );
    
    setNewDonation(record);
    setIsProcessing(false);
    setStep(4);

    // Dynamic AI personalized receipt letter fetch from Server-Side Gemini Route
    setIsLoadingLetter(true);
    try {
      const resp = await fetch('/app/api/gemini/thank-you', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          donorName,
          campaignTitle: activeCampaign?.title || "Empowerment General Fund",
          amount: Number(amount)
        })
      });
      const data = await resp.json();
      setGeminiLetter(data.text);
    } catch (e) {
      console.error(e);
      setGeminiLetter(`Dear ${donorName},\n\nThank you for supporting ${activeCampaign?.title || "Raita Mitra Social Trust (R)"}. Your valuable support enables local farming cooperatives and communities in Karnataka to construct autonomous, healthy livelihoods.\n\nWarmly,\nRaita Mitra Board of Trustees`);
    } finally {
      setIsLoadingLetter(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-8 print:p-0 print:shadow-none print:border-none print:my-0"
      >
        {/* Banner header strip */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-5 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-amber-300 fill-amber-300" />
            <div>
              <h2 className="font-bold text-lg tracking-tight">Support Raita Mitra Social Trust</h2>
              <p className="text-xs text-emerald-100 font-sans">100% Grassroots Impact • 80G Tax Deductible (Regd.)</p>
            </div>
          </div>
          <button 
            onClick={closeModal} 
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close portal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps visual Indicator */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-400 print:hidden">
            <span className={step >= 1 ? "text-emerald-600 font-bold" : ""}>1. Objective & Amount</span>
            <span className="text-slate-300">/</span>
            <span className={step >= 2 ? "text-emerald-600 font-bold" : ""}>2. Donor Profile</span>
            <span className="text-slate-300">/</span>
            <span className={step >= 3 ? "text-emerald-600 font-bold" : ""}>3. Simulate Payment</span>
          </div>
        )}

        <div className="p-6 overflow-y-auto max-h-[70vh] flex-1">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">Validating Payment Gateway...</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">Interfacing with secure bank UPI switches. Please do not close or reload this dialog box.</p>
            </div>
          ) : (
            <>
              {/* STEP 1: CAMPAIGN & AMOUNT */}
              {step === 1 && (
                <div className="space-y-5 print:hidden">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Choose campaign objective
                    </label>
                    <select
                      value={campaignId}
                      onChange={e => setCampaignId(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:bg-white text-sm transition-all"
                    >
                      {campaigns.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.title} (Goal: ₹{(c.targetGoal).toLocaleString('en-IN')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Amount (INR)
                      </label>
                      <span className="text-xs text-slate-400 bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                        50% 80G benefit eligible
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {presets.map(item => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setAmount(item.value)}
                          className={`border rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition-all ${
                            amount === item.value
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-sans text-lg">₹</span>
                      <input
                        type="number"
                        placeholder="Enter other custom sum"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-200 focus:border-emerald-500 focus:bg-white text-lg font-bold outline-none pl-8 pr-4 py-3.5 rounded-xl transition-all"
                      />
                    </div>

                    {/* Show dynamic micro-impact statement! */}
                    {activeCampaign && (
                      <div className="mt-4 p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div className="text-xs leading-relaxed text-slate-600">
                          <span className="font-bold text-slate-800 block mb-0.5">Grassroots Impact Translation:</span>
                          {presets.find(p => p.value === amount)?.impact || `Sponsors customizable farm wellness campaigns, seed stocks, self-help kits, and training camps across districts of Karnataka.`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: DONOR REGISTRY */}
              {step === 2 && (
                <div className="space-y-4 print:hidden">
                  <div className="p-3 bg-amber-50 border border-amber-100 text-[11px] leading-relaxed text-amber-800 rounded-xl flex gap-2">
                    <Receipt className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block">Why do we need this profile?</span>
                      Raita Mitra Social Trust is approved under the Ministry of Finance. Indian taxpayers can secure 50% income-tax credits under Section 80G. Please ensure information matches your tax filing name.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anil Kumar"
                        value={donorName}
                        onChange={e => setDonorName(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white text-sm px-4 py-3 rounded-xl transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Email Coordinates *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. anil@example.com"
                        value={donorEmail}
                        onChange={e => setDonorEmail(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white text-sm px-4 py-3 rounded-xl transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 9845012345"
                        value={donorPhone}
                        onChange={e => setDonorPhone(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white text-sm px-4 py-3 rounded-xl transition-all"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          PAN Card Number
                        </label>
                        <span className="text-[10px] text-slate-400 font-sans">(For section 80G receipts)</span>
                      </div>
                      <input
                        type="text"
                        placeholder="ABCPA1234Z"
                        value={donorPan}
                        onChange={e => setDonorPan(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white text-sm px-4 py-3 rounded-xl transition-all uppercase"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {donorPan && donorPan.length === 10 && (
                    <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-medium">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        Estimated 80G Tax Exemption Credit:
                      </span>
                      <span className="text-base font-bold text-emerald-700">₹{(Number(amount) / 2).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: PAYMENT GATEWAY SIMULATOR */}
              {step === 3 && (
                <div className="space-y-5 print:hidden">
                  <div className="border border-slate-100 rounded-xl overflow-hidden flex">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 py-3 text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === 'upi'
                          ? 'bg-emerald-50 text-emerald-800 font-bold border-b-2 border-emerald-600'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-b border-transparent'
                      }`}
                    >
                      UPI / Scan QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-3 text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === 'card'
                          ? 'bg-emerald-50 text-emerald-800 font-bold border-b-2 border-emerald-600'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-b border-transparent'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      Deb/Cred Card
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex flex-col items-center">
                    {paymentMethod === 'upi' ? (
                      <div className="text-center space-y-3">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                          Scan to simulate direct donation
                        </p>
                        
                        {/* Custom Dynamic Simulated QR Core representing actual UPI codes */}
                        <div className="bg-white p-3 border border-slate-200 rounded-xl inline-block shadow-sm">
                          <svg
                            viewBox="0 0 120 120"
                            className="h-32 w-32 mx-auto"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="120" height="120" fill="white" />
                            {/* Inner QR mock blocks */}
                            <rect x="10" y="10" width="25" height="25" fill="#000" />
                            <rect x="15" y="15" width="15" height="15" fill="#fff" />
                            <rect x="18" y="18" width="9" height="9" fill="#000" />

                            <rect x="85" y="10" width="25" height="25" fill="#000" />
                            <rect x="90" y="15" width="15" height="15" fill="#fff" />
                            <rect x="93" y="93" width="9" height="9" fill="#000" />

                            <rect x="10" y="85" width="25" height="25" fill="#000" />
                            <rect x="15" y="90" width="15" height="15" fill="#fff" />
                            <rect x="18" y="93" width="9" height="9" fill="#000" />

                            {/* Center Logo marker */}
                            <path d="M50 45 L60 30 L70 45 L60 65 Z" fill="#059669" />
                            <circle cx="60" cy="55" r="4" fill="#f59e0b" />

                            {/* Scattered barcode dots */}
                            <rect x="45" y="10" width="5" height="10" fill="#000" />
                            <rect x="60" y="15" width="15" height="5" fill="#000" />
                            <rect x="40" y="30" width="5" height="5" fill="#000" />
                            <rect x="75" y="30" width="5" height="5" fill="#000" />
                            <rect x="10" y="45" width="15" height="5" fill="#000" />
                            <rect x="100" y="45" width="10" height="10" fill="#000" />
                            <rect x="45" y="70" width="20" height="5" fill="#000" />
                            <rect x="70" y="60" width="5" height="15" fill="#000" />
                            <rect x="85" y="70" width="10" height="10" fill="#000" />
                            <rect x="45" y="85" width="10" height="10" fill="#000" />
                            <rect x="45" y="100" width="25" height="5" fill="#000" />
                            <rect x="80" y="95" width="10" height="5" fill="#000" />
                            <rect x="95" y="85" width="5" height="15" fill="#000" />
                          </svg>
                        </div>

                        <p className="text-sm font-bold text-slate-800">UPI ID: raitamitra@okhdfc</p>
                        <p className="text-[10px] text-slate-400 font-serif leading-relaxed px-6">
                          Since this is a simulated workspace environment on Cloud Run, scanning the QR will trigger a payment success state immediately when you click &quot;Validate Payment&quot; below.
                        </p>
                      </div>
                    ) : (
                      <div className="w-full space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="4123 4567 8901 2345"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            className="w-full bg-white text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 text-sm px-4 py-2.5 rounded-lg font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={e => setCardExpiry(e.target.value)}
                              className="w-full bg-white text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 text-sm px-4 py-2.5 rounded-lg font-mono text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              CVV Code
                            </label>
                            <input
                              type="password"
                              placeholder="***"
                              value={cardCvv}
                              onChange={e => setCardCvv(e.target.value)}
                              maxLength={3}
                              className="w-full bg-white text-slate-800 border border-slate-200 outline-none focus:border-emerald-500 text-sm px-4 py-2.5 rounded-lg font-mono text-center"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Secure SSL Encrypted Connection is established. No real money will be charged.</span>
                  </div>
                </div>
              )}

              {/* STEP 4: SUCCESS CERTIFICATE */}
              {step === 4 && newDonation && (
                <div className="space-y-6">
                  {/* Banner Ribbon */}
                  <div className="text-center space-y-2 py-4 border-b border-slate-100 print:hidden">
                    <div className="inline-flex h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 items-center justify-center mb-1">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Blessings and Thanks!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Your transaction cleared successfully. An automated 80G tax invoice certificate has been compiled.
                    </p>
                  </div>

                  {/* Printable certificate layout */}
                  <div className="border-[6px] border-double border-emerald-600/60 p-6 sm:p-8 bg-emerald-50/20 rounded-xl relative overflow-hidden print:border-none print:p-0 print:bg-white">
                    {/* Watermark Leaf SVG background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                      <Heart className="h-80 w-80 text-emerald-700" />
                    </div>

                    <div className="relative space-y-4 font-serif text-slate-800">
                      {/* Trust Logo and Header */}
                      <div className="text-center pb-4 border-b border-slate-200/50">
                        <h4 className="font-extrabold font-serif text-base tracking-wider text-emerald-800 text-center flex items-center justify-center gap-1">
                          RAITA MITRA SOCIAL TRUST (R)
                        </h4>
                        <p className="font-sans text-[10px] text-slate-600 uppercase tracking-widest text-center mt-0.5">
                          Registered Public Charitable Trust • Hubballi, Karnataka, India
                        </p>
                        <p className="font-mono text-[9px] text-slate-500 text-center mt-1">
                          Reg No: {LEGAL_COMPLIANCE.registrationNo} • PAN: {LEGAL_COMPLIANCE.pan}
                        </p>
                      </div>

                      {/* Certificate Text details */}
                      <div className="text-center space-y-3 py-2">
                        <span className="font-sans text-[11px] font-bold tracking-widest text-amber-600 uppercase block">
                          CERTIFICATE OF THANKSGIVING & 80G RECEIPT
                        </span>
                        <p className="text-sm font-sans leading-relaxed text-slate-700">
                          We proudly present this certificate to:
                          <strong className="block text-lg font-serif font-extrabold text-slate-900 mt-1 mb-2">
                            {newDonation.donorName}
                          </strong>
                          for the generous donation of
                          <strong className="block text-2xl font-serif font-black text-emerald-700 mt-1 mb-2">
                            ₹{newDonation.amount.toLocaleString('en-IN')}.00
                          </strong>
                          contributed towards the campaign:
                          <span className="block italic text-sm text-slate-800 font-bold mt-1">
                            {newDonation.campaignTitle}
                          </span>
                        </p>
                      </div>

                      {/* Receipts Metadata layout */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-white border border-slate-100 rounded-lg p-3 text-slate-600 shadow-sm print:shadow-none print:border-slate-300">
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Receipt Reference Code</span>
                          <span className="font-mono text-slate-800 font-bold">{newDonation.receiptNumber}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Donation Timestamp</span>
                          <span className="font-semibold text-slate-800">{newDonation.date}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Donor Tax reference (PAN)</span>
                          <span className="font-mono text-slate-850 font-bold uppercase">{newDonation.donorPan || 'Not Specified'}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Tax Rebate Under 80G</span>
                          <span className="font-bold text-emerald-700">₹{(newDonation.amount / 2).toLocaleString('en-IN')} (50% Deduction)</span>
                        </div>
                      </div>

                      {/* Personal AI letter Section */}
                      <div className="pt-4 border-t border-slate-200/50">
                        <h5 className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1 print:hidden">
                          <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                          Heartfelt letter from Trustees (Personalized via AI)
                        </h5>
                        
                        {isLoadingLetter ? (
                          <div className="flex items-center gap-2 py-4 text-xs text-slate-400 font-sans italic print:hidden">
                            <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                            <span>Personalizing letters with Karnataka blessings from our AI engine...</span>
                          </div>
                        ) : (
                          <div className="bg-emerald-500/5 border border-emerald-600/10 rounded-xl px-4 py-3 text-xs leading-relaxed text-slate-700 font-serif italic whitespace-pre-line shadow-xs">
                            {geminiLetter}
                          </div>
                        )}
                      </div>

                      {/* Verification signs block */}
                      <div className="flex justify-between items-center text-xs font-sans pt-6 border-t border-slate-100">
                        <div className="text-left">
                          <span className="block font-mono text-[9px] text-slate-400 uppercase">Approved Authority</span>
                          <strong className="block text-slate-800 font-semibold uppercase mt-0.5">Ministry of Finance</strong>
                          <span className="text-[9px] text-slate-500">80G Approval Valid till FY27</span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="block font-mono text-[9px] text-slate-400 uppercase">Trustee Signature</span>
                          <div className="h-8 w-24 border-b border-slate-300 font-serif text-emerald-800 flex items-center justify-center italic text-sm select-none font-bold">
                            Anusha G. M.
                          </div>
                          <span className="text-[8px] text-slate-400">Raita Mitra Social Trust (R)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PDF Download options etc */}
                  <div className="flex flex-col sm:flex-row gap-2.5 print:hidden">
                    <button
                      onClick={handlePrintReceipt}
                      className="flex-1 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Print Certificate / Save PDF
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center"
                    >
                      Continue Supporting Website
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions for step pacing */}
        {step < 4 && !isProcessing && (
          <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center print:hidden">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-slate-500 hover:text-slate-800 px-4 py-2 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Return Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">Step 1 of 3</span>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all shadow-md flex items-center gap-1.5"
              >
                Continue Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDonateSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-md"
              >
                Validate simulated payment (₹{(Number(amount)).toLocaleString('en-IN')})
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
