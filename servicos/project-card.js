'use strict';
// Follow the existing selector without changing packages, totals or saved choices.
(() => {
  const card=document.querySelector('.pricing-project-card');
  const title=document.querySelector('.pricing-art h3');
  const tabs=document.querySelector('.path-tabs');
  const image=card?.querySelector('img');
  if(!card||!image||!title||!tabs)return;
  const content={
    sites:{label:'Web design',first:'Seu negócio.',last:'Na web.',src:'assets/project-card/site-blue.png'},
    marca:{label:'Marca + site',first:'Sua marca.',last:'Bem apresentada.',src:'assets/project-card/marca-pink.png'},
    divulgacao:{label:'Divulgação',first:'Sua próxima',last:'campanha.',src:'assets/project-card/divulgacao-orange.png'}
  };
  // Load the approved alternatives once; keep the current card visible until the next is decoded.
  const ready=new Map(Object.entries(content).map(([id,item])=>{
    const preload=new Image();preload.src=item.src;
    return [id,preload.decode().then(()=>true,()=>false)];
  }));
  let currentPath;
  async function update(){
    const selected=tabs.querySelector('[aria-pressed="true"]');
    const id=selected?.dataset.path;
    const item=content[id];
    if(!item||currentPath===id)return;
    currentPath=id;
    if(!await ready.get(id)||currentPath!==id)return;
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
