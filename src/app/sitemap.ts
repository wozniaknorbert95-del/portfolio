import { MetadataRoute } from 'next';
import { projects } from '@/data/ecosystem';
import { pillars } from '@/data/methodology';
import { getAllLogEntries } from '@/lib/log';

const baseUrl = 'https://portfolio.flexgrafik.nl';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/labs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/dna`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/log`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  const labsRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/labs/${p.slug}`,
    lastModified: new Date(p.last_handoff),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const dnaRoutes: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${baseUrl}/dna/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const logRoutes: MetadataRoute.Sitemap = getAllLogEntries().map((e) => ({
    url: `${baseUrl}/log/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'never' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...labsRoutes, ...dnaRoutes, ...logRoutes];
}
