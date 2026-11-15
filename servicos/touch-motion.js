'use strict';
// One brief preview of desktop hover effects when their mobile targets become visible.
// This never reads or changes the catalog, contact form or saved selections.
(() => {
  if (!('IntersectionObserver' in window)) return;
  const mobile = matchMedia('(max-width:767px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const played = new WeakSet();
  const active = new Map();
  let observer, mutations, registered, packagePreviewPlayed = false;

  function stop() {
    observer?.disconnect();
    mutations?.disconnect();
    for (const [element, timer] of active) {
      clearTimeout(timer);
      element.classList.remove('mobile-attention');
    }
    active.clear();
  }

  function setup() {
    stop();
    if (!mobile.matches || reduced.matches) return;
    registered = new WeakSet();
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const element = entry.target;
        if (!element.isConnected || !entry.isIntersecting || entry.intersectionRatio < .65) continue;
        const packageButton = element.matches('.offer-cta');
        if (played.has(element) || (packageButton && packagePreviewPlayed)) {
          observer.unobserve(element);
          continue;
        }
        played.add(element);
        if (packageButton) packagePreviewPlayed = true;
        element.classList.add('mobile-attention');
        observer.unobserve(element);
        active.set(element, setTimeout(() => {
          element.classList.remove('mobile-attention');
          active.delete(element);
        }, 2400));
      }
    }, {threshold: .65, rootMargin: '0px 0px -24px 0px'});

    function register(element) {
      if (!element || registered.has(element) || played.has(element)) return;
      if (element.matches('.offer-cta') && packagePreviewPlayed) return;
      registered.add(element);
      observer.observe(element);
    }
    document.querySelectorAll('.process-stack-entry,.work-projects a').forEach(register);
    const panel = document.querySelector('#offer-panel');
    if (panel) {
      let currentButton;
      const registerButton = () => {
        const nextButton = panel.querySelector('.offer-cta');
        if (currentButton && currentButton !== nextButton) observer.unobserve(currentButton);
        currentButton = nextButton;
        register(currentButton);
      };
      registerButton();
      // The package calculator replaces this button; track it without changing its behavior.
      mutations = new MutationObserver(registerButton);
      mutations.observe(panel, {childList: true});
    }
  }
  mobile.addEventListener('change', setup);
  reduced.addEventListener('change', setup);
  setup();
})();
