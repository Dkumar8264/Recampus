import {
  Bookmark,
  CircleDollarSign,
  Eye,
  MapPin,
  MessageCircle,
  PackageCheck,
  Search,
  UserRound
} from 'lucide-react';
import { Link } from 'react-router-dom';

const typeConfig = {
  lost: {
    label: 'Lost',
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
    icon: Search
  },
  found: {
    label: 'Found',
    className: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
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
      className="group block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-campus/30"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-stone-100 via-white to-blue-50 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_42px_rgba(15,23,42,0.16)] group-active:translate-y-0">
        {listing.images?.[0] ? (
          <img
            src={listing.images[0]}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-stone-500">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-campus shadow-sm">
              <TypeIcon size={28} aria-hidden="true" />
            </span>
            <span className="text-sm font-black">{formatLabel(listing.category)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/42 opacity-80 transition group-hover:opacity-95" />
        <span
          className={`absolute left-3 top-3 inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1 backdrop-blur ${type.className}`}
        >
          <TypeIcon size={14} aria-hidden="true" />
          {type.label}
        </span>
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-[0_8px_18px_rgba(15,23,42,0.16)] transition group-hover:scale-105">
          <Bookmark size={16} aria-hidden="true" />
        </span>
        {listing.type === 'sale' ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-sm font-black text-ink shadow-sm">
            ₹{listing.price}
          </span>
        ) : null}
      </div>

      <div className="px-1 pb-1 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="line-clamp-1 text-base font-black leading-snug text-ink">{listing.title}</h2>
            <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs font-bold text-stone-500">
              <MapPin size={13} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{formatLabel(listing.location)}</span>
            </div>
          </div>
          {showStatus ? (
            <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-campus">
              {formatLabel(listing.status)}
            </span>
          ) : null}
        </div>

        <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-5 text-stone-600">{listing.description}</p>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs font-bold text-stone-500">
          <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-1">
            <UserRound size={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{listing.postedBy?.name ?? 'Student'}</span>
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Eye size={14} aria-hidden="true" />
              View
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle size={14} aria-hidden="true" />
              Chat
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
