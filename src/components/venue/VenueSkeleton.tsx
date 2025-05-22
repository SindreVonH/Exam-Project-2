export function VenueSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-pulse">
      {/* Header-bilde og navn */}
      <div className="h-[300px] w-full rounded-xl bg-[var(--color-surface-2)]/20" />

      {/* Info-seksjon */}
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-[var(--color-surface-2]/20 rounded" />
        <div className="h-5 w-1/2 bg-[var(--color-surface-2)]/20 rounded" />
        <div className="h-5 w-full bg-[var(--color-surface-2)]/20 rounded" />
        <div className="h-5 w-[80%] bg-[var(--color-surface-2)]/20 rounded" />
      </div>

      {/* Kart placeholder */}
      <div className="h-64 w-full bg-[var(--color-surface-2)]/20 rounded-xl" />
    </div>
  );
}
