const revealItems = document.querySelectorAll(".reveal");

const canUseTechCursor = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseTechCursor) {
  const cursor = document.createElement("div");
  const dot = document.createElement("div");
  cursor.className = "tech-cursor";
  dot.className = "tech-cursor-dot";
  document.body.append(cursor, dot);

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let dotX = cursorX;
  let dotY = cursorY;

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
  });

  window.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready", "cursor-hover", "cursor-down");
  });

  window.addEventListener("mousedown", () => document.body.classList.add("cursor-down"));
  window.addEventListener("mouseup", () => document.body.classList.remove("cursor-down"));

  document.querySelectorAll("a, button, .case-card, .timeline-item, .stack-board > div").forEach((item) => {
    item.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    item.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  moveCursor();
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const methodTimeline = document.querySelector(".method-timeline");
const methodItems = document.querySelectorAll(".timeline-item");

if (methodTimeline && methodItems.length) {
  const lightMethodItems = () => {
    methodItems.forEach((item, index) => {
      window.setTimeout(() => item.classList.add("is-lit"), index * 180);
    });
  };

  if ("IntersectionObserver" in window) {
    const methodObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          lightMethodItems();
          methodObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.28 }
    );

    methodObserver.observe(methodTimeline);
  } else {
    lightMethodItems();
  }
}
