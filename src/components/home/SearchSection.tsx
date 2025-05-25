import React from "react";
import { Search } from "lucide-react";

interface SearchSectionProps {
  search: string;
  setSearch: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SearchSection({ search, setSearch, onSubmit }: SearchSectionProps) {
  return (
    <form onSubmit={onSubmit} className="py-4">
      {/* Wrapper for input + icon (mobile) */}
      <div className="relative flex sm:hidden ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for venue"
          className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-base"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop: full size input + button */}
      <div className="hidden sm:flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search venues..."
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-lg"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-lg font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  );
}
