'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, X, ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [domesticDestinations, setDomesticDestinations] = useState<any[]>([]);
  const [internationalDestinations, setInternationalDestinations] = useState<any[]>([]);
  const [roadTrips, setRoadTrips] = useState<any[]>([]);

  useEffect(() => {
    // Fetch trips to populate the dropdown menus dynamically
    async function fetchDestinations() {
      try {
        const res = await fetch('/api/public/destinations');
        if (res.ok) {
          const data = await res.json();
          setDomesticDestinations(data.domestic || []);
          setInternationalDestinations(data.international || []);
          setRoadTrips(data.roadTrips || []);
        }
      } catch (err) {
        console.error('Failed to fetch destinations', err);
      }
    }
    fetchDestinations();
  }, []);
  const [isDomesticHovered, setIsDomesticHovered] = useState(false);
  const [isInternationalHovered, setIsInternationalHovered] = useState(false);
  const [isRoadTripHovered, setIsRoadTripHovered] = useState(false);
  const [hoveredDestImage, setHoveredDestImage] = useState<string | null>(null);
  const [hoveredDestTagline, setHoveredDestTagline] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isLightBgPage = pathname.includes('/book') || pathname.includes('/admin') || pathname.includes('/dashboard') || pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/contact');
  
  const useDarkText = isScrolled || !isHome || isLightBgPage;
  const textColorClass = useDarkText ? 'text-[#122822]' : 'text-white';
  const strokeColorClass = useDarkText ? 'bg-[#122822]' : 'bg-white';

  // Auth Listener
  useEffect(() => {
    const initAuth = async () => {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) { setUser(data.user); setIsAdmin(data.user.email?.toLowerCase() === 'amit@adventureswheel.com'); }
      });
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        setIsAdmin(session?.user?.email?.toLowerCase() === 'amit@adventureswheel.com');
      });
      return () => { authListener.subscription.unsubscribe(); };
    };
    initAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDomesticHovered(false);
    setIsInternationalHovered(false);
    setIsRoadTripHovered(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Which dropdown is active
  const activeDropdown = isDomesticHovered ? 'domestic' : isInternationalHovered ? 'international' : isRoadTripHovered ? 'roadTrip' : null;
  const activeDestinations = activeDropdown === 'domestic' ? domesticDestinations : activeDropdown === 'international' ? internationalDestinations : roadTrips;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 py-2' : 'bg-transparent py-4'
      }`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`relative transition-all duration-500 ${isScrolled || !isHome ? 'h-10 w-36 sm:h-12 sm:w-48' : 'h-12 w-40 sm:h-20 sm:w-64'}`}>
              <Image src="/logo/Artboard 1@3x-8.png" alt="Adventures Wheel Logo" fill className="object-contain object-left lg:object-center" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-10 text-[15px] font-medium tracking-widest ${textColorClass}`} style={{ fontFamily: '"vaccine", serif' }}>
            {/* Domestic with dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => { setIsDomesticHovered(true); setIsInternationalHovered(false); }}
              onMouseLeave={() => setIsDomesticHovered(false)}
            >
              <Link href="/trips?tab=Domestic" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
                Domestic <ChevronDown size={12} className={`transition-transform duration-300 ${isDomesticHovered ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* International with dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => { setIsInternationalHovered(true); setIsDomesticHovered(false); }}
              onMouseLeave={() => setIsInternationalHovered(false)}
            >
              <Link href="/trips?tab=International" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
                International <ChevronDown size={12} className={`transition-transform duration-300 ${isInternationalHovered ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Bike Trip — links to Road Trips page with dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => { setIsRoadTripHovered(true); setIsDomesticHovered(false); setIsInternationalHovered(false); }}
              onMouseLeave={() => setIsRoadTripHovered(false)}
            >
              <Link href="/trips?tab=Road+Trip" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
                Bike Trip <ChevronDown size={12} className={`transition-transform duration-300 ${isRoadTripHovered ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <Link href="/about" className="transition-opacity hover:opacity-70">About Us</Link>
            <Link href="/contact" className="transition-opacity hover:opacity-70">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className={`flex items-center gap-6 ${textColorClass}`}>
            <button aria-label="Search" className="hidden sm:block transition-all hover:scale-110">
              <Search size={20} />
            </button>
            
            {user ? (
              <Link
                href={isAdmin ? "/admin" : "/dashboard"}
                className={`hidden md:block rounded-full px-12 py-3.5 text-[14px] tracking-widest transition-all duration-300 active:scale-95 ${
                  useDarkText ? 'bg-[#122822] text-white hover:shadow-lg hover:shadow-[#122822]/20' : 'bg-white text-[#122822] hover:shadow-lg hover:shadow-white/20'
                }`}
                style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className={`hidden md:block rounded-full px-12 py-3.5 text-[14px] tracking-widest transition-all duration-300 active:scale-95 ${
                  useDarkText ? 'bg-[#122822] text-white hover:shadow-lg hover:shadow-[#122822]/20' : 'bg-white text-[#122822] hover:shadow-lg hover:shadow-white/20'
                }`}
                style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}
              >
                Login
              </Link>
            )}

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 transition-all duration-300 ${strokeColorClass} ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : 'group-hover:w-8'}`}></span>
              <span className={`block w-8 h-0.5 transition-all duration-300 ${strokeColorClass} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 transition-all duration-300 ${strokeColorClass} ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : 'group-hover:w-8'}`}></span>
            </button>
          </div>
        </div>

        {/* ── Mega Menu Dropdown (Domestic or International) ── */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full w-full bg-[#fcfaf7] shadow-2xl border-t border-[#122822]/5"
              onMouseEnter={() => activeDropdown === 'domestic' ? setIsDomesticHovered(true) : activeDropdown === 'international' ? setIsInternationalHovered(true) : setIsRoadTripHovered(true)}
              onMouseLeave={() => { setIsDomesticHovered(false); setIsInternationalHovered(false); setIsRoadTripHovered(false); setHoveredDestImage(null); setHoveredDestTagline(null); }}
            >
              <div className="mx-auto max-w-[1440px] flex overflow-hidden min-h-[320px]">
                {/* Left: Featured Image */}
                <div className="relative w-1/3 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredDestImage || `${activeDropdown}-default`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={hoveredDestImage || (activeDropdown === 'domestic' ? 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop' : activeDropdown === 'international' ? 'https://images.unsplash.com/photo-1528181304800-2f140819898f?q=80&w=2070&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')}
                        alt="Featured"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <span className="text-white/70 text-[12px] uppercase tracking-[0.4em] mb-2" style={{ fontFamily: '"vaccine", serif', fontWeight: 400 }}>
                      {hoveredDestTagline || 'Featured Selection'}
                    </span>
                    <h3 className="text-white text-4xl leading-tight" style={{ fontFamily: '"vaccine", serif', fontWeight: 700 }}>
                      {activeDropdown === 'domestic' ? 'Untamed Himalayas' : 'Tropical Escapes'}
                    </h3>
                  </div>
                </div>

                {/* Right: Destination List */}
                <div className="flex-1 px-12 py-10 grid grid-cols-2 gap-x-12">
                  <div>
                    <h4 className="text-[#122822]/40 text-[12px] uppercase tracking-[0.5em] mb-8" style={{ fontFamily: '"vaccine", serif', fontWeight: 400 }}>
                      {activeDropdown === 'domestic' ? 'Popular Destinations' : 'International Destinations'}
                    </h4>
                    <div className="flex flex-col gap-5">
                      {activeDestinations.map((dest) => (
                        <Link
                          key={dest.name}
                          href={dest.href}
                          onMouseEnter={() => { setHoveredDestImage(dest.image); setHoveredDestTagline(dest.tagline); }}
                          onMouseLeave={() => { setHoveredDestImage(null); setHoveredDestTagline(null); }}
                          className="group/item flex items-center justify-between border-b border-[#122822]/5 pb-3 transition-all hover:border-[#122822]/20"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin size={14} className="text-[#D4AF37] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            <div>
                              <span className="text-xl text-[#122822] transition-all group-hover/item:translate-x-2 block" style={{ fontFamily: '"vaccine", serif' }}>
                                {dest.name}
                              </span>
                              <span className="text-xs text-[#122822]/40" style={{ fontFamily: '"vaccine", serif' }}>{dest.tagline}</span>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-[#122822]/20 transition-all group-hover/item:text-[#D4AF37] group-hover/item:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-l border-[#122822]/10 pl-12">
                    <div>
                      <h4 className="text-[#122822]/40 text-[12px] uppercase tracking-[0.5em] mb-6" style={{ fontFamily: '"vaccine", serif', fontWeight: 400 }}>Why Travel With Us</h4>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-base text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
                          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Expert Local Captains
                        </li>
                        <li className="flex items-center gap-3 text-base text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
                          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Handpicked Scenic Routes
                        </li>
                        <li className="flex items-center gap-3 text-base text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
                          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Small Group Dynamics
                        </li>
                        {activeDropdown === 'domestic' ? (
                          <Link href="/trips?tab=Domestic" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#122822] hover:text-emerald-700 transition-colors uppercase mt-12">
                            View all domestic destinations <ArrowRight size={16} />
                          </Link>
                        ) : activeDropdown === 'international' ? (
                          <Link href="/trips?tab=International" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#122822] hover:text-emerald-700 transition-colors uppercase mt-12">
                            View all international destinations <ArrowRight size={16} />
                          </Link>
                        ) : (
                          <Link href="/trips?tab=Road+Trip" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#122822] hover:text-emerald-700 transition-colors uppercase mt-12">
                            View all bike trips <ArrowRight size={16} />
                          </Link>
                        )}
                      </ul>
                    </div>
                    
                    <Link 
                      href={activeDropdown === 'domestic' ? '/trips?tab=Domestic' : activeDropdown === 'international' ? '/trips?tab=International' : '/trips?tab=Road+Trip'}
                      className="mt-8 flex items-center justify-center gap-3 bg-[#122822] text-white py-5 rounded-xl text-[12px] uppercase tracking-[0.2em] transition-all hover:bg-[#1d3d35]"
                      style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}
                    >
                      Browse All Adventures <ArrowRight size={14} className="text-[#D4AF37]" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Full Screen Overlay / Hamburger Menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-[#122822] text-white"
          >
            <div className="flex h-24 items-center justify-between px-6 lg:px-12">
              <Link href="/">
                <div className="relative h-12 w-48">
                  <Image src="/logo/Artboard 1@3x-8.png" alt="Logo" fill className="object-contain brightness-0 invert" />
                </div>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-start pt-12 lg:pt-20 px-6 lg:px-24 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                <nav className="flex flex-col gap-4 lg:gap-6">
                  {/* All Trips */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Link href="/trips" className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight transition-all hover:text-[#D4AF37] hover:translate-x-4" style={{ fontFamily: '"vaccine", serif' }}>
                      All Trips
                    </Link>
                  </motion.div>

                  {/* Domestic — Expandable with locations */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <button 
                      onClick={() => setMobileExpanded(mobileExpanded === 'domestic' ? null : 'domestic')}
                      className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight transition-all hover:text-[#D4AF37] flex items-center gap-4"
                      style={{ fontFamily: '"vaccine", serif' }}
                    >
                      Domestic <ChevronDown size={28} className={`transition-transform duration-300 ${mobileExpanded === 'domestic' ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'domestic' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="flex flex-col gap-3 pl-6 pt-4 pb-2">
                            {domesticDestinations.map((dest, j) => (
                              <motion.div key={dest.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}>
                                <Link href={dest.href} className="flex items-center gap-3 text-2xl sm:text-3xl font-medium text-white/70 hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"vaccine", serif' }}>
                                  <MapPin size={16} className="text-[#D4AF37]" /> {dest.name}
                                  <span className="text-sm text-white/30 ml-2">{dest.tagline}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* International — Expandable */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <button 
                      onClick={() => setMobileExpanded(mobileExpanded === 'international' ? null : 'international')}
                      className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight transition-all hover:text-[#D4AF37] flex items-center gap-4"
                      style={{ fontFamily: '"vaccine", serif' }}
                    >
                      International <ChevronDown size={28} className={`transition-transform duration-300 ${mobileExpanded === 'international' ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'international' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="flex flex-col gap-3 pl-6 pt-4 pb-2">
                            {internationalDestinations.map((dest, j) => (
                              <motion.div key={dest.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}>
                                <Link href={dest.href} className="flex items-center gap-3 text-2xl sm:text-3xl font-medium text-white/70 hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"vaccine", serif' }}>
                                  <MapPin size={16} className="text-[#D4AF37]" /> {dest.name}
                                  <span className="text-sm text-white/30 ml-2">{dest.tagline}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Remaining Links */}
                  {[
                    { label: 'Bike Trip', href: '/road-trips' },
                    { label: 'Blog and News', href: '/blogs' },
                    { label: 'About Us', href: '/about' },
                    { label: 'FAQ', href: '/faq' },
                    { label: 'Policies', href: '/policies' },
                    { label: 'Contact Us', href: '/contact' },
                  ].map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}>
                      <Link
                        href={item.href}
                        className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight transition-all hover:text-[#D4AF37] hover:translate-x-4"
                        style={{ fontFamily: '"vaccine", serif' }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="flex flex-col justify-end gap-12 border-l border-white/10 pl-12 hidden lg:flex">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: '"vaccine", serif' }}>Connect with us</p>
                    <div className="flex flex-col gap-4 text-3xl font-light" style={{ fontFamily: '"vaccine", serif' }}>
                      <a href="https://www.instagram.com/adventureswheel/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37]">Instagram</a>
                      <a href="https://www.facebook.com/AdventuresWheel" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37]">Facebook</a>
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: '"vaccine", serif' }}>Inquiries</p>
                    <a href="mailto:explore@adventureswheel.com" className="text-3xl font-light hover:text-[#D4AF37]" style={{ fontFamily: '"vaccine", serif' }}>explore@adventureswheel.com</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
