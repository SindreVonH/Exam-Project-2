import { Venue } from "../../types/Venue";
import { Check, X, User } from "lucide-react";
import { InfoSectionBooking } from "./InfoSectionDetails";

interface Props {
  venue: Venue;
  onBook: () => void;
}

interface Facility {
  label: string;
  available: boolean;
}

export function VenueInfoSection({ venue, onBook }: Props) {
  const { price, maxGuests, meta, description } = venue;

  const facilities: Facility[] = [
    { label: "Wifi", available: !!meta?.wifi },
    { label: "Parking", available: !!meta?.parking },
    { label: "Breakfast", available: !!meta?.breakfast },
    { label: "Pets", available: !!meta?.pets },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-6 bg-[var(--color-surface)] p-4 sm:p-6 rounded-lg shadow">
      {/* === Left: venue details === */}
      <article className="flex-1 space-y-6 bg-[var(--color-surface)]">
        <VenueStats price={price} maxGuests={maxGuests} />
        <FacilityList facilities={facilities} />
        <VenueDescription description={description} />
      </article>

      {/* === Right: sticky booking card === */}
      <aside className="md:w-[280px] self-start">
        <InfoSectionBooking venue={venue} onBook={onBook} />
      </aside>
    </section>
  );
}

// === Price + guest stats ===
function VenueStats({ price, maxGuests }: { price: number; maxGuests: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between text-xl sm:text-2xl md:text-[32px] font-medium text-[var(--color-text)] gap-2">
      <p>${price} / Night</p>
      <p className="flex items-center gap-2">
        <User className="w-6 h-6" /> {maxGuests} guests
      </p>
    </div>
  );
}

// === Facility list ===
function FacilityList({ facilities }: { facilities: Facility[] }) {
  return (
    <dl className="flex flex-wrap gap-4 sm:gap-6 text-[var(--color-muted)] text-base sm:text-lg md:text-[20px] font-medium">
      {facilities.map(({ label, available }) => (
        <FacilityItem key={label} label={label} available={available} />
      ))}
    </dl>
  );
}

function FacilityItem({ label, available }: Facility) {
  const Icon = available ? Check : X;
  const iconColor = available ? "text-[var(--color-muted)]" : "text-[var(--color-muted)]";

  return (
    <div className="flex items-center gap-2">
      <dt className="sr-only">{label}</dt>
      <dd className="flex items-center gap-2">
        {label}
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </dd>
    </div>
  );
}

// === Description section ===
function VenueDescription({ description }: { description: string }) {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-[var(--color-text)]">
        About venue
      </h3>
      <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed mt-1">
        {description}
      </p>
    </section>
  );
}
