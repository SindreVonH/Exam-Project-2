import React, { useState } from "react";
import { useVenues } from "../hooks/useVenues";
import { VenueCardHome } from "../components/home/VenueCardHome";
import LayoutWrapper from "../components/commen/LayoutWrapper";
import heroImage from "../assets/hero.png";
import { ChevronUp, ChevronDown, Minus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VENUES_PER_PAGE = 20;
type SortOrder = "asc" | "desc" | "";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<"price" | "beds" | "latest" | "">("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { venues, isLoading, isError } = useVenues(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search.trim());
    setCurrentPage(1);
  };

  const toggleSort = (field: "price" | "beds" | "latest") => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortField("");
      setSortOrder("");
    }
  };

  const sortedVenues = [...venues].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;
    let comparison = 0;

    if (sortField === "price") comparison = a.price - b.price;
    if (sortField === "beds") comparison = a.maxGuests - b.maxGuests;
    if (sortField === "latest")
      comparison = new Date(b.created).getTime() - new Date(a.created).getTime();

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedVenues.length / VENUES_PER_PAGE);
  const paginatedVenues = sortedVenues.slice(
    (currentPage - 1) * VENUES_PER_PAGE,
    currentPage * VENUES_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-xl overflow-hidden relative mb-6"
        >
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] object-cover"
          />
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center text-xl sm:text-3xl md:text-4xl font-bold text-white px-6 text-center"
          >
            Find your perfect getaway
          </motion.h1>
        </motion.section>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search venues..."
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-lg sm:text-xl"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-lg sm:text-xl font-semibold"
          >
            Search
          </button>
        </form>

        {/* Spinner */}
        {isLoading && (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin text-[var(--color-muted)] w-6 h-6" />
          </div>
        )}

        {/* Filters */}
        <section className="flex gap-3 flex-wrap text-lg sm:text-2xl font-medium text-[var(--color-text)] pt-6">
          {["price", "beds", "latest"].map((field) => {
            const label = field === "price" ? "Price" : field === "beds" ? "Beds" : "Latest";
            const isActive = sortField === field;
            const icon = !isActive ? (
              <Minus size={16} />
            ) : sortOrder === "asc" ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            );

            return (
              <button
                key={field}
                onClick={() => toggleSort(field as "price" | "beds" | "latest")}
                className={`flex items-center gap-1 px-3 py-1 rounded transition 
                  ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
                  }`}
              >
                {label} {icon}
              </button>
            );
          })}
        </section>

        {/* Result Info */}
        {query && !isLoading && (
          <p className="text-sm text-[var(--color-muted)] text-center pt-4">
            Showing results for <span className="font-semibold">"{query}"</span>
          </p>
        )}

        {/* Venue Grid */}
        <section className="pt-6">
          {isError && <p className="text-red-500">Error loading venues</p>}
          {!isLoading && !isError && paginatedVenues.length === 0 && (
            <p className="text-[var(--color-muted)] text-center pt-4">No results found.</p>
          )}

          {!isLoading && !isError && paginatedVenues.length > 0 && (
            <>
              <AnimatePresence>
                <motion.ul
                  key={query + currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                >
                  {paginatedVenues.map((venue) => (
                    <VenueCardHome key={venue.id} venue={venue} />
                  ))}
                </motion.ul>
              </AnimatePresence>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6 text-base sm:text-lg">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 rounded bg-[var(--color-border)] hover:bg-[var(--color-muted)]/20 transition disabled:opacity-40"
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-4 py-2 rounded bg-[var(--color-border)] hover:bg-[var(--color-muted)]/20 transition disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </LayoutWrapper>
    </main>
  );
}
