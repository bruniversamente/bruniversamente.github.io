/* Native, silent cover loops. Review tools and Remotion stay outside production. */
(() => {
  'use strict';
  const grid=document.querySelector('#project-grid');
  if(!grid)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  const players=new Map();
  function stop(video,showStill=false){video.pause();if(showStill)video.parentElement.classList.remove('motion-playing');}
  async function play(video){
    if(document.hidden||reduced.matches||connection?.saveData||!players.get(video)?.visible)return;
    try{
      if(!video.src){video.src=video.dataset.motionSrc;video.load();}
      await video.play();
      if(document.hidden||reduced.matches||!players.get(video)?.visible){stop(video);return;}
      video.parentElement.classList.add('motion-playing');
    }catch{stop(video,true);}
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){const video=entry.target,state=players.get(video);state.visible=entry.isIntersecting&&entry.intersectionRatio>.01;
      if(state.visible)play(video);else stop(video);
    }
  },{threshold:[0,.02]});
  function refresh(){for(const video of players.keys()){if(document.hidden||reduced.matches||connection?.saveData)stop(video,reduced.matches||connection?.saveData);else play(video);}}
  document.addEventListener('visibilitychange',refresh);reduced.addEventListener('change',refresh);connection?.addEventListener?.('change',refresh);
  fetch('portfolio/assets/home-motion/manifest.json?v=home-motion-20261105').then(response=>{
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
      players.set(video,{visible:false});frame.append(video);observer.observe(video);
    }
  }).catch(()=>{/* Existing covers remain available when media cannot load. */});
})();
