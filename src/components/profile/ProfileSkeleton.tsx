export function ProfileSkeleton() {
  return (
    <section className="bg-[var(--color-surface)] rounded-xl shadow p-4 space-y-6 animate-pulse">
      {/* Avatar + name */}
      <div className="flex items-center gap-4">
        <div className="w-35 h-35 rounded-full bg-[var(--color-border)]" />
        <div className="space-y-2 flex-1">
          <div className="w-1/3 h-4 rounded bg-[var(--color-border)]" />
          <div className="w-1/4 h-3 rounded bg-[var(--color-border)]" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 pt-2">
        <div className="h-10 w-24 bg-[var(--color-border)] rounded-lg" />
        <div className="h-10 w-24 bg-[var(--color-border)] rounded-lg" />
        <div className="h-10 w-32 bg-[var(--color-border)] rounded-lg" />
      </div>
    </section>
  );
}
