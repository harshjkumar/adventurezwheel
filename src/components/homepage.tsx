'use client';
import { motion } from 'framer-motion';

import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { QuoteSection } from '@/components/sections/home/QuoteSection';
import { WhereToNext } from '@/components/sections/home/WhereToNext';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { FeaturedTrips } from '@/components/sections/home/FeaturedTrips';
import { AboutStory } from '@/components/sections/home/AboutStory';
import { TripShowcaseSlider } from '@/components/sections/home/TripShowcaseSlider';
import { StatsBanner } from '@/components/sections/home/StatsBanner';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';

export function Homepage({ featuredTrips, heroSlides }: { featuredTrips: any[], heroSlides: any[] }) {
  return (
    <main>
      <HeroSlider initialSlides={heroSlides} />
      {/* Background container for the glowing orb */}
      <div className="relative w-full overflow-hidden">
        {/* Animated glowing ball */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              x: ['0%', '150%', '-50%', '0%'],
              y: ['0%', '800px', '1600px', '0%'],
              scale: [1, 1.5, 0.8, 1],
              backgroundColor: [
                'rgba(52, 211, 153, 0.2)', // emerald
                'rgba(163, 230, 53, 0.2)', // lime
                'rgba(250, 204, 21, 0.2)', // yellow
                'rgba(45, 212, 191, 0.2)', // teal
                'rgba(52, 211, 153, 0.2)', // emerald
              ]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full blur-[120px] mix-blend-normal"
          />
        </div>

        {/* Content with higher z-index to appear above the background but let the light bleed through if backgrounds are slightly transparent */}
        <div className="relative z-10">
          <QuoteSection />
          <FeaturedTrips trips={featuredTrips} />
          <WhereToNext />
          <CTABanner />
        </div>
      </div>
      <AboutStory />
      <TripShowcaseSlider />
      <StatsBanner />
      <TestimonialsSection />
    </main>
  );
}
