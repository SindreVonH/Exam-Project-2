// src/components/home/SortButtons.tsx
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

type SortField = "price" | "beds" | "latest" | "";
type SortOrder = "asc" | "desc";

interface SortButtonsProps {
  activeSort: SortField;
  sortOrder: SortOrder;
  onSort: (field: "price" | "beds" | "latest") => void;
}

export default function SortButtons({ activeSort, sortOrder, onSort }: SortButtonsProps) {
  const buttons: { field: "price" | "beds" | "latest"; label: string }[] = [
    { field: "price", label: "Price" },
    { field: "beds", label: "Beds" },
    { field: "latest", label: "Latest" },
  ];

  return (
    <section className="flex gap-3 flex-wrap text-lg sm:text-2xl font-medium text-[var(--color-text)] pt-6">
      {buttons.map(({ field, label }) => {
        const isActive = activeSort === field;
        const icon = !isActive ? (
          <Minus size={16} />
        ) : sortOrder === "asc" ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        );

        return (
          <button
            key={field}
            onClick={() => onSort(field)}
            className={`flex items-center gap-1 px-3 py-1 rounded transition
              ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
              }`}
          >
            {label} {icon}
          </button>
        );
      })}
    </section>
  );
}
