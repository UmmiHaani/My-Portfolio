import { StackedCardCarousel, StackedCard } from "./StackedCardCarousel";

const LEON_CARDS: StackedCard[] = [
  {
    id: 1,
    label: "Leon S. Kennedy",
    image: "/leon/leon-1.png",
    imageAlt: "Leon S. Kennedy with flashlight in the dark",
  },
  {
    id: 2,
    label: "Agent Profile",
    image: "/leon/leon-2.png",
    imageAlt: "Leon Kennedy tactical portrait at dusk",
  },
  {
    id: 3,
    label: "Village Patrol",
    image: "/leon/leon-3.png",
    imageAlt: "Leon Kennedy overlooking the village",
  },
];

export function LeonKennedyBanner() {
  return (
    <div id="leon-extras" className="mt-16 pt-12 border-t border-[#30363d] scroll-mt-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-0.5 bg-[#c9a227]" />
        <p className="text-sm text-[#c9a227] font-medium tracking-[0.15em] uppercase">
          Field Agent
        </p>
      </div>

      <div className="w-full">
        <StackedCardCarousel
          cards={LEON_CARDS}
          aspectVideo
          className="max-h-[min(56vw,576px)]"
        />
      </div>
    </div>
  );
}
