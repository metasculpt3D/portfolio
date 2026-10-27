export function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
    toggle.focus();
  });

  nav.addEventListener("focusout", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    const next = event.relatedTarget;
    if (next instanceof Node && (nav.contains(next) || next === toggle)) return;
    setOpen(false);
  });

  const desktop = window.matchMedia("(min-width: 860px)");
  desktop.addEventListener("change", () => {
    if (desktop.matches) setOpen(false);
  });
}
