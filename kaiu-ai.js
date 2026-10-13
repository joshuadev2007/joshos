/* Kaiu AI · context-aware proposal UI. Real AI available ONLY after authenticated Edge Function deployment. */
(()=>{'use strict';
const G=window.JoshAIActionGate;
const PROJECT='https://pdgfayuuovhjcqnzgvyb.supabase.co';
const WORKER_SETTING='kaiu-workers-ai-endpoint-v1';
const key=window.CloudDefaultConfig?.anonKey||'';
const P={rutinas:['🌅 Kaiu Hábitos','Hábitos pequeños, sostenibles y hechos para tu vida.','#a6e7a4'],finanzas:['₡ Kaiu Financiero','Organizá tu dinero sin conectar tus cuentas bancarias.','#7ee2b4'],skillforge:['🎓 Kaiu Profesor','Practicá con tarjetas y rutas de estudio.','#c6b5ff'],agenda:['📅 Kaiu Planificador','Convertí tus ideas en tareas concretas.','#8bc3fc'],estudios:['📐 Kaiu Academia','Prepará aprendizajes con metas claras.','#e6bf8e'],negocios:['💼 Kaiu Emprendedor','Ideas de crecimiento y planes medibles.','#ffd29e'],bitacora:['📖 Kaiu Investigador','Explorá ideas y preguntas respetando tu interpretación.','#b1d8aa']};
Object.assign(P,{
 inicio:['✨ Kaiu Central','Planeemos tu día de forma realista.','#b7f36e'],centro:['◈ Kaiu Control','Uní todas tus metas y prioridades.','#b7f36e'],ahorros:['🎯 Kaiu Ahorro','Metas y pasos según tus posibilidades.','#96e1c3'],proyectos:['🚀 Kaiu Proyectos','De una idea al próximo entregable.','#ffb69b'],notas:['🧠 Kaiu Ideas','Convertí tus notas en próximos pasos.','#c9b5ff'],aula:['🎨 Kaiu Aula','Dinámicas para aprender jugando.','#f9c3e6'],enfoque:['⏳ Kaiu Foco','Cuidá tu energía y tu concentración.','#abd9ee'],cocina:['🍲 Kaiu Cocina','Menús, ingredientes y organización.','#ffd3a6'],diario:['✒️ Kaiu Reflexión','Escribir también ayuda a ordenar pensamientos.','#f1beda'],hogar:['🏡 Kaiu Hogar','Mantenimiento y pequeñas rutinas.','#c3df9e'],documentos:['🗂️ Kaiu Archivo','Ubicá tus papeles sin guardar datos sensibles.','#bfcff6'],contactos:['🤝 Kaiu Red','Seguimientos respetuosos y profesionales.','#a9d8c9'],digital:['🖥️ Kaiu Tech','Backups y mantenimiento de dispositivos.','#abbfff'],decisiones:['⚖️ Kaiu Decisiones','Compará tus opciones con calma.','#9bcaff'],objetivos:['🏹 Kaiu Metas','Resultados medibles y pasos pequeños.','#efd19a'],viajes:['🧳 Kaiu Viajes','Prepará salidas, listas y presupuestos.','#b8d9da'],wishlist:['🛒 Kaiu Compras','Compará alternativas antes de comprar.','#eabbaa'],semanal:['✍️ Kaiu Semana','Reconocé lo que avanzaste y reorganizá.','#c1ddfa'],suscripciones:['💳 Kaiu Servicios','Revisá tus pagos recurrentes.','#c2b6fb'],bienestar:['🌿 Kaiu Bienestar','Hábitos equilibrados sin juicios.','#b1e1bd'],despensa:['🥦 Kaiu Despensa','Aprovechá alimentos y planificá compras.','#b4d993'],inventario:['📦 Kaiu Inventario','Tené tus cosas y garantías al día.','#b4c8e5'],biblioteca:['📚 Kaiu Lecturas','Convertí libros en aprendizajes.','#eed3a2'],reino:['🦁 Kaiu Manudo','Ideas para seguir tu pasión rojinegra.','#ffa8a8'],levelup:['⚡ Kaiu LevelUp','Convertí tus objetivos en misiones.','#c8b1ff'],penales:['⚽ Kaiu Juegos','Retos creativos y juego consciente.','#bbe6c5'],'ingresos-online':['💻 Kaiu Oportunidades','Organizá tus encargos y cobros.','#9dceff'],dia:['🕐 Kaiu Mi Día','Organizá tus bloques y descansos.','#b9dcef'],recuerdos:['🗃️ Kaiu Archivo Personal','Conservá lo que te importa.','#e1c2ee']
});
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',"'":'&#39;'}[c]));
let open=false,busy=false,current=[],lastReply='',source='';
const view=()=>decodeURIComponent((location.hash||'#inicio').slice(1))||'inicio';
function context(module=view()){try{const d=window.JoshOSDebug?.getData?.()||{};
 const stats={tasks:(d.tasks||[]).length,openTasks:(d.tasks||[]).filter(x=>!x.done).length,habits:(d.routines||[]).length,monthlyExpenses:(d.transactions||[]).filter(x=>x.type==='gasto'&&x.date?.slice(0,7)===new Date().toISOString().slice(0,7)).reduce((n,x)=>n+(Number(x.amount)||0),0),savingsGoals:(d.savingsGoals||[]).length,flashcards:(d.flashcards||[]).length,projects:(d.projects||[]).length};
 const scopes={finanzas:['monthlyExpenses','savingsGoals'],ahorros:['savingsGoals'],rutinas:['habits'],skillforge:['flashcards'],estudios:['flashcards'],agenda:['tasks','openTasks'],dia:['tasks','openTasks'],proyectos:['projects'],negocios:['projects'],centro:['tasks','openTasks','habits','projects']};
 const allowed=scopes[module]||[];return Object.fromEntries(allowed.map(k=>[k,stats[k]]));
 }catch{return {}}}
function sample(text,module){
 if(window.KaiuExperts?.generate)return window.KaiuExperts.generate(text,module);
 const t=text.toLocaleLowerCase('es-CR'),date=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
 const habit=/habito|hábito|rutina|constancia|disciplina|ejercicio|caminar|leer.*d[ií]a/i.test(t)||module==='rutinas';
 const finance=/ahorr|colones|dinero|presupuest|gast|finanzas/i.test(t)||module==='finanzas';
 const study=/estudi|aprend|ingl[eé]s|skill|clase/i.test(t)||module==='skillforge'||module==='estudios';
 const task=/agenda|organiza|pendiente|tarea|planific/i.test(t)||module==='agenda';
 let actions=[];let reply='';
 if(habit){reply='Una rutina constante empieza con pasos muy pequeños. Te propongo tres hábitos flexibles que podés adaptar.';actions=[{type:'habit',data:{title:'Leer 10 minutos cada día',period:'Noche',notes:'Dejar el libro listo y celebrar cada avance.'}},{type:'habit',data:{title:'Organizar 3 prioridades',period:'Mañana',notes:'Elegir lo importante, sin llenar la agenda.'}},{type:'habit',data:{title:'Caminar o estirar 10 minutos',period:'Tarde',notes:'Adaptarlo a tu energía y posibilidades.'}}]}
 else if(finance){reply='Primero crearía una meta realista y un presupuesto de referencia. Ajustá las cantidades a tus ingresos antes de aprobar.';actions=[{type:'savings',data:{title:'Fondo para imprevistos',target:50000,deadline:''}},{type:'budget',data:{title:'Entretenimiento',limit:10000}}]}
 else if(study){reply='Te propongo empezar con tarjetas breves y una sesión de estudio que puedas completar incluso en días ocupados.';actions=[{type:'flashcard',data:{question:'¿Qué aprendí hoy?',answer:'Resumir el tema con mis propias palabras y dar un ejemplo.',topic:'Aprender a aprender'}},{type:'task',data:{title:'Estudiar 20 minutos',date,category:'Estudio',notes:'Repasar tarjetas y registrar una idea nueva.'}}]}
 else if(task){reply='Probemos con un día ligero: priorizar, trabajar con foco y revisar lo pendiente.';actions=[{type:'task',data:{title:'Elegir mis 3 prioridades de hoy',date,category:'Personal'}},{type:'task',data:{title:'Completar una tarea importante',date,category:'Proyectos'}},{type:'task',data:{title:'Revisar avances al final del día',date,category:'Personal'}}]}
 else{reply='Puedo ayudarte a convertir ideas en acciones. En esta vista previa local te propongo un pequeño plan de comienzo.';actions=[{type:'task',data:{title:'Definir una meta de esta semana',date,category:'Personal',notes:'Que pueda medirse y dividirse en pasos pequeños.'}},{type:'goal',data:{title:'Mi próximo avance personal',target:5,metric:'Pequeños avances completados',area:'Personal'}}]}
 return {reply,actions};
}
function validWorkerEndpoint(raw){
 try{
  const u=new URL(String(raw||'').trim());
  if(u.protocol!=='https:'||!/(?:^|\.)workers\.dev$/i.test(u.hostname)||!u.hostname.includes('.')||u.username||u.password||u.search||u.hash||!['/','/chat',''].includes(u.pathname))return '';
  return u.origin;
 }catch{return ''}
}
function workerEndpoint(){return validWorkerEndpoint(window.KaiuWorkerConfig?.endpoint)||validWorkerEndpoint(localStorage.getItem(WORKER_SETTING)||'')}
async function getSession(){
 if(window.JoshCloud?.getAccessToken)return await window.JoshCloud.getAccessToken();
 try{
  const s=JSON.parse(localStorage.getItem('joshos-cloud-v1-session')||'null');
  if(s?.access_token && Number(s.expires_at||0)>Math.floor(Date.now()/1000)+30)return s.access_token;
 }catch{}
 throw Error('Iniciá sesión desde ☁️ Cuenta antes de consultar la IA.');
}
async function requestAI(text,module,share){
 const endpoint=workerEndpoint();
 if(!endpoint)throw Error('Todavía falta conectar la dirección pública de tu Worker de Cloudflare. Abrí «Configurar IA» y pegá la URL workers.dev.');
 const token=await getSession();
 const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),30000);
 try{
  const body={prompt:text.slice(0,1200),module,context:share?context(module):null};
  const res=await fetch(endpoint+'/chat',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(body),signal:ctrl.signal,cache:'no-store'});
  const response=await res.json().catch(()=>({}));
  if(!res.ok)throw Error((response.error||('Cloudflare: error '+res.status))+(response.code?' · '+response.code:''));
  return {reply:String(response.reply||''),actions:Array.isArray(response.actions)?response.actions:[]};
 }finally{clearTimeout(timer)}
}
let draft='',shareStats=false,connectionStatus='';
async function testConnection(){
 if(busy)return;
 const status=$('kaiu-test-result');if(status)status.textContent='Comprobando servidor y sesión de Josh Cloud…';
 try{
  const endpoint=workerEndpoint();if(!endpoint)throw Error('Primero configurá la dirección workers.dev del servidor.');
  const token=await getSession();const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),20000);
  try{
   const res=await fetch(endpoint+'/auth-check',{method:'POST',headers:{Authorization:'Bearer '+token},signal:ctrl.signal,cache:'no-store'});
   const data=await res.json().catch(()=>({}));
   if(res.status===404)throw Error('El Worker aún usa la versión anterior. Actualizalo con el paquete 6.2 de PowerShell.');
   if(!res.ok)throw Error((data.error||'No se pudo validar la cuenta.')+(data.code?' · Código: '+data.code:''));
   connectionStatus='✓ Worker y sesión de Josh Cloud verificados. Ya podés consultar la IA.';
  }finally{clearTimeout(timer)}
 }catch(e){connectionStatus='⚠ '+(e.name==='AbortError'?'La conexión tardó demasiado.':e.message)}
 if($('kaiu-test-result'))$('kaiu-test-result').textContent=connectionStatus;
}
function screen(){
 const v=view(),mode=P[v]||['✨ Kaiu AI','Tu copiloto para cada espacio de JoshOS.','#b7f36e'];
 const ideas=(window.KaiuExperts?.ideas?.(v)||[]).slice(0,6),ready=!!workerEndpoint();
 return `<div class="kaiu-head" style="--kaiu-accent:${mode[2]}">
  <div class="kaiu-avatar" aria-hidden="true">✦</div>
  <div class="kaiu-head-copy"><span class="kaiu-eyebrow">JOSHOS · INTELIGENCIA PERSONAL</span><strong>${esc(mode[0])}</strong><small>${esc(mode[1])}</small></div>
  <button class="kaiu-close" aria-label="Cerrar asistente" title="Cerrar" type="button" data-kaiu-close>×</button>
 </div>
 <div class="kaiu-content">
  <section class="kaiu-intro"><div class="kaiu-intro-kicker">✦ KAIU PREMIUM · 6.2</div><h2>Tu próxima gran idea empieza aquí.</h2><p>Contame qué querés lograr. Kaiu organiza, propone y te acompaña; vos decidís qué guardar.</p><div class="kaiu-features"><span>✦ IA generativa</span><span>◇ 38+ espacios</span><span>✓ Control total</span></div></section>
  <div class="kaiu-worker-state"><div class="kaiu-server-main"><i class="kaiu-server-dot ${ready?'':'off'}" aria-hidden="true"></i><span><strong>${ready?'Cloudflare AI configurado':'Conexión de IA pendiente'}</strong><small>${ready?'Verificá tu sesión antes de consultar':'Las propuestas locales siguen disponibles'}</small></span></div><button type="button" id="kaiu-worker-settings">⚙ Configurar</button></div>
  <form id="kaiu-worker-form" hidden><label for="kaiu-worker-url">Dirección de tu Worker de Cloudflare</label><input type="url" id="kaiu-worker-url" placeholder="https://kaiu-joshos-ai.tucuenta.workers.dev" value="${esc(workerEndpoint())}" required><small>Es una URL pública: no pegues contraseñas ni tokens aquí. El enlace viene preconfigurado en JoshOS.</small><button type="submit">Guardar servidor</button></form>
  <div class="kaiu-mini-heading">Probá una idea <small>Tocá una para editarla</small></div>
  <div class="kaiu-suggestions">${ideas.map((x,i)=>`<button type="button" data-kaiu-idea="${i}">✧ ${esc(x)}</button>`).join('')}</div>
  <div class="kaiu-form-box"><form id="kaiu-form"><label for="kaiu-message" class="kaiu-question">¿Qué vamos a crear hoy? <span>Tu espacio: ${esc(v)}</span></label><textarea id="kaiu-message" maxlength="1200" rows="3" placeholder="Ej.: quiero leer 15 minutos al día sin distraerme..." required>${esc(draft)}</textarea>
   <div class="kaiu-prompt-bottom"><span>✎ Explicá tu objetivo con tus palabras</span><span id="kaiu-count">${draft.length}/1200</span></div>
   <label class="kaiu-consent"><input type="checkbox" id="kaiu-consent" ${shareStats?'checked':''}><span>Permitir estadísticas resumidas de esta app (sin notas privadas ni datos de la bóveda).</span></label>
   <div class="kaiu-controls"><button type="submit" class="kaiu-primary">✦ Preguntar a Kaiu con IA</button><button type="button" class="kaiu-secondary" id="kaiu-ideas">◇ Modo local gratis</button></div>
  </form></div>
  <div class="kaiu-connection-row"><button type="button" id="kaiu-test-connection">↗ Comprobar conexión y sesión</button></div>
  <p id="kaiu-test-result" aria-live="polite">${esc(connectionStatus)}</p>
  <div class="kaiu-answer" id="kaiu-answer" aria-live="polite">${lastReply?'<div class="kaiu-answer-head">✦ Última respuesta</div><p>'+esc(lastReply)+'</p>':'<div class="kaiu-answer-head">✦ Tu espacio de ideas</div><p class="kaiu-muted">Escribí tu meta o seleccioná una sugerencia. Podés consultar la IA real o usar el modo local sin internet.</p>'}</div>
  <div id="kaiu-proposals"></div>
  <p class="kaiu-privacy"><span aria-hidden="true">♢</span><span><b>Privado por defecto.</b> Tu pregunta y el módulo se envían a Cloudflare solo si tocás IA. Las estadísticas necesitan tu permiso. Kaiu nunca guarda cambios sin tu aprobación.</span></p>
 </div>`;
}
function render(){const panel=$('kaiu-panel');if(!panel)return;panel.hidden=!open;if(open){panel.innerHTML=screen();renderProposals()}}
function renderProposals(){const node=$('kaiu-proposals');if(!node)return;const valid=current.map((x,i)=>{try{const d=G.preview(x);return {index:i,data:d}}catch{return null}}).filter(Boolean).slice(0,10);if(!valid.length){node.innerHTML='';return}node.innerHTML='<h3>✦ Propuestas para revisar ('+valid.length+')</h3><div class="kaiu-proposals">'+valid.map(x=>'<label class="kaiu-proposal"><input type="checkbox" data-kaiu-select="'+x.index+'" checked><span><strong>'+esc(x.data.title)+'</strong><small>'+esc(x.data.detail)+'</small></span></label>').join('')+'</div><button type="button" class="kaiu-approve" id="kaiu-approve">✓ Aprobar y guardar</button><button type="button" class="kaiu-cancel" id="kaiu-cancel">Descartar propuestas</button>'}
function answer(result,kind){current=Array.isArray(result?.actions)?result.actions.slice(0,10):[];source=kind;lastReply=String(result?.reply||'').slice(0,1800);const node=$('kaiu-answer');if(node){node.classList.remove('is-error');node.innerHTML='<div class="kaiu-answer-head">✦ '+(kind==='local'?'Vista previa · modo local':'Respuesta de Kaiu · Cloudflare AI')+'</div><p>'+esc(lastReply)+'</p>';}renderProposals()}
async function propose(useAI){if(busy)return;const prompt=$('kaiu-message')?.value.trim();if(!prompt){$('kaiu-message')?.focus();return}draft=prompt;shareStats=!!$('kaiu-consent')?.checked;busy=true;const v=view(),node=$('kaiu-answer');if(node){node.classList.remove('is-error');node.innerHTML='<div class="kaiu-answer-head">✦ Procesando</div><p>'+ (useAI?'Consultando el modelo de Cloudflare…':'Preparando opciones locales…') +'</p>';}for(const b of document.querySelectorAll('#kaiu-form button'))b.disabled=true;
 try{const r=useAI?await requestAI(prompt,v,shareStats):sample(prompt,v);answer(r,useAI?'ai':'local')}
 catch(e){current=[];if(node){node.classList.add('is-error');node.innerHTML='<div class="kaiu-answer-head">⚠ No se pudo conectar</div><p>'+esc(e.name==='AbortError'?'Tiempo de espera agotado.':e.message)+'</p><p class="kaiu-muted">Usá «Comprobar conexión y sesión» para ver el motivo, o probá el modo local gratuito.</p>';}renderProposals()}
 finally{busy=false;for(const b of document.querySelectorAll('#kaiu-form button'))b.disabled=false}
}
function mount(){const button=document.createElement('button');button.id='kaiu-fab';button.type='button';button.textContent='✦ Kaiu AI';button.setAttribute('aria-label','Abrir Kaiu AI');const aside=document.createElement('aside');aside.id='kaiu-panel';aside.hidden=true;aside.setAttribute('aria-label','Asistente Kaiu AI');document.body.append(button,aside);button.addEventListener('click',()=>{open=!open;render()});aside.addEventListener('click',e=>{if(e.target.closest('#kaiu-test-connection')){void testConnection();return;} if(e.target.closest('#kaiu-worker-settings')){const form=$('kaiu-worker-form');form.hidden=!form.hidden;return;} if(e.target.closest('[data-kaiu-close]')){open=false;render()}if(e.target.closest('[data-kaiu-idea]')){const i=Number(e.target.closest('[data-kaiu-idea]').dataset.kaiuIdea);const idea=window.KaiuExperts?.ideas?.(view())?.[i];if(idea){const inp=$('kaiu-message');inp.value=idea;draft=idea;const count=$('kaiu-count');if(count)count.textContent=idea.length+'/1200';inp.focus();}}if(e.target.closest('#kaiu-ideas'))void propose(false);if(e.target.closest('#kaiu-cancel')){current=[];lastReply='Propuestas descartadas; no se guardó nada.';render()}if(e.target.closest('#kaiu-approve')){const picks=[...aside.querySelectorAll('input[data-kaiu-select]:checked')].map(x=>current[Number(x.dataset.kaiuSelect)]).filter(Boolean);if(!picks.length){$('kaiu-answer').textContent='Seleccioná al menos una propuesta.';return}const labels=picks.map(x=>G.preview(x).title).join('\n• ');if(!confirm('¿Querés crear estos registros en JoshOS?\n\n• '+labels))return;try{window.JoshOSActions?.applyAI(picks);current=[];lastReply='¡Guardado! Se crearon '+picks.length+' registros en los módulos correspondientes.';render()}catch(err){$('kaiu-answer').textContent='No se pudieron guardar los cambios: '+err.message}}});aside.addEventListener('submit',e=>{
 if(e.target.id==='kaiu-worker-form'){
  e.preventDefault();const endpoint=validWorkerEndpoint($('kaiu-worker-url')?.value);
  if(!endpoint){const status=$('kaiu-answer');if(status)status.textContent='La URL debe ser HTTPS y pertenecer a un Worker workers.dev, sin rutas ni claves.';return}
  localStorage.setItem(WORKER_SETTING,endpoint);render();if($('kaiu-answer'))$('kaiu-answer').textContent='Dirección guardada. Comprobá la sesión antes de consultar la IA.';
  return;
 }
 if(e.target.id==='kaiu-form'){e.preventDefault();void propose(true)}
});aside.addEventListener('input',e=>{if(e.target.id==='kaiu-message'){draft=e.target.value;const count=$('kaiu-count');if(count)count.textContent=draft.length+'/1200';}if(e.target.id==='kaiu-consent')shareStats=e.target.checked});aside.addEventListener('change',e=>{if(e.target.id==='kaiu-consent')shareStats=e.target.checked});window.addEventListener('hashchange',()=>{if(open)render()});document.addEventListener('click',e=>{if(open&&e.target.closest('[data-go]'))setTimeout(render,0)})}
window.KaiuAssistant={open:()=>{open=true;render()},forModule:m=>{if(m&&m!==view())location.hash='#'+m;open=true;render()}};window.JoshAIDebug={sample,context};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
