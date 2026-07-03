"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export default function CosmeticBox3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [12, -12]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  // Waterlily beautiful SVG representation
  const WaterlilySVG = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md select-none pointer-events-none">
      {/* Outer Petals */}
      <path d="M50,15 C52,35 48,35 50,15 Z" fill="#ffffff" stroke="#cbf3eb" strokeWidth="0.5" />
      <path d="M50,15 C40,30 35,35 50,15 Z" fill="#f8fbfb" />
      <path d="M50,15 C60,30 65,35 50,15 Z" fill="#f8fbfb" />
      
      {/* Layer 2 Petals */}
      <path d="M30,35 C42,45 45,48 30,35 Z" fill="#ffffff" stroke="#cbf3eb" strokeWidth="0.5" transform="rotate(30 50 50)" />
      <path d="M30,35 C20,42 25,52 30,35 Z" fill="#fcfdfd" transform="rotate(30 50 50)" />
      
      <path d="M70,35 C58,45 55,48 70,35 Z" fill="#ffffff" stroke="#cbf3eb" strokeWidth="0.5" transform="rotate(-30 50 50)" />
      <path d="M70,35 C80,42 75,52 70,35 Z" fill="#fcfdfd" transform="rotate(-30 50 50)" />

      {/* Fan of horizontal petals */}
      <path d="M20,50 C38,50 42,52 20,50 Z" fill="#ffffff" stroke="#cbf3eb" strokeWidth="0.5" />
      <path d="M80,50 C62,50 58,52 80,50 Z" fill="#ffffff" stroke="#cbf3eb" strokeWidth="0.5" />
      
      {/* Base multi-point flowers */}
      <path d="M50,85 C15,65 25,40 50,85 Z" fill="#e2f5f1" opacity="0.8" />
      <path d="M50,85 C85,65 75,40 50,85 Z" fill="#e2f5f1" opacity="0.8" />

      {/* Internal beautiful lotus core */}
      <path d="M35,50 Q50,22 65,50" fill="none" stroke="#f6fbfb" strokeWidth="4" />
      <path d="M38,55 Q50,28 62,55" fill="#ffffff" />
      <path d="M42,58 Q50,34 58,58" fill="#ffffff" />
      
      {/* Scented Golden Center Pistils */}
      <circle cx="50" cy="46" r="6" fill="#fcd34d" />
      <circle cx="47" cy="44" r="2.5" fill="#f59e0b" />
      <circle cx="52" cy="43" r="2" fill="#f59e0b" />
      <circle cx="50" cy="48" r="3" fill="#fbbf24" />
      <circle cx="45" cy="47" r="1.5" fill="#f59e0b" />
      <circle cx="54" cy="47" r="2" fill="#fbbf24" />
    </svg>
  );

  // Sliced pear beautiful SVG representation
  const PearSVG = () => (
    <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md select-none pointer-events-none">
      {/* Pear Skin contour */}
      <path d="M50,15 C28,15 22,40 22,65 C22,86 35,95 50,95 C65,95 78,86 78,65 C78,40 72,15 50,15 Z" fill="#8cb83e" />
      
      {/* Inner succulent flesh */}
      <path d="M50,18 C31,18 26,42 26,65 C26,83 37,91 50,91 C63,91 74,83 74,65 C74,42 69,18 50,18 Z" fill="#f6f9e8" />
      <path d="M50,22 C35,22 30,44 30,65 C30,81 39,87 50,87 C61,87 70,81 70,65 C70,44 65,22 50,22 Z" fill="#fcfff5" />
      
      {/* Pear stem */}
      <path d="M50,15 C48,8 42,5 45,3" fill="none" stroke="#4a3721" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Leaf attached to stem */}
      <path d="M47,7 C42,2 35,5 34,10 C34,15 41,13 47,7 Z" fill="#587e23" />
      
      {/* Pear core seed zone & seeds */}
      <ellipse cx="50" cy="65" rx="10" ry="12" fill="none" stroke="#e1e8bc" strokeWidth="1" strokeDasharray="3,3" />
      {/* Core seed A */}
      <path d="M48,63 C46,63 45,66 48,68 C49,66 49,63 48,63 Z" fill="#2d1d10" transform="rotate(-15 48 65)" />
      {/* Core seed B */}
      <path d="M52,65 C54,65 55,68 52,70 C51,68 51,65 52,65 Z" fill="#2d1d10" transform="rotate(20 52 67)" />
    </svg>
  );

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center relative cursor-grab select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative w-[340px] h-[240px] md:w-[410px] md:h-[290px] preserve-3d"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      >
        {/* Shadow below box casting onto table/water */}
        <div 
          className="absolute -bottom-8 left-[10%] right-[10%] h-8 bg-black/15 blur-2xl rounded-full transition-transform duration-300 pointer-events-none"
          style={{ transform: 'translateZ(-40px) scaleY(0.4)' }}
        />

        {/* ======================================= */}
        {/* FRONT FACE OF BOX                       */}
        {/* ======================================= */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-[#9ef0d6] via-[#d6fbf0] to-white rounded-2xl border border-white/60 shadow-[0_20px_50px_rgba(45,90,86,0.18)] overflow-hidden flex flex-col justify-between p-6 md:p-8"
          style={{ 
            transform: 'translateZ(1px)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Gloss overlay reflection following cursor */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 mix-blend-overlay" />

          {/* Top segment: Logo branding */}
          <div className="space-y-1">
            <h2 className="font-sans text-xl md:text-2xl font-[200] tracking-[0.22em] text-[#1c403c] font-light leading-none">
              SOUL VIVA
            </h2>
            <p className="font-sans text-[8px] md:text-[9.5px] uppercase tracking-[0.14em] text-[#2d5a56]/80 font-semibold leading-none">
              Moisturising Gel Bar
            </p>
          </div>

          {/* Middle segment: Handwritten Scent title & details */}
          <div className="flex justify-between items-end relative h-full pt-2">
            
            {/* Left Texts */}
            <div className="space-y-3 flex flex-col justify-end h-full">
              <div className="space-y-0.5">
                <h3 className="font-serif text-2xl md:text-3xl text-[#1a3834] leading-tight font-light tracking-wide">
                  Waterlily
                </h3>
                <span className="font-serif text-lg text-[#2d5a56]/70 leading-none block pl-3">
                  &amp;
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#1a3834] leading-tight font-light tracking-wide pl-4">
                  Pear
                </h3>
              </div>
              
              <div className="space-y-1.5 pt-1">
                <span className="text-[8.5px] md:text-[9.5px] text-[#264f4c] font-sans tracking-[0.06em] font-medium block">
                  Dewy Fresh Skin
                </span>
                <p className="text-[7.5px] md:text-[8px] text-[#2d5a56]/85 uppercase tracking-[0.08em] font-bold">
                  Glycerin Rich Formula
                </p>
              </div>
            </div>

            {/* Right Graphics and Weight */}
            <div className="relative h-full w-1/2 flex flex-col justify-between items-end">
              
              {/* Teardrop glowing transparent gel bar representation */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center -mr-2 md:-mr-4 -mt-2">
                {/* Outward light rings shadow */}
                <div className="absolute w-[90%] h-[90%] rounded-full bg-emerald-300/20 blur-xl animate-pulse" />
                
                {/* Teardrop base */}
                <div 
                  className="w-20 h-20 md:w-26 md:h-26 rounded-[0%_100%_100%_100%] rotate-45 bg-gradient-to-br from-[#12ead1]/45 via-[#02beb6]/80 to-[#028b97]/95 border border-white/70 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_12px_24px_rgba(2,139,151,0.25)] flex items-center justify-center relative overflow-hidden"
                >
                  {/* Gloss shine lines inside drop */}
                  <div className="absolute top-2 left-2 w-1.5 h-6 bg-white/40 rounded-full rotate-[15deg] blur-[0.5px]" />
                  <div className="absolute bottom-1 right-2 w-8 h-8 rounded-full bg-emerald-400/20 blur-md" />

                  {/* Embossed text "SOUL VIVA" */}
                  <span className="font-sans text-[6px] md:text-[8px] tracking-[0.25em] font-light text-white opacity-95 -rotate-45 select-none -translate-x-[2px] translate-y-[2px]">
                    SOUL VIVA
                  </span>
                </div>

                {/* Overlapping botanical elements exactly as shown in screenshot */}
                {/*Slightly overlapping White Waterlily */}
                <div className="absolute bottom-1 right-8 md:right-11">
                  <WaterlilySVG />
                </div>

                {/* Slightly overlapping green Pear slice */}
                <div className="absolute bottom-0 right-1 md:right-3 rotate-[10deg]">
                  <PearSVG />
                </div>
              </div>

              {/* Weight badge bottom right */}
              <span className="text-[9px] md:text-[10.5px] text-[#2d5a56]/90 font-sans tracking-widest font-semibold pr-1">
                100g
              </span>
            </div>

          </div>
        </div>

        {/* ======================================= */}
        {/* SIDE FACE OF BOX (Visual depth effect) */}
        {/* ======================================= */}
        <div 
          className="absolute bg-white border border-neutral-200/50 flex flex-col justify-between p-4"
          style={{ 
            width: '40px',
            height: '240px',
            top: 0,
            bottom: 0,
            left: '100%',
            transform: 'rotateY(90deg) translateZ(-20px)',
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Vertical brand text */}
          <div className="h-full flex flex-col justify-between items-center py-4 w-full select-none text-center">
            <span className="font-sans text-[6px] uppercase tracking-widest text-[#2d5a56]/60 pr-1">
              100g
            </span>
            <span className="font-sans text-[9px] font-[200] tracking-[0.25em] text-[#1c403c] uppercase rotate-90 my-auto block whitespace-nowrap pl-2">
              SOUL VIVA
            </span>
            <span className="font-sans text-[5.5px] uppercase tracking-widest text-[#2d5a56]/70 rotate-90 block">
              Melt &amp; Pour
            </span>
          </div>
        </div>

        {/* ======================================= */}
        {/* TOP FACE OF BOX (Visual depth effect)  */}
        {/* ======================================= */}
        <div 
          className="absolute bg-gradient-to-r from-[#9ef0d6]/90 via-[#cff9ed]/90 to-white/95 border border-white/40 flex justify-center items-center px-4"
          style={{ 
            width: '340px',
            height: '40px',
            left: 0,
            right: 0,
            top: 0,
            transform: 'rotateX(90deg) translateZ(20px)',
            transformOrigin: 'center top',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Top text branding */}
          <span className="font-sans text-[8px] tracking-[0.3em] font-[200] text-[#1a3834] uppercase">
            SOUL VIVA &bull; WATERLILY &amp; PEAR
          </span>
        </div>

      </motion.div>
    </div>
  );
}
