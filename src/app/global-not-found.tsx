import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { Schibsted_Grotesk } from "next/font/google"

const grotesk = Schibsted_Grotesk({ variable: "--font-grotesk", subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "404 · Pedro Feiteira",
  description: "Página não encontrada. Page not found.",
}

// Served for any URL that matches no route, before a locale is known, so it
// speaks both languages and offers both homes.
export default function GlobalNotFound() {
  return (
    <html lang="pt">
      <body className={`${grotesk.variable} font-sans`}>
        <main className="frame grid12 min-h-svh content-center gap-y-8 py-20">
          <p className="display-name tabular col-span-4 text-primary md:col-span-8 lg:col-span-3">404</p>
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-4 lg:border-l lg:border-rule/15 lg:pl-8">
            <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">Página não encontrada</h1>
            <p className="mt-2 text-2xl text-muted-foreground lg:text-3xl" lang="en">Page not found</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/pt/" className="inline-flex items-center bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90">
                Ir para o início
              </Link>
              <Link href="/en/" lang="en" className="inline-flex items-center border border-rule/40 px-5 py-3 font-medium hover:border-primary hover:text-primary">
                Go to the English site
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
