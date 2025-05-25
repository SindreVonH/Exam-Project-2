import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Venue } from "../../types/Venue";
import { BookNowButton } from "../common/BooknowButton";

interface Props {
  venue: Venue;
  onBook: () => void;
}

export function InfoSectionBooking({ venue, onBook }: Props) {
  const disabledDates =
    venue.bookings?.flatMap((booking) => {
      const from = new Date(booking.dateFrom);
      const to = new Date(booking.dateTo);
      const days: Date[] = [];
      const d = new Date(from);
      while (d <= to) {
        days.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      return days;
    }) || [];

  return (
    <aside
      className="
        md:w-[300px]
        bg-[var(--color-surface)]
        rounded-lg p-4 border border-[var(--color-border)]
        space-y-6
        md:sticky md:top-6
        max-h-[calc(100vh-48px)] overflow-y-auto
      "
      aria-label="Booking information"
    >
      <Calendar disabledDates={disabledDates} />
      <BookNowButton onBook={onBook} fullWidth />
      <VenueMeta venue={venue} />
    </aside>
  );
}

// === Calendar ===
function Calendar({ disabledDates }: { disabledDates: Date[] }) {
  return (
    <div>
      <DayPicker
        defaultMonth={new Date()}
        disabled={disabledDates}
        numberOfMonths={typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 1}
        classNames={{
          root: "text-xl",
          caption_label: "text-xl xl:text-base",
          day: "text-sm h-8 w-10 p-2 leading-none",
          row: "mb-0.5",
          button_previous:
            "text-[var(--color-text)] hover:text-[var(--color-primary-hover)] [&>svg]:stroke-current [&>svg]:fill-current transition",
          button_next:
            "text-[var(--color-text)] hover:text-[var(--color-primary-hover)] [&>svg]:stroke-current [&>svg]:fill-current transition",
        }}
        modifiersClassNames={{
          disabled: "text-gray-400 opacity-40 line-through",
          today: "border border-blue-400",
        }}
        styles={{
          table: { margin: 0 },
          head: { marginBottom: "0.1rem" },
          caption: { marginBottom: "0.2rem" },
        }}
      />
    </div>
  );
}

// === Meta info: host + updated ===
function VenueMeta({ venue }: { venue: Venue }) {
  return (
    <footer className="pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)]">
      <p>
        <strong>Hosted by:</strong> {venue.owner?.name ?? "Unknown"}
      </p>
      <p>
        <strong>Updated:</strong>{" "}
        {venue.updated ? format(new Date(venue.updated), "PPP") : "Unknown"}
      </p>
    </footer>
  );
}
