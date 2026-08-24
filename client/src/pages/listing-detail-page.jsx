import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
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

export function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/listings/${id}`)
      .then((response) => setListing(response.data.listing))
      .catch(() => toast.error('Could not load listing.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <p className="text-sm text-stone-600">Loading listing...</p>;
  }

  if (!listing) {
    return (
      <section>
        <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-campus">
          <ArrowLeft size={16} />
          Back to browse
        </Link>
        <p className="mt-6 text-stone-700">Listing not found.</p>
      </section>
    );
  }

  return (
    <section>
      <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-campus">
        <ArrowLeft size={16} />
        Back to browse
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="flex aspect-[4/3] items-center justify-center bg-stone-100">
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-medium text-stone-500">{formatLabel(listing.category)}</span>
            )}
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-stone-100 px-2 py-1 text-xs font-semibold text-campus">
                {typeLabels[listing.type]}
              </span>
              <span className="rounded bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-600">
                {formatLabel(listing.category)}
              </span>
              <span className="rounded bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-600">
                {formatLabel(listing.location)}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-ink">{listing.title}</h1>
            {listing.type === 'sale' ? (
              <p className="mt-3 text-2xl font-bold text-ink">₹{listing.price}</p>
            ) : null}

            <p className="mt-5 whitespace-pre-line leading-7 text-stone-700">{listing.description}</p>

            <div className="mt-6 rounded-md bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-800">Posted by</p>
              <p className="mt-1 text-sm text-stone-700">{listing.postedBy?.name}</p>
              <p className="mt-1 text-xs text-stone-500">
                {listing.postedBy?.branch} • Year {listing.postedBy?.year}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsContactOpen((current) => !current)}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-campus px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#135a72]"
            >
              <MessageCircle size={18} />
              Contact poster
            </button>

            {isContactOpen ? (
              <div className="mt-4 rounded-md border border-stone-200 bg-white p-4">
                <p className="text-sm font-semibold text-ink">Chat preview</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Real-time chat is the next module. This listing is ready to start a chat thread with{' '}
                  {listing.postedBy?.name} once chat endpoints are connected.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
