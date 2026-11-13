'use strict';
// View-only motion; does not read or change catalog, form or review state.
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = [
    ['.hero-copy',0],['.hero-offer',0],['.about-note',0],['.section-intro',0],
    ['.benefit-track article',150],['.work-heading',0],['.work-board-exact',0],
    ['.services-board',300],['.service-tags',600],['.pricing .center-title',0],
    ['.pricing-art',0],['.offer-panel',0],['.commercial-notes>div',150],
    ['.faq-left .center-title',0],['.faq-card',0],['.footer h2',0],['.conversation-box',300]
  ];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reference-revealed');
      observer.unobserve(entry.target);
    });
  }, {threshold:0});
  groups.forEach(([selector,step]) => {
    document.querySelectorAll(selector).forEach((element,index) => {
      element.style.setProperty('--reference-delay',`${step === 150 ? index * step : step}ms`);
      element.classList.add('reference-reveal-ready');
      observer.observe(element);
    });
  });
})();
