import { getHeroSlides } from '@/lib/queries';
import ContactClient from './ContactClient';

export default async function ContactPage() {
  const heroSlides = await getHeroSlides('contact');
  
  return <ContactClient heroSlide={heroSlides?.[0]} />;
}