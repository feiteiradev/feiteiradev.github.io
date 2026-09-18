import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { locales } from "@i18n/config"
import { SHOWCASES } from "../../../../lib/data/showcases"
import { routeSlug } from "../../../../lib/routes"
import { routeMetadata } from "../../pageMeta"
import BackButton from "./BackButton"

import MeridianGoods from "../../sections/showcases/meridian-goods"
import LinhaVivaListings from "../../sections/showcases/linha-viva-listings"
import SerenoSpa from "../../sections/showcases/sereno-spa"

type Props = { params: Promise<{ locale: string; page: string; slug: string }> }

const DEMOS: Record<string, React.ComponentType> = {
  "meridian-goods": MeridianGoods,
  "linha-viva-listings": LinhaVivaListings,
  "sereno-spa": SerenoSpa,
}

// Nested under the localised work slug, so the demos live at
// /pt/trabalho/<slug>/ and /en/work/<slug>/. Derived from SHOWCASES so
// the sitemap and the built pages cannot drift apart.
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SHOWCASES.map((showcase) => ({
      locale,
      page: routeSlug("work", locale),
      slug: showcase.slug,
    })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: "showcase" })

  return routeMetadata({
    locale,
    pathFor: (l) => `/${l}/${routeSlug("work", l)}/${slug}/`,
    title: `${t(`${slug}.title`)} · ${t("title")}`,
    description: `${t(`${slug}.description`)}. ${t("disclosure")}`,
  })
}

export default async function ShowcaseDemoPage({ params }: Props) {
  const { slug } = await params
  const Demo = DEMOS[slug]
  if (!Demo) notFound()

  return (
    <div className="relative min-h-screen text-foreground">
      <BackButton />
      <main>
        <Demo />
      </main>
    </div>
  )
}
