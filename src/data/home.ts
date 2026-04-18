// ============================================================
// Homepage Data — Adventures Wheel
// ============================================================

// ── Local images ──────────────────────────────────────────────
const localImages = [
  '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg',   // 0 - ladakh landscape
  '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG',   // 1 - ladakh mountains
  '/4713b9ed-a70e-4b71-a908-616b774b014a.JPG',   // 2 - ladakh pass
  '/6e4e45cd-760e-4122-8240-8d0ec2e5662b.JPG',   // 3 - valley
  '/7d4eaaa5-bc8c-4cd5-a0de-dbf472184965.jpg',   // 4 - campsite
  '/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG',   // 5 - tawang
  '/c8adc763-a691-488d-ab1c-a2fdccda6380.jpg',   // 6 - village
  '/cc934709-69bd-4eeb-9f70-83aa1636c9ee.JPG',   // 7 - desert road
  '/d64bcf8e-b8bb-406c-9121-5dc05c695a0f.JPG',   // 8 - lake
  '/de32a879-c278-42e1-9784-3e37d6d80664.JPG',   // 9 - snow peaks
] as const;

// ── Meghalaya images ──────────────────────────────────────────
export const meghalayaImages = [
  '/meghalaya/IMG_6757_converted.webp',
  '/meghalaya/IMG_7087_converted.webp',
  '/meghalaya/IMG_7444_converted.webp',
  '/meghalaya/IMG_7448_converted.webp',
  '/meghalaya/IMG_7481_converted.webp',
  '/meghalaya/IMG_8268.webp',
  '/meghalaya/IMG_9944.webp',
  '/meghalaya/7a88e595-4879-4e97-af5c-bae0374cb728.webp',
  '/meghalaya/82f3bca6-ba93-4746-8311-5825f8d17873.webp',
  '/meghalaya/d48f752a-da21-4788-b9f8-1146ca64ad3a.webp',
  '/meghalaya/group pose.webp',
] as const;

// ── Spiti images  (only browser-compatible formats) ───────────
export const spitiImages = [
  '/spiti tour/IMG_2016 2.JPG',
  '/spiti tour/IMG_2027 2.JPG',
  '/spiti tour/IMG_7673.jpeg',
  '/spiti tour/IMG_7698.jpeg',
] as const;

