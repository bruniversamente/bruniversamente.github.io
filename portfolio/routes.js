/* Public paths are separate from internal catalog IDs and the original query links. */
(() => {
  'use strict';
  const routes = window.PORTFOLIO_ROUTES;
  const byPath = new Map(routes.map(route => [route.path, route]));
  const byState = new Map(routes.map(route => [JSON.stringify([route.lang, route.area || '', route.project || '', route.page || '', route.view || '', route.section || '']), route]));
  const byProject = new Map(routes.filter(r => r.project).map(r => [r.area + '/' + r.project, r]));
  const normalizePath = path => {
    path = path.replace(/index\.html$/, '');
    return path.endsWith('/') ? path : path + '/';
  };
  const decode = value => {try{return decodeURIComponent(value);}catch{return value;}};
  function read(value = location.href) {
    const raw = String(value);
    const url = new URL(raw, raw.startsWith('?') ? location.origin + '/' : location.href);
    if (url.origin !== location.origin) return url;
    const route = byPath.get(normalizePath(url.pathname));
    if (!route) return url;
    const params = new URLSearchParams(url.search);
    const explicit = ['area', 'project', 'page'].some(key => params.has(key));
    url.pathname = '/';
    if (!explicit) {
      for (const key of ['area', 'project', 'page', 'view']) if (route[key]) params.set(key, route[key]);
      if (route.section && !url.hash) url.hash = route.section;
    }
    if (!params.has('lang')) params.set('lang', route.lang);
    url.search = params.toString();
    const project = byProject.get(params.get('area') + '/' + params.get('project'));
    const alias = decode(url.hash.slice(1));
    const chapter = project?.chapters?.find(c => c.alias === alias);
    if (chapter) url.hash = chapter.id;
    return url;
  }
  function href(value, language) {
    if (!value) return value;
    const original = new URL(String(value), String(value).startsWith('?') ? location.origin + '/' : location.href);
    if (original.origin !== location.origin) return String(value);
    if (!byPath.has(normalizePath(original.pathname))) return String(value);
    const url = read(value), params = url.searchParams;
    const lang = language || params.get('lang') || 'pt';
    const area = params.get('area') || '', project = params.get('project') || '';
    const page = params.get('page') || '', view = params.get('view') || '';
    const section = page === 'sobre' && url.hash === '#curriculos' ? 'curriculos' : '';
    const route = byState.get(JSON.stringify([lang, area, project, page, project ? '' : view, section]));
    // Unknown IDs remain valid legacy links until the release compatibility code handles them.
    if (!route) return url.pathname + url.search + url.hash;
    for (const key of ['area', 'project', 'page', 'view', 'lang']) params.delete(key);
    let hash = section ? '' : url.hash;
    if (project && hash) {
      const chapter = route.chapters?.find(c => c.id === decode(hash.slice(1)));
      if (chapter) hash = '#' + chapter.alias;
    }
    return route.path + (params.size ? '?' + params.toString() : '') + hash;
  }
  function canonicalize() {
    const path = href(location.href, window.portfolioI18n?.lang);
    if (path !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', path);
  }
  function syncMetadata() {
    const url = new URL(href(location.href), location.origin);url.hash='';
    const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href='https://bruniversamente.github.io'+url.pathname+url.search;
    const og=document.querySelector('meta[property="og:url"]');if(og)og.content='https://bruniversamente.github.io'+url.pathname+url.search;
  }
  window.portfolioRoutes = {read, href, canonicalize, syncMetadata};
})();
