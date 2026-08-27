import { ArrowLeft, BadgeCheck, MapPin, MessageCircle, ShieldCheck, UserRound } from 'lucide-react';
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
    return (
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="aspect-[4/3] animate-pulse rounded-lg bg-stone-100" />
        <div className="space-y-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-28 rounded bg-stone-100" />
          <div className="h-9 w-3/4 rounded bg-stone-100" />
          <div className="h-4 w-full rounded bg-stone-100" />
          <div className="h-4 w-5/6 rounded bg-stone-100" />
          <div className="h-12 rounded bg-stone-100" />
        </div>
      </section>
    );
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-stone-100 via-white to-blue-50">
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <span className="rounded-md bg-white px-3 py-2 text-sm font-bold text-stone-500 shadow-sm">
                {formatLabel(listing.category)}
              </span>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-campus ring-1 ring-blue-100">
                {typeLabels[listing.type]}
              </span>
              <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">
                {formatLabel(listing.category)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">
                <MapPin size={13} aria-hidden="true" />
                {formatLabel(listing.location)}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink">{listing.title}</h1>
            {listing.type === 'sale' ? (
              <p className="mt-3 text-3xl font-extrabold text-ink">₹{listing.price}</p>
            ) : null}

            <div className="mt-5 rounded-lg bg-stone-50 p-4">
              <p className="whitespace-pre-line text-sm leading-7 text-stone-700">{listing.description}</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-stone-200 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-stone-800">
                  <UserRound size={17} aria-hidden="true" />
                  Posted by
                </p>
                <p className="mt-2 text-sm font-semibold text-stone-700">{listing.postedBy?.name}</p>
                <p className="mt-1 text-xs text-stone-500">
                  {listing.postedBy?.branch} • Year {listing.postedBy?.year}
                </p>
              </div>
              <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-blue-800">
                  <ShieldCheck size={17} aria-hidden="true" />
                  Campus trust
                </p>
                <p className="mt-2 text-xs leading-5 text-blue-800">
                  Verified college account. Meet in a public campus spot for handoff.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsContactOpen((current) => !current)}
              className="btn-primary mt-5 min-h-12 w-full py-3"
            >
              <MessageCircle size={18} />
              Contact poster
            </button>

            {isContactOpen ? (
              <div className="mt-4 rounded-md border border-blue-100 bg-blue-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-ink">
                  <BadgeCheck size={17} className="text-campus" aria-hidden="true" />
                  Chat preview
                </p>
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
