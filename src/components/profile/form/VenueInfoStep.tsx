// src/components/venue/form/VenueInfoStep.tsx
import { Dispatch, SetStateAction } from "react";
import type { Venue } from "../../../types/Venue";

interface Props {
  data: Partial<Venue>;
  onUpdate: Dispatch<SetStateAction<Partial<Venue>>>;
}

export function VenueInfoStep({ data, onUpdate }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Venue Name</label>
        <input
          type="text"
          value={data.name || ""}
          onChange={(e) => onUpdate((prev) => ({ ...prev, name: e.target.value }))}
          required
          className="w-full px-4 py-2 border rounded bg-[var(--color-background)] text-[var(--color-text)]"
          placeholder="e.g. Cozy Cabin by the Lake"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Description</label>
        <textarea
          value={data.description || ""}
          onChange={(e) => onUpdate((prev) => ({ ...prev, description: e.target.value }))}
          required
          className="w-full px-4 py-2 border rounded bg-[var(--color-background)] text-[var(--color-text)]"
          rows={5}
          placeholder="Tell us what makes your venue special..."
        />
      </div>
    </div>
  );
}
