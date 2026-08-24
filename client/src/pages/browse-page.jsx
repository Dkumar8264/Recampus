import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';

const typeLabels = {
  lost: 'Lost',
  found: 'Found',
  sale: 'Sale'
};

const formatLabel = (value) =>
  value
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Browse listings</h1>
          <p className="mt-3 max-w-2xl text-stone-700">
            Active lost, found, and marketplace posts from verified campus accounts.
          </p>
        </div>
        <Link
          to="/post"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-campus px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#135a72]"
        >
          Post item
        </Link>
      </div>

      {isLoading ? (
        <p className="mt-8 text-sm text-stone-600">Loading listings...</p>
      ) : listings.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-6 text-center">
          <h2 className="text-lg font-semibold text-ink">No listings yet</h2>
          <p className="mt-2 text-sm text-stone-600">Create the first lost, found, or sale post.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing._id}
              className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-stone-100">
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm font-medium text-stone-500">{formatLabel(listing.category)}</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded bg-stone-100 px-2 py-1 text-xs font-semibold text-campus">
                    {typeLabels[listing.type]}
                  </span>
                  {listing.type === 'sale' ? (
                    <span className="text-sm font-bold text-ink">₹{listing.price}</span>
                  ) : null}
                </div>
                <h2 className="mt-3 line-clamp-2 text-lg font-semibold text-ink">{listing.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{listing.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-stone-500">
                  <span>{formatLabel(listing.location)}</span>
                  <span>{listing.postedBy?.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
