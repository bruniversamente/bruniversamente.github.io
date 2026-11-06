/* Native, silent cover loops. Review tools and Remotion stay outside production. */
(() => {
  'use strict';
  const grid=document.querySelector('#project-grid');
  if(!grid)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  const players=new Map(),canHover=matchMedia('(hover: hover) and (pointer: fine)');
  const imageCache=new Map();
  function cueFor(state){
    const cues=state.asset.hoverStills;
    if(!cues?.images?.length)return {index:0,src:state.asset.poster};
    const step=cues.stepSeconds||3,offset=cues.switchOffsetSeconds||0;
    const time=Number.isFinite(state.video.currentTime)?Math.max(0,state.video.currentTime):0;
    const index=Math.floor((time+offset)/step)%cues.images.length;
    return {index,src:cues.images[index]};
  }
  function loadImage(src){
    if(!imageCache.has(src)){
      const image=new Image();image.src=src;
      const loaded=image.decode?image.decode():new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;});
      // Keep failures local: the existing cover remains a usable fallback.
      imageCache.set(src,loaded.then(()=>src).catch(()=>null));
    }
    return imageCache.get(src);
  }
  function warm(state){
    if(!state.visible||connection?.saveData||reduced.matches)return;
    const cue=cueFor(state),images=state.asset.hoverStills?.images;
    loadImage(cue.src);
    if(images?.length)loadImage(images[(cue.index+1)%images.length]);
  }
  function isHeld(state){return state.hovered||state.focused;}
  function hold(state){
    state.video.pause();
    const request=++state.request,cue=cueFor(state);
    // Keep the paused video underneath until the assembled image has decoded.
    // Never expose the unrelated base cover between these two views.
    state.frame.classList.add('motion-held');
    state.frame.classList.remove('motion-still-ready');
    let usedFallback=false;
    loadImage(cue.src).then(current=>{
      if(current)return current;
      usedFallback=true;
      return loadImage(state.asset.hoverStills?.images?.[0]||state.asset.poster);
    }).then(src=>{
        if(request!==state.request||!isHeld(state))return;
        if(!src)return;
        state.still.src=src;
        state.still.dataset.scene=String(usedFallback?0:cue.index);
        const reveal=()=>{
          if(request===state.request&&isHeld(state))state.frame.classList.add('motion-still-ready');
        };
        if(state.still.decode)state.still.decode().then(reveal).catch(()=>{});
        else reveal();
      });
  }
  function release(state){
    if(isHeld(state))return;
    ++state.request;
    // Keep the assembled image visible until playback has actually resumed.
    play(state.video);
  }
  function stop(video,showStill=false){video.pause();if(showStill)video.parentElement.classList.remove('motion-playing');}
  async function play(video){
    const state=players.get(video);
    if(document.hidden||reduced.matches||connection?.saveData||!state?.visible||isHeld(state))return;
    try{
      if(!video.src){video.src=video.dataset.motionSrc;video.load();}
      await video.play();
      if(document.hidden||reduced.matches||connection?.saveData||!state.visible||isHeld(state)){stop(video);return;}
      state.frame.classList.remove('motion-held','motion-still-ready');
      video.parentElement.classList.add('motion-playing');
      warm(state);
    }catch{
      // Pausing a pending play() can reject it. Preserve the held frame in that case.
      if(!isHeld(state))stop(video,true);
    }
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){const video=entry.target,state=players.get(video);state.visible=entry.isIntersecting&&entry.intersectionRatio>.01;
      if(state.visible)play(video);else stop(video);
    }
  },{threshold:[0,.02]});
  function refresh(){for(const video of players.keys()){if(document.hidden||reduced.matches||connection?.saveData)stop(video,reduced.matches||connection?.saveData);else play(video);}}
  document.addEventListener('visibilitychange',refresh);reduced.addEventListener('change',refresh);connection?.addEventListener?.('change',refresh);
  fetch('portfolio/assets/home-motion/manifest.json?v=home-hover-still-20261106').then(response=>{
    if(!response.ok)throw Error('Motion manifest unavailable');return response.json();
  }).then(manifest=>{
    const lang=window.portfolioI18n?.lang||'pt';
    for(const [area,asset] of Object.entries(manifest.areas)){
      // Retain the existing translated cover where the selected artwork itself
      // contains Portuguese copy. Embedded product screens remain unchanged.
      if(!asset.languages.includes(lang))continue;
      const card=grid.querySelector(`[data-area="${area}"]`),frame=card?.querySelector('.project-image');if(!frame)continue;
      const video=document.createElement('video');video.className='area-cover-motion';video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;
      video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');video.tabIndex=-1;
      video.preload='none';video.poster=asset.poster;video.dataset.motionSrc=asset.src;
      video.addEventListener('error',()=>stop(video,true));
      const still=document.createElement('img');still.className='area-cover-still';still.alt='';still.setAttribute('aria-hidden','true');
      const state={video,frame,card,still,asset,visible:false,hovered:false,focused:false,request:0};
      players.set(video,state);card.classList.add('has-area-motion');frame.append(video,still);
      card.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||!canHover.matches)return;state.hovered=true;hold(state);});
      card.addEventListener('pointerleave',()=>{state.hovered=false;release(state);});
      card.addEventListener('focus',()=>{if(card.matches(':focus-visible')){state.focused=true;hold(state);}});
      card.addEventListener('blur',()=>{state.focused=false;release(state);});
      video.addEventListener('timeupdate',()=>warm(state));
      // A reload can finish while the pointer is already over this card.
      if(canHover.matches&&card.matches(':hover')){state.hovered=true;hold(state);}
      observer.observe(video);
    }
  }).catch(()=>{/* Existing covers remain available when media cannot load. */});
})();
