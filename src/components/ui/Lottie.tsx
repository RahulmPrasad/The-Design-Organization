"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useRef, type HTMLAttributes } from "react";

type LottieProps = HTMLAttributes<HTMLDivElement> & {
  /** Path to a Lottie JSON file in /public. */
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  onReady?: (animation: AnimationItem) => void;
};

// Renders with the SVG renderer so CSS can recolor paths (e.g. `path { fill: currentColor }`).
export function Lottie({ src, autoplay = false, loop = false, onReady, ...rest }: LottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let animation: AnimationItem | null = null;
    let disposed = false;

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (disposed) return;
      animation = lottie.loadAnimation({ container, renderer: "svg", loop, autoplay, path: src });
      animation.addEventListener("DOMLoaded", () => {
        if (animation) onReadyRef.current?.(animation);
      });
    });

    return () => {
      disposed = true;
      animation?.destroy();
    };
  }, [src, autoplay, loop]);

  return <div ref={containerRef} {...rest} />;
}
