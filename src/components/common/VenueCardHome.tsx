import { useNavigate } from "react-router-dom";
import type { Venue } from "../../types/Venue";
import fallbackImage from "../../assets/fallback.jpg";

interface Props {
  venue: Venue;
}

export function VenueCardHome({ venue }: Props) {
  const navigate = useNavigate();
  const { id, name, media, location, price, maxGuests } = venue;

  return (
    <article
      role="button"
      aria-label={`View details for ${name}`}
      onClick={() => navigate(`/venues/${id}`)}
      className="cursor-pointer rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <img
        src={media?.[0]?.url || fallbackImage}
        alt={media?.[0]?.alt || `${name} venue`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
        className="w-full h-40 sm:h-48 md:h-70 object-cover"
      />

      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 text-[var(--color-text)]">
        {/* Title + Location */}
        <header className="space-y-1">
          <h3 className="text-lg sm:text-[32px] font-medium leading-tight break-words">
            {name.length > 25 ? name.slice(0, 25).trim() + "…" : name}
          </h3>
          <p className="text-sm sm:text-[32px] font-normal text-[var(--color-muted)]">
            {location?.city || "Unknown location"}
          </p>
        </header>

        {/* Price + Beds */}
        <div className="flex items-center justify-between text-sm sm:text-[32px] font-medium text-[var(--color-text)]">
          <span>${price} / Night</span>
          <span>
            {maxGuests} {maxGuests === 1 ? "Bed" : "Beds"}
          </span>
        </div>

        {/* View Details */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/venues/${id}`);
          }}
          className="self-start px-4 sm:px-5 py-2 rounded bg-[var(--color-border)] text-sm sm:text-[24px] text-[var(--color-text)] font-medium hover:bg-[var(--color-text)]/20 transition"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
