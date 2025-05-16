import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Trash2, Pencil, Users, X, Loader2 } from "lucide-react";
import type { Venue } from "../../types/Venue";
import { useVenueWithBookings } from "../../hooks/useVenueWithBookings";
import { VenueBookingList } from "./VenueBookingList";
import { VenueBookingCalendar } from "./VenueBookingCalendar";

interface Props {
  venue: Venue;
  onEdit: (venue: Venue) => void;
  onDelete: (id: string) => void;
}

export function VenueCard({ venue, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const { venue: fullVenue, isLoading, isError } = useVenueWithBookings(venue.id);

  const [showBookings, setShowBookings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleBookings = () => setShowBookings((prev) => !prev);
  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl bg-[var(--color-surface)] flex items-center justify-center h-40">
        <Loader2 className="animate-spin text-[var(--color-muted)]" />
      </div>
    );
  }

  if (isError || !fullVenue) {
    return (
      <div className="p-6 rounded-xl bg-[var(--color-surface)] text-red-400">
        Failed to load venue data.
      </div>
    );
  }

  const bookings = fullVenue.bookings || [];

  return (
    <article className="bg-[var(--color-surface-2)] text-[var(--color-text)] rounded-xl overflow-hidden shadow-md">
      <div className="flex">
        <button
          onClick={() => navigate(`/venues/${fullVenue.id}`)}
          className="w-32 h-32 p-0 border-0"
        >
          <img
            src={fullVenue.media?.[0]?.url || "/placeholder.jpg"}
            alt={fullVenue.media?.[0]?.alt || fullVenue.name}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </button>

        <div className="flex-1 p-4 space-y-1">
          <h3 className="text-lg font-semibold">{fullVenue.name}</h3>
          <p className="text-sm text-[var(--color-muted)]">
            {fullVenue.location?.city || "Unknown"}
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={toggleBookings}
              className={`text-sm px-3 py-1 rounded flex items-center gap-1 transition ${
                showBookings
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
              }`}
            >
              <Users size={16} />
              {bookings.length} bookings
            </button>

            <button
              onClick={toggleCalendar}
              className={`text-sm px-3 py-1 rounded flex items-center gap-1 transition ${
                showCalendar
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
              }`}
            >
              <CalendarDays size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 items-end">
          <button
            onClick={() => onDelete(fullVenue.id)}
            className="text-red-400 hover:text-red-600 transition"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={() => onEdit(fullVenue)}
            className="text-sm bg-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white px-3 py-1 rounded flex items-center gap-1 transition"
          >
            <Pencil size={16} />
            Edit
          </button>
        </div>
      </div>

      {showBookings && bookings.length > 0 && (
        <div className="p-4 border-t border-[var(--color-border)] relative">
          <button
            onClick={toggleBookings}
            className="absolute top-2 right-2 text-[var(--color-muted)] hover:text-white"
            title="Close"
          >
            <X size={18} />
          </button>
          <h4 className="text-sm font-semibold mb-2">Bookings</h4>
          <VenueBookingList bookings={bookings} venue={fullVenue} />
        </div>
      )}

      {showCalendar && (
        <div className="p-4 border-t border-[var(--color-border)] relative">
          <button
            onClick={toggleCalendar}
            className="absolute top-2 right-2 text-[var(--color-muted)] hover:text-white"
            title="Close"
          >
            <X size={18} />
          </button>
          <VenueBookingCalendar bookings={bookings} />
        </div>
      )}
    </article>
  );
}
