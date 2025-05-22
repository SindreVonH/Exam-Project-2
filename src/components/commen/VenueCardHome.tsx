import { useNavigate } from "react-router-dom";
import type { Venue } from "../../types/Venue";
import fallbackImage from "../../assets/fallback.jpg"; // ✅ import her

interface Props {
  venue: Venue;
}

export function VenueCardHome({ venue }: Props) {
  const navigate = useNavigate();
  const { id, name, media, location, price, maxGuests } = venue;

  return (
    <li
      onClick={() => navigate(`/venues/${id}`)}
      className="cursor-pointer rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <img
        src={media?.[0]?.url || fallbackImage}
        alt={media?.[0]?.alt || name}
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
        className="w-full h-70 object-cover"
      />

      {/* Content */}
      <div className="p-6 flex flex-col gap-6 text-[var(--color-text)]">
        {/* Title + Location */}
        <div className="space-y-1">
          <h3 className="text-[32px] font-medium leading-tight break-words">
            {name.length > 25 ? name.slice(0, 25).trim() + "…" : name}
          </h3>
          <p className="text-[32px] font-normal text-[var(--color-muted)]">
            {location?.city || "Unknown location"}
          </p>
        </div>

        {/* Price + Beds */}
        <div className="flex items-center justify-between text-[32px] font-medium text-[var(--color-text)]">
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
          className="self-start px-5 py-2 rounded bg-[var(--color-border)] text-[var(--color-text)] text-[24px] font-medium hover:bg-[var(--color-muted)]/20 transition"
        >
          View Details
        </button>
      </div>
    </li>
  );
}
