export default function Products() {
  return (
    <section id="products" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          What we build
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Product A: Modernization */}
          <div
            className="rounded-xl border p-8"
            style={{
              background: "var(--color-bg-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div
              className="inline-flex rounded-lg px-3 py-1 text-xs font-mono font-medium"
              style={{
                background: "var(--color-accent-dim)",
                color: "var(--color-accent)",
              }}
            >
              Website Modernization
            </div>
            <h3
              className="mt-4 text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              From 2015 to 2026 in 2–3 weeks
            </h3>
            <p
              className="mt-3 text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Custom Next.js site, mobile-first, SEO-optimized, with lead
              capture and AI content generation. You approve everything before
              it goes live.
            </p>
            <div
              className="mt-6 flex items-baseline gap-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              <span className="text-3xl font-bold">€1,500</span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                – €4,000 project
              </span>
            </div>
          </div>

          {/* Product B: Inbox Killer */}
          <div
            className="rounded-xl border p-8"
            style={{
              background: "var(--color-bg-surface)",
              borderColor: "var(--color-accent)",
            }}
          >
            <div
              className="inline-flex rounded-lg px-3 py-1 text-xs font-mono font-medium"
              style={{
                background: "var(--color-accent-dim)",
                color: "var(--color-accent)",
              }}
            >
              AI Lead Qualification
            </div>
            <h3
              className="mt-4 text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Inbox Killer — live in 48 hours
            </h3>
            <p
              className="mt-3 text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              AI reads your inbox, classifies every email, surfaces hot leads
              with summary + reply draft, and archives noise. A digital
              assistant at a fraction of a VA&apos;s cost.
            </p>
            <div
              className="mt-6 flex items-baseline gap-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              <span className="text-3xl font-bold">€497</span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                setup +{" "}
              </span>
              <span className="text-3xl font-bold">€147</span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                /mo
              </span>
            </div>
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--color-amber)" }}
            >
              First 5 clients: month 1 free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
