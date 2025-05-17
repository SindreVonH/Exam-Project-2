import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../lib/api/bookings/editBooking";
import { UserBooking } from "../../types/Booking";
import "react-day-picker/dist/style.css";

interface Props {
  booking: UserBooking;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function EditBookingOverlay({ booking, onClose, onDelete }: Props) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  });

  const [guests, setGuests] = useState(booking.guests);
  const [loading, setLoading] = useState(false);

  const nights =
    range?.from && range.to
      ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights * booking.venue.price;

  const handleUpdate = async () => {
    if (!range?.from || !range.to) {
      toast.error("Please select a valid date range");
      return;
    }

    setLoading(true);
    try {
      await updateBooking(booking.id, {
        dateFrom: range.from.toISOString(),
        dateTo: range.to.toISOString(),
        guests,
      });
      toast.success("Booking updated!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      onDelete(booking.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl p-4 sm:p-6 w-full max-w-3xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Edit Booking</h2>

        {/* Calendar */}
        <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
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
        </div>

        {/* Guests and total */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-base sm:text-lg font-semibold">Guests</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)]"
              >
                <Minus size={20} />
              </button>
              <span className="text-lg sm:text-xl font-bold">{guests}</span>
              <button
                onClick={() => setGuests((g) => g + 1)}
                className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-lg sm:text-xl font-semibold">Total: ${totalPrice}</p>
            <p className="text-sm text-[var(--color-muted)]">
              ({nights} night{nights !== 1 ? "s" : ""} x ${booking.venue.price})
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
              onClick={handleDeleteClick}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={loading}
            >
              <Trash2 size={18} />
              Delete
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2 rounded text-sm sm:text-base font-medium"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
