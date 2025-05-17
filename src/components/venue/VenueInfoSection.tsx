import { Venue } from "../../types/Venue";
import { Check, User } from "lucide-react";

interface Props {
  venue: Venue;
  onBook: () => void;
}

export function VenueInfoSection({ venue, onBook }: Props) {
  const { price, maxGuests, meta, description } = venue;

  return (
    <section className="flex flex-col md:flex-row gap-6 bg-[var(--color-surface)] p-4 sm:p-6 rounded-lg shadow">
      {/* Left column */}
      <div className="flex-1 space-y-4">
        {/* Price and Beds */}
        <div className="flex flex-wrap items-center justify-between text-xl sm:text-2xl md:text-[32px] font-medium text-[var(--color-text)] gap-2">
          <p>${price} / Night</p>
          <p className="flex items-center gap-2">
            <User className="w-6 h-6" /> {maxGuests} beds
          </p>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-[var(--color-text)] text-base sm:text-lg md:text-[20px] font-medium">
          {meta?.breakfast && <FacilityItem label="Breakfast" />}
          {meta?.parking && <FacilityItem label="Parking" />}
          {meta?.pets && <FacilityItem label="Pets" />}
          {meta?.wifi && <FacilityItem label="Wifi" />}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-[var(--color-text)]">
            About venue
          </h3>
          <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed mt-1">
            {description}
          </p>
        </div>
      </div>

      {/* Right column */}
      <div className="md:w-[280px] bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)] space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">Check availability</h3>

        <div className="space-y-3">
          <label className="block text-[var(--color-muted)] text-sm sm:text-base">From</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]"
          />
          <label className="block text-[var(--color-muted)] text-sm sm:text-base">To</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]"
          />
        </div>

        <button
          onClick={onBook}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-base sm:text-lg md:text-[20px] py-2 rounded"
        >
          Book now
        </button>
      </div>
    </section>
  );
}

function FacilityItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2">
      {label}
      <Check className="w-5 h-5" />
    </span>
  );
}
