(async () => {
  'use strict';
  const {calculateSelection,partCost,campaignIsActive,projectPayments}=await import('./pricing.mjs?v=20261114-bf');
  const {buildServicesSchema,serializeSchema}=await import('./schema.mjs?v=20261115-seo');
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n);
  const namespace=new URLSearchParams(location.search).has('qa')?':qa':'';
  const selectionKey='bn-public-services-selection-v1'+namespace;
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
  let state=read(selectionKey,{path:'sites',choices:{}});
  if(!state||typeof state!=='object'||Array.isArray(state))state={path:'sites',choices:{}};
  if(!state.choices||typeof state.choices!=='object'||Array.isArray(state.choices))state.choices={};
  let data,previousFocus,statusTimer,displayedCampaignActive;
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
  function calculate(){
    const selection={path:state.path,package:choice().package,addons:choice().addons};
    const total=calculateSelection(data,selection);
    const base=calculateSelection(data,{...selection,addons:[]});
    return {...total,extraInitialSaving:total.initialSaving-base.initialSaving,extraMonthlySaving:total.monthlySaving-base.monthlySaving};
  }
  const priceLabel=(initial,monthly)=>[initial?money(initial):'',monthly?money(monthly)+'/mês':''].filter(Boolean).join(' + ');
  const priceMarkup=amount=>{
    const numeric=amount.toLocaleString('pt-BR',{minimumFractionDigits:amount%1?2:0,maximumFractionDigits:2});
    const [whole,cents]=numeric.split(',');
    return `<span class="price"><span class="currency">R$</span><span class="price-whole">${whole}</span>${cents?`<span class="cents"><span class="decimal-separator">,</span>${cents}</span>`:''}</span>`;
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
    const activeCampaign=campaignIsActive(data);
    $('#services-schema').textContent=serializeSchema(buildServicesSchema(data));
    const regular=calculateSelection(data,{path:state.path,package:choice().package,addons:choice().addons},{regular:true});
    const regularTotal=regular.initial;
    const blackFridayReduction=activeCampaign?Math.max(0,regularTotal-t.initial):0;
    const offerLabel=blackFridayReduction>0?'Oferta Black Friday':'';
    const discountRate=regularTotal?100*blackFridayReduction/regularTotal:0;
    const discountPercent=(discountRate>=1?Math.floor(discountRate):Math.floor(discountRate*10)/10).toLocaleString('pt-BR',{maximumFractionDigits:1});
    const payment=projectPayments(t.initial);
    $('#campaign-art-logo').hidden=!activeCampaign;
    $('#campaign-conditions').hidden=!activeCampaign;
    displayedCampaignActive=activeCampaign;
    const entryPrice=partCost(data,'entrada').initial;
    const [entryWhole,entryCents]=entryPrice.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}).split(',');
    if($('.process-offer-price'))$('.process-offer-price').innerHTML='<span class="process-mini-currency">R$</span><span class="process-mini-whole">'+entryWhole+'</span><sup>'+entryCents+'</sup>';
    if($('.process-offer-old')){$('.process-offer-old').innerHTML='De <s>'+money(data.packages.entrada.price)+'</s>';$('.process-offer-old').hidden=!activeCampaign;}
    const entryDiscount=activeCampaign?Math.max(0,Math.floor(100*(data.packages.entrada.price-entryPrice)/data.packages.entrada.price)):0;
    if($('.process-mini-promo'))$('.process-mini-promo').hidden=!entryDiscount;
    if($('.process-mini-discount')){$('.process-mini-discount').textContent='−'+entryDiscount+'%';$('.process-mini-discount').hidden=!entryDiscount;}

    const highlightedPrices=[
      t.initial?`<div class="payment-total" data-payment="initial">${blackFridayReduction?`<p class="regular-comparison">De <s>${money(regularTotal)}</s></p>`:''}<div class="price-row${blackFridayReduction?' price-row--discount':''}">${blackFridayReduction?`<span class="discount-percent">−${discountPercent}%</span>`:''}${priceMarkup(t.initial)}</div></div>`:'',
      t.monthly?`<div class="payment-total" data-payment="monthly"><div class="price-row">${priceMarkup(t.monthly)}<span class="term">/mês</span></div></div>`:''
    ].join('');
    const comparison=o.feature_comparison??o.features.map(text=>({text,included:true}));
    const featureMarkup=feature=>`<li${feature.included?'':` class="feature-unavailable" aria-label="${esc(feature.text)}: fora deste pacote"`}><span>${esc(feature.text)}${feature.note?` <small class="feature-note">${esc(feature.note)}</small>`:''}</span></li>`;
    const baseFeatures=comparison.filter(feature=>feature.included).map(featureMarkup).join('');
    const unavailableFeatures=comparison.filter(feature=>!feature.included).map(featureMarkup).join('');
    const extraFeatures=allowed().filter(id=>choice().addons.includes(id)).map(id=>{
      const addon=data.addons.find(item=>item.id===id);
      return `<li data-included-addon="${esc(id)}">${esc(addon.feature??addon.title)}</li>`;
    }).join('');
    const additions=allowed().map(id=>{const a=data.addons.find(a=>a.id===id),currentCost=partCost(data,id);return `<label class="addon"><input type="checkbox" data-addon="${id}" ${choice().addons.includes(id)?'checked':''}><span><b>${esc(a.title)}</b><small>${esc(a.description)}</small><small class="addon-cost">${a.monthly?'Mensalidade':'Pagamento único'}: + ${priceLabel(currentCost.initial,currentCost.monthly)}</small></span></label>`;}).join('');
    const panel=$('#offer-panel'),existingOptions=panel.querySelector('.offer-options');
    const nextPanel=document.createElement('div');
    nextPanel.innerHTML=`<div class="offer-options ${p.options.length===2?'two':''}" role="group" aria-label="Pacotes de ${esc(p.short)}">${p.options.map(item=>`<button type="button" data-option="${item.id}" aria-pressed="${item.id===o.id}"><span>${esc(item.title)}</span></button>`).join('')}</div><h3>${esc(o.title)}</h3><p class="offer-description">${esc(o.description)}</p><div class="offer-overview"><div class="offer-values">${offerLabel?`<span class="offer-label">${esc(offerLabel)}</span>`:''}<div class="price-summary">${highlightedPrices}</div></div><div class="included"><span>${o.feature_comparison?'Entregas do pacote':'O que inclui'}</span><ul>${baseFeatures}${extraFeatures}${unavailableFeatures}</ul></div></div><details class="scope" ${scopeOpen?'open':''}><summary>Detalhes do pacote</summary><ul>${o.details.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p>${esc(publicLimits)}</p>${t.initial?`<p class="scope-payment">Pagamento do projeto: 50% de entrada (${money(payment.entry)}) e 50% na entrega (${money(payment.delivery)}).</p>`:''}<p>Ajustes: ${o.revisions===1?'1 rodada':'2 rodadas'}. Reúna os pedidos de cada rodada em uma lista${o.monthly?', para os conteúdos produzidos, quando houver.':', dentro das entregas combinadas.'}</p></details><details class="addons-details" ${addonsOpen?'open':''}><summary>Complemente seu pacote</summary><div class="addons-list">${additions}</div></details>${choice().addons.length?`<div class="chosen-total" aria-live="polite">${t.initial?`<p>Projeto e complementos <b>${money(t.initial)}</b></p>`:''}${t.monthly?`<p>Serviços mensais <b>${money(t.monthly)}/mês</b></p>`:''}${t.extraInitialSaving>0||t.extraMonthlySaving>0?`<p class="saving">Valor combinado aplicado: redução de ${priceLabel(Math.max(0,t.extraInitialSaving),Math.max(0,t.extraMonthlySaving))} nesta seleção.</p>`:''}</div>`:''}<button type="button" class="offer-cta" data-contact="package"><span class="package-cta-icon" aria-hidden="true"><img src="assets/contact-smile/package-face.svg?v=straight" width="28" height="24" alt=""></span><span class="offer-cta-copy">Quero este pacote <span class="offer-cta-arrow">↗</span></span></button><p class="panel-caption">Confira sua escolha e fale comigo pelo WhatsApp.</p><span class="package-corner-smile" aria-hidden="true"><svg width="265" height="264" viewBox="0 0 265 264" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="132.69" cy="131.967" rx="117.5" ry="117" transform="rotate(-7.67407 132.69 131.967)" fill="currentColor"/><g clip-path="url(#pricing-smile-clip)"><path d="M117.686 121.114C101.257 133.8 77.5712 130.755 64.8847 114.325C63.6885 112.776 63.9745 110.551 65.5237 109.355C67.0728 108.159 69.2978 108.445 70.494 109.994C80.7907 123.329 100.02 125.801 113.355 115.504C126.69 105.207 129.162 85.978 118.865 72.6432C117.669 71.094 117.955 68.869 119.504 67.6728C121.054 66.4766 123.279 66.7627 124.475 68.3118C137.161 84.7416 134.116 108.427 117.686 121.114Z" fill="black"/><path d="M62.3122 86.8531C58.0056 90.1785 56.8025 96.037 59.183 100.718C59.6829 101.7 60.9603 101.98 61.8344 101.305L73.5695 92.2433C76.2729 90.1558 75.4487 85.8789 72.1664 84.9493C68.8808 84.0222 65.2181 84.6093 62.3122 86.8531Z" fill="black"/><path d="M98.5469 58.8741C95.641 61.1179 94.1466 64.513 94.2132 67.9203C94.279 71.3336 98.2117 73.2102 100.915 71.1227L112.65 62.0613C113.524 61.3863 113.577 60.0798 112.753 59.3476C108.827 55.8606 102.854 55.5427 98.5477 58.8681L98.5469 58.8741Z" fill="black"/></g><defs><clipPath id="pricing-smile-clip"><rect width="75.2875" height="60.96" fill="white" transform="translate(50.6345 95.8701) rotate(-37.6741)"/></clipPath></defs></svg></span>`;
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
    if(t.initial){const payment=projectPayments(t.initial);text+='Pagamento do projeto: 50% de entrada ('+money(payment.entry)+') e 50% na entrega ('+money(payment.delivery)+').\n';}
    const regular=calculateSelection(data,{path:state.path,package:choice().package,addons:choice().addons},{regular:true});
    if(campaignIsActive(data)&&t.initial<regular.initial)text+='Black Friday: contratações até 30/11/2026, com proposta aprovada e entrada paga no período. Agenda de execução combinada na proposta.\n';
    text+='Domínio, hospedagem, ferramentas e verba de anúncios, quando necessários, ficam à parte.';
    return text;
  }
  function compactSelection(){
    const t=calculate(),addons=choice().addons.map(id=>data.addons.find(a=>a.id===id).title);
    const payment=projectPayments(t.initial);
    return '<div class="contact-selected-heading"><strong>'+esc(option().title)+'</strong><small>'+esc(path().short)+'</small></div>'
      +'<div class="contact-selected-totals">'
      +(t.initial?'<span><small>Pagamento único</small><b>'+esc(money(t.initial))+'</b></span>':'')
      +(t.monthly?'<span><small>Mensalidade</small><b>'+esc(money(t.monthly))+'<small>/mês</small></b></span>':'')
      +'</div>'
      +(t.initial?'<p class="contact-payment-split">50% de entrada: '+esc(money(payment.entry))+' · 50% na entrega: '+esc(money(payment.delivery))+'</p>':'')
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
  function contact(includePackage=false){
    if(!data)return;
    render();
    const draft='Olá, Bruno! Quero conversar sobre meu projeto.'+(includePackage?'\n\n'+summary():'');
    $('#contact-selection').hidden=!includePackage;
    $('#contact-package-summary').innerHTML=includePackage?compactSelection():'';
    window.dispatchEvent(new CustomEvent('bn:contact',{detail:{selection:includePackage?{path:state.path,package:choice().package,addons:[...choice().addons]}:null,business:'',catalogVersion:data.version}}));
    contactBase=draft;updateContactDraft();show($('#contact-dialog'));
  }
  function refreshCampaign(){
    if(!data||campaignIsActive(data)===displayedCampaignActive)return;
    render();
    if($('#contact-dialog').open&&!$('#contact-selection').hidden){
      contactBase='Olá, Bruno! Quero conversar sobre meu projeto.\n\n'+summary();
      $('#contact-package-summary').innerHTML=compactSelection();
      updateContactDraft();
    }
  }
  setInterval(refreshCampaign,30000);
  window.addEventListener('focus',refreshCampaign);
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true})));
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-contact]');if(button)contact(button.dataset.contact==='package');
  });
  new ResizeObserver(()=>stabilizePackageRow($('#offer-panel .offer-options'))).observe($('#offer-panel'));
  document.fonts?.ready.then(()=>stabilizePackageRow($('#offer-panel .offer-options'),true));
  $('.path-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-path]');if(!button||!data)return;state.path=button.dataset.path;sanitize();save();render();});
  // Keep the three-position selector usable with arrow keys as well as clicks.
  const pathToggle=$('.path-tabs');
  pathToggle.addEventListener('pointerdown',()=>pathToggle.classList.remove('is-keyboard'));
  pathToggle.addEventListener('keydown',event=>{
    const keys=['ArrowLeft','ArrowRight','Home','End'];
    if(!keys.includes(event.key))return;
    const buttons=[...pathToggle.querySelectorAll('button[data-path]')];
    const index=buttons.indexOf(event.target);if(index<0)return;
    event.preventDefault();pathToggle.classList.add('is-keyboard');
    const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
    buttons[next].focus({preventScroll:true});buttons[next].click();
  });
  $('#offer-panel').addEventListener('click',event=>{const button=event.target.closest('[data-option]');if(!button)return;choice().package=button.dataset.option;sanitize();save();render(`[data-option="${button.dataset.option}"]`);});
  $('#offer-panel').addEventListener('change',event=>{const input=event.target.closest('[data-addon]');if(!input)return;const id=input.dataset.addon;choice().addons=input.checked?[...new Set([...choice().addons,id])]:choice().addons.filter(a=>a!==id);sanitize();save();render(`[data-addon="${id}"]`);});
  // Match the reference slider's 500 ms ease, independently of native scroll timing.
  const benefitTrack=$('#benefit-track'),benefitCards=[...benefitTrack.querySelectorAll('article')];
  let benefitFrame=0,benefitTarget=null;
  const benefitOffsets=()=>{const left=benefitTrack.getBoundingClientRect().left;return benefitCards.map(card=>card.getBoundingClientRect().left-left+benefitTrack.scrollLeft);};
  const nearestBenefit=()=>benefitOffsets().reduce((best,x,index,offsets)=>Math.abs(x-benefitTrack.scrollLeft)<Math.abs(offsets[best]-benefitTrack.scrollLeft)?index:best,0);
  const stopBenefit=()=>{cancelAnimationFrame(benefitFrame);benefitFrame=0;benefitTarget=null;benefitTrack.classList.remove('is-sliding');};
  // Cubic-bezier(.25,.1,.25,1), the reference's CSS ease curve.
  const benefitEase=p=>{let lo=0,hi=1,t=p;for(let i=0;i<15;i++){t=(lo+hi)/2;const x=3*(1-t)*(1-t)*t*.25+3*(1-t)*t*t*.25+t*t*t;if(x<p)lo=t;else hi=t;}return 3*(1-t)*(1-t)*t*.1+3*(1-t)*t*t+t*t*t;};
  function moveBenefit(direction){
    const current=benefitTarget??nearestBenefit();
    const index=(current+direction+benefitCards.length)%benefitCards.length;
    const from=benefitTrack.scrollLeft,to=benefitOffsets()[index];
    cancelAnimationFrame(benefitFrame);benefitTarget=index;
    benefitTrack.classList.add('is-sliding');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){benefitTrack.scrollLeft=to;stopBenefit();return;}
    let started;
    const frame=now=>{started??=now;const progress=Math.min(1,(now-started)/500);benefitTrack.scrollLeft=from+(to-from)*benefitEase(progress);if(progress<1)benefitFrame=requestAnimationFrame(frame);else{benefitTrack.scrollLeft=to;stopBenefit();}};
    benefitFrame=requestAnimationFrame(frame);
  }
  document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>moveBenefit(Number(button.dataset.scroll))));
  ['pointerdown','touchstart','wheel','keydown'].forEach(event=>benefitTrack.addEventListener(event,stopBenefit,{passive:true}));
  const resizeBenefits=()=>{const index=benefitTarget??nearestBenefit();stopBenefit();const style=getComputedStyle(benefitTrack),card=benefitCards[0];if(!card)return;const space=Math.max(0,benefitTrack.clientWidth-parseFloat(style.paddingLeft||0)-parseFloat(style.paddingRight||0)-card.getBoundingClientRect().width-parseFloat(style.columnGap||0));benefitTrack.style.setProperty('--benefit-end-space',space+'px');benefitTrack.scrollLeft=benefitOffsets()[index];};
  new ResizeObserver(resizeBenefits).observe(benefitTrack);
  $('#contact-details').addEventListener('input',()=>{if(data)updateContactDraft();});
  $('#contact-details').addEventListener('submit',event=>event.preventDefault());
  $('#whatsapp-link').addEventListener('click',event=>{if(!validateContact())event.preventDefault();});
  fetch('./catalogo.json?v=services-20261118-pages6').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(catalog=>{data=catalog;sanitize();render();}).catch(()=>{$('#offer-panel').setAttribute('aria-busy','false');announce('Não foi possível carregar a seleção. Os detalhes dos pacotes continuam disponíveis abaixo.');});
})();
