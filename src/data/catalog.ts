export type TripCardData = {
  title: string;
  slug: string;
  category: string;
  duration: string;
  difficulty: string;
  price: string;
  image: string;
  description: string;
};

export type DestinationCardData = {
  title: string;
  slug: string;
  region: string;
  tripCount: string;
  bestFor: string;
  image: string;
  description: string;
};

export const tripCatalog: TripCardData[] = [
  {
    title: 'Authentic Andalusia & stay at the Bajondillo',
    slug: 'authentic-andalusia-bajondillo',
    category: 'Cruise',
    duration: '18 days',
    difficulty: 'Easy',
    price: '$5,599*',
    image:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
    description: 'Sunlit coastal towns, local flavors, and comfortable pacing with premium stays.',
  },
  {
    title: 'Hotel Giosuè a Mare',
    slug: 'hotel-giosue-a-mare',
    category: 'Stay',
    duration: '13 days',
    difficulty: 'Moderate',
    price: '$4,499*',
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80',
    description: 'A slow, elegant itinerary with waterfront views and curated regional visits.',
  },
  {
    title: 'Secrets of Peru',
    slug: 'secrets-of-peru',
    category: 'Circuit',
    duration: '18 days',
    difficulty: 'Moderate',
    price: '$7,199*',
    image:
      'https://images.unsplash.com/photo-1526401485004-2fda9f0f6a51?auto=format&fit=crop&w=1600&q=80',
    description: 'An immersive route through highland landscapes, culture, and heritage cities.',
  },
  {
    title: 'The Romantic Rhine & Switzerland',
    slug: 'romantic-rhine-switzerland',
    category: 'Cruise',
    duration: '14 days',
    difficulty: 'Easy',
    price: '$8,499*',
    image:
      'https://images.unsplash.com/photo-1475688621402-4257c812d4d0?auto=format&fit=crop&w=1600&q=80',
    description: 'Riverfront cities, mountain views, and polished hospitality throughout.',
  },
  {
    title: 'Beautiful Japan',
    slug: 'beautiful-japan',
    category: 'Circuit',
    duration: '12 days',
    difficulty: 'Moderate',
    price: '$8,799*',
    image:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    description: 'Seasonal gardens, historic streets, and high-touch local travel planning.',
  },
  {
    title: 'British charms',
    slug: 'british-charms',
    category: 'Circuit',
    duration: '12 days',
    difficulty: 'Easy',
    price: '$8,799*',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80',
    description: 'Classic city stops balanced with calm countryside moments and premium stays.',
  },
] as const;

export const destinationCatalog: DestinationCardData[] = [
  {
    title: 'Africa',
    slug: 'africa',
    region: 'Wildlife and coastlines',
    tripCount: '18 trips',
    bestFor: 'Safaris and iconic landscapes',
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80',
    description: 'Big scenery, warm hospitality, and routes that balance comfort with adventure.',
  },
  {
    title: 'Asia',
    slug: 'asia',
    region: 'Culture and design',
    tripCount: '24 trips',
    bestFor: 'Cities, temples, and food',
    image:
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80',
    description: 'A broad range of journeys from quiet cultural exploration to vibrant urban escapes.',
  },
  {
    title: 'Central America & the Caribbean',
    slug: 'central-america-caribbean',
    region: 'Coast and color',
    tripCount: '15 trips',
    bestFor: 'Island time and warm water',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    description: 'Bright coastlines, relaxed pace, and destination blends that feel easy to love.',
  },
  {
    title: 'Northern Europe',
    slug: 'northern-europe',
    region: 'Scenic and refined',
    tripCount: '13 trips',
    bestFor: 'Cities, fjords, and culture',
    image:
      'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=1600&q=80',
    description: 'Clean design, panoramic landscapes, and polished touring throughout the north.',
  },
] as const;

export const filters = ['Featured', 'Adventure', 'Cruise', 'Stay', 'Circuit'] as const;
