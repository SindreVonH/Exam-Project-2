// src/components/venue/form/VenueMediaStep.tsx
import { useState } from "react";
import type { Venue } from "../../../types/Venue";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  data: Partial<Venue>;
  onUpdate: Dispatch<SetStateAction<Partial<Venue>>>;
}

export function VenueMediaStep({ data, onUpdate }: Props) {
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");

  const media = data.media || [];

  const addImage = () => {
    if (!newUrl || !newAlt) return;
    const updated = [...media, { url: newUrl, alt: newAlt }];
    onUpdate((prev) => ({ ...prev, media: updated }));
    setNewUrl("");
    setNewAlt("");
  };

  const removeImage = (index: number) => {
    const updated = media.filter((_, i) => i !== index);
    onUpdate((prev) => ({ ...prev, media: updated }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 font-medium text-[var(--color-text)]">Add Image</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            placeholder="Image URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
          />
          <input
            type="text"
            placeholder="Alt text"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            className="flex-1 border p-2 rounded bg-[var(--color-background)] text-[var(--color-text)]"
          />
          <button
            type="button"
            onClick={addImage}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add
          </button>
        </div>
      </div>

      {media.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-[var(--color-text)]">Preview</h3>
          <ul className="space-y-2">
            {media.map((m, i) => (
              <li
                key={i}
                className="flex items-center justify-between border p-2 rounded bg-[var(--color-surface)]"
              >
                <div className="truncate max-w-[60%]">
                  <p className="text-sm text-[var(--color-muted)]">{m.url}</p>
                  <p className="text-xs text-[var(--color-text)] italic">{m.alt}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
