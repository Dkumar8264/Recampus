import { useAuth } from '../context/auth-context.jsx';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-5xl font-black text-white">Profile</h1>
      <div className="mt-5 max-w-lg rounded-[28px] border border-white/10 bg-[#090909]/88 p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        <dl className="grid gap-4 text-sm">
          <div>
            <dt className="font-bold text-white">Name</dt>
            <dd className="mt-1 text-white/55">{user?.name}</dd>
          </div>
          <div>
            <dt className="font-bold text-white">Email</dt>
            <dd className="mt-1 text-white/55">{user?.email}</dd>
          </div>
          <div>
            <dt className="font-bold text-white">Branch</dt>
            <dd className="mt-1 text-white/55">{user?.branch}</dd>
          </div>
          <div>
            <dt className="font-bold text-white">Year</dt>
            <dd className="mt-1 text-white/55">{user?.year}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
