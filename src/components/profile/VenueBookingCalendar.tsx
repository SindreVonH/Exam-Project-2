import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parseISO, eachDayOfInterval } from "date-fns";
import type { Venue } from "../../types/Venue";

interface Props {
  bookings: Venue["bookings"];
}

export function VenueBookingCalendar({ bookings }: Props) {
  const bookedDates =
    bookings?.flatMap((booking) => {
      const from = parseISO(booking.dateFrom);
      const to = parseISO(booking.dateTo);
      return eachDayOfInterval({ start: from, end: to });
    }) || [];

  return (
    <div className="rounded-xl bg-[var(--color-surface-2)] p-4 text-white">
      <h4 className="text-sm font-semibold mb-2">Bookings</h4>
      <DayPicker
        mode="multiple"
        numberOfMonths={2}
        showOutsideDays
        pagedNavigation
        modifiers={{ booked: bookedDates }}
        modifiersClassNames={{
          booked: "bg-blue-700 text-white !rounded-none pointer-events-none",
          today: "border border-blue-400",
        }}
        className="flex justify-center gap-8 text-base md:text-lg [&_.rdp-caption_label]:text-xl [&_.rdp-day]:text-lg [&_.rdp-head_cell]:text-md"
      />
      <p className="text-xs text-[var(--color-muted)] pt-2">Blue = booked</p>
    </div>
  );
}
