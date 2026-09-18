import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { locales, type Locale } from "@i18n/config"
import { appsPath } from "../../../lib/routes"
import { routeMetadata } from "../pageMeta"
import { PageShell } from "../[page]/PageBody"
import Apps from "../sections/apps"

type Props = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "pageMeta.apps" })

  return routeMetadata({ locale, pathFor: appsPath, title: t("title"), description: t("description") })
}

export default async function AppsIndex({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return (
    <PageShell>
      <Apps />
    </PageShell>
  )
}
