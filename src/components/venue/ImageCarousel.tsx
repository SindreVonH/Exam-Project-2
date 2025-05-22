import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageModal } from "./ImageZoomModal";

interface Props {
  media: { url: string; alt?: string }[];
  altFallback: string;
}

export function VenueImageCarousel({ media, altFallback }: Props) {
  const images = media?.length ? media : [{ url: "/placeholder.jpg", alt: altFallback }];
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <figure className="relative w-full h-60 sm:h-96 rounded-xl overflow-hidden">
        <img
          src={images[current].url}
          alt={images[current].alt || altFallback}
          className="w-full h-full object-cover transition duration-300 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />

        {images.length > 1 && (
          <>
            <ImageNavButton direction="left" onClick={prev} />
            <ImageNavButton direction="right" onClick={next} />
            <DotIndicators count={images.length} current={current} />
          </>
        )}

        <figcaption className="sr-only">{images[current].alt || altFallback}</figcaption>
      </figure>

      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={current}
          onClose={() => setIsModalOpen(false)}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}

// === Navigation Buttons ===
function ImageNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const position = direction === "left" ? "left-2" : "right-2";

  return (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60`}
      aria-label={direction === "left" ? "Previous image" : "Next image"}
    >
      <Icon size={24} />
    </button>
  );
}

// === Dot Indicators ===
function DotIndicators({ count, current }: { count: number; current: number }) {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition ${
            i === current ? "bg-white" : "bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}
