"use client";

import { useEffect } from "react";
import { MotionConfig, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// One living surface behind every page: three accent-tinted fields drifting
// under a dot grid, the whole mesh leaning a little toward the cursor. Under
// reduced motion it is the same picture, held still.
const FIELDS = [
  {
    color: "var(--mesh-1)",
    className: "-top-[25%] -left-[15%] h-[70vw] w-[70vw] opacity-[0.08] dark:opacity-[0.10]",
    drift: { x: ["0%", "8%", "-6%", "0%"], y: ["0%", "6%", "2%", "0%"] },
    duration: 38,
  },
  {
    color: "var(--mesh-2)",
    className: "top-[25%] -right-[20%] h-[60vw] w-[60vw] opacity-[0.07] dark:opacity-[0.08]",
    drift: { x: ["0%", "-10%", "4%", "0%"], y: ["0%", "-4%", "6%", "0%"] },
    duration: 46,
  },
  {
    color: "var(--mesh-3)",
    className: "-bottom-[30%] left-[15%] h-[55vw] w-[55vw] opacity-[0.22] dark:opacity-[0.25]",
    drift: { x: ["0%", "6%", "-8%", "0%"], y: ["0%", "-6%", "0%", "0%"] },
    duration: 52,
  },
];

export default function Background() {
  const still = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 30, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    if (still) return;
    const onMove = (e: PointerEvent) => {
      // At most 24px of lean: enough to feel alive, never enough to watch.
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 48);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * 48);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still, pointerX, pointerY]);

  return (
    // Render the same tree on server and client, and let MotionConfig hold the
    // drift still under reduced motion: branching the markup on the media query
    // is a hydration mismatch.
    <MotionConfig reducedMotion="user">
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-background">
      <motion.div className="absolute inset-0 blur-[110px]" style={{ x, y }}>
        {FIELDS.map((field, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${field.className}`}
            style={{ background: field.color }}
            animate={field.drift}
            transition={{ duration: field.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* The dot field, fading out toward the edges. */}
      <div
        className="absolute inset-0 text-foreground opacity-[0.07] dark:opacity-[0.09]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />
    </div>
    </MotionConfig>
  );
}
