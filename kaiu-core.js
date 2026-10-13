/* Kaiu AI · action gate. Only allowlisted proposal types, always user-approved. */
(()=>{'use strict';
const allowed=new Set(['task','habit','savings','flashcard','goal','note','timeblock','budget','project']);
const fieldMax={title:140,notes:500,period:24,category:36,date:10,deadline:10,question:400,answer:1500,topic:90,area:40,metric:140,why:650,start:5,end:5,description:700,month:7};
const clean=(v,m=140)=>String(v??'').trim().slice(0,m);
const validDate=s=>!s||(/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T12:00:00')));
const amount=(v,max=1000000000)=>Number.isFinite(Number(v))&&Number(v)>0&&Number(v)<=max?Number(v):null;
function validate(a){
 if(!a||!allowed.has(a.type)||!a.data||typeof a.data!=='object'||Array.isArray(a.data))throw Error('Propuesta no admitida.');
 const d={};for(const [k,max]of Object.entries(fieldMax))if(a.data[k]!=null)d[k]=clean(a.data[k],max);
 for(const k of ['target','limit'])if(a.data[k]!==undefined)d[k]=amount(a.data[k]);
 switch(a.type){
  case 'task':case 'habit':case 'savings':case 'goal':case 'note':case 'timeblock':case 'budget':case 'project':if(!d.title)throw Error('La propuesta necesita un título.');break;
  case 'flashcard':if(!d.question||!d.answer)throw Error('La tarjeta necesita pregunta y respuesta.');break;
 }
 if(a.type==='savings'||a.type==='goal')if(d.target===null||d.target===undefined)throw Error('Meta numérica inválida.');
 if(a.type==='budget'&&(d.limit===null||d.limit===undefined))throw Error('Presupuesto inválido.');
 if(a.type==='timeblock'&&(!/^\d{2}:\d{2}$/.test(d.start||'')||!/^\d{2}:\d{2}$/.test(d.end||'')||d.start>=d.end))throw Error('Bloque horario inválido.');
 if(!validDate(d.date)||!validDate(d.deadline))throw Error('Fecha inválida.');
 return {type:a.type,data:d};
}
function preview(a){const {type,data:d}=validate(a);return {type,title:d.title||d.question||'',detail:({task:'Agenda',habit:'Rituales',savings:'Metas de ahorro',flashcard:'SkillForge',goal:'Objetivos PRO',note:'Segundo Cerebro',timeblock:'Agenda / Bloques',budget:'Mis Colones',project:'Proyectos'})[type],data:d};}
function makeAction(a,c){const {type,data:d}=validate(a), id=c.id(),day=c.today();
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
 const changes=actions.map(a=>makeAction(a,ctx)); // Validate all before mutating anything.
 for(const ch of changes){if(!Array.isArray(ctx.db[ch.key]))ctx.db[ch.key]=[];ctx.db[ch.key].push(ch.row)}
 const ok=ctx.save();if(!ok)throw Error('No se pudo guardar. Revisá el espacio de almacenamiento.');ctx.render();return changes.map(x=>x.key);
}
window.JoshAIActionGate=Object.freeze({allowed:[...allowed],validate,preview,applyApproved});
})();
