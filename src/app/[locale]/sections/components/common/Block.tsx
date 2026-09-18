/**
 * The site's one layout rule. At lg and up the axis is the left edge of
 * column 4: a block's heading hangs left of it, its content sits right of it.
 * Below lg the heading stacks above the content.
 */
export function Block({
  id,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-rule/15 py-16 lg:py-24 ${className}`}>
      <div className="frame grid12 gap-y-8">
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <h2 className="text-2xl font-semibold tracking-tight lg:sticky lg:top-24">{title}</h2>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-start-4 lg:col-span-9 lg:pl-8">
          {intro && <p className="mb-10 max-w-[60ch] text-lg text-muted-foreground">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

/** The axis itself, drawn once behind the page at the grid's column 4. */
export function Axis() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden lg:block">
      <div className="frame grid12 h-full">
        <div className="col-start-4 h-full border-l border-rule/15" />
      </div>
    </div>
  )
}
