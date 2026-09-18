import { locales, type Locale } from "@i18n/config"

/**
 * The URL slug for each page, per locale.
 *
 * Portuguese visitors get Portuguese URLs (/pt/servicos/, /pt/sobre/), which
 * is the point of a site that sells to Portuguese businesses. English keeps
 * English ones.
 *
 * next-intl's localised pathnames are middleware-based and middleware does not
 * run under `output: "export"`, so the mapping lives here and the single
 * catch-all route at [locale]/[page]/ builds one static page per pair. Nothing
 * should hardcode a slug: use routePath() so a rename lands everywhere at once.
 */
export const ROUTE_SLUGS = {
  about: { en: "about", pt: "sobre" },
  services: { en: "services", pt: "servicos" },
  skills: { en: "skills", pt: "competencias" },
  showcase: { en: "showcase", pt: "trabalhos" },
  cases: { en: "case-studies", pt: "casos" },
  resume: { en: "resume", pt: "curriculo" },
  contact: { en: "contact", pt: "contacto" },
  privacy: { en: "privacy", pt: "privacidade" },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof ROUTE_SLUGS

export const ROUTE_KEYS = Object.keys(ROUTE_SLUGS) as RouteKey[]

/** The slug this page uses in one locale. */
export function routeSlug(key: RouteKey, locale: string): string {
  const slugs = ROUTE_SLUGS[key]
  return slugs[locale as Locale] ?? slugs.en
}

/** Absolute in-app path, always with the trailing slash the export uses. */
export function routePath(key: RouteKey, locale: string): string {
  return `/${locale}/${routeSlug(key, locale)}/`
}

/** Reverse lookup for the catch-all: which page is this slug, in this locale? */
export function routeKeyFromSlug(slug: string, locale: string): RouteKey | null {
  return ROUTE_KEYS.find((key) => routeSlug(key, locale) === slug) ?? null
}

/** Every (locale, slug) pair, for generateStaticParams and the sitemap. */
export function allRoutePairs(): { locale: Locale; key: RouteKey; slug: string }[] {
  return locales.flatMap((locale) =>
    ROUTE_KEYS.map((key) => ({ locale, key, slug: routeSlug(key, locale) })),
  )
}

/**
 * The iOS apps, each with a landing page and two documents under /apps/<app>/.
 *
 * These URLs are what App Store Connect holds as the Marketing, Support and
 * Privacy Policy URLs, and App Review opens them from a cold browser. Renaming
 * a slug here means editing every app's metadata in App Store Connect too.
 */
export const APPS = ["crudo", "feit-y"] as const

export type AppSlug = (typeof APPS)[number]

export const APP_DOC_SLUGS = {
  support: { en: "support", pt: "suporte" },
  privacy: { en: "privacy", pt: "privacidade" },
} as const satisfies Record<string, Record<Locale, string>>

export type AppDoc = keyof typeof APP_DOC_SLUGS

export const APP_DOCS = Object.keys(APP_DOC_SLUGS) as AppDoc[]

/** An app's landing page, or one of its documents when `doc` is given. */
export function appPath(app: AppSlug, locale: string, doc?: AppDoc): string {
  if (!doc) return `/${locale}/apps/${app}/`
  const slug = APP_DOC_SLUGS[doc][locale as Locale] ?? APP_DOC_SLUGS[doc].en
  return `/${locale}/apps/${app}/${slug}/`
}

/** Reverse lookup for the document route. */
export function appDocFromSlug(slug: string, locale: string): AppDoc | null {
  return APP_DOCS.find((doc) => APP_DOC_SLUGS[doc][locale as Locale] === slug) ?? null
}
