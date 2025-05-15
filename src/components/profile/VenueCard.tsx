// src/components/VenueCard.tsx
import { useNavigate } from "react-router-dom";
import type { Venue } from "../../types/Venue";

interface Props {
  venue: Venue;
}

export function VenueCard({ venue }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/venues/${venue.id}`)}
      className="cursor-pointer bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={venue.media?.[0]?.url || "/placeholder.jpg"}
        alt={venue.media?.[0]?.alt || venue.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">{venue.name}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {venue.location?.city || "Unknown location"}
        </p>
        <p className="text-sm mt-1 text-zinc-700 dark:text-zinc-300">
          ${venue.price} / night – Max {venue.maxGuests} guests
        </p>
      </div>
    </div>
  );
}
