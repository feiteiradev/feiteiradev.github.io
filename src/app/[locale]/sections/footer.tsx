"use client"

import { useTranslations, useLocale } from "next-intl"
import SocialMediaSection from "@/components/common/socialMedia"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { routePath } from "../../../lib/routes"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const t = useTranslations("footer")
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 border-t border-border/20 mt-32 relative">
      {/* Scroll to top button - fixed position */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="ghost"
          className="fixed bottom-8 right-8 z-50 rounded-md transition-all duration-300 hover:bg-muted"
          aria-label={t("scrollToTop")}
        >
          <ArrowUp className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6" style={{ maxWidth: "var(--container-content)", margin: "0 auto" }}>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={routePath("privacy", locale)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("privacy")}
          </Link>
          <Link
            href={routePath("support", locale)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("support")}
          </Link>
          <SocialMediaSection />
        </div>
      </div>
    </footer>
  )
}
