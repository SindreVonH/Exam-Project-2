import { Venue } from "../../types/Venue";

interface Props {
  venue: Venue;
  onBook: () => void;
}

export function VenueHeaderSection({ venue, onBook }: Props) {
  const shortenedName = venue.name.length > 25 ? venue.name.slice(0, 25).trim() + "…" : venue.name;

  return (
    <div className="bg-[var(--color-surface)] rounded-lg shadow p-4 space-y-4">
      <VenueHeader title={shortenedName} onBook={onBook} />
      <VenueImageGallery media={venue.media} altFallback={venue.name} />
      <VenueRating rating={venue.rating} />
    </div>
  );
}

// === VenueHeader ===
function VenueHeader({ title, onBook }: { title: string; onBook: () => void }) {
  return (
    <div className="bg-[var(---color-surface)] flex items-center justify-between px-4 pt-4">
      <h1 className="text-[60px] font-semibold text-[var(--color-text)]">
        {title.length > 25 ? title.slice(0, 25).trim() + "…" : title}
      </h1>
      <button
        onClick={onBook}
        className="px-5 py-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-2xl text-white"
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

  return <img src={firstImage} alt={altText} className="w-full  h-130 object-cover rounded-xl" />;
}

// === VenueRating ===
function VenueRating({ rating }: { rating: number }) {
  return (
    <div className="">
      <div className="flex items-center gap-1 /10 text-white  text-[60px] px-2 py-1 rounded w-max">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.round(rating) ? "★ " : "☆"}</span>
        ))}
      </div>
    </div>
  );
}
