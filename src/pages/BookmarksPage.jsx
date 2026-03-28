import { Bookmark, Pin } from "lucide-react";
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
          <div className="hidden sm:flex items-center gap-2 text-xs text-ink-400 bg-surface-100 dark:bg-surface-900 px-4 py-2 rounded-full">
            <Pin className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Stored locally on your device</span>
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-5 rounded-full bg-surface-100 dark:bg-surface-900 p-5 text-brand-red">
            <Bookmark className="w-12 h-12" strokeWidth={1.8} />
          </div>
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
