import { Mountain, SearchX } from "lucide-react";

export default function EmptyState({ search, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="mb-5 rounded-full bg-surface-100 dark:bg-surface-900 p-5 text-brand-red">
        {search ? <SearchX className="w-12 h-12" strokeWidth={1.8} /> : <Mountain className="w-12 h-12" strokeWidth={1.8} />}
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100 mb-2">
        No articles found
      </h3>
      <p className="text-ink-400 text-sm max-w-sm mb-6">
        {search
          ? `We couldn't find any Nepal news matching "${search}". Try a different keyword.`
          : "No articles available right now. Check back soon."}
      </p>
      {search && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-2.5 rounded-full transition-all"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}
