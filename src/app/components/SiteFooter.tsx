export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="re4-save-ui border-t border-[#30363d] bg-[#0a0e14]">
      <div className="mx-auto max-w-5xl px-8 py-10">
        <div className="flex items-start gap-4">
          <img
            src="/favicon.png"
            alt=""
            className="mt-0.5 h-9 w-auto opacity-80"
            aria-hidden
          />
          <div>
            <p className="re4-save-heading text-sm tracking-[0.22em] text-white">
              Haani Shahrul
            </p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[#6e7681] uppercase">
              Computer Science · Portfolio
            </p>
            <p className="re4-save-prompt mt-3 text-xs text-[#8b949e]">
              — Transmission complete —
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#21262d] pt-6">
          <p className="text-xs tracking-[0.06em] text-[#484f58]">
            © {year} Haani Shahrul. Built with care — not affiliated with
            Capcom.
          </p>
        </div>
      </div>
    </footer>
  );
}
