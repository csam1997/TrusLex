let rzT;window.addEventListener('resize',()=>{if(_R)return;clearTimeout(rzT);rzT=setTimeout(()=>{if(CASES.length)render();},400);});
init();
