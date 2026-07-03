/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Sparkles, Leaf, Droplet, Facebook, Instagram, ChevronDown } from 'lucide-react';

interface BrandIntroProps {
  hidePillars?: boolean;
}

export default function BrandIntro({ hidePillars = false }: BrandIntroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section 
      id="brand-intro-section" 
      className="min-h-fit w-full flex items-center justify-center pt-24 pb-8 md:pt-36 md:pb-10 bg-[#FAF8F5] text-[#2D3A2F] relative overflow-hidden font-sans border-b border-[#E5DEC1]/30"
    >
      {/* Background Soft Organic Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E5DEC1]/10 rounded-full blur-3xl pointer-events-none animate-slow-pan" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#EAD9EC]/8 animate-float rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Typographic Hook and Brand Philosophy Editorial */}
          <motion.div 
            variants={itemVariants} 
            className={`${hidePillars ? 'lg:col-span-12 w-full' : 'lg:col-span-6 max-w-xl lg:max-w-[540px]'} flex flex-col space-y-5 text-left`}
          >
            {/* Header Block */}
            <div className="space-y-2">
              <div className="space-y-1">
                <img 
                  src="/Logo Name- Soul Viva Final - Large Caps (1).png" 
                  alt="Soul Viva" 
                  className="h-6 sm:h-8 md:h-10 lg:h-12 object-contain select-none block" 
                />
                <p className="font-sans font-semibold text-xl md:text-2xl tracking-tight text-[#1a1a1a]/80 mt-3">
                  Where Skincare meets sensory indulgence.
                </p>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="space-y-4">
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                Every day, millions of people step into the shower for a moment that is entirely their own. Soul Viva is built around that moment — not just to cleanse, but to transport.
              </p>
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                Soul Viva is a range of Moisturising Gel Bars crafted from a glycerin-rich transparent base infused with real botanical extracts. Six variants, each inspired by a different natural world — a burst of citrus energy, the calm of a lavender field, the crisp shock of the open sea. Together, they form a collection of sensory escapes that fit into the most ordinary daily ritual.
              </p>
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                The result is not just fresh skin. It's a reason to feel joy in the ordinary. To feel fresh. To feel alive.
              </p>
            </div>

          </motion.div>
 
           {/* Right Column: Three Brand Pillars */}
           {!hidePillars && (
             <motion.div 
               variants={itemVariants} 
               className="lg:col-span-6 flex flex-col space-y-4 w-full max-w-xl lg:max-w-[540px] self-center"
             >
                {/* Pillar 1: Botanicals */}
                <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[24px] p-4 md:p-5 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60 flex items-center justify-center">
                      <Leaf className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-sans text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                      Skin-Loving Botanicals
                    </h4>
                  </div>
                  <p className="font-sans text-[14.5px] text-neutral-650 leading-relaxed font-light">
                    Natural extracts of skin-loving botanicals for nourishment.
                  </p>
                </div>
    
                {/* Pillar 2: Fragrances */}
                <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[24px] p-4 md:p-5 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-sans text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                      Mood-Enlivening Fragrances
                    </h4>
                  </div>
                  <p className="font-sans text-[14.5px] text-neutral-650 leading-relaxed font-light">
                    Delightful fresh fragrances to evoke freshness and enliven the mood.
                  </p>
                </div>
    
                {/* Pillar 3: Glycerin-Rich */}
                <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[24px] p-4 md:p-5 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60 flex items-center justify-center">
                      <Droplet className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-sans text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                      Glycerin-Rich Formula
                    </h4>
                  </div>
                  <p className="font-sans text-[14.5px] text-neutral-650 leading-relaxed font-light">
                    Glycerin-Rich Formula for long-lasting skin moisturisation.
                  </p>
                </div>
             </motion.div>
           )}
        </motion.div>
      </div>
    </section>
  );
}
