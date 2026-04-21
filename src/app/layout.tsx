import type { Metadata } from 'next';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { ScrollToTop } from '@/components/site/scroll-to-top';
import { WhatsAppButton } from '@/components/site/WhatsAppButton';
import './globals.css';

// Fonts are loaded via Adobe Typekit in the <head>

export const metadata: Metadata = {
  metadataBase: new URL('https://adventureswheel.com'),
  title: {
    default: 'Adventures Wheel — Curated Travel Experiences',
    template: '%s | Adventures Wheel',
  },
  description: 'Discover curated group trips, luxury stays, and unforgettable circuit tours across 100+ destinations worldwide. Expert guides, small groups, sustainable travel.',
  openGraph: {
    title: 'Adventures Wheel — Curated Travel Experiences',
    description: 'Discover curated group trips, luxury stays, and unforgettable circuit tours across 100+ destinations worldwide.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qlv0vgt.css" />
      </head>
      <body className="bg-[#f8f9fa] text-slate-800 antialiased font-serif">
        <a
          href="#main-content"
          className="sr-only rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}