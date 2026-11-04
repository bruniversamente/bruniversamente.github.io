/* Interactive .aga container example using the selected product module. */
(() => {
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function renderPackage(item,signal){
    const root=el('section','aga-package-example'),controls=el('div','software-scenarios'),result=el('div','aga-package-result');
    controls.setAttribute('role','group');controls.setAttribute('aria-label','Conferir o formato .aga');result.setAttribute('aria-live','polite');
    const scenarios=['Pacote íntegro','Conteúdo alterado','Versão desconhecida'];let api,compression,sequence=0;
    const buttons=scenarios.map((name,index)=>{const button=el('button','button',name);button.type='button';button.disabled=true;button.addEventListener('click',()=>select(index),{signal});controls.append(button);return button;});
    async function select(index){
      const ticket=++sequence;
      buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      result.replaceChildren(el('p','','Conferindo o pacote…'));
      try{
        const options={appVersion:'portfolio-example',name:'Exemplo de estrutura',projectId:'portfolio-container-001',createdAt:'2026-11-04T12:00:00Z',updatedAt:'2026-11-04T12:00:00Z',project:{example:'Estrutura reduzida do pacote; não é um estudo técnico completo.',sources:['pontos.csv'],runId:'demo-run-001'},attachments:[{id:'source-1',name:'pontos.csv',mediaType:'text/csv',data:new TextEncoder().encode('id;base;topo\nV1;27;37.5\n')}]};
        let bytes=await api.createAgaProject(options);
        const files=compression.unzipSync(bytes);
        if(index===1){files['project.json']=new TextEncoder().encode('{"changed":true}');bytes=compression.zipSync(files);}
        if(index===2){
          const manifest=JSON.parse(new TextDecoder().decode(files['manifest.json']));manifest.schemaVersion=999;
          files['manifest.json']=new TextEncoder().encode(JSON.stringify(manifest));
          const hashes={};for(const [path,data] of Object.entries(files)){if(path==='checksums.json')continue;const hash=await crypto.subtle.digest('SHA-256',data);hashes[path]=[...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');}
          files['checksums.json']=new TextEncoder().encode(JSON.stringify(hashes));bytes=compression.zipSync(files);
        }
        const opened=await api.openAgaProject(bytes);
        if(signal.aborted||ticket!==sequence)return;
        const list=el('dl','aga-package-fields');
        for(const [term,value] of [['Formato','.aga · pacote ZIP'],['Versão',String(opened.manifest.schemaVersion)],['Identidade',opened.manifest.projectId],['Anexos',String(opened.attachments.size)],['Conteúdo','Projeto e anexo restaurados']])list.append(el('dt','',term),el('dd','',value));
        result.replaceChildren(el('h3','story-subheading','Pacote conferido e aberto'),list,el('p','',`O leitor conferiu ${Object.keys(files).length-1} arquivos contra o registro de integridade.`));
      }catch(error){if(signal.aborted||ticket!==sequence)return;result.replaceChildren(el('h3','story-subheading','Abertura recusada'),el('p','aga-package-message',error instanceof Error?error.message:String(error)),el('p','',index===1?'O conteúdo diverge do SHA-256 registrado no pacote.':'O formato declara uma versão que este leitor não conhece.'));}
    }
    root.append(el('p','software-eyebrow','Formato .aga · funções reais do produto'),controls,result,el('p','editorial-note','Exemplo reduzido e fictício do contêiner; não executa o motor nem representa um estudo completo. Os hashes conferem integridade do conteúdo, sem comprovar sua autoria ou validade técnica.'));
    result.append(el('p','','Carregando o leitor do formato…'));
    Promise.all([import('./assets/software/agastudio/rules/aga-project.js'),import('./assets/software/agastudio/vendor/fflate.js')]).then(([product,zip])=>{if(signal.aborted)return;api=product;compression=zip;buttons.forEach(b=>b.disabled=false);select(0);}).catch(()=>{if(!signal.aborted)result.replaceChildren(el('p','','Não foi possível carregar o exemplo. Recarregue a página para tentar novamente.'));});
    return root;
  }
  window.agaSoftwareCase={renderPackage};
})();
