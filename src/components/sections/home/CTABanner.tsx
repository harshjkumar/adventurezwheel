'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function CTABanner() {
    const [form, setForm] = useState({ name: '', phone: '', trip: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Adventures Wheel! I'm ${form.name}. ${form.trip ? `Interested in: ${form.trip}. ` : ''}${form.message || 'I want to know more about your trips.'}`;
    const url = `https://wa.me/917015760563?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="px-6 py-8 lg:px-12">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-sm bg-[#122822] shadow-[0_28px_90px_rgba(15,23,42,0.22)]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          {/* Form side */}
          <div className="flex items-center p-8 sm:p-10 lg:p-14">
            <div className="w-full max-w-md rounded-sm bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.16)]">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#122822]/50">
                Get in Touch
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[0.95] text-[#122822]">
                Plan your next adventure with us
              </h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#122822] focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#122822] focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822]"
                />
                <select
                  value={form.trip}
                  onChange={(e) => setForm({ ...form, trip: e.target.value })}
                  className="w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822]"
                >
                  <option value="">Select a trip</option>
                  <option>Leh Ladakh Expedition</option>
                  <option>Spiti Valley Circuit</option>
                  <option>Meghalaya Explorer</option>
                  <option>Tawang & Arunachal Circuit</option>
                  <option>Custom Trip</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#122822] focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822]"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1ebe5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </button>
              </form>
            </div>
          </div>

          {/* Video side */}
          <div className="relative min-h-[28rem] lg:min-h-[34rem] overflow-hidden flex items-center justify-center bg-[#0a1512]">
            <video
              src="https://pub-d188086126f842e88f76855b16e973b0.r2.dev/IMG_4061%20-%20Trim.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute w-auto h-[135%] max-w-none object-contain -rotate-90"
            />
            
            {/* Top Right Logo (moved further down into the frame) */}
            <div className="absolute top-16 right-6 lg:top-24 lg:right-10 z-10 w-24 lg:w-32 opacity-90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              <Image
                src="/logo/Artboard%201@3x-8.png"
                alt="Adventures Wheel Logo"
                width={200}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#122822]/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
