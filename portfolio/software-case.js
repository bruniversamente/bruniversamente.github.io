/* Product map and explanatory diagrams for software presentations. No app or API simulation. */
(() => {
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function renderAtlas(item,data,figure,signal){
    const root=el('section','software-atlas'+(item.wide?' software-atlas--wide':'')),controls=el('div','software-atlas-controls'),panel=el('div','software-atlas-panel');
    controls.setAttribute('role','group');controls.setAttribute('aria-label',item.label||'Explorar os módulos do Rakestra App');
    const buttons=[];
    item.modules.forEach((module,index)=>{
      const button=el('button','button',module.name);button.type='button';button.setAttribute('aria-pressed',String(index===0));
      button.addEventListener('click',()=>select(index),{signal});controls.append(button);buttons.push(button);
    });
    function select(index){
      const module=item.modules[index];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      const copy=el('div','software-atlas-copy'),image=el('div','software-atlas-image');
      copy.append(el('p','software-eyebrow',module.context),el('h3','story-subheading',module.name),el('p','',module.description));
      const list=el('ul');module.connections.forEach(value=>list.append(el('li','',value)));copy.append(list);
      const link=el('a','button','Ler este capítulo ↓');link.href='#chapter-'+module.chapter;copy.append(link);
      const media=data.media.find(m=>m.id===module.media);if(media)image.append(figure(media));
      panel.replaceChildren(copy,image);
    }
    root.append(controls,panel);select(0);return root;
  }
  function renderRecovery(item,signal){
    const root=el('section','software-recovery'),controls=el('div','software-scenarios'),panel=el('div','software-scenario-panel');
    controls.setAttribute('role','group');controls.setAttribute('aria-label',item.label||'Cenários do envio de convite');
    const buttons=[];
    item.scenarios.forEach((s,i)=>{const b=el('button','button',s.title);b.type='button';b.addEventListener('click',()=>select(i),{signal});controls.append(b);buttons.push(b);});
    function select(index){
      const scenario=item.scenarios[index];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      const steps=el('ol','software-flow');scenario.steps.forEach(s=>{const li=el('li');li.append(el('span','software-eyebrow',s.label),el('p','',s.text));steps.append(li);});
      panel.replaceChildren(el('h3','story-subheading',scenario.title),steps,el('p','software-scenario-result',scenario.result));
    }
    root.append(el('p','editorial-note','Diagrama explicativo · selecione um cenário para acompanhar o comportamento previsto no código.'),controls,panel);select(0);return root;
  }
  window.softwareCase={renderAtlas,renderRecovery};
})();
