import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { ScrollToTop } from '@/components/site/scroll-to-top';
import './globals.css';

const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

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
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-[#f8f9fa] text-slate-800 antialiased`}>
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
      </body>
    </html>
  );
}