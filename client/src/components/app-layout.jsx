import { LogOut, Plus, Search } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth-context.jsx';

const navLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/my-listings', label: 'My Listings' },
  { to: '/profile', label: 'Profile' }
];

export function AppLayout() {
  const { isAuthenticated, logout } = useAuth();

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
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 hover:bg-stone-100"
              aria-label="Browse listings"
              title="Browse listings"
            >
              <Search size={18} />
            </Link>
            <Link
              to="/post"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-campus text-white hover:bg-[#135a72]"
              aria-label="Post item"
              title="Post item"
            >
              <Plus size={18} />
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 hover:bg-stone-100"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-md border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
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
    </div>
  );
}
