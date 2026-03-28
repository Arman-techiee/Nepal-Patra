import { CATEGORIES } from "../utils/helpers";

export default function Footer({ setCategory }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-white mt-20">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🇳🇵</span>
                <div>
                <div className="font-heading text-2xl text-white tracking-widest">NEPAL PATRA</div>
                <div className="font-display italic text-white/40 text-xs">The Voice of Nepal</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Delivering trusted, comprehensive news from Nepal and the world since 2024.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {["𝕏", "f", "in", "▶"].map((icon) => (
                <button
                  key={icon}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-red transition-colors flex items-center justify-center text-sm font-bold"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-heading tracking-widest text-sm text-brand-gold mb-4">SECTIONS</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.value}>
                  <button
                    onClick={() => setCategory(cat.value)}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading tracking-widest text-sm text-brand-gold mb-4">MORE</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(5).map((cat) => (
                <li key={cat.value}>
                  <button
                    onClick={() => setCategory(cat.value)}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {year} Nepal Patra. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              href="https://www.thenewsapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-gold-light transition-colors"
            >
              TheNewsAPI
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/Arman-techiee/Nepal-Patra.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:arman.techiee@gmail.com"
              className="hover:text-white transition-colors"
            >
              arman.techiee@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
