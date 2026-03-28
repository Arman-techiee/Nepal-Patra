export function SkeletonCard() {
  return (
    <div className="news-card dark:bg-surface-900 flex flex-col">
      <div className="skeleton" style={{ paddingTop: "56.25%" }} />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-4/5 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex justify-between pt-2 border-t border-surface-200 dark:border-ink-700">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonFeatured() {
  return (
    <div className="rounded-3xl overflow-hidden animate-pulse">
      <div className="skeleton h-[420px] sm:h-[500px] lg:h-[560px] w-full" />
    </div>
  );
}

export function SkeletonCompact() {
  return (
    <div className="flex gap-3 p-3">
      <div className="skeleton w-20 h-16 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
        <div className="skeleton h-2 w-16 rounded" />
      </div>
    </div>
  );
}
