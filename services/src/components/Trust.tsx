export default function Trust() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Why trust us
        </h2>
        <p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          We come from physical branding in Rotterdam. We realized small
          businesses do not need just a logo — they need engines that sell them.
          We use the same corporate-grade AI systems we built for our own
          operations. You get enterprise technology at small-business speed and
          price.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { label: "Production systems", value: "8 repos" },
            { label: "Years in operation", value: "2+" },
            { label: "Zero autonomous deploys", value: "Zasada 11" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-bg-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--color-accent)" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
