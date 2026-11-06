/* This release exposes the five ready areas. */
(() => {
  const url=window.portfolioRoutes.read();

  if(url.searchParams.get('area')==='design'&&url.searchParams.get('project')==='rakestra-identidade'){
    url.searchParams.set('area','produtos');history.replaceState(history.state,'',url);
  }
  if(['easyaga-branding','easyaga-website'].includes(url.searchParams.get('project'))){
    url.searchParams.set('area','produtos');url.searchParams.set('project','easyaga-webdesign');
    history.replaceState(history.state,'',url);
  }
  if(url.searchParams.get('area')==='arquitetura'){
    url.searchParams.set('area',url.searchParams.get('project')==='tfg'?'design':'consultoria');
    url.hash='';history.replaceState(history.state,'',url);
  }
  if(url.hash==='#cases'){url.searchParams.set('area','dados');url.hash='';history.replaceState(history.state,'',url);}
  if(url.searchParams.has('area')&&!['dados','design','consultoria','beleza','produtos','software'].includes(url.searchParams.get('area'))){
    url.searchParams.delete('area');url.searchParams.delete('project');url.searchParams.delete('view');
    history.replaceState(history.state,'',url);
  }else if(!url.searchParams.has('area')&&/^dados-0[1-5]$/.test(url.searchParams.get('project')||'')){
    url.searchParams.set('area','dados');history.replaceState(history.state,'',url);
  }
  window.portfolioRoutes.canonicalize();
  if(url.hash==='#contato')document.addEventListener('DOMContentLoaded',()=>setMenu(true),{once:true});
})();
