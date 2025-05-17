// src/components/commen/Footer.tsx
import { ArrowUp, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] text-[var(--color-text)] font-instrument border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 grid gap-6 md:gap-4 grid-cols-1 md:grid-cols-3 items-center text-center md:text-left">
        {/* Venstre – Logo */}
        <div className="text-2xl sm:text-3xl font-semibold">Holidaze</div>

        {/* Midten – Back to top og copyright */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-base font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </button>
          <address className="not-italic text-sm text-[var(--color-muted)]">
            © Holidaze 2025
          </address>
        </div>

        {/* Høyre – SoMe lenker */}
        <nav className="flex justify-center md:justify-end gap-4" aria-label="Social media">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 hover:opacity-80 transition" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6 hover:opacity-80 transition" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
