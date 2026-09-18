"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { appPath, routePath } from "../../../lib/routes"
import { StatusMark, type Status } from "./apps"

/**
 * The first viewport is the poster: the name at poster scale, the work as a
 * numbered index beside it, and the two doors as the last two numbers. The
 * index is ordered from most real to least, which is why it is numbered.
 */
export default function Hero() {
  const t = useTranslations("hero")
  const tHome = useTranslations("home")
  const tApps = useTranslations("apps")
  const locale = useLocale()
  const work = `${routePath("work", locale)}#cases`

  const index: { id: string; name: string; href: string; status: Status }[] = [
    { id: "crudo", name: tApps("crudo.name"), href: appPath("crudo", locale), status: "pending" },
    { id: "feit-y", name: tApps("feit-y.name"), href: appPath("feit-y", locale), status: "pending" },
    { id: "aircall", name: tHome("index.aircall.name"), href: work, status: "live" },
    { id: "engineai", name: tHome("index.engineai.name"), href: work, status: "done" },
  ]

  return (
    <section className="frame grid12 gap-y-12 pt-10 pb-16 lg:min-h-[calc(100svh-4rem)] lg:content-between lg:gap-y-14 lg:pt-16">
      <h1 className="display-name rise col-span-4 md:col-span-8 lg:col-span-7">
        <span className="line block">Pedro</span>
        <span className="line block">Feiteira</span>
      </h1>

      <div className="rise col-span-4 flex items-end gap-4 md:col-span-3 lg:col-span-3" style={{ animationDelay: "240ms" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized webp */}
        <img
          src="/profile-480.webp"
          alt={t("profileAlt")}
          width={480}
          height={480}
          className="h-24 w-24 object-cover object-top lg:h-28 lg:w-28"
        />
        <p className="text-sm leading-snug text-muted-foreground">{tHome("caption")}</p>
      </div>

      <p
        className="rise col-span-4 max-w-[46ch] text-lg leading-relaxed md:col-span-5 lg:col-span-4 lg:col-start-4 lg:pl-8"
        style={{ animationDelay: "320ms" }}
      >
        {t("tagline")}
      </p>

      <nav aria-label={t("doorsLabel")} className="col-span-4 grid grid-cols-1 gap-x-6 md:col-span-8 md:grid-cols-2 lg:col-span-9 lg:col-start-4 lg:row-start-3 lg:pl-8">
        <Door n={5} door="hire" href={routePath("resume", locale)} delay={520} />
        <Door n={6} door="build" href={routePath("services", locale)} delay={600} />
      </nav>

      <ol
        aria-label={tHome("indexLabel")}
        className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start"
      >
        {index.map((item, i) => (
          <li key={item.id} className="rise" style={{ animationDelay: `${120 + i * 80}ms` }}>
            <Link href={item.href} className="group relative grid grid-cols-[minmax(4.5rem,auto)_1fr] items-start gap-x-5 border-t border-rule/15 py-4 transition-colors duration-500 hover:bg-primary/[0.04] hairline-draw">
              <span className="index-numeral tabular font-medium text-primary transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1 pt-1">
                <span className="text-xl font-semibold leading-tight tracking-tight">{item.name}</span>
                <span className="text-sm text-muted-foreground">{tHome(`index.${item.id}.meta`)}</span>
                <StatusMark status={item.status} label={tHome(`index.${item.id}.status`)} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

    </section>
  )
}

/**
 * The two ways in: a recruiter heads for the résumé, a client for services.
 * App users never need a door; they arrive from the App Store.
 */
function Door({ n, door, href, delay }: { n: number; door: "hire" | "build"; href: string; delay: number }) {
  const t = useTranslations("hero.doors")

  return (
    <Link
      href={href}
      className="rise group relative grid grid-cols-[3.25rem_1fr_auto] items-start gap-x-3 border-t-2 border-rule py-5 transition-colors duration-500 hover:bg-primary/[0.04] hairline-draw hairline-draw-thick"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="tabular pt-1 text-sm font-medium text-primary transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1">
        {String(n).padStart(2, "0")}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-2xl font-semibold tracking-tight lg:text-3xl">{t(`${door}.title`)}</span>
        <span className="text-muted-foreground">{t(`${door}.body`)}</span>
      </span>
      <ArrowUpRight
        className="mt-1 h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </Link>
  )
}
