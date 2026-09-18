import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { locales, type Locale } from "@i18n/config"
import { APPS, APP_DOCS, APP_DOC_SLUGS, appDocFromSlug, appPath, type AppSlug } from "../../../../../lib/routes"
import { routeMetadata } from "../../../pageMeta"
import { PageShell } from "../../../[page]/PageBody"
import { AppDocPage } from "../../../sections/legal"

type Props = { params: Promise<{ locale: string; app: string; doc: string }> }

// Localised like every other page: /pt/apps/crudo/suporte/ and
// /en/apps/crudo/support/ are the same document.
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    APPS.flatMap((app) => APP_DOCS.map((doc) => ({ locale, app, doc: APP_DOC_SLUGS[doc][locale] }))),
  )
}

function resolve(app: string, slug: string, locale: string) {
  const doc = appDocFromSlug(slug, locale)
  return (APPS as readonly string[]).includes(app) && doc ? { app: app as AppSlug, doc } : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, app, doc: slug } = await params
  const page = resolve(app, slug, locale)
  if (!page) return {}
  const t = await getTranslations({ locale, namespace: `apps.${page.app}.${page.doc}.meta` })

  return routeMetadata({
    locale,
    pathFor: (l) => appPath(page.app, l, page.doc),
    title: t("title"),
    description: t("description"),
  })
}

export default async function AppDocRoute({ params }: Props) {
  const { locale, app, doc: slug } = await params
  const page = resolve(app, slug, locale)
  if (!page) notFound()
  setRequestLocale(locale as Locale)

  return (
    <PageShell>
      <AppDocPage app={page.app} doc={page.doc} />
    </PageShell>
  )
}
