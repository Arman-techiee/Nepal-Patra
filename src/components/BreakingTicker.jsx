export default function BreakingTicker({ articles }) {
  if (!articles || articles.length === 0) return null;

  const items = [...articles, ...articles]; // duplicate for seamless loop

  return (
    <div className="bg-ink-900 dark:bg-black text-white flex items-center overflow-hidden h-9">
      {/* Label */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 h-full bg-brand-red z-10">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="font-heading text-sm tracking-widest whitespace-nowrap">
          BREAKING
        </span>
      </div>

      {/* Ticker */}
      <div className="ticker-wrap flex-1 relative">
        <div className="ticker-inner">
          {items.map((a, i) => (
            <a
              key={`${a.uuid}-${i}`}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 text-sm text-white/80 hover:text-brand-gold transition-colors whitespace-nowrap"
            >
              <span className="text-brand-gold text-xs">◆</span>
              {a.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
