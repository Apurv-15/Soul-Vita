"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

const MotionImage = motion.create(Image);
import {
  Sparkles,
  Droplet,
  ShieldCheck,
  Award,
  BookOpen,
  Mail,
  ArrowUpRight,
  ChevronRight,
  Filter,
  ArrowRight,
  Check,
  Layers,
  Leaf,
  ChevronDown,
  Instagram
} from 'lucide-react';

import { Product } from '../src/types';
import { PRODUCTS } from '../src/data';
import dynamic from 'next/dynamic';
import LoadingScreen from '../src/components/LoadingScreen';
import Header from '../src/components/Header';
import ProductCard from '../src/components/ProductCard';
import OurStorySection from '../src/components/OurStorySection';
import BrandIntro from '../src/components/BrandIntro';
import GradualBlur from '../src/components/GradualBlur';

// Dynamically imported components to reduce initial bundle size
const ProductDetailsModal = dynamic(() => import('../src/components/ProductDetailsModal'));
const SearchModal = dynamic(() => import('../src/components/SearchModal'));
const InquiryModal = dynamic(() => import('../src/components/InquiryModal'));
const TheCraftVisualizer = dynamic(() => import('../src/components/TheCraftVisualizer'));
const InquiryPage = dynamic(() => import('../src/components/InquiryPage'));
const StorytellerModal = dynamic(() => import('../src/components/StorytellerModal'));
const AdminDashboard = dynamic(() => import('../src/components/AdminDashboard'));
const CinematicIntro = dynamic(() => import('../src/components/CinematicIntro'));
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const VALID_SCREENS = ['home', 'range', 'craft', 'story', 'inquire', 'admin'] as const;
type Screen = typeof VALID_SCREENS[number];

function readScreenFromHash(): Screen {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  return (VALID_SCREENS as readonly string[]).includes(hash) ? (hash as Screen) : 'home';
}

