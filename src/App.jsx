import { useState } from "react";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { useBookmarks } from "./hooks/useNews";
import Header from "./components/Header";
import BreakingTicker from "./components/BreakingTicker";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BookmarksPage from "./pages/BookmarksPage";

function AppInner() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // "home" | "bookmarks"
  const [breakingItems, setBreakingItems] = useState([]);

  const { bookmarks, toggle: toggleBookmark, isBookmarked } = useBookmarks();

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearch("");
    setActiveTab("home");
  };

  const handleSearch = (term) => {
    setSearch(term);
    setCategory("");
    setActiveTab("home");
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleSearchTopic = (topic) => {
    setSearch(topic);
    setCategory("");
    setActiveTab("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <Header
        search={search}
        setSearch={handleSearch}
        category={category}
        setCategory={handleCategoryChange}
        bookmarkCount={bookmarks.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Breaking news ticker — shown only on home with articles */}
      {activeTab === "home" && breakingItems.length > 0 && (
        <BreakingTicker articles={breakingItems} />
      )}

      {/* Main content */}
      <main>
        {activeTab === "bookmarks" ? (
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
            <BookmarksPage
              bookmarks={bookmarks}
              onBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
            />
          </div>
        ) : (
          <HomePage
            category={category}
            search={search}
            onClearSearch={handleClearSearch}
            onSearchTopic={handleSearchTopic}
            onBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
      </main>

      <Footer setCategory={handleCategoryChange} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
