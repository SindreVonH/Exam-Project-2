import { Venue } from "../../types/Venue";
import { useMediaQuery } from "react-responsive";
import { VenueImageCarousel } from "./ImageCarousel"; // Husk å opprette denne komponenten

interface Props {
  venue: Venue;
  onBook: () => void;
}

export function VenueHeaderSection({ venue, onBook }: Props) {
  return (
    <div className="bg-[var(--color-surface)] rounded-lg shadow p-4 space-y-6">
      <VenueHeader fullTitle={venue.name} onBook={onBook} />
      <VenueImageCarousel media={venue.media} altFallback={venue.name} />
      <VenueRating rating={venue.rating} />
    </div>
  );
}

// === VenueHeader ===
function VenueHeader({ fullTitle, onBook }: { fullTitle: string; onBook: () => void }) {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const maxLength = isMobile ? 30 : 30;

  const displayTitle =
    fullTitle.length > maxLength ? fullTitle.slice(0, maxLength).trim() + "…" : fullTitle;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--color-text)]">
        {displayTitle}
      </h1>
      <button
        onClick={onBook}
        className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition"
      >
        Book now
      </button>
    </div>
  );
}

// === VenueRating ===
function VenueRating({ rating }: { rating: number }) {
  return (
    <div className="px-2">
      <div className="flex items-center gap-1 text-3xl sm:text-4xl md:text-5xl text-yellow-400">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
        ))}
      </div>
    </div>
  );
}
