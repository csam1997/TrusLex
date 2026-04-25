function setupUpload(){
  const di=document.getElementById('upload-input'),si=document.getElementById('secondary-input'),gb=document.getElementById('empty-go-btn'),dn=document.getElementById('dail-file-name'),sn=document.getElementById('secondary-file-name');
  let df=null,sf=null;
  di.addEventListener('change',e=>{
    df=e.target.files[0]||null;
    if(dn){dn.textContent=df?df.name:'No file selected';dn.className='file-chosen'+(df?' has-file':'');}
    if(gb)gb.disabled=!df;
    if(df&&document.getElementById('dashboard').style.display!=='none')doUpload(df,sf);
  });
  si.addEventListener('change',e=>{
    sf=e.target.files[0]||null;
    if(sn){sn.textContent=sf?sf.name:'No file selected';sn.className='file-chosen'+(sf?' has-file':'');}
    if(sf&&df&&document.getElementById('dashboard').style.display!=='none')doUpload(df,sf);
  });
  installDemoButton(gb);
  window.triggerUpload=()=>{if(df)doUpload(df,sf);};
}
function installDemoButton(gb){
  if(!gb||document.getElementById('demo-data-btn'))return;
  const row=document.createElement('div');
  row.className='empty-action-row';
  gb.parentNode.insertBefore(row,gb);
  row.appendChild(gb);
  const db=document.createElement('button');
  db.type='button';
  db.id='demo-data-btn';
  db.className='demo-data-btn';
  db.textContent='Load Demo';
  db.onclick=loadDemoData;
  row.appendChild(db);
}
async function readFA(f){return new Uint8Array(await f.arrayBuffer());}
async function fetchDemoFile(url){const r=await fetch(url);if(!r.ok)throw new Error(`Unable to load ${url}`);return new Uint8Array(await r.arrayBuffer());}
function finishDatasetLoad(p,lm,st,prefix){
  CASES=p;
  secondaryUploaded=!!lm;
  const years=[...new Set(p.filter(c=>c.year).map(c=>c.year))].sort(),states=[...new Set(p.filter(c=>c.state).map(c=>c.state))],intl=p.filter(c=>c.isInternational).length;
  if(st){
    st.textContent=`${prefix}: ${p.length} cases - ${states.length} US, ${intl} intl - ${years.length?years[0]+'-'+years[years.length-1]:'no years'}`;
    st.className='ok';
  }
  updateSourcePill(CASES.length);
  mapInited=false;
  worldInitMode=null;
  geoSel=null;
  filters={year:'All',sector:'All Sectors',claim:'All Claims',outcome:'All Outcomes',jur:'All Jurisdictions'};
  showDashboard();
}
async function doUpload(df,sf){
  const st=document.getElementById('upload-status');
  st.textContent=`Parsing ${df.name}...`;
  st.className='';
  try{
    let lm=null;
    if(sf)lm=parseSecondaryXLSX(await readFA(sf));
    const p=parseDAILXLSX(await readFA(df),lm);
    if(!p){st.textContent='No case records found.';st.className='err';return;}
    finishDatasetLoad(p,lm,st,'Loaded');
  }catch(e){
    st.textContent='Upload failed: '+e.message;
    st.className='err';
  }
}
async function loadDemoData(){
  const st=document.getElementById('upload-status'),db=document.getElementById('demo-data-btn');
  if(db)db.disabled=true;
  if(st){st.textContent='Loading demo dataset...';st.className='';}
  try{
    if(window.location.protocol==='file:')throw new Error('open the app through http://localhost so bundled demo files can load');
    const[caseData,secondaryData]=await Promise.all([
      fetchDemoFile('data/sample/Case_Table_2026-Feb-21_1952.xlsx'),
      fetchDemoFile('data/sample/Secondary_Source_Coverage_Table_2026-Feb-21_2058.xlsx')
    ]);
    const links=parseSecondaryXLSX(secondaryData),p=parseDAILXLSX(caseData,links);
    if(!p)throw new Error('No demo case records found.');
    finishDatasetLoad(p,links,st,'Demo loaded');
  }catch(e){
    if(st){st.textContent='Demo load failed: '+e.message;st.className='err';}
  }finally{
    if(db)db.disabled=false;
  }
}
function resetData(){CASES=[];secondaryUploaded=false;mapInited=false;worldInitMode=null;geoSel=null;updateSourcePill(0);document.getElementById('upload-status').textContent='Purged.';document.getElementById('upload-status').className='';showEmptyState();}
