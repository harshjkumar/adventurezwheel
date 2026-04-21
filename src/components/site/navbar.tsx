'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Menu, X, Globe, Map, Navigation, Compass, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [domesticDestinations, setDomesticDestinations] = useState<any[]>([]);
  const [internationalDestinations, setInternationalDestinations] = useState<any[]>([]);
  
  const [isDomesticHovered, setIsDomesticHovered] = useState(false);
  const [isInternationalHovered, setIsInternationalHovered] = useState(false);
  const [hoveredDestImage, setHoveredDestImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isLightBgPage = pathname.includes('/book') || pathname.includes('/admin') || pathname.includes('/dashboard') || pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/contact');
  
  const useDarkText = isScrolled || !isHome || isLightBgPage;
  const textColorClass = useDarkText ? 'text-[#122822]' : 'text-white';
  const strokeColorClass = useDarkText ? 'bg-[#122822]' : 'bg-white';
  const logoGreen = '#122822';

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setDomesticDestinations(data.domestic || []);
        setInternationalDestinations(data.international || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Auth Listener
  useEffect(() => {
    const initAuth = async () => {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setUser(data.user);
          setIsAdmin(data.user.email?.toLowerCase() === 'amit@adventureswheel.com');
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        setIsAdmin(session?.user?.email?.toLowerCase() === 'amit@adventureswheel.com');
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
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
  }, [pathname]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 py-2' : 'bg-transparent py-4'
      }`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`relative transition-all duration-500 ${isScrolled || !isHome ? 'h-12 w-48' : 'h-20 w-64'}`}>
              <Image
                src="/logo/Artboard 1@3x-8.png"
                alt="Adventures Wheel Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-12 text-[16px] font-medium tracking-widest ${textColorClass}`} style={{ fontFamily: '"vaccine", serif' }}>
            {/* Domestic */}
            <div
              className="relative py-4"
              onMouseEnter={() => setIsDomesticHovered(true)}
              onMouseLeave={() => setIsDomesticHovered(false)}
            >
              <Link href="/domestic-trips" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
                Domestic <ChevronDown size={12} className={`transition-transform duration-300 ${isDomesticHovered ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* International */}
            <div
              className="relative py-4"
              onMouseEnter={() => setIsInternationalHovered(true)}
              onMouseLeave={() => setIsInternationalHovered(false)}
            >
              <Link href="/international-trips" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
                International <ChevronDown size={12} className={`transition-transform duration-300 ${isInternationalHovered ? 'rotate-180' : ''}`} />
              </Link>
            </div>

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
                  useDarkText 
                    ? 'bg-[#122822] text-white hover:shadow-lg hover:shadow-[#122822]/20' 
                    : 'bg-white text-[#122822] hover:shadow-lg hover:shadow-white/20'
                }`}
                style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className={`hidden md:block rounded-full px-12 py-3.5 text-[14px] tracking-widest transition-all duration-300 active:scale-95 ${
                  useDarkText 
                    ? 'bg-[#122822] text-white hover:shadow-lg hover:shadow-[#122822]/20' 
                    : 'bg-white text-[#122822] hover:shadow-lg hover:shadow-white/20'
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

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {(isDomesticHovered || isInternationalHovered) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full w-full bg-[#fcfaf7] shadow-2xl border-t border-[#122822]/5"
              onMouseEnter={() => isDomesticHovered ? setIsDomesticHovered(true) : setIsInternationalHovered(true)}
              onMouseLeave={() => { setIsDomesticHovered(false); setIsInternationalHovered(false); }}
            >
              <div className="mx-auto max-w-[1440px] flex overflow-hidden min-h-[400px]">
                {/* Left: Featured Image */}
                <div className="relative w-1/3 overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredDestImage || (isDomesticHovered ? "domestic-default" : "international-default")}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={hoveredDestImage || (isDomesticHovered ? "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1528181304800-2f140819898f?q=80&w=2070&auto=format&fit=crop")}
                        alt="Featured"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <span className="text-white/70 text-[12px] uppercase tracking-[0.4em] mb-2" style={{ fontFamily: '"vaccine", serif', fontWeight: 400 }}>Featured Selection</span>
                    <h3 className="text-white text-5xl leading-tight" style={{ fontFamily: '"vaccine", serif', fontWeight: 700 }}>
                      {isDomesticHovered ? "Untamed Himalayas" : "Tropical Escapes"}
                    </h3>
                  </div>
                </div>

                {/* Right: Destination List */}
                <div className="flex-1 px-16 py-16 grid grid-cols-2 gap-x-12">
                  <div>
                    <h4 className="text-[#122822]/40 text-[12px] uppercase tracking-[0.5em] mb-8" style={{ fontFamily: '"vaccine", serif', fontWeight: 400 }}>Popular Destinations</h4>
                    <div className="flex flex-col gap-5">
                      {(isDomesticHovered ? domesticDestinations : internationalDestinations).map((dest) => (
                        <Link
                          key={dest.name}
                          href={dest.href}
                          onMouseEnter={() => setHoveredDestImage(dest.image)}
                          onMouseLeave={() => setHoveredDestImage(null)}
                          className="group flex items-center justify-between border-b border-[#122822]/5 pb-3 transition-all hover:border-[#122822]/20"
                        >
                          <span className="text-3xl text-[#122822] transition-all group-hover:translate-x-2" style={{ fontFamily: '"vaccine", serif' }}>
                            {dest.name}
                          </span>
                          <ChevronRight size={16} className="text-[#122822]/20 transition-all group-hover:text-[#D4AF37] group-hover:translate-x-1" />
                        </Link>
                      ))}
                      {(isDomesticHovered ? domesticDestinations : internationalDestinations).length === 0 && (
                        <p className="text-[#122822]/40" style={{ fontFamily: '"vaccine", serif' }}>No destinations found.</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-l border-[#122822]/10 pl-12">
                    <div>
                      <h4 className="text-[#122822]/40 text-[12px] uppercase tracking-[0.5em] mb-6" style={{ fontFamily: '"vaccine", serif', fontWeight: 400 }}>Why Travel With Us</h4>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-lg text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
                          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Expert Local Captains
                        </li>
                        <li className="flex items-center gap-3 text-lg text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
                          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Boutique Accommodations
                        </li>
                        <li className="flex items-center gap-3 text-lg text-[#122822]/70" style={{ fontFamily: '"vaccine", serif' }}>
                          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Small Group Dynamics
                        </li>
                      </ul>
                    </div>
                    
                    <Link 
                      href={isDomesticHovered ? '/trips?type=domestic' : '/trips?type=international'} 
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

      {/* Full Screen Overlay Menu */}
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
                  {[
                    { label: 'Domestic Trips', href: '/trips?type=domestic' },
                    { label: 'International Trips', href: '/trips?type=international' },
                    { label: 'Blog and News', href: '/blogs' },
                    { label: 'Our Story', href: '/about' },
                    { label: 'FAQ', href: '/faq' },
                    { label: 'Policies', href: '/policies' },
                    { label: 'Contact Us', href: '/contact' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
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
