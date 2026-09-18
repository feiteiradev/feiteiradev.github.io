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
  support: { en: "support", pt: "suporte" },
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
