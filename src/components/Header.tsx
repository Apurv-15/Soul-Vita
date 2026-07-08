"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Home, SlidersHorizontal, BookOpen, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  currentScreen: 'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin';
  setScreen: (screen: 'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin') => void;
  onOpenInquiry: () => void;
  onOpenSearch: () => void;
}

export default function Header({
  currentScreen,
  setScreen,
  onOpenInquiry,
  onOpenSearch,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = currentScreen === 'home' && !isScrolled;

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4 mr-2 md:hidden" /> },
    { id: 'range', label: 'Range', icon: <SlidersHorizontal className="w-4 h-4 mr-2 md:hidden" /> },
    { id: 'story', label: 'About Us', icon: <BookOpen className="w-4 h-4 mr-2 md:hidden" /> },
  ] as const;

  const navigateTo = (screen: 'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin' | 'craft') => {
    setScreen(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      isTransparent
        ? 'bg-[#F5F2EB]/40 backdrop-blur-md border-b border-[#E5DEC1]/30'
        : 'bg-[#F5F2EB]/95 dark:bg-[#F5F2EB]/95 backdrop-blur-xl border-b border-[#E5DEC1]/75 dark:border-[#E5DEC1]/75 shadow-xs'
    }`}>
      <div className="flex justify-between items-center px-6 md:px-20 h-20 w-full max-w-[1440px] mx-auto relative">
        
        {/* Mobile Menu Trigger (Hamburger) on the left */}
        <div className="flex md:hidden z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black cursor-pointer p-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>
        </div>

        {/* Logo - Centered on mobile, left-aligned on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-40 flex items-center h-full">
          <button
            onClick={() => navigateTo('home')}
            className="select-none hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <img 
              src="/Logo Name- Soul Viva Final - Large Caps (1).png" 
              alt="Soul Viva" 
              className="h-5 md:h-6 object-contain" 
            />
          </button>
        </div>

        {/* Right Side: Desktop Navigation Links (No Search) */}
        <div className="hidden md:flex items-center gap-10 z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`font-sans text-xs tracking-[0.18em] transition-all duration-300 pb-1 cursor-pointer border-b-2 hover:text-black hover:border-black/50 ${
                currentScreen === item.id
                  ? 'text-black border-black font-semibold'
                  : 'text-neutral-700 hover:text-black border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navigateTo('inquire')}
            className={`font-sans text-xs tracking-[0.2em] transition-all duration-300 pb-1 cursor-pointer border-b-2 hover:text-black hover:border-black/50 ${
              currentScreen === 'inquire'
                ? 'text-black border-black font-semibold'
                : 'text-neutral-700 hover:text-black border-transparent'
            }`}
          >
            Contact Us
          </button>
          {currentScreen === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className="font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-1 cursor-pointer border-b-2 text-black border-black font-semibold"
            >
              ADMIN
            </button>
          )}

          {/* Social Icons separator and links */}
          <div className="flex items-center gap-4 border-l border-neutral-400/30 pl-6">
            <a
              href="https://www.facebook.com/profile.php?id=61590660097743"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.instagram.com/soulvivaskin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Slide-down Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#F5F2EB]/95 backdrop-blur-xl border-t border-[#E5DEC1]/75 flex flex-col py-6 px-6 z-50 shadow-xl">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center text-sm tracking-wider uppercase font-medium py-2.5 transition-colors ${
                  currentScreen === item.id ? 'text-black font-semibold' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo('inquire')}
              className={`flex items-center text-sm tracking-wider uppercase font-medium py-2.5 mt-2 border-t border-black/10 pt-4 cursor-pointer transition-colors ${
                currentScreen === 'inquire' ? 'text-black font-semibold' : 'text-neutral-700 hover:text-black'
              }`}
            >
              Consult & Contact Us
            </button>

            {/* Mobile Social Links */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-black/10">
              <a
                href="https://www.facebook.com/profile.php?id=61590660097743"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-700 hover:text-black transition-colors"
              >
                <Facebook className="w-4.5 h-4.5 text-neutral-600" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/soulvivaskin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-700 hover:text-black transition-colors"
              >
                <Instagram className="w-4.5 h-4.5 text-neutral-600" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
