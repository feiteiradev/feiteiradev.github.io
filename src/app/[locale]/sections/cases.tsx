"use client"

import { useTranslations } from "next-intl"
import { Block } from "./components/common/Block"

type CaseEntry = {
  client: string
  period: string
  situation: string
  work: string
  stack: string[]
}

/**
 * Real client work, as opposed to the concepts.
 *
 * Naming Aircall and EngineAI was confirmed by Pedro on 24 Aug 2026
 * (Decisões humanas #5). The AI stack behind the Aircall system stays out of
 * the prose deliberately: the client may be named, the architecture may not.
 */
export default function Cases() {
  const t = useTranslations("cases")
  const items = t.raw("items") as CaseEntry[]

  return (
    <Block id="cases" title={t("title")} intro={t("description")}>
      <div className="flex flex-col">
        {items.map((item) => (
          <article key={item.client} className="border-t border-rule/15 py-10 first:pt-8">
            <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-3xl font-semibold tracking-tight">{item.client}</h3>
              <span className="tabular text-sm text-muted-foreground">{item.period}</span>
            </header>

            <dl className="grid gap-6 md:grid-cols-2 md:gap-10">
              <div>
                <dt className="mb-2 text-sm font-semibold">{t("labels.situation")}</dt>
                <dd className="max-w-[48ch] text-muted-foreground">{item.situation}</dd>
              </div>
              <div>
                <dt className="mb-2 text-sm font-semibold">{t("labels.work")}</dt>
                <dd className="max-w-[48ch] text-muted-foreground">{item.work}</dd>
              </div>
            </dl>

            <p className="mt-6 text-sm text-muted-foreground">{item.stack.join(" · ")}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 max-w-[60ch] text-sm text-muted-foreground">{t("resultsNote")}</p>
    </Block>
  )
}
