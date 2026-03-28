import { timeAgo, getDomain, getCategoryStyle, getCategoryLabel } from "../utils/helpers";
import { ArrowRight, Bookmark, ImageOff } from "lucide-react";

export default function FeaturedCard({ article, onBookmark, isBookmarked }) {
  if (!article) return null;
  const style = getCategoryStyle(article.categories);
  const catLabel = getCategoryLabel(article.categories);
  const bookmarked = isBookmarked(article.uuid);

  return (
    <div className="featured-card group animate-fade-up">
      {/* Background image */}
      <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-red flex items-center justify-center">
            <ImageOff className="w-14 h-14 text-white/35" strokeWidth={1.8} />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className={`cat-pill ${style.bg} ${style.text} shadow-lg`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {catLabel}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); onBookmark(article); }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              bookmarked
                ? "bg-brand-gold text-white"
                : "bg-white/20 text-white hover:bg-white/40"
            }`}
          >
            <Bookmark className="w-4 h-4" strokeWidth={2} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                Featured
              </span>
              <span className="text-white/60 text-xs font-mono">{getDomain(article.url)}</span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/60 text-xs">{timeAgo(article.published_at)}</span>
            </div>

            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h1 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-3 hover:text-brand-gold transition-colors cursor-pointer">
                {article.title}
              </h1>
            </a>

            {article.description && (
              <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-2xl">
                {article.description}
              </p>
            )}

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-glow"
            >
              Read Full Story
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
