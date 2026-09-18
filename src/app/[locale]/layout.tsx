import type { Metadata, Viewport } from "next";
import { Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "./sections/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./sections/lib/queryClient";
import StructuredData from "./sections/components/StructuredData";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./sections/components/ErrorBoundary";
import Analytics from "./sections/components/Analytics";
import Background from "./sections/components/common/Background";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@i18n/config";
import { notFound } from "next/navigation";
import { IDENTITY, SITE_URL } from "../../lib/constants";

// Import messages directly for static export
import enMessages from "../../messages/en.json";
import ptMessages from "../../messages/pt.json";

const messagesMap: Record<Locale, typeof enMessages> = {
  en: enMessages,
  pt: ptMessages,
};

// One grotesk carries the whole site, figures included (tabular where they
// line up). Geist Mono stays only for the concept demos' own brands.
const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  // Generate all locales including English
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const translations: Record<
    Locale,
    { title: string; description: string; ogLocale: string }
  > = {
    en: {
      title: "Pedro Feiteira · Custom software for small businesses",
      description:
        "Software engineer in Portugal. I build custom software for small and medium businesses: automated workflows, websites and applications, from the first conversation to a product that is live.",
      ogLocale: "en_US",
    },
    pt: {
      title: "Pedro Feiteira · Software à medida para PMEs",
      description:
        "Engenheiro de software em Portugal. Construo software à medida para pequenas e médias empresas: workflows automatizados, sites e aplicações, do início ao produto no ar.",
      ogLocale: "pt_PT",
    },
  };

  const t = translations[locale as Locale] || translations.en;
  const canonicalPath = `/${locale}/`;

  return {
    title: t.title,
    description: t.description,
    authors: [{ name: IDENTITY.name }],
    creator: IDENTITY.name,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/en/",
        pt: "/pt/",
        // Portuguese is the primary version: this site sells to Portuguese
        // businesses, unlike the LinkedIn profile, which is corporate and EN.
        "x-default": "/pt/",
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "Pedro Feiteira Portfolio",
      // No width/height: profile.jpeg is square (2998x2998), and declaring a
      // 1.91:1 box around it makes scrapers hard-crop the face.
      images: [{ url: "/profile.jpeg", alt: "Pedro Feiteira" }],
      locale: t.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/profile.jpeg"],
      creator: `@${IDENTITY.xUser}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    manifest: "/manifest.json",
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const messages = messagesMap[locale as Locale] || messagesMap.en;

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth scroll-pt-24">
      <body
        className={`${grotesk.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData locale={locale} />
        <Analytics />
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Background />
                {children}
                <Toaster position="top-center" richColors closeButton />
              </ThemeProvider>
            </NextIntlClientProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
