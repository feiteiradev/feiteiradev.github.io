"use client";

import { useEffect, useRef } from "react";

// The dot grid as a live surface. Dots part around the pointer, swell and
// take the accent; a tap or click sends a ripple through the grid; with no
// pointer at all a slow wave keeps it breathing. Under reduced motion it is
// drawn once and left still.
const GAP = 24; // grid pitch, px
const REACH = 240; // pointer influence radius, px
const PUSH = 22; // max displacement at the pointer, px
const RIPPLE_SPEED = 0.8; // px per ms
const RIPPLE_WIDTH = 90; // px
const RIPPLE_LIFE = 1800; // ms

type Ripple = { x: number; y: number; t0: number };

function readColors() {
  const css = getComputedStyle(document.documentElement);
  return {
    ink: css.getPropertyValue("--foreground").trim() || "#0e0f0d",
    accent: css.getPropertyValue("--primary").trim() || "#2b47f5",
  };
}

export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let w = 0;
    let h = 0;
    // Pointer target and its eased position; off-screen until the visitor moves.
    const target = { x: -9999, y: -9999 };
    const pointer = { x: -9999, y: -9999 };
    const ripples: Ripple[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (target.x - pointer.x) * 0.12;
      pointer.y += (target.y - pointer.y) * 0.12;
      while (ripples.length && now - ripples[0].t0 > RIPPLE_LIFE) ripples.shift();

      for (let gy = GAP / 2; gy < h + GAP; gy += GAP) {
        for (let gx = GAP / 2; gx < w + GAP; gx += GAP) {
          // Ambient: a slow diagonal swell, so the field is alive untouched.
          const wave = still ? 0 : (Math.sin(gx * 0.012 + gy * 0.009 - now * 0.0009) + 1) / 2;
          let energy = wave * wave * 0.32;
          let x = gx;
          let y = gy;

          const dx = gx - pointer.x;
          const dy = gy - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < REACH) {
            const f = 1 - d / REACH;
            const k = f * f;
            energy = Math.max(energy, k);
            if (d > 0.01) {
              x += (dx / d) * PUSH * k;
              y += (dy / d) * PUSH * k;
            }
          }

          for (const r of ripples) {
            const age = now - r.t0;
            const front = age * RIPPLE_SPEED;
            const band = 1 - Math.abs(Math.hypot(gx - r.x, gy - r.y) - front) / RIPPLE_WIDTH;
            if (band > 0) energy = Math.max(energy, band * (1 - age / RIPPLE_LIFE));
          }

          // The wave stays ink; only the pointer and ripples light dots up.
          const hot = energy > 0.34;
          ctx.globalAlpha = 0.13 + energy * 0.72;
          ctx.fillStyle = hot ? colors.accent : colors.ink;
          const size = 1.2 + energy * 3.3;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // Jump rather than glide in from off-screen on the first move.
      if (pointer.x < -1000) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
      if (ripples.length > 4) ripples.shift();
    };

    // Theme toggles swap the palette, so re-read the tokens when <html> changes.
    const themeWatch = new MutationObserver(() => {
      colors = readColors();
      if (still) draw(0);
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    resize();
    window.addEventListener("resize", resize);
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeWatch.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0" />;
}
