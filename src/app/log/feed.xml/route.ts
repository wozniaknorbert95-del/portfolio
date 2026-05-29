import { getAllLogEntries } from '@/lib/log';

export async function GET() {
  const entries = getAllLogEntries().slice(0, 20);
  const baseUrl = 'https://portfolio.flexgrafik.nl';

  const items = entries
    .map(
      (entry) => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${baseUrl}/log/${entry.slug}</link>
      <guid isPermaLink="true">${baseUrl}/log/${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <category>${entry.type}</category>
      <description><![CDATA[${entry.summary}]]></description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FlexGrafik — Operating Journal</title>
    <link>${baseUrl}/log</link>
    <description>AI Systems Architect operating journal — generated from git history and handoff docs.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/log/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
