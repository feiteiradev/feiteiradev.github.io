"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // next-themes renders its anti-flash <script> inside the React tree. A locale
  // switch remounts the [locale] layout on the client, where React 19 warns
  // that such a script never runs. It only needs to run from the server HTML,
  // so on the client it is marked inert; next-themes already suppresses the
  // hydration mismatch this causes.
  return (
    <NextThemesProvider
      scriptProps={{ type: typeof window === "undefined" ? undefined : "application/json" }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}