import { AnimatePresence, motion } from "framer-motion";
import { VenueCardHome } from "../common/VenueCardHome";
import { VenueCardSkeleton } from "../common/VenueCardSkeleton";
import { Venue } from "../../types/Venue";

interface Props {
  venues: Venue[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export default function CompactVenuesList({ venues, isLoading, isError, errorMessage }: Props) {
  const skeletonCount = 4;

  if (isLoading) {
    return (
      <section className="pt-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <VenueCardSkeleton key={i} />
          ))}
        </ul>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="text-[var(--color-text)] text-center pt-4">
        <p>{errorMessage || "Error loading related venues."}</p>
      </div>
    );
  }

  if (venues.length === 0) {
    const message =
      errorMessage?.toLowerCase().includes("location") ||
      errorMessage?.toLowerCase().includes("no location")
        ? "Missing location data"
        : "No related venues found for this location.";

    return <p className="text-[var(--color-muted)] text-center pt-4">{message}</p>;
  }

  return (
    <section className="pt-4">
      <AnimatePresence>
        <motion.ul
          key={venues.map((v) => v.id).join(",")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {venues.map((venue) => (
            <VenueCardHome key={venue.id} venue={venue} />
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
