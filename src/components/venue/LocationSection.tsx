import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Venue } from "../../types/Venue";

interface Props {
  venue: Venue;
}

const DEFAULT_POSITION = {
  lat: 59.9139, // Oslo
  lng: 10.7522,
};

export function VenueLocationSection({ venue }: Props) {
  const { location } = venue;

  const hasCoords =
    typeof location?.lat === "number" &&
    typeof location?.lng === "number" &&
    (location.lat !== 0 || location.lng !== 0);

  const lat = hasCoords ? location.lat! : DEFAULT_POSITION.lat;
  const lng = hasCoords ? location.lng! : DEFAULT_POSITION.lng;

  return (
    <section className="bg-[var(--color-surface)] rounded-lg shadow p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
      <LocationInfo location={location} hasCoords={hasCoords} />
      <VenueMap lat={lat} lng={lng} hasCoords={hasCoords} />
    </section>
  );
}

// === Venue text info ===
function LocationInfo({
  location,
  hasCoords,
}: {
  location: Venue["location"];
  hasCoords: boolean;
}) {
  return (
    <article className="w-full lg:w-1/3 space-y-12 sm:space-y-16">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[var(--color-text)]">
          Location
        </h2>
        <p className="text-base sm:text-lg md:text-[24px] text-[var(--color-muted)] leading-tight mt-1">
          {location?.country || "Unknown"}
          <br />
          {location?.continent || ""}
        </p>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[var(--color-text)]">
          Address
        </h3>
        <address className="not-italic text-base sm:text-lg md:text-[24px] text-[var(--color-muted)] leading-tight mt-1">
          {location?.address || "No address"}
          <br />
          {location?.city || ""}
          <br />
          {location?.zip || ""}
        </address>
      </div>

      {!hasCoords && (
        <p className="text-sm text-[var(--color-muted)] italic">
          Location not specified – showing Oslo as an example.
        </p>
      )}
    </article>
  );
}

// === Venue map ===
function VenueMap({ lat, lng, hasCoords }: { lat: number; lng: number; hasCoords: boolean }) {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={hasCoords ? 13 : 5}
        scrollWheelZoom
        doubleClickZoom
        dragging
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </div>
  );
}
