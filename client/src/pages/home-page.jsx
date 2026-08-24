import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-campus">Lost, found, sold</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink md:text-5xl">
          One campus board for the things students actually need.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-stone-700">
          CampusHub starts with verified student accounts. Listings, image uploads, chat, and reports
          are next in the build sequence.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 rounded-md bg-campus px-4 py-3 text-sm font-semibold text-white hover:bg-[#135a72]"
          >
            Browse
            <ArrowRight size={17} />
          </Link>
          <Link
            to="/signup"
            className="rounded-md border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-white"
          >
            Create account
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3">
          {['Lost calculator near library', 'Found earbuds at canteen', 'Selling used DBMS textbook'].map(
            (title, index) => (
              <div key={title} className="rounded-md border border-stone-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-ink">{title}</h2>
                  <span className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600">
                    #{index + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-600">Preview card placeholder for Phase 2.</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
