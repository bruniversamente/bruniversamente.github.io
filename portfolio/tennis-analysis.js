/* Extension for the already-published observational tennis case. */
(() => {
  const original=window.projectAnalysis.render;
  const fmt=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:0}),pct=v=>(v*100).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%',pp=v=>(v*100).toLocaleString('pt-BR',{maximumFractionDigits:1,signDisplay:'always'})+' p.p.';
  function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
  window.projectAnalysis.render=(item,data,signal)=>{
    if(item.kind!=='tennis-context')return original(item,data,signal);
    const card=el('section','analysis-card');card.append(el('h3','analysis-title','Pontos de saque vencidos'),el('p','analysis-note','O seletor altera apenas esta comparação por circuito. Os recortes por piso e período permanecem independentes.'));
    const label=el('label','analysis-control'),select=el('select'),content=el('div');label.append(el('span','','Circuito da comparação'),select);[['all','ATP + WTA'],...data.tour.map(r=>[r.tour,r.tour])].forEach(([value,text])=>{const option=el('option','',text);option.value=value;select.append(option);});card.append(label,content);
    function draw(){const r=select.value==='all'?data.kpis[0]:data.tour.find(r=>r.tour===select.value),dl=el('dl','analysis-kpis');
      [{label:'Partidas',value:fmt.format(r.matches),note:'Amostra deste recorte'},
       {label:'Em break points',value:pct(r.bp_serve_win_rate),note:fmt.format(r.bp_serve_points_won)+' / '+fmt.format(r.bp_serve_points)+' pontos'},
       {label:'Demais pontos',value:pct(r.non_bp_serve_win_rate),note:fmt.format(r.non_bp_serve_points_won)+' / '+fmt.format(r.non_bp_serve_points)+' pontos'},
       {label:'Diferença',value:pp(r.pressure_delta),note:'Taxa BP menos taxa sem BP'}].forEach(v=>{const box=el('div','analysis-kpi');box.append(el('dt','',v.label),el('dd','',v.value),el('p','analysis-note',v.note));dl.append(box);});
      const bars=el('div','analysis-bars');[['Em break points',r.bp_serve_win_rate,r.bp_ci_low,r.bp_ci_high],['Demais pontos',r.non_bp_serve_win_rate,r.non_bp_ci_low,r.non_bp_ci_high]].forEach(([title,value,lo,hi])=>{const line=el('div','analysis-bar'),head=el('div','analysis-bar-head'),track=el('span','analysis-track'),fill=el('span','analysis-fill');head.append(el('span','',title),el('strong','',pct(value)));fill.style.width=value*100+'%';fill.dataset.grow='';track.setAttribute('aria-hidden','true');track.append(fill);line.append(head,track,el('p','analysis-note','Intervalo de 95%: '+pct(lo)+' a '+pct(hi)));bars.append(line);});
      const detail=el('p','analysis-detail','Intervalo conservador para a diferença: '+pp(r.delta_ci_low)+' a '+pp(r.delta_ci_high)+' Comparação descritiva, sem interpretação causal.');detail.setAttribute('aria-live','polite');content.replaceChildren(dl,bars,detail);
    }
    select.addEventListener('change',draw,{signal});draw();return card;
  };
})();
