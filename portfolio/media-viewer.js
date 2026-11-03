/* Full-viewport project gallery with native dialog focus handling. */
(() => {
  const dialog=document.createElement('dialog');
  dialog.className='media-viewer';
  dialog.setAttribute('aria-labelledby','media-viewer-title');
  function node(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el;}
  function button(text,label,className='button'){const el=node('button',className,text);el.type='button';el.setAttribute('aria-label',label);return el;}
  const header=node('div','viewer-header'),title=node('h2','viewer-title');title.id='media-viewer-title';
  const closeButton=button('Fechar ×','Fechar galeria');header.append(title,closeButton);
  const stage=node('div','viewer-stage');
  const footer=node('div','viewer-footer'),navigation=node('div','viewer-navigation');
  const previous=button('←','Mídia anterior','icon-button viewer-arrow'),next=button('→','Próxima mídia','icon-button viewer-arrow');
  const counter=node('span','viewer-counter');counter.setAttribute('role','status');counter.setAttribute('aria-live','polite');
  navigation.append(previous,counter,next);
  const caption=node('p','viewer-caption'),zoomControls=node('div','viewer-zoom');
  const smaller=button('−','Diminuir zoom','icon-button viewer-zoom-button'),larger=button('+','Aumentar zoom','icon-button viewer-zoom-button'),fit=button('Ajustar','Ajustar imagem à tela');
  zoomControls.append(smaller,larger,fit);footer.append(navigation,caption,zoomControls);dialog.append(header,stage,footer);document.body.append(dialog);
  let items=[],position=0,active=false,opener=null,savedScroll=0,zoom=1,panX=0,panY=0,gesture=null;
  function imageSource(media){return media.src+(media.version?`?v=${media.version}`:'');}
  function pauseVideo(){stage.querySelectorAll('video').forEach(video=>video.pause());}
  function updateZoom(){
    const media=items[position],image=stage.querySelector('.viewer-image');
    if(!image||!media)return;
    const width=stage.clientWidth,height=stage.clientHeight,ratio=media.width/media.height;
    const fittedWidth=Math.min(width,height*ratio),fittedHeight=Math.min(height,width/ratio);
    const limitX=Math.max(0,(fittedWidth*zoom-width)/2),limitY=Math.max(0,(fittedHeight*zoom-height)/2);
    panX=Math.max(-limitX,Math.min(limitX,panX));panY=Math.max(-limitY,Math.min(limitY,panY));
    image.style.transform=`translate(${panX}px,${panY}px) scale(${zoom})`;
    stage.dataset.zoomed=String(zoom>1);smaller.disabled=zoom===1;larger.disabled=zoom===4;fit.disabled=zoom===1;
  }
  function changeZoom(step){if(items[position]?.type==='video')return;zoom=Math.max(1,Math.min(4,zoom+step));if(zoom===1){panX=0;panY=0;}updateZoom();}
  function show(index,play=false){
    pauseVideo();position=(index+items.length)%items.length;zoom=1;panX=0;panY=0;gesture=null;stage.dataset.zoomed='false';stage.replaceChildren();
    const media=items[position],isVideo=media.type==='video';
    caption.textContent=media.alt||'';counter.textContent=`${position+1} / ${items.length}`;counter.setAttribute('aria-label',`${isVideo?'Vídeo':'Imagem'} ${position+1} de ${items.length}`);
    previous.disabled=next.disabled=items.length<2;zoomControls.hidden=isVideo;
    if(isVideo&&zoomControls.contains(document.activeElement))next.focus({preventScroll:true});
    const element=node(isVideo?'video':'img',isVideo?'viewer-video':'viewer-image');
    element.setAttribute('aria-label',media.alt||(isVideo?'Vídeo do projeto':'Imagem do projeto'));
    if(isVideo){element.controls=true;element.playsInline=true;element.preload='metadata';if(media.poster)element.poster=media.poster;}
    else{element.alt=media.alt||'';element.width=media.width;element.height=media.height;element.draggable=false;}
    element.addEventListener('error',()=>{if(!stage.contains(element))return;zoomControls.hidden=true;const error=node('p','viewer-error','Não foi possível carregar esta mídia. Use as setas para continuar.');error.setAttribute('role','alert');stage.replaceChildren(error);});
    element.src=imageSource(media);stage.append(element);
    if(isVideo&&play)element.play().catch(()=>{});
    if(!isVideo)updateZoom();
  }
  function release(restore){
    if(!active)return;active=false;pauseVideo();stage.replaceChildren();gesture=null;document.documentElement.classList.remove('media-viewer-open');
    if(restore){if(opener?.isConnected)opener.focus({preventScroll:true});window.scrollTo(0,savedScroll);}
    opener=null;
  }
  function close(restore=true){if(dialog.open)dialog.close();release(restore);}
  function open(index,trigger){
    if(!items.length)return;
    opener=trigger||document.activeElement;savedScroll=window.scrollY;active=true;document.documentElement.classList.add('media-viewer-open');
    show(index,items[index]?.type==='video');if(!dialog.open)dialog.showModal();closeButton.focus({preventScroll:true});
  }
  function setCollection(label,media){close(false);title.textContent=label;items=media.map(item=>item.fullSrc?{...item,src:item.fullSrc,width:item.fullWidth||item.width,height:item.fullHeight||item.height,version:undefined}:item);}
  closeButton.addEventListener('click',()=>close());dialog.addEventListener('close',()=>{if(!dialog.open)release(true);});
  previous.addEventListener('click',()=>show(position-1));next.addEventListener('click',()=>show(position+1));
  larger.addEventListener('click',()=>changeZoom(.5));smaller.addEventListener('click',()=>changeZoom(-.5));fit.addEventListener('click',()=>{zoom=1;panX=0;panY=0;updateZoom();});
  dialog.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    if(event.key==='Tab'){
      const controls=[...dialog.querySelectorAll('button:not([disabled]),video[controls]')].filter(control=>control.getClientRects().length&&getComputedStyle(control).visibility!=='hidden');
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus({preventScroll:true});}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus({preventScroll:true});}
      return;
    }
    if(event.target.closest('video,input,textarea,select'))return;
    if(event.key==='ArrowLeft'){event.preventDefault();show(position-1);}
    else if(event.key==='ArrowRight'){event.preventDefault();show(position+1);}
    else if(event.key==='Home'){event.preventDefault();show(0);}
    else if(event.key==='End'){event.preventDefault();show(items.length-1);}
    else if(event.key==='+'||event.key==='='){event.preventDefault();changeZoom(.5);}
    else if(event.key==='-'){event.preventDefault();changeZoom(-.5);}
    else if(event.key==='0'){event.preventDefault();zoom=1;panX=0;panY=0;updateZoom();}
  });
  stage.addEventListener('dblclick',event=>{if(event.target.closest('video'))return;zoom=zoom===1?2:1;panX=0;panY=0;updateZoom();});
  stage.addEventListener('pointerdown',event=>{
    if(event.target.closest('video')||event.button!==0)return;
    gesture={id:event.pointerId,x:event.clientX,y:event.clientY,panX,panY};
    if(zoom>1){event.preventDefault();stage.setPointerCapture(event.pointerId);stage.classList.add('is-dragging');}
  });
  stage.addEventListener('pointermove',event=>{if(!gesture||gesture.id!==event.pointerId||zoom===1)return;panX=gesture.panX+event.clientX-gesture.x;panY=gesture.panY+event.clientY-gesture.y;updateZoom();});
  function endGesture(event){
    if(!gesture||gesture.id!==event.pointerId)return;
    const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
    if(zoom===1&&event.pointerType==='touch'&&Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.3)show(position+(dx<0?1:-1));
    gesture=null;stage.classList.remove('is-dragging');
  }
  stage.addEventListener('pointerup',endGesture);stage.addEventListener('pointercancel',()=>{gesture=null;stage.classList.remove('is-dragging');});
  new ResizeObserver(()=>{if(active&&items[position]?.type!=='video')updateZoom();}).observe(stage);
  window.mediaViewer={setCollection,open,close};
})();
