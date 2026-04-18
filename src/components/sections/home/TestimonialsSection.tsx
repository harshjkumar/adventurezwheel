'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import { testimonials } from '@/data/home';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="bg-white px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#122822]/50">
            Testimonials
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none text-[#122822]">
            What travelers say
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-sm border border-slate-100 bg-[#faf7f2] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <Quote className="mb-3 h-6 w-6 text-[#122822]/20" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${
                      j < t.rating ? 'fill-[#122822] text-[#122822]' : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">&ldquo;{t.comment}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#122822]">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.trip}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="rounded-sm border border-slate-100 bg-[#faf7f2] p-6">
            <Quote className="mb-3 h-6 w-6 text-[#122822]/20" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${
                    j < testimonials[current].rating ? 'fill-[#122822] text-[#122822]' : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              &ldquo;{testimonials[current].comment}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={testimonials[current].avatar} alt={testimonials[current].name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#122822]">{testimonials[current].name}</div>
                <div className="text-xs text-slate-500">{testimonials[current].trip}</div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#122822] hover:text-[#122822]">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-[#122822]' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
            <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#122822] hover:text-[#122822]">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
