import { useState } from "react";
import { DateRange } from "react-day-picker";
import { createBooking } from "../../lib/api/bookings/createBooking";
import { DayPicker } from "react-day-picker";
import { X, Minus, Plus } from "lucide-react";
import type { Venue } from "../../types/Venue";
import { toast } from "react-hot-toast";
import "react-day-picker/dist/style.css";

interface Props {
  venue: Venue;
  onClose: () => void;
}

export function BookVenueOverlay({ venue, onClose }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const disabledDates =
    venue.bookings?.flatMap((b) => {
      const from = new Date(b.dateFrom);
      const to = new Date(b.dateTo);
      const days = [];
      for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }
      return days;
    }) || [];

  const nights =
    range?.from && range.to
      ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights * venue.price;

  const handleBooking = async () => {
    if (!range?.from || !range.to) {
      toast.error("Please select a date range");
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        venueId: venue.id,
        dateFrom: range.from.toISOString(),
        dateTo: range.to.toISOString(),
        guests,
      });
      toast.success("Booking successful!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl p-6 w-full max-w-3xl relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Bookings</h2>

        {/* Calendar */}
        <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabledDates}
            numberOfMonths={2}
            className="flex justify-center gap-8 text-base md:text-lg [&_.rdp-caption_label]:text-xl [&_.rdp-day]:text-lg [&_.rdp-head_cell]:text-md"
            modifiersClassNames={{
              selected: "bg-[var(--color-primary)] text-white",
              range_start: "rounded-l-full bg-[var(--color-primary)] text-white",
              range_end: "rounded-r-full bg-[var(--color-primary)] text-white",
              range_middle: "bg-blue-700 text-white",
              today: "border border-blue-400",
              disabled: "opacity-30",
            }}
          />
          <p className="text-xs text-[var(--color-muted)] mt-2">Grayed out = booked</p>
        </div>

        {/* Guests and total */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Guests</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)]"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-bold">{guests}</span>
              <button
                onClick={() => setGuests((g) => Math.min(venue.maxGuests, g + 1))}
                className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xl font-semibold">Total: ${totalPrice}</p>
            <p className="text-sm text-[var(--color-muted)]">
              ({nights} night{nights !== 1 ? "s" : ""} x ${venue.price})
            </p>
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded text-lg font-medium"
          >
            {loading ? "Booking..." : "Book now"}
          </button>
        </div>
      </div>
    </div>
  );
}
