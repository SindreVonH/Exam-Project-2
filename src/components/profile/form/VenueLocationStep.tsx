// src/components/venue/form/VenueLocationStep.tsx
import { Dispatch, SetStateAction } from "react";
import type { Venue } from "../../../types/Venue";
import { MapClickSelector } from "../../venue/MapClickSelector";

interface Props {
  data: Partial<Venue>;
  onUpdate: Dispatch<SetStateAction<Partial<Venue>>>;
}

export function VenueLocationStep({ data, onUpdate }: Props) {
  const location = data.location || {};

  const handleChange = (key: keyof typeof location, value: string | number) => {
    onUpdate((prev) => ({
      ...prev,
      location: { ...prev.location, [key]: value },
    }));
  };

  const setMapPosition = (lat: number, lng: number) => {
    onUpdate((prev) => ({
      ...prev,
      location: { ...prev.location, lat, lng },
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--color-text)]">Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          placeholder="Address"
          value={location.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          className="border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
        />
        <input
          placeholder="City"
          value={location.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          className="border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
        />
        <input
          placeholder="ZIP"
          value={location.zip || ""}
          onChange={(e) => handleChange("zip", e.target.value)}
          className="border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
        />
        <input
          placeholder="Country"
          value={location.country || ""}
          onChange={(e) => handleChange("country", e.target.value)}
          className="border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
        />
        <input
          placeholder="Continent"
          value={location.continent || ""}
          onChange={(e) => handleChange("continent", e.target.value)}
          className="border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
        />
      </div>

      <MapClickSelector
        position={{
          lat: location.lat ?? 60,
          lng: location.lng ?? 10,
        }}
        onSelect={setMapPosition}
      />
    </div>
  );
}
