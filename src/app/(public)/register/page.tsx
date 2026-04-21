'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            dob: formData.dob
          },
          // Email confirmation disabled in Supabase dashboard
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        setError(error.message);
      } else {
        const isAdmin = formData.email.toLowerCase() === 'amit@adventureswheel.com';
        router.push(isAdmin ? '/admin' : '/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-[#faf7f2] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-2xl shadow-xl ring-1 ring-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-[family-name:var(--font-heading)] text-[#122822]">
            Create Account
          </h1>
          <p className="text-[#122822]/60 mt-2">Join Adventures Wheel to manage your bookings</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" placeholder="John Doe" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all text-[#122822]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" placeholder="you@example.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 bg-[#122822] text-white rounded-lg font-bold tracking-widest uppercase hover:bg-[#122822]/90 active:scale-[0.98] transition-all disabled:opacity-70 shadow-xl shadow-[#122822]/20"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-[#122822]/60 mt-8">
          Already have an account? <Link href="/login" className="font-semibold text-[#122822] hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}
