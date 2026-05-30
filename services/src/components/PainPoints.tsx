const pains = [
  {
    title: "You are losing leads in your inbox",
    desc: "80% of email is noise. The 20% that matters — hot leads, urgent clients — gets buried. You hire a VA or miss opportunities.",
  },
  {
    title: "Your website scares clients away",
    desc: "A 2015 website loads in 8 seconds, breaks on mobile, and has no lead capture. Visitors leave before they contact you.",
  },
  {
    title: "Your competition looks better online",
    desc: "They have fast sites, automated replies, and professional presence. You are invisible where your customers are looking.",
  },
];

export default function PainPoints() {
  return (
    <section
      className="px-6 py-20 sm:py-28"
      style={{ background: "var(--color-bg-surface)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          The problems we solve
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-bg-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {pain.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {pain.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
