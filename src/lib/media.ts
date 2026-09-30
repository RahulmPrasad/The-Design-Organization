// Breakpoints match the Webflow export: desktop is 992px and up.
export const DESKTOP_QUERY = "(min-width: 992px)";

export function isDesktop(): boolean {
  return window.innerWidth > 991;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
