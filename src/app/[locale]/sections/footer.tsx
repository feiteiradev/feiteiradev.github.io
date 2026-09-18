"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowUp } from "lucide-react"
import { SOCIAL_LINKS } from "../../../lib/constants"
import { APPS, appPath, routePath } from "../../../lib/routes"

const SOCIAL_NAMES: Record<string, string> = { linkedin: "LinkedIn", github: "GitHub", x: "X" }

export default function Footer() {
  const t = useTranslations("footer")
  const tApps = useTranslations("apps")
  const locale = useLocale()

  const links = [
    ...APPS.map((app) => ({ href: appPath(app, locale), label: tApps(`${app}.name`), external: false })),
    { href: routePath("privacy", locale), label: t("privacy"), external: false },
    ...SOCIAL_LINKS.map(({ href, icon }) => ({ href, label: SOCIAL_NAMES[icon], external: true })),
  ]

  return (
    <footer className="border-t border-rule/15 bg-background/60 backdrop-blur-sm">
      <div className="frame grid12 gap-y-6 py-10 text-sm">
        <p className="tabular col-span-4 text-muted-foreground md:col-span-8 lg:col-span-3">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
        <ul className="col-span-4 flex flex-wrap gap-x-6 gap-y-2 md:col-span-6 lg:col-span-7 lg:col-start-4 lg:pl-8">
          {links.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="col-span-4 md:col-span-2 md:text-right lg:col-span-2">
          <a href="#home" className="inline-flex items-center gap-1.5 hover:text-primary">
            {t("backToTop")}
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
