(() => {
  const canUseTechCursor = window.matchMedia("(pointer: fine)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canUseTechCursor || document.querySelector(".tech-cursor")) return;

  const cursor = document.createElement("div");
  const dot = document.createElement("div");
  cursor.className = "tech-cursor";
  dot.className = "tech-cursor-dot";
  cursor.setAttribute("aria-hidden", "true");
  dot.setAttribute("aria-hidden", "true");
  document.body.append(cursor, dot);

  const actionSelector = "a, button, [role='button'], summary";
  const hoverSelector = ".case-card, .work-step, .case-evidence-panel, .hero-signal, .hero-evidence-item";
  const nativeSelector = "input, textarea, select, [contenteditable='true'], .tennis-scatter, [data-cursor-native]";

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let dotX = cursorX;
  let dotY = cursorY;

  const updateTargetState = (target) => {
    const element = target instanceof Element ? target : null;
    const isNative = Boolean(element?.closest(nativeSelector));
    const isAction = !isNative && Boolean(element?.closest(actionSelector));
    const isHover = isAction || (!isNative && Boolean(element?.closest(hoverSelector)));

    document.body.classList.toggle("cursor-native", isNative);
    document.body.classList.toggle("cursor-action", isAction);
    document.body.classList.toggle("cursor-hover", isHover);
  };

  const moveCursor = () => {
    dotX += (cursorX - dotX) * 0.24;
    dotY += (cursorY - dotY) * 0.24;
    cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    window.requestAnimationFrame(moveCursor);
  };

  window.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    document.body.classList.add("cursor-ready");
    updateTargetState(event.target);
  });

  window.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready", "cursor-hover", "cursor-action", "cursor-down", "cursor-native");
  });

  window.addEventListener("mousedown", () => document.body.classList.add("cursor-down"));
  window.addEventListener("mouseup", () => document.body.classList.remove("cursor-down"));

  moveCursor();
})();
