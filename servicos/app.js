(() => {
  'use strict';
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n);
  const namespace=new URLSearchParams(location.search).has('qa')?':qa':'';
  const selectionKey='bn-public-services-selection-v1'+namespace;
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
  let state=read(selectionKey,{path:'sites',choices:{}});
  if(!state||typeof state!=='object'||Array.isArray(state))state={path:'sites',choices:{}};
  if(!state.choices||typeof state.choices!=='object'||Array.isArray(state.choices))state.choices={};
  let data,previousFocus,statusTimer;
  const announce=text=>{clearTimeout(statusTimer);$('#status').textContent=text;statusTimer=setTimeout(()=>$('#status').textContent='',3500);};
  const save=()=>{try{localStorage.setItem(selectionKey,JSON.stringify(state));}catch{announce('A escolha funciona, mas não foi possível salvá-la neste navegador.');}};
  const path=()=>data.paths.find(p=>p.id===state.path);
  const choice=()=>state.choices[state.path];
  const option=()=>path().options.find(o=>o.id===choice().package);
  function allowed(){const ids=state.path==='divulgacao'?data.growth_addons[option().id]:data.allowed_addons[state.path];return ids.filter(id=>!option().parts.includes(id));}
  function sanitize(){
    if(!data.paths.some(p=>p.id===state.path))state.path='sites';
    for(const p of data.paths){
      let c=state.choices[p.id];
      if(!c||typeof c!=='object'||!p.options.some(o=>o.id===c.package))c=state.choices[p.id]={package:p.options[0].id,addons:[]};
      const o=p.options.find(o=>o.id===c.package),ids=p.id==='divulgacao'?data.growth_addons[o.id]:data.allowed_addons[p.id];
      c.addons=Array.isArray(c.addons)?[...new Set(c.addons)].filter(id=>ids.includes(id)&&!o.parts.includes(id)):[];
    }
  }
  const cost=id=>{const p=data.packages[id];return {initial:p.promo??p.price??0,monthly:p.monthly??0};};
  function calculate(){
    const current=option(),selected=new Set([...current.parts,...choice().addons]);
    const raw=[...selected].reduce((a,id)=>{const c=cost(id);return{initial:a.initial+c.initial,monthly:a.monthly+c.monthly};},{initial:0,monthly:0});
    const candidates=data.combos.filter(c=>c.parts.every(id=>selected.has(id))).map(c=>({...c,initialSaving:c.separate_initial-(c.price??0),monthlySaving:c.separate_monthly-(c.monthly??0)}));
    let best={initialSaving:0,monthlySaving:0,combos:[]};
    function visit(index,used,initialSaving,monthlySaving,combos){
      if(index===candidates.length){if(initialSaving>best.initialSaving||(initialSaving===best.initialSaving&&monthlySaving>best.monthlySaving))best={initialSaving,monthlySaving,combos};return;}
      visit(index+1,used,initialSaving,monthlySaving,combos);
      const c=candidates[index];if(c.parts.every(id=>!used.has(id)))visit(index+1,new Set([...used,...c.parts]),initialSaving+c.initialSaving,monthlySaving+c.monthlySaving,[...combos,c]);
    }
    visit(0,new Set(),0,0,[]);
    const baseRaw=current.parts.reduce((a,id)=>{const c=cost(id);return{initial:a.initial+c.initial,monthly:a.monthly+c.monthly};},{initial:0,monthly:0});
    return{initial:raw.initial-best.initialSaving,monthly:raw.monthly-best.monthlySaving,extraInitialSaving:best.initialSaving-(baseRaw.initial-current.initial),extraMonthlySaving:best.monthlySaving-(baseRaw.monthly-current.monthly)};
  }
  const priceLabel=(initial,monthly)=>[initial?money(initial):'',monthly?money(monthly)+'/mês':''].filter(Boolean).join(' + ');
  function render(focusSelector){
    const o=option(),p=path(),t=calculate();
    const scopeOpen=!!$('.scope[open]'),addonsOpen=!!$('.addons-details[open]');
    document.querySelectorAll('.path-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.path===state.path)));
    const publicLimits=o.limits.replace(' Operação ou parceiro responsável deve estar definido antes da oferta comercial.','').replace(' Novas entregas precisam respeitar as condições já anunciadas.','');
    const numeric=(o.initial||o.monthly).toLocaleString('pt-BR',{minimumFractionDigits:(o.initial||o.monthly)%1?2:0,maximumFractionDigits:2});
    const [whole,cents]=numeric.split(',');
    const additions=allowed().map(id=>{const a=data.addons.find(a=>a.id===id);return `<label class="addon"><input type="checkbox" data-addon="${id}" ${choice().addons.includes(id)?'checked':''}><span><b>${esc(a.title)}</b><small>${esc(a.description)}</small><small class="addon-cost">+ ${priceLabel(a.initial,a.monthly)}</small></span></label>`;}).join('');
    $('#offer-panel').innerHTML=`<div class="offer-options ${p.options.length===2?'two':''}" role="group" aria-label="Pacotes de ${esc(p.short)}">${p.options.map(item=>`<button type="button" data-option="${item.id}" aria-pressed="${item.id===o.id}"><span>${esc(item.title)}</span><small>${priceLabel(item.initial,item.monthly)}</small></button>`).join('')}</div><h3>${esc(o.title)}</h3><p class="offer-description">${esc(o.description)}</p>${o.label?`<span class="offer-label">${esc(o.label)}</span>`:''}<div class="price-row"><span class="price"><span class="currency">R$</span>${whole}${cents?`<span class="cents">,${cents}</span>`:''}</span>${o.monthly?'<span class="term">/mês</span>':''}${o.regular?`<span class="regular-price">${money(o.regular)}</span>`:''}</div><p class="billing-note">${o.monthly?'Serviço recorrente · cobrança mensal':'Pelo projeto · cobrança única'}</p><div class="included"><span>O que inclui</span><ul>${o.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div><details class="scope" ${scopeOpen?'open':''}><summary>Ver o escopo e os ajustes</summary><ul>${o.details.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p>${esc(publicLimits)}</p><p>Revisões: ${o.revisions===1?'uma rodada consolidada':'duas rodadas consolidadas'}${o.monthly?' do conteúdo, quando houver produção':', dentro do escopo'}.</p></details><details class="addons-details" ${addonsOpen?'open':''}><summary>Quer incluir mais alguma coisa?</summary><div class="addons-list">${additions}</div></details>${choice().addons.length?`<div class="chosen-total" aria-live="polite">${t.initial?`<p>Projeto e complementos <b>${money(t.initial)}</b></p>`:''}${t.monthly?`<p>Serviços mensais <b>${money(t.monthly)}/mês</b></p>`:''}${t.extraInitialSaving>0||t.extraMonthlySaving>0?`<p class="saving">Valor combinado aplicado: redução de ${priceLabel(Math.max(0,t.extraInitialSaving),Math.max(0,t.extraMonthlySaving))} nesta seleção.</p>`:''}</div>`:''}<button type="button" class="offer-cta" data-contact="package"><span aria-hidden="true">b.</span>Conversar sobre este pacote ↗</button><p class="panel-caption">A escolha inicia uma conversa. Confirmamos as condições na proposta.</p>`;
    $('#offer-panel').dataset.path=state.path;$('#offer-panel').setAttribute('aria-busy','false');
    if(focusSelector)$(focusSelector)?.focus({preventScroll:true});
  }
  function summary(){
    const o=option(),t=calculate();
    let text=`Quero saber mais sobre ${o.title} (${path().short}).\n`;
    if(choice().addons.length)text+='Complementos: '+choice().addons.map(id=>data.addons.find(a=>a.id===id).title).join(', ')+'.\n';
    if(t.initial)text+='Projeto e complementos: '+money(t.initial)+'.\n';
    if(t.monthly)text+='Serviços mensais: '+money(t.monthly)+'/mês.\n';
    text+='Domínio, hospedagem, ferramentas e verba de anúncios, quando necessários, ficam à parte.';
    return text;
  }
  function show(dialog){previousFocus=document.activeElement;dialog.showModal();}
  function contact(includePackage=false,fromFooter=false){
    if(!data)return;
    const business=fromFooter?$('#business-name').value.trim():'',need=fromFooter?$('#business-need').value.trim():'';
    const draft='Olá, Bruno! Quero conversar sobre meu projeto.\n\n'+(includePackage?summary():'Preciso de uma orientação para escolher os serviços.')+(business?'\n\nMeu negócio: '+business+'.':'')+(need?'\nO que preciso: '+need:'');
    $('#contact-draft').textContent=draft;$('#whatsapp-link').href=`https://wa.me/${data.phone}?text=${encodeURIComponent(draft)}`;show($('#contact-dialog'));
  }
  async function copy(text){try{await navigator.clipboard.writeText(text);announce('Mensagem copiada.');}catch{announce('Não foi possível copiar. Você pode selecionar o texto do resumo.');}}
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true})));
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-contact]');if(button)contact(button.dataset.contact==='package');
  });
  $('.path-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-path]');if(!button||!data)return;state.path=button.dataset.path;sanitize();save();render();});
  $('#offer-panel').addEventListener('click',event=>{const button=event.target.closest('[data-option]');if(!button)return;choice().package=button.dataset.option;sanitize();save();render(`[data-option="${button.dataset.option}"]`);});
  $('#offer-panel').addEventListener('change',event=>{const input=event.target.closest('[data-addon]');if(!input)return;const id=input.dataset.addon;choice().addons=input.checked?[...new Set([...choice().addons,id])]:choice().addons.filter(a=>a!==id);sanitize();save();render(`[data-addon="${id}"]`);});
  document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$('#benefit-track').scrollBy({left:Number(b.dataset.scroll)*232,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
  $('#prepare-footer').addEventListener('click',()=>contact(false,true));
  $('#copy-draft').addEventListener('click',()=>copy($('#contact-draft').textContent));
  fetch('./catalogo.json').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(catalog=>{data=catalog;sanitize();render();}).catch(()=>{$('#offer-panel').innerHTML='<h3>Vamos conversar.</h3><p class="offer-description">Não foi possível carregar os pacotes. Recarregue a página para conferir as opções.</p>';$('#offer-panel').setAttribute('aria-busy','false');});
})();
