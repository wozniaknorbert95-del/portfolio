import Hero from '@/components/home/Hero';
import AgentFlow from '@/components/home/AgentFlow';
import MetricsStrip from '@/components/home/MetricsStrip';
import ThreePillars from '@/components/home/ThreePillars';
import LogTeaser from '@/components/home/LogTeaser';
import { getAllLogEntries } from '@/lib/log';

export default function HomePage() {
  const recentEntries = getAllLogEntries().slice(0, 3);

  return (
    <>
      <Hero />
      <AgentFlow />
      <MetricsStrip />
      <ThreePillars />
      <LogTeaser entries={recentEntries} />
    </>
  );
}
