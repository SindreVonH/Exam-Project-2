// src/components/venue/VenueInfoSection.tsx
import { Venue } from "../../types/Venue";
import { Check, User } from "lucide-react";

interface Props {
  venue: Venue;
  onBook: () => void;
}

export function VenueInfoSection({ venue, onBook }: Props) {
  const { price, maxGuests, meta, description } = venue;

  return (
    <section className="flex flex-col md:flex-row gap-4 bg-[var(--color-surface)] p-6 rounded-lg shadow">
      {/* Left column */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center justify-between text-[32px] font-medium text-[var(--color-text)]">
          <p>${price} / Night</p>
          <p className="flex items-center gap-2">
            <User className="w-6 h-6" /> {maxGuests} beds
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-[var(--color-text)] text-[20px] font-medium">
          {meta?.breakfast && <FacilityItem label="Breakfast" />}
          {meta?.parking && <FacilityItem label="Parking" />}
          {meta?.pets && <FacilityItem label="Pets" />}
          {meta?.wifi && <FacilityItem label="Wifi" />}
        </div>

        <div>
          <h3 className="text-[28px] font-semibold text-[var(--color-text)]">About venue</h3>
          <p className="text-[var(--color-muted)] text-[18px] leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Right column */}
      <div className="md:w-[280px] bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)] space-y-4">
        <h3 className="text-[20px] font-semibold text-[var(--color-text)]">Check availability</h3>

        <div className="space-y-3">
          <label className="block text-[var(--color-muted)] text-[18px]">From</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]"
          />
          <label className="block text-[var(--color-muted)] text-[18px]">To</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]"
          />
        </div>

        <button
          onClick={onBook}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-[20px] py-2 rounded"
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
      {label} <Check className="w-5 h-5" />
    </span>
  );
}
