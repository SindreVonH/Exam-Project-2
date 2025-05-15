// src/pages/DesignSystem.tsx
const colorTokens = [
  "background",
  "surface",
  "text",
  "muted",
  "border",
  "primary",
  "primary-hover",
  "accent",
];

export default function DesignSystem() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-background)] text-[var(--color-text)] font-instrument transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">🎨 Design System</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Fargevariabler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {colorTokens.map((token) => (
            <div
              key={token}
              className="rounded border border-[var(--color-border)] p-4 text-sm shadow"
              style={{
                backgroundColor: `var(--color-${token})`,
                color: token === "background" || token === "surface" ? "#111" : "inherit",
              }}
            >
              <strong>--color-{token}</strong>
              <p className="text-[var(--color-muted)] text-xs mt-1">bg-[var(--color-{token})]</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded">
            Primærknapp
          </button>
          <button className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4 py-2 rounded">
            Sekundærknapp
          </button>
        </div>
      </section>

      <section className="text-xs text-[var(--color-muted)] mt-10 font-mono">
        Aktiver mørk modus i navbaren for å se endringer ✨
      </section>
    </div>
  );
}
