/* Shared case-study page. Text, credits and media come from each existing case. */
(() => {
  const article=document.querySelector('#project-page'),main=document.querySelector('main');
  const feed=document.querySelector('#area-feed'),index=document.querySelector('#area-index');
  const heading=document.querySelector('main>h1'),bottom=document.querySelector('.bottom-panel');
  const catalog=window.AREA_CATALOG||{},cache=new Map();
  let current=null,controller=null,version=0;
  function el(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text)node.textContent=text;return node;}
  function picture(media,eager=false,sizes='(max-width:600px) calc(100vw - 48px), calc(100vw - 64px)'){const img=el('img');img.src=media.src+(media.version?`?v=${media.version}`:'');if(media.srcset){img.srcset=media.srcset;img.sizes=sizes;}img.alt=media.alt||'';img.width=media.width;img.height=media.height;img.loading=eager?'eager':'lazy';img.decoding='async';if(eager)img.fetchPriority='high';return img;}
  function close(restore=true){
    window.mediaViewer?.close(false);
    window.projectStory?.reset();
    version++;controller?.abort();controller=null;current=null;
    article.querySelectorAll('video').forEach(video=>video.pause());
    article.hidden=true;main.classList.remove('project-mode');heading.hidden=false;bottom.hidden=false;
    if(window.areaFeed?.active)document.title=`${entries[window.areaFeed.active].title} · Bruno Nascimento`;
    if(restore&&window.areaFeed?.active){const isIndex=new URL(location.href).searchParams.get('view')==='index';feed.hidden=isIndex;index.hidden=!isIndex;}
  }
  function mediaFigure(media,cover=false,mediaIndex=0){
    const figure=el('figure',cover?'case-cover':'case-figure');
    const trigger=el('button','case-media-trigger');trigger.type='button';trigger.dataset.video=String(media.type==='video');trigger.setAttribute('aria-label',`${media.type==='video'?'Reproduzir vídeo':'Ampliar imagem'}: ${media.alt||'Mídia do projeto'}`);trigger.setAttribute('aria-haspopup','dialog');
    if(media.type==='video'){
      const video=el('video');video.playsInline=true;video.preload='none';video.src=media.src;video.setAttribute('aria-hidden','true');video.tabIndex=-1;if(media.poster)video.poster=media.poster;trigger.append(video);
    }else trigger.append(picture(media,cover,media.sizes));
    const hint=el('span','case-media-hint',media.type==='video'?'Reproduzir ↗':'Ampliar ↗');hint.setAttribute('aria-hidden','true');trigger.append(hint);trigger.addEventListener('click',()=>window.mediaViewer.open(mediaIndex,trigger));figure.append(trigger);
    return figure;
  }
  function projectLink(area,project,className){
    const anchor=el('a',className);anchor.href=`?area=${area}&project=${project.id}`;
    const details=cache.get(`${area}/${project.id}`),parts=project.title.split(/\s*[|·]\s*/);
    const image=details?.cover||project.images[0],media=el('span','case-card-media'),content=el('span','case-card-content');
    media.append(picture({...image,alt:`Capa de ${details?.title||parts[0]}`},false,className==='case-next-card'?'(max-width:700px) 90vw, 52vw':'(max-width:700px) 43vw, 25vw'));
    content.append(el('span','case-related-title',details?.title||parts[0]));
    const description=details?.subtitle||parts.slice(1).join(' · ');
    if(description)content.append(el('span','case-related-description',description));
    anchor.append(media,content);
    anchor.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();open(area,project.id);});return anchor;
  }
  function recommendations(area,id){
    const projects=catalog[area],position=projects.findIndex(project=>project.id===id);
    if(projects.length<2)return [];
    const next=projects[(position+1)%projects.length];
    return [next,...projects.filter(project=>project.id!==id&&project.id!==next.id).slice(0,2)];
  }
  async function loadProject(area,id,signal){
    const key=`${area}/${id}`;if(cache.has(key))return cache.get(key);
    const response=await fetch(`portfolio/project-data/${encodeURIComponent(area)}/${encodeURIComponent(id)}.json`,{signal});
    if(!response.ok)throw new Error('Projeto indisponível');
    let data=await response.json();
    if(window.projectStory?.sources.has(key)){
      const storyResponse=await fetch(`portfolio/project-story-data/${encodeURIComponent(area)}/${encodeURIComponent(id)}.json`,{signal});
      if(!storyResponse.ok)throw new Error('Conte?do do projeto indispon?vel');
      data={...data,...await storyResponse.json()};
    }
    cache.set(key,data);return data;
  }
  function render(data){
    article.replaceChildren();article.classList.toggle('case-board-project',data.presentation==='boards');let title;
    if(data.story){const rendered=window.projectStory.render(data,mediaFigure);title=rendered.title;article.append(...rendered.fragments);}
    else{
const hero=el('section','case-hero');
    const sourceCover=data.cover||data.media.find(media=>media.type==='image');
    const cover=sourceCover&&/^Abrir\b/.test(sourceCover.alt)?{...sourceCover,alt:`Capa de ${data.title}`}:sourceCover;
    const rest=data.media.filter(media=>media!==sourceCover),galleryItems=cover?[cover,...rest]:rest;
    window.mediaViewer.setCollection(`${data.title} · ${data.subtitle}`,galleryItems);
    title=el('h1','case-headline');title.tabIndex=-1;title.append(el('span','case-client',data.title),el('span','case-title',data.subtitle));hero.append(title);
    const tags=el('div','case-tags');data.tags.forEach(tag=>tags.append(el('span','case-tag',tag)));hero.append(tags);
    if(cover)hero.append(mediaFigure(cover,true,0));
    const sentence=data.intro?.match(/^.+?[.!?](?=\s|$)/)?.[0]||data.intro;
    if(sentence)hero.append(el('h2','case-subtitle',sentence));
    const information=el('div','case-info');
    const sections=el('div','case-information');sections.id='case-information';sections.hidden=true;
    data.sections.forEach(section=>{const paragraphs=section.paragraphs.map(text=>text===data.intro&&sentence&&text.startsWith(sentence)?text.slice(sentence.length).trim():text).filter(Boolean);if(!paragraphs.length)return;const block=el('section','case-copy-block');block.append(el('h3','',section.title));paragraphs.forEach(text=>block.append(el('p','',text)));sections.append(block);});
    if(!data.sections.length&&data.credit)sections.append(el('p','',data.credit));
    if(sections.children.length){const toggle=el('button','button','Mais informações');toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','case-information');toggle.addEventListener('click',()=>{sections.hidden=!sections.hidden;toggle.textContent=sections.hidden?'Mais informações':'Menos informações';toggle.setAttribute('aria-expanded',String(!sections.hidden));});information.append(sections,toggle);hero.append(information);}
    article.append(hero);
    const gallery=el('section','case-gallery');gallery.setAttribute('aria-label','Imagens e vídeos do projeto');
    for(let i=0;i<rest.length;i++){
      const media=rest[i];
      if(data.presentation!=='boards'&&media.width/media.height<1.15&&rest[i+1]&&rest[i+1].width/rest[i+1].height<1.15){const pair=el('div','case-two-columns');pair.append(mediaFigure({...media,sizes:'(max-width:600px) calc(50vw - 32px), calc(50vw - 48px)'},false,galleryItems.indexOf(media)));const second=rest[++i];pair.append(mediaFigure({...second,sizes:'(max-width:600px) calc(50vw - 32px), calc(50vw - 48px)'},false,galleryItems.indexOf(second)));gallery.append(pair);}
      else gallery.append(mediaFigure(media,false,galleryItems.indexOf(media)));
    }
    if(gallery.children.length)article.append(gallery);
    }
    if(data.films?.length){
      const films=el('section','case-films');films.setAttribute('aria-label','Filmes do projeto');
      data.films.forEach(film=>{
        const card=el('div','case-film'),title=el('h2','',film.title),frame=el('div','case-film-frame');
        const play=el('button','case-film-play');play.type='button';play.setAttribute('aria-label',`Reproduzir: ${film.title}`);
        const poster=el('img');poster.src=film.poster;poster.alt='';poster.loading='lazy';poster.decoding='async';
        play.append(poster,el('span','button','Reproduzir ↗'));
        play.addEventListener('click',()=>{
          // The public campaign player is requested only after a visitor chooses it.
          const embed=el('iframe');embed.title=film.title;embed.src=film.src;embed.allow='fullscreen; picture-in-picture';embed.allowFullscreen=true;embed.referrerPolicy='strict-origin-when-cross-origin';
          frame.replaceChildren(embed);embed.focus();
        });
        const source=el('a','case-external','Ver no Behance ↗');source.href=film.url;source.target='_blank';source.rel='noopener noreferrer';
        frame.append(play);card.append(title,frame,source);films.append(card);
      });article.append(films);
    }
    if(data.links.length){const links=el('section','case-links');links.append(el('h2','','Vídeos e links'));data.links.forEach(link=>{const anchor=el('a','case-external',link.title+' ↗');anchor.href=link.url;anchor.target='_blank';anchor.rel='noopener noreferrer';links.append(anchor);});article.append(links);}
    if(data.credits.length||data.credit){const credits=el('section','case-credits');credits.append(el('h2','','Créditos'));if(data.credits.length){const list=el('dl');data.credits.forEach(credit=>{list.append(el('dt','',credit.role),el('dd','',credit.names));});credits.append(list);}else credits.append(el('p','',data.credit));article.append(credits);}
    const [next,...related]=recommendations(data.area,data.id);
    if(next){const explore=el('section','case-explore');const nextBlock=el('div','case-next');nextBlock.append(el('h2','','Próximo'),projectLink(data.area,next,'case-next-card'));explore.append(nextBlock);if(related.length){const relatedBlock=el('div','case-related'),relatedCards=el('div','case-related-cards');relatedBlock.append(el('h2','','Relacionados'));related.forEach(p=>relatedCards.append(projectLink(data.area,p,'case-related-card')));relatedBlock.append(relatedCards);explore.append(relatedBlock);}article.append(explore);}
    const footer=el('footer','case-footer');const back=el('a','button',`Voltar para ${entries[data.area].title}`);back.href=`?area=${data.area}`;back.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.areaFeed.view('feed');});footer.append(back,el('span','',`© Bruno Nascimento ${new Date().getFullYear()}`));article.append(footer);
    title.focus({preventScroll:true});
  }
  async function open(area,id,push=true,restoreScroll=0){
    const project=catalog[area]?.find(project=>project.id===id);if(!project)return;
    window.mediaViewer?.close(false);
    window.projectStory?.reset();
    if(window.areaFeed.active!==area)window.areaFeed.navigate(area,false);
    controller?.abort();controller=new AbortController();const request=++version;current={area,id};
    if(push){history.replaceState({...history.state,scrollY:window.scrollY},'',location.href);const url=new URL(location.href);url.hash='';url.searchParams.set('area',area);url.searchParams.set('project',id);history.pushState({},'',url);}
    feed.hidden=true;index.hidden=true;grid.hidden=true;heading.hidden=true;emptyState(true);bottom.hidden=true;main.classList.add('project-mode');article.hidden=false;article.setAttribute('aria-busy','true');article.replaceChildren(el('p','case-loading','Carregando projeto…'));
    document.querySelectorAll('[data-view]').forEach(button=>button.removeAttribute('aria-current'));document.title=`${project.title} · Bruno Nascimento`;window.scrollTo(0,0);
    try{
      const signal=controller.signal,data=await loadProject(area,id,signal);
      if(request!==version)return;
      // Reserve the complete footer from its first render, using each case's own title and subtitle.
      await Promise.allSettled(recommendations(area,id).map(project=>loadProject(area,project.id,signal)));
      if(request!==version)return;render(data);article.removeAttribute('aria-busy');window.scrollTo(0,restoreScroll);
      if(!restoreScroll&&location.hash.startsWith('#chapter-')){const chapter=document.getElementById(location.hash.slice(1));if(chapter&&article.contains(chapter))chapter.scrollIntoView({block:'start'});}
    }catch(error){if(error.name==='AbortError'||request!==version)return;console.error('Falha ao carregar o projeto',error);article.removeAttribute('aria-busy');article.replaceChildren(el('h1','case-headline',project.title),el('p','case-error','Não foi possível carregar este projeto. Volte à área e tente novamente.'));}
  }
  function emptyState(hidden){document.querySelector('.empty').hidden=hidden;}
  window.projectPage={open,close,get active(){return current;}};
  window.addEventListener('popstate',event=>{const url=new URL(location.href),area=url.searchParams.get('area'),id=url.searchParams.get('project');if(id)open(area,id,false,event.state?.scrollY||0);else window.scrollTo(0,event.state?.scrollY||0);});
  search.addEventListener('input',()=>{if(current)window.areaFeed.view('feed');});
  const url=new URL(location.href);if(url.searchParams.has('project'))open(url.searchParams.get('area'),url.searchParams.get('project'),false);
})();
