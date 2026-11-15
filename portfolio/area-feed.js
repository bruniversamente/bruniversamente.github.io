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
  let active=null,view='feed',tagFilter=null,units=6;
  let homeView='grid';
  let servicesHero=null;
  const feedImages=new WeakMap();
  function element(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el;}
  function prepareServicesHero(){
    if(servicesHero)return;
    servicesHero=element('section','services-hero');servicesHero.hidden=true;
    servicesHero.setAttribute('aria-labelledby','services-hero-title');
    servicesHero.innerHTML=`<div class="services-hero-copy">
      <span class="services-hero-kicker">Sites e identidade visual</span>
      <h2 id="services-hero-title">Seu negócio<br>merece <em>ser visto.</em></h2>
      <p>Seu negócio, seu site, sua identidade.</p>
      <a class="services-hero-primary" href="/servicos/">Conhecer os serviços <span aria-hidden="true">↗</span></a>
    </div>
    <div class="services-hero-card">
      <span class="services-hero-pill"><i aria-hidden="true"></i>Comece por aqui</span>
      <div class="services-hero-sticker" aria-hidden="true"><img src="/servicos/assets/project-card/hero-reference-card.webp" width="688" height="549" alt="" decoding="async"><span class="services-hero-sticker-label"><span>Design e web</span></span></div>
      <div class="services-hero-standard">
        <h3>Seu negócio.<br><em>Na web.</em></h3>
        <p>Compare os pacotes de sites e de marca e site.</p>
        <a class="services-hero-offer-link" href="/servicos/#pacotes">Ver os pacotes <span aria-hidden="true">↗</span></a>
      </div>
      <div class="services-hero-campaign" hidden>
        <p class="services-hero-package">Sites Essencial · 1 página, até 5 seções</p>
        <span class="services-hero-sale-label">Oferta Black Friday</span>
        <p class="services-hero-price"><span>De <s data-hero-regular></s></span><span class="services-hero-price-row"><span class="services-hero-discount" data-hero-discount></span><strong data-hero-price><span class="services-hero-currency">R$ </span><span data-hero-integer></span><span class="services-hero-decimal">,</span><span class="services-hero-cents" data-hero-cents></span></strong></span></p>
        <a class="services-hero-offer-link" href="/servicos/#pacotes">Ver ofertas da Black Friday <span aria-hidden="true">↗</span></a>
        <p class="services-hero-deadline"></p>
      </div>
    </div>`;
    feed.before(servicesHero);
    Promise.all([fetch('/servicos/catalogo.json').then(response=>{if(!response.ok)throw Error('service_catalog_unavailable');return response.json();}),import('../servicos/pricing.mjs')]).then(([data,pricing])=>{
      const standard=servicesHero.querySelector('.services-hero-standard'),campaign=servicesHero.querySelector('.services-hero-campaign');
      const money=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
      function refreshCampaign(){
        const now=Date.now(),active=pricing.campaignIsActive(data,now);
        standard.hidden=active;campaign.hidden=!active;
        if(active){
          const regular=pricing.partCost(data,'entrada',{now,regular:true}).initial,current=pricing.partCost(data,'entrada',{now}).initial;
          const [integer,cents]=current.toFixed(2).split('.'),discount=Math.round((1-current/regular)*100);
          servicesHero.querySelector('[data-hero-regular]').textContent=money.format(regular);
          servicesHero.querySelector('[data-hero-integer]').textContent=new Intl.NumberFormat('pt-BR').format(Number(integer));
          servicesHero.querySelector('[data-hero-cents]').textContent=cents;
          const discountLabel=servicesHero.querySelector('[data-hero-discount]');discountLabel.textContent=`−${discount}%`;discountLabel.hidden=discount<=0;
          discountLabel.setAttribute('aria-label',`${discount}% de desconto`);
          servicesHero.querySelector('.services-hero-deadline').textContent=`Até ${data.campaign.deadline_label}. Confira as condições na página de serviços.`;
        }
        const next=[data.campaign?.starts_at,data.campaign?.ends_at].map(Date.parse).filter(time=>time>now).sort((a,b)=>a-b)[0];
        if(next)setTimeout(refreshCampaign,Math.min(next-now+50,2147483647));
      }
      refreshCampaign();
    }).catch(()=>{
      servicesHero.querySelector('.services-hero-standard').hidden=false;
      servicesHero.querySelector('.services-hero-campaign').hidden=true;
    });
  }
  function applyImage(img,image,orientation='v',sizes='(max-width:700px) 100vw, 50vw'){
    const photo=image.formats?.[orientation]||image;
    img.width=photo.width;img.height=photo.height;img.alt=photo.alt||'';
    if(photo.srcset){img.srcset=photo.srcset;img.sizes=sizes;}else{img.removeAttribute('srcset');img.removeAttribute('sizes');}
    img.src=photo.src+(photo.version?`?v=${photo.version}`:'');
    if(photo.position)img.style.objectPosition=photo.position;
    if(image.formats){img.style.objectFit=photo.fit;img.style.transform=`scale(${photo.zoom/100})`;img.dataset.thumbOrientation=orientation;}
  }
  function imageNode(image,lazy=true,sizes='(max-width:700px) 100vw, 50vw'){const img=element('img');applyImage(img,image,'v',sizes);img.loading=lazy?'lazy':'eager';img.decoding='async';img.draggable=false;return img;}
  function matches(project){const tags=project.tags||[],copy=[project.title,project.credit,...tags];return (tagFilter===null||tags.includes(tagFilter))&&normalize([...copy,...copy.map(text=>window.portfolioI18n?.t(text)||text)].join(' ')).includes(normalize(search.value));}
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
    feedImages.set(card,image);if(image.thumbSlot)card.dataset.thumbSlot=String(image.thumbSlot);
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
    for(let i=0;i<repeats;i++)project.images.forEach(image=>{const img=imageNode(image,true,'300px');img.alt='';segment.append(img);});
    track.style.setProperty('--index-duration',`${Math.max(20,repeats*project.images.length*2.5)}s`);track.append(segment,segment.cloneNode(true));marquee.append(track);clip.append(marquee);preview.append(clip);row.append(preview);
    row.addEventListener('click',event=>{event.preventDefault();if(matchMedia('(hover:none)').matches&&!row.classList.contains('index-open')){index.querySelectorAll('.index-open').forEach(r=>r.classList.remove('index-open'));row.classList.add('index-open');return;}showProject(project,project.images[0]);});index.append(row);
  }
  function render(){
    feed.replaceChildren();index.replaceChildren();
    const projects=catalog[active]||[];
    if(active==='produtos')prepareServicesHero();
    projects.forEach(indexRow);
    // Keep the catalog/index order, while composing the Web Design mosaic separately.
    const cards=[];
    const rounds=Math.max(...projects.map(project=>project.images.length),0);
    for(let round=0;round<rounds;round++){
      const offset=round*Math.max(1,Math.floor(projects.length*.37))%projects.length;
      const ordered=[...projects.slice(offset),...projects.slice(0,offset)];
      ordered.forEach(project=>{const image=project.images[round];if(image)cards.push({project,image,slot:image.thumbSlot||round+1});});
    }
    if(active==='produtos'){
      // Interleave websites, identities and product screens, with distance between repeats.
      const order=['nove-patios:1','produtos-01:1','matiz:2','easyaga-webdesign:2','alva:3','produtos-03:1','dobra:1','dito:2','vespera:1','produtos-02:1','modo:3','rakestra-identidade:1','pingo:1',
        'alva:2','produtos-01:2','nove-patios:3','matiz:1','produtos-02:2','dito:1','rakestra-identidade:2','vespera:3','dobra:2','easyaga-webdesign:1','pingo:3','produtos-03:2','modo:1',
        'dito:3','produtos-01:3','alva:1','rakestra-identidade:3','matiz:3','produtos-02:3','vespera:2','modo:2','produtos-03:3','nove-patios:2','pingo:2','easyaga-webdesign:3','dobra:3'];
      const remaining=new Map(cards.map(card=>[`${card.project.id}:${card.slot}`,card]));
      order.forEach(key=>{const card=remaining.get(key);if(card){feedCard(card.project,card.image,false);remaining.delete(key);}});
      remaining.forEach(card=>feedCard(card.project,card.image,false));
    }else cards.forEach(card=>feedCard(card.project,card.image,false));
    filters.replaceChildren();
    const addFilter=(tag,title)=>{const button=element('button','button',title);button.type='button';button.setAttribute('aria-pressed',String(tagFilter===tag));button.addEventListener('click',()=>{tagFilter=tag;[...filters.children].forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();});filters.append(button);};
    const tags=[...new Set(projects.flatMap(project=>project.tags||[]))].sort((a,b)=>a.localeCompare(b,(window.portfolioI18n?.locale||'pt-BR')));
    addFilter(null,'Todos');tags.forEach(tag=>addFilter(tag,tag));
    update();updateZoom();
  }
  function update(){
    if(!active)return;
    const visible=new Set(catalog[active].filter(matches).map(p=>p.id));
    const unique=tagFilter!==null||search.value.trim()!=='';
    const firstImages=new Map(catalog[active].map(project=>[project.id,project.images[0]]));
    [...feed.children].forEach(card=>{const id=card.dataset.project;card.hidden=!visible.has(id)||(unique&&feedImages.get(card)!==firstImages.get(id));});
    [...index.children].forEach(card=>card.hidden=!visible.has(card.dataset.project));
    empty.hidden=visible.size>0;empty.textContent=active==='software'&&catalog[active].length===0?'Projetos em preparação.':'Nenhum projeto encontrado.';
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
        const image=feedImages.get(card),img=card.querySelector('.feed-media img');
        if(image?.formats&&img.dataset.thumbOrientation!==card.dataset.orientation)applyImage(img,image,card.dataset.orientation);
      }
      row++;
    }
  }
  function updateZoom(){feed.style.setProperty('--feed-units',String(units));feed.style.setProperty('--release-columns',String(units/2));document.querySelector('#larger').disabled=units===4;document.querySelector('#smaller').disabled=units===8;distributeModules();}
  function changeView(next,push=true){
    window.aboutPage?.close();
    window.projectPage?.close(false);
    if(next==='grid'){navigate(null);return;}
    view=next==='index'?'index':'feed';feed.hidden=view!=='feed';index.hidden=view!=='index';
    if(servicesHero)servicesHero.hidden=active!=='produtos'||view!=='feed';
    document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    index.querySelectorAll('.index-open').forEach(row=>row.classList.remove('index-open'));
    if(push){const url=window.portfolioRoutes.read();url.searchParams.delete('project');if(view==='index')url.searchParams.set('view','index');else url.searchParams.delete('view');history.replaceState({},'',url);}
    window.scrollTo(0,0);
  }
  function navigate(key,push=true){
    window.aboutPage?.close();
    window.projectPage?.close(false);
    const next=catalog[key]?key:null;
    if(!next&&!push)homeView=window.portfolioRoutes.read().searchParams.get('view')==='index'?'index':'grid';
    if(next&&!active)homeView=grid.classList.contains('index-view')?'index':'grid';
    active=next;tagFilter=null;search.value='';setMenu(false);search.hidden=true;document.querySelector('.search-button').setAttribute('aria-expanded','false');document.querySelector('.search-button').setAttribute('aria-label','Abrir busca');
    if(servicesHero)servicesHero.hidden=active!=='produtos';
    filters.hidden=true;document.querySelector('#filter-toggle').setAttribute('aria-expanded','false');
    grid.hidden=Boolean(active);areaButton.hidden=!active;main.dataset.area=active||'';
    if(active){
      const title=entries[active].title;areaButton.textContent=title;areaButton.title=title;heading.textContent=title;document.title=`${title} · Bruno Nascimento`;
      search.placeholder=`Buscar em ${title}`;search.setAttribute('aria-label',`Buscar projetos em ${title}`);filters.setAttribute('aria-label',`Filtrar ${title} por tags`);
      units=6;render();changeView(window.portfolioRoutes.read().searchParams.get('view')==='index'&&!push?'index':'feed',false);
    }else{
      feed.hidden=true;index.hidden=true;filters.replaceChildren(...homeFilters);filters.setAttribute('aria-label','Filtrar áreas');heading.textContent='Áreas de atuação de Bruno Nascimento';document.title='Bruno Nascimento · Portfólio';search.placeholder='Qual área você procura?';search.setAttribute('aria-label','Buscar uma área');empty.textContent='Nenhuma área encontrada.';
      grid.classList.toggle('index-view',homeView==='index');document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===homeView)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});responsive();updateCards();if(homeView==='index')prepareIndexGalleries();
    }
    if(push){const url=window.portfolioRoutes.read();url.hash='';url.searchParams.delete('page');url.searchParams.delete('view');url.searchParams.delete('project');if(active)url.searchParams.set('area',active);else url.searchParams.delete('area');history.pushState({},'',url);}
    window.scrollTo(0,0);
  }
  window.areaFeed={get active(){return active;},navigate,view:changeView,update,zoom(delta){units=Math.max(4,Math.min(8,units+delta*2));updateZoom();}};
  window.addEventListener('popstate',()=>navigate(window.portfolioRoutes.read().searchParams.get('area'),false));
  mobile.addEventListener('change',()=>{if(active)updateZoom();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')index.querySelectorAll('.index-open').forEach(r=>r.classList.remove('index-open'));});
  const initial=window.portfolioRoutes.read().searchParams.get('area');
  if(catalog[initial])navigate(initial,false);
})();
