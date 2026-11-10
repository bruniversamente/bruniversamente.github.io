/* Static entry metadata is also the source of truth during in-page navigation. */
(() => {
  'use strict';
  const id = 'portfolio-structured-data';
  const paths = new Set(window.PORTFOLIO_ROUTES.map(route => route.path));
  const selectors = ['meta[name="description"]', 'meta[property="og:title"]',
    'meta[property="og:description"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]'];
  const cache = new Map();
  let activePath = '', sequence = 0, controller;

  function extract(source) {
    const script = source.getElementById(id);
    if (!script) throw new Error('Missing portfolio schema');
    const graph = JSON.parse(script.textContent);
    const page = graph['@graph'].find(node => node['@id']?.endsWith('#webpage'));
    if (!page) throw new Error('Missing page entity');
    return {schema: script.textContent, path: new URL(page.url).pathname,
      title: page.name, meta: selectors.map(selector => source.querySelector(selector)?.content || '')};
  }

  function apply(metadata) {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script'); script.id = id;
      script.type = 'application/ld+json'; document.head.append(script);
    }
    script.textContent = metadata.schema;
    document.title = metadata.title;
    selectors.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) element.content = metadata.meta[index];
    });
  }

  async function sync() {
    const path = new URL(window.portfolioRoutes.href(location.href), location.origin).pathname;
    if (path === activePath) return;
    activePath = path;
    const version = ++sequence;
    controller?.abort();
    // Remove the previous project's claims immediately while the next loads.
    document.getElementById(id)?.remove();
    if (!paths.has(path)) return;
    if (cache.has(path)) { apply(cache.get(path)); return; }
    controller = new AbortController();
    try {
      const response = await fetch(path, {signal: controller.signal});
      if (!response.ok) throw new Error('Metadata entry unavailable');
      const metadata = extract(new DOMParser().parseFromString(await response.text(), 'text/html'));
      if (metadata.path !== path) throw new Error('Metadata route mismatch');
      cache.set(path, metadata);
      if (version === sequence) apply(metadata);
    } catch (error) {
      if (version === sequence) activePath = ''; // Allow a later navigation to retry.
      if (error.name !== 'AbortError') console.warn('Portfolio metadata unavailable for this page.');
    }
  }

  try { const initial = extract(document); cache.set(initial.path, initial); } catch {}
  window.portfolioStructuredData = {sync};
  sync();
})();
