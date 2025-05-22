import { AnimatePresence, motion } from "framer-motion";
import { VenueCardHome } from "../commen/VenueCardHome";
import { VenueCardSkeleton } from "../commen/VenueCardSkeleton";
import { Venue } from "../../types/Venue";

interface VenuesListProps {
  venues: Venue[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  query: string;
  currentPage: number;
}

export default function VenuesList({
  venues,
  isLoading,
  isError,
  errorMessage,
  query,
  currentPage,
}: VenuesListProps) {
  const skeletonCount = Math.max(venues.length, 12); // alltid minst 12

  if (isLoading) {
    return (
      <section className="pt-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <VenueCardSkeleton key={i} />
          ))}
        </ul>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center pt-6">
        <p>Error loading venues.</p>
        {errorMessage && <p className="text-sm text-[var(--color-muted)] mt-1">{errorMessage}</p>}
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <p className="text-[var(--color-muted)] text-center pt-6">
        No results found{query ? ` for "${query}"` : ""}.
      </p>
    );
  }

  return (
    <section className="pt-6">
      <AnimatePresence>
        <motion.ul
          key={query + currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {venues.map((venue) => (
            <VenueCardHome key={venue.id} venue={venue} />
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
