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

  if (!id) return <div className="bg-[var(--color-background)] p-4">Invalid venue ID.</div>;
  if (isLoading) return <div className="bg-[var(--color-background)] p-4">Loading venue...</div>;
  if (isError || !venue) return <div className="p-4">Error loading venue.</div>;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        <div className="space-y-6">
          <VenueHeaderSection venue={venue} onBook={() => setIsBookingOpen(true)} />
          <VenueInfoSection venue={venue} onBook={() => setIsBookingOpen(true)} />
          <VenueLocationSection venue={venue} />

          {/* Booking overlay */}
          {isBookingOpen && (
            <BookVenueOverlay venue={venue} onClose={() => setIsBookingOpen(false)} />
          )}
        </div>
      </LayoutWrapper>
    </main>
  );
}
