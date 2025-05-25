import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { X, Minus, Plus } from "lucide-react";
import { Venue } from "../../types/Venue";
import { useBooking } from "../../hooks/useBooking";
import "react-day-picker/dist/style.css";

interface Props {
  venue: Venue;
  onClose: () => void;
}

export function BookVenueOverlay({ venue, onClose }: Props) {
  const {
    range,
    setRange,
    guests,
    setGuests,
    loading,
    totalNights,
    totalPrice,
    disabledRanges,
    handleBooking,
  } = useBooking(venue, onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book venue"
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
      style={{ minHeight: "100vh", height: "100dvh" }}
    >
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl p-4 sm:p-6 w-full max-w-3xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-red-500"
          aria-label="Close booking modal"
        >
          <X />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Book this venue</h2>

        <section className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={[{ before: new Date() }, ...disabledRanges]}
            numberOfMonths={typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 2}
            className="flex justify-center gap-4 sm:gap-8 text-sm sm:text-base [&_.rdp-caption_label]:text-base sm:[&_.rdp-caption_label]:text-xl [&_.rdp-day]:text-base [&_.rdp-head_cell]:text-xs sm:[&_.rdp-head_cell]:text-sm"
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
        </section>

        <section className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-base sm:text-lg font-semibold">Guests</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)]"
                aria-label="Decrease guests"
              >
                <Minus size={20} />
              </button>
              <span className="text-lg sm:text-xl font-bold">{guests}</span>
              <button
                onClick={() => setGuests((g) => Math.min(venue.maxGuests, g + 1))}
                className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)]"
                aria-label="Increase guests"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-lg sm:text-xl font-semibold">Total: ${totalPrice}</p>
            <p className="text-sm text-[var(--color-muted)]">
              ({totalNights} night{totalNights !== 1 ? "s" : ""} x ${venue.price})
            </p>
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-3 rounded text-base sm:text-lg font-medium"
          >
            {loading ? "Booking..." : "Book now"}
          </button>
        </section>
      </div>
    </div>
  );
}
