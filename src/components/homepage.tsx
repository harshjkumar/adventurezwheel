'use client';

import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { WhereToNext } from '@/components/sections/home/WhereToNext';
import { FeaturedTrips } from '@/components/sections/home/FeaturedTrips';
import { TripShowcaseSlider } from '@/components/sections/home/TripShowcaseSlider';
import { HowItWorks } from '@/components/sections/home/HowItWorks';
import { StatsBanner } from '@/components/sections/home/StatsBanner';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { CTABanner } from '@/components/sections/home/CTABanner';

export function Homepage() {
  return (
    <main>
      <HeroSlider />
      <FeaturedTrips />
      <WhereToNext />
      <HowItWorks />
      <TripShowcaseSlider />
      <StatsBanner />
      <TestimonialsSection />
      <CTABanner />
    </main>
  );
}
