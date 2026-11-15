'use strict';
// Follow the existing selector without changing packages, totals or saved choices.
(() => {
  const card=document.querySelector('.pricing-project-card');
  const title=document.querySelector('.pricing-art h3');
  const tabs=document.querySelector('.path-tabs');
  const image=card?.querySelector('img');
  if(!card||!image||!title||!tabs)return;
  const content={
    sites:{label:'Web design',first:'Seu negócio.',last:'Na web.',src:'assets/project-card/site-blue.webp'},
    marca:{label:'Marca + site',first:'Sua marca.',last:'Bem apresentada.',src:'assets/project-card/marca-pink.webp'},
    divulgacao:{label:'Divulgação',first:'Sua próxima',last:'campanha.',src:'assets/project-card/divulgacao-orange.webp'}
  };
  // Decode a service card only when requested, preserving the visible card during a switch.
  const ready=new Map();
  function prepare(id){
    if(!ready.has(id)){
      const preload=new Image();preload.src=content[id].src;
      ready.set(id,preload.decode().then(()=>true,()=>false));
    }
    return ready.get(id);
  }
  let currentPath;
  async function update(){
    const selected=tabs.querySelector('[aria-pressed="true"]');
    const id=selected?.dataset.path;
    const item=content[id];
    if(!item||currentPath===id)return;
    currentPath=id;
    if(!await prepare(id)||currentPath!==id)return;
    image.src=item.src;
    image.alt=`Cartão de ${item.label}: ${id==='sites'?'azul e violeta':id==='marca'?'rosa e violeta':'laranja e amarelo'}.`;
    card.dataset.path=id;
    const first=document.createTextNode(item.first);
    const line=document.createElement('br');
    const last=document.createElement('em');last.textContent=item.last;
    title.replaceChildren(first,line,last);
  }
  new MutationObserver(update).observe(tabs,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
  update();
})();

// Keep the campaign logo above the service guide on phones, restoring its desktop slot.
(() => {
  const logo=document.querySelector('#campaign-art-logo');
  const guide=document.querySelector('#path-guide');
  if(!logo||!guide)return;
  const home=document.createComment('campaign-logo-desktop-slot');
  logo.before(home);
  const mobile=matchMedia('(max-width:767px)');
  const place=()=>{if(mobile.matches)guide.before(logo);else home.after(logo);};
  mobile.addEventListener('change',place);
  place();
})();
