import Hero from '@/components/home/Hero';
import AgentFlow from '@/components/home/AgentFlow';
import MetricsStrip from '@/components/home/MetricsStrip';
import ThreePillars from '@/components/home/ThreePillars';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AgentFlow />
      <MetricsStrip />
      <ThreePillars />
    </>
  );
}
