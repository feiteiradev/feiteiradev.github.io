"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import {
  Download,
  Printer,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
  Calendar,
  GraduationCap,
} from "lucide-react"

import Header from "../sections/header"
import Footer from "../sections/footer"
import { Axis } from "../sections/components/common/Block"
import { Button } from "@/components/ui/button"
import { IDENTITY, SITE_HOST, SITE_URL } from "../../../lib/constants"

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ExperienceEntry = {
  role: string
  company: string
  period: string
  location: string
  description: string[]
  technologies: string[]
}

type SkillGroup = { label: string; items: string[] }
type EducationEntry = {
  degree: string
  school: string
  period: string
  location: string
  detail: string
}
type LanguageEntry = { name: string; level: string }

/* -------------------------------------------------------------------------- */
/*  Contact details                                                           */
/* -------------------------------------------------------------------------- */

const CONTACT = {
  email: IDENTITY.email,
  website: `${SITE_URL}/`,
  websiteLabel: SITE_HOST,
  linkedin: IDENTITY.linkedin,
  linkedinLabel: `in/${IDENTITY.linkedinUser}`,
  github: IDENTITY.github,
  githubLabel: IDENTITY.githubUser,
}

/** A section wrapper; it used to fade in on scroll, and now simply renders. */
function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    // Visible by default: a résumé is read, and content that waits for a
    // scroll to appear is content a quick reader never sees.
    <div className={className}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ResumeClient() {
  const t = useTranslations("resume")
  const tExp = useTranslations("experience")
  const locale = useLocale()

  const experience = tExp.raw("entries") as ExperienceEntry[]
  const skillGroups = t.raw("skillGroups") as SkillGroup[]
  const education = t.raw("education") as EducationEntry[]
  const languages = t.raw("languagesList") as LanguageEntry[]

  const handleDownload = React.useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="no-print">
        <Axis />
        <Header />
      </div>

      <main id="main-content" className="frame grid12 gap-y-8 pb-24 pt-10 lg:pt-16">
        {/* The rail left of the axis: where you are and what you can do with
            the document. Never printed. */}
        <aside className="no-print col-span-4 md:col-span-8 lg:col-span-3">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <Link
              href={`/${locale}/`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              {t("backToHome")}
            </Link>
            <p className="text-2xl font-semibold tracking-tight">{t("title")}</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDownload} className="cursor-pointer gap-2" title={t("downloadHint")} aria-label={t("download")}>
                <Download className="h-4 w-4" strokeWidth={1.75} />
                {t("download")}
              </Button>
              <Button variant="outline" onClick={() => window.print()} className="cursor-pointer gap-2" aria-label={t("print")}>
                <Printer className="h-4 w-4" strokeWidth={1.75} />
                {t("print")}
              </Button>
            </div>
            <p className="max-w-[30ch] text-sm text-muted-foreground">{t("downloadHint")}</p>
          </div>
        </aside>

        {/* The printable résumé document, hung from the axis. */}
        <article className="resume-sheet col-span-4 w-full border border-rule/15 bg-card p-7 sm:p-10 md:col-span-8 md:p-12 lg:col-span-8 lg:col-start-4 lg:ml-8">
          <Masthead />
          <Profile />
          <ExperienceSection entries={experience} ongoing={tExp("ongoing")} />
          <TechStack groups={skillGroups} />
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <EducationSection entries={education} />
            <LanguagesSection languages={languages} />
          </div>
        </article>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Masthead — name, role, contact                                            */
/* -------------------------------------------------------------------------- */

function Masthead() {
  const t = useTranslations("resume")

  const contacts: Array<{
    icon?: typeof Mail
    svg?: string
    label: string
    href?: string
  }> = [
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: t("location") },
    { icon: Globe, label: CONTACT.websiteLabel, href: CONTACT.website },
    { svg: "linkedin", label: CONTACT.linkedinLabel, href: CONTACT.linkedin },
    { svg: "github", label: CONTACT.githubLabel, href: CONTACT.github },
  ]

  return (
    <header className="resume-avoid-break">
      <Reveal>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pedro Feiteira
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("role")}
          </p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {contacts.map((c) => {
            const Icon = c.icon
            const content = (
              <span className="inline-flex items-center gap-1.5">
                {Icon ? (
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                ) : (
                  <Image
                    src={`/icons/${c.svg}.svg`}
                    alt=""
                    width={14}
                    height={14}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 flex-shrink-0 opacity-80 dark:invert"
                  />
                )}
                {c.label}
              </span>
            )
            return (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-foreground"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>

      <div className="mt-7 h-px w-full bg-border" />
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section heading                                                           */
/* -------------------------------------------------------------------------- */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-t border-rule/15 pt-4 text-lg font-semibold tracking-tight">
      {children}
    </h2>
  )
}

/* -------------------------------------------------------------------------- */
/*  Profile / summary                                                         */
/* -------------------------------------------------------------------------- */

function Profile() {
  const t = useTranslations("resume")
  return (
    <section className="mt-7 resume-avoid-break">
      <Reveal>
        <SectionHeading>{t("summaryTitle")}</SectionHeading>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          {t("summary")}
        </p>
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

function ExperienceSection({
  entries,
  ongoing,
}: {
  entries: ExperienceEntry[]
  ongoing: string
}) {
  const t = useTranslations("resume")
  return (
    <section className="mt-10">
      <Reveal>
        <SectionHeading>{t("sections.experience")}</SectionHeading>
      </Reveal>
      <div className="flex flex-col gap-7">
        {entries.map((entry, i) => (
          <Reveal key={`${entry.company}-${i}`}>
            <ExperienceItem entry={entry} ongoing={ongoing} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ExperienceItem({
  entry,
  ongoing,
}: {
  entry: ExperienceEntry
  ongoing: string
}) {
  const isOngoing = entry.period.toLowerCase().includes(ongoing.toLowerCase())

  return (
    <div className="resume-avoid-break border-l border-border/70 pl-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold text-foreground">{entry.role}</h3>
        <span className="tabular inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" strokeWidth={1.5} />
          {entry.period}
          {isOngoing && (
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-2 w-2 bg-primary"
            />
          )}
        </span>
      </div>

      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground/80">{entry.company}</span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" strokeWidth={1.5} />
          {entry.location}
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {entry.description.map((line, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-[9px] h-1 w-1 flex-shrink-0 bg-foreground/50" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm text-muted-foreground">{entry.technologies.join(" · ")}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Tech stack                                                                */
/* -------------------------------------------------------------------------- */

function TechStack({ groups }: { groups: SkillGroup[] }) {
  const t = useTranslations("resume")
  return (
    <section className="mt-10 resume-avoid-break">
      <Reveal>
        <SectionHeading>{t("sections.techStack")}</SectionHeading>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1 text-sm font-semibold">
                {group.label}
              </p>
              <p className="text-sm text-muted-foreground">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Education                                                                 */
/* -------------------------------------------------------------------------- */

function EducationSection({ entries }: { entries: EducationEntry[] }) {
  const t = useTranslations("resume")
  return (
    <section className="resume-avoid-break">
      <Reveal>
        <SectionHeading>{t("sections.education")}</SectionHeading>
        <div className="flex flex-col gap-4">
          {entries.map((edu, i) => (
            <div key={i} className="flex gap-3">
              <GraduationCap
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {edu.degree}
                </h3>
                <p className="text-sm text-foreground/80">{edu.school}</p>
                <p className="tabular mt-0.5 text-sm text-muted-foreground">
                  {edu.period} · {edu.location}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {edu.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Languages                                                                 */
/* -------------------------------------------------------------------------- */

function LanguagesSection({ languages }: { languages: LanguageEntry[] }) {
  const t = useTranslations("resume")
  return (
    <section className="resume-avoid-break">
      <Reveal>
        <SectionHeading>{t("sections.languages")}</SectionHeading>
        <div className="flex flex-col gap-4">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-foreground">
                  {lang.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {lang.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
