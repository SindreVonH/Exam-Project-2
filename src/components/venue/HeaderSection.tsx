import { Venue } from "../../types/Venue";
import { Star } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { VenueImageCarousel } from "./ImageCarousel";
import { BookNowButton } from "../common/BooknowButton";

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
      <BookNowButton onBook={onBook} />
    </div>
  );
}

// === VenueRating ===
function VenueRating({ rating }: { rating: number }) {
  return (
    <div className="px-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < Math.round(rating)
                ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-muted)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
