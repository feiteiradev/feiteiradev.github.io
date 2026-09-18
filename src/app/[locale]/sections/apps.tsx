"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { APPS, appPath } from "../../../lib/routes"

/** One card per app, linking to its landing page. */
export function AppCards() {
  const t = useTranslations("apps")
  const locale = useLocale()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {APPS.map((app) => (
        <Link
          key={app}
          href={appPath(app, locale)}
          className="group flex flex-col gap-3 rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-2xl font-semibold tracking-tight">{t(`${app}.name`)}</span>
          <span className="text-base text-muted-foreground">{t(`${app}.tagline`)}</span>
          <span className="mt-auto flex items-center justify-between pt-4 font-mono text-xs text-muted-foreground">
            {t("comingSoon")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  )
}

/** The apps with their heading: the /apps index and the top of /work. */
export default function Apps() {
  const t = useTranslations("apps")

  return (
    <section id="apps" className="section-spacing scroll-mt-24 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="section-eyebrow">{t("title")}</span>
          <p className="text-muted-foreground max-w-xl text-base mt-6">{t("description")}</p>
        </div>
        <AppCards />
      </div>
    </section>
  )
}
