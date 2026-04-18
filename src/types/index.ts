// ============================================================
// Adventures Wheel — Core Type Definitions
// ============================================================

// ---------- Hero Slides ----------
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  order_index: number;
  is_active: boolean;
}

// ---------- Trip Categories ----------
export interface TripCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
}

// ---------- Trips ----------
export interface Trip {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  category?: TripCategory;
  short_description: string;
  full_description: string;
  duration_days: number;
  duration_nights: number;
  difficulty_level: 'easy' | 'moderate' | 'difficult';
  group_size_min: number;
  group_size_max: number;
  age_requirement: string;
  hero_image: string;
  gallery_images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  things_to_carry: string[];
  meeting_point: string;
  is_active: boolean;
  created_at: string;
  itinerary?: TripItinerary[];
  pricing?: TripPricing[];
  departures?: TripDeparture[];
}

export interface TripItinerary {
  id: string;
  trip_id: string;
  day_number: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
}

export interface TripPricing {
  id: string;
  trip_id: string;
  occupancy_type: 'solo' | 'double' | 'triple';
  price_per_person: number;
  is_active: boolean;
}

export interface TripDeparture {
  id: string;
  trip_id: string;
  departure_date: string;
  return_date: string;
  available_seats: number;
  is_active: boolean;
}

// ---------- Bookings ----------
export interface Booking {
  id: string;
  booking_id: string;
  user_id: string | null;
  trip_title: string;
  trip_slug: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  departure_date: string;
  occupancy_rule: string;
  total_persons: number;
  packages: Record<string, unknown>;
  riders: Record<string, unknown>;
  subtotal: number;
  gst: number;
  total_payable: number;
  amount_paid: number;
  remaining_amount: number;
  payment_type: 'full' | 'custom';
  razorpay_order_id: string;
  razorpay_payment_id: string;
  booking_status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'partial';
  created_at: string;
}

// ---------- Blog Posts ----------
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  author_avatar: string;
  category: string;
  read_time: number;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

// ---------- Gallery ----------
export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string;
  is_active: boolean;
  order_index: number;
}

// ---------- Enquiries ----------
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  trip_interest: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

// ---------- Profiles ----------
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  created_at: string;
}

// ---------- Testimonials ----------
export interface Testimonial {
  id: string;
  name: string;
  avatar_url: string;
  rating: number;
  comment: string;
  trip_reference: string;
  is_active: boolean;
  order_index: number;
}

// ---------- Stats ----------
export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  order_index: number;
}

// ---------- How It Works ----------
export interface HowItWorks {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}
