"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { IDENTITY } from "../../../lib/constants"
import { APP_DOCS, appPath, routePath, type AppDoc, type AppSlug } from "../../../lib/routes"

type Section = { heading: string; body: string }

/**
 * Policy and support pages are one reading layout: the left rail carries
 * where you are, the right carries the text at a comfortable measure.
 * The blocks are an array in the messages, so adding one is a copy edit.
 */
function Document({ namespace, rail, children }: { namespace: string; rail: React.ReactNode; children?: React.ReactNode }) {
  const t = useTranslations(namespace)

  return (
    <div className="frame grid12 gap-y-10 py-12 lg:py-20">
      <aside className="col-span-4 md:col-span-8 lg:col-span-3">
        <div className="lg:sticky lg:top-24">{rail}</div>
      </aside>

      <article className="axis-col col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-4 lg:pl-8">
        <h1 className="max-w-[24ch] text-3xl font-semibold leading-[1.1] tracking-tight lg:text-5xl">{t("statement")}</h1>
        <p className="tabular mt-5 text-sm text-muted-foreground">{t("updated")}</p>

        {children}

        <div className="mt-14 flex flex-col">
          {(t.raw("sections") as Section[]).map((section) => (
            <section key={section.heading} className="border-t border-rule/15 py-8">
              <h2 className="mb-3 text-xl font-semibold tracking-tight">{section.heading}</h2>
              <p className="max-w-[65ch] whitespace-pre-line leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}

/** The site's own policy: the contact form, and pointers to each app's. */
export function Privacy() {
  const t = useTranslations("privacy")
  return <Document namespace="privacy" rail={<p className="text-2xl font-semibold tracking-tight">{t("title")}</p>} />
}

/** The app's rail: its icon and name, and the way between its three pages. */
function AppRail({ app, current }: { app: AppSlug; current?: AppDoc }) {
  const t = useTranslations("apps")
  const locale = useLocale()
  const pages = [{ href: appPath(app, locale), label: t(`${app}.name`), doc: undefined }, ...APP_DOCS.map((doc) => ({ href: appPath(app, locale, doc), label: t(`docLinks.${doc}`), doc }))]

  return (
    <div className="flex flex-col gap-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized webp */}
      <img src={`/apps/${app}-icon.webp`} alt="" width={512} height={512} className="h-14 w-14 rounded-[22%]" />
      <nav aria-label={t(`${app}.name`)}>
        <ul className="border-b border-rule/15">
          {pages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                aria-current={p.doc === current ? "page" : undefined}
                className="block border-t border-rule/15 py-3 transition-colors hover:text-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

/** An app's support or privacy page, at the URL App Store Connect holds. */
export function AppDocPage({ app, doc }: { app: AppSlug; doc: AppDoc }) {
  const t = useTranslations("apps")
  const locale = useLocale()

  return (
    <div className={`brand brand-${app}`}>
      <Document namespace={`apps.${app}.${doc}`} rail={<AppRail app={app} current={doc} />}>
        {/* App Review rejects a support URL with no visible way to reach a person. */}
        {doc === "support" && (
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`${routePath("contact", locale)}?topic=${app}`}
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("contactCta")}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${IDENTITY.email}?subject=${encodeURIComponent(t(`${app}.name`))}`}
              className="inline-flex items-center border border-rule/40 px-5 py-3 font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {t("emailCta")}
            </a>
          </div>
        )}
      </Document>
    </div>
  )
}

/** An app's landing page, which doubles as its App Store Marketing URL. */
export function AppLanding({ app }: { app: AppSlug }) {
  const t = useTranslations("apps")
  const locale = useLocale()

  return (
    <div className={`brand brand-${app}`}>
      <div className="frame grid12 gap-y-10 py-16 lg:min-h-[calc(100svh-10rem)] lg:content-center lg:py-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized webp */}
          <img
            src={`/apps/${app}-icon.webp`}
            alt=""
            width={512}
            height={512}
            className="h-24 w-24 rounded-[22%] lg:h-40 lg:w-40"
          />
        </div>

        <div className="axis-col col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-4 lg:pl-8">
          <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.03em] lg:text-8xl">{t(`${app}.name`)}</h1>
          <p className="mt-6 max-w-[22ch] text-3xl font-medium leading-tight tracking-tight lg:text-4xl">{t(`${app}.tagline`)}</p>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">{t(`${app}.description`)}</p>

          {/* No App Store badge until the app is live: Apple's badge must link to it. */}
          <p className="mt-8 flex items-center gap-2 text-sm">
            <span aria-hidden="true" className="h-2 w-2 border" style={{ borderColor: "var(--brand-mark)" }} />
            {t("comingSoon")}
          </p>

          <nav className="mt-12 max-w-xl border-b border-rule/15">
            {APP_DOCS.map((doc) => (
              <Link
                key={doc}
                href={appPath(app, locale, doc)}
                className="group relative flex items-center justify-between border-t border-rule/15 py-4 text-lg hairline-draw"
              >
                <span className="group-hover:text-primary">{t(`docLinks.${doc}`)}</span>
                <ArrowUpRight className="h-5 w-5 group-hover:text-primary" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
