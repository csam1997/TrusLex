function updateStats(d){
  const usS=new Set(d.filter(c=>c.state).map(c=>c.state)).size,ic=d.filter(c=>c.isInternational).length,sm={},cm={};
  d.forEach(c=>{sm[c.sector]=(sm[c.sector]||0)+1;cm[c.claimType]=(cm[c.claimType]||0)+1;});
  const ts=Object.entries(sm).sort((a,b)=>b[1]-a[1])[0]||['-',0],tc=Object.entries(cm).sort((a,b)=>b[1]-a[1])[0]||['-',0];
  const ay=[...new Set(CASES.map(c=>c.year).filter(Boolean))].sort(),my=ay[0]||2019,base=Math.max(CASES.filter(c=>c.year===my).length,1);
  set('s-total',d.length);
  set('s-states',`${usS} states - ${ic} intl`);
  set('s-trend',`+ ${Math.max(0,Math.round((CASES.length-base)/base*100))}%`);
  set('s-us',d.filter(c=>!c.isInternational).length);
  set('s-us-sub',`${usS} states`);
  set('s-intl',ic);
  set('s-intl-sub',`${new Set(d.filter(c=>c.isInternational).map(c=>c.country)).size} countries`);
  set('s-sector',ts[0]);
  set('s-sector-count',`${ts[1]} cases`);
  set('s-claim',tc[0]);
  set('s-claim-count',`${tc[1]} cases`);
  set('claim-sub',`${d.length} cases - ${geoSel?(geoSel.type==='state'?(ABBR_TO_NAME[geoSel.value]||geoSel.value):geoSel.value):'All'}`);
}
function set(id,v){const el=document.getElementById(id);if(el)el.textContent=v;}
