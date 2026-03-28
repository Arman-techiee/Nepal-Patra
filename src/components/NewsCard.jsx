import { timeAgo, getDomain, getCategoryStyle, getCategoryLabel } from "../utils/helpers";
import { Bookmark, Globe2, ImageOff } from "lucide-react";

export default function NewsCard({ article, index, onBookmark, isBookmarked, variant = "default" }) {
  if (!article) return null;

  const style = getCategoryStyle(article.categories);
  const catLabel = getCategoryLabel(article.categories);
  const bookmarked = isBookmarked(article.uuid);

  if (variant === "compact") {
    return (
      <div
        className="flex gap-3 p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors group animate-fade-up"
        style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both", opacity: 0 }}
      >
        {article.image_url && (
          <div className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => { e.target.parentElement.style.display = "none"; }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-100 line-clamp-2 hover:text-brand-red dark:hover:text-brand-red transition-colors leading-snug">
              {article.title}
            </p>
          </a>
          <p className="text-xs text-ink-400 mt-1">{timeAgo(article.published_at)}</p>
        </div>
      </div>
    );
  }

  return (
    <article
      className="news-card dark:bg-surface-900 flex flex-col animate-fade-up"
      style={{ animationDelay: `${index * 70}ms`, animationFillMode: "both", opacity: 0 }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-surface-200 dark:bg-surface-900" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center"
            style={{ display: article.image_url ? "none" : "flex" }}
          >
            <ImageOff className="w-12 h-12 text-white/25" strokeWidth={1.8} />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`cat-pill ${style.bg} ${style.text} shadow-sm`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {catLabel}
          </span>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => { e.preventDefault(); onBookmark(article); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            bookmarked
              ? "bg-brand-gold text-white shadow-gold-glow"
              : "bg-black/30 text-white hover:bg-black/50"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" strokeWidth={2} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <h2 className="font-display font-semibold text-ink-900 dark:text-ink-100 text-lg leading-snug mb-2 line-clamp-2 hover:text-brand-red dark:hover:text-brand-red transition-colors">
            {article.title}
          </h2>
          {article.description && (
            <p className="text-ink-500 dark:text-ink-300 text-sm leading-relaxed line-clamp-2 mb-3">
              {article.description}
            </p>
          )}
        </a>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-surface-200 dark:border-ink-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-900 flex items-center justify-center text-xs">
              <Globe2 className="w-3.5 h-3.5 text-ink-500 dark:text-ink-300" strokeWidth={2} />
            </div>
            <span className="text-xs text-ink-400 font-medium truncate max-w-[120px]">
              {getDomain(article.url)}
            </span>
          </div>
          <span className="text-xs text-ink-400 font-mono flex-shrink-0">
            {timeAgo(article.published_at)}
          </span>
        </div>
      </div>
    </article>
  );
}
