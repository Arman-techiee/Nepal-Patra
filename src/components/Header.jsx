import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bookmark,
  Moon,
  Sun,
  Menu,
  X,
  Newspaper,
} from "lucide-react";
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
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
              <Newspaper className="w-5 h-5" strokeWidth={2.2} />
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
                <Search className="w-5 h-5" strokeWidth={2} />
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
              <Search className="w-5 h-5" strokeWidth={2} />
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
              <Bookmark
                className="w-5 h-5"
                strokeWidth={2}
                fill={activeTab === "bookmarks" ? "currentColor" : "none"}
              />
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
              {dark ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-full hover:bg-surface-100 transition-colors text-ink-500"
            >
              {menuOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
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
                <Search className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </form>
        )}

        {/* Mobile nav menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-surface-200 dark:border-ink-700 animate-fade-in">
            <div className="grid grid-cols-3 gap-2 pt-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
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
                  <Icon className="w-4 h-4" strokeWidth={2} />
                  <span>{cat.label}</span>
                </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Desktop category nav */}
      <nav className="hidden md:block border-t border-surface-200 dark:border-ink-700">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
              <button
                key={cat.value}
                onClick={() => { setCategory(cat.value); setActiveTab("home"); }}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  category === cat.value && activeTab === "home"
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-ink-500 dark:text-ink-300 hover:text-brand-red hover:border-brand-red/40"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {cat.label}
              </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
