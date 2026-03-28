import NewsCard from "../components/NewsCard";
import EmptyState from "../components/EmptyState";

export default function BookmarksPage({ bookmarks, onBookmark, isBookmarked }) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="section-divider mb-1">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
              Saved Articles
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold text-ink-900 dark:text-ink-100">
            Your Bookmarks
          </h2>
          <p className="text-ink-400 text-sm mt-1">
            {bookmarks.length} article{bookmarks.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        {bookmarks.length > 0 && (
          <div className="hidden sm:block text-xs text-ink-400 bg-surface-100 dark:bg-surface-900 px-4 py-2 rounded-full">
            📌 Stored locally on your device
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-7xl mb-5">🔖</div>
          <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100 mb-2">
            No bookmarks yet
          </h3>
          <p className="text-ink-400 text-sm max-w-sm">
            Tap the bookmark icon on any article to save it for later reading.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article, i) => (
            <NewsCard
              key={article.uuid}
              article={article}
              index={i}
              onBookmark={onBookmark}
              isBookmarked={isBookmarked}
            />
          ))}
        </div>
      )}
    </div>
  );
}
