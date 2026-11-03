/* Ordered project chapters. Content comes from local case files, never HTML injection. */
(() => {
  const sources=new Set(["dados/dados-01", "dados/dados-02", "dados/dados-03", "dados/dados-04", "dados/dados-05"]);
  let dispose=()=>{};
  function node(tag,className,text){const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;}
  function render(data,mediaFigure){
    dispose();
    const story=data.story,events=new AbortController(),fragments=[],originalCover=data.cover||data.media[0];
    const cover=originalCover&&/^Abrir\b/.test(originalCover.alt)?{...originalCover,alt:`Capa de ${data.title}`}:originalCover;
    const collection=story.heroBoard?data.media:[cover,...data.media.filter(m=>m.src!==cover.src)].filter(Boolean);
    window.mediaViewer.setCollection(`${data.title} · ${data.subtitle}`,collection);
    const figure=(media,isCover=false)=>{const f=mediaFigure(media,isCover,collection.findIndex(m=>m.src===media.src));if(media.caption&&!isCover)f.append(node('figcaption','story-caption',media.caption));return f;};
    const hero=node('section','case-hero story-hero');
    const title=node('h1','case-headline');title.tabIndex=-1;title.append(node('span','case-client',data.title),node('span','case-title',data.subtitle));hero.append(title);
    const tags=node('div','case-tags');data.tags.forEach(tag=>tags.append(node('span','case-tag',tag)));hero.append(tags);
    if(story.heroBoard){const boards=node('div','rakestra-boards no-notes');boards.append(block(story.heroBoard));hero.append(boards);}
    else if(cover){const f=figure(cover,true);if(story.coverFit==='contain')f.classList.add('story-cover--contain');hero.append(f);}
    const intro=node('div','story-intro');if(story.notice)intro.append(node('p','story-notice',story.notice));intro.append(node('p','story-lead',data.intro));
    if(story.role)intro.append(node('p','story-role',story.role));if(!story.introInBoard)hero.append(intro);fragments.push(hero);
    const layout=node('div',story.navigation?'story-layout':'story-visual'),body=node('div','story-content');
    if(story.composition==='rakestra-boards')body.classList.add('rakestra-boards','no-notes');
    const allLinks=[],sections=[],currentLabels=[];
    const createLinks=()=>{const nav=node('nav','story-chapter-links');nav.setAttribute('aria-label','Capítulos do projeto');
      story.chapters.forEach(chapter=>{const a=node('a','story-chapter-link',chapter.label||chapter.title);a.href=`#chapter-${chapter.id}`;a.addEventListener('click',event=>{
        if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();
        const section=body.querySelector(`#chapter-${chapter.id}`);if(!section)return;
        const url=new URL(location.href);url.hash=section.id;history.replaceState({...history.state},'',url);
        layout.querySelectorAll('details').forEach(details=>details.open=false);section.focus({preventScroll:true});
        section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
      },{signal:events.signal});allLinks.push({a,id:chapter.id});nav.append(a);});return nav;};
    if(story.navigation){
      const aside=node('aside','story-aside'),desktop=node('div','story-nav-desktop');desktop.append(node('p','story-nav-title',data.title),createLinks());
      const mobile=node('details','story-nav-mobile'),summary=node('summary','','Capítulos'),label=node('span','story-current-label',story.chapters[0].label);currentLabels.push(label);summary.append(label);mobile.append(summary,createLinks());aside.append(desktop,mobile);layout.append(aside);
    }
    function block(item){
      if(['analysis','method','reading','decisions'].includes(item.type))return window.projectAnalysis.render(item,data.analysisData,events.signal);
      if(item.type==='board'){
        function restore(tree,svg=false){
          if(typeof tree==='string')return document.createTextNode(tree);
          if(tree.media){const media=data.media.find(m=>m.id===tree.media),f=figure(media);if(tree.class)f.classList.add(...tree.class.split(/\s+/));f.querySelector('figcaption')?.classList.remove('story-caption');return f;}
          const ns=svg||tree.tag==='svg',n=ns?document.createElementNS('http://www.w3.org/2000/svg',tree.tag):document.createElement(tree.tag);
          Object.entries(tree.attrs||{}).forEach(([name,value])=>n.setAttribute(name,value));(tree.children||[]).forEach(child=>n.append(restore(child,ns)));return n;
        }
        return restore(item.tree);
      }
      if(item.type==='text'){const box=node('div','story-copy');if(item.title)box.append(node('h3','story-subheading',item.title));item.paragraphs.forEach(text=>box.append(node('p','',text)));return box;}
      if(item.type==='list'){const list=node(item.ordered?'ol':'ul','story-list');item.items.forEach(text=>list.append(node('li','',text)));return list;}
      if(item.type==='media'){const box=node('div',`story-media${item.items.length>1?' story-media--pair':''}${item.screens?' story-media--screens':''}`);item.items.forEach(id=>{const media=data.media.find(m=>m.id===id);if(media)box.append(figure(media));});return box;}
      if(item.type==='metrics'){const list=node('dl','story-metrics');item.items.forEach(m=>{const group=node('div');group.append(node('dt','',m.label),node('dd','',m.value));if(m.note)group.append(node('p','',m.note));list.append(group);});return list;}
      if(item.type==='bars'){const chart=node('figure','story-chart');chart.append(node('figcaption','story-chart-title',item.title));if(item.note)chart.append(node('p','story-chart-note',item.note));const list=node('ol','story-bars');item.rows.forEach(row=>{const li=node('li',row.emphasis?'is-emphasis':'');const top=node('div','story-bar-label');top.append(node('span','',row.label),node('span','',row.display));const track=node('span','story-bar-track'),fill=node('span','story-bar-fill');fill.style.width=`${Math.max(0,Math.min(100,row.value/item.max*100))}%`;track.setAttribute('aria-hidden','true');track.append(fill);li.append(top,track);if(row.note)li.append(node('span','story-bar-note',row.note));list.append(li);});chart.append(list);return chart;}
      if(item.type==='table'){const wrap=node('div','story-table-wrap'),table=node('table','story-table');if(item.caption)table.append(node('caption','',item.caption));const head=node('thead'),tr=node('tr');item.columns.forEach(c=>{const th=node('th','',c);th.scope='col';tr.append(th);});head.append(tr);table.append(head);const tbody=node('tbody');item.rows.forEach(values=>{const row=node('tr');values.forEach((v,i)=>{const cell=node(i?'td':'th','',v);if(!i)cell.scope='row';row.append(cell);});tbody.append(row);});table.append(tbody);wrap.append(table);return wrap;}
      if(item.type==='links'){const links=node('div','story-links');item.items.forEach(link=>{const a=node('a','button',`${link.title} ↗`);a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';links.append(a);});return links;}
      return node('div');
    }
    story.chapters.forEach(chapter=>{const section=node('section','story-chapter');section.id=`chapter-${chapter.id}`;section.tabIndex=-1;const h=node('h2','story-chapter-title',chapter.title);h.id=section.id+'-title';section.setAttribute('aria-labelledby',h.id);if(chapter.kicker)section.append(node('span','analysis-stage-kicker',chapter.kicker));section.append(h);chapter.blocks.forEach(item=>section.append(block(item)));body.append(section);sections.push({section,chapter});});
    layout.append(body);fragments.push(layout);
    if(story.endnote)fragments.push(node('p','story-endnote',story.endnote));
    const stopAnalysis=window.projectAnalysis?.observe(layout)||(()=>{});
    if(story.navigation){
      let frame=0;
      const sync=()=>{frame=0;const offset=document.querySelector('.header').getBoundingClientRect().bottom+90;
        const current=sections.reduce((active,item)=>item.section.getBoundingClientRect().top<=offset?item:active,sections[0]);
        allLinks.forEach(({a,id})=>{if(id===current.chapter.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});currentLabels.forEach(label=>label.textContent=current.chapter.label||current.chapter.title);
      };
      const requestSync=()=>{if(!frame)frame=requestAnimationFrame(sync);};window.addEventListener('scroll',requestSync,{passive:true,signal:events.signal});window.addEventListener('resize',requestSync,{signal:events.signal});requestSync();
      dispose=()=>{events.abort();cancelAnimationFrame(frame);stopAnalysis();};
    }else dispose=()=>{events.abort();stopAnalysis();};
    return {fragments,title};
  }
  window.projectStory={sources,render,reset(){dispose();dispose=()=>{};}};
})();
