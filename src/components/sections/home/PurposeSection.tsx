'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mountain, Bike, Leaf, Users, Shield, Globe, Landmark } from 'lucide-react';

const purposeItems = [
  {
    title: 'Mountain Expeditions',
    icon: Mountain,
    description: 'Offbeat Himalayan journeys designed for real explorers — closer to nature, deeper into the mountains, and far from the crowds.',
    image: '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg'
  },
  {
    title: 'Bike Tours',
    icon: Bike,
    description: "Ride handpicked scenic routes with less traffic, more views, and stories built on roads we've personally explored.",
    image: '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG'
  },
  {
    title: 'Culture & Sustainability',
    icon: Leaf,
    description: 'Travel responsibly — supporting local communities, preserving cultures, and keeping mountains, villages, and sacred places clean.',
    image: '/meghalaya/d48f752a-da21-4788-b9f8-1146ca64ad3a.webp'
  },
  {
    title: 'Community Journeys',
    icon: Users,
    description: 'Find your tribe on the road. We bring together like-minded travelers and turn journeys into shared stories and lifelong connections.',
    image: '/img/IMG_9426.JPG.jpeg'
  },
  {
    title: 'Transparent Travel',
    icon: Shield,
    description: 'What you see is what you get — real routes, honest pricing, and experiences exactly as promised.',
    image: '/cc934709-69bd-4eeb-9f70-83aa1636c9ee.JPG'
  }
];

const bottomItems = [
  { title: 'Sustainable Travel', desc: 'Keeping mountains & villages clean', icon: Leaf },
  { title: 'Empowering Local', desc: 'Supporting communities & livelihoods', icon: Users },
  { title: 'Respecting the Sacred', desc: 'Protecting culture & nature', icon: Landmark },
  { title: 'Transparent Travel', desc: 'No hidden surprises, just real experiences', icon: Shield },
  { title: 'Travel with Purpose', desc: 'Every journey leaves an impact', icon: Globe }
];

export function PurposeSection() {
  return (
    <section className="w-full bg-[#fcfcfc] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Mountain size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ fontFamily: '"vaccine", serif' }}>What Drives Us</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-[#122822]">
              Journeys with Purpose
            </h2>
            <div className="mt-6 max-w-2xl space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-[#122822]/60">Real routes. Real people. Real stories.</p>
              <p className="text-lg leading-relaxed text-slate-500 font-light">
                We design meaningful travel experiences that connect people, respect nature, and create a positive impact everywhere we go.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 5-Column Square Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {purposeItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex aspect-square flex-col overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Top Half: Content */}
              <div className="flex h-1/2 flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 rounded-full bg-slate-50 p-3 text-[#122822] transition-colors group-hover:bg-[#122822] group-hover:text-white">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl leading-tight text-[#122822]">
                  {item.title}
                </h3>
                <div className="mt-2 h-0 opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100">
                  <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Explore More</p>
                </div>
              </div>

              {/* Bottom Half: Image */}
              <div className="relative h-1/2 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-125"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-[#122822]/10 transition-opacity group-hover:opacity-0" />
              </div>

              {/* Tooltip-like description on hover (optional, but keep it clean) */}
              <div className="absolute inset-0 z-20 flex translate-y-full flex-col items-center justify-center bg-[#122822]/95 p-6 text-center transition-transform duration-500 group-hover:translate-y-0">
                <item.icon size={32} className="mb-4 text-[#D4AF37]" />
                <h3 className="mb-3 font-[family-name:var(--font-heading)] text-xl text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/80 font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-slate-100 bg-white p-2 shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 lg:grid-cols-5 sm:divide-x sm:divide-y-0">
            {bottomItems.map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-6 transition-colors hover:bg-slate-50/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[#122822]">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#122822]">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Journey Tag */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-slate-100 lg:w-24" />
          <div className="flex items-center gap-3 text-[13px] font-medium text-slate-400">
            <Globe size={14} className="text-[#D4AF37]" />
            <p>
              Journey across <span className="font-bold text-[#122822]">India</span> and <span className="font-bold text-[#122822]">beyond</span> — from the Himalayas to <span className="font-bold text-[#D4AF37]">Bali</span>, <span className="font-bold text-[#D4AF37]">Vietnam</span>, and <span className="font-bold text-[#D4AF37]">Thailand</span>.
            </p>
          </div>
          <div className="h-[1px] w-12 bg-slate-100 lg:w-24" />
        </div>
      </div>
    </section>
  );
}
