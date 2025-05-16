import { useState } from "react";
import { X } from "lucide-react";
import { updateProfile } from "../../lib/api/profile/updateProfile";
import { toast } from "react-hot-toast";
import type { Profile } from "../../types/Profile";

interface Props {
  profile: Profile;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditProfileOverlay({ profile, onClose, onSuccess }: Props) {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar?.url || "");
  const [venueManager, setVenueManager] = useState(profile.venueManager);
  const [loading, setLoading] = useState(false);
  const avatarAlt = "User avatar";

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        avatar: { url: avatarUrl, alt: avatarAlt },
        venueManager,
      });
      toast.success("Profile updated");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl p-6 w-full max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Avatar URL</label>
            <input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--color-background)] border border-[var(--color-border)]"
              placeholder="https://..."
            />
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover border"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={venueManager}
              onChange={() => setVenueManager((v) => !v)}
              className="w-4 h-4 accent-[var(--color-primary)]"
              id="venueManager"
            />
            <label htmlFor="venueManager" className="text-sm">
              I want to become a Venue Manager
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-2 rounded w-full mt-4"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
