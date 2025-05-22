// src/components/home/SearchSection.tsx

import React from "react";

interface SearchSectionProps {
  search: string;
  setSearch: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SearchSection({ search, setSearch, onSubmit }: SearchSectionProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search venues..."
        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-lg sm:text-xl"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-lg sm:text-xl font-semibold"
      >
        Search
      </button>
    </form>
  );
}
