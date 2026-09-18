import localFont from "next/font/local"
import { IBM_Plex_Mono, Outfit } from "next/font/google"

// The apps' own faces, loaded only under /apps: Crudo sets General Sans
// (Fontshare, ITF Free Font License, self-hosted), Feit-Y sets Outfit with
// IBM Plex Mono for its figures, as the apps themselves do.
const generalSans = localFont({
  src: "../../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  weight: "200 700",
})
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin", "latin-ext"] })
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400"] })

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${generalSans.variable} ${outfit.variable} ${plexMono.variable}`}>{children}</div>
}
