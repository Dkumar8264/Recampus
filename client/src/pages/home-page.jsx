import { ArrowRight, BadgeCheck, CircleDollarSign, PackageCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const previewItems = [
  { title: 'Lost calculator near library', label: 'Lost', icon: Search, className: 'text-rose-700 bg-rose-50' },
  { title: 'Found earbuds at canteen', label: 'Found', icon: PackageCheck, className: 'text-emerald-700 bg-emerald-50' },
  { title: 'Used DBMS textbook', label: 'Sale', icon: CircleDollarSign, className: 'text-amber-700 bg-amber-50' }
];

export function HomePage() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div>
        <p className="inline-flex min-h-8 items-center gap-2 rounded-md bg-teal-50 px-3 text-sm font-bold uppercase tracking-wide text-campus">
          <BadgeCheck size={16} aria-hidden="true" />
          Verified campus board
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
          One campus board for the things students actually need.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-stone-700 md:text-lg">
          Recampus helps students recover lost items, return found items, and sell useful stuff inside a verified
          college community.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/browse"
            className="btn-primary min-h-12 px-5 py-3"
          >
            Browse
            <ArrowRight size={17} />
          </Link>
          <Link
            to="/signup"
            className="btn-secondary min-h-12 px-5 py-3"
          >
            Create account
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3">
          {previewItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-md border border-stone-200 p-4">
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${item.className}`}>
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wide text-stone-500">{item.label}</span>
                    <h2 className="mt-1 font-bold text-ink">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-stone-600">Open a detail page, review photos, and contact the poster.</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
