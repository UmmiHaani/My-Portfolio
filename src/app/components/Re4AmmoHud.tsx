export function Re4AmmoHud() {
  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
      aria-hidden
    >
      <img
        src="/re4-ammo-hud.png"
        alt=""
        className="h-auto w-[min(220px,42vw)] max-w-[280px] select-none object-contain drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
}
