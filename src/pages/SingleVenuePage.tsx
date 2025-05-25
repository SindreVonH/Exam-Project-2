import { useParams } from "react-router-dom";
import { useSingleVenue } from "../hooks/useSingleVenue";
import { useRelatedVenues } from "../hooks/useRelatedVenues";
import { useState, useEffect } from "react";
import { BookVenueOverlay } from "../components/venue/BookingOverlay";
import { VenueHeaderSection } from "../components/venue/HeaderSection";
import LayoutWrapper from "../components/common/LayoutWrapper";
import { VenueInfoSection } from "../components/venue/InfoSection";
import { VenueLocationSection } from "../components/venue/LocationSection";
import CompactVenuesList from "../components/venue/CompactVenuesList";
import { VenueSkeleton } from "../components/venue/VenueSkeleton";
import "leaflet/dist/leaflet.css";

export default function SingleVenuePage() {
  const { id } = useParams<{ id: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { venue, isLoading, isError } = useSingleVenue(id || "");

  useEffect(() => {
    sessionStorage.removeItem("scrollY");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const {
    venues: relatedVenues,
    isLoading: isLoadingRelated,
    isError: errorRelated,
    errorMessage,
  } = useRelatedVenues(venue?.location?.city || "", venue?.id || "");

  // === Early exits ===
  if (!id) return <InvalidVenueMessage />;
  if (isLoading) return <LoadingView />;
  if (isError || !venue) return <ErrorView />;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        <article className="space-y-6 sm:space-y-8 lg:space-y-10">
          <VenueHeaderSection venue={venue} onBook={() => setIsBookingOpen(true)} />
          <VenueInfoSection venue={venue} onBook={() => setIsBookingOpen(true)} />
          <VenueLocationSection venue={venue} />

          {venue.location?.city && (
            <section className="pt-10">
              <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
                More places near {venue.location?.city?.trim() || "Unknown location"}
              </h2>
              <CompactVenuesList
                venues={relatedVenues}
                isLoading={isLoadingRelated}
                isError={errorRelated}
                errorMessage={
                  venue.location?.city?.trim() ? errorMessage : "This venue has no city data."
                }
              />
            </section>
          )}
        </article>
      </LayoutWrapper>

      {isBookingOpen && <BookVenueOverlay venue={venue} onClose={() => setIsBookingOpen(false)} />}
    </main>
  );
}

// === Utility Views ===

function InvalidVenueMessage() {
  return (
    <div className="bg-[var(--color-background)] px-4 py-8 text-center text-[var(--color-muted)]">
      Invalid venue ID.
    </div>
  );
}

function LoadingView() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        <VenueSkeleton />
      </LayoutWrapper>
    </main>
  );
}

function ErrorView() {
  return (
    <div className="bg-[var(--color-background)] px-4 py-8 text-center text-red-400">
      Error loading venue. Please try again later.
    </div>
  );
}
