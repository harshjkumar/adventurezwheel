'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        const isAdmin = email.toLowerCase() === 'amit@adventureswheel.com';
        const finalRedirect = isAdmin && redirectTo === '/dashboard' ? '/admin' : redirectTo;
        router.push(finalRedirect);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" 
          placeholder="you@example.com" 
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#122822] mb-2">Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all" 
          placeholder="••••••••" 
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 py-4 bg-[#122822] text-white rounded-lg font-bold tracking-widest uppercase hover:bg-[#122822]/90 active:scale-[0.98] transition-all disabled:opacity-70 shadow-xl shadow-[#122822]/20"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-[#faf7f2] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl ring-1 ring-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-[family-name:var(--font-heading)] text-[#122822]">
            Welcome Back
          </h1>
          <p className="text-[#122822]/60 mt-2">Sign in to your Adventures Wheel account</p>
        </div>

        <Suspense fallback={<div className="text-center py-4">Loading form...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-[#122822]/60 mt-8">
          Don't have an account? <Link href="/register" className="font-semibold text-[#122822] hover:underline">Register</Link>
        </p>
      </motion.div>
    </main>
  );
}
