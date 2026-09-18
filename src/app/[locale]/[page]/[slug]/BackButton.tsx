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
        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background/95 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:px-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("goBack")}
      </Link>
    </div>
  )
}
