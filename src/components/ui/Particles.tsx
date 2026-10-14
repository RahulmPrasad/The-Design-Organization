"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/media";

const CONFIG = {
  /** Screen area (px²) per dot; lower = denser. */
  areaPerDot: 3600,
  maxDots: 480,
  radius: [0.8, 2.2],
  drift: 0.12,
  /** How far (px) the cursor pushes dots away. */
  pushRadius: 180,
  pushStrength: 4,
  /** Pull back toward each dot's drifting home position. */
  spring: 0.02,
  damping: 0.88,
};

type RGB = [number, number, number];

type ParticlesProps = {
  className?: string;
  style?: CSSProperties;
  /** Dot color at rest. */
  color?: RGB;
  /** Color dots glow toward near the cursor. */
  highlight?: RGB;
};

type Dot = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  radius: number;
  alpha: number;
  glow: number;
};

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/** Scattered dots that drift slowly and part around the cursor, then settle back. */
export function Particles({
  className,
  style,
  color = [82, 79, 75], // #524F4B
  highlight = [211, 231, 255], // #D3E7FF, brand light blue
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    const reducedMotion = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frameId = 0;
    let visible = false;
    // Last pointer position in viewport coordinates; null when the pointer is away.
    let pointer: { x: number; y: number } | null = null;

    const seed = () => {
      const count = Math.min(CONFIG.maxDots, Math.round((width * height) / CONFIG.areaPerDot));
      dots = Array.from({ length: count }, () => {
        const x = random(0, width);
        const y = random(0, height);
        const angle = random(0, Math.PI * 2);
        return {
          homeX: x,
          homeY: y,
          x,
          y,
          vx: 0,
          vy: 0,
          driftX: Math.cos(angle) * CONFIG.drift * random(0.3, 1),
          driftY: Math.sin(angle) * CONFIG.drift * random(0.3, 1),
          radius: random(CONFIG.radius[0], CONFIG.radius[1]),
          alpha: random(0.35, 0.9),
          glow: 0,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = color;
      const [hr, hg, hb] = highlight;
      for (const dot of dots) {
        const t = dot.glow;
        ctx.fillStyle = `rgba(${r + (hr - r) * t}, ${g + (hg - g) * t}, ${b + (hb - b) * t}, ${
          dot.alpha + (1 - dot.alpha) * t
        })`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * (1 + t * 1.2), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      const rect = canvas.getBoundingClientRect();
      const px = pointer ? pointer.x - rect.left : -1e4;
      const py = pointer ? pointer.y - rect.top : -1e4;
      const { pushRadius, pushStrength, spring, damping } = CONFIG;

      for (const dot of dots) {
        // Home drifts and wraps around the edges.
        dot.homeX += dot.driftX;
        dot.homeY += dot.driftY;
        if (dot.homeX < -10) { dot.homeX += width + 20; dot.x += width + 20; }
        if (dot.homeX > width + 10) { dot.homeX -= width + 20; dot.x -= width + 20; }
        if (dot.homeY < -10) { dot.homeY += height + 20; dot.y += height + 20; }
        if (dot.homeY > height + 10) { dot.homeY -= height + 20; dot.y -= height + 20; }

        // Push away from the pointer, strongest up close.
        const dx = dot.x - px;
        const dy = dot.y - py;
        const distance = Math.hypot(dx, dy);
        let influence = 0;
        if (distance < pushRadius && distance > 0.01) {
          influence = 1 - distance / pushRadius;
          const force = influence * influence * pushStrength;
          dot.vx += (dx / distance) * force;
          dot.vy += (dy / distance) * force;
        }

        // Spring back home, with damping.
        dot.vx = (dot.vx + (dot.homeX - dot.x) * spring) * damping;
        dot.vy = (dot.vy + (dot.homeY - dot.y) * spring) * damping;
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.glow += (influence - dot.glow) * 0.12;
      }
      draw();
    };

    const loop = () => {
      step();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reducedMotion || frameId || !visible) return;
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    // Content sits above the canvas, so track the pointer on the window.
    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const onPointerLeave = () => {
      pointer = null;
    };
    // A lifted finger leaves no hover position; a released mouse button still does.
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") pointer = null;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Only animate while on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    visibilityObserver.observe(container);

    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
    // Colors arrive as array literals, so compare by value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color.join(), highlight.join()]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none", ...style }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
