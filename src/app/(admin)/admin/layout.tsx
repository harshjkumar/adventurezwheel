'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Map as MapIcon, Tags, MessageSquare, BookOpen,
  Image as ImageIcon, Settings, LogOut, ExternalLink, CreditCard,
  Star, SlidersHorizontal, HelpCircle, Wallet, FileText, Trophy,
} from 'lucide-react';
import { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AutoLogout } from '@/components/admin/AutoLogout';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Trips', href: '/admin/trips', icon: MapIcon },
  { label: 'Featured', href: '/admin/featured', icon: Trophy },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Bookings', href: '/admin/bookings', icon: CreditCard },
  { label: 'Payments', href: '/admin/payments', icon: Wallet },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Blogs', href: '/admin/blogs', icon: BookOpen },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Hero Slides', href: '/admin/hero-slides', icon: SlidersHorizontal },
  { label: 'Page Content', href: '/admin/content', icon: FileText },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      <AutoLogout timeoutMinutes={60} />
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <Link href="/admin" className="text-xl font-semibold tracking-wide uppercase font-[family-name:var(--font-heading)]">
            AW <span className="text-lg font-light italic text-emerald-600 ml-0.5">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item)
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-slate-700 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={18} />
            View Site
          </Link>
        </div>

        <div className="p-3 border-t border-gray-200 shrink-0">
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
              router.refresh();
            }}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xs font-medium text-slate-400 uppercase tracking-[0.2em]">
            Admin Panel
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs uppercase">
              AD
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
