import { useRef, useState, useEffect } from "react";
import type { TimelineItem } from "../types/capsule";

interface PhotoCarouselProps {
  items: TimelineItem[];
}

/**
 * Carrossel horizontal de fotos, uma por vez. Usa scroll nativo do
 * navegador (suporta arrastar/swipe em touch automaticamente) com setas
 * e indicadores (dots) mostrando a posição atual.
 */
export default function PhotoCarousel({ items }: PhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function updateActiveIndex() {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex);
    window.addEventListener("resize", updateActiveIndex);
    return () => {
      el.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  function goToIndex(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-center shrink-0 w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden"
          >
            <img src={item.imageUrl} alt={item.caption} className="w-full aspect-[4/3] object-cover" />
            <p className="p-4 text-[#d5c9c1]">{item.caption}</p>
          </div>
        ))}
      </div>

      {activeIndex > 0 && (
        <button
          onClick={() => goToIndex(activeIndex - 1)}
          aria-label="Foto anterior"
          className="absolute left-1 top-[38%] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
        >
          ‹
        </button>
      )}

      {activeIndex < items.length - 1 && (
        <button
          onClick={() => goToIndex(activeIndex + 1)}
          aria-label="Próxima foto"
          className="absolute right-1 top-[38%] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
        >
          ›
        </button>
      )}

      {items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              aria-label={`Ir para foto ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-5 bg-rose-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
