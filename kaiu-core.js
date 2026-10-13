/* Kaiu AI · action gate. Only allowlisted proposal types, always user-approved. */
(()=>{'use strict';
const allowed=new Set(['task','habit','savings','flashcard','goal','note','timeblock','budget','project','entry','faithNote','faithVerse','levelMission','levelHabit']);
// Structured drafts for each mini-app. Only these storage collections are accessible.
const spaces=Object.freeze({
 diario:{key:'megaDiary',label:'Diario personal',fields:['title','date','mood','tag','body','gratitude']},
 decision:{key:'megaDecisions',label:'Decision Lab',fields:['title','deadline','priority','criteria','notes']},
 document:{key:'megaDocs',label:'Mis Documentos',fields:['title','type','expiry','location','notes']},
 home:{key:'megaHome',label:'Mi Hogar',fields:['title','zone','due','every','cost','notes']},
 wishlist:{key:'megaWishlist',label:'Compras Inteligentes',fields:['title','category','price','priority','date','notes']},
 trip:{key:'megaTrips',label:'Viajes y Planes',fields:['title','destination','date','return','budget','notes']},
 digital:{key:'megaDigital',label:'Vida Digital',fields:['title','type','next','task','notes']},
 quote:{key:'megaQuotes',label:'Tuanis Manager',fields:['title','client','price','cost','status','due','notes']},
 studyplan:{key:'megaLearningPlans',label:'SkillForge',fields:['title','level','goal','hours','deadline']},
 activity:{key:'megaActivityBank',label:'Aula Mágica',fields:['title','age','objective','materials','steps','evaluation']},
 bill:{key:'megaBillNotes',label:'Control+',fields:['title','due','amount','auto','action']},
 pantry:{key:'megaPantryNeeds',label:'Despensa',fields:['title','amount','priority','store','due']},
 care:{key:'megaCare',label:'Bienestar',fields:['title','category','date','minutes','note']},
 inventory:{key:'megaInventoryHistory',label:'Mis Cosas',fields:['title','date','kind','note','cost']},
 idea:{key:'megaIdeas',label:'Segundo Cerebro',fields:['title','context','next','status','source']},
 risk:{key:'megaProjectRisks',label:'Mis Proyectos',fields:['title','project','severity','response','due']},
 contact:{key:'contacts',label:'Mi Red',fields:['name','group','next','notes']},
 course:{key:'courses',label:'Mi Academia',fields:['title','goal','target']},
 recipe:{key:'recipes',label:'Mi Cocina',fields:['title','minutes','ingredients','steps']},
 shopping:{key:'shoppingList',label:'Mi Cocina / Compras',fields:['title']},
 meal:{key:'mealPlans',label:'Mi Cocina',fields:['date','meal','dish']},
 gig:{key:'gigs',label:'De Cero a Mi Meta',fields:['title','status','amount','date','platform','notes']},
 event:{key:'appointments',label:'Mi Día Perfecto',fields:['title','date','time','place','notes']},
 weekly:{key:'weekReviews',label:'Revisión Semanal',fields:['week','wins','lessons','change','priority']},
});
const numericFields=new Set(['price','cost','amount','hours','minutes','every','budget','target']);
const dateFields=new Set(['date','deadline','due','next','expiry','return']);

const fieldMax={reference:120,reflection:650,body:900,subtitle:160,title:140,notes:500,period:24,category:36,date:10,deadline:10,question:400,answer:1500,topic:90,area:40,metric:140,why:650,start:5,end:5,description:700,month:7};
const clean=(v,m=140)=>String(v??'').trim().slice(0,m);
const validDate=s=>!s||(/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T12:00:00')));
const amount=(v,max=1000000000)=>Number.isFinite(Number(v))&&Number(v)>0&&Number(v)<=max?Number(v):null;
function validate(a){
 if(!a||!allowed.has(a.type)||!a.data||typeof a.data!=='object'||Array.isArray(a.data))throw Error('Propuesta no admitida.');
 if(a.type==='entry'){
  const space=spaces[a.data.space],dSPACE=a.data.space;if(!space)throw Error('Aplicación no admitida para escritura.');
  const data={space:a.data.space};
  for(const f of space.fields){if(a.data[f]===undefined||a.data[f]===null)continue;const v=a.data[f];if(numericFields.has(f)){const n=Number(v);if(!Number.isFinite(n)||n<0||n>1e9)throw Error('Cantidad inválida.');data[f]=n;}else{data[f]=clean(v,['notes','body','ingredients','steps','goal','activity','steps','objective','evaluation','response'].includes(f)?900:180);if(dateFields.has(f)&&!(f==='next'&&dSPACE==='idea')&&!validDate(data[f]))throw Error('Fecha inválida.')}}
  if(!(data.title||data.name||data.dish||data.priority))throw Error('La propuesta necesita un título.');
  if(a.data.space==='quote')data.status='Borrador';
  if(a.data.space==='gig')data.status='Pendiente';
  if(a.data.space==='shopping')data.done=false;
  if(a.data.space==='weekly'&&!data.week)throw Error('La revisión necesita la semana.');
  return {type:'entry',data};
 }
 const d={};for(const [k,max]of Object.entries(fieldMax))if(a.data[k]!=null)d[k]=clean(a.data[k],max);
 for(const k of ['target','limit'])if(a.data[k]!==undefined)d[k]=amount(a.data[k]);
 switch(a.type){
  case 'task':case 'habit':case 'savings':case 'goal':case 'note':case 'timeblock':case 'budget':case 'project':if(!d.title)throw Error('La propuesta necesita un título.');break;
  case 'flashcard':if(!d.question||!d.answer)throw Error('La tarjeta necesita pregunta y respuesta.');break;
 case 'faithNote':case 'levelMission':case 'levelHabit':if(!d.title)throw Error('Falta el título.');break;
 case 'faithVerse':if(!d.reference)throw Error('Falta la referencia bíblica.');break;
 }
 if(a.type==='savings'||a.type==='goal')if(d.target===null||d.target===undefined)throw Error('Meta numérica inválida.');
 if(a.type==='budget'&&(d.limit===null||d.limit===undefined))throw Error('Presupuesto inválido.');
 if(a.type==='timeblock'&&(!/^\d{2}:\d{2}$/.test(d.start||'')||!/^\d{2}:\d{2}$/.test(d.end||'')||d.start>=d.end))throw Error('Bloque horario inválido.');
 if(!validDate(d.date)||!validDate(d.deadline))throw Error('Fecha inválida.');
 return {type:a.type,data:d};
}
function preview(a){const {type,data:d}=validate(a);if(type==='faithNote'||type==='faithVerse'||type==='levelMission'||type==='levelHabit')return {type,title:d.title||d.reference,detail:type.startsWith('faith')?'Bitácora de Fe':'LevelUp Life',data:d};if(type==='entry')return {type,title:d.title||d.name||d.dish||d.priority,detail:spaces[d.space].label,data:d};return {type,title:d.title||d.question||'',detail:({task:'Agenda',habit:'Rituales',savings:'Metas de ahorro',flashcard:'SkillForge',goal:'Objetivos PRO',note:'Segundo Cerebro',timeblock:'Agenda / Bloques',budget:'Mis Colones',project:'Proyectos'})[type],data:d};}
function makeAction(a,c){const {type,data:d}=validate(a), id=c.id(),day=c.today();
 if(type==='faithNote')return {key:'@faith',bucket:'notes',row:{id,title:d.title,date:day,type:'Estudio',volumeId:'',references:d.reference||'',content:d.body||'Preguntas por responder en mi estudio.',tags:[],favorite:false,createdAt:Date.now(),updatedAt:Date.now()}};
 if(type==='faithVerse')return {key:'@faith',bucket:'verses',row:{id,date:day,reference:d.reference,title:d.title||'Para estudiar',passage:'',reflection:d.reflection||'¿Qué aprendo de este pasaje?',category:'Para estudiar'}};
 if(type==='levelMission')return {key:'@level',bucket:'quests',row:{id,title:d.title,category:'personal',difficulty:'easy',repeat:'one',createdAt:day,doneDates:[],description:d.notes||'Una misión pequeña y realista.'}};
 if(type==='levelHabit')return {key:'@level',bucket:'habits',row:{id,title:d.title,category:'personal',schedule:'all',history:[],createdAt:day}};
 if(type==='entry'){const space=spaces[d.space],row={id,created:day,...d};delete row.space;if(d.space==='weekly')row.week=d.week;if(d.space==='diario'&&!row.date)row.date=day;if(d.space==='quote')row.status='Borrador';return {key:space.key,row}}
 switch(type){
 case 'task':return {key:'tasks',row:{id,title:d.title,date:d.date||day,category:d.category||'Personal',notes:d.notes||'',done:false}};
 case 'habit':return {key:'routines',row:{id,title:d.title,period:['Mañana','Tarde','Noche','Flexible'].includes(d.period)?d.period:'Flexible',note:d.notes||''}};
 case 'savings':return {key:'savingsGoals',row:{id,title:d.title,target:d.target,saved:0,deadline:d.deadline||''}};
 case 'flashcard':return {key:'flashcards',row:{id,question:d.question,answer:d.answer,topic:d.topic||'General',due:day,reviews:0}};
 case 'goal':return {key:'megaObjectives',row:{id,title:d.title,area:d.area||'Personal',metric:d.metric||'Avances',target:d.target,current:0,deadline:d.deadline||'',why:d.why||''}};
 case 'note':return {key:'notes',row:{id,title:d.title,body:d.notes||'',category:d.category||'Ideas',date:day}};
 case 'timeblock':return {key:'megaTimeBlocks',row:{id,title:d.title,date:d.date||day,start:d.start,end:d.end,focus:'Media',note:d.notes||''}};
 case 'budget':return {key:'budgets',row:{id,month:(d.month&&/^\d{4}-\d{2}$/.test(d.month)?d.month:day.slice(0,7)),category:d.title,limit:d.limit}};
 case 'project':return {key:'projects',row:{id,title:d.title,description:d.description||'',status:'Idea',progress:0}};
 }
}
function applyApproved(actions,ctx){
 if(!Array.isArray(actions)||actions.length>12)throw Error('Demasiadas propuestas en una sola operación.');
 const changes=actions.map(a=>makeAction(a,ctx)); // All inputs validated first.
 const originals=new Map(changes.filter(x=>!x.key.startsWith('@')).map(x=>[x.key,Array.isArray(ctx.db[x.key])?ctx.db[x.key].slice():undefined]));
 const storageKeys={'@faith':'mi-bitacora-fe-v1','@level':'levelup-life-v1'};
 const snapshots=new Map(),staged=new Map();
 for(const ch of changes){if(!ch.key.startsWith('@'))continue;
  if(!staged.has(ch.key)){
   const k=storageKeys[ch.key],raw=localStorage.getItem(k),data=JSON.parse(raw||'null');
   if(!data||typeof data!=='object')throw Error('Abrí primero '+(ch.key==='@faith'?'Bitácora de Fe':'LevelUp Life')+' para inicializar sus datos.');
   snapshots.set(ch.key,raw);staged.set(ch.key,data);
  }
  const doc=staged.get(ch.key);if(!Array.isArray(doc[ch.bucket]))throw Error('Los datos del módulo no tienen el formato esperado.');
  if(ch.bucket==='verses'&&doc.verses.some(v=>v.reference===ch.row.reference))continue;
  doc[ch.bucket].push(ch.row);
 }
 for(const ch of changes.filter(x=>!x.key.startsWith('@'))){if(!Array.isArray(ctx.db[ch.key]))ctx.db[ch.key]=[];ctx.db[ch.key].push(ch.row)}
 const written=[];
 try{
  for(const [key,value]of staged){localStorage.setItem(storageKeys[key],JSON.stringify(value));written.push(key)}
  const ok=ctx.save();if(!ok)throw Error('No se pudo guardar el respaldo de JoshOS.');
  for(const key of written)window.JoshCloud?.notify?.(storageKeys[key]);
 }catch(e){for(const [key,value]of originals){if(value)ctx.db[key]=value;else delete ctx.db[key]}
  for(const key of written){const prev=snapshots.get(key);if(prev===null)localStorage.removeItem(storageKeys[key]);else localStorage.setItem(storageKeys[key],prev)}
  throw e;
 }
 ctx.render();return changes.map(x=>x.key.startsWith('@')?storageKeys[x.key]:x.key);
}

window.JoshAIActionGate=Object.freeze({allowed:[...allowed],validate,preview,applyApproved});
})();
