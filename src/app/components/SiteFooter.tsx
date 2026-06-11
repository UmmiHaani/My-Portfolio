export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="re4-save-ui border-t border-[var(--pf-border)] bg-[var(--pf-bg-elevated)] transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-8 py-10">
        <div className="flex items-start gap-4">
          <img
            src="/logo.png"
            alt=""
            className="re4-logo mt-0.5 h-11 w-auto bg-transparent opacity-80"
            aria-hidden
          />
          <div>
            <p className="re4-save-heading text-sm tracking-[0.22em] text-[var(--pf-text)]">
              Haani Shahrul
            </p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[var(--pf-text-subtle)] uppercase">
              Computer Science · Portfolio
            </p>
            <p className="re4-save-prompt mt-3 text-xs">
              — Transmission complete —
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--pf-border-subtle)] pt-6">
          <p className="text-xs tracking-[0.06em] text-[var(--pf-text-muted)]">
            © {year} Haani Shahrul. Built with care — not affiliated with
            Capcom.
          </p>
        </div>
      </div>
    </footer>
  );
}
