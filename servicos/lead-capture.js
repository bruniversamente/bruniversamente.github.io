(() => {
  'use strict';
  const scriptUrl=document.currentScript.src;
  const form=document.querySelector('#contact-details'),link=document.querySelector('#whatsapp-link');
  const phone=document.querySelector('#contact-phone'),status=document.querySelector('#lead-status');
  const fallback=document.querySelector('#lead-whatsapp-fallback'),widget=document.querySelector('#lead-verification');
  if(!form||!link||!phone||!status)return;
  let config=null,ready=false,token='',widgetId=null,context={selection:null,business:''},saved='',busy=false,loading=true;
  const say=(message,error=false)=>{status.hidden=false;status.textContent=message;status.dataset.error=String(error);};
  const allowFallback=()=>{fallback.href=link.href;fallback.hidden=false;};
  const reset=()=>{token='';if(widgetId!==null&&window.turnstile)window.turnstile.reset(widgetId);};
  window.addEventListener('bn:contact',event=>{context=event.detail;saved='';});
  form.addEventListener('input',()=>{saved='';fallback.hidden=true;});
  function payload(){return {name:document.querySelector('#contact-name').value.trim(),email:document.querySelector('#contact-email').value.trim(),phone:phone.value.trim(),business:context.business,need:document.querySelector('#contact-need')?.value.trim()??'',selection:context.selection,contactPermission:true,website:document.querySelector('#lead-website').value,token};}
  function valid(){
    phone.setCustomValidity('');
    let digits=phone.value.replace(/\D/g,'');if(digits.length===10||digits.length===11)digits='55'+digits;
    if(!/^55[1-9]\d(?:\d{8}|9\d{8})$/.test(digits)||/^0+$/.test(digits.slice(4)))phone.setCustomValidity('Informe seu WhatsApp com DDD.');
    return form.reportValidity();
  }
  function mountWidget(){
    if(!ready||!document.querySelector('#contact-dialog').open||widgetId!==null||!window.turnstile)return;
    widgetId=window.turnstile.render(widget,{sitekey:config.siteKey,action:'lead',theme:'light',size:'flexible',
      callback:value=>{token=value;status.hidden=true;},'expired-callback':()=>{token='';},
      'error-callback':()=>{token='';say('Não foi possível verificar o formulário. Tente novamente ou continue pelo WhatsApp.',true);allowFallback();}});
  }
  new MutationObserver(mountWidget).observe(document.querySelector('#contact-dialog'),{attributes:true,attributeFilter:['open']});
  fallback.addEventListener('click',event=>{if(valid()){fallback.href=link.href;}else event.preventDefault();});
  // Capture phase runs before the existing WhatsApp validation; no data is sent while typing.
  link.addEventListener('click',async event=>{
    if(loading){event.preventDefault();say('Preparando o contato. Toque novamente em instantes.');return;}
    if(!config?.enabled)return;
    event.preventDefault();if(busy||!valid())return;
    const body=payload(),fingerprint=JSON.stringify({...body,token:''});
    if(saved===fingerprint){window.open(link.href,'_blank','noopener,noreferrer');return;}
    if(!ready||!token){say(ready?'Conclua a verificação para continuar.':'O cadastro está indisponível. Você pode continuar pelo WhatsApp.',true);allowFallback();return;}
    const destination=window.open('about:blank','_blank');if(destination)destination.opener=null;
    busy=true;link.setAttribute('aria-disabled','true');say('Registrando seu contato…');
    try{
      const response=await fetch(config.endpoint+'/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(25000),credentials:'omit',referrerPolicy:'no-referrer'});
      const result=await response.json();if(!response.ok||result.ok!==true)throw Error('save');
      saved=fingerprint;say('Contato registrado. Você confirma o envio da mensagem no WhatsApp.');fallback.hidden=true;
      if(destination)destination.location.replace(link.href);
      else{link.textContent='Abrir no WhatsApp ↗';say('Contato registrado. Toque novamente para abrir o WhatsApp.');}
    }catch{
      if(destination)destination.close();say('Não foi possível registrar seu contato. Tente novamente ou continue pelo WhatsApp.',true);allowFallback();
    }finally{busy=false;link.removeAttribute('aria-disabled');reset();}
  },true);
  fetch(new URL('lead-config.json',scriptUrl),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('config');return r.json();}).then(async value=>{
    if(!value.enabled||!value.endpoint)return;
    const endpoint=new URL(value.endpoint);if(endpoint.protocol!=='https:'||!endpoint.hostname.endsWith('.workers.dev'))throw Error('config');
    config={enabled:true,endpoint:endpoint.origin};
    document.querySelector('#contact-phone-field').hidden=false;phone.required=true;
    document.querySelector('#contact-email-field').classList.add('contact-email-wide');
    link.textContent='Confirmar e abrir WhatsApp ↗';
    const response=await fetch(config.endpoint+'/config',{credentials:'omit',signal:AbortSignal.timeout(8000)});
    const server=await response.json();ready=response.ok&&server.ready===true;config.siteKey=server.siteKey;
    if(!ready)return;
    if(window.turnstile){mountWidget();return;}
    const js=document.createElement('script');js.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';js.async=true;js.defer=true;js.onload=mountWidget;
    js.onerror=()=>{ready=false;say('A verificação está indisponível. Você pode continuar pelo WhatsApp.',true);};document.head.append(js);
  }).catch(()=>{if(config){ready=false;say('O cadastro está indisponível. Você pode continuar pelo WhatsApp.',true);}}).finally(()=>{loading=false;});
})();
