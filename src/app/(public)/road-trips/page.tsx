import Image from 'next/image';
import Link from 'next/link';
import { getTrips } from '@/lib/queries';
import { MapPin, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epic Road Trips — Adventures Wheel',
  description: 'Discover curated road trip expeditions across India\'s most dramatic landscapes. From Ladakh\'s high passes to Meghalaya\'s living root bridges.',
};

function getLocationTag(region: string) {
  const r = region.toLowerCase();
  if (r.includes('leh') || r.includes('ladakh')) return 'Leh';
  if (r.includes('spiti')) return 'Spiti';
  if (r.includes('meghalaya')) return 'Meghalaya';
  if (r.includes('arunachal') || r.includes('tawang')) return 'Tawang';
  return region;
}

export default async function RoadTripsPage() {
  const allTrips = await getTrips();
  const domesticTrips = allTrips
    .filter((t: any) => {
      const hasRoadTripTag = t.trip_tags?.some((tag: any) => tag.tag_type === 'category' && tag.tag_value === 'Road Trip');
      const catLabel = (t.category_label || '').toLowerCase();
      return hasRoadTripTag || catLabel === 'road trip' || catLabel === 'domestic';
    })
    .map((trip: any) => {
      const prices = trip.trip_pricing?.map((p: any) => p.price) || [0];
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      return { ...trip, minPrice };
    });

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image src="/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG" alt="Road Trips" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/20 via-[#122822]/50 to-[#122822]/85" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1440px] flex-col justify-end px-6 pb-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#D4AF37] mb-3">Adventures Wheel</p>
          <h1 className="max-w-4xl text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white font-normal" style={{ fontFamily: '"vaccine", serif' }}>
            Epic Road Trips
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
            Hit the open road and experience India&apos;s most dramatic landscapes — from the world&apos;s highest motorable passes in Ladakh to the living root bridges of Meghalaya. Every journey is planned by experts, led by experience, and felt for life.
          </p>
        </div>
      </section>

      {/* Trip Cards Grid */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#122822]/40 mb-2">Choose Your Adventure</p>
            <h2 className="text-4xl text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
              {domesticTrips.length} Road Trip Expeditions
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {domesticTrips.map((trip: any) => (
              <Link
                key={trip.slug}
                href={`/trips/${trip.slug}`}
                className="group relative flex flex-col h-full overflow-hidden bg-[#eaeff2] rounded-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-200/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={trip.hero_image || trip.cover_image || '/placeholder.jpg'} alt={trip.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-sm bg-[#122822]/80 backdrop-blur-sm px-2.5 py-1 z-10">
                    <MapPin size={10} className="text-[#D4AF37]" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white">{getLocationTag(trip.region)}</span>
                  </div>
                  {trip.badge && (
                    <span className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm z-10">
                      {trip.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-6 py-6 font-sans">
                  <h3 className="text-2xl font-normal tracking-tight leading-tight text-[#0f211c]" style={{ fontFamily: '"vaccine", serif' }}>
                    {trip.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-widest text-[#0f211c]">
                    <span className="rounded-sm border border-[#0f211c]/30 bg-white/40 px-2.5 py-1 font-semibold flex items-center gap-1.5">
                      <Clock size={10} /> {trip.duration_days}D / {trip.duration_nights}N
                    </span>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t-2 border-dotted border-[#0f211c]/20 pt-5">
                      <div>
                        <div className="text-[11px] text-[#0f211c]/50 font-bold uppercase tracking-widest" style={{ fontFamily: '"vaccine", serif' }}>From</div>
                        <div className="text-2xl font-bold tracking-tight text-[#0f211c]" style={{ fontFamily: '"vaccine", serif' }}>
                          ₹{trip.minPrice.toLocaleString('en-IN')}*
                        </div>
                      </div>
                      <span className="px-6 py-3 bg-[#122822] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-md transition-all group-hover:bg-[#1d3d35]" style={{ fontFamily: '"vaccine", serif' }}>
                        View Trip
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
