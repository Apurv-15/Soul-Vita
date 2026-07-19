/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { X, Heart, Play } from 'lucide-react';

const dropletPattern = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" opacity="0.08"><defs><radialGradient id="drop" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.9"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="80%" stop-color="%23000000" stop-opacity="0.08"/><stop offset="100%" stop-color="%23000000" stop-opacity="0.25"/></radialGradient></defs><circle cx="30" cy="40" r="10" fill="url(%23drop)"/><circle cx="80" cy="120" r="7" fill="url(%23drop)"/><circle cx="150" cy="60" r="14" fill="url(%23drop)"/><circle cx="110" cy="160" r="9" fill="url(%23drop)"/><circle cx="50" cy="180" r="5" fill="url(%23drop)"/><circle cx="180" cy="20" r="6" fill="url(%23drop)"/><circle cx="20" cy="100" r="8" fill="url(%23drop)"/><circle cx="160" cy="130" r="10" fill="url(%23drop)"/></svg>`;

interface ProductTheme {
  topBanner: string;
  ean: string;
  textColor: string;
  subtextColor: string;
}

const PRODUCT_THEMES: Record<string, ProductTheme> = {
  'sea-minerals-menthol': {
    topBanner: '/Images/Sea_mineral_kv.jpeg',
    ean: '8908030764058',
    textColor: 'text-sky-900',
    subtextColor: 'text-sky-700',
  },
  'waterlily-pear': {
    topBanner: '/Images/Waterlily_kv.jpeg',
    ean: '8908030764003',
    textColor: 'text-emerald-950',
    subtextColor: 'text-emerald-800',
  },
  'cherry-blossom-strawberry': {
    topBanner: '/Images/Cherry_blossom.jpeg',
    ean: '8908030764034',
    textColor: 'text-rose-955',
    subtextColor: 'text-rose-800',
  },
  'lavender-currant': {
    topBanner: '/Images/Black_current_kv.jpeg',
    ean: '8908030764041',
    textColor: 'text-purple-900',
    subtextColor: 'text-purple-700',
  },
  'mandarin-peach': {
    topBanner: '/Images/Mandarin.png',
    ean: '8908030764027',
    textColor: 'text-orange-950',
    subtextColor: 'text-orange-800',
  },
  'shea-honey': {
    topBanner: '/Images/Shea_butter.jpeg',
    ean: '8908030764010',
    textColor: 'text-amber-950',
    subtextColor: 'text-amber-800',
  },
};

import Header from './Header';

interface IngredientCard3DProps {
  name: string;
  description: string;
  source: string;
  image?: string;
}

function IngredientCard3D({ name, description, source, image }: IngredientCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Proportional rotation calculation (max 15 degrees tilt)
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 15;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-neutral-200/50 shadow-sm relative overflow-hidden transition-all duration-300 group hover:shadow-md cursor-pointer h-full"
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 30px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.1)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)'
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* 3D Depth elements */}
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="transition-transform duration-300 flex flex-col h-full justify-between"
      >
        <div className="space-y-3">
          {image && (
            <div className="w-12 h-12 rounded-xl bg-white/80 border border-neutral-100/80 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Image src={image} alt={name} width={40} height={40} className="object-contain" />
            </div>
          )}
          <h4 className="font-sans text-sm font-semibold text-neutral-800">{name}</h4>
          <p className="font-sans text-[11px] text-neutral-500 leading-relaxed font-light">{description}</p>
        </div>
        
        <span className="font-sans text-[9px] tracking-wider text-neutral-400 uppercase font-semibold block mt-4 self-start">
          Source: {source}
        </span>
      </div>
    </div>
  );
}

const encodePath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
};

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
  onInquire: () => void;
  setScreen?: (screen: 'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin') => void;
  onTriggerCinematicIntro?: (videoUrl: string) => void;
}

export default function ProductDetailsModal({ product, onClose, onProductSelect, onInquire, setScreen, onTriggerCinematicIntro }: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
  
  const theme = PRODUCT_THEMES[product.id] || {
    topBanner: '/Hero_page/base.jpeg',
    ean: '8908030764010',
    textColor: 'text-neutral-900',
    subtextColor: 'text-neutral-600',
  };
  
  // Auto scroll row states
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Scroll to top and reset states when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsMediaLoading(true);
    
    // Reset autoScrollHasRunRef so auto-scroll works for new product
    autoScrollHasRunRef.current = false;

    // Scroll window/smoother to top
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Set media loading state to true when the active image index changes
  useEffect(() => {
    setIsMediaLoading(true);
  }, [activeImageIndex]);

  // Auto-scroll to details grid after 3.5 seconds, but cancel if user scrolls manually first
  const autoScrollHasRunRef = useRef<boolean>(false);

  useEffect(() => {
    // Disable auto-scroll on mobile
    if (window.innerWidth < 768) {
      return;
    }

    // If we are already scrolled down on mount/product change, do not auto-scroll
    if (window.scrollY > 20) {
      autoScrollHasRunRef.current = true;
    }

    if (autoScrollHasRunRef.current) return;

    let hasInteracted = false;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        hasInteracted = true;
        autoScrollHasRunRef.current = true;
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      if (!hasInteracted) {
        const infoGrid = document.getElementById('product-details-grid');
        if (infoGrid) {
          const rect = infoGrid.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 120; // 120px offset to clear the header
          
          // Try to use ScrollSmoother if it exists to avoid breaking GSAP
          if ((window as any).ScrollSmoother) {
            const smoother = (window as any).ScrollSmoother.get();
            if (smoother) {
              smoother.scrollTo(targetY, true);
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
          
          autoScrollHasRunRef.current = true;
        }
      }
      window.removeEventListener('scroll', handleScroll);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [product]);



  // Smooth slow crawling scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      if (!isHovered && el) {
        const delta = (time - lastTime) / 1000;
        // ~35px per second slow drift rate
        el.scrollLeft += delta * 35;
        
        // Wrap around at 1/3 of the scrollWidth for a seamless infinite loop
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird) {
          el.scrollLeft = el.scrollLeft - oneThird;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, product]);

  // Set up GSAP ScrollTrigger pinning for left column to work with ScrollSmoother
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    let triggerInstance: any;

    const timer = setTimeout(() => {
      const stickyEl = document.getElementById('left-sticky-column');
      const wrapperEl = document.getElementById('left-sticky-wrapper');
      if (!stickyEl || !wrapperEl) return;

      triggerInstance = ScrollTrigger.create({
        trigger: '#product-details-grid',
        start: 'top 120px',
        end: 'bottom bottom',
        pin: '#left-sticky-column',
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // Force instant calculation update for ScrollTrigger + ScrollSmoother container bounds
      ScrollTrigger.refresh();

      // Listen to late image loads to refresh ScrollTrigger bounds dynamically
      const handleImageLoad = () => {
        ScrollTrigger.refresh();
      };
      
      const imgs = stickyEl.querySelectorAll('img');
      imgs.forEach(img => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener('load', handleImageLoad);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (triggerInstance) {
        triggerInstance.kill();
      }
    };
  }, [product]);

  // Accordion active state
  const [openAccordion, setOpenAccordion] = useState<'info' | 'benefits' | 'ingredients' | null>('info');

  // Multi-thumbnail list generated dynamically based on product context
  const getThumbnails = () => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }

    return [
      product.bgImage, // Thumbnail 1: Context Setting
      product.image,   // Thumbnail 2: Transparent soap bar detail
    ];
  };

  const thumbnails = getThumbnails();

  interface ProductMedia {
    type: 'image' | 'video';
    url: string;
  }

  const getMediaList = (): ProductMedia[] => {
    const list: ProductMedia[] = [];
    if (product.video) {
      list.push({ type: 'video', url: product.video });
    }
    const imgs = getThumbnails();
    imgs.forEach(url => {
      list.push({ type: 'image', url });
    });
    return list;
  };

  const mediaList = getMediaList();

  const toggleAccordion = (tab: 'info' | 'benefits' | 'ingredients') => {
    setOpenAccordion(openAccordion === tab ? null : tab);
  };

  // Auto-traverse product images/videos every 4.5 seconds
  useEffect(() => {
    if (mediaList.length <= 1) return;

    // If current media is a video, do not auto-advance with the timer.
    // The video's onEnded event will trigger the transition instead.
    if (mediaList[activeImageIndex]?.type === 'video') {
      return;
    }

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % mediaList.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [mediaList.length, activeImageIndex]);

  return (
    <motion.div 
      className="w-full bg-[#FAF9F5] text-brand-dark flex flex-col justify-start min-h-screen relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Header Navigation Bar */}
      <Header
        currentScreen="range"
        setScreen={(screen) => {
          onClose();
          if (setScreen) {
            setScreen(screen);
          }
        }}
        onOpenInquiry={() => {
          onClose();
          if (setScreen) {
            setScreen('inquire');
          }
        }}
        onOpenSearch={() => {}}
      />

      {/* Full-screen Hero Banner featuring the variant key visual background */}
      <div className="hidden md:flex relative w-full h-screen flex-col items-center justify-center overflow-hidden z-10 select-none bg-black">
        {/* Full-screen clear background video or key visual */}
        <div className="absolute inset-0 z-0 bg-black">
          {product.video ? (
            <video 
              src={encodePath(product.video)}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-bottom opacity-100 transition-opacity duration-700 border-0 outline-none scale-[1.025]"
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            />
          ) : (
            <Image 
              src={encodePath(theme.topBanner)} 
              alt="" 
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover opacity-100 transition-opacity duration-700" 
            />
          )}
        </div>

        {/* Scroll Down Indicator */}
        <div 
          onClick={() => {
            const infoGrid = document.getElementById('product-details-grid');
            if (infoGrid) {
              const rect = infoGrid.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const targetY = rect.top + scrollTop - 120; // 120px offset to clear the header
              if ((window as any).ScrollSmoother) {
                const smoother = (window as any).ScrollSmoother.get();
                if (smoother) {
                  smoother.scrollTo(targetY, true);
                } else {
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              } else {
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group px-5 py-2.5 rounded-full border border-stone-350/40 bg-[#FAF9F5]/40 backdrop-blur-md shadow-xs hover:bg-[#FAF9F5]/80 transition-all duration-300"
        >
          <span className="text-[9px] tracking-[0.25em] text-[#2D3A2F] uppercase font-sans font-bold">Explore Details</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="text-[#2D3A2F]"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Main Grid Content Container (Directly on page, full-screen, no card wrapper overlay) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 md:pb-24 flex-1 pt-24 md:pt-24">
        <div id="product-details-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column Wrapper: Groups thumbnails and main image into a sticky element on desktop */}
          <div id="left-sticky-wrapper" className="lg:col-span-7 order-1 lg:order-1 w-full self-stretch">
            <div id="left-sticky-column" className="flex flex-col gap-5 w-full lg:h-auto relative">
              
                <div data-lag="0.5" className="relative w-full overflow-hidden transition-all duration-300 aspect-[4/3] md:aspect-[16/10] bg-neutral-100 rounded-2xl">
                  
                  {isMediaLoading && (
                    <div className="absolute inset-0 bg-[#FAF9F5] flex items-center justify-center z-20">
                      <div className="w-full h-full bg-stone-100/80 animate-pulse flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full border-[3px] border-stone-200/60 border-t-[#2D3A2F] animate-spin" />
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#2D3A2F]/40 font-sans font-semibold">Loading Visual...</span>
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
                    >
                      {mediaList[activeImageIndex]?.type === 'video' ? (
                        <div 
                          className="w-full h-full relative cursor-pointer group border-0 outline-none"
                          style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                          onClick={(e) => {
                            const videoEl = e.currentTarget.querySelector('video');
                            if (videoEl) {
                              if (videoEl.paused) {
                                videoEl.play().catch(() => {});
                              } else {
                                videoEl.pause();
                              }
                            }
                          }}
                        >
                          <video
                            src={encodePath(mediaList[activeImageIndex].url)}
                            autoPlay
                            loop={false}
                            muted
                            playsInline
                            onLoadedData={() => setIsMediaLoading(false)}
                            onEnded={() => {
                              // After the video completes, let the user see the 2nd media item (index 1 in mediaList)
                              setActiveImageIndex(1);
                            }}
                            className="w-full h-full md:object-cover object-contain transition-transform duration-500 border-0 outline-none scale-[1.025]"
                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                          />

                        </div>
                      ) : (
                        <Image
                          src={encodePath(mediaList[activeImageIndex]?.url)}
                          alt={`${product.name} large view`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          onLoad={() => setIsMediaLoading(false)}
                          onError={() => setIsMediaLoading(false)}
                          className={`w-full h-full transition-transform duration-500 ${
                            mediaList[activeImageIndex]?.url.includes('/Images/') || 
                            mediaList[activeImageIndex]?.url.includes('unsplash.com')
                              ? 'md:object-cover object-contain'
                              : 'object-contain p-1 md:p-2'
                          }`}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Floater crystal bar indicator in bottom right */}
                  {product.id === 'crystal-clarity' && (
                    <div className="absolute bottom-4 right-4 z-20 glass px-3 py-1.5 rounded-full border border-white/60 text-[9px] tracking-widest font-semibold uppercase text-neutral-500 shadow-sm pointer-events-none">
                      Crystalline solid form
                    </div>
                  )}
                </div>

              {/* Horizontal list of interactive Thumbnails (Underneath main image) */}
              <div data-lag="0.3" className="flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-none select-none w-full mt-2">
                {mediaList.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                    }}
                    className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer relative bg-white/50 ${
                      activeImageIndex === idx 
                        ? 'ring-2 ring-neutral-900/40 ring-offset-2 scale-95 opacity-100' 
                        : 'opacity-70 hover:opacity-100 hover:scale-102 border border-neutral-200/30'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <div className="w-full h-full relative bg-neutral-100/50">
                        <video 
                          src={encodePath(media.url)} 
                          muted 
                          className="w-full h-full object-cover opacity-80" 
                        />

                      </div>
                    ) : (
                      <Image 
                        src={encodePath(media.url)} 
                        alt={`Product view thumbnail ${idx + 1}`} 
                        fill
                        sizes="(max-width: 768px) 48px, 64px"
                        className="object-cover bg-neutral-100/50"
                      />
                    )}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* COLUMN C: Premium Product Details & Controls Panel */}
          <div className="lg:col-span-5 order-2 lg:order-2 space-y-5 text-left">
            
            {/* Category / Subtitle */}
            <div className="space-y-2">
              <h1 className="font-avenir text-3xl md:text-4xl font-semibold tracking-tight text-[#1c1b1b] leading-tight">
                {(() => {
                  const m = product.name.match(/^(.*?)\s+(Moisturi[sz]ing Gel Bar)$/);
                  return m ? <>{m[1]}<br />{m[2]}</> : product.name;
                })()}
              </h1>
              <p className="font-avenir text-[16px] md:text-[18px] text-neutral-500 font-semibold mt-2">
                {product.subtitle}
              </p>
            </div>

            <div className="w-full h-[1px] bg-neutral-200/60" />

            {/* Description text */}
            <p className="font-sans text-[16px] text-neutral-700 font-light leading-[1.8]">
              {product.longDescription || product.description}
            </p>


            <div className="w-full h-[1px] bg-neutral-200/60" />

            {/* 3. Information & Ingredients Sections */}
            <div className="space-y-5">

              {/* KEY INGREDIENTS */}
              {product.keyIngredients && product.keyIngredients.length > 0 && (
                <div className="border-b border-neutral-200/50 pb-4">
                  <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-3">
                    Key Ingredients
                  </h3>
                  <ul className="space-y-2 font-sans text-[15px] text-neutral-700 font-light leading-relaxed">
                    {product.keyIngredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                        <span><strong className="font-semibold text-neutral-900">{ing.name} —</strong> {ing.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* PRODUCT INFORMATION (QUICK REFERENCE) */}
              <div className="border-b border-neutral-200/50 pb-4">
                <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-3">
                  Product Information (Quick Reference)
                </h3>
                <ul className="space-y-2 font-sans text-[15px] text-neutral-700 font-light leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">Net Weight:</strong> {product.weight}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">EAN Barcode:</strong> {product.eanBarcode} (GS1 India Registered)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">Shelf Life:</strong> {product.shelfLife}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">Country of Origin:</strong> {product.countryOfOrigin}</span>
                  </li>
                </ul>
              </div>

              {/* TECHNICAL DETAILS */}
              <div className="border-b border-neutral-200/50 pb-4">
                <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-3">
                  Technical Details
                </h3>
                <ul className="space-y-2 font-sans text-[15px] text-neutral-700 font-light leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">Product Category:</strong> {product.productCategory || 'Glycerin Based transparent gel bathing bar'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">For Skin Type:</strong> {product.skinType}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">Case Configuration:</strong> {product.caseConfiguration}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    <span><strong className="font-semibold text-neutral-900">Packaging:</strong> {product.packaging}</span>
                  </li>
                </ul>
              </div>

              {/* INGREDIENT INFORMATION — FULL INCI LISTING */}
              {product.inciIngredients && (
                <div className="border-b border-neutral-200/50 pb-4">
                  <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-3">
                    Ingredient Information — Full INCI Listing
                  </h3>
                  <p className="font-sans text-[15px] text-neutral-700 font-light leading-[1.6] bg-[#FAF9F5] border border-neutral-200 rounded-xl p-5">
                    {product.inciIngredients}
                    <span className="block mt-3 text-xs text-neutral-450 leading-relaxed">
                      Ingredients listed in descending order of concentration per INCI convention. Full safety data sheet and certificate of analysis available to qualified trade buyers on request.
                    </span>
                  </p>
                </div>
              )}

              {/* CLAIMS */}
              {product.claims && product.claims.length > 0 && (
                <div className="border-b border-neutral-200/50 pb-4">
                  <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-3">
                    Claims
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.claims.map((claim, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-150/40 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                        ✓ {claim}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>



          </div>
        </div>
      </div>

      {/* 3. Discover Our Collection (Horizontal scrolling grid) */}
      <div className="w-full border-t border-neutral-200/50 py-8 md:py-10 mt-6 md:mt-8 text-left px-6 md:px-20 relative z-10">
        <div className="space-y-2 mb-8">
          <h2 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-neutral-900 leading-tight">
            Our Collection
          </h2>
        </div>
        
        {/* Horizontal scrolling row with high-end auto-crawl effect */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 md:-mx-0 md:px-0 select-none"
        >
          {[
            ...PRODUCTS.filter(p => p.id !== product.id),
            ...PRODUCTS.filter(p => p.id !== product.id),
            ...PRODUCTS.filter(p => p.id !== product.id)
          ].map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              onClick={() => {
                onProductSelect(item);
              }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-3xl border border-neutral-200/40 overflow-hidden hover:border-neutral-400/60 transition-all duration-300 cursor-pointer group"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[4/3] w-full bg-neutral-100/50 flex items-center justify-center">
                <div className={`absolute inset-0 opacity-30 bg-gradient-to-tr ${item.accentClass}`} />
                <Image 
                  src={encodePath(item.bgImage)} 
                  alt={item.name} 
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5 space-y-1">
                <span className="text-[9px] tracking-wider text-neutral-400 uppercase font-semibold block">
                  {item.subtitle}
                </span>
                <h3 className="font-sans text-base text-neutral-800 font-medium group-hover:text-black transition-colors block truncate">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-neutral-500 font-light line-clamp-1">
                  {item.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Brand Footer (Replacing botanical banner) */}
      <footer className="w-full bg-[#F5F2EB] text-[#1C1B1B] pt-16 pb-10 px-6 md:px-20 select-none border-t border-[#E5DEC1]/60 mt-16 relative z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-between gap-12">

          {/* Giant Brand Logo Text */}
          <div className="w-full text-center py-6 flex justify-center">
            <img 
              src="/Logo Name- Soul Viva Final - Large Caps (1).png" 
              alt="Soul Viva" 
              className="h-10 sm:h-12 md:h-16 object-contain select-none" 
            />
          </div>

          {/* Mandatory Footer Information Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#E5DEC1]/60 pt-10 text-neutral-800 font-sans text-sm md:text-[15px]">
            {/* Column 1: Contact & Address */}
            <div className="space-y-4 text-left">
              <h4 className="font-bold uppercase tracking-wider text-neutral-800 text-[11px] md:text-[13px]">Corporate Office</h4>
              <p className="leading-relaxed font-normal text-neutral-700">
                Belleaves Private Limited<br />
                D 9, Ground Floor, Sector 3,<br />
                Noida, Uttar Pradesh 201301, India
              </p>
              <div className="pt-1.5 space-y-1.5 text-neutral-700 font-normal">
                <p>
                  Email: <a href="mailto:reach.us@soulviva.in" className="hover:text-black transition-colors font-semibold border-b-2 border-neutral-300 hover:border-black">reach.us@soulviva.in</a>
                </p>
                <p>
                  Tel: <a href="tel:+919773778579" className="hover:text-black transition-colors font-semibold">+91 97737 78579</a>
                </p>
                <p>
                  Web: <a href="https://www.soulviva.in" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-semibold border-b-2 border-neutral-300 hover:border-black">www.soulviva.in</a>
                </p>
              </div>
            </div>

            {/* Column 2: Brand Credentials */}
            <div className="space-y-4 text-left">
              <h4 className="font-bold uppercase tracking-wider text-neutral-800 text-[11px] md:text-[13px]">Registrations & Certifications</h4>
              <ul className="grid grid-cols-1 gap-2.5 text-neutral-700 font-normal">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                  IEC Registered
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                  GS1 India Barcodes Registered
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                  Udyam MSME Registered
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Origins */}
            <div className="space-y-4 text-left">
              <h4 className="font-bold uppercase tracking-wider text-neutral-800 text-[11px] md:text-[13px]">Origin & Trademarks</h4>
              <p className="leading-relaxed font-normal text-neutral-700">
                Soul Viva is a brand of Belleaves Private Limited.
              </p>
              <p className="leading-relaxed font-normal text-neutral-700">
                Soul Viva is a trademark of Belleaves Private Limited.
              </p>
              <p className="leading-relaxed font-normal text-neutral-700">
                Manufactured in India. All rights reserved.
              </p>
            </div>
          </div>

          {/* Bottom Row bar */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#E5DEC1]/60 pt-8 text-neutral-600 font-sans text-xs md:text-sm">

            {/* Left links */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Support'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    if (link === 'Support') {
                      onClose();
                      if (setScreen) {
                        setScreen('inquire');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="border-2 border-[#DCD5C5] hover:border-black text-neutral-700 hover:text-black rounded-full px-5 py-2 text-[10px] md:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer bg-white/20 hover:bg-white/60"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Center Copyright & Back to Top */}
            <div className="flex flex-col items-center justify-center gap-2 md:ml-auto">
              <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold text-neutral-500 text-center">
                &copy; 2026 Belleaves Private Limited.
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[10px] md:text-xs tracking-widest uppercase text-[#2D3A2F] hover:text-black font-bold flex items-center gap-1 transition-colors cursor-pointer border-b border-transparent hover:border-black pb-0.5"
              >
                Back to top ↑
              </button>
            </div>

          </div>

        </div>
      </footer>

    </motion.div>
  );
}

