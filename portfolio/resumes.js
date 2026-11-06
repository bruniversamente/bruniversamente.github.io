/* Public CV links: files stay at stable paths; publication is a separate step. */
(() => {
  'use strict';
  const lang = window.portfolioI18n?.lang || 'pt';
  const copy = {
    pt: {title:'Currículos', intro:'Escolha a versão por área de atuação.', format:'PDF em português · 1 página', view:'Ver PDF', download:'Baixar', link:'Copiar link', copied:'Link copiado', failed:'Não foi possível copiar. Abra o PDF e copie o endereço.', labels:['Design e direção criativa','Beleza','UX/UI e desenvolvimento','Dados e BI','Arquitetura e consultoria aeronáutica']},
    en: {title:'Résumés', intro:'Choose a résumé by field of work.', format:'PDF in Portuguese · 1 page', view:'View PDF', download:'Download', link:'Copy link', copied:'Link copied', failed:'Could not copy. Open the PDF and copy its address.', labels:['Design and creative direction','Beauty','UX/UI and development','Data and BI','Architecture and aviation consulting']},
    es: {title:'Currículums', intro:'Elige una versión por área de trabajo.', format:'PDF en portugués · 1 página', view:'Ver PDF', download:'Descargar', link:'Copiar enlace', copied:'Enlace copiado', failed:'No se pudo copiar. Abre el PDF y copia su dirección.', labels:['Diseño y dirección creativa','Belleza','UX/UI y desarrollo','Datos y BI','Arquitectura y consultoría aeronáutica']}
  }[lang];
  const ids=['design','beleza','ux-ui-desenvolvimento','dados-bi','arquitetura-consultoria'];
  const section=document.querySelector('#curriculos');
  section.querySelector('h2').textContent=copy.title;
  section.querySelector('.resume-intro').textContent=copy.intro;
  document.querySelectorAll('[data-resumes]').forEach(link=>{
    link.textContent=copy.title;
    link.href=window.portfolioRoutes.href('?page=sobre&lang='+lang+'#curriculos',lang);
    link.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      event.preventDefault();
      window.aboutPage.open();
      const url=window.portfolioRoutes.read();url.hash='curriculos';
      history.replaceState({},'',url);
      showSection();
    });
  });
  const list=section.querySelector('.resume-list');
  const status=section.querySelector('[role="status"]');
  ids.forEach((id,index)=>{
    const path='/curriculos/bruno-nascimento-'+id+'-pt.pdf';
    const row=document.createElement('article');row.className='resume-row';
    const text=document.createElement('div');text.className='resume-description';
    const heading=document.createElement('h3');heading.textContent=copy.labels[index];
    const format=document.createElement('p');format.className='resume-format';format.textContent=copy.format;
    text.append(heading,format);
    const actions=document.createElement('div');actions.className='resume-actions';
    const view=document.createElement('a');view.className='button';view.href=path;view.target='_blank';view.rel='noopener';view.textContent=copy.view;view.setAttribute('aria-label',copy.view+': '+copy.labels[index]);
    const download=document.createElement('a');download.className='button';download.href=path;download.download='Bruno Nascimento.pdf';download.textContent=copy.download;download.setAttribute('aria-label',copy.download+': '+copy.labels[index]);
    const link=document.createElement('button');link.className='button';link.type='button';link.textContent=copy.link;link.setAttribute('aria-label',copy.link+': '+copy.labels[index]);
    link.addEventListener('click',async()=>{
      try{
        await navigator.clipboard.writeText(new URL(path,location.origin).href);
        status.textContent=copy.copied+': '+copy.labels[index];
      }catch{status.textContent=copy.failed;}
    });
    actions.append(view,download,link);row.append(text,actions);list.append(row);
  });
  function showSection(){
    section.focus({preventScroll:true});
    section.scrollIntoView({block:'start'});
  }
  function followHash(){
    if(window.portfolioRoutes.read().searchParams.get('page')==='sobre'&&window.portfolioRoutes.read().hash==='#curriculos'){
      window.aboutPage.open(false);showSection();
    }
  }
  window.addEventListener('popstate',followHash);
  window.addEventListener('hashchange',followHash);
  followHash();
})();
