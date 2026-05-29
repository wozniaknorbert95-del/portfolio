import { NextResponse } from 'next/server';
import { projects } from '@/data/ecosystem';

interface SystemStatus {
  id: string;
  name: string;
  status: 'operational' | 'unknown' | 'degraded';
  last_checked: string;
  health_url: string | null;
}

export async function GET() {
  const now = new Date().toISOString();

  const statuses: SystemStatus[] = projects.map((project) => ({
    id: project.id,
    name: project.name,
    status: project.status === 'production' ? 'operational' : 'unknown',
    last_checked: now,
    health_url: project.health_url,
  }));

  const operational = statuses.filter((s) => s.status === 'operational').length;

  return NextResponse.json(
    {
      systems: statuses,
      summary: {
        total: statuses.length,
        operational,
        degraded: 0,
        unknown: statuses.length - operational,
      },
      generated: now,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
