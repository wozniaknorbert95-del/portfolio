const steps = [
  {
    num: "01",
    title: "Free scan",
    desc: "We audit your current setup — inbox, website, or marketing — and show you exactly what you are losing.",
  },
  {
    num: "02",
    title: "Strategy call",
    desc: "20-minute call. No pitch. We diagnose your problem and match it to the right product.",
  },
  {
    num: "03",
    title: "Build & test",
    desc: "We build using production-hardened AI systems. You see progress in real time.",
  },
  {
    num: "04",
    title: "You approve",
    desc: "Nothing goes live without your explicit approval. Zasada 11: AI executes, human decides.",
  },
  {
    num: "05",
    title: "Launch + training",
    desc: "System goes live. We train you in 15 minutes. Monthly optimization begins.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="px-6 py-20 sm:py-28"
      style={{ background: "var(--color-bg-surface)" }}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          How it works
        </h2>
        <div className="mt-12 space-y-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-6 rounded-xl border p-6"
              style={{
                background: "var(--color-bg-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <span
                className="shrink-0 font-mono text-2xl font-bold"
                style={{ color: "var(--color-accent)" }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
