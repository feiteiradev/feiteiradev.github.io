"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { routePath } from "../../../../lib/routes"

/**
 * Floating "back to the list" control for a showcase demo.
 *
 * It used to live in a layout that wrapped both the listing and the detail
 * pages and switched itself off with usePathname. It only ever belongs on a
 * detail page, so it is rendered there directly instead.
 */
export default function BackButton() {
  const locale = useLocale()
  const t = useTranslations("notFound")

  return (
    <div className="fixed left-4 top-20 z-50 sm:left-6 sm:top-24">
      <Link
        href={routePath("work", locale)}
        className="inline-flex h-10 items-center justify-center border border-rule/40 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("goBack")}
      </Link>
    </div>
  )
}
