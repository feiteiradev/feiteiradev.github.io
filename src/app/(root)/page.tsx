import Link from "next/link"

/** Fallback content for anything that does not follow the meta refresh in the
 *  layout: crawlers, text browsers, and anyone with a slow connection. */
export default function RootPage() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem 1.5rem" }}>
      <h1>Pedro Feiteira</h1>
      <p>Engenheiro de software. Trabalho, serviços e apoio às apps Crudo e Feit-Y.</p>
      <p>
        <Link href="/pt/">Continuar para o site</Link>{" · "}
        <Link href="/en/">English version</Link>
      </p>
    </main>
  )
}
