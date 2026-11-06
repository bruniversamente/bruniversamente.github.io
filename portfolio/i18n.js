/* Public portfolio copy. Original project data and embedded product screens stay intact. */
(() => {
  'use strict';
  const supported = ['pt', 'en', 'es'];
  const requested = window.portfolioRoutes.read().searchParams.get('lang');
  let saved = 'pt';
  try { saved = localStorage.getItem('portfolio-language') || 'pt'; } catch {}
  const lang = supported.includes(requested) ? requested : supported.includes(saved) ? saved : 'pt';
  const locale = {pt:'pt-BR', en:'en-US', es:'es-ES'}[lang];
  const dictionary = window.PORTFOLIO_TRANSLATIONS?.[lang] || {};
  const assets = window.PORTFOLIO_LOCALIZED_ASSETS?.[lang] || {};
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = Object.entries(dictionary).filter(([source]) => /ZXVAR\d+XZ/.test(source) && source.replace(/ZXVAR\d+XZ/g,'').replace(/[^A-Za-zÀ-ÿ]/g,'').length >= 6).map(([source, target]) => {
    const parts = source.split(/(ZXVAR\d+XZ)/);
    const ids = parts.filter(part => /^ZXVAR\d+XZ$/.test(part));
    return {regex:new RegExp('^' + parts.map(part => /^ZXVAR\d+XZ$/.test(part) ? '([\\s\\S]+?)' : escape(part)).join('') + '$'), ids, target};
  });
  function t(value, depth=0) {
    if (lang === 'pt' || typeof value !== 'string' || !value.trim()) return value;
    const text = normalize(value);
    let result = dictionary[text];
    if (result === undefined && depth < 2) {
      const arrow = text.match(/^(.*?)\s+([↗↓↑→←])$/);
      if (arrow) { const copy = t(arrow[1], depth+1); if (copy !== arrow[1]) result = copy + ' ' + arrow[2]; }
      const label = text.match(/^(Ampliar imagem|Reproduzir vídeo|Assistir no canal oficial|Reproduzir|Abrir perfil):\s*(.*)$/);
      if (label) result = t(label[1], depth+1) + ': ' + t(label[2], depth+1);
      const cover = text.match(/^Capa de (.+)$/);
      if (cover) result = (lang === 'en' ? 'Cover of ' : 'Portada de ') + t(cover[1], depth+1);
      const pageTitle = text.match(/^(.+)( · Bruno Nascimento)$/);
      if (pageTitle) result = t(pageTitle[1], depth+1) + pageTitle[2];
      if (result === undefined && / · | \| /.test(text)) {
        const parts = text.split(/( · | \| )/);
        const translated = parts.map(part => /^ (?:·|\|) $/.test(part) ? part : t(part, depth+1)).join('');
        if (translated !== text) result = translated;
      }
    }
    if (result === undefined && depth < 2) {
      for (const pattern of patterns) {
        const match = text.match(pattern.regex);
        if (!match) continue;
        result = pattern.target.replace(/ZXVAR\d+XZ/g, id => t(match[pattern.ids.indexOf(id)+1], depth+1));
        break;
      }
    }
    if (result === undefined) return value;
    return (value.match(/^\s*/)?.[0] || '') + result + (value.match(/\s*$/)?.[0] || '');
  }
  const markupCopy = {
    en:{'Aplicativo<br>e backend.':'App and<br>backend.', 'Partidas e<br>comunidade.':'Matches and<br>community.',
      'Gestão<br>de clubes.':'Club<br>management.', 'Agenda e<br>operação.':'Scheduling<br>&amp; operations.',
      'Interfaces<br>e regras.':'Interfaces<br>and rules.', 'Software<br>aeronáutico.':'Aviation<br>software.',
      'Análise<br>por ponto.':'Point<br>analysis.'},
    es:{'Aplicativo<br>e backend.':'Aplicación<br>y backend.', 'Partidas e<br>comunidade.':'Partidos y<br>comunidad.',
      'Gestão<br>de clubes.':'Gestión<br>de clubes.', 'Agenda e<br>operação.':'Agenda y<br>operaciones.',
      'Interfaces<br>e regras.':'Interfaces<br>y reglas.', 'Software<br>aeronáutico.':'Software<br>aeronáutico.',
      'Análise<br>por ponto.':'Análisis<br>por punto.'}
  };
  window.portfolioI18n = {lang, locale, t, markup:value => markupCopy[lang]?.[value] || value};
  document.documentElement.lang = locale;
  document.documentElement.dataset.language = lang;

  // Keep the active language in navigation, including SPA history and copied project links.
  function localURL(value) {
    return window.portfolioRoutes.href(value, lang);
  }
  for (const method of ['pushState', 'replaceState']) {
    const original = history[method].bind(history);
    history[method] = (state, unused, url) => {const result=original(state, unused, url ? localURL(String(url)) : url);window.portfolioRoutes.syncMetadata();return result;};
  }
  window.addEventListener('popstate',()=>window.portfolioRoutes.syncMetadata());
  const texts = new WeakMap();
  const attributes = new WeakMap();
  const skip = 'script,style,code,pre,textarea,[data-i18n-skip],.language-switch';
  function textNode(node) {
    if (!node.parentElement || node.parentElement.closest(skip)) return;
    const previous = texts.get(node);
    if (previous?.result === node.nodeValue) return;
    const source = node.nodeValue;
    const result = t(source);
    texts.set(node, {source, result});
    if (result !== source) node.nodeValue = result;
  }
  function attribute(element, name, convert=t) {
    const value = element.getAttribute(name);
    if (value === null) return;
    let values = attributes.get(element);
    if (!values) { values = {}; attributes.set(element, values); }
    if (values[name]?.result === value) return;
    const result = convert(value);
    values[name] = {source:value, result};
    if (result !== value) element.setAttribute(name, result);
  }
  function element(node) {
    if (node.closest(skip)) return;
    for (const key of ['aria-label', 'aria-description', 'alt', 'title', 'placeholder']) attribute(node, key);
    if (node.matches('meta[name="description"],meta[property="og:title"],meta[property="og:description"]')) attribute(node, 'content');
    if (node.matches('img,source')) {
      attribute(node, 'src', value => assets[value] || value);
      attribute(node, 'srcset', value => value.split(',').map(part => {
        const [src, ...size] = part.trim().split(/\s+/); return [assets[src] || src, ...size].join(' ');
      }).join(', '));
    }
    if (node.matches('a[href]')) attribute(node, 'href', localURL);
    if (node.matches('option')) {
      // Display labels may be translated, but form values continue to use the original data keys.
      if (!node.hasAttribute('value')) node.setAttribute('value', node.textContent);
    }
  }
  function translate(root) {
    if (root.nodeType === Node.TEXT_NODE) { textNode(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) element(root);
    root.querySelectorAll?.('*').forEach(element);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current; while ((current = walker.nextNode())) textNode(current);
  }
  translate(document);
  const observer = new MutationObserver(records => {
    const roots = new Set();
    for (const record of records) {
      if (record.type === 'characterData') textNode(record.target);
      else if (record.type === 'attributes') element(record.target);
      else for (const node of record.addedNodes) roots.add(node);
    }
    for (const root of roots) translate(root);
    updateSwitch();
  });
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true, attributes:true,
    attributeFilter:['aria-label','aria-description','alt','title','placeholder','src','srcset','href','content']});
  function updateSwitch() {
    const optionsLabel = document.querySelector('.language-options');
    if (optionsLabel && optionsLabel.getAttribute('aria-label') !== (lang === 'en' ? 'Language' : 'Idioma')) optionsLabel.setAttribute('aria-label',lang === 'en' ? 'Language' : 'Idioma');
    const toggle = document.querySelector('.language-toggle');
    if (toggle) {
      if (toggle.textContent !== lang.toUpperCase()) toggle.textContent = lang.toUpperCase();
      const label = {pt:'Idioma: Português',en:'Language: English',es:'Idioma: Español'}[lang];
      if (toggle.getAttribute('aria-label') !== label) toggle.setAttribute('aria-label', label);
    }
    document.querySelectorAll('.language-switch [data-language]').forEach(button => {
      const active = button.dataset.language === lang;
      if (button.getAttribute('aria-checked') !== String(active)) button.setAttribute('aria-checked', String(active));
      if (button.hidden !== active) button.hidden = active;
    });
  }
  function changeLanguage(next) {
    if (!supported.includes(next) || next === lang) return;
    try { localStorage.setItem('portfolio-language', next); } catch {}
    const url = window.portfolioRoutes.read(); url.searchParams.set('lang', next); location.assign(window.portfolioRoutes.href(url,next));
  }
  document.querySelectorAll('.language-switch [data-language]').forEach(button => button.addEventListener('click', () => changeLanguage(button.dataset.language)));
  const toggle = document.querySelector('.language-toggle'), options = document.querySelector('.language-options');
  function closeLanguages(restoreFocus=false) {
    if (!toggle || !options) return;
    options.hidden = true; toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  }
  function openLanguages() {
    window.setMenu?.(false);
    options.hidden = false; toggle.setAttribute('aria-expanded', 'true');
  }
  toggle?.addEventListener('click', () => options.hidden ? openLanguages() : closeLanguages());
  toggle?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault(); openLanguages();
    const buttons = [...options.querySelectorAll('button:not([hidden])')];
    (event.key === 'ArrowUp' ? buttons.at(-1) : buttons[0])?.focus();
  });
  options?.addEventListener('keydown', event => {
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault(); const buttons = [...options.querySelectorAll('button:not([hidden])')];
    const index = buttons.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length-1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  });
  document.addEventListener('click', event => {if (!event.target.closest('.language-switch')) closeLanguages();});
  document.addEventListener('keydown', event => {if (event.key === 'Escape' && options && !options.hidden) closeLanguages(true);});
  updateSwitch();
})();
