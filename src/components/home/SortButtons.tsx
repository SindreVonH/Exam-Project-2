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
    <section
      className="flex gap-2 sm:gap-3 flex-wrap items-center 
                 text-base sm:text-lg font-medium text-[var(--color-text)] 
                 pt-2 pb-1 sm:pt-4 sm:pb-2"
    >
      {buttons.map(({ field, label }) => {
        const isActive = activeSort === field;
        const icon = !isActive ? (
          <Minus size={14} />
        ) : sortOrder === "asc" ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        );

        return (
          <button
            key={field}
            onClick={() => onSort(field)}
            className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded transition
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
