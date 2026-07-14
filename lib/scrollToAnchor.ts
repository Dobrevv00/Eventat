// The browser's own smooth anchor scroll handles the happy path. If it
// stalls (a re-render mid-scroll or an embedded browser that never runs the
// animation), cancel the stuck animation and jump to the target directly.
// Only intervenes while there is no scroll progress, so a healthy smooth
// scroll is never interrupted.
export function ensureAnchorScroll(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const delta = () => el.getBoundingClientRect().top - margin;
  let lastY = window.scrollY;
  const tick = (attempts: number) => {
    setTimeout(() => {
      if (Math.abs(delta()) < 10) return;
      if (Math.abs(window.scrollY - lastY) < 5) {
        window.scrollTo({ top: window.scrollY, behavior: "instant" });
        window.scrollTo({
          top: window.scrollY + delta(),
          behavior: "instant",
        });
      }
      lastY = window.scrollY;
      if (attempts > 1) tick(attempts - 1);
    }, 300);
  };
  tick(4);
}
