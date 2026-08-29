import { useAuth } from '../context/auth-context.jsx';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-5xl font-black text-ink">Profile</h1>
      <div className="mt-5 max-w-lg rounded-[28px] border border-stone-200 bg-white/90 p-6 text-ink shadow-[0_24px_70px_rgba(64,43,20,0.1)]">
        <dl className="grid gap-4 text-sm">
          <div>
            <dt className="font-bold text-ink">Name</dt>
            <dd className="mt-1 text-stone-600">{user?.name}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Email</dt>
            <dd className="mt-1 text-stone-600">{user?.email}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Branch</dt>
            <dd className="mt-1 text-stone-600">{user?.branch}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Year</dt>
            <dd className="mt-1 text-stone-600">{user?.year}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
