import { NextResponse } from 'next/server';
import ecosystem from '../../../../public/ecosystem.json';

export async function GET() {
  return NextResponse.json(ecosystem, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
