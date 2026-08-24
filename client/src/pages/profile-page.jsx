import { useAuth } from '../context/auth-context.jsx';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-3xl font-bold text-ink">Profile</h1>
      <div className="mt-5 max-w-lg rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <dl className="grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-stone-800">Name</dt>
            <dd className="mt-1 text-stone-600">{user?.name}</dd>
          </div>
          <div>
            <dt className="font-semibold text-stone-800">Email</dt>
            <dd className="mt-1 text-stone-600">{user?.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-stone-800">Branch</dt>
            <dd className="mt-1 text-stone-600">{user?.branch}</dd>
          </div>
          <div>
            <dt className="font-semibold text-stone-800">Year</dt>
            <dd className="mt-1 text-stone-600">{user?.year}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
