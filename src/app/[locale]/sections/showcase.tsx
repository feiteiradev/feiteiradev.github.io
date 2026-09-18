"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { SHOWCASES } from "../../../lib/data/showcases"
import { routePath } from "../../../lib/routes"
import { Block } from "./components/common/Block"

/** Concepts come last and say so: fictional brands, shown as what they are. */
export default function Showcase() {
  const t = useTranslations("showcase")
  const locale = useLocale()

  return (
    <Block id="showcase" title={t("title")} intro={`${t("description")} ${t("disclosure")}`}>
      <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {SHOWCASES.map(({ slug }) => (
          <li key={slug}>
            <Link href={`${routePath("work", locale)}${slug}/`} className="group block">
              <span className="block overflow-hidden border border-rule/15">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized webp */}
                <img
                  src={`/work/${slug}.webp`}
                  alt=""
                  width={960}
                  height={600}
                  loading="lazy"
                  className="aspect-[8/5] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]"
                />
              </span>
              <span className="mt-4 flex items-start justify-between gap-4">
                <span className="flex flex-col">
                  <span className="text-lg font-semibold tracking-tight">{t(`${slug}.title`)}</span>
                  <span className="text-sm text-muted-foreground">{t(`${slug}.description`)}</span>
                </span>
                <ArrowUpRight
                  className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:text-primary"
                  strokeWidth={1.5}
                  aria-label={t("viewProject")}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Block>
  )
}
