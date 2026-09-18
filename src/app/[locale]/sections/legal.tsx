"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { IDENTITY } from "../../../lib/constants"
import { APP_DOCS, appPath, routePath, type AppDoc, type AppSlug } from "../../../lib/routes"

type Section = { heading: string; body: string }

// Every policy and support page is the same shape -- an eyebrow, a lede, then
// titled prose blocks -- so they share one renderer and differ by namespace.
// The blocks are an array in the messages, so adding one is a copy edit.
function LegalPage({
  namespace,
  eyebrow,
  children,
}: {
  namespace: string
  eyebrow: string
  children?: React.ReactNode
}) {
  const t = useTranslations(namespace)

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="section-eyebrow">{eyebrow}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.15] mb-6 max-w-2xl">
          {t("statement")}
        </h1>

        <p className="font-mono text-xs text-muted-foreground mb-12">{t("updated")}</p>

        {children}

        <div className="flex flex-col gap-10">
          {(t.raw("sections") as Section[]).map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold tracking-tight mb-3">{section.heading}</h2>
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

/** The site's own policy: the contact form, and pointers to each app's. */
export function Privacy() {
  const t = useTranslations("privacy")
  return <LegalPage namespace="privacy" eyebrow={t("title")} />
}

/** An app's support or privacy page, at the URL App Store Connect holds. */
export function AppDocPage({ app, doc }: { app: AppSlug; doc: AppDoc }) {
  const t = useTranslations("apps")
  const locale = useLocale()

  return (
    <LegalPage
      namespace={`apps.${app}.${doc}`}
      eyebrow={`${t(`${app}.name`)} · ${t(`docLinks.${doc}`)}`}
    >
      {/* App Review rejects a support URL with no visible way to reach a person. */}
      {doc === "support" && (
        <div className="flex flex-wrap gap-3 mb-12">
          <Button asChild>
            <Link href={`${routePath("contact", locale)}?topic=${app}`}>{t("contactCta")}</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`mailto:${IDENTITY.email}?subject=${encodeURIComponent(t(`${app}.name`))}`}>
              {t("emailCta")}
            </a>
          </Button>
        </div>
      )}
    </LegalPage>
  )
}

/** An app's landing page, which doubles as its App Store Marketing URL. */
export function AppLanding({ app }: { app: AppSlug }) {
  const t = useTranslations("apps")
  const locale = useLocale()

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">{t(`${app}.name`)}</h1>
        <p className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.15] mb-6 max-w-2xl">
          {t(`${app}.tagline`)}
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          {t(`${app}.description`)}
        </p>
        {/* No App Store badge until the app is live: Apple's badge must link to it. */}
        <p className="font-mono text-xs text-muted-foreground mb-10">{t("comingSoon")}</p>
        <nav className="flex flex-wrap gap-3">
          {APP_DOCS.map((doc) => (
            <Button key={doc} asChild variant="outline">
              <Link href={appPath(app, locale, doc)}>{t(`docLinks.${doc}`)}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
