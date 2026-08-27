import {
  CircleDollarSign,
  HelpCircle,
  Home,
  LogOut,
  PackageCheck,
  Plus,
  Search,
  UserRound
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth-context.jsx';

const navLinks = [
  { to: '/browse', label: 'Browse', icon: Search },
  { to: '/my-listings', label: 'My Listings', icon: PackageCheck },
  { to: '/profile', label: 'Profile', icon: UserRound }
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
    <div className="min-h-screen bg-[#f7f8f4] bg-[radial-gradient(circle_at_top_left,rgba(23,107,135,0.08),transparent_30rem)]">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-xl font-extrabold tracking-tight text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-campus text-white">
              <Home size={18} aria-hidden="true" />
            </span>
            <span>Recampus</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-pill ${
                      isActive ? 'bg-teal-50 text-campus' : 'text-stone-700 hover:bg-stone-100'
                    }`
                  }
                >
                  <Icon size={17} aria-hidden="true" />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/browse"
              className="btn-icon"
              aria-label="Browse listings"
              title="Browse listings"
            >
              <Search size={18} />
            </Link>
            <div className="relative" ref={postMenuRef}>
              <button
                type="button"
                onClick={() => setIsPostMenuOpen((current) => !current)}
                className="btn-primary h-11 w-11 px-0 py-0"
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
                  className="absolute right-0 z-40 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-stone-200 bg-white p-2 shadow-xl"
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
                className="btn-icon"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                to="/login"
                className="btn-secondary px-3"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 md:py-8 md:pb-8">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-2 text-[11px] font-bold transition duration-200 active:scale-[0.98] ${
                    isActive ? 'bg-teal-50 text-campus' : 'text-stone-600 hover:bg-stone-100'
                  }`
                }
              >
                <Icon size={19} aria-hidden="true" />
                <span>{link.label === 'My Listings' ? 'Mine' : link.label}</span>
              </NavLink>
            );
          })}
          <Link
            to="/post"
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-md border border-[#0f5a72] bg-campus bg-gradient-to-b from-[#2180a0] via-campus to-[#115670] px-2 text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(23,107,135,0.22)] transition duration-200 active:scale-[0.98]"
          >
            <Plus size={19} aria-hidden="true" />
            <span>Post</span>
          </Link>
        </div>
      </nav>

      <footer className="mx-auto hidden max-w-6xl flex-col gap-3 border-t border-stone-200 px-4 py-6 text-sm text-stone-600 md:flex md:flex-row md:items-center md:justify-between">
        <p>Verified college accounts, safer campus exchanges.</p>
        <Link to="/terms" className="font-semibold text-campus hover:text-[#135a72]">
          Terms & community guidelines
        </Link>
      </footer>
    </div>
  );
}
