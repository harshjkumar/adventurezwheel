import Image from 'next/image';
import Link from 'next/link';
import { destinationCards } from '@/data/home';

export default function DestinationsPage() {
  return (
    <main id="main-content" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700">Our Destinations</p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(3rem,6vw,5.5rem)] leading-none text-[#122822]">
            Explore the world with us
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Seven distinct travel divisions covering every corner of the globe.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinationCards.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2 className="font-[family-name:var(--font-heading)] text-[2rem] font-semibold leading-tight text-white">
                    {dest.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}