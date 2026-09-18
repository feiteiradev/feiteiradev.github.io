import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { locales, type Locale } from "@i18n/config"
import { APPS, appPath, type AppSlug } from "../../../../lib/routes"
import { routeMetadata } from "../../pageMeta"
import { PageShell } from "../../[page]/PageBody"
import { AppLanding } from "../../sections/legal"

type Props = { params: Promise<{ locale: string; app: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => APPS.map((app) => ({ locale, app })))
}

function isApp(app: string): app is AppSlug {
  return (APPS as readonly string[]).includes(app)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, app } = await params
  if (!isApp(app)) return {}
  const t = await getTranslations({ locale, namespace: `apps.${app}.meta` })

  return routeMetadata({
    locale,
    pathFor: (l) => appPath(app, l),
    title: t("title"),
    description: t("description"),
  })
}

export default async function AppPage({ params }: Props) {
  const { locale, app } = await params
  if (!isApp(app)) notFound()
  setRequestLocale(locale as Locale)

  return (
    <PageShell>
      <AppLanding app={app} />
    </PageShell>
  )
}
