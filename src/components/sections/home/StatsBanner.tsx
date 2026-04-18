'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { aboutStats } from '@/data/home';

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [started, end, duration]);

  return { count, start: () => setStarted(true) };
}

function StatItem({ value, label }: { value: string; label: string }) {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const { count, start } = useCountUp(numericPart);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#122822]">
        {count}{suffix}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#122822]/40">
        {label}
      </div>
    </div>
  );
}

export function StatsBanner() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2] px-6 py-20 lg:px-12">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #122822 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {aboutStats.map((stat) => (
          <StatItem key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </motion.div>
    </section>
  );
}
