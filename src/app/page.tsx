import { Homepage } from '@/components/homepage';
import { getFeaturedTrips, getHeroSlides } from '@/lib/queries';

export default async function HomePage() {
  const [dbFeaturedTrips, dbHeroSlides] = await Promise.all([
    getFeaturedTrips(),
    getHeroSlides(),
  ]);

  const mappedFeaturedTrips = dbFeaturedTrips.map((trip: any) => {
    const prices = trip.trip_pricing?.map((p: any) => p.price) || [0];
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    
    return {
      id: trip.id,
      slug: trip.slug,
      title: trip.title,
      badge: trip.badge,
      image: trip.hero_image || trip.cover_image || '/placeholder.jpg',
      price: minPrice,
      stats: [`${trip.duration_days} Days`, `${trip.duration_nights} Nights`],
    };
  });

  const mappedHeroSlides = dbHeroSlides.length > 0 
    ? dbHeroSlides.map((slide: any) => ({
        image: slide.image,
        title: slide.title,
        subtitle: slide.subtitle,
      }))
    : [];

  return <Homepage featuredTrips={mappedFeaturedTrips} heroSlides={mappedHeroSlides} />;
}