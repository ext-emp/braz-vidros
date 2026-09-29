import { ScrollSmoother } from "gsap/ScrollSmoother";

export function lockScroll() {
  const smoother = ScrollSmoother.get();
  smoother?.paused(true);

  const { overflow } = document.body.style;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = overflow;
    smoother?.paused(false);
  };
}
