import useNews, { useWorldNews } from "../hooks/useNews";
import FeaturedCard from "../components/FeaturedCard";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { SkeletonCard, SkeletonFeatured } from "../components/SkeletonCard";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { CATEGORIES } from "../utils/helpers";

export default function HomePage({
  category,
  search,
  onClearSearch,
  onSearchTopic,
  onBookmark,
  isBookmarked,
}) {
  const {
    articles,
    featured,
    trending,
    loading,
    loadingMore,
    error,
    hasMore,
    totalCount,
    loadMore,
    retry,
  } = useNews(category, search);
  const {
    articles: worldArticles,
    loading: worldLoading,
    error: worldError,
    retry: retryWorld,
  } = useWorldNews();

  const catInfo = CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        {search ? (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="section-divider mb-0">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                Search Results
              </span>
            </div>
            <span className="text-ink-400 text-sm">
              {loading ? "Searching…" : `${totalCount > 0 ? `~${totalCount}` : "No"} results for`}
            </span>
            <span className="font-semibold text-ink-900 dark:text-ink-100">"{search}"</span>
            <button
              onClick={onClearSearch}
              className="text-xs text-brand-red hover:underline"
            >
              Clear
            </button>
          </div>
        ) : (
          <div className="section-divider">
            <span className="text-lg">
              {catInfo.icon}
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
              {catInfo.label}
            </span>
            {!loading && totalCount > 0 && (
              <span className="text-xs text-ink-400 ml-auto font-mono">
                {totalCount.toLocaleString()} stories
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && <ErrorState message={error} onRetry={retry} />}

      {!error && (
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
          {/* Main content */}
          <div>
            {/* Featured article */}
            {loading ? (
              <div className="mb-8">
                <SkeletonFeatured />
              </div>
            ) : featured ? (
              <div className="mb-8">
                <FeaturedCard
                  article={featured}
                  onBookmark={onBookmark}
                  isBookmarked={isBookmarked}
                />
              </div>
            ) : null}

            {/* Section label for grid */}
            {!loading && articles.length > 0 && (
              <div className="section-divider mb-5">
                <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                  More Stories
                </span>
              </div>
            )}

            {/* Article grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : articles.length === 0 && !featured ? (
              <EmptyState search={search} onClear={onClearSearch} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article, i) => (
                  <NewsCard
                    key={article.uuid || i}
                    article={article}
                    index={i}
                    onBookmark={onBookmark}
                    isBookmarked={isBookmarked}
                  />
                ))}
              </div>
            )}

            {/* Load more skeletons */}
            {loadingMore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Load More button */}
            {!loading && hasMore && articles.length > 0 && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 bg-ink-900 dark:bg-white dark:text-ink-900 hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white text-white font-semibold px-10 py-3.5 rounded-full transition-all duration-200 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Loading more stories…
                    </>
                  ) : (
                    <>
                      Load More Stories
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* End of feed */}
            {!loading && !hasMore && articles.length > 0 && (
              <p className="text-center text-ink-300 dark:text-ink-500 text-sm mt-10 font-mono">
                — You've reached the end —
              </p>
            )}

            {/* World section */}
            {!search && !category && (
              <section className="mt-16">
                <div className="section-divider mb-5">
                  <span className="text-lg">🌍</span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                    World
                  </span>
                </div>

                {worldError ? (
                  <ErrorState message={worldError} onRetry={retryWorld} />
                ) : worldLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {worldArticles.map((article, i) => (
                      <NewsCard
                        key={article.uuid || `world-${i}`}
                        article={article}
                        index={i}
                        onBookmark={onBookmark}
                        isBookmarked={isBookmarked}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <Sidebar
                trending={trending}
                loading={loading}
                onSearch={onSearchTopic}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
