"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight, Braces, FileUser, Hammer, Headset, type LucideIcon } from "lucide-react"
import { routePath } from "../../../lib/routes"

/**
 * The first viewport is a portrait-led split. Left of the axis, the portrait
 * as a full grid module; right of it, the name, one line of promise and the
 * two doors. Under them, hung from the axis like the doors, the client work,
 * each marked by a line icon in the accent. The apps have their own section
 * right below, so they are not repeated here.
 */
export default function Hero() {
  const t = useTranslations("hero")
  const tHome = useTranslations("home")
  const locale = useLocale()
  const work = `${routePath("work", locale)}#cases`

  const index: { id: string; name: string; Icon: LucideIcon }[] = [
    { id: "aircall", name: tHome("index.aircall.name"), Icon: Headset },
    { id: "engineai", name: tHome("index.engineai.name"), Icon: Braces },
  ]

  return (
    <section className="frame grid12 gap-y-10 pt-8 pb-16 lg:gap-y-0 lg:pt-10">
      {/* The portrait fills its three columns and the full height of the
          column beside it: a module of the grid, not a thumbnail. */}
      <div
        className="rise relative col-span-4 aspect-[4/3] overflow-hidden md:col-span-3 md:aspect-[3/4] lg:col-span-3 lg:row-span-3 lg:aspect-auto lg:min-h-[28rem]"
        style={{ animationDelay: "120ms" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized webp */}
        <img
          src="/profile-portrait.webp"
          alt={t("profileAlt")}
          width={720}
          height={960}
          className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
        />
      </div>

      <div className="col-span-4 row-start-1 md:col-span-5 md:row-start-auto lg:col-span-9 lg:col-start-4 lg:pl-8">
        <h1 className="display-name">
          <span className="line block">Pedro</span>
          <span className="line block">Feiteira</span>
        </h1>
        <p className="rise mt-5 text-lg text-muted-foreground" style={{ animationDelay: "200ms" }}>
          {tHome("caption")}
        </p>
      </div>

      <p
        className="rise col-span-4 max-w-[40ch] text-2xl font-medium leading-snug tracking-tight md:col-span-8 lg:col-span-7 lg:col-start-4 lg:mt-6 lg:pl-8 lg:text-3xl"
        style={{ animationDelay: "280ms" }}
      >
        {t("tagline")}
      </p>

      <nav
        aria-label={t("doorsLabel")}
        className="col-span-4 grid grid-cols-1 gap-x-6 self-end md:col-span-8 md:grid-cols-2 lg:col-span-9 lg:col-start-4 lg:mt-8 lg:pl-8"
      >
        <Door Icon={FileUser} door="hire" href={routePath("resume", locale)} delay={360} />
        <Door Icon={Hammer} door="build" href={routePath("services", locale)} delay={420} />
      </nav>

      <ol aria-label={tHome("indexLabel")} className="col-span-4 grid gap-x-6 md:col-span-8 md:grid-cols-2 lg:col-span-9 lg:col-start-4 lg:mt-10 lg:pl-8">
        {index.map(({ Icon, ...item }, i) => (
          <li key={item.id} className="rise" style={{ animationDelay: `${480 + i * 70}ms` }}>
            <Link
              href={work}
              className="group relative grid h-full grid-cols-[3.25rem_1fr] items-start gap-x-3 border-t border-rule/15 pt-4 pb-5 transition-colors duration-500 hover:bg-primary/[0.04] hairline-draw lg:pr-4"
            >
              <Icon
                className="mt-1 h-7 w-7 text-primary transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <span className="flex flex-col gap-1">
                <span className="text-xl font-semibold leading-tight tracking-tight">{item.name}</span>
                <span className="text-sm text-muted-foreground">{tHome(`index.${item.id}.meta`)}</span>
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
function Door({ Icon, door, href, delay }: { Icon: LucideIcon; door: "hire" | "build"; href: string; delay: number }) {
  const t = useTranslations("hero.doors")

  return (
    <Link
      href={href}
      className="rise group relative grid grid-cols-[3.25rem_1fr_auto] items-start gap-x-3 border-t-2 border-rule py-5 transition-colors duration-500 hover:bg-primary/[0.04] hairline-draw hairline-draw-thick"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon
        className="mt-1 h-7 w-7 text-primary transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1"
        strokeWidth={1.25}
        aria-hidden="true"
      />
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
