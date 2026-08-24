import { CircleDollarSign, HelpCircle, LogOut, PackageCheck, Plus, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth-context.jsx';

const navLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/my-listings', label: 'My Listings' },
  { to: '/profile', label: 'Profile' }
];

const postOptions = [
  {
    to: '/post/lost',
    label: 'Lost item',
    description: 'Ask campus to help find it',
    icon: HelpCircle
  },
  {
    to: '/post/found',
    label: 'Found item',
    description: 'Return something you found',
    icon: PackageCheck
  },
  {
    to: '/post/sale',
    label: 'Sell item',
    description: 'List a student marketplace item',
    icon: CircleDollarSign
  }
];

export function AppLayout() {
  const { isAuthenticated, logout } = useAuth();
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const postMenuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!postMenuRef.current?.contains(event.target)) {
        setIsPostMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPostMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8f4]">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="text-xl font-bold text-ink">
            CampusHub
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-stone-100 text-campus' : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/browse"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 transition hover:bg-stone-100"
              aria-label="Browse listings"
              title="Browse listings"
            >
              <Search size={18} />
            </Link>
            <div className="relative" ref={postMenuRef}>
              <button
                type="button"
                onClick={() => setIsPostMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-campus text-white transition hover:bg-[#135a72]"
                aria-label="Open post options"
                aria-haspopup="menu"
                aria-expanded={isPostMenuOpen}
                title="Post item"
              >
                <Plus size={18} />
              </button>

              {isPostMenuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-20 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-stone-200 bg-white p-2 shadow-lg"
                >
                  {postOptions.map((option) => {
                    const Icon = option.icon;

                    return (
                      <Link
                        key={option.to}
                        to={option.to}
                        role="menuitem"
                        onClick={() => setIsPostMenuOpen(false)}
                        className="flex min-h-14 items-center gap-3 rounded-md px-3 py-2 text-left transition hover:bg-stone-100"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-stone-100 text-campus">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">{option.label}</span>
                          <span className="block text-xs leading-5 text-stone-600">{option.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 transition hover:bg-stone-100"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex min-h-11 items-center rounded-md border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-stone-200 px-4 py-6 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
        <p>Verified college accounts, safer campus exchanges.</p>
        <Link to="/terms" className="font-semibold text-campus hover:text-[#135a72]">
          Terms & community guidelines
        </Link>
      </footer>
    </div>
  );
}
