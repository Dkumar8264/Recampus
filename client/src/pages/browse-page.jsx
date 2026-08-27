import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { DiscoveryToolbar } from '../components/discovery-toolbar.jsx';
import { ListingCard } from '../components/listing-card.jsx';
import { formatLabel } from '../components/listing-card.jsx';
import { api } from '../lib/api.js';

export function BrowsePage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('all');

  useEffect(() => {
    api
      .get('/listings')
      .then((response) => setListings(response.data.listings))
      .catch(() => toast.error('Could not load listings.'))
      .finally(() => setIsLoading(false));
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleListings = listings.filter((listing) => {
    const matchesType = activeType === 'all' || listing.type === activeType;
    const searchableText = [
      listing.title,
      listing.description,
      listing.category,
      listing.location,
      listing.postedBy?.name
    ]
      .filter(Boolean)
      .map((value) => formatLabel(value).toLowerCase())
      .join(' ');

    return matchesType && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  return (
    <section>
      <DiscoveryToolbar
        activeType={activeType}
        count={visibleListings.length}
        onSearchChange={setQuery}
        onTypeChange={setActiveType}
        query={query}
        title="Browse listings"
      />

      {isLoading ? (
        <div className="gallery-grid mt-7">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-80 animate-pulse rounded-[18px] bg-white shadow-sm">
              <div className="h-48 rounded-[18px] bg-stone-100" />
              <div className="space-y-3 px-1 py-4">
                <div className="h-4 w-20 rounded bg-stone-100" />
                <div className="h-5 w-3/4 rounded bg-stone-100" />
                <div className="h-4 w-full rounded bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      ) : visibleListings.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-ink">No matching listings</h2>
          <p className="mt-2 text-sm text-stone-600">Try another search or create a fresh campus post.</p>
          <Link to="/post" className="btn-primary mt-5">
            Post item
          </Link>
        </div>
      ) : (
        <div className="gallery-grid mt-7">
          {visibleListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
