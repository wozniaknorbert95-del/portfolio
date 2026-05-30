import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/shared/Footer';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Norbert Wozniak',
  alternateName: 'FlexGrafik',
  url: 'https://portfolio.flexgrafik.nl',
  jobTitle: 'AI Systems Architect',
  description:
    'AI Systems Architect specializing in multi-agent orchestration, context engineering, spec-driven development, and bounded autonomy systems.',
  knowsAbout: [
    'Multi-agent orchestration',
    'Context engineering',
    'LangGraph',
    'FastAPI',
    'Next.js',
    'Spec-driven development',
    'Bounded autonomy',
    'AI systems architecture',
  ],
  sameAs: ['https://github.com/FlexGrafik'],
  workExample: [
    {
      '@type': 'SoftwareApplication',
      name: 'Agent OS',
      description: 'Multi-agent LangGraph orchestration system with HITL gates',
      applicationCategory: 'DeveloperApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Flex-VCMS',
      description: 'Ecosystem orchestrator and LLM Gateway',
      applicationCategory: 'DeveloperApplication',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.flexgrafik.nl'),
  title: {
    default: 'FlexGrafik — AI Systems Architect',
    template: '%s | FlexGrafik',
  },
  description:
    'Norbert Wozniak — AI Systems Architect. Multi-agent orchestration, context engineering, spec-driven development, bounded autonomy systems. 2 years of production AI systems.',
  keywords: [
    'AI Systems Architect',
    'multi-agent orchestration',
    'context engineering',
    'LangGraph',
    'agentic engineering',
    'bounded autonomy',
    'spec-driven development',
  ],
  authors: [{ name: 'Norbert Wozniak', url: 'https://portfolio.flexgrafik.nl' }],
  creator: 'Norbert Wozniak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio.flexgrafik.nl',
    siteName: 'FlexGrafik — AI Systems Architect',
    title: 'FlexGrafik — AI Systems Architect',
    description:
      'Multi-agent orchestration · Context engineering · Spec-driven development · Bounded autonomy systems',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlexGrafik — AI Systems Architect',
    description: 'Multi-agent orchestration · Context engineering · Spec-driven development',
    creator: '@flexgrafik',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#090c11',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ fontFamily: 'var(--font-sans)' }}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main
          className="flex-1"
          style={{ minHeight: 'calc(100vh - var(--nav-height))', marginTop: 'var(--nav-height)' }}
        >
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'FlexGrafik — AI Systems Architect',
              url: 'https://portfolio.flexgrafik.nl',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://portfolio.flexgrafik.nl/log?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
