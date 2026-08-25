import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ListingCard } from '../components/listing-card.jsx';
import { api } from '../lib/api.js';

export function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/listings/mine')
      .then((response) => setListings(response.data.listings))
      .catch(() => toast.error('Could not load your listings.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-campus">Your posts</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">My listings</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-700 sm:text-base">
            Track the items you posted and open any listing to review its public detail page.
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
          <h2 className="text-lg font-semibold text-ink">You have not posted anything yet</h2>
          <p className="mt-2 text-sm text-stone-600">Create a lost, found, or sale listing to see it here.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} showStatus />
          ))}
        </div>
      )}
    </section>
  );
}
