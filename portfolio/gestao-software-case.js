/* The selected availability function comes from the product. No booking is created. */
(() => {
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function renderAvailability(item,signal){
    const root=el('section','gestao-availability'),controls=el('div','software-scenarios'),result=el('div','gestao-availability-result');
    controls.setAttribute('role','group');controls.setAttribute('aria-label','Cenários de ocupação da quadra');
    const timeLabel=el('label','gestao-time-label','Horário da consulta'),time=el('select','button');
    time.setAttribute('aria-label','Horário da consulta');
    for(const [value,title] of [['540','09h–10h'],['600','10h–11h'],['660','11h–12h']]){const option=el('option','',title);option.value=value;time.append(option);}time.value='600';timeLabel.append(time);
    const scenarios=[
      {title:'Sem ocupação',events:[]},
      {title:'Uma reserva',events:[{courtId:'court-a',localDate:'2026-11-04',startMinute:600,endMinute:660}]},
      {title:'Reserva e aula',events:[{courtId:'court-a',localDate:'2026-11-04',startMinute:600,endMinute:660},{courtId:'court-b',localDate:'2026-11-04',startMinute:630,endMinute:690}]}
    ];
    const courts=[{id:'court-a',name:'Quadra A',status:'active'},{id:'court-b',name:'Quadra B',status:'active'},{id:'court-c',name:'Quadra C',status:'inactive'}];
    let selected=1,readAvailability;
    const buttons=scenarios.map((scenario,i)=>{const button=el('button','button',scenario.title);button.type='button';button.disabled=true;button.addEventListener('click',()=>{selected=i;update();},{signal});controls.append(button);return button;});
    result.setAttribute('aria-live','polite');result.append(el('p','','Carregando regras de disponibilidade…'));
    function update(){
      if(!readAvailability||signal.aborted)return;
      buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
      const available=readAvailability({courts,events:scenarios[selected].events,localDate:'2026-11-04',startMinute:Number(time.value),durationMinutes:60});
      const list=el('ul','gestao-court-list');
      courts.forEach(court=>{const state=court.status!=='active'?'Fora de operação':available.includes(court.id)?'Disponível':'Ocupada';const row=el('li');row.append(el('h4','',court.name),el('p','',state));row.dataset.available=String(available.includes(court.id));list.append(row);});
      const text=available.length?`${available.length} ${available.length===1?'quadra disponível':'quadras disponíveis'} neste intervalo.`:'Nenhuma quadra disponível neste intervalo.';
      result.replaceChildren(list,el('p','gestao-availability-summary',text));
    }
    time.addEventListener('change',update,{signal});root.append(el('p','software-eyebrow','Disponibilidade · regra do produto'),controls,timeLabel,result,el('p','editorial-note','Exemplo em memória, com quadras fictícias. A função consulta a ocupação; a confirmação e a disputa simultânea de reservas dependem do servidor.'));
    import('./assets/software/rakestra-gestao/rules/management-schedule-availability.js').then(module=>{
      if(signal.aborted)return;readAvailability=module.getAvailableScheduleCourtIds;buttons.forEach(b=>b.disabled=false);update();
    }).catch(()=>{if(!signal.aborted)result.replaceChildren(el('p','','Não foi possível carregar o exemplo. Recarregue a página para tentar novamente.'));});
    return root;
  }
  window.gestaoSoftwareCase={renderAvailability};
})();
