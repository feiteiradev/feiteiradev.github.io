"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { IDENTITY } from "../../../lib/constants"
import { routePath } from "../../../lib/routes"
import { Block } from "./components/common/Block"

/** The page ends on a real close: the question, then the address itself. */
export default function Close() {
  const t = useTranslations("home.close")
  const locale = useLocale()

  return (
    <Block title={t("title")}>
      <p className="max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-tight lg:text-6xl">{t("line")}</p>
      <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground">{t("body")}</p>
      <div className="mt-10 flex flex-col gap-4">
        <a
          href={`mailto:${IDENTITY.email}`}
          className="self-start break-all text-2xl font-medium text-primary underline decoration-primary/40 hover:decoration-primary lg:text-3xl"
        >
          {IDENTITY.email}
        </a>
        <Link href={routePath("contact", locale)} className="self-start underline decoration-rule/30 hover:text-primary hover:decoration-primary">
          {t("form")}
        </Link>
      </div>
    </Block>
  )
}
