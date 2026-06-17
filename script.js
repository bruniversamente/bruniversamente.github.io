const revealItems = document.querySelectorAll(".reveal");

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
