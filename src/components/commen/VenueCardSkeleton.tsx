export function VenueCardSkeleton() {
  return (
    <li className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-70 bg-[var(--color-muted)]/20" />

      {/* Content placeholder */}
      <div className="p-6 flex flex-col gap-6">
        {/* Title + location */}
        <div className="space-y-2">
          <div className="h-6 rounded w-3/4 bg-[var(--color-muted)]/20" />
          <div className="h-5 rounded w-1/2 bg-[var(--color-muted)]/20" />
        </div>

        {/* Price + Beds */}
        <div className="flex justify-between">
          <div className="h-5 rounded w-1/3 bg-[var(--color-muted)]/20" />
          <div className="h-5 rounded w-1/4 bg-[var(--color-muted)]/20" />
        </div>

        {/* Button */}
        <div className="h-10 rounded w-1/2 bg-[var(--color-muted)]/20" />
      </div>
    </li>
  );
}
