'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Users, Award, MapPin, Headphones, CreditCard, Mountain, Star, ArrowRight } from 'lucide-react';

const reasons = [
  { icon: Mountain, title: 'Expert Local Guides', desc: 'Our guides are locals who know every trail, pass, and hidden gem in the region.' },
  { icon: Shield, title: 'Safety First', desc: 'Every trip includes safety briefings, first-aid kits, oxygen cylinders, and emergency protocols.' },
  { icon: Users, title: 'Small Group Sizes', desc: 'We keep groups between 8-20 travelers for more intimate and authentic experiences.' },
  { icon: CreditCard, title: 'Transparent Pricing', desc: 'No hidden costs. What you see is what you pay. All-inclusive pricing with no surprises.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock assistance before, during, and after your trip.' },
  { icon: Star, title: 'Handpicked Stays', desc: 'Carefully selected hotels, camps, and homestays for comfort and authenticity.' },
  { icon: MapPin, title: 'Offbeat Routes', desc: 'We go beyond the tourist trail to show you the real, untouched beauty of each destination.' },
  { icon: Award, title: 'Trusted by Thousands', desc: 'Hundreds of 5-star reviews and a community of repeat travelers who trust us.' },
];

export default function WhyUsPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG" alt="Why choose us" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Why Choose Us</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Why Adventures Wheel?
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Here&apos;s what sets us apart and makes us the preferred choice for adventurous travelers.
          </p>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group rounded-2xl border border-slate-100 bg-[#f8f9fa] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#122822]/10 text-[#122822] transition-all duration-300 group-hover:bg-[#122822] group-hover:text-white">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#122822]">{r.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#122822] px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[1440px] text-center text-white">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] leading-tight">
            Convinced? Let&apos;s plan your trip.
          </h2>
          <p className="mt-4 text-lg text-white/80">Browse our curated trips or reach out to our team.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/trips" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#122822] transition-all hover:bg-slate-50">
              Explore Trips <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
