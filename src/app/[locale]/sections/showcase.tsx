"use client"

import { useTranslations, useLocale } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SHOWCASES, ShowcaseMeta } from "../../../lib/data/showcases"
import { routePath } from "../../../lib/routes"

export default function Showcase() {
  const t = useTranslations("showcase")
  const locale = useLocale()

  return (
    <section id="showcase" className="section-spacing scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div style={{ maxWidth: "var(--container-content)", margin: "0 auto" }}>
        <div className="mb-12">
          <span className="section-eyebrow">{t("title")}</span>
          <p className="text-muted-foreground max-w-xl text-base mt-6">
            {t("description")}
          </p>
          <p className="text-muted-foreground/80 max-w-xl text-sm mt-2">
            {t("disclosure")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6">
          {SHOWCASES.map((showcase: ShowcaseMeta) => (
            <Card key={showcase.slug} className="group overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="h-40 lg:h-48 3xl:h-64 w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${showcase.gradientFrom}, ${showcase.gradientTo})` }}>
                <span className="text-white/30 font-bold text-4xl tracking-wider">
                  {t(`${showcase.slug}.title`).split(' ')[0]}
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">
                  {t(`${showcase.slug}.title`)}
                </CardTitle>
                <CardDescription className="text-base">
                  {t(`${showcase.slug}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4 pb-6">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <Link href={`${routePath("work", locale)}${showcase.slug}/`}>
                    {t("viewProject")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}