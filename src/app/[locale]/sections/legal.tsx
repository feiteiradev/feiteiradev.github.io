"use client"

import { useTranslations } from "next-intl"

// Privacy and Support are the same shape -- an eyebrow, a lede, then numbered
// prose blocks -- so they share one renderer and differ only by namespace.
// Apple requires both URLs to resolve for an App Store submission.
function LegalPage({ namespace, blocks }: { namespace: string; blocks: string[] }) {
  const t = useTranslations(namespace)

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="section-eyebrow">{t("title")}</span>
        </div>

        <p className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.15] mb-6 max-w-2xl">
          {t("statement")}
        </p>

        <p className="font-mono text-xs text-muted-foreground mb-12">{t("updated")}</p>

        <div className="flex flex-col gap-10">
          {blocks.map((key) => (
            <section key={key}>
              <h2 className="text-lg font-semibold tracking-tight mb-3">{t(`${key}.heading`)}</h2>
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {t(`${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Privacy() {
  return (
    <LegalPage
      namespace="privacy"
      blocks={["who", "site", "apps", "legal", "rights", "changes"]}
    />
  )
}

export function Support() {
  return <LegalPage namespace="support" blocks={["contact", "crudo", "purchases", "data"]} />
}
