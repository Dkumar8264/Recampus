import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ListingCard } from '../components/listing-card.jsx';
import { api } from '../lib/api.js';

export function BrowsePage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/listings')
      .then((response) => setListings(response.data.listings))
      .catch(() => toast.error('Could not load listings.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-campus">Campus board</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Browse listings</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-700 sm:text-base">
            Active lost, found, and marketplace posts from verified campus accounts.
          </p>
        </div>
        <Link
          to="/post"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-campus px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#135a72]"
        >
          Post item
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-80 animate-pulse rounded-lg border border-stone-200 bg-white shadow-sm">
              <div className="h-44 bg-stone-100" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-20 rounded bg-stone-100" />
                <div className="h-5 w-3/4 rounded bg-stone-100" />
                <div className="h-4 w-full rounded bg-stone-100" />
                <div className="h-4 w-2/3 rounded bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-ink">No listings yet</h2>
          <p className="mt-2 text-sm text-stone-600">Create the first lost, found, or sale post.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
