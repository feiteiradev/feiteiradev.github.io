"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { APPS, appPath } from "../../../lib/routes"
import { Block } from "./components/common/Block"

export type Status = "live" | "pending" | "done"

/**
 * State is a mark, not a hue: filled accent is running in production, an
 * outlined accent is on its way, ink is finished work.
 */
export function StatusMark({ status, label }: { status: Status; label: string }) {
  const mark = {
    live: "bg-primary",
    pending: "border border-primary",
    done: "bg-foreground/70",
  }[status]

  return (
    <span className="mt-1 flex items-center gap-2 text-[13px] text-muted-foreground">
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 ${mark}`} />
      {label}
    </span>
  )
}

/**
 * The apps as ruled index rows, not cards: each carries its own icon as the
 * brand mark, its provenance and one dated status mark, like the home index.
 */
export function AppPanels() {
  const t = useTranslations("apps")
  const tHome = useTranslations("home.index")
  const locale = useLocale()

  return (
    <ul className="border-b border-rule/15">
      {APPS.map((app) => (
        <li key={app}>
          <Link
            href={appPath(app, locale)}
            className="group relative grid grid-cols-[4rem_1fr_auto] items-start gap-x-5 border-t border-rule/15 py-6 transition-colors duration-500 hover:bg-primary/[0.04] hairline-draw sm:grid-cols-[5rem_1fr_auto] lg:py-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized webp */}
            <img
              src={`/apps/${app}-icon.webp`}
              alt=""
              width={512}
              height={512}
              className="h-16 w-16 rounded-[22%] sm:h-20 sm:w-20"
            />
            <span className="grid gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <span className="flex flex-col gap-1">
                <span className="text-3xl font-semibold tracking-tight lg:text-4xl">{t(`${app}.name`)}</span>
                <span className="text-lg">{t(`${app}.tagline`)}</span>
              </span>
              <span className="flex flex-col gap-1 md:pt-2">
                <span className="text-sm text-muted-foreground">{tHome(`${app}.meta`)}</span>
                <StatusMark status="pending" label={tHome(`${app}.status`)} />
              </span>
            </span>
            <ArrowUpRight
              className="mt-2 h-6 w-6 text-muted-foreground transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** The apps as a block: the /apps index and the top of /work. */
export default function Apps() {
  const t = useTranslations("apps")

  return (
    <Block id="apps" title={t("title")} intro={t("description")}>
      <AppPanels />
    </Block>
  )
}
