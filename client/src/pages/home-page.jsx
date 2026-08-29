import { ArrowRight, BadgeCheck, CircleDollarSign, PackageCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const previewItems = [
  { title: 'Lost calculator near library', label: 'Lost', icon: Search, className: 'text-rose-700 bg-rose-50' },
  { title: 'Found earbuds at canteen', label: 'Found', icon: PackageCheck, className: 'text-indigo-700 bg-indigo-50' },
  { title: 'Used DBMS textbook', label: 'Sale', icon: CircleDollarSign, className: 'text-amber-700 bg-amber-50' }
];

export function HomePage() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="py-8 md:py-16">
        <p className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 text-sm font-bold uppercase tracking-wide text-white/75 backdrop-blur">
          <BadgeCheck size={16} aria-hidden="true" />
          Verified campus board
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-6xl font-black leading-[0.9] text-white md:text-8xl">
          Your campus, redesigned.
        </h1>
        <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-white/62 md:text-xl">
          Recampus helps students recover lost items, return found items, and sell useful stuff inside a verified
          college community.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/browse"
            className="btn-primary min-h-12 px-6 py-3"
          >
            Browse
            <ArrowRight size={17} />
          </Link>
          <Link
            to="/signup"
            className="btn-secondary min-h-12 px-6 py-3"
          >
            Create account
          </Link>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#00d2ff] via-[#ff00aa] to-[#ff6b00] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:col-span-2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.42),transparent_18rem),radial-gradient(circle_at_80%_70%,rgba(124,58,237,0.55),transparent_20rem)]" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-sm" />
          <div className="absolute -bottom-16 left-12 h-52 w-52 rounded-full bg-black/25 blur-sm" />
          <p className="relative text-xs font-black uppercase tracking-[0.22em] text-white/75">Featured campus flow</p>
          <h2 className="relative mt-5 max-w-lg font-display text-4xl font-black leading-[0.95] md:text-6xl">
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
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/10 p-4 text-white shadow-[0_16px_42px_rgba(0,0,0,0.28)] backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${item.className}`}>
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wide text-white/45">{item.label}</span>
                    <h2 className="mt-1 font-bold text-white">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-white/55">Open a detail page, review photos, and contact the poster.</p>
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
