import { getHeroSlides } from '@/lib/queries';
import AboutClient from './AboutClient';

export default async function AboutPage() {
  const heroSlides = await getHeroSlides('about');
  
  return <AboutClient heroSlide={heroSlides?.[0]} />;
}