'use strict';
// Small, isolated equivalent of the observed one-time Webflow entrance effects.
(() => {
  const cards = [...document.querySelectorAll('.process-exact')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const mobile = matchMedia('(max-width:767px)').matches;
  // Observe the visible card rather than its initially translated artwork.
  // The phone entrance should happen while the visitor can actually see it.
  const mobileOfferObserver = mobile ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio < .45) continue;
      entry.target.querySelector('.process-offer-stage')?.classList.add('process-visible');
      mobileOfferObserver.unobserve(entry.target);
    }
  }, {threshold: .45, rootMargin: '0px 0px -24px 0px'}) : null;
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
    if (artwork) {
      if (mobile && artwork.matches('.process-offer-stage')) mobileOfferObserver.observe(card);
      else observer.observe(artwork);
    }
  });
})();
