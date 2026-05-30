export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="max-w-4xl">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-6xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Your business works while you sleep.
        </h1>
        <p
          className="mt-6 text-lg leading-8 sm:text-xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          AI-powered website modernization, inbox qualification, and marketing
          automation for ZZP and small businesses. Deployed in 48 hours.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#products"
            className="rounded-lg px-8 py-4 text-base font-semibold transition-colors"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            View Products
          </a>
          <a
            href="#cta"
            className="rounded-lg border px-8 py-4 text-base font-medium transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            Book Free Strategy Call
          </a>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "var(--color-border)" }}
      />
    </section>
  );
}
