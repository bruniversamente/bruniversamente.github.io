/* Public links from the general portfolio to its independent area sites. */
(() => {
  const sites={"beleza":"https://bruno-beleza.github.io/","design":"https://bruno-design-visual.github.io/","produtos":"https://bruno-webdesign.github.io/","software":"https://bruno-software.github.io/","dados":"https://bruno-dados.github.io/","consultoria":"https://bruno-consultoria.github.io/"};
  const lang=window.portfolioI18n?.lang||'pt';
  document.querySelectorAll('#project-grid > a[data-area]').forEach(card=>{
    const base=sites[card.dataset.area];
    if(base)card.href=base+(lang==='pt'?'':lang+'/');
  });
  document.addEventListener('click',event=>{
    const card=event.target.closest('#project-grid > a[data-area]');
    if(card&&card.origin!==location.origin)event.stopImmediatePropagation();
  },true);
})();
