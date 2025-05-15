import heroImage from "../assets/hero.png";
import { useVenues } from "../hooks/useVenues";
import { VenueCardHome } from "../components/home/VenueCardHome";
import LayoutWrapper from "../components/commen/LayoutWrapper";

export default function HomePage() {
  const { venues, isLoading, isError } = useVenues();

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        {/* Hero */}
        <section className="rounded-xl overflow-hidden relative">
          <img src={heroImage} alt="Hero" className="w-full h-120 object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white px-6 text-center">
            Find your perfect getaway
          </h1>
        </section>

        {/* Search */}
        <section className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-2xl [var(--color-text)]"
          />
          <button className="px-6 py-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-2xl text-white">
            Search
          </button>
        </section>

        {/* Filters */}
        <section className="flex gap-4 flex-wrap text-3xl font-medium text-[var( --color-text)]">
          <button className="hover:text-[var(--color-text)] transition">Price ▼</button>
          <button className="hover:text-[var(--color-text)] transition">Beds ▼</button>
          <button className="hover:text-[var(--color-text)] transition">Latest ▼</button>
        </section>

        {/* Venue Grid */}
        <section>
          {isLoading && <p>Loading venues...</p>}
          {isError && <p className="text-red-500">Error loading venues</p>}
          {!isLoading && !isError && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {venues.map((venue) => (
                <VenueCardHome key={venue.id} venue={venue} />
              ))}
            </ul>
          )}
        </section>

        {/* Show More */}
        <div className="flex justify-center">
          <button className="px-6 py-2 rounded border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-background)]">
            Show more
          </button>
        </div>
      </LayoutWrapper>
    </main>
  );
}
