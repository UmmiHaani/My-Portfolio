import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { playUiClickSound } from "../lib/re4Audio";

function CardImage({ card }: { card: StackedCard }) {
  const [src, setSrc] = useState(card.image ?? "");

  useEffect(() => {
    setSrc(card.image ?? "");
  }, [card.image]);

  const handleError = () => {
    if (card.imageFallback && src !== card.imageFallback) {
      setSrc(card.imageFallback);
    }
  };

  return (
    <img
      src={src}
      alt={card.imageAlt ?? card.label}
      className="h-full w-full object-cover"
      onError={handleError}
    />
  );
}

export interface StackedCard {
  id: number;
  label: string;
  image?: string;
  imageFallback?: string;
  imageAlt?: string;
}

interface StackedCardCarouselProps {
  cards: StackedCard[];
  /** Fixed height in px. Ignored when `aspectVideo` is true. */
  height?: number;
  /** 16:9 widescreen banner (e.g. 1024×576) */
  aspectVideo?: boolean;
  className?: string;
  showHint?: boolean;
}

const STACK_LAYOUT = [
  {
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    zIndex: 30,
    opacity: 1,
    shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.55)",
  },
  {
    scale: 0.94,
    x: 28,
    y: 14,
    rotate: 5,
    zIndex: 20,
    opacity: 0.92,
    shadow: "0 16px 32px -10px rgba(0, 0, 0, 0.45)",
  },
  {
    scale: 0.88,
    x: 56,
    y: 28,
    rotate: 9,
    zIndex: 10,
    opacity: 0.82,
    shadow: "0 10px 24px -8px rgba(0, 0, 0, 0.4)",
  },
] as const;

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

function CardFace({
  card,
  showHint,
}: {
  card: StackedCard;
  showHint: boolean;
}) {
  if (card.image) {
    return (
      <div className="relative w-full h-full bg-[#0d1117]">
        <CardImage card={card} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1c2128] to-[#161b22]">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center">
          <span className="text-[#58a6ff] text-2xl font-bold">{card.id}</span>
        </div>
        <p className="text-[#8b949e] text-sm">{card.label}</p>
        {showHint && (
          <p className="text-[#6e7681] text-xs mt-1">Click for next</p>
        )}
      </div>
    </div>
  );
}

export function StackedCardCarousel({
  cards,
  height = 400,
  aspectVideo = false,
  className = "",
  showHint = true,
}: StackedCardCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    playUiClickSound();
    setIsAnimating(true);
    setCurrentSlide(index);
    window.setTimeout(() => setIsAnimating(false), 550);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    playUiClickSound();
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % cards.length);
    window.setTimeout(() => setIsAnimating(false), 550);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    playUiClickSound();
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
    window.setTimeout(() => setIsAnimating(false), 550);
  };

  return (
    <div
      className={`relative w-full ${aspectVideo ? "aspect-video" : ""} ${className}`}
      style={aspectVideo ? undefined : { height }}
    >
      <div className="relative w-full h-full pr-16">
        {cards.map((card, index) => {
          const stackPos =
            (index - currentSlide + cards.length) % cards.length;
          const layout =
            STACK_LAYOUT[stackPos] ?? STACK_LAYOUT[STACK_LAYOUT.length - 1];
          const isFront = stackPos === 0;

          return (
            <motion.div
              key={card.id}
              className="absolute inset-0 origin-center"
              initial={false}
              animate={{
                scale: layout.scale,
                x: layout.x,
                y: layout.y,
                rotate: layout.rotate,
                opacity: layout.opacity,
              }}
              transition={springTransition}
              style={{
                zIndex: layout.zIndex,
                boxShadow: layout.shadow,
              }}
            >
              <div
                role={isFront ? "button" : undefined}
                tabIndex={isFront ? 0 : undefined}
                onClick={isFront ? nextSlide : undefined}
                onKeyDown={
                  isFront
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          nextSlide();
                        }
                      }
                    : undefined
                }
                className={`h-full w-full rounded-lg border border-[#30363d] bg-[#161b22] overflow-hidden ${
                  isFront
                    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
                    : "pointer-events-none"
                }`}
                aria-label={
                  isFront
                    ? `${card.imageAlt ?? card.label}. Click to send this card to the back of the deck.`
                    : undefined
                }
              >
                <CardFace card={card} showHint={showHint} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          disabled={isAnimating}
          className="w-8 h-8 rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#58a6ff] hover:text-[#58a6ff] transition-colors flex items-center justify-center disabled:opacity-50"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all disabled:opacity-50 ${
                index === currentSlide
                  ? "w-6 bg-[#58a6ff]"
                  : "w-2 bg-[#30363d] hover:bg-[#484f58]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          disabled={isAnimating}
          className="w-8 h-8 rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#58a6ff] hover:text-[#58a6ff] transition-colors flex items-center justify-center disabled:opacity-50"
          aria-label="Next card"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
