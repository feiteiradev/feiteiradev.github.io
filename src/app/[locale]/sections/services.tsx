"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { routePath } from "../../../lib/routes"
import { Block } from "./components/common/Block"

export default function Services() {
  const t = useTranslations("services")
  const locale = useLocale()
  const router = useRouter()
  const contact = routePath("contact", locale)
  const items = t.raw("items") as { title: string; description: string }[]

  return (
    <Block id="services" title={t("title")}>
      <p className="mb-14 max-w-[26ch] text-3xl font-semibold leading-[1.1] tracking-tight lg:text-5xl">{t("subtitle")}</p>

      <ul className="border-b border-rule/15">
        {items.map((item) => (
          <li key={item.title}>
            <button
              onClick={() => router.push(contact)}
              className="group relative grid w-full grid-cols-[1fr_auto] items-start gap-6 border-t border-rule/15 py-7 text-left hairline-draw"
              aria-label={`${item.title} — ${t("cta")}`}
            >
              <span className="grid gap-x-10 gap-y-2 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <span className="text-xl font-semibold tracking-tight lg:text-2xl">{item.title}</span>
                <span className="max-w-[52ch] text-muted-foreground">{item.description}</span>
              </span>
              <ArrowUpRight
                className="mt-1 h-5 w-5 text-muted-foreground transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>

      <Link
        href={contact}
        className="mt-12 inline-flex items-center gap-3 bg-primary px-6 py-4 text-lg font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t("cta")}
        <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </Block>
  )
}
