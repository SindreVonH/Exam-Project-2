import { Dispatch, SetStateAction } from "react";
import type { Venue } from "../../../types/Venue";

interface Props {
  data: Partial<Venue>;
  onUpdate: Dispatch<SetStateAction<Partial<Venue>>>;
}

export function VenuePricingStep({ data, onUpdate }: Props) {
  const price = data.price;
  const maxGuests = data.maxGuests;
  const meta = data.meta || {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  };

  const handleChange = (field: keyof Venue, value: number | undefined) => {
    onUpdate((prev) => ({
      ...prev,
      [field]: isNaN(value as number) ? undefined : value,
    }));
  };

  const handleMetaChange = (key: keyof Venue["meta"], checked: boolean) => {
    onUpdate((prev) => ({
      ...prev,
      meta: {
        ...{ wifi: false, parking: false, breakfast: false, pets: false, ...prev.meta },
        [key]: checked,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Price (Dollar)</label>
        <input
          type="number"
          value={price ?? ""}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="w-full px-4 py-2 border rounded bg-[var(--color-background)] text-[var(--color-text)] no-spinner"
          placeholder="e.g. 1500"
          min={0}
        />
      </div>

      {/* Max Guests */}
      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Max Guests</label>
        <input
          type="number"
          value={maxGuests ?? ""}
          onChange={(e) => handleChange("maxGuests", Number(e.target.value))}
          className="w-full px-4 py-2 border rounded bg-[var(--color-background)] text-[var(--color-text)] no-spinner"
          placeholder="e.g. 4"
          min={1}
          max={100}
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block mb-2 font-medium text-[var(--color-text)]">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(meta).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleMetaChange(key as keyof typeof meta, e.target.checked)}
              />
              <span className="capitalize text-[var(--color-text)]">{key}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
