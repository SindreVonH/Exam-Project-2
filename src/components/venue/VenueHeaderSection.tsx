import { Venue } from "../../types/Venue";
import { useMediaQuery } from "react-responsive"; // Husk å installere: npm i react-responsive

interface Props {
  venue: Venue;
  onBook: () => void;
}

export function VenueHeaderSection({ venue, onBook }: Props) {
  return (
    <div className="bg-[var(--color-surface)] rounded-lg shadow p-4 space-y-6">
      <VenueHeader fullTitle={venue.name} onBook={onBook} />
      <VenueImageGallery media={venue.media} altFallback={venue.name} />
      <VenueRating rating={venue.rating} />
    </div>
  );
}

// === VenueHeader ===
function VenueHeader({ fullTitle, onBook }: { fullTitle: string; onBook: () => void }) {
  const isMobile = useMediaQuery({ maxWidth: 639 }); // sm breakpoint
  const maxLength = isMobile ? 15 : 30;

  const displayTitle =
    fullTitle.length > maxLength ? fullTitle.slice(0, maxLength).trim() + "…" : fullTitle;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-text)]">
        {displayTitle}
      </h1>
      <button
        onClick={onBook}
        className="text-lg sm:text-xl md:text-2xl px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition"
      >
        Book now
      </button>
    </div>
  );
}

// === VenueImageGallery ===
function VenueImageGallery({
  media,
  altFallback,
}: {
  media: { url: string; alt?: string }[];
  altFallback: string;
}) {
  const firstImage = media?.[0]?.url || "/placeholder.jpg";
  const altText = media?.[0]?.alt || altFallback;

  return (
    <img src={firstImage} alt={altText} className="w-full h-60 sm:h-96 object-cover rounded-xl" />
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
