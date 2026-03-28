import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES } from "../utils/helpers";

export default function Header({
  search,
  setSearch,
  category,
  setCategory,
  bookmarkCount,
  activeTab,
  setActiveTab,
}) {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [searchVal, setSearchVal] = useState(search);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileSearch) searchRef.current?.focus();
  }, [mobileSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchVal.trim());
    setMobileSearch(false);
  };

  const nepaliDate = new Date().toLocaleDateString("ne-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-xl backdrop-blur-md bg-white/95 dark:bg-surface-950/95"
          : "bg-white dark:bg-surface-950"
      }`}
    >
      {/* Top strip — date + breaking */}
      <div className="bg-brand-red text-white text-xs">
        <div className="max-w-screen-xl mx-auto px-4 h-8 flex items-center justify-between">
          <span className="font-mono opacity-80 hidden sm:block">{nepaliDate}</span>
          <div className="flex items-center gap-2">
            <span className="bg-white text-brand-red font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-widest animate-pulse-slow">
              Live
            </span>
            <span className="opacity-90">Nepal's Premier Digital Newsroom</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 opacity-70">
            <span>NP</span>
            <span>|</span>
            <span>EN</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            onClick={() => { setCategory(""); setSearch(""); setSearchVal(""); setActiveTab("home"); }}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="relative">
              <span className="text-2xl">🇳🇵</span>
            </div>
            <div className="leading-none">
              <div className="font-heading text-3xl text-brand-red tracking-wide group-hover:text-brand-red-dark transition-colors">
                NEPAL PATRA
              </div>
              <div className="font-display italic text-ink-500 dark:text-ink-300 text-xs tracking-widest -mt-0.5">
                The Voice of Nepal
              </div>
            </div>
          </button>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-sm mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search Nepal Patra news…"
                className="w-full pl-4 pr-10 py-2 text-sm rounded-full border border-surface-200 dark:border-ink-700 bg-surface-100 dark:bg-surface-900 text-ink-900 dark:text-ink-100 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-brand-red transition-colors"
              >
                <SearchIcon />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileSearch((v) => !v)}
              className="md:hidden p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors text-ink-500"
            >
              <SearchIcon />
            </button>

            {/* Bookmarks */}
            <button
              onClick={() => setActiveTab(activeTab === "bookmarks" ? "home" : "bookmarks")}
              className={`relative p-2 rounded-full transition-colors ${
                activeTab === "bookmarks"
                  ? "bg-brand-red text-white"
                  : "hover:bg-surface-100 dark:hover:bg-surface-900 text-ink-500"
              }`}
            >
              <BookmarkIcon filled={activeTab === "bookmarks"} />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkCount > 9 ? "9+" : bookmarkCount}
                </span>
              )}
            </button>

            {/* Dark mode */}
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors text-ink-500 dark:text-ink-300"
              aria-label="Toggle dark mode"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-full hover:bg-surface-100 transition-colors text-ink-500"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileSearch && (
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-3 animate-fade-in"
          >
            <div className="relative">
              <input
                ref={searchRef}
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search Nepal Patra news…"
                className="w-full pl-4 pr-10 py-2.5 text-sm rounded-full border border-surface-200 dark:border-ink-700 bg-surface-100 dark:bg-surface-900 text-ink-900 dark:text-ink-100 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-red/40"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400">
                <SearchIcon />
              </button>
            </div>
          </form>
        )}

        {/* Mobile nav menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-surface-200 dark:border-ink-700 animate-fade-in">
            <div className="grid grid-cols-3 gap-2 pt-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setCategory(cat.value);
                    setMenuOpen(false);
                    setActiveTab("home");
                  }}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                    category === cat.value
                      ? "bg-brand-red text-white"
                      : "bg-surface-100 dark:bg-surface-900 text-ink-700 dark:text-ink-300 hover:bg-surface-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop category nav */}
      <nav className="hidden md:block border-t border-surface-200 dark:border-ink-700">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setCategory(cat.value); setActiveTab("home"); }}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  category === cat.value && activeTab === "home"
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-ink-500 dark:text-ink-300 hover:text-brand-red hover:border-brand-red/40"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

// Icons
function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function BookmarkIcon({ filled }) {
  return (
    <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
