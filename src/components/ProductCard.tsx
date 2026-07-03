import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

const MotionImage = motion.create(Image);

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group flex flex-col gap-4 cursor-pointer text-left w-full select-none"
      onClick={() => onSelect(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 2D image frame with scaling hover effect */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative aspect-[4/3] w-full rounded-[28px] overflow-hidden bg-[#FAF5EE] flex items-center justify-center p-0 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(45,90,86,0.12)] hover:bg-[#F5ECE2] transform group-hover:scale-[1.035]"
      >
        {/* Soft dynamic color backing glow aura */}
        <div 
          className="absolute w-48 h-48 rounded-full opacity-0 group-hover:opacity-35 transition-all duration-500 pointer-events-none blur-3xl"
          style={{ 
            backgroundColor: product.themeColor,
          }}
        />

        {/* The main background image */}
        <MotionImage
          src={product.bgImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover z-10 select-none pointer-events-none group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />

        {/* Premium Glassmorphic Pop-out Arrow Button Overlay */}
        <div 
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-500 bg-neutral-900/10 ${
            isHovered ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0 backdrop-blur-none'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-full bg-white/90 border border-white/40 shadow-lg flex items-center justify-center text-black transition-all duration-500 transform ${
              isHovered ? 'scale-100 rotate-0' : 'scale-75 -rotate-45'
            }`}
          >
            <ArrowUpRight className="w-6 h-6 stroke-[2]" />
          </div>
        </div>
        
        {/* Inner light glare sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-25" />
      </div>

      {/* Details Row Underneath Card */}
      <div className="flex flex-col items-center text-center w-full px-2 py-1 mt-1 space-y-1">
        <h3 className="font-avenir text-[15px] sm:text-[16px] font-semibold text-[#1c1b1b] tracking-tight leading-tight group-hover:text-black">
          {product.name.replace(/\s+(Moisturizing|Moisturising)\s+Gel\s+Bar$/i, '')}
        </h3>
        <span className="font-avenir text-[13px] text-neutral-500 block font-semibold leading-tight">
          {product.subtitle}
        </span>
        <span className="font-avenir text-xs text-neutral-700 font-medium block leading-tight mt-0.5">
          100g
        </span>
      </div>
    </motion.div>
  );
}
