/* Read an existing analysis round. This figure never runs an aviation calculation. */
(() => {
  const moneylessNumber=new Intl.NumberFormat((window.portfolioI18n?.locale||'pt-BR'),{minimumFractionDigits:2,maximumFractionDigits:2});
  const fmt=value=>moneylessNumber.format(value)+' m';
  function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
  function renderReading(item,signal){
    const points=item.points.filter(p=>['base','top','limit','height','maxHeight','margin'].every(key=>Number.isFinite(p[key])));
    const root=el('section','agastudio-reading');root.setAttribute('aria-label','Leitura de alturas de uma rodada salva');
    if(!points.length)return root;
    const heading=el('div','agastudio-reading-heading');heading.append(el('p','agastudio-label','Um empreendimento, três vértices'),el('h3','','Mesma proposta, limites diferentes'));
    const controls=el('div','agastudio-point-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','Escolher vértice para ler o resultado');
    const body=el('div','agastudio-reading-body'),figure=el('figure','agastudio-height-figure'),summary=el('div','agastudio-reading-summary');
    summary.setAttribute('aria-live','polite');summary.setAttribute('aria-atomic','true');
    const caption=el('p','agastudio-reading-note','Esquema de leitura do case, com valores da rodada salva. O AGAStudio realiza a análise técnica.');
    body.append(figure,summary);root.append(heading,controls,body,caption);
    const buttons=points.map((point,index)=>{
      const button=el('button','button',point.id+' · origem '+point.originId);button.type='button';
      button.addEventListener('click',()=>select(index),{signal});controls.append(button);return button;
    });
    function select(index){
      const point=points[index];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 640 340');svg.setAttribute('role','img');
      svg.setAttribute('aria-label',`${point.id}: base ${fmt(point.base)}, topo ${fmt(point.top)}, limite ${fmt(point.limit)} e margem ${fmt(point.margin)}.`);
      const min=Math.min(...points.map(p=>p.base))-3,max=Math.max(...points.map(p=>p.limit))+7;
      const y=value=>300-(value-min)/(max-min)*255,ground=y(point.base),top=y(point.top),limit=y(point.limit);
      const draw=(tag,attrs,text)=>{const n=document.createElementNS(svg.namespaceURI,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text!==undefined)n.textContent=text;svg.append(n);return n;};
      draw('line',{x1:24,x2:616,y1:ground,y2:ground,class:'aga-ground'});
      draw('rect',{x:214,y:top,width:116,height:Math.max(0,ground-top),class:'aga-building'});
      draw('line',{x1:24,x2:616,y1:limit,y2:limit,class:'aga-limit'});
      draw('line',{x1:214,x2:460,y1:top,y2:top,class:'aga-top'});
      draw('text',{x:24,y:limit-13,class:'aga-svg-label'},'Altitude limite · '+fmt(point.limit));
      draw('text',{x:24,y:ground+25,class:'aga-svg-label'},'Base · '+fmt(point.base));
      draw('text',{x:214,y:top-13,class:'aga-svg-label'},'Topo · '+fmt(point.top));
      draw('line',{x1:386,x2:386,y1:limit,y2:top,class:'aga-margin'});
      draw('line',{x1:379,x2:393,y1:limit,y2:limit,class:'aga-margin'});
      draw('line',{x1:379,x2:393,y1:top,y2:top,class:'aga-margin'});
      draw('text',{x:404,y:(limit+top)/2+5,class:'aga-svg-label aga-margin-label'},'Margem '+fmt(point.margin));
      figure.replaceChildren(svg);
      const title=el('p','agastudio-current-point',point.id+' · ID de origem '+point.originId);
      const dl=el('dl','agastudio-values');
      [['Altura proposta',point.height],['Altura máxima neste ponto',point.maxHeight],['Margem da proposta',point.margin]].forEach(([label,value])=>{
        const pair=el('div','');pair.append(el('dt','',label),el('dd','',fmt(value)));dl.append(pair);
      });
      summary.replaceChildren(title,dl,el('p','agastudio-value-context','Valores do ponto selecionado. A conclusão do estudo depende da análise do conjunto.'));
    }
    select(0);return root;
  }
  window.agastudioCase={renderReading};
})();
