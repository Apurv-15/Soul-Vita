/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Leaf, Award, Globe, Droplet, ShieldCheck, Facebook, Instagram, X } from 'lucide-react';

export default function OurStorySection() {

  return (
    <section id="our-story-section" className="pt-8 pb-12 md:pt-10 md:pb-16 bg-[#FAF8F5] text-stone-900 relative overflow-hidden font-sans border-b border-stone-200/50">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EAD9EC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E5DEC1]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10 space-y-8">
        
        {/* Header Block */}
        <div className="text-left space-y-4">

          <h2 className="font-sans text-3xl md:text-[40px] font-semibold leading-[1.1] text-[#2D3A2F] tracking-tight uppercase">
            WHY US — THE SOUL VIVA DIFFERENCE
          </h2>
          <p className="font-display font-semibold text-xl md:text-2xl tracking-tight text-[#1a1a1a]/80 mt-3">
            More than a soap. A feeling of freshness.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: 100% Natural Extracts (Col Span 6) */}
          <div 
            className="col-span-1 md:col-span-6 bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-lg hover:border-[#2D3A2F]/30 transition-all duration-500 group text-left"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                  100% Natural Extracts
                </h3>
                <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                  Every variant contains real botanical extracts — not artificial fragrance alone. Shea butter, cherry blossom, waterlily, sea minerals, black currant, mandarin — each ingredient selected not just for its name, but for its active skin-care benefit. Real botanicals, real results.
                </p>
              </div>
            </div>
            <div className="w-full rounded-2xl overflow-hidden relative shadow-sm aspect-[16/10]">
              <img 
                src="/About_Us/Extracts - Diff.png" 
                alt="100% Natural Extracts" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Card 2: Sensory-First Design (Col Span 6) */}
          <div 
            className="col-span-1 md:col-span-6 bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-lg hover:border-[#2D3A2F]/30 transition-all duration-500 group text-left"
          >
            <div className="space-y-2">
              <h3 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                Sensory-First Design
              </h3>
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                Each variant is built around an emotional story — a feeling, a scene, an escape. The fragrance, the colour, the name, and the key visual all work together to create an experience that goes far beyond the functional. Soul Viva doesn't just clean skin. It transports the person using it.
              </p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden relative shadow-sm aspect-[16/10]">
              <img 
                src="/About_Us/Sensory Exp.jpeg" 
                alt="Sensory-First Design" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Card 3: Glycerin-Rich Gel Formula (Col Span 4) */}
          <div
            className="col-span-1 md:col-span-4 bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 pb-0 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-lg hover:border-[#2D3A2F]/30 transition-all duration-500 group text-left"
          >
            <div className="space-y-2">
              <h3 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                Glycerin-Rich Gel Formula
              </h3>
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                Unlike conventional soaps that strip the skin, Soul Viva's transparent glycerin base acts as a humectant — drawing moisture into the skin with every wash. The result is skin that feels soft and hydrated, not dry and tight. This is the fundamental difference between a bathing bar that merely cleans and one that actively cares.
              </p>
            </div>
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative shadow-sm">
              <img 
                src="/About_Us/Glucerin.png" 
                alt="Glycerin-Rich Gel Formula" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Card 4: Premium Shelf Presence (Col Span 4) */}
          <div
            className="col-span-1 md:col-span-4 bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 pb-0 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-lg hover:border-[#2D3A2F]/30 transition-all duration-500 group text-left"
          >
            <div className="space-y-2">
              <h3 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                Premium Shelf Presence
              </h3>
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                Each bar is individually flow-wrapped and presented in a full-colour printed monocarton with matte lamination and Spot UV finishing. The packaging is designed to command attention on shelf — with bold colour, considered design, and a visual identity that stands far apart from commodity soap.
              </p>
            </div>
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative shadow-sm">
              <img 
                src="/Images/Waterlily_kv.jpeg" 
                alt="Premium Shelf Presence" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Card 5: Export-Ready from Day One (Col Span 4) */}
          <div
            className="col-span-1 md:col-span-4 bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 pb-0 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-lg hover:border-[#2D3A2F]/30 transition-all duration-500 group text-left"
          >
            <div className="space-y-2">
              <h3 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight">
                Export-Ready from Day One
              </h3>
              <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-normal">
                Manufactured by a certified contract partner with international export capability. GS1 barcodes registered via GS1 India DataKart. Compliant labelling for international markets. Soul Viva is built to be a global brand.
              </p>
            </div>
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative shadow-sm">
              <img 
                src="/Images/Image - Export Ready.png" 
                alt="Export-Ready from Day One" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

        </div>

        {/* EXPORT COMPLIANCE SPECIFICATIONS MODULE */}
        <div className="mt-8 space-y-8 pt-8 border-t border-stone-200/50">
          <div className="text-left space-y-4">
            <h2 className="font-sans text-3xl md:text-[40px] font-semibold leading-[1.1] text-[#2D3A2F] tracking-tight uppercase">
              Export Compliance — Built for International Markets
            </h2>
            <p className="font-sans text-[14.5px] text-neutral-700 font-light max-w-4xl leading-relaxed">
              Soul Viva is designed and documented for export from India. Every element — from labelling to barcoding to ingredient declarations — is built to meet the requirements of international trade partners and regulatory authorities.
            </p>
          </div>

          {/* Specs bento grids */}
          <div className="text-left">
            
            {/* Card C: Export Compliance & Regulatory Standards */}
            <div className="bg-[#FAF8F5] border border-[#E5DEC1]/50 rounded-[32px] p-8 md:p-12 shadow-sm space-y-6">

              <div className="flex flex-wrap justify-center gap-6 pt-2 font-sans text-sm w-full">
                
                {/* Compliance Item 1 */}
                <div className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight flex items-center gap-2 mb-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2D3A2F] flex-shrink-0" />
                      GS1 Barcodes
                    </h4>
                    <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-relaxed">
                      All six variants carry internationally registered GS1 EAN-13 barcodes, registered under Belleaves Private Limited via GS1 India's DataKart platform. Globally scannable and recognised at point of sale in all major retail markets.
                    </p>
                  </div>
                </div>

                {/* Compliance Item 2 */}
                <div className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight flex items-center gap-2 mb-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2D3A2F] flex-shrink-0" />
                      INCI Declarations
                    </h4>
                    <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-relaxed">
                      Full INCI (International Nomenclature Cosmetic Ingredient) ingredient lists have been prepared to international convention — with correct IUPAC nomenclature, Latin binomials for all botanical extracts, and proper descending-concentration order as required by EU and Latin American regulations.
                    </p>
                  </div>
                </div>

                {/* Compliance Item 3 */}
                <div className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight flex items-center gap-2 mb-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2D3A2F] flex-shrink-0" />
                      Export Documentation
                    </h4>
                    <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-relaxed">
                      Belleaves Private Limited holds an active Import Export Code (IEC) and is registered under Udyam as an MSME (manufacturing category). Full export documentation is available upon request, including commercial invoices, certificates of origin, and certificates of analysis.
                    </p>
                  </div>
                </div>

                {/* Compliance Item 4 */}
                <div className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight flex items-center gap-2 mb-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2D3A2F] flex-shrink-0" />
                      Claims Substantiation
                    </h4>
                    <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-relaxed">
                      All variants are dermatologically tested for all skin types. All product claims are substantiated: 100% Natural Extracts, Cruelty Free, Paraben Free, Silicon Free. The product is classified as a cosmetic/toiletry for customs and import purposes in all target markets.
                    </p>
                  </div>
                </div>

                {/* Compliance Item 5 */}
                <div className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs text-left space-y-3.5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-[18px] font-semibold text-[#2D3A2F] tracking-tight leading-tight flex items-center gap-2 mb-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2D3A2F] flex-shrink-0" />
                      Mandatory Labeling
                    </h4>
                    <p className="font-sans text-[14.5px] text-neutral-700 font-light leading-relaxed">
                      All product labels carry the full set of mandatory information required for international trade: product name and category, net weight (100g), country of origin (India), full ingredient list (INCI), shelf life (24 months), manufacturer name and address, and brand owner address.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Section: Manufacturing Facilities Allocation Details */}
          <div className="text-left space-y-4 mt-16">
            <h2 className="font-sans text-3xl md:text-[40px] font-semibold leading-[1.1] text-[#2D3A2F] tracking-tight uppercase">
              Production Facility — Crafted by Experts in Soap Making
            </h2>
            <div className="space-y-4 max-w-4xl font-sans text-[14.5px] text-neutral-700 font-light leading-relaxed">
              <p>
                Soul Viva is manufactured by a certified contract manufacturing partner in India — specialists in glycerin-based soap and gel bar production who supply some of India's most well-known personal care brands.
              </p>
              <p>
                The manufacturing partner has extensive expertise in transparent glycerin soap technology — the core format of Soul Viva — and is equipped to handle the precision required for consistent colour, fragrance load, and bar weight across all six variants.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E5DEC1]/50 rounded-[32px] p-8 md:p-12 text-left space-y-8 mt-8">

            <div className="space-y-4">
              <h4 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800">
                Facility Key Facts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Fact 1 */}
                <div className="bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs text-left space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D3A2F] block">Location</span>
                    <span className="font-sans text-base font-bold text-neutral-800 block mt-1">Maharashtra, India</span>
                  </div>
                  <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">Certified contract partner supplying leading personal care brands.</span>
                </div>

                {/* Fact 2 */}
                <div className="bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs text-left space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D3A2F] block">Speciality & Standards</span>
                    <span className="font-sans text-base font-bold text-neutral-800 block mt-1">Glycerin Soap & Gel Bars</span>
                  </div>
                  <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">Built to international export standards & scalable to meet demand.</span>
                </div>

                {/* Fact 3 */}
                <div className="bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs text-left space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D3A2F] block">Quality Control</span>
                    <span className="font-sans text-base font-bold text-neutral-800 block mt-1">Full Batch QC & Traceability</span>
                  </div>
                  <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">End-to-end batch traceability on every production run.</span>
                </div>

                {/* Fact 4 */}
                <div className="bg-[#F5F2EB] rounded-2xl p-6 border border-[#E5DEC1]/60 shadow-xs text-left space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D3A2F] block">Carton & Logistics</span>
                    <span className="font-sans text-base font-bold text-neutral-800 block mt-1">48 Units / Master Carton</span>
                  </div>
                  <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">8 shrinkpacks × 6 units. Guaranteed 24 months shelf life.</span>
                </div>

              </div>

              {/* Factory Images below the cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="rounded-2xl overflow-hidden aspect-[16/9] relative shadow-sm border border-[#E5DEC1]/40 bg-[#F5F2EB]">
                  <img 
                    src="/Factory images/Factory Img1.jpg" 
                    alt="Production Facility Process" 
                    className="w-full h-full object-cover hover:scale-[1.015] transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[16/9] relative shadow-sm border border-[#E5DEC1]/40 bg-[#F5F2EB]">
                  <img 
                    src="/Factory images/Factory Image 2.jpg" 
                    alt="Production Facility Equipment" 
                    className="w-full h-full object-cover hover:scale-[1.015] transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
