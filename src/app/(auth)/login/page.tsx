import { AuthShell } from '@/components/auth/auth-shell';

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Login"
      title="Welcome back to your next trip."
      description="Sign in to manage bookings, wishlists, and your traveler profile."
    >
      <form className="space-y-5">
        {['Email', 'Password'].map((label) => (
          <label key={label} className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</span>
            <input
              type={label === 'Password' ? 'password' : 'email'}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        ))}
        <button className="w-full rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-800">
          Sign in
        </button>
      </form>
    </AuthShell>
  );
}