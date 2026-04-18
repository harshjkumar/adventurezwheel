'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 99999 99999', href: 'tel:+919999999999' },
  { icon: Mail, label: 'Email', value: 'hello@adventureswheel.com', href: 'mailto:hello@adventureswheel.com' },
  { icon: MapPin, label: 'Address', value: 'India' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10AM–7PM IST' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const msg = `Hi Adventures Wheel! I'm ${data.get('name')}. Email: ${data.get('email')}. ${data.get('trip') ? `Interested in: ${data.get('trip')}. ` : ''}${data.get('message') || 'I want to know more about your trips.'}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/4713b9ed-a70e-4b71-a908-616b774b014a.JPG" alt="Contact us" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Contact</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Get in touch
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Have a question or want to plan a custom trip? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
            {/* Left — Contact info */}
            <motion.div variants={fadeIn} className="space-y-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-[#f8f9fa] p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2596be]/10 text-[#2596be]">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block text-[#122822] transition-colors hover:text-[#2596be]">{c.value}</a>
                    ) : (
                      <p className="mt-1 text-[#122822]">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999?text=Hi%20Adventures%20Wheel%2C%20I%20would%20like%20to%20know%20more%20about%20your%20trips."
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1ebe5a]"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Right — Form */}
            <motion.div variants={fadeIn}>
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-2xl border border-[#2596be]/20 bg-[#2596be]/5 p-12 text-center">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2596be] text-white">
                      <Send className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-[#122822]">Message sent!</h3>
                    <p className="mt-3 text-slate-600">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleWhatsApp}
                  className="space-y-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)]"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Name *</label>
                      <input required name="name" type="text" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm focus:border-[#2596be] focus:outline-none focus:ring-1 focus:ring-[#2596be]" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email *</label>
                      <input required name="email" type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm focus:border-[#2596be] focus:outline-none focus:ring-1 focus:ring-[#2596be]" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Phone</label>
                    <input name="phone" type="tel" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm focus:border-[#2596be] focus:outline-none focus:ring-1 focus:ring-[#2596be]" placeholder="+91 99999 99999" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trip Interest</label>
                    <select name="trip" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 focus:border-[#2596be] focus:outline-none focus:ring-1 focus:ring-[#2596be]">
                      <option value="">Select a trip or destination</option>
                      <option>Leh Ladakh Expedition</option>
                      <option>Spiti Valley Circuit</option>
                      <option>Kashmir Paradise Tour</option>
                      <option>Manali to Leh Highway</option>
                      <option>Custom Trip</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Message *</label>
                    <textarea required name="message" rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm focus:border-[#2596be] focus:outline-none focus:ring-1 focus:ring-[#2596be]" placeholder="Tell us about your dream trip..." />
                  </div>
                  <button type="submit" className="w-full rounded-xl bg-[#2596be] px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all hover:bg-[#1d7a9c]">
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}