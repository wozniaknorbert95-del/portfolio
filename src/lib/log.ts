import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LogEntry {
  slug: string;
  title: string;
  date: string;
  project: string;
  type: 'HANDOFF' | 'FEAT' | 'FIX' | 'DEPLOY' | 'ARCH';
  summary: string;
  content: string;
}

export function getAllLogEntries(): LogEntry[] {
  const logDir = path.join(process.cwd(), 'src/content/log');

  if (!fs.existsSync(logDir)) return [];

  const files = fs.readdirSync(logDir)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
    .reverse();

  return files.map((filename) => {
    const filePath = path.join(logDir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace('.mdx', '');

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      project: data.project as string,
      type: data.type as LogEntry['type'],
      summary: data.summary as string,
      content,
    };
  });
}

export function getLogEntryBySlug(slug: string): LogEntry | undefined {
  return getAllLogEntries().find((e) => e.slug === slug);
}

export function getLogEntriesByProject(projectId: string): LogEntry[] {
  return getAllLogEntries().filter((e) => e.project === projectId);
}
