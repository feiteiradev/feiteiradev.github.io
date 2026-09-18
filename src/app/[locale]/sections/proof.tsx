"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { routePath } from "../../../lib/routes"
import { AppCards } from "./apps"

type CaseEntry = { client: string; period: string }

/** Under the doors: the evidence, before anyone has to choose. */
export default function Proof() {
  const t = useTranslations("home")
  const tCases = useTranslations("cases")
  const locale = useLocale()
  const work = routePath("work", locale)
  const clients = tCases.raw("items") as CaseEntry[]

  return (
    <section className="section-spacing w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <span className="section-eyebrow">{t("proof")}</span>
        <AppCards />
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">{t("clients")}</h2>
          <ul className="flex flex-col divide-y divide-border/30 border-y border-border/30">
            {clients.map((c) => (
              <li key={c.client}>
                <Link
                  href={`${work}#cases`}
                  className="flex items-baseline justify-between gap-4 py-4 hover:text-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-lg font-semibold tracking-tight">{c.client}</span>
                  <span className="font-mono text-xs text-muted-foreground">{c.period}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={work}
          className="group inline-flex items-center gap-2 self-start text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t("seeWork")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
