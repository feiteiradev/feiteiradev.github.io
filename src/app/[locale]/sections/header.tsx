"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

import LanguageSwitcher from "@/components/LanguageSwitcher"
import { appsPath, routePath, type RouteKey } from "../../../lib/routes"

const PAGE_NAV_KEYS: RouteKey[] = ["work", "services", "resume", "contact"]

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const t = useTranslations("navigation")

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>
      <header
        id="home"
        className="sticky top-0 z-50 w-full border-b border-rule/15 bg-background/80 backdrop-blur-md"
      >
        <div className="frame grid12 h-16 items-center">
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <Home />
          </div>

          {/* Desktop: the nav starts on the axis. */}
          <div className="hidden lg:col-span-7 lg:col-start-4 lg:block lg:pl-8">
            <Navigation />
          </div>
          <div className="hidden items-center justify-end gap-1 lg:col-span-2 lg:flex">
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>

          <div className="col-span-2 flex justify-end md:col-span-4 lg:hidden">
            <button
              aria-label={mobileNavOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="-mr-2 p-2"
            >
              {mobileNavOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full border-b border-rule/15 bg-background lg:hidden"
          >
            <div className="frame py-4">
              <Navigation mobile onNavigate={() => setMobileNavOpen(false)} />
              <div className="mt-4 flex items-center gap-1 border-t border-rule/15 pt-4">
                <LanguageSwitcher />
                <DarkModeToggle />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function Home() {
  const locale = useLocale()
  return (
    <Link
      href={`/${locale}/`}
      className="text-[15px] font-semibold tracking-[-0.01em] hover:text-primary"
      aria-label="Pedro Feiteira — home"
    >
      Pedro Feiteira
    </Link>
  )
}

function Navigation({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const t = useTranslations("navigation")
  const locale = useLocale()
  const pathname = usePathname()

  const items = [
    ...PAGE_NAV_KEYS.map((key) => ({ title: t(key), href: routePath(key, locale), key })),
    { title: t("apps"), href: appsPath(locale), key: "apps" },
  ]

  return (
    <nav aria-label={mobile ? t("mobileNav") : t("mainNav")}>
      <ul className={mobile ? "flex flex-col" : "flex items-center gap-7"}>
        {items.map((item) => {
          const current = pathname?.startsWith(item.href)
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                className={`relative text-[15px] transition-colors hover:text-primary aria-[current=page]:text-primary ${
                  mobile ? "block py-3 text-2xl font-semibold tracking-tight" : "py-5"
                }`}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const t = useTranslations("navigation")

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 transition-colors hover:text-primary"
    >
      <Sun className="h-4 w-4 dark:hidden" strokeWidth={1.5} />
      <Moon className="hidden h-4 w-4 dark:block" strokeWidth={1.5} />
      <span className="sr-only">{t("toggleTheme")}</span>
    </button>
  )
}
