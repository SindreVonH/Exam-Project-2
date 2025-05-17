import { useParams } from "react-router-dom";
import { useSingleVenue } from "../hooks/useSingleVenue";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { BookVenueOverlay } from "../components/venue/BookVenueOverlay";
import { VenueHeaderSection } from "../components/venue/VenueHeaderSection";
import LayoutWrapper from "../components/commen/LayoutWrapper";
import { VenueInfoSection } from "../components/venue/VenueInfoSection";
import { VenueLocationSection } from "../components/venue/VenueLocationSection";

export default function SingleVenuePage() {
  const { id } = useParams<{ id: string }>();
  const { venue, isLoading, isError } = useSingleVenue(id || "");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!id) {
    return (
      <div className="bg-[var(--color-background)] px-4 py-8 text-center text-[var(--color-muted)]">
        Invalid venue ID.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-[var(--color-background)] px-4 py-8 text-center text-[var(--color-muted)]">
        Loading venue...
      </div>
    );
  }

  if (isError || !venue) {
    return (
      <div className="bg-[var(--color-background)] px-4 py-8 text-center text-red-400">
        Error loading venue.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <VenueHeaderSection venue={venue} onBook={() => setIsBookingOpen(true)} />
          <VenueInfoSection venue={venue} onBook={() => setIsBookingOpen(true)} />
          <VenueLocationSection venue={venue} />
        </div>
      </LayoutWrapper>

      {isBookingOpen && <BookVenueOverlay venue={venue} onClose={() => setIsBookingOpen(false)} />}
    </main>
  );
}
