import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlexGrafik Digital — AI-Powered Systems for Small Business",
  description:
    "We build digital systems that work while you sleep. Website modernization, AI inbox qualification, and marketing automation for ZZP and small businesses.",
  openGraph: {
    title: "FlexGrafik Digital — AI-Powered Systems for Small Business",
    description:
      "Website modernization, AI inbox qualification, and marketing automation. 48-hour deployment.",
    type: "website",
    url: "https://services.flexgrafik.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FlexGrafik Digital",
    url: "https://services.flexgrafik.nl",
    description:
      "AI-powered digital transformation for small businesses and ZZP professionals.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://services.flexgrafik.nl/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
