'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDomesticOpen, setIsDomesticOpen] = useState(false);
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = () => { setIsDomesticOpen(false); setIsInternationalOpen(false); setIsMenuOpen(false); };
    window.addEventListener('popstate', close);
    return () => window.removeEventListener('popstate', close);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 shadow-[0_4px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="group flex items-center transition-all duration-500 hover:scale-[1.02]">
            <Image
              src="/logo/Artboard 1@3x-8.png"
              alt="Adventures Wheel Logo"
              width={260}
              height={80}
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? 'h-12 sm:h-14' : 'h-24 sm:h-28'
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Domestic Trips with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDomesticOpen(true)}
              onMouseLeave={() => setIsDomesticOpen(false)}
            >
              <Link
                href="/domestic-trips"
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isScrolled ? 'text-[#122822] hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
              >
                Domestic Trips
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDomesticOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Hover Dropdown */}
              <AnimatePresence>
                {isDomesticOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-56 overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5">
                      <div className="flex flex-col py-3">
                        <Link href="/destinations/leh-ladakh" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Leh Ladakh
                        </Link>
                        <Link href="/destinations/spiti" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Spiti Valley
                        </Link>
                        <Link href="/destinations/meghalaya" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Meghalaya
                        </Link>
                        <Link href="/destinations/tawang" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Tawang
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setIsInternationalOpen(true)}
              onMouseLeave={() => setIsInternationalOpen(false)}
            >
              <Link
                href="/international-trips"
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isScrolled ? 'text-[#122822] hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
              >
                International Trips
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isInternationalOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              <AnimatePresence>
                {isInternationalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-56 overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5">
                      <div className="flex flex-col py-3">
                        <Link href="/trips/bali-explorer" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Bali
                        </Link>
                        <Link href="/trips/thailand-adventure" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Thailand
                        </Link>
                        <Link href="/trips/vietnam-journey" className="px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#1e3428] hover:bg-slate-50 hover:text-[#D4AF37] transition-colors">
                          Vietnam
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link
              href="/about"
              className={`rounded-lg px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                isScrolled ? 'text-[#122822] hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              Our Story
            </Link>

            <Link
              href="/blogs"
              className={`rounded-lg px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                isScrolled ? 'text-[#122822] hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`rounded-lg px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                isScrolled ? 'text-[#122822] hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className={`hidden h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:flex ${
                isScrolled
                  ? 'border-slate-200 bg-white text-[#122822] hover:border-[#122822] hover:bg-[#122822] hover:text-white'
                  : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              }`}
              aria-label="User Profile"
              title="Login / Dashboard"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all lg:hidden ${
                isScrolled
                  ? 'border-slate-200 bg-white text-slate-900'
                  : 'border-white/30 bg-white/10 text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl lg:hidden"
            >
              <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 sm:px-6">
                <div className="mb-2">
                  <Link href="/domestic-trips" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-[#D4AF37]">Domestic Trips</Link>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Link href="/destinations/leh-ladakh" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Leh Ladakh</Link>
                    <Link href="/destinations/spiti" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Spiti Valley</Link>
                    <Link href="/destinations/meghalaya" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Meghalaya</Link>
                    <Link href="/destinations/tawang" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Tawang</Link>
                  </div>
                </div>
                
                <div className="mb-2 mt-2">
                  <Link href="/international-trips" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-[#D4AF37]">International Trips</Link>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Link href="/trips/bali-explorer" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Bali</Link>
                    <Link href="/trips/thailand-adventure" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Thailand</Link>
                    <Link href="/trips/vietnam-journey" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#122822] bg-slate-50 hover:bg-slate-100">Vietnam</Link>
                  </div>
                </div>
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#122822] hover:bg-slate-50">Our Story</Link>
                <Link href="/blogs" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#122822] hover:bg-slate-50">Blog</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#122822] hover:bg-slate-50">Contact Us</Link>
                
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="mx-4 flex items-center justify-center gap-2 rounded-xl bg-[#122822] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    <User className="h-4 w-4" /> Account Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
