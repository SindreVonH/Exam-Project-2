// src/components/venue/form/VenuePricingStep.tsx
import { Dispatch, SetStateAction } from "react";
import type { Venue } from "../../../types/Venue";

interface Props {
  data: Partial<Venue>;
  onUpdate: Dispatch<SetStateAction<Partial<Venue>>>;
}

export function VenuePricingStep({ data, onUpdate }: Props) {
  const price = data.price || 0;
  const maxGuests = data.maxGuests || 1;
  const meta = data.meta || {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  };

  const handleChange = (field: keyof Venue, value: any) => {
    onUpdate((prev) => ({ ...prev, [field]: value }));
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
      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Price (NOK)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          required
          className="w-full px-4 py-2 border rounded bg-[var(--color-background)] text-[var(--color-text)]"
          placeholder="e.g. 1500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Max Guests</label>
        <input
          type="number"
          min={1}
          max={100}
          value={maxGuests}
          onChange={(e) => handleChange("maxGuests", Number(e.target.value))}
          required
          className="w-full px-4 py-2 border rounded bg-[var(--color-background)] text-[var(--color-text)]"
        />
      </div>

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
