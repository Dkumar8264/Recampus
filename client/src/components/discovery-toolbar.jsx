import { Search, SlidersHorizontal, X } from 'lucide-react';

const filterOptions = [
  { value: 'all', label: 'Recommended' },
  { value: 'lost', label: 'Lost' },
  { value: 'found', label: 'Found' },
  { value: 'sale', label: 'For sale' }
];

export function DiscoveryToolbar({
  activeType,
  count,
  onSearchChange,
  onTypeChange,
  query,
  title = 'Campus finds'
}) {
  return (
    <div className="gallery-shell">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-campus">Explore Recampus</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-ink md:text-4xl">{title}</h1>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.08)] lg:min-w-[22rem]">
          <Search size={18} className="shrink-0 text-stone-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => onSearchChange(event.target.value)}
            className="min-h-10 w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-stone-400"
            placeholder="Search listings..."
            type="search"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-ink"
              aria-label="Clear search"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onTypeChange(option.value)}
              aria-pressed={activeType === option.value}
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-black transition duration-200 ${
                activeType === option.value
                  ? 'bg-ink text-white shadow-[0_10px_22px_rgba(15,23,42,0.18)]'
                  : 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm font-bold text-stone-600 lg:justify-end">
          <span>{count.toLocaleString()} result{count === 1 ? '' : 's'}</span>
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-stone-700">
            <SlidersHorizontal size={16} aria-hidden="true" />
            Most recent
          </span>
        </div>
      </div>
    </div>
  );
}
