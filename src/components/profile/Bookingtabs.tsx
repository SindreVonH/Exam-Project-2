import { useState } from "react";
import { BookingCard } from "../profile/BookingCard";
import type { UserBooking } from "../../types/Booking";

type Props = {
  bookings: UserBooking[];
  onEditBooking: (booking: UserBooking) => void;
};

export function BookingTabs({ bookings, onEditBooking }: Props) {
  const [bookingFilter, setBookingFilter] = useState<"upcoming" | "past">("upcoming");

  const now = new Date();
  const filteredBookings = bookings
    .filter((b) =>
      bookingFilter === "upcoming" ? new Date(b.dateTo) > now : new Date(b.dateTo) <= now
    )
    .sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());

  return (
    <section>
      <div className="flex gap-6 mb-4">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Your bookings</h1>
        {(["upcoming", "past"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setBookingFilter(filter)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              bookingFilter === filter
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-border)] text-[var(--color-muted)] hover:bg-[var(--color-border-hover)]"
            }`}
          >
            {filter === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      {filteredBookings.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onEdit={onEditBooking} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-muted)] text-sm">
          You don’t have any {bookingFilter} bookings yet.
        </p>
      )}
    </section>
  );
}
