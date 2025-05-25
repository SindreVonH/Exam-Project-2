import { Pencil } from "lucide-react";
import type { Profile } from "../../types/Profile";

interface Props {
  profile: Profile;
  onEdit: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

type Tab = "bookings" | "venues" | "create";

export function ProfileHeader({ profile, onEdit, activeTab, setActiveTab }: Props) {
  const tabs: Tab[] = profile.venueManager ? ["bookings", "venues", "create"] : ["bookings"];

  const tabLabels: Record<Tab, string> = {
    bookings: "Bookings",
    venues: "Venues",
    create: "Create venue",
  };

  return (
    <header className="relative bg-[var(--color-surface-2)] rounded-xl shadow overflow-hidden">
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-6 py-6">
        <ProfileAvatar profile={profile} />
        <ProfileName profile={profile} onEdit={onEdit} />
      </section>

      {tabs.length > 0 && (
        <TabNav
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabLabels={tabLabels}
        />
      )}
    </header>
  );
}

// === Subcomponents ===

function ProfileAvatar({ profile }: { profile: Profile }) {
  return (
    <img
      src={profile.avatar?.url || "/placeholder.jpg"}
      alt={profile.avatar?.alt || "User avatar"}
      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[var(--color-border)]"
    />
  );
}

function ProfileName({ profile, onEdit }: { profile: Profile; onEdit: () => void }) {
  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
          {profile.name}
        </h1>
        <button
          onClick={onEdit}
          className="p-2 rounded-md text-[var(--color-text) bg-[var(--color-border)] hover:bg-[var(--color-primary)] transition"
          aria-label="Edit profile"
        >
          <Pencil size={16} />
        </button>
      </div>
      <p className="text-sm sm:text-base text-[var(--color-muted)] mt-1">
        {profile.venueManager ? "Venue manager" : "Guest"}
      </p>
    </div>
  );
}

function TabNav({
  tabs,
  activeTab,
  setActiveTab,
  tabLabels,
}: {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabLabels: Record<Tab, string>;
}) {
  return (
    <nav className="sticky bottom-0 border-t border-[var(--color-border)]">
      <ul className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
        {tabs.map((tab) => (
          <li key={tab} className="flex-1">
            <button
              onClick={() => setActiveTab(tab)}
              className={`w-full text-center px-4 py-3 text-base font-medium transition ${
                activeTab === tab
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:bg-[var(--color-border)]"
              }`}
            >
              {tabLabels[tab]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
