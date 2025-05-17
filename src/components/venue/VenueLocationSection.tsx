import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Venue } from "../../types/Venue";

interface Props {
  venue: Venue;
}

export function VenueLocationSection({ venue }: Props) {
  const { location } = venue;

  const hasCoords =
    typeof location?.lat === "number" &&
    typeof location?.lng === "number" &&
    (location.lat !== 0 || location.lng !== 0);

  const safeLat = location?.lat ?? 60;
  const safeLng = location?.lng ?? 10;

  return (
    <section className="bg-[var(--color-surface)] rounded-lg shadow p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
      {/* Tekst Info */}
      <div className="w-full lg:w-1/3 space-y-12 sm:space-y-16">
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
          <p className="text-base sm:text-lg md:text-[24px] text-[var(--color-muted)] leading-tight mt-1">
            {location?.address || "No address"}
            <br />
            {location?.city || ""}
            <br />
            {location?.zip || ""}
          </p>
        </div>
      </div>

      {/* Kart */}
      {hasCoords && (
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={[safeLat, safeLng]}
            zoom={13}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            dragging={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[safeLat, safeLng]} />
          </MapContainer>
        </div>
      )}
    </section>
  );
}