export default function App() {
  // Screens state
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [criticalAssetsLoaded, setCriticalAssetsLoaded] = useState(false);

  const [cinematicActive, setCinematicActive] = useState(false);
  const [introVideoUrl, setIntroVideoUrl] = useState('/Video/Sun_rises_over_lavender.mp4');

  useEffect(() => {
    if (animationComplete && criticalAssetsLoaded) {
      setLoading(false);
    }
  }, [animationComplete, criticalAssetsLoaded]);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
  };

  // Read the hash on mount so refresh always restores the correct screen.
  // 'home' is the safe server-side fallback (loading screen covers any flash).
  const [currentScreen, setScreen] = useState<Screen>(readScreenFromHash);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const handleProductClick = (p: Product) => {
    setSelectedProduct(p);
  };
  const [storyProduct, setStoryProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Disable browser scroll restoration so we always control the scroll position.
  // Without this, the browser restores the user's old scroll depth on refresh,
  // making the page appear to be mid-scroll even though the content is correct.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Hero section ref and motion values
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 15 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(ySpring, y => -y * 0.15);
  const rotateY = useTransform(xSpring, x => x * 0.15);

  const scale = useMotionValue(1.0);
  const brightness = useMotionValue(1.0);

  const scaleSpring = useSpring(scale, springConfig);
  const brightnessSpring = useSpring(brightness, springConfig);
  const filterString = useTransform(brightnessSpring, b => `brightness(${b})`);

  // Base image subtle transforms (creates deep parallax depth separation)
  const baseTranslateX = useTransform(xSpring, x => x * 0.25);
  const baseTranslateY = useTransform(ySpring, y => y * 0.25);
  const baseRotateX = useTransform(ySpring, y => -y * 0.05);
  const baseRotateY = useTransform(xSpring, x => x * 0.05);
  const baseScale = useTransform(scaleSpring, s => 1 + (s - 1) * 0.3);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate relative mouse position from center (-0.5 to 0.5)
    const relativeX = (event.clientX - rect.left) / width - 0.5;
    const relativeY = (event.clientY - rect.top) / height - 0.5;

    // Multiply by 40 to get ±20px range
    mouseX.set(relativeX * 40);
    mouseY.set(relativeY * 40);

    scale.set(1.02);
    brightness.set(1.05);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1.0);
    brightness.set(1.0);
  };

  // Phase 1 — Critical: only the 3 hero images block the loader
  useEffect(() => {
    const preloadImage = (src: string): Promise<void> =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    const loadCriticalAssets = async () => {
      await Promise.all([
        '/Hero_page/base.jpeg',
        '/Hero_page/hover.png',
        '/Hero_page/Hero_mobile.jpeg',
      ].map(preloadImage));
      setCriticalAssetsLoaded(true);
    };

    loadCriticalAssets();
  }, []);

  // Phase 2 — Homepage visible: load catalog card assets (bgImages + floating bar images)
  // so the product grid renders immediately without any blank cards.
  useEffect(() => {
    if (loading) return;

    const cacheImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    // These are visible on the homepage without any navigation
    PRODUCTS.forEach((p) => {
      cacheImage(p.bgImage);
      if (p.image) cacheImage(p.image);
    });
  }, [loading]);

  // Phase 3 — After homepage settles: images for other pages, then videos last
  useEffect(() => {
    if (loading) return;

    const cacheImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    // Fire image preloads ~600ms after homepage is shown — avoids bandwidth
    // contention with Phase 2 card images while still arriving well before
    // the user navigates away.
    const imageTimer = setTimeout(() => {
      // About Us page images
      [
        '/About_Us/Natural Extracts.png',
        '/About_Us/Fragrance.png',
        '/About_Us/Glucerin.png',
        '/About_Us/Extracts - Diff.png',
        '/Sensory Exp.png',
        '/Factory images/Factory Img1.jpg',
        '/Factory images/Factory Image 2.jpg',
      ].forEach(cacheImage);

      // Product detail key visuals
      [
        '/Images/Sea_mineral_kv.jpeg',
        '/Images/Waterlily_kv.jpeg',
        '/Images/Cherry_blossom.jpeg',
        '/Images/Black_current_kv.jpeg',
        '/Images/Mandarin.png',
        '/Images/Shea_butter.jpeg',
      ].forEach(cacheImage);

      // Product gallery images
      PRODUCTS.forEach((p) => {
        if (p.images) p.images.forEach(cacheImage);
      });
    }, 600);

    // Videos — staggered preload using hidden <video preload="auto"> elements.
    // The browser's media cache is shared with real <video> tags, so by the time
    // the user opens a product modal the video is already buffered.
    // fetch() was used before but targets the HTTP cache which <video> doesn't read.
    const videoTimers: ReturnType<typeof setTimeout>[] = [];
    const preloadEls: HTMLVideoElement[] = [];

    // Sort smallest-first so the quickest wins arrive early (rough approximation
    // by URL alphabetical order — replace with explicit sizes if needed).
    const videoUrls = PRODUCTS
      .map(p => p.video)
      .filter((v): v is string => Boolean(v));

    videoUrls.forEach((url, i) => {
      const t = setTimeout(() => {
        const el = document.createElement('video');
        el.preload = 'auto';
        el.muted = true;
        el.playsInline = true;
        el.src = url;
        el.load();
        preloadEls.push(el);
      }, 2500 + i * 3500); // 2.5 s head-start, then one video every 3.5 s
      videoTimers.push(t);
    });

    return () => {
      clearTimeout(imageTimer);
      videoTimers.forEach(clearTimeout);
      // Release any in-progress downloads immediately
      preloadEls.forEach(el => { el.src = ''; el.load(); });
    };
  }, [loading]);

  // Initialize GSAP ScrollSmoother
  useEffect(() => {
    if (loading) return;

    // Reset scroll position on every screen change before smoother is (re)created
    window.scrollTo(0, 0);

    // Skip ScrollSmoother on touch devices and small viewports to prevent jank/lag
    const isTouchOrMobile =
      window.innerWidth < 1024 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchOrMobile) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: true,
      smoothTouch: false, // Use native touch scroll physics on mobile
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      smoother.kill();
    };
  }, [loading, currentScreen]);

  // Restore scroll position when closing modal and refresh ScrollTrigger
  const lastScrollPos = useRef(0);
  const hashSynced = useRef(false);

  useEffect(() => {
    if (selectedProduct) {
      lastScrollPos.current = window.scrollY;
      window.scrollTo(0, 0);
    } else {
      const timer = setTimeout(() => {
        window.scrollTo(0, lastScrollPos.current);
      }, 80);
      return () => clearTimeout(timer);
    }
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(refreshTimer);
  }, [selectedProduct]);

  // Sync URL Hash with Navigation State
  useEffect(() => {
    if (loading) return; // Wait for loader to finish

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const productId = hash.replace('#product-', '');
        const prod = PRODUCTS.find(p => p.id === productId);
        if (prod) {
          setSelectedProduct(prod);
        } else {
          setSelectedProduct(null);
        }
      } else {
        setSelectedProduct(null);
        const screen = hash.replace('#', '');
        if ((VALID_SCREENS as readonly string[]).includes(screen)) {
          setScreen(screen as Screen);
        } else if (!hash) {
          setScreen('home');
        }
      }
      hashSynced.current = true;
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial sync
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading]);

  // Sync state changes back to Hash to keep URL updated (enables browser back/forward)
  useEffect(() => {
    if (loading || !hashSynced.current) return;

    if (selectedProduct) {
      if (window.location.hash !== `#product-${selectedProduct.id}`) {
        window.location.hash = `product-${selectedProduct.id}`;
      }
    } else {
      const targetHash = currentScreen === 'home' ? '' : `#${currentScreen}`;
      if (window.location.hash !== targetHash) {
        if (currentScreen === 'home') {
          history.pushState(null, '', window.location.pathname);
          // Manually trigger page view when navigating back to home without hash change event
          window.dispatchEvent(new Event('hashchange'));
        } else {
          window.location.hash = currentScreen;
        }
      }
    }
  }, [currentScreen, selectedProduct, loading]);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark antialiased font-sans flex flex-col justify-between selection:bg-brand-dark selection:text-white">

      {/* Superb animated luxury Loader */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Persistent Glassy Header */}
      {!loading && (
        <>
          <Header
            currentScreen={currentScreen}
            setScreen={(screen) => {
              setSelectedProduct(null);
              setScreen(screen);
            }}
            onOpenInquiry={() => setInquiryOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />
          <GradualBlur position="bottom" height="8.5rem" strength={2.0} />
        </>
      )}

      {/* GSAP ScrollSmoother wrappers */}
      <div id="smooth-wrapper" className="w-full flex-1 flex flex-col">
        <div id="smooth-content" className="w-full flex-1 flex flex-col">
          <div data-lag="0.5" className={selectedProduct ? "hidden" : "w-full flex-1 flex flex-col"}>
            {/* Dynamic Content Frame */}
            <main className={`flex-1 ${currentScreen === 'home' ? '' : 'pt-20'}`}>
              <AnimatePresence mode="wait">
                {!loading && (
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >

                    {/* SCREEN 1: Home dashboard */}
                    {currentScreen === 'home' && (
                      <div className="space-y-0">

                        {/* HERO AREA: Poetic display layout */}
                        <section
                          id="hero-section"
                          ref={heroRef}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          className="relative min-h-[95vh] h-[95vh] md:h-screen w-full flex items-center justify-start overflow-hidden bg-[#F5F2EB]"
                          style={{ perspective: 1200 }}
                        >
                          {/* Background Images with Responsive display */}
                          <div className="absolute inset-0 z-0 select-none pointer-events-none">
                            {/* Mobile static hero image */}
                            <div className="block md:hidden absolute inset-0 w-full h-full">
                              <Image
                                src="/Hero_page/Hero_mobile.jpeg"
                                alt="Soul Viva Hero Mobile"
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover"
                              />
                            </div>

                            {/* Desktop 3D Parallax Hover Effect */}
                            <div className="hidden md:block absolute inset-0 w-full h-full">
                              {/* Base Image (subtle movement) */}
                              <MotionImage
                                src="/Hero_page/base.jpeg"
                                alt="Soul Viva Hero Base"
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover"
                                style={{
                                  x: baseTranslateX,
                                  y: baseTranslateY,
                                  rotateX: baseRotateX,
                                  rotateY: baseRotateY,
                                  scale: baseScale,
                                }}
                              />
                              {/* Floating Overlay (moves with mouse + keyframe float) */}
                              <div className="absolute inset-0 w-full h-full animate-hero-float">
                                <MotionImage
                                  src="/Hero_page/hover.png"
                                  alt="Soul Viva Hero Overlay"
                                  fill
                                  priority
                                  sizes="100vw"
                                  className="object-cover origin-center"
                                  style={{
                                    x: xSpring,
                                    y: ySpring,
                                    rotateX,
                                    rotateY,
                                    scale: scaleSpring,
                                    filter: filterString,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Right-aligned next arrow slider like in reference screenshot */}
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-25 hidden md:block">
                            <button
                              onClick={() => {
                                setScreen('range');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="bg-white/10 hover:bg-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border border-white/25 transition-all duration-300 cursor-pointer active:scale-95"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Scroll Down Indicator */}
                          <div
                            onClick={() => {
                              const catalog = document.getElementById('catalog-section');
                              if (catalog) {
                                catalog.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group bg-[#F5F2EB]/50 hover:bg-[#F5F2EB]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E5DEC1]/50 shadow-md transition-all duration-300 active:scale-95"
                          >
                            <span className="text-[10px] tracking-[0.25em] text-[#2D3A2F] uppercase font-sans font-bold transition-colors duration-300">Scroll Down</span>
                            <motion.div
                              animate={{ y: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                              className="text-[#2D3A2F]"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </section>

                        {/* BRAND INTRODUCTION SECTION */}
                        <BrandIntro />

                        {/* COMPLETE RITUAL RANGE (CATALOG GRID SECTION) */}
                        <section id="catalog-section" className="pt-4 pb-16 md:pt-8 md:pb-24 bg-[#F5F2EB]/50">
                          <div className="max-w-[1600px] mx-auto px-6 md:px-20 flex flex-col items-center">

                            {/* Header Title in large font */}
                            <div className="text-center w-full mb-16 md:mb-24">
                              <h2 className="font-display font-normal text-4xl md:text-6xl text-[#1A1A1A] text-center tracking-tight">
                                Our Collection
                              </h2>
                            </div>

                            {/* Catalog core grid showing all soaps */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 w-full">
                              {PRODUCTS.map((p) => (
                                <ProductCard
                                  key={p.id}
                                  product={p}
                                  onSelect={handleProductClick}
                                />
                              ))}
                            </div>

                          </div>
                        </section>

                      </div>
                    )}

                    {/* SCREEN 2: Catalog Range Grid */}
                    {currentScreen === 'range' && (
                      <section id="catalog-section" className="pt-4 pb-16 md:pt-8 md:pb-24 bg-[#F5F2EB]/50">
                        <div className="max-w-[1600px] mx-auto px-6 md:px-20 flex flex-col items-center">

                          {/* Header Title in large font */}
                          <div className="text-center w-full mb-16 md:mb-24">
                            <h2 className="font-display font-normal text-4xl md:text-6xl text-[#1A1A1A] text-center tracking-tight">
                              Our Collection
                            </h2>
                          </div>

                          {/* Catalog core grid showing all soaps */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 w-full">
                            {PRODUCTS.map((p) => (
                              <ProductCard
                                key={p.id}
                                product={p}
                                onSelect={handleProductClick}
                              />
                            ))}
                          </div>

                        </div>
                      </section>
                    )}

                    {/* SCREEN 3: The Craft lab visualization */}
                    {currentScreen === 'craft' && (
                      <TheCraftVisualizer />
                    )}

                    {/* SCREEN 4: About Us section */}
                    {currentScreen === 'story' && (
                      <div className="space-y-0">
                        <BrandIntro hidePillars={true} />
                        <OurStorySection />
                      </div>
                    )}

                    {/* SCREEN 5: Dedicated B2B Contact Us Apple Form Page */}
                    {currentScreen === 'inquire' && (
                      <InquiryPage onBackToHome={() => {
                        setScreen('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} />
                    )}

                    {/* SCREEN 6: Admin Dashboard page */}
                    {currentScreen === 'admin' && (
                      <AdminDashboard onBackToHome={() => {
                        setScreen('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} />
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* METICULOUS FOOTER DESIGN (Mockup Matching Redesign) */}
            {!loading && (
              <footer className="bg-[#F5F2EB] text-[#1C1B1B] pt-16 pb-10 px-6 md:px-20 select-none">
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

                    {/* Left links (Capsules matching image) */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {['Contact Us'].map((link) => (
                        <button
                          key={link}
                          onClick={() => {
                            if (link === 'Contact Us') {
                              window.location.hash = 'inquire';
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
                      <a
                        href="https://www.instagram.com/soulvivaskin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-[#E1306C] transition-colors mb-1"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                      </a>
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
            )}

          </div>

          {/* Product Details overlay inside smooth-content */}
          <AnimatePresence>
            {selectedProduct && (
              <ProductDetailsModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onProductSelect={handleProductClick}
                onInquire={() => {
                  setSelectedProduct(null);
                  setScreen('inquire');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                setScreen={setScreen}
                onTriggerCinematicIntro={(videoUrl) => {
                  setIntroVideoUrl(videoUrl);
                  setCinematicActive(true);
                }}
              />
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* EXPANDED INTERACTIVE DRAWERS */}
      <AnimatePresence>
        {/* Storyteller Immersive Experience Modal */}
        {storyProduct && (
          <StorytellerModal
            product={storyProduct}
            onClose={() => setStoryProduct(null)}
            onInquire={() => {
              setStoryProduct(null);
              setScreen('inquire');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Search Input catalog popup */}
        {searchOpen && (
          <SearchModal
            onClose={() => setSearchOpen(false)}
            onSelectProduct={handleProductClick}
          />
        )}

        {/* Inquiry customized consultation drawer */}
        {inquiryOpen && (
          <InquiryModal
            onClose={() => setInquiryOpen(false)}
          />
        )}
      </AnimatePresence>

      {cinematicActive && (
        <CinematicIntro
          videoUrl={introVideoUrl}
          onRevealStart={() => {
            if (pendingProduct) {
              setSelectedProduct(pendingProduct);
            }
          }}
          onComplete={() => {
            setCinematicActive(false);
            setPendingProduct(null);
          }}
        />
      )}

    </div>
  );
}