export const navigationLinks = [
  { label: 'Trips', href: '/trips' },
  { label: 'About', href: '/about' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
] as const;

export const heroSlides = [
  {
    image: localImages[0],
    title: 'Adventures Wheel offers you the world',
    subtitle: 'Explore with us',
  },
  {
    image: spitiImages[2],
    title: 'Into the middle land.',
    subtitle: 'Spiti Valley',
  },
  {
    image: meghalayaImages[0],
    title: 'Where clouds rest on hills.',
    subtitle: 'Meghalaya',
  },
  {
    image: localImages[5],
    title: 'The last Shangri-La.',
    subtitle: 'Tawang',
  },
] as const;

export const heroVideo = '/DJI_20250814120523_0145_D.mp4';

export const destinationRegions = [
  { name: 'Leh Ladakh', slug: 'leh-ladakh', icon: '🏔️' },
  { name: 'Spiti', slug: 'spiti', icon: '🏕️' },
  { name: 'Meghalaya', slug: 'meghalaya', icon: '🌿' },
  { name: 'Tawang', slug: 'tawang', icon: '🛕' },
] as const;

export const destinationCards = [
  { title: 'Leh Ladakh', slug: 'leh-ladakh', image: localImages[0], description: 'Where the earth meets the sky on the highest roads.' },
  { title: 'Spiti Valley', slug: 'spiti', image: spitiImages[2], description: 'The middle land — cold deserts and ancient monasteries.' },
  { title: 'Meghalaya', slug: 'meghalaya', image: meghalayaImages[0], description: 'Living root bridges and the abode of clouds.' },
  { title: 'Tawang', slug: 'tawang', image: localImages[5], description: 'One of the last Shangri-Las of the Himalayas.' },
] as const;

export const featuredTrips = [
  {
    badge: 'Best Seller',
    title: 'Leh Ladakh Bike Expedition',
    slug: 'leh-ladakh-bike-expedition',
    tags: ['Bike Trip', 'Adventure'],
    stats: ['7 Days', '6 Nights', '14 Meals'],
    price: '₹14,999',
    originalPrice: '₹17,999',
    perNight: '₹2,500',
    image: localImages[0],
  },
  {
    badge: 'Trending',
    title: 'Spiti Valley Circuit',
    slug: 'spiti-valley-circuit',
    tags: ['Group Trip', 'Circuit'],
    stats: ['9 Days', '8 Nights', '18 Meals'],
    price: '₹16,499',
    originalPrice: '₹19,799',
    perNight: '₹2,062',
    image: spitiImages[2],
  },
  {
    badge: 'New Route',
    title: 'Meghalaya Explorer',
    slug: 'meghalaya-explorer',
    tags: ['Group Trip', 'Nature'],
    stats: ['6 Days', '5 Nights', '12 Meals'],
    price: '₹12,999',
    originalPrice: '₹15,599',
    perNight: '₹2,600',
    image: meghalayaImages[1],
  },
  {
    badge: 'Premium',
    title: 'Tawang & Arunachal Circuit',
    slug: 'tawang-arunachal-circuit',
    tags: ['Group Trip', 'Heritage'],
    stats: ['8 Days', '7 Nights', '16 Meals'],
    price: '₹18,999',
    originalPrice: '₹22,799',
    perNight: '₹2,714',
    image: localImages[5],
  },
] as const;

export const tripFilterTabs = ['All', 'Best Sellers', 'New Routes', 'Weekend Trips'] as const;

export const howItWorks = [
  {
    step: '01',
    title: 'Search',
    description: 'Browse our curated collection of trips and find your perfect adventure.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Book',
    description: 'Reserve your spot with a simple booking process and secure payment.',
    icon: 'calendar',
  },
  {
    step: '03',
    title: 'Pack',
    description: 'We send you a complete packing list and preparation guide.',
    icon: 'backpack',
  },
  {
    step: '04',
    title: 'Adventure',
    description: 'Enjoy your journey with expert guides and unforgettable experiences.',
    icon: 'compass',
  },
] as const;

export const whyChooseUs = [
  {
    title: 'Expert Guides',
    description: 'Local specialists with deep regional knowledge and a calm, attentive service style.',
    icon: 'compass',
  },
  {
    title: 'Safety First',
    description: 'Thoughtful planning, vetted partners, and practical support on every trip.',
    icon: 'shield',
  },
  {
    title: 'Small Groups',
    description: 'Comfortable pacing, fewer bottlenecks, and more room for meaningful experiences.',
    icon: 'users',
  },
  {
    title: 'Best Value',
    description: 'Premium experiences at competitive prices with no hidden costs.',
    icon: 'leaf',
  },
] as const;

export const aboutStats = [
  { value: '100+', label: 'Destinations' },
  { value: '50K+', label: 'Travelers' },
  { value: '7', label: 'Divisions' },
  { value: '2020', label: 'Founded' },
] as const;

export const testimonials = [
  {
    name: 'Rahul Sharma',
    avatar: meghalayaImages[10],
    rating: 5,
    comment: 'An unforgettable journey through Ladakh. Every detail was perfectly planned and our guide was exceptional.',
    trip: 'Leh Ladakh Expedition',
  },
  {
    name: 'Priya Patel',
    avatar: meghalayaImages[10],
    rating: 5,
    comment: 'The Spiti Valley trip exceeded all expectations. Beautiful scenery and impeccable service throughout.',
    trip: 'Spiti Valley Circuit',
  },
  {
    name: 'Ananya Gupta',
    avatar: meghalayaImages[10],
    rating: 5,
    comment: 'Meghalaya was magical. The small group size meant we had authentic experiences you just can\'t get with larger tours.',
    trip: 'Meghalaya Explorer',
  },
  {
    name: 'Vikram Singh',
    avatar: meghalayaImages[10],
    rating: 4,
    comment: 'Tawang was stunning. Great mix of adventure, culture, and relaxation. Would definitely travel again.',
    trip: 'Tawang & Arunachal Circuit',
  },
] as const;

export const footerLinks = {
  adventures: [
    { label: 'Leh Ladakh', href: '/trips?category=leh-ladakh' },
    { label: 'Spiti', href: '/trips?category=spiti' },
    { label: 'Meghalaya', href: '/trips?category=meghalaya' },
    { label: 'Tawang', href: '/trips?category=tawang' },
    { label: 'All Trips', href: '/trips' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Why Us', href: '/why-us' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Contact Us', href: '/contact' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Guidelines', href: '/guidelines' },
    { label: 'Terms & Conditions', href: '/policies#terms' },
    { label: 'Privacy Policy', href: '/policies#privacy' },
    { label: 'Cancellation Policy', href: '/policies#cancellation' },
  ],
  social: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
  ],
} as const;

// ── Gallery images — a curated mix from all destinations ──────
export const galleryImages = [
  { id: '1', title: 'Pangong Lake', url: localImages[0], category: 'Leh Ladakh' },
  { id: '2', title: 'Living Root Bridge', url: meghalayaImages[2], category: 'Meghalaya' },
  { id: '3', title: 'Spiti Monastery Road', url: spitiImages[2], category: 'Spiti' },
  { id: '4', title: 'Tawang Monastery', url: localImages[5], category: 'Tawang' },
  { id: '5', title: 'Dawki River', url: meghalayaImages[5], category: 'Meghalaya' },
  { id: '6', title: 'Key Monastery', url: spitiImages[3], category: 'Spiti' },
  { id: '7', title: 'Khardung La', url: localImages[1], category: 'Leh Ladakh' },
  { id: '8', title: 'Mawlynnong Village', url: meghalayaImages[4], category: 'Meghalaya' },
  { id: '9', title: 'Chandratal Lake', url: spitiImages[0], category: 'Spiti' },
  { id: '10', title: 'Sela Pass', url: localImages[8], category: 'Tawang' },
] as const;

// ── Meghalaya showcase (for about / other pages) ──────────────
export const meghalayaShowcase = [
  { title: 'Crystal Clear Rivers', image: meghalayaImages[0], caption: 'The pristine rivers of Meghalaya' },
  { title: 'Waterfalls', image: meghalayaImages[1], caption: 'Nohkalikai Falls and beyond' },
  { title: 'Root Bridges', image: meghalayaImages[2], caption: 'Living root bridges of Cherrapunji' },
  { title: 'Village Life', image: meghalayaImages[3], caption: 'Khasi hill villages' },
  { title: 'Trekking', image: meghalayaImages[4], caption: 'Trails through the clouds' },
  { title: 'Sacred Forests', image: meghalayaImages[5], caption: 'Ancient groves of Mawphlang' },
  { title: 'Sunrise Views', image: meghalayaImages[6], caption: 'Dawn over the Khasi Hills' },
  { title: 'Caves', image: meghalayaImages[7], caption: 'Exploring limestone formations' },
  { title: 'Local Culture', image: meghalayaImages[8], caption: 'Traditions of the Northeast' },
  { title: 'River Pools', image: meghalayaImages[9], caption: 'Natural rock pools' },
  { title: 'Group Adventures', image: meghalayaImages[10], caption: 'Our travelers in Meghalaya' },
] as const;

// ── Spiti showcase ────────────────────────────────────────────
export const spitiShowcase = [
  { title: 'Mountain Roads', image: spitiImages[0], caption: 'Through the highest passes' },
  { title: 'Valley Views', image: spitiImages[1], caption: 'The barren beauty of Spiti' },
  { title: 'Monastery Trail', image: spitiImages[2], caption: 'Ancient Buddhist monasteries' },
  { title: 'Desert Landscapes', image: spitiImages[3], caption: 'Cold desert panoramas' },
] as const;

export const blogPosts = [
  {
    title: 'Top 10 Things to Do in Leh Ladakh',
    slug: 'top-10-things-leh-ladakh',
    excerpt: 'From Pangong Lake to Khardung La, discover the must-visit places and experiences.',
    image: localImages[0],
    category: 'Travel Guide',
    author: 'Adventures Wheel',
    authorAvatar: '/logo/Artboard 1@3x-8.png',
    readTime: 8,
    date: '2026-03-15',
  },
  {
    title: 'Spiti Valley: A Complete Travel Guide',
    slug: 'spiti-valley-complete-guide',
    excerpt: 'Everything you need to know — best time to visit, permits, and hidden gems.',
    image: spitiImages[2],
    category: 'Travel Guide',
    author: 'Adventures Wheel',
    authorAvatar: '/logo/Artboard 1@3x-8.png',
    readTime: 6,
    date: '2026-03-10',
  },
  {
    title: 'Essential Packing List for High-Altitude Trips',
    slug: 'packing-list-high-altitude',
    excerpt: 'Don\'t forget these crucial items when preparing for an expedition in the Himalayas.',
    image: localImages[1],
    category: 'Tips & Tricks',
    author: 'Adventures Wheel',
    authorAvatar: '/logo/Artboard 1@3x-8.png',
    readTime: 5,
    date: '2026-03-05',
  },
  {
    title: 'Meghalaya: Living Root Bridges & Beyond',
    slug: 'meghalaya-root-bridges',
    excerpt: 'Explore the mystical root bridges, crystal rivers, and the wettest place on Earth.',
    image: meghalayaImages[2],
    category: 'Travel Guide',
    author: 'Adventures Wheel',
    authorAvatar: '/logo/Artboard 1@3x-8.png',
    readTime: 7,
    date: '2026-02-28',
  },
  {
    title: 'Tawang: The Last Shangri-La Road Trip',
    slug: 'tawang-road-trip',
    excerpt: 'A day-by-day account of the legendary drive to Tawang.',
    image: localImages[5],
    category: 'Journey Diary',
    author: 'Adventures Wheel',
    authorAvatar: '/logo/Artboard 1@3x-8.png',
    readTime: 9,
    date: '2026-02-20',
  },
  {
    title: 'How to Acclimatize at High Altitudes',
    slug: 'acclimatize-high-altitudes',
    excerpt: 'Learn the proven methods to acclimatize safely and enjoy your high-altitude adventure.',
    image: spitiImages[0],
    category: 'Tips & Tricks',
    author: 'Adventures Wheel',
    authorAvatar: '/logo/Artboard 1@3x-8.png',
    readTime: 6,
    date: '2026-02-15',
  },
] as const;

export const faqItems = [
  {
    question: 'How do I book a trip?',
    answer: 'You can book a trip directly through our website by selecting your desired trip, choosing a departure date, and following the booking process. You can also contact us on WhatsApp for personalized assistance.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Cancellations made 30+ days before departure receive a 75% refund. 15-29 days: 40% refund. Less than 15 days: no refund. The initial booking amount is non-refundable.',
  },
  {
    question: 'Are meals included in trips?',
    answer: 'Most of our group trips include meals as specified in the trip details. The number of included meals varies by trip and is clearly listed on each trip page.',
  },
  {
    question: 'What is the group size?',
    answer: 'Our trips typically range from 8-20 travelers, ensuring a more intimate and authentic experience.',
  },
  {
    question: 'Do I need travel insurance?',
    answer: 'Travel insurance is strongly recommended. It should cover trip cancellation, medical emergencies, and evacuation.',
  },
  {
    question: 'Can I customize a trip?',
    answer: 'Absolutely! We offer custom trip planning services. Contact us with your preferences and our team will create a personalized itinerary.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, UPI, and net banking through our secure Razorpay gateway. Minimum booking amount of ₹999.',
  },
  {
    question: 'How physically demanding are the trips?',
    answer: 'Each trip has a difficulty rating (Easy, Moderate, or Difficult) clearly displayed. Easy trips require minimal physical activity.',
  },
] as const;
