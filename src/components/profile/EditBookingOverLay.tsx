// src/components/EditBookingOverlay.tsx

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../lib/api/bookings/editBooking";
import { UserBooking } from "../../types/Booking";
import "react-day-picker/dist/style.css";

interface Props {
  booking: UserBooking;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function EditBookingOverlay({ booking, onClose, onDelete }: Props) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  });
  const [guests, setGuests] = useState(booking.guests);
  const [loading, setLoading] = useState(false);

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
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center px-4">
      <div className="bg-zinc-900 text-white rounded-xl p-6 w-full max-w-3xl relative shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-400 hover:text-red-600"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Edit Booking</h2>

        <div className="border p-4 rounded mb-4 bg-zinc-800">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            className="flex justify-center gap-8"
            modifiersClassNames={{
              selected: "bg-blue-600 text-white",
              range_start: "rounded-l-full bg-blue-600 text-white",
              range_end: "rounded-r-full bg-blue-600 text-white",
              range_middle: "bg-blue-500 text-white",
              today: "border border-blue-400",
              disabled: "text-gray-500 opacity-40",
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Guests</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
              className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600"
              disabled={loading}
            >
              −
            </button>
            <span className="min-w-[2rem] text-center">{guests}</span>
            <button
              onClick={() => setGuests((prev) => prev + 1)}
              className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600"
              disabled={loading}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDeleteClick}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Delete Booking
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
