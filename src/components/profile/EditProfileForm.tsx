// src/components/EditProfileForm.tsx
import React from "react";
import { useState } from "react";
import { updateProfile } from "../../lib/api/profile/updateProfile";
import type { Profile } from "../../types/Profile";

type Props = {
  profile: Profile;
  onSuccess: () => void;
};

export function EditProfileForm({ profile, onSuccess }: Props) {
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar?.url || "");
  const [avatarAlt, setAvatarAlt] = useState(profile.avatar?.alt || "");
  const [bannerUrl, setBannerUrl] = useState(profile.banner?.url || "");
  const [bannerAlt, setBannerAlt] = useState(profile.banner?.alt || "");
  const [venueManager, setVenueManager] = useState(profile.venueManager || false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Saving...");

    try {
      const updated = await updateProfile({
        bio,
        avatar: { url: avatarUrl, alt: avatarAlt },
        banner: { url: bannerUrl, alt: bannerAlt },
        venueManager,
      });

      setMessage("Profile updated successfully!");
      onSuccess(); // 🔁 trigger refetch og lukk
    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto border rounded p-4 shadow space-y-4">
      <h2 className="text-lg font-semibold">Edit Profile</h2>

      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Avatar URL</label>
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Avatar Alt Text</label>
        <input
          value={avatarAlt}
          onChange={(e) => setAvatarAlt(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Banner URL</label>
        <input
          type="url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Banner Alt Text</label>
        <input
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={venueManager}
          onChange={(e) => setVenueManager(e.target.checked)}
        />
        <label>Venue Manager</label>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}
