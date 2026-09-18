"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Header from "./sections/header"
import Footer from "./sections/footer"
import { Axis } from "./sections/components/common/Block"

/** A missing page still hangs from the axis: the number left, the way out right. */
export default function NotFound() {
  const t = useTranslations("notFound")
  const locale = useLocale()

  return (
    <div>
      <Axis />
      <Header />
      <main id="main-content" className="frame grid12 min-h-[70svh] content-center gap-y-8 py-20">
        <p className="display-name tabular col-span-4 text-primary md:col-span-8 lg:col-span-3">404</p>
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-4 lg:pl-8">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">{t("title")}</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-muted-foreground">{t("description")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/`}
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("goHome")}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 border border-rule/40 px-5 py-3 font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {t("goBack")}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
