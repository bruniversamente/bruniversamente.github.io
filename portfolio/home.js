const entries = {"dados": {"group": "digital", "title": "Dados e BI", "description": "Análises, dashboards e qualidade de dados.", "credit": "Projetos e estudos de Dados e BI de Bruno Nascimento."}};
const grid = document.querySelector('#project-grid');
const cards = [...grid.querySelectorAll('.project-card')];
const search = document.querySelector('#search');
const areaDialog = document.querySelector('#area-dialog');
let filter = 'all';
let columns = 3;
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function updateViewportFit(){grid.dataset.zoomColumns=String(columns);grid.dataset.fitViewport=String((columns===3||columns===2)&&cards.every(card=>!card.hidden));}
function updateCards(){
  if(window.areaFeed?.active){window.areaFeed.update();return;}
  const query = normalize(search.value);
  cards.forEach(card=>{const entry=entries[card.dataset.area];card.hidden=!(filter==='all'||entry.group===filter)||!normalize(entry.title+' '+entry.description).includes(query);});
  document.querySelector('.empty').hidden=cards.some(card=>!card.hidden);
  updateViewportFit();
}
function openArea(key){
  if(window.areaFeed){window.areaFeed.navigate(key);return;}
  const entry=entries[key];if(!entry)return;
  document.querySelector('#area-title').textContent=entry.title;
  document.querySelector('#area-description').textContent=entry.description;
  document.querySelector('#area-credit').textContent=entry.credit;
  const image=document.querySelector('#area-image');image.src=`assets/${key}.webp`;image.alt=cards.find(c=>c.dataset.area===key).querySelector('img').alt;
  const link=document.querySelector('#area-link');link.hidden=!entry.url;if(entry.url){link.href=entry.url;link.textContent=entry.link||'Ver projeto ↗';}
  if(!areaDialog.open)areaDialog.showModal();
}
cards.forEach(card=>card.addEventListener('click',event=>{event.preventDefault();if(grid.classList.contains('index-view')&&matchMedia('(hover:none)').matches&&!card.classList.contains('index-open')){cards.forEach(c=>c.classList.remove('index-open'));card.classList.add('index-open');return;}openArea(card.dataset.area);}));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
document.querySelectorAll('[data-about]').forEach(button=>button.addEventListener('click',()=>{setMenu(false);document.querySelector('#about-dialog').showModal();}));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{if(window.areaFeed?.active){window.areaFeed.view(button.dataset.view);return;}grid.classList.toggle('index-view',button.dataset.view==='index');cards.forEach(c=>c.classList.remove('index-open'));if(button.dataset.view==='index')prepareIndexGalleries();document.querySelectorAll('[data-view]').forEach(b=>{if(b===button)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});}));
function prepareIndexGalleries(){
  const gallery=window.INDEX_GALLERY||{};
  const fontSize=parseFloat(getComputedStyle(document.documentElement).fontSize);
  const stripHeight=16.8*fontSize;
  cards.forEach(card=>{
    const images=gallery[card.dataset.area];if(!images?.length)return;
    let preview=card.querySelector('.index-preview');
    if(!preview){preview=document.createElement('span');preview.className='index-preview';preview.setAttribute('aria-hidden','true');const clip=document.createElement('span');clip.className='index-preview-clip';const marquee=document.createElement('span');marquee.className='index-marquee';clip.append(marquee);preview.append(clip);card.append(preview);}
    const marquee=preview.querySelector('.index-marquee');
    const track=document.createElement('span');track.className='index-track';
    const segment=document.createElement('span');segment.className='index-segment';
    const patternWidth=images.reduce((sum,image)=>sum+stripHeight*image.width/image.height+.4*fontSize,0);
    const repeats=Math.max(1,Math.ceil((grid.clientWidth+300)/patternWidth));
    for(let repeat=0;repeat<repeats;repeat++)images.forEach(image=>{const img=document.createElement('img');img.src=image.src;img.alt='';img.title=image.title;img.width=image.width;img.height=image.height;img.loading='lazy';img.decoding='async';img.draggable=false;segment.append(img);});
    track.style.setProperty('--index-duration',`${Math.max(12,patternWidth*repeats/75)}s`);
    track.append(segment,segment.cloneNode(true));marquee.replaceChildren(track);
  });
}
let indexGalleryWidth=0;
new ResizeObserver(observations=>{const width=observations[0].contentRect.width;if(Math.abs(width-indexGalleryWidth)>1){indexGalleryWidth=width;if(grid.classList.contains('index-view'))prepareIndexGalleries();}}).observe(grid);
document.querySelector('#filter-toggle').addEventListener('click',event=>{const panel=document.querySelector('#filters');panel.hidden=!panel.hidden;event.currentTarget.setAttribute('aria-expanded',String(!panel.hidden));});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));updateCards();}));
document.querySelector('.search-button').addEventListener('click',event=>{setMenu(false);search.hidden=!search.hidden;event.currentTarget.setAttribute('aria-expanded',String(!search.hidden));event.currentTarget.setAttribute('aria-label',search.hidden?'Abrir busca':'Fechar busca');if(!search.hidden)search.focus();else{search.value='';updateCards();}});
search.addEventListener('input',updateCards);
const headerRight=document.querySelector('.header-right');const menuButton=document.querySelector('.menu-button');const disclosures=[...document.querySelectorAll('.header-disclosure')];
function measureMenu(){disclosures.forEach(group=>group.style.setProperty('--reveal-width',`${group.firstElementChild.scrollWidth}px`));}
function setMenu(open){
  if(open){measureMenu();search.hidden=true;search.value='';updateCards();document.querySelector('.search-button').setAttribute('aria-expanded','false');document.querySelector('.search-button').setAttribute('aria-label','Abrir busca');}
  const focusInMenu=disclosures.some(group=>group.contains(document.activeElement));
  headerRight.dataset.menuOpen=String(open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  disclosures.forEach(group=>{group.inert=!open;group.setAttribute('aria-hidden',String(!open));});
  if(!open&&focusInMenu)menuButton.focus();
}
menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
document.fonts.ready.then(measureMenu);window.addEventListener('resize',measureMenu);
document.addEventListener('click',event=>{if(!event.target.closest('.header')&&menuButton.getAttribute('aria-expanded')==='true')setMenu(false);});
document.querySelector('#theme').addEventListener('click',event=>{const dark=document.documentElement.dataset.theme==='dark';document.documentElement.dataset.theme=dark?'light':'dark';const label=dark?'Mudar para tema escuro':'Mudar para tema claro';event.currentTarget.setAttribute('aria-label',label);event.currentTarget.title=label;});
function zoom(delta){if(window.areaFeed?.active){window.areaFeed.zoom(delta);return;}columns=Math.max(2,Math.min(4,columns+delta));grid.style.setProperty('--columns',String(columns));document.querySelector('#larger').disabled=columns===2;document.querySelector('#smaller').disabled=columns===4;updateViewportFit();}
document.querySelector('#larger').addEventListener('click',()=>zoom(-1));document.querySelector('#smaller').addEventListener('click',()=>zoom(1));
const mobile=matchMedia('(max-width:1023.98px)');function responsive(){grid.style.removeProperty('--columns');columns=3;document.querySelector('#larger').hidden=mobile.matches;document.querySelector('#smaller').hidden=mobile.matches;document.querySelector('#larger').disabled=false;document.querySelector('#smaller').disabled=false;updateViewportFit();}mobile.addEventListener('change',responsive);responsive();
document.addEventListener('keydown',event=>{if(event.key==='Escape'){setMenu(false);cards.forEach(card=>card.classList.remove('index-open'));document.querySelector('#filters').hidden=true;document.querySelector('#filter-toggle').setAttribute('aria-expanded','false');}});
