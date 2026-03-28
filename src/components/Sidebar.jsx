import { useEffect, useState } from "react";
import { timeAgo } from "../utils/helpers";
import {
  CloudSun,
  Droplets,
  Flame,
  Tags,
  Newspaper,
  Mountain,
  Languages,
} from "lucide-react";
import { SkeletonCompact } from "./SkeletonCard";

function NepalTimeWidget() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const nepalTime = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const nepalDate = now.toLocaleDateString("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="bg-nepal-gradient p-5 text-white text-center">
        <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Kathmandu</p>
        <p className="font-heading text-5xl tracking-wider">{nepalTime}</p>
        <p className="text-xs opacity-60 mt-1">{nepalDate}</p>
        <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs opacity-70">
          <div className="flex items-center justify-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5" strokeWidth={2} />
            <span>22°C Partly Cloudy</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Humidity 65%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ trending, loading, onSearch, timeOnly = false }) {

  const topics = [
    "Kathmandu", "Parliament", "Everest", "Economy", "Election",
    "Tourism", "Buddha", "Himalayas", "Monsoon", "Development",
  ];

  return (
    <aside className="space-y-6">
      {/* Nepal Time Widget */}
      <NepalTimeWidget />

      {timeOnly ? null : (
        <>

          {/* Trending */}
          <div className="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-card">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-surface-200 dark:border-ink-700">
              <Flame className="w-4 h-4 text-brand-red" strokeWidth={2} />
              <h3 className="font-heading text-xl tracking-wide text-ink-900 dark:text-ink-100">
                TRENDING
              </h3>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-ink-700">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCompact key={i} />)
                : trending.slice(0, 5).map((a, i) => (
                    <a
                      key={a.uuid}
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 p-4 hover:bg-surface-50 dark:hover:bg-surface-900/50 transition-colors group"
                    >
                      <span className="font-heading text-3xl text-surface-200 dark:text-ink-700 w-8 flex-shrink-0 leading-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink-900 dark:text-ink-100 line-clamp-2 group-hover:text-brand-red transition-colors leading-snug">
                          {a.title}
                        </p>
                        <p className="text-xs text-ink-400 mt-1">{timeAgo(a.published_at)}</p>
                      </div>
                    </a>
                  ))}
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Tags className="w-4 h-4 text-brand-red" strokeWidth={2} />
              <h3 className="font-heading text-xl tracking-wide text-ink-900 dark:text-ink-100">
                EXPLORE TOPICS
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => onSearch(t)}
                  className="px-3 py-1.5 rounded-full border border-surface-200 dark:border-ink-700 text-sm text-ink-600 dark:text-ink-300 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="bg-ink-900 dark:bg-black rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-gold">
                <Newspaper className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <span className="font-heading text-2xl tracking-wider">NEPAL PATRA</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Nepal's premier digital newsroom. Delivering comprehensive, unbiased coverage of politics, business, culture, and society from the heart of the Himalayas.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { value: "24/7", label: "Coverage" },
                { icon: Mountain, label: "Nepal Focus" },
                { icon: Languages, label: "English" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/5 rounded-lg p-2">
                    <div className="text-brand-gold font-bold text-sm flex justify-center">
                      {Icon ? <Icon className="w-4 h-4" strokeWidth={2} /> : item.value}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
