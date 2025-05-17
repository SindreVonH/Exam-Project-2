// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/storage/authStore";

export default function RegisterPage() {
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(name, email, password, venueManager);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center px-4 py-12 sm:py-20 bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="w-full max-w-md bg-[var(--color-surface)] rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
          <input
            type="email"
            className="w-full px-4 py-2 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <div className="flex items-center space-x-2">
            <input
              id="venueManager"
              type="checkbox"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
              className="accent-[var(--color-primary)]"
            />
            <label htmlFor="venueManager" className="font-medium">
              Register as Venue Manager
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}
