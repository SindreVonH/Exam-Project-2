import { format } from "date-fns";
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
    <div className="bg-zinc-900 text-white rounded-xl overflow-hidden shadow relative group">
      <img
        src={venue.media?.[0]?.url || "/placeholder.jpg"}
        alt={venue.media?.[0]?.alt || venue.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-snug mb-1">{venue.name}</h3>
        <p className="text-sm text-gray-300 mb-2">
          {format(fromDate, "MMM d")} – {format(toDate, "d")}
        </p>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            isUpcoming ? "bg-blue-700 text-white" : "bg-gray-600 text-white"
          }`}
        >
          {label}
        </span>
      </div>

      {isUpcoming && onEdit && (
        <button
          onClick={() => onEdit(booking)}
          className="absolute top-2 right-2 text-xs bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          Edit
        </button>
      )}
    </div>
  );
}
