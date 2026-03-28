import { formatDistanceToNow, parseISO, format } from "date-fns";

export function timeAgo(dateStr) {
  if (!dateStr) return "";
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return "";
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return format(parseISO(dateStr), "MMM d, yyyy");
  } catch {
    return "";
  }
}

export function formatFullDate(dateStr) {
  if (!dateStr) return "";
  try {
    return format(parseISO(dateStr), "EEEE, MMMM d, yyyy · h:mm a");
  } catch {
    return "";
  }
}

export function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Unknown source";
  }
}

export function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

export const CATEGORIES = [
  { label: "Top Stories", value: "", icon: "🏔️" },
  { label: "World", value: "world", icon: "🌍" },
  { label: "Politics", value: "politics", icon: "🏛️" },
  { label: "Business", value: "business", icon: "📈" },
  { label: "Technology", value: "tech", icon: "💻" },
  { label: "Sports", value: "sports", icon: "⚽" },
  { label: "Health", value: "health", icon: "🏥" },
  { label: "Science", value: "science", icon: "🔬" },
  { label: "Entertainment", value: "entertainment", icon: "🎭" },
  { label: "Travel", value: "travel", icon: "✈️" },
];

export const CATEGORY_STYLES = {
  world: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
  politics: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  business: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  tech: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
  sports: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  health: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  science: { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-500" },
  entertainment: { bg: "bg-pink-50", text: "text-pink-700", dot: "bg-pink-500" },
  travel: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  general: { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" },
};

export function getCategoryStyle(categories) {
  const cat = Array.isArray(categories) ? categories[0] : categories;
  return CATEGORY_STYLES[cat] || CATEGORY_STYLES.general;
}

export function getCategoryLabel(categories) {
  const cat = Array.isArray(categories) ? categories[0] : categories;
  const found = CATEGORIES.find((c) => c.value === cat);
  return found ? found.label : cat || "General";
}
