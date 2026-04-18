'use client';

import { motion } from 'framer-motion';
import { Search, CalendarDays, Backpack, Compass } from 'lucide-react';
import { howItWorks } from '@/data/home';

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  calendar: CalendarDays,
  backpack: Backpack,
  compass: Compass,
};

export function HowItWorks() {
  return (
    <section className="bg-[#122822] px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            How it works
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none text-white">
            Your adventure in 4 steps
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, i) => {
            const Icon = iconMap[item.icon] || Compass;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10">
                  <Icon className="h-8 w-8 text-white/80" />
                </div>
                <div className="mb-3 font-[family-name:var(--font-heading)] text-4xl font-light text-white/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
