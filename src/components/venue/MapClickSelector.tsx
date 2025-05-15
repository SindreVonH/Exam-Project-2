import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";

type Props = {
  position: { lat: number; lng: number };
  onSelect: (lat: number, lng: number) => void;
};

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function MapClickSelector({ position, onSelect }: Props) {
  const center: LatLngExpression = [position.lat || 60, position.lng || 10];

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={true}
      style={
        {
          height: "300px",
          width: "100%",
          borderRadius: "8px",
          marginTop: "1rem",
        } as React.CSSProperties
      }
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onSelect={onSelect} />
      <Marker position={center} />
    </MapContainer>
  );
}
