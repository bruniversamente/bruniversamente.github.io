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
  const priceMarkup=amount=>{
    const numeric=amount.toLocaleString('pt-BR',{minimumFractionDigits:amount%1?2:0,maximumFractionDigits:2});
    const [whole,cents]=numeric.split(',');
    return `<span class="price"><span class="currency">R$</span>${whole}${cents?`<span class="cents">,${cents}</span>`:''}</span>`;
  };
  // Reserve the tallest selector state before changing sizes, so the title stays put.
  function stabilizePackageRow(options,force=false){
    if(!options)return;
    const width=getComputedStyle(options).width;
    if(!force&&options.dataset.stableWidth===width)return;
    const probe=options.cloneNode(true);
    probe.setAttribute('aria-hidden','true');probe.inert=true;
    Object.assign(probe.style,{position:'absolute',visibility:'hidden',pointerEvents:'none',width,left:'0',top:'0',transition:'none'});
    probe.style.setProperty('height','auto','important');
    probe.style.setProperty('min-height','0','important');
    const buttons=Array.from(probe.querySelectorAll('button[data-option]'));
    buttons.forEach(button=>{button.style.transition='none';button.tabIndex=-1;});
    options.parentElement.append(probe);
    let height=0;
    try{
      buttons.forEach(selected=>{
        buttons.forEach(button=>button.setAttribute('aria-pressed',String(button===selected)));
        height=Math.max(height,probe.offsetHeight);
      });
    }finally{probe.remove();}
    options.style.setProperty('--options-stable-height',`${height+1}px`);
    options.dataset.stableWidth=width;
  }
  function render(focusSelector){
    const o=option(),p=path(),t=calculate();
    const scopeOpen=!!$('.scope[open]'),addonsOpen=!!$('.addons-details[open]');
    document.querySelectorAll('.path-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.path===state.path)));
    const publicLimits=o.limits.replace(' Operação ou parceiro responsável deve estar definido antes da oferta comercial.','').replace(' Novas entregas precisam respeitar as condições já anunciadas.','');
    const highlightedPrices=[
      t.initial?`<div class="payment-total" data-payment="initial"><p class="payment-label">Pagamento único</p><div class="price-row">${priceMarkup(t.initial)}${o.regular&&!choice().addons.length?`<span class="regular-price">${money(o.regular)}</span>`:''}</div></div>`:'',
      t.monthly?`<div class="payment-total" data-payment="monthly"><p class="payment-label">Mensalidade</p><div class="price-row">${priceMarkup(t.monthly)}<span class="term">/mês</span></div></div>`:''
    ].join('');
    const extraFeatures=choice().addons.map(id=>{
      const addon=data.addons.find(item=>item.id===id);
      return `<li data-included-addon="${esc(id)}">${esc(addon.title)}</li>`;
    }).join('');
    const additions=allowed().map(id=>{const a=data.addons.find(a=>a.id===id);return `<label class="addon"><input type="checkbox" data-addon="${id}" ${choice().addons.includes(id)?'checked':''}><span><b>${esc(a.title)}</b><small>${esc(a.description)}</small><small class="addon-cost">+ ${priceLabel(a.initial,a.monthly)}</small></span></label>`;}).join('');
    const panel=$('#offer-panel'),existingOptions=panel.querySelector('.offer-options');
    const nextPanel=document.createElement('div');
    nextPanel.innerHTML=`<div class="offer-options ${p.options.length===2?'two':''}" role="group" aria-label="Pacotes de ${esc(p.short)}">${p.options.map(item=>`<button type="button" data-option="${item.id}" aria-pressed="${item.id===o.id}"><span>${esc(item.title)}</span><small>${priceLabel(item.initial,item.monthly)}</small></button>`).join('')}</div><h3>${esc(o.title)}</h3><p class="offer-description">${esc(o.description)}</p>${o.label?`<span class="offer-label">${esc(o.label)}</span>`:''}<div class="price-summary">${highlightedPrices}</div><div class="included"><span>O que inclui</span><ul>${o.features.map(f=>`<li>${esc(f)}</li>`).join('')}${extraFeatures}</ul></div><details class="scope" ${scopeOpen?'open':''}><summary>Ver o escopo e os ajustes</summary><ul>${o.details.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p>${esc(publicLimits)}</p><p>Revisões: ${o.revisions===1?'uma rodada consolidada':'duas rodadas consolidadas'}${o.monthly?' do conteúdo, quando houver produção':', dentro do escopo'}.</p></details><details class="addons-details" ${addonsOpen?'open':''}><summary>Quer incluir mais alguma coisa?</summary><div class="addons-list">${additions}</div></details>${choice().addons.length?`<div class="chosen-total" aria-live="polite">${t.initial?`<p>Projeto e complementos <b>${money(t.initial)}</b></p>`:''}${t.monthly?`<p>Serviços mensais <b>${money(t.monthly)}/mês</b></p>`:''}${t.extraInitialSaving>0||t.extraMonthlySaving>0?`<p class="saving">Valor combinado aplicado: redução de ${priceLabel(Math.max(0,t.extraInitialSaving),Math.max(0,t.extraMonthlySaving))} nesta seleção.</p>`:''}</div>`:''}<button type="button" class="offer-cta" data-contact="package"><span aria-hidden="true">b.</span>Conversar sobre este pacote ↗</button><p class="panel-caption">A escolha inicia uma conversa. Confirmamos as condições na proposta.</p>`;
    // Keep this row mounted so its column widths can transition between selections.
    if(existingOptions&&panel.dataset.path===state.path){
      nextPanel.querySelector('.offer-options').remove();
      Array.from(panel.children).forEach(child=>{if(child!==existingOptions)child.remove();});
      panel.append(...nextPanel.children);
      existingOptions.querySelectorAll('button[data-option]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.option===o.id)));
    }else panel.replaceChildren(...nextPanel.children);
    $('#offer-panel').dataset.path=state.path;$('#offer-panel').setAttribute('aria-busy','false');
    stabilizePackageRow(panel.querySelector('.offer-options'));
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
  function compactSelection(){
    const t=calculate(),addons=choice().addons.map(id=>data.addons.find(a=>a.id===id).title);
    return '<div class="contact-selected-heading"><strong>'+esc(option().title)+'</strong><small>'+esc(path().short)+'</small></div>'
      +'<div class="contact-selected-totals">'
      +(t.initial?'<span><small>Pagamento único</small><b>'+esc(money(t.initial))+'</b></span>':'')
      +(t.monthly?'<span><small>Mensalidade</small><b>'+esc(money(t.monthly))+'<small>/mês</small></b></span>':'')
      +'</div>'
      +(addons.length?'<div class="contact-selected-addons"><span>Complementos</span><p>'+addons.map(title=>'<span>✓ '+esc(title)+'</span>').join('')+'</p></div>':'');
  }
  function show(dialog){previousFocus=document.activeElement;dialog.showModal();}
  let contactBase='';
  function updateContactDraft(){
    const name=$('#contact-name').value.trim(),email=$('#contact-email').value.trim(),phone=$('#contact-phone').value.trim();
    const need=$('#contact-need').value.trim();
    const draft=contactBase+(need?'\n\nO que preciso: '+need:'')+(name?'\n\nMeu nome: '+name:'')+(email?'\nE-mail: '+email:'')+(phone?'\nWhatsApp: '+phone:'');
    $('#contact-draft').textContent=draft;
    $('#whatsapp-link').href=`https://wa.me/${data.phone}?text=${encodeURIComponent(draft)}`;
  }
  function validateContact(){
    $('#contact-name').value=$('#contact-name').value.trim();
    $('#contact-email').value=$('#contact-email').value.trim();
    updateContactDraft();
    return $('#contact-details').reportValidity();
  }
  function contact(includePackage=false,fromFooter=false){
    if(!data)return;
    const business=fromFooter?$('#business-name').value.trim():'',need=fromFooter?$('#business-need').value.trim():'';
    const draft='Olá, Bruno! Quero conversar sobre meu projeto.'+(includePackage?'\n\n'+summary():'')+(business?'\n\nMeu negócio: '+business+'.':'');
    if(fromFooter&&need)$('#contact-need').value=need;
    $('#contact-selection').hidden=!includePackage;
    $('#contact-package-summary').innerHTML=includePackage?compactSelection():'';
    window.dispatchEvent(new CustomEvent('bn:contact',{detail:{selection:includePackage?{path:state.path,package:choice().package,addons:[...choice().addons]}:null,business}}));
    contactBase=draft;updateContactDraft();show($('#contact-dialog'));
  }
  async function copy(text){try{await navigator.clipboard.writeText(text);announce('Mensagem copiada.');}catch{announce('Não foi possível copiar. Você pode selecionar o texto do resumo.');}}
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true})));
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-contact]');if(button)contact(button.dataset.contact==='package');
  });
  new ResizeObserver(()=>stabilizePackageRow($('#offer-panel .offer-options'))).observe($('#offer-panel'));
  document.fonts?.ready.then(()=>stabilizePackageRow($('#offer-panel .offer-options'),true));
  $('.path-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-path]');if(!button||!data)return;state.path=button.dataset.path;sanitize();save();render();});
  $('#offer-panel').addEventListener('click',event=>{const button=event.target.closest('[data-option]');if(!button)return;choice().package=button.dataset.option;sanitize();save();render(`[data-option="${button.dataset.option}"]`);});
  $('#offer-panel').addEventListener('change',event=>{const input=event.target.closest('[data-addon]');if(!input)return;const id=input.dataset.addon;choice().addons=input.checked?[...new Set([...choice().addons,id])]:choice().addons.filter(a=>a!==id);sanitize();save();render(`[data-addon="${id}"]`);});
  document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$('#benefit-track').scrollBy({left:Number(b.dataset.scroll)*232,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
  $('#prepare-footer').addEventListener('click',()=>contact(false,true));
  $('#contact-details').addEventListener('input',()=>{if(data)updateContactDraft();});
  $('#contact-details').addEventListener('submit',event=>event.preventDefault());
  $('#whatsapp-link').addEventListener('click',event=>{if(!validateContact())event.preventDefault();});
  $('#copy-draft').addEventListener('click',()=>{if(validateContact())copy($('#contact-draft').textContent);});
  fetch('./catalogo.json').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(catalog=>{data=catalog;sanitize();render();}).catch(()=>{$('#offer-panel').innerHTML='<h3>Vamos conversar.</h3><p class="offer-description">Não foi possível carregar os pacotes. Recarregue a página para conferir as opções.</p>';$('#offer-panel').setAttribute('aria-busy','false');});
})();
