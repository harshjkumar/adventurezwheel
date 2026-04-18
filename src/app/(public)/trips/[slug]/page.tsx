'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getTripBySlug } from '@/data/trips';
import TripDetailClient from '@/components/sections/trips/TripDetailClient';

export default function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const trip = getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  return <TripDetailClient trip={trip} />;
}