"use client"

import Header from "../sections/header"
import Footer from "../sections/footer"
import Services from "../sections/services"
import Showcase from "../sections/showcase"
import Cases from "../sections/cases"
import Contact from "../sections/contact"
import Apps from "../sections/apps"
import { Privacy } from "../sections/legal"
import { Axis } from "../sections/components/common/Block"
import type { RouteKey } from "../../../lib/routes"

// Every one of these pages was its own file rendering the identical shell with
// a different section inside. One map replaces six copies.
const SECTIONS: Partial<Record<RouteKey, React.ComponentType>> = {
  work: Work,
  services: Services,
  contact: Contact,
  privacy: Privacy,
}

/** Everything shipped, most real first: apps, client work, then concepts. */
function Work() {
  return (
    <>
      <Apps />
      <Cases />
      <Showcase />
    </>
  )
}

export default function PageBody({ routeKey }: { routeKey: RouteKey }) {
  const Section = SECTIONS[routeKey]
  if (!Section) return null

  return (
    <PageShell>
      <Section />
    </PageShell>
  )
}

/** Axis, header, the page, footer: the frame every inner page shares. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Axis />
      <Header />
      <main id="main-content" className="[&>section:first-child]:border-t-0">
        {children}
      </main>
      <Footer />
    </div>
  )
}
