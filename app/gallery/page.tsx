'use client';

import React, { useState } from 'react';
import { GALLERY_ITEMS, FOCUS_AREAS } from '@/lib/data';
import { Camera, Calendar, Tag, X, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  // Map filters dynamically from active focus categories
  const filters = [
    { value: 'all', label: 'All Activities' },
    ...FOCUS_AREAS.map(c => ({ value: c.id, label: c.shortTitle }))
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <div className="flex-grow bg-slate-50 font-sans pb-16">
      
      {/* Page Banner */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
            Grassroots Proof
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 leading-none">
            Camp Activities Gallery
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Real snapshots from active programs in Hubballi, Dharwad, Haveri, and Koppal districts. We document progress for transparency.
          </p>
        </div>
      </section>

      {/* Main filter select chips bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        <div className="flex flex-wrap gap-1.5 justify-center pb-2 border-b border-slate-150/45">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                activeFilter === f.value
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Photocard content grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center text-slate-400 space-y-2">
              <Camera className="h-10 w-10 mx-auto" />
              <p className="text-sm font-semibold">No active snapshot records listed under this filter.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => {
                const campName = FOCUS_AREAS.find(c => c.id === item.category)?.shortTitle || 'Empowerment';
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedPhoto(item)}
                  >
                    {/* Image Container */}
                    <div className="h-56 bg-slate-100 relative overflow-hidden shrink-0">
                      {/* Referrer-safety is respected directly here with referrerPolicy */}
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                        loading="lazy"
                      />
                      
                      {/* Click overlay feedback */}
                      <span className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white scale-100 font-semibold text-xs gap-1.5">
                        <Eye className="h-4.5 w-4.5 text-white" />
                        Expand Photo View
                      </span>

                      {/* Floating Category Tag */}
                      <span className="absolute bottom-3 left-3 text-[9px] font-bold font-mono text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded shadow-sm uppercase uppercase">
                        {campName}
                      </span>
                    </div>

                    {/* Metadata Card Info */}
                    <div className="p-5 flex-grow space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed text-justify line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border-t border-slate-50 pt-2.5 font-mono">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>Camp Audit Date: {item.date}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Large picture expander modal sheet overlays */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-100 max-w-3xl w-full overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                aria-label="Close view"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[60vh] object-cover bg-slate-100"
              />

              <div className="p-6 space-y-2 text-slate-850">
                <span className="text-[10px] font-mono font-black text-emerald-700 uppercase">
                  {FOCUS_AREAS.find(c => c.id === selectedPhoto.category)?.shortTitle || 'Activity Snapshot'}
                </span>
                <h3 className="text-lg font-black font-serif text-slate-900 leading-tight">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify pr-2">
                  {selectedPhoto.description}
                </p>
                <span className="block text-[10px] font-mono text-slate-400 border-t border-slate-50 pt-3">
                  Documented Camp Reference Area Key: Dharwad/Hubli districts
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
