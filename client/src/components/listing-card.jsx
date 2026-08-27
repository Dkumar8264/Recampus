import { CircleDollarSign, MapPin, PackageCheck, Search, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const typeConfig = {
  lost: {
    label: 'Lost',
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
    icon: Search
  },
  found: {
    label: 'Found',
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    icon: PackageCheck
  },
  sale: {
    label: 'Sale',
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
    icon: CircleDollarSign
  }
};

export const formatLabel = (value) =>
  value
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export function ListingCard({ listing, showStatus = false }) {
  const type = typeConfig[listing.type] ?? typeConfig.lost;
  const TypeIcon = type.icon;

  return (
    <Link
      to={`/listings/${listing._id}`}
      className="group block overflow-hidden rounded-lg border border-stone-200 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-200 hover:-translate-y-1 hover:border-campus/40 hover:shadow-[0_16px_34px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-campus/30 active:translate-y-0"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 via-white to-teal-50">
        {listing.images?.[0] ? (
          <img
            src={listing.images[0]}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-stone-500">
            <TypeIcon size={28} aria-hidden="true" />
            <span className="text-sm font-semibold">{formatLabel(listing.category)}</span>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold ring-1 ${type.className}`}
        >
          <TypeIcon size={14} aria-hidden="true" />
          {type.label}
        </span>
        {listing.type === 'sale' ? (
          <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-sm font-extrabold text-ink shadow-sm">
            ₹{listing.price}
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-700">
            {formatLabel(listing.category)}
          </span>
          {showStatus ? (
            <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-campus">
              {formatLabel(listing.status)}
            </span>
          ) : null}
        </div>

        <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-ink">{listing.title}</h2>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-stone-600">{listing.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-3 text-xs font-medium text-stone-500">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <MapPin size={14} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{formatLabel(listing.location)}</span>
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <UserRound size={14} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{listing.postedBy?.name ?? 'Student'}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
