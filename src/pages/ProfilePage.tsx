import { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { VenueFormStepper } from "../components/profile/CreateVenueOverlay";
import { VenueCard } from "../components/profile/VenueCard";
import { BookingTabs } from "../components/profile/Bookingtabs";
import { EditBookingOverlay } from "../components/profile/EditBookingOverLay";
import { EditProfileOverlay } from "../components/profile/EditProfileFormOverlay";
import { deleteBooking } from "../lib/api/bookings/deleteBooking";
import { deleteVenue } from "../lib/api/venues/deleteVenue";
import LayoutWrapper from "../components/commen/LayoutWrapper";
import { toast } from "react-hot-toast";
import type { UserBooking } from "../types/Booking";
import type { Venue } from "../types/Venue";

export default function ProfilePage() {
  const { profile, isLoading, isError, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");

  const [editingBooking, setEditingBooking] = useState<UserBooking | null>(null);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    setVenues(profile?.venues || []);
  }, [profile?.venues]);

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      toast.success("Booking deleted");
      setEditingBooking(null);
      refetch();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete booking");
    }
  };

  const handleDeleteVenue = async (venueId: string) => {
    const confirmed = confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      await deleteVenue(venueId);
      setVenues((prev) => prev.filter((v) => v.id !== venueId));
      toast.success("Venue deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete venue");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] p-4 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-red-500 p-4 flex items-center justify-center">
        Error loading profile.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-instrument">
      <LayoutWrapper>
        <div className="space-y-6 max-w-7xl mx-auto">
          <ProfileHeader
            profile={profile}
            onEdit={() => setIsEditing(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {isEditing && (
            <EditProfileOverlay
              profile={profile}
              onClose={() => setIsEditing(false)}
              onSuccess={() => {
                setIsEditing(false);
                refetch();
              }}
            />
          )}

          {activeTab === "create" && (
            <VenueFormStepper
              mode="create"
              onCancel={() => setActiveTab("venues")}
              onSubmit={async () => {
                setActiveTab("venues");
                refetch();
              }}
            />
          )}

          {activeTab === "bookings" && (
            <BookingTabs bookings={profile.bookings || []} onEditBooking={setEditingBooking} />
          )}

          {activeTab === "venues" && profile.venueManager && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Your Venues</h2>
              {venues.length ? (
                <div className="flex flex-col gap-4">
                  {venues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      onEdit={() => setEditingVenue(venue)}
                      onDelete={handleDeleteVenue}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-muted)]">You haven’t created any venues yet.</p>
              )}
            </section>
          )}

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

          {editingVenue && (
            <VenueFormStepper
              mode="edit"
              initialData={editingVenue}
              onCancel={() => setEditingVenue(null)}
              onSubmit={async () => {
                setEditingVenue(null);
                refetch();
              }}
            />
          )}
        </div>
      </LayoutWrapper>
    </main>
  );
}
