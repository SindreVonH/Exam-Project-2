import { format } from "date-fns";
import { Link } from "react-router-dom";
import type { UserBooking } from "../../types/Booking";

interface Props {
  booking: UserBooking;
  onEdit?: (booking: UserBooking) => void;
}

export function BookingCard({ booking, onEdit }: Props) {
  const { venue, dateFrom, dateTo } = booking;
  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);
  const isUpcoming = toDate > new Date();
  const label = isUpcoming ? "Upcoming" : "Past";

  return (
    <article className="rounded-xl overflow-hidden bg-[var(--color-surface)] text-[var(--color-text)] shadow group relative border border-[var(--color-border)]">
      <Link to={`/venues/${venue.id}`} className="block hover:opacity-90 transition">
        <img
          src={venue.media?.[0]?.url || "/placeholder.jpg"}
          alt={venue.media?.[0]?.alt || venue.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 space-y-1">
          <h3 className="text-lg font-semibold leading-snug">{venue.name}</h3>
          <p className="text-sm text-[var(--color-muted)]">{venue.location?.city || "Unknown"}</p>
          <p className="text-sm font-medium text-[var(--color-muted) mt-2">
            <time dateTime={dateFrom}>{format(fromDate, "MMM d")}</time> –{" "}
            <time dateTime={dateTo}>{format(toDate, "d")}</time>
          </p>
          <span
            className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
              isUpcoming
                ? "bg-blue-700 text-white"
                : "bg-[var(--color-border)] text-[var(--color-muted)]"
            }`}
          >
            {label}
          </span>
        </div>
      </Link>

      {isUpcoming && onEdit && (
        <button
          onClick={() => onEdit(booking)}
          className="absolute top-2 right-2 text-xs bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          Edit
        </button>
      )}
    </article>
  );
}
