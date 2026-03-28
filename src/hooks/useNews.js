import { useState, useEffect, useCallback, useRef } from "react";
import api from "../utils/api";

const HOME_PAGE_SIZE = 24;
const CATEGORY_PAGE_SIZE = 13;
const SEARCH_PAGE_SIZE = 24;
const DEFAULT_LOCALE = "np,in,us,gb,au,ca";
const WORLD_LOCALE = "us,gb,au,ca";
const MIN_CATEGORY_ARTICLES = 13;
const MAX_INITIAL_PAGE_FETCHES = 5;

export default function useNews(category = "", search = "") {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const abortRef = useRef(null);
  const pageSize = search
    ? SEARCH_PAGE_SIZE
    : category
      ? CATEGORY_PAGE_SIZE
      : HOME_PAGE_SIZE;

  const buildParams = useCallback(
    (pg) => {
      const params = {
        locale: DEFAULT_LOCALE,
        language: "en",
        limit: pageSize,
        page: pg,
        sort: "published_at",
      };
      if (category && category !== "world") params.categories = category;
      if (category === "world") {
        params.locale = WORLD_LOCALE;
        params.search = search || "world";
      } else if (search) {
        params.search = search;
      } else if (category) {
        delete params.search;
      } else {
        params.search = "nepal";
      }
      return params;
    },
    [category, pageSize, search]
  );

  const fetchArticles = useCallback(
    async (reset = false) => {
      // Cancel in-flight request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const currentPage = reset ? 1 : page;
      if (reset) {
        setLoading(true);
        setArticles([]);
        setFeatured(null);
        setPage(1);
        setHasMore(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      try {
        if (reset) {
          const combined = [];
          let nextPage = 1;
          let meta = {};
          const targetCount = category ? MIN_CATEGORY_ARTICLES : pageSize;

          while (nextPage <= MAX_INITIAL_PAGE_FETCHES && combined.length < targetCount) {
            const res = await api.get("/news/all", {
              params: buildParams(nextPage),
              signal: abortRef.current.signal,
            });

            const batch = res.data?.data || [];
            meta = res.data?.meta || meta;

            if (batch.length === 0) {
              break;
            }

            const seen = new Set(combined.map((article) => article.uuid));
            batch.forEach((article) => {
              if (!seen.has(article.uuid)) {
                combined.push(article);
                seen.add(article.uuid);
              }
            });

            if (batch.length < pageSize) {
              nextPage += 1;
              break;
            }

            nextPage += 1;
          }

          setTotalCount(meta.found || combined.length || 0);

          if (combined.length > 0) {
            setFeatured(combined[0]);
            setArticles(combined.slice(1));
          } else {
            setArticles([]);
          }

          setPage(nextPage);
          setHasMore(combined.length < (meta.found || Infinity));
        } else {
          const res = await api.get("/news/all", {
            params: buildParams(currentPage),
            signal: abortRef.current.signal,
          });

          const data = res.data?.data || [];
          const meta = res.data?.meta || {};
          setTotalCount(meta.found || 0);
          setArticles((prev) => [...prev, ...data]);
          setPage(currentPage + 1);
          if (data.length < pageSize) setHasMore(false);
        }
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(err.message || "Failed to load news. Please try again.");
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, search, buildParams, pageSize]
  );

  // Fetch trending (top headlines, no category filter)
  const fetchTrending = useCallback(async () => {
    try {
      const res = await api.get("/news/all", {
        params: {
          locale: DEFAULT_LOCALE,
          language: "en",
          limit: 8,
          sort: "published_at",
          search: "nepal",
        },
      });
      setTrending(res.data?.data || []);
    } catch {
      // silently fail trending
    }
  }, []);

  useEffect(() => {
    fetchArticles(true);
  }, [category, search]); // eslint-disable-line

  useEffect(() => {
    fetchTrending();
  }, []); // eslint-disable-line

  const loadMore = () => {
    if (!loadingMore && hasMore) fetchArticles(false);
  };

  const retry = () => fetchArticles(true);

  return {
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
  };
}

export function useWorldNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorldNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/news/all", {
        params: {
          locale: WORLD_LOCALE,
          language: "en",
          limit: 8,
          sort: "published_at",
          search: "world",
        },
      });
      setArticles(res.data?.data || []);
    } catch (err) {
      setError(err.message || "Failed to load world news.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorldNews();
  }, [fetchWorldNews]);

  return { articles, loading, error, retry: fetchWorldNews };
}

// Bookmarks hook
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("np_bookmarks") || "[]");
    } catch {
      return [];
    }
  });

  const toggle = useCallback((article) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.uuid === article.uuid);
      const next = exists
        ? prev.filter((b) => b.uuid !== article.uuid)
        : [article, ...prev];
      localStorage.setItem("np_bookmarks", JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (uuid) => bookmarks.some((b) => b.uuid === uuid),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked };
}
