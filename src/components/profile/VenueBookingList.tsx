import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import type { Venue } from "../../types/Venue";

interface Props {
  bookings: NonNullable<Venue["bookings"]>;
  venue: Venue;
}

const BOOKINGS_PER_PAGE = 4;

export function VenueBookingList({ bookings, venue }: Props) {
  const [visibleCount, setVisibleCount] = useState(BOOKINGS_PER_PAGE);
  const visibleBookings = bookings.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + BOOKINGS_PER_PAGE);
  };

  return (
    <div className="space-y-3">
      {visibleBookings.map((booking) => {
        const from = new Date(booking.dateFrom);
        const to = new Date(booking.dateTo);
        const nights = differenceInCalendarDays(to, from);
        const totalPrice = nights * venue.price;

        return (
          <div
            key={booking.id}
            className="bg-[var(--color-border)] rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm shadow-sm"
          >
            {/* Avatar and name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src={booking.customer.avatar?.url || "/placeholder.jpg"}
                alt={booking.customer.avatar?.alt || booking.customer.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="min-w-0">
                <p className="text-[var(--color-text)] font-medium truncate">
                  {booking.customer.name}
                </p>
                <p className="text-[var(--color-muted)] text-xs truncate">
                  {booking.customer.email}
                </p>
              </div>
            </div>

            {/* Booking info */}
            <div className="flex flex-col text-xs text-right sm:text-left sm:min-w-[180px]">
              <p>
                <span className="font-medium">From:</span> {format(from, "dd/MM/yy")} –{" "}
                {format(to, "dd/MM/yy")}
              </p>
              <div className="flex justify-between gap-4 sm:gap-6">
                <p>
                  <span className="font-medium">Guests:</span> {booking.guests}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ${totalPrice}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {visibleCount < bookings.length && (
        <div className="text-center pt-2">
          <button
            onClick={handleShowMore}
            className="text-sm text-[var(--color-muted)] hover:text-white transition"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
