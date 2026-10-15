import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Explore Books", to: "/books" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { user, logout } = useLibrary();
  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/books?q=${encodeURIComponent(searchText.trim())}`);
    setMobileOpen(false);
  }

  function handleLogout() {
    logout();
    setProfileOpen(false);
    navigate("/");
  }

  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap text-sm font-medium transition ${
      isActive ? "text-emerald-900" : "text-slate-600 hover:text-emerald-900"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-[#fbfaf6]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[#287653] text-white">
            <BookOpen size={21} />
          </span>
          <span>
            <span className="block font-display text-xl font-bold tracking-tight text-slate-900">
              LIBRORA
            </span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.19em] text-slate-500 sm:block">
              Your world of knowledge
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <a
            href="/#services"
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-emerald-900"
          >
            Services
          </a>
          <a
            href="/#guidelines"
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-emerald-900"
          >
            Guidelines
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <form
            onSubmit={submitSearch}
            className="flex h-10 w-40 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 xl:w-52"
          >
            <Search size={16} className="shrink-0 text-slate-400" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Find a book..."
              aria-label="Search books"
              className="w-full min-w-0 bg-transparent text-xs outline-none"
            />
          </form>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full bg-[#287653] px-3 py-2 text-sm font-semibold text-white"
              >
                <UserRound size={16} />
                <span className="max-w-24 truncate">{user.name.split(" ")[0]}</span>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-50"
                  >
                    <LayoutDashboard size={16} /> My dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-rose-700 hover:bg-rose-50"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#287653] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d5d40]"
            >
              Member login
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-800 md:hidden"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-200 bg-[#fbfaf6] p-4 md:hidden">
          <form
            onSubmit={submitSearch}
            className="mb-4 flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"
          >
            <Search size={17} className="text-slate-400" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search title or author..."
              aria-label="Search books"
              className="w-full bg-transparent text-sm outline-none"
            />
            <button type="submit" className="text-sm font-semibold text-emerald-900">
              Go
            </button>
          </form>

          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-sm font-semibold ${
                    isActive ? "bg-emerald-50 text-emerald-900" : "text-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="/#services"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700"
            >
              Library services
            </a>
            <a
              href="/#guidelines"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700"
            >
              Library guidelines
            </a>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-emerald-900"
                >
                  <LayoutDashboard size={17} /> Student dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-semibold text-rose-700"
                >
                  <LogOut size={17} /> Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#287653] px-4 py-3 font-semibold text-white"
              >
                <UserRound size={17} /> Member login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
