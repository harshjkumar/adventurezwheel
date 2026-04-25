'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { footerLinks } from '@/data/home';

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function Footer() {
  return (
    <footer>
      {/* Banner before footer */}
      <div className="w-full bg-[#122822] pt-16 pb-8 text-center px-4">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-normal tracking-tight bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent" 
          style={{ fontFamily: '"vaccine", serif' }}
        >
          Take Memories, Leave Respect.
        </h2>
      </div>

      {/* Footer links — NO "Ready to explore?" CTA */}
      <div className="bg-[#122822] px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo/Artboard 2@3x-8.png"
                  alt="Adventures Wheel"
                  width={220}
                  height={70}
                  className="h-20 w-auto"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
                Adventures Wheel — Navigator by Soul. We create unforgettable adventure experiences across the most beautiful destinations in India.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Phone className="h-4 w-4 text-white/70" />
                  <span>+91 70157 60563</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Mail className="h-4 w-4 text-white/70" />
                  <span>explore@adventureswheel.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <MapPin className="h-4 w-4 text-white/70" />
                  <span>India</span>
                </div>
              </div>
            </div>

            {/* Adventures */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">Adventures</h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.adventures.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">Company</h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">Support</h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Adventures Wheel. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((s) => {
                const Icon = socialIcons[s.icon] || Facebook;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-white/30 hover:text-white"
                    aria-label={s.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
