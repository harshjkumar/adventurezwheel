import { AuthShell } from '@/components/auth/auth-shell';

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Register"
      title="Create your traveler account."
      description="Register once to keep your trip shortlist, booking history, and profile details in one place."
    >
      <form className="grid gap-5 sm:grid-cols-2">
        {['Full name', 'Email', 'Phone', 'Password'].map((label) => (
          <label key={label} className={`block ${label === 'Password' ? 'sm:col-span-2' : ''}`}>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</span>
            <input
              type={label === 'Password' ? 'password' : 'text'}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        ))}
        <button className="sm:col-span-2 rounded-2xl bg-[#122822] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-700">
          Create account
        </button>
      </form>
    </AuthShell>
  );
}