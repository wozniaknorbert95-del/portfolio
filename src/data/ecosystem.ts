import ecosystemJson from '../../public/ecosystem.json';

export interface Project {
  id: string;
  name: string;
  slug: string;
  role: string;
  description: string;
  status: 'production' | 'staging' | 'development';
  stack: string[];
  stack_layer: string;
  port: number | null;
  health_url: string | null;
  repo: string;
  key_files: string[];
  guardrails: string[];
  highlights: string[];
  last_handoff: string;
}

export interface EngineeringPattern {
  id: string;
  name: string;
  description: string;
}

export interface Ecosystem {
  version: string;
  generated: string;
  owner: {
    name: string;
    alias: string;
    role: string;
    specialization: string[];
    experience: string;
    location: string;
    github: string;
    portfolio: string;
  };
  ecosystem: {
    description: string;
    meta_repo: string;
    orchestrator: string;
    program_office: string;
  };
  projects: Project[];
  engineering_patterns: EngineeringPattern[];
}

export const ecosystem = ecosystemJson as Ecosystem;
export const projects = ecosystem.projects;
export const patterns = ecosystem.engineering_patterns;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getStatusColor(status: Project['status']): string {
  switch (status) {
    case 'production':
      return 'var(--color-green)';
    case 'staging':
      return 'var(--color-amber)';
    case 'development':
      return 'var(--color-text-muted)';
  }
}

export function getStatusLabel(status: Project['status']): string {
  switch (status) {
    case 'production':
      return 'PROD';
    case 'staging':
      return 'STAGING';
    case 'development':
      return 'DEV';
  }
}
