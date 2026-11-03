/* This release exposes the three ready areas. */
(() => {
  const url=new URL(location.href);
  if(url.hash==='#cases'){url.searchParams.set('area','dados');url.hash='';history.replaceState(history.state,'',url);}
  if(url.searchParams.has('area')&&!['dados','design','arquitetura'].includes(url.searchParams.get('area'))){
    url.searchParams.delete('area');url.searchParams.delete('project');url.searchParams.delete('view');
    history.replaceState(history.state,'',url);
  }else if(!url.searchParams.has('area')&&/^dados-0[1-5]$/.test(url.searchParams.get('project')||'')){
    url.searchParams.set('area','dados');history.replaceState(history.state,'',url);
  }
  if(url.hash==='#contato')document.addEventListener('DOMContentLoaded',()=>setMenu(true),{once:true});
})();
