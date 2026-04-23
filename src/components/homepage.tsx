'use client';

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
      <QuoteSection />
      <FeaturedTrips trips={featuredTrips} />
      <WhereToNext />
      <CTABanner />
      <AboutStory />
      <TripShowcaseSlider />
      <StatsBanner />
      <TestimonialsSection />
    </main>
  );
}
