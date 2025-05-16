import { Pencil } from "lucide-react";
import type { Profile } from "../../types/Profile";

interface Props {
  profile: Profile;
  onEdit: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProfileHeader({ profile, onEdit, activeTab, setActiveTab }: Props) {
  const tabs = profile.venueManager ? ["bookings", "venues", "create"] : ["bookings"];

  const tabLabels: Record<string, string> = {
    bookings: "Bookings",
    venues: "Venues",
    create: "Create venue",
  };

  return (
    <div className="relative bg-[var(--color-surface-2)] rounded-xl shadow overflow-hidden">
      {/* Profile info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-6 py-6">
        {/* Avatar */}
        <img
          src={profile.avatar?.url || "/placeholder.jpg"}
          alt={profile.avatar?.alt || "User avatar"}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[var(--color-border)]"
        />

        {/* Name + role */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
              {profile.name}
            </h1>
            <button
              onClick={onEdit}
              className="p-2 rounded-md text-white bg-[var(--color-border)] hover:bg-[var(--color-primary)] transition"
              aria-label="Edit profile"
            >
              <Pencil size={16} />
            </button>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-muted)] mt-1">
            {profile.venueManager ? "Venue manager" : "Guest"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="sticky bottom-0 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center px-4 py-3 text-base font-medium transition 
                  ${
                    activeTab === tab
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:bg-[var(--color-border)]"
                  }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
