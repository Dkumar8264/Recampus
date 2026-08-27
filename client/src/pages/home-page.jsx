import { ArrowRight, BadgeCheck, CircleDollarSign, PackageCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const previewItems = [
  { title: 'Lost calculator near library', label: 'Lost', icon: Search, className: 'text-rose-700 bg-rose-50' },
  { title: 'Found earbuds at canteen', label: 'Found', icon: PackageCheck, className: 'text-indigo-700 bg-indigo-50' },
  { title: 'Used DBMS textbook', label: 'Sale', icon: CircleDollarSign, className: 'text-amber-700 bg-amber-50' }
];

export function HomePage() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="gallery-shell">
        <p className="inline-flex min-h-8 items-center gap-2 rounded-md bg-blue-50 px-3 text-sm font-bold uppercase tracking-wide text-campus">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#111111] via-campus to-[#6f3ff5] p-5 text-white shadow-[0_22px_55px_rgba(15,23,42,0.22)] sm:col-span-2">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15" />
          <div className="absolute -bottom-16 left-12 h-44 w-44 rounded-full bg-white/15" />
          <p className="relative text-xs font-black uppercase tracking-[0.22em] text-white/75">Featured campus flow</p>
          <h2 className="relative mt-4 max-w-lg text-3xl font-black leading-tight md:text-5xl">
            Find it, list it, return it, sell it.
          </h2>
          <p className="relative mt-4 max-w-md text-sm font-semibold leading-6 text-white/80">
            A visual campus board designed for quick scanning and safer student handoffs.
          </p>
        </div>
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
          {previewItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[18px] border border-stone-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
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
