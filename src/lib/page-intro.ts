import type { gsap } from "gsap";

// A page can register an entrance timeline; the page loader plays it as the loader clears.
export type PageIntro = () => gsap.core.Timeline;

let current: PageIntro | null = null;

export function registerPageIntro(intro: PageIntro): () => void {
  current = intro;
  return () => {
    if (current === intro) current = null;
  };
}

export function takePageIntro(): PageIntro | null {
  const intro = current;
  current = null;
  return intro;
}
