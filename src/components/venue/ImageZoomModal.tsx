import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images: { url: string; alt?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageModal({ images, currentIndex, onClose, onNext, onPrev }: Props) {
  const image = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      style={{
        zIndex: 9999,
        minHeight: "100vh",
        height: "100dvh", // støtter også mobil
      }}
    >
      {/* Sikrer at Leaflet sine children ikke krangler */}
      <style>
        {`
          .leaflet-container,
          .leaflet-pane,
          .leaflet-top,
          .leaflet-bottom {
            z-index: 0 !important;
          }
        `}
      </style>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black"
      >
        <ChevronLeft size={28} />
      </button>

      <img
        src={image.url}
        alt={image.alt || ""}
        className="max-h-[80vh] max-w-[90vw] object-contain rounded shadow"
      />

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
