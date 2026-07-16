/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { X, Search, Sparkles, Droplets, Landmark } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchModal({ onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lc = query.toLowerCase();
    return PRODUCTS.filter(p => {
      const matchName = p.name.toLowerCase().includes(lc);
      const matchTag = p.tagline.toLowerCase().includes(lc);
      const matchDesc = p.description.toLowerCase().includes(lc);
      const matchNotes = [
        ...p.scentNotes.top,
        ...p.scentNotes.heart,
        ...p.scentNotes.base
      ].some(note => note.toLowerCase().includes(lc));
      const matchIngredients = p.keyIngredients.some(
        ing => ing.name.toLowerCase().includes(lc) || ing.description.toLowerCase().includes(lc)
      );

      return matchName || matchTag || matchDesc || matchNotes || matchIngredients;
    });
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-12 overflow-hidden">
      {/* Dark tint backdrop */}
      <motion.div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative bg-brand-light text-brand-dark rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-100 mt-10 md:mt-20 flex flex-col justify-between max-h-[70vh]"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Search header with close */}
        <div className="flex items-center gap-3 border-b border-neutral-100 pb-4 mb-4">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search scent notes, ingredients or variants..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-neutral-800 text-sm font-sans placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-brand-dark transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic results area */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div className="space-y-4 py-4">
              <span className="font-sans text-[10px] tracking-wider text-neutral-400 uppercase font-semibold block mb-2">
                Recommended Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Honey & Shea', 'Pure Clarity', 'Mandarin', 'Lavender', 'pH optimal', 'Glycerin'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-white/50 hover:bg-white text-xs text-neutral-600 px-3.5 py-1.5 rounded-full border border-neutral-200/50 cursor-pointer transition-colors font-sans"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-neutral-400 font-sans">
              <p className="text-sm">No formulations match "{query}"</p>
              <p className="text-[11px] font-light max-w-xs mx-auto">
                Try searching for botanical notes like "mandarin", "lavender", "mint", or clinical keywords like "hydration".
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="font-sans text-[10px] tracking-wider text-neutral-400 uppercase font-semibold block mb-2">
                Found Formulations ({results.length})
              </span>
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="w-full text-left bg-white p-3.5 rounded-xl border border-neutral-100 hover:border-brand-dark hover:shadow-sm cursor-pointer transition-all flex gap-3 items-center group"
                >
                  <div className={`w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center p-0.5 relative shrink-0 ${p.accentClass}`}>
                    <img src={p.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    {p.id === 'crystal-clarity' && (
                      <img src={p.image} className="w-8 h-8 object-contain relative animate-float select-none" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-sans text-[10px] tracking-wider uppercase text-neutral-400 font-semibold block">
                      {p.subtitle}
                    </span>
                    <span className="font-sans text-xs font-semibold text-neutral-800 block group-hover:text-brand-dark">
                      {p.name}
                    </span>
                    <span className="font-sans text-[10px] text-neutral-400 block truncate font-light mt-0.5">
                      {p.tagline}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
