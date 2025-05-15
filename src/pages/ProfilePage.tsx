// src/pages/ProfilePage.tsx
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { EditProfileForm } from "../components/profile/EditProfileForm";
import { CreateVenueForm } from "../components/profile/CreateVenueForm";
import { VenueCard } from "../components/profile/VenueCard";
import { BookingCard } from "../components/profile/BookingCard";
import EditBookingOverlay from "../components/profile/EditBookingOverLay";
import { deleteBooking } from "../lib/api/bookings/deleteBooking";
import { toast } from "react-hot-toast";
import type { UserBooking } from "../types/Booking";

export default function ProfilePage() {
  const { profile, isLoading, isError, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingVenue, setIsCreatingVenue] = useState(false);
  const [activeTab, setActiveTab] = useState("venues");
  const [editingBooking, setEditingBooking] = useState<UserBooking | null>(null);

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      toast.success("Booking deleted");
      refetch();
      setEditingBooking(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete booking");
    }
  };

  if (isLoading) return <div className="p-4">Loading profile...</div>;
  if (isError || !profile) return <div className="p-4">Error loading profile.</div>;

  return (
    <div className="p-4 space-y-6 relative">
      {/* Banner & Avatar */}
      <div className="flex flex-col items-center relative">
        <img
          src={profile.banner?.url || "/placeholder.jpg"}
          alt={profile.banner?.alt || "Banner"}
          className="w-full max-w-4xl h-48 object-cover rounded-lg mb-4"
        />
        <img
          src={profile.avatar?.url || "/placeholder.jpg"}
          alt={profile.avatar?.alt || "Avatar"}
          className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-md"
        />
        <h1 className="text-2xl font-bold mt-2">{profile.name}</h1>
        <p className="text-gray-500">{profile.email}</p>
        <p className="text-sm text-gray-400">{profile.venueManager ? "Venue Manager" : "Guest"}</p>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="absolute top-2 right-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? "Close" : "Edit"}
        </button>

        {profile.venueManager && (
          <button
            onClick={() => setIsCreatingVenue(true)}
            className="absolute top-2 left-2 px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Create Venue
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6">
        {["venues", "bookings", "favorites"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-zinc-200"
            }`}
          >
            {tab === "venues" ? "Created Venues" : tab === "bookings" ? "Bookings" : "Favorites"}
          </button>
        ))}
      </div>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <EditBookingOverlay
          booking={editingBooking}
          onClose={() => {
            setEditingBooking(null);
            refetch();
          }}
          onDelete={handleDeleteBooking}
        />
      )}

      {/* Forms */}
      {isEditing && (
        <EditProfileForm
          profile={profile}
          onSuccess={() => {
            refetch();
            setIsEditing(false);
          }}
        />
      )}

      {isCreatingVenue && (
        <CreateVenueForm
          onSuccess={() => {
            refetch();
            setIsCreatingVenue(false);
          }}
          onCancel={() => setIsCreatingVenue(false)}
        />
      )}

      {/* Venues */}
      {activeTab === "venues" && profile.venueManager && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Venues</h2>
          {profile.venues?.length ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {profile.venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <p>You haven’t created any venues yet.</p>
          )}
        </section>
      )}

      {/* Bookings */}
      {activeTab === "bookings" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
          {profile.bookings?.length ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {profile.bookings.map((booking) => (
                <div key={booking.id} className="relative group">
                  <BookingCard booking={booking} />
                  <button
                    onClick={() => setEditingBooking(booking)}
                    className="absolute top-2 right-2 text-xs bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You have no bookings yet.</p>
          )}
        </section>
      )}

      {/* Favorites */}
      {activeTab === "favorites" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Your Favorites</h2>
          <p>Coming soon...</p>
        </section>
      )}
    </div>
  );
}
