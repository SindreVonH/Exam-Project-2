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
    <section className="bg-[var(--color-surface)] rounded-lg shadow p-4 flex flex-col lg:flex-row items-start gap-6">
      {/* Tekst Info */}
      <div className="w-full lg:w-1/4 px-14 mt-16 space-y-20">
        <div>
          <h2 className="text-[32px] font-semibold text-[var(--color-text)]">Location</h2>
          <p className="text-[var(--color-muted)] text-[24px] leading-tight">
            {location?.country || "Unknown"}
            <br />
            {location?.continent || ""}
          </p>
        </div>

        <div>
          <h3 className="text-[32px] font-semibold text-[var(--color-text)]">Address</h3>
          <p className="text-[var(--color-muted)] text-[24px] leading-tight">
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
        <div className="flex-1 w-full h-[500px] rounded-lg overflow-hidden">
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
