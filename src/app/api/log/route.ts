import { NextResponse } from 'next/server';
import { getAllLogEntries } from '@/lib/log';

export async function GET() {
  const entries = getAllLogEntries().slice(0, 20).map(({ content: _, ...rest }) => rest);
  return NextResponse.json(
    { entries, total: entries.length, generated: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
