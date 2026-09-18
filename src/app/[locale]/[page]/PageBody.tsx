"use client"

import Header from "../sections/header"
import Footer from "../sections/footer"
import About from "../sections/about"
import Skills from "../sections/skills"
import Services from "../sections/services"
import Showcase from "../sections/showcase"
import Cases from "../sections/cases"
import Contact from "../sections/contact"
import { Privacy, Support } from "../sections/legal"
import { AnimatedItem } from "../sections/components/common/AnimatedItem"
import type { RouteKey } from "../../../lib/routes"

// Every one of these pages was its own file rendering the identical shell with
// a different section inside. One map replaces six copies.
const SECTIONS: Partial<Record<RouteKey, React.ComponentType>> = {
  about: About,
  skills: Skills,
  services: Services,
  showcase: Showcase,
  cases: Cases,
  contact: Contact,
  privacy: Privacy,
  support: Support,
}

export default function PageBody({ routeKey }: { routeKey: RouteKey }) {
  const Section = SECTIONS[routeKey]
  if (!Section) return null

  return (
    <div>
      <Header />
      <main id="main-content">
        <div
          className="pb-24"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-fluid-section)",
          }}
        >
          <AnimatedItem>
            <Section />
          </AnimatedItem>
          <Footer />
        </div>
      </main>
    </div>
  )
}
