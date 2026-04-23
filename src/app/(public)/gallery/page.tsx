import { getHeroSlides } from '@/lib/queries';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  const heroSlides = await getHeroSlides('gallery');
  
  return <GalleryClient heroSlide={heroSlides?.[0]} />;
}
