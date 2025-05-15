import React from "react";
import { useState } from "react";
import { createVenue } from "../../lib/api/venues/createVenue";
import { MapClickSelector } from "../venue/MapClickSelector";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function CreateVenueForm({ onSuccess, onCancel }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [media, setMedia] = useState<{ url: string; alt: string }[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaAlt, setNewMediaAlt] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [lat, setLat] = useState(60);
  const [lng, setLng] = useState(10);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Creating venue...");

    try {
      await createVenue({
        name,
        description,
        price,
        maxGuests,
        media,
        meta: { wifi, parking, breakfast, pets },
        location: { address, city, zip, country, continent, lat, lng },
      });

      setMessage("Venue created!");
      onSuccess();
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 bg-black/50 backdrop-blur-sm overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-2xl rounded-xl shadow-xl p-6 space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Venue</h2>
          <button type="button" onClick={onCancel} className="text-red-500 text-sm">
            ✕ Close
          </button>
        </div>

        <div>
          <label className="block font-medium">Venue name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image Upload + Preview */}
        <div className="space-y-2">
          <label className="font-medium">Featured image</label>
          {newMediaUrl && (
            <img
              src={newMediaUrl}
              alt={newMediaAlt || "Preview"}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              placeholder="Image URL"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Alt text"
              value={newMediaAlt}
              onChange={(e) => setNewMediaAlt(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => {
                if (newMediaUrl && newMediaAlt) {
                  setMedia([...media, { url: newMediaUrl, alt: newMediaAlt }]);
                  setNewMediaUrl("");
                  setNewMediaAlt("");
                }
              }}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add
            </button>
          </div>

          {media.length > 0 && (
            <ul className="space-y-1 text-sm">
              {media.map((m, i) => (
                <li key={i} className="flex justify-between items-center border p-2 rounded">
                  <span>{m.url}</span>
                  <button
                    type="button"
                    onClick={() => setMedia(media.filter((_, index) => index !== i))}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Description & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border p-2 rounded h-32"
            />
          </div>
          <div>
            <label className="block font-medium">Price (NOK)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Wifi", checked: wifi, set: setWifi },
            { label: "Parking", checked: parking, set: setParking },
            { label: "Breakfast", checked: breakfast, set: setBreakfast },
            { label: "Pets", checked: pets, set: setPets },
          ].map((f, i) => (
            <label key={i} className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={f.checked}
                onChange={(e) => f.set(e.target.checked)}
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>

        {/* Location */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Location details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Continent"
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          {/* Map (lat/lng stored internally) */}
          <MapClickSelector
            position={{ lat, lng }}
            onSelect={(lat, lng) => {
              setLat(lat);
              setLng(lng);
            }}
          />
        </div>

        {/* Submit + Cancel */}
        <div className="flex gap-2 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Create
          </button>
          <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
            Cancel
          </button>
        </div>

        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
