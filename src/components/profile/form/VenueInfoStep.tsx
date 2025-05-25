import { Dispatch, SetStateAction, useState } from "react";
import type { Venue } from "../../../types/Venue";
import { Star } from "lucide-react";

interface Props {
  data: Partial<Venue>;
  onUpdate: Dispatch<SetStateAction<Partial<Venue>>>;
}

export function VenueInfoStep({ data, onUpdate }: Props) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const currentRating = data.rating ?? 0;

  const handleStarClick = (value: number) => {
    onUpdate((prev) => ({ ...prev, rating: value }));
  };

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

      <div>
        <label className="block mb-1 font-medium text-[var(--color-text)]">Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-6 h-6 cursor-pointer transition 
                ${value <= (hoverRating ?? currentRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
              `}
              onClick={() => handleStarClick(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(null)}
            />
          ))}
          <span className="ml-2 text-sm text-[var(--color-muted)]">{currentRating}/5</span>
        </div>
      </div>
    </div>
  );
}
