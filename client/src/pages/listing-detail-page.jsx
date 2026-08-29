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
        <div className="aspect-[4/3] animate-pulse rounded-[28px] bg-white/10" />
        <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-sm">
          <div className="h-5 w-28 rounded bg-white/10" />
          <div className="h-9 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
          <div className="h-12 rounded bg-white/10" />
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
        <p className="mt-6 text-white/60">Listing not found.</p>
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
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#101010] via-[#161616] to-[#222222]">
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black shadow-sm">
                {formatLabel(listing.category)}
              </span>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="rounded-[28px] border border-white/10 bg-[#090909]/90 p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-campus/15 px-3 py-1 text-xs font-bold text-campus ring-1 ring-campus/30">
                {typeLabels[listing.type]}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/75">
                {formatLabel(listing.category)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/75">
                <MapPin size={13} aria-hidden="true" />
                {formatLabel(listing.location)}
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-black leading-tight text-white">{listing.title}</h1>
            {listing.type === 'sale' ? (
              <p className="mt-3 text-3xl font-black text-white">₹{listing.price}</p>
            ) : null}

            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="whitespace-pre-line text-sm leading-7 text-white/70">{listing.description}</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  <UserRound size={17} aria-hidden="true" />
                  Posted by
                </p>
                <p className="mt-2 text-sm font-semibold text-white/70">{listing.postedBy?.name}</p>
                <p className="mt-1 text-xs text-white/45">
                  {listing.postedBy?.branch} • Year {listing.postedBy?.year}
                </p>
              </div>
              <div className="rounded-2xl border border-campus/25 bg-campus/10 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  <ShieldCheck size={17} aria-hidden="true" />
                  Campus trust
                </p>
                <p className="mt-2 text-xs leading-5 text-white/60">
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
              <div className="mt-4 rounded-2xl border border-campus/25 bg-campus/10 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  <BadgeCheck size={17} className="text-campus" aria-hidden="true" />
                  Chat preview
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
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
