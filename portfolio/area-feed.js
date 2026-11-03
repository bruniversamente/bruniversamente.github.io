/* Area pages share the home shell and use the media mosaic measured in Base's Feed. */
(() => {
  const catalog=window.AREA_CATALOG||{};
  const feed=document.querySelector('#area-feed');
  const index=document.querySelector('#area-index');
  const areaButton=document.querySelector('#area-view');
  const empty=document.querySelector('.empty');
  const heading=document.querySelector('main>h1');
  const filters=document.querySelector('#filters');
  const homeFilters=[...filters.children];
  const main=document.querySelector('main');
  let active=null,view='feed',projectFilter='all',units=6;
  let homeView='grid';
  function element(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el;}
  function imageNode(image,lazy=true){const img=element('img');img.src=image.src+(image.version?`?v=${image.version}`:'');img.alt=image.alt||'';img.width=image.width;img.height=image.height;img.loading=lazy?'lazy':'eager';img.decoding='async';img.draggable=false;return img;}
  function matches(project){return (projectFilter==='all'||project.id===projectFilter)&&normalize(project.title+' '+project.credit).includes(normalize(search.value));}
  function showProject(project,image){
    if(window.projectPage){window.projectPage.open(active,project.id);return;}
    document.querySelector('#area-title').textContent=project.title;
    document.querySelector('#area-description').hidden=true;
    const credit=document.querySelector('#area-credit');credit.textContent=project.credit;credit.hidden=!project.credit;
    const hero=document.querySelector('#area-image');
    const select=photo=>{hero.src=photo.src+(photo.version?`?v=${photo.version}`:'');hero.alt=photo.alt||project.title;};select(image);
    let gallery=areaDialog.querySelector('.detail-thumbnails');
    if(!gallery){gallery=element('div','detail-thumbnails');hero.after(gallery);}
    gallery.replaceChildren();gallery.hidden=project.images.length<2;
    project.images.forEach((photo,i)=>{const button=element('button','detail-thumbnail');button.type='button';button.setAttribute('aria-label',`${project.title} · imagem ${i+1}`);button.append(imageNode(photo));button.addEventListener('click',()=>{select(photo);gallery.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));});gallery.append(button);});
    const link=document.querySelector('#area-link');link.hidden=!project.url;if(project.url){link.href=project.url;link.textContent='Ver projeto ↗';}
    areaDialog.showModal();
  }
  function feedCard(project,image,wide){
    const card=element('a','feed-card');card.href=`?area=${active}&project=${project.id}`;card.dataset.project=project.id;card.dataset.orientation=wide?'h':'v';card.setAttribute('aria-label',project.title);
    const media=element('span','feed-media');
    media.append(imageNode(image,feed.children.length>5));
    const overlay=element('span','feed-overlay');overlay.setAttribute('aria-hidden','true');
    const [title,...subtitle]=project.title.split('|').map(part=>part.trim());
    overlay.append(element('span','feed-title',title),element('span','feed-subtitle',subtitle.join(' · ')||entries[active].title));
    card.append(media,overlay);card.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();showProject(project,image);});feed.append(card);
  }
  function indexRow(project){
    const row=element('a','project-card');row.href=`?area=${active}&view=index&project=${project.id}`;row.dataset.project=project.id;
    row.append(element('h2','',project.title),element('p','project-description',project.credit));
    const preview=element('span','index-preview');preview.setAttribute('aria-hidden','true');
    const clip=element('span','index-preview-clip'),marquee=element('span','index-marquee'),track=element('span','index-track'),segment=element('span','index-segment');
    // Repeat a complete segment before cloning so the strip fills every viewport.
    const repeats=Math.max(2,Math.ceil(18/project.images.length));
    for(let i=0;i<repeats;i++)project.images.forEach(image=>{const img=imageNode(image);img.alt='';segment.append(img);});
    track.style.setProperty('--index-duration',`${Math.max(20,repeats*project.images.length*2.5)}s`);track.append(segment,segment.cloneNode(true));marquee.append(track);clip.append(marquee);preview.append(clip);row.append(preview);
    row.addEventListener('click',event=>{event.preventDefault();if(matchMedia('(hover:none)').matches&&!row.classList.contains('index-open')){index.querySelectorAll('.index-open').forEach(r=>r.classList.remove('index-open'));row.classList.add('index-open');return;}showProject(project,project.images[0]);});index.append(row);
  }
  function render(){
    feed.replaceChildren();index.replaceChildren();
    const projects=catalog[active]||[];
    projects.forEach(indexRow);
    // One image per project in each round; offset later rounds to separate repeats.
    const rounds=Math.max(...projects.map(project=>project.images.length),0);
    for(let round=0;round<rounds;round++){
      const offset=round*Math.max(1,Math.floor(projects.length*.37))%projects.length;
      const ordered=[...projects.slice(offset),...projects.slice(0,offset)];
      ordered.forEach(project=>{const image=project.images[round];if(image)feedCard(project,image,false);});
    }
    filters.replaceChildren();
    const addFilter=(id,title)=>{const button=element('button','button',title);button.type='button';button.setAttribute('aria-pressed',String(projectFilter===id));button.addEventListener('click',()=>{projectFilter=id;[...filters.children].forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();});filters.append(button);};
    addFilter('all','Todos');projects.forEach(p=>addFilter(p.id,p.title));
    update();updateZoom();
  }
  function update(){
    if(!active)return;
    const visible=new Set(catalog[active].filter(matches).map(p=>p.id));
    [...feed.children,...index.children].forEach(card=>card.hidden=!visible.has(card.dataset.project));
    empty.hidden=visible.size>0;empty.textContent='Nenhum projeto encontrado.';
    distributeModules();
  }
  function distributeModules(){
    // Every complete row fills its grid, with the wide cells moving across rows.
    const templates={
      2:[[2],[1,1],[2],[1,1],[1,1],[2]],
      4:[[2,1,1],[1,2,1],[2,2],[1,1,2],[2,1,1],[1,2,1]],
      6:[[2,1,1,2],[1,2,2,1],[2,2,2],[1,2,1,2],[2,1,2,1],[1,1,2,2],[2,2,1,1],[1,2,2,1]],
      8:[[2,1,2,1,2],[1,2,2,2,1],[2,2,2,2],[2,1,1,2,2],[1,2,1,2,2],[2,2,1,2,1]]
    };
    const width=mobile.matches?2:units,patterns=templates[width];
    const visible=[...feed.children].filter(card=>!card.hidden),minimum=width/2;
    function filledRow(count,row){
      const spans=Array(count).fill(1),wide=width-count;
      for(let i=0;i<wide;i++)spans[(Math.floor(i*count/wide)+row)%count]=2;
      return spans;
    }
    let row=0,position=0;
    while(position<visible.length){
      const remaining=visible.length-position;
      let pattern=patterns[row%patterns.length];
      // Balance the final rows as well, instead of ending with a half-empty row.
      if(remaining>=minimum&&remaining<width)pattern=filledRow(remaining,row);
      else if(remaining===width&&width>2)pattern=filledRow(minimum,row);
      else if(remaining>width&&remaining-pattern.length<minimum)pattern=filledRow(remaining-minimum,row);
      for(const span of pattern){
        const card=visible[position++];if(!card)break;
        card.dataset.orientation=span===2?'h':'v';card.dataset.layoutRow=String(row);
      }
      row++;
    }
  }
  function updateZoom(){feed.style.setProperty('--feed-units',String(units));feed.style.setProperty('--release-columns',String(units/2));document.querySelector('#larger').disabled=units===4;document.querySelector('#smaller').disabled=units===8;distributeModules();}
  function changeView(next,push=true){
    window.projectPage?.close(false);
    if(next==='grid'){navigate(null);return;}
    view=next==='index'?'index':'feed';feed.hidden=view!=='feed';index.hidden=view!=='index';
    document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    index.querySelectorAll('.index-open').forEach(row=>row.classList.remove('index-open'));
    if(push){const url=new URL(location.href);url.searchParams.delete('project');if(view==='index')url.searchParams.set('view','index');else url.searchParams.delete('view');history.replaceState({},'',url);}
    window.scrollTo(0,0);
  }
  function navigate(key,push=true){
    window.projectPage?.close(false);
    const next=catalog[key]?key:null;
    if(next&&!active)homeView=grid.classList.contains('index-view')?'index':'grid';
    active=next;projectFilter='all';search.value='';setMenu(false);search.hidden=true;document.querySelector('.search-button').setAttribute('aria-expanded','false');document.querySelector('.search-button').setAttribute('aria-label','Abrir busca');
    filters.hidden=true;document.querySelector('#filter-toggle').setAttribute('aria-expanded','false');
    grid.hidden=Boolean(active);areaButton.hidden=!active;main.dataset.area=active||'';
    if(active){
      const title=entries[active].title;areaButton.textContent=title;areaButton.title=title;heading.textContent=title;document.title=`${title} · Bruno Nascimento`;
      search.placeholder=`Buscar em ${title}`;search.setAttribute('aria-label',`Buscar projetos em ${title}`);filters.setAttribute('aria-label','Filtrar projetos');
      units=6;render();changeView(new URL(location.href).searchParams.get('view')==='index'&&!push?'index':'feed',false);
    }else{
      feed.hidden=true;index.hidden=true;filters.replaceChildren(...homeFilters);filters.setAttribute('aria-label','Filtrar áreas');heading.textContent='Áreas de atuação de Bruno Nascimento';document.title='Bruno Nascimento · Portfólio';search.placeholder='Qual área você procura?';search.setAttribute('aria-label','Buscar uma área');empty.textContent='Nenhuma área encontrada.';
      grid.classList.toggle('index-view',homeView==='index');document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===homeView)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});responsive();updateCards();if(homeView==='index')prepareIndexGalleries();
    }
    if(push){const url=new URL(location.href);url.hash='';url.searchParams.delete('view');url.searchParams.delete('project');if(active)url.searchParams.set('area',active);else url.searchParams.delete('area');history.pushState({},'',url);}
    window.scrollTo(0,0);
  }
  window.areaFeed={get active(){return active;},navigate,view:changeView,update,zoom(delta){units=Math.max(4,Math.min(8,units+delta*2));updateZoom();}};
  window.addEventListener('popstate',()=>navigate(new URL(location.href).searchParams.get('area'),false));
  mobile.addEventListener('change',()=>{if(active)updateZoom();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')index.querySelectorAll('.index-open').forEach(r=>r.classList.remove('index-open'));});
  const initial=new URL(location.href).searchParams.get('area');
  if(catalog[initial])navigate(initial,false);
})();
