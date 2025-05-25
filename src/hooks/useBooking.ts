import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Venue } from "../types/Venue";
import { DateRange } from "react-day-picker";
import { createBooking } from "../lib/api/bookings/createBooking";

export function useBooking(venue: Venue, onSuccess: () => void) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const disabledRanges = useMemo(() => {
    return (
      venue.bookings?.map((b) => ({
        from: new Date(b.dateFrom),
        to: new Date(b.dateTo),
      })) || []
    );
  }, [venue]);

  const totalNights =
    range?.from && range.to
      ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = totalNights * venue.price;

  const handleBooking = async () => {
    if (!range?.from || !range.to) {
      toast.error("Please select a date range");
      return;
    }

    // 🛑 Blokker overlap
    const selectedFrom = range.from.getTime();
    const selectedTo = range.to.getTime();
    const overlaps = venue.bookings?.some((b) => {
      const from = new Date(b.dateFrom).getTime();
      const to = new Date(b.dateTo).getTime();
      return (
        (selectedFrom >= from && selectedFrom <= to) ||
        (selectedTo >= from && selectedTo <= to) ||
        (selectedFrom <= from && selectedTo >= to)
      );
    });

    if (overlaps) {
      toast.error("Selected dates overlap an existing booking");
      return;
    }

    if (range.from.getTime() < Date.now()) {
      toast.error("You cannot book dates in the past");
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
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    range,
    setRange,
    guests,
    setGuests,
    loading,
    totalNights,
    totalPrice,
    disabledRanges,
    handleBooking,
  };
}
