'use strict';
// Small, isolated equivalent of the observed one-time Webflow entrance effects.
(() => {
  const cards = [...document.querySelectorAll('.process-exact')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('process-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0 });
  cards.forEach((card, index) => {
    card.style.setProperty('--entry-delay', `${index * 300}ms`);
    card.classList.add('motion-ready');
    observer.observe(card);
    const artwork = card.querySelector('.process-offer-stage,.process-stack-entry');
    if (artwork) observer.observe(artwork);
  });
})();
