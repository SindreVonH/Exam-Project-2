import { useEffect, useState } from "react";
import LayoutWrapper from "../components/commen/LayoutWrapper";
import { HeroSection } from "../components/home/HeroSection";
import SearchSection from "../components/home/SearchSection";
import SortButtons from "../components/home/SortButtons";
import VenuesList from "../components/home/VenuesList";
import PaginationControls from "../components/home/PaginationControls";
import { useVenueSearch, VenueFilters } from "../hooks/useVenueSearch";

const STORAGE_KEY = "homepageState";
const SCROLL_KEY = "scrollY";

export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");

  // 1. Restore state from sessionStorage on first load
  const stored = sessionStorage.getItem(STORAGE_KEY);
  const parsed = stored
    ? (JSON.parse(stored) as { filters: VenueFilters; searchInput: string })
    : null;

  const { venues, meta, isLoading, isError, errorMessage, filters, setFilters } = useVenueSearch(
    parsed?.filters ?? {
      query: "",
      sortField: "",
      sortOrder: "asc",
      page: 1,
      limit: 12,
    }
  );

  useEffect(() => {
    if (parsed?.searchInput) {
      setSearchInput(parsed.searchInput);
    }
  }, []);

  // 2. Restore scroll position on mount
  useEffect(() => {
    const y = sessionStorage.getItem(SCROLL_KEY);
    if (y) {
      window.scrollTo({ top: parseInt(y, 10), behavior: "auto" });
    }
  }, []);

  // 3. Save state and scroll position continuously
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ filters, searchInput }));
  }, [filters, searchInput]);

  // 4. Save scroll on unload or navigation
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        <HeroSection />
        <SearchSection
          search={searchInput}
          setSearch={setSearchInput}
          onSubmit={(e) => {
            e.preventDefault();
            setFilters((prev) => ({
              ...prev,
              query: searchInput.trim(),
              page: 1,
            }));
          }}
        />
        <SortButtons
          activeSort={filters.sortField}
          sortOrder={filters.sortOrder}
          onSort={(field) =>
            setFilters((prev) => {
              if (prev.sortField !== field) {
                return { ...prev, sortField: field, sortOrder: "asc", page: 1 };
              } else if (prev.sortOrder === "asc") {
                return { ...prev, sortOrder: "desc", page: 1 };
              } else {
                return { ...prev, sortField: "", sortOrder: "asc", page: 1 };
              }
            })
          }
        />
        <VenuesList
          venues={venues}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          query={filters.query}
          currentPage={filters.page}
        />
        <PaginationControls
          currentPage={filters.page}
          totalPages={meta?.pageCount || 1}
          setCurrentPage={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </LayoutWrapper>
    </main>
  );
}
