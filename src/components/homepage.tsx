'use client';

import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { WhereToNext } from '@/components/sections/home/WhereToNext';
import { FeaturedTrips } from '@/components/sections/home/FeaturedTrips';
import { AboutStory } from '@/components/sections/home/AboutStory';
import { TripShowcaseSlider } from '@/components/sections/home/TripShowcaseSlider';
import { StatsBanner } from '@/components/sections/home/StatsBanner';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { CTABanner } from '@/components/sections/home/CTABanner';

export function Homepage({ featuredTrips, heroSlides }: { featuredTrips: any[], heroSlides: any[] }) {
  return (
    <main>
      <HeroSlider initialSlides={heroSlides} />
      <FeaturedTrips trips={featuredTrips} />
      <WhereToNext />
      <AboutStory />
      <TripShowcaseSlider />
      <StatsBanner />
      <TestimonialsSection />
      <CTABanner />
    </main>
  );
}
