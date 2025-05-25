import { DayPicker } from "react-day-picker";
import { parseISO, eachDayOfInterval } from "date-fns";
import type { Venue } from "../../types/Venue";

interface Props {
  bookings: Venue["bookings"];
}

export function VenueBookingCalendar({ bookings }: Props) {
  // 🎨 Roterende fargeklasser for forskjellige bookinger
  const bookingColors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ];

  const modifiers: Record<string, Date[]> = {};
  const modifiersClassNames: Record<string, string> = {};

  bookings?.forEach((booking, index) => {
    const start = parseISO(booking.dateFrom);
    const end = parseISO(booking.dateTo);
    const days = eachDayOfInterval({ start, end });

    const color = bookingColors[index % bookingColors.length];
    const startKey = `bookingStart-${index}`;
    const middleKey = `bookingMiddle-${index}`;
    const endKey = `bookingEnd-${index}`;

    if (days.length === 1) {
      // Én-dagers booking: rund hele
      modifiers[startKey] = [start];
      modifiersClassNames[startKey] = `${color} text-white rounded-md`;
    } else {
      modifiers[startKey] = [days[0]];
      modifiers[endKey] = [days[days.length - 1]];
      modifiers[middleKey] = days.slice(1, -1);

      modifiersClassNames[startKey] = `${color} text-white rounded-l-full`;
      modifiersClassNames[middleKey] = `${color} text-white rounded-none`;
      modifiersClassNames[endKey] = `${color} text-white rounded-r-full`;
    }
  });

  return (
    <div className="rounded-xl bg-[var(--color-surface-2)] p-4 text-[var(--color-text)]">
      <h4 className="text-sm font-semibold mb-2">Bookings</h4>
      <DayPicker
        mode="multiple"
        numberOfMonths={2}
        showOutsideDays
        pagedNavigation
        modifiers={modifiers}
        modifiersClassNames={{
          ...modifiersClassNames,
          today: "border border-[var(--color-primary-hover)]",
        }}
        className="flex justify-center gap-8 text-base md:text-lg [&_.rdp-caption_label]:text-xl [&_.rdp-day]:text-lg [&_.rdp-head_cell]:text-md"
      />
      <p className="text-xs text-[var(--color-muted)] pt-2">
        Different colors = different bookings
      </p>
    </div>
  );
}
