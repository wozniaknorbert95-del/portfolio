export default function CTASection() {
  return (
    <section
      id="cta"
      className="px-6 py-20 sm:py-28"
      style={{ background: "var(--color-bg-surface)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Ready to stop losing leads?
        </h2>
        <p
          className="mt-4 text-lg"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Book a free 20-minute strategy call. No pitch. Pure diagnosis.
        </p>
        <div className="mt-8">
          <a
            href="https://calendly.com/flexgrafik/20min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg px-8 py-4 text-base font-semibold transition-colors"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            Book Free Strategy Call
          </a>
        </div>
        <p
          className="mt-6 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Or email us at{" "}
          <a
            href="mailto:hello@flexgrafik.nl"
            style={{ color: "var(--color-accent)" }}
          >
            hello@flexgrafik.nl
          </a>
        </p>
      </div>
      <footer
        className="mx-auto mt-20 max-w-6xl border-t pt-8"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            © 2026 FlexGrafik Digital
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://portfolio.flexgrafik.nl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Built by AI Systems Architect
            </a>
            <a
              href="https://flexgrafik.nl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text-secondary)" }}
            >
              FlexGrafik Branding
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
