import type { MetadataRoute } from "next"
import { locales } from "@i18n/config"
import { SHOWCASES } from "../lib/data/showcases"
import { SITE_URL } from "../lib/constants"
import { APPS, APP_DOCS, ROUTE_KEYS, appPath, appsPath, routePath, routeSlug } from "../lib/routes"

// output: "export" needs this stated explicitly for metadata routes.
export const dynamic = "force-static"

// The sitemap used to be a hand-written public/sitemap.xml listing three of
// the twenty-six routes, on a domain that no longer resolves. Generated from
// the same slug map the pages are built from, it cannot go stale again: add a
// route to ROUTE_SLUGS and it appears here and in the build together.
//
// No lastmod: build time is not modification time, and stamping every URL with
// "now" on each deploy teaches crawlers to ignore the field entirely.

/** Each locale's URL for one page, keyed by locale, for the hreflang block. */
function alternates(pathFor: (locale: string) => string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${SITE_URL}${pathFor(locale)}`]),
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/`,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: alternates((l) => `/${l}/`),
  }))

  const pages: MetadataRoute.Sitemap = ROUTE_KEYS.flatMap((key) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${routePath(key, locale)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternates((l) => routePath(key, l)),
    })),
  )

  const demos: MetadataRoute.Sitemap = SHOWCASES.flatMap((showcase) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${routePath("work", locale)}${showcase.slug}/`,
      changeFrequency: "monthly" as const,
      // Concept demos sit below the pages that sell the actual service.
      priority: 0.5,
      alternates: alternates(
        (l) => `/${l}/${routeSlug("work", l)}/${showcase.slug}/`,
      ),
    })),
  )

  const appsIndex: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}${appsPath(locale)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: alternates(appsPath),
  }))

  const apps: MetadataRoute.Sitemap = APPS.flatMap((app) =>
    [undefined, ...APP_DOCS].flatMap((doc) =>
      locales.map((locale) => ({
        url: `${SITE_URL}${appPath(app, locale, doc)}`,
        changeFrequency: "monthly" as const,
        priority: doc ? 0.3 : 0.7,
        alternates: alternates((l) => appPath(app, l, doc)),
      })),
    ),
  )

  return [...home, ...pages, ...demos, ...appsIndex, ...apps]
}
