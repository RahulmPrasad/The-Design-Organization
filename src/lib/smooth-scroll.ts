import type Lenis from "lenis";

// The single Lenis instance, so components can pause scrolling (menu open, page loader).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function stopScroll() {
  lenis?.stop();
}

export function startScroll() {
  lenis?.start();
}
