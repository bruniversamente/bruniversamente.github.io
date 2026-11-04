/* About is a page within the same navigation shell as the portfolio areas. */
(() => {
  const page=document.querySelector('#about-page'),main=document.querySelector('main'),heading=document.querySelector('main>h1'),bottom=document.querySelector('.bottom-panel');
  let active=false;
  function close(){
    if(!active)return;
    active=false;page.hidden=true;main.classList.remove('about-mode');heading.hidden=false;bottom.hidden=false;grid.hidden=false;
    document.querySelectorAll('[data-about]').forEach(link=>link.removeAttribute('aria-current'));
  }
  function open(push=true){
    if(active){setMenu(false);return;}
    window.areaFeed.navigate(null,false);
    active=true;setMenu(false);grid.hidden=true;heading.hidden=true;document.querySelector('.empty').hidden=true;bottom.hidden=true;
    page.hidden=false;main.classList.add('about-mode');document.title='Sobre · Bruno Nascimento';
    document.querySelectorAll('[data-view]').forEach(button=>button.removeAttribute('aria-current'));
    document.querySelectorAll('[data-about]').forEach(link=>link.setAttribute('aria-current','page'));
    if(push){const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('page','sobre');history.pushState({},'',url);}
    window.scrollTo(0,0);document.querySelector('#about-title').focus({preventScroll:true});
  }
  page.querySelector('[data-about-areas]').addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.areaFeed.navigate(null);});
  window.aboutPage={open,close,get active(){return active;}};
  window.addEventListener('popstate',()=>{if(new URL(location.href).searchParams.get('page')==='sobre')open(false);else close();});
  if(new URL(location.href).searchParams.get('page')==='sobre')open(false);
})();
