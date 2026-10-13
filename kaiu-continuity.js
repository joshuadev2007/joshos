/* Kaiu Continuidad 6.3 — voluntary local memories + scoped conversation.
   Never write to JoshOS db or the vault. Per-authenticated-user local storage only. */
(()=>{'use strict';
const PREFIX='kaiu-continuity-local-v1-',EMPTY=()=>({history:[],memories:[]});
const safe=s=>String(s??'').trim();
let ephemeral=EMPTY();
function userId(){
 try{
  const session=JSON.parse(localStorage.getItem('joshos-cloud-v1-session')||'null');
  const token=session?.access_token;
  if(!token||typeof token!=='string')return '';
  const part=token.split('.')[1];if(!part)return '';
  const jwt=JSON.parse(atob(part.replace(/-/g,'+').replace(/_/g,'/')));
  const sub=jwt?.sub;
  return typeof sub==='string'&&/^[a-f0-9-]{30,45}$/i.test(sub)?sub:'';
 }catch{return ''}
}
function storeKey(){const id=userId();return id?PREFIX+id:''}
function read(){
 const key=storeKey();if(!key)return structuredClone(ephemeral);
 try{const obj=JSON.parse(localStorage.getItem(key)||'null');if(!obj||typeof obj!=='object')return EMPTY();
  const history=Array.isArray(obj.history)?obj.history.filter(v=>['user','assistant'].includes(v?.role)&&typeof v.text==='string').slice(-20).map(v=>({role:v.role,text:v.text.slice(0,1000),module:String(v.module||'inicio').slice(0,30)})):[];
  const memories=Array.isArray(obj.memories)?obj.memories.filter(v=>typeof v==='string').slice(0,8).map(v=>v.slice(0,180)):[];
  return {history,memories};
 }catch{return EMPTY()}
}
function write(x){const value={history:x.history.slice(-20),memories:x.memories.slice(0,8)};const key=storeKey();if(!key){ephemeral=value;return false}try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
function addExchange(prompt,reply,module){const d=read();d.history.push({role:'user',text:safe(prompt).slice(0,1200),module},{role:'assistant',text:safe(reply).slice(0,1800),module});return write(d)}
function addMemory(value){const v=safe(value).replace(/\s+/g,' ').slice(0,180);if(v.length<3)throw Error('Escribí un recuerdo de al menos 3 caracteres.');const d=read();if(d.memories.length>=8)throw Error('Máximo 8 recuerdos. Eliminá uno antes de añadir otro.');if(d.memories.some(m=>m.toLocaleLowerCase()===v.toLocaleLowerCase()))throw Error('Este recuerdo ya existe.');d.memories.push(v);return write(d)}
function removeMemory(index){const d=read();if(Number.isInteger(index)&&index>=0&&index<d.memories.length){d.memories.splice(index,1);write(d)}}
function clearHistory(){const d=read();d.history=[];write(d)}
function clearMemories(){const d=read();d.memories=[];write(d)}
function forAI(includeHistory,includeMemory){const d=read();return {
  history:includeHistory?d.history.slice(-6).map(v=>({role:v.role,content:v.text.slice(0,430),module:v.module})):[],
  memories:includeMemory?d.memories.map(v=>v.slice(0,180)):[]
 }}
function overview(){const d=read();return {...d,isPersistent:!!storeKey()}}
// Allowed data: numeric *totals* in fixed categories. No titles, notes, diary text, addresses, or passwords.
const SCOPES=Object.freeze({tasks:'Tareas pendientes',habits:'Hábitos registrados',study:'Tarjetas y sesiones de estudio',projects:'Proyectos',finance:'Ahorros y gastos'});
function aggregate(selected){
 const d=window.JoshOSDebug?.getData?.()||{};const keys=new Set(Array.isArray(selected)?selected:[]);const out={};
 if(keys.has('tasks')){out.tasks=Array.isArray(d.tasks)?d.tasks.length:0;out.openTasks=Array.isArray(d.tasks)?d.tasks.filter(x=>!x.done).length:0}
 if(keys.has('habits'))out.habits=Array.isArray(d.routines)?d.routines.length:0;
 if(keys.has('study')){out.flashcards=Array.isArray(d.flashcards)?d.flashcards.length:0;out.studySessions=Array.isArray(d.studySessions)?d.studySessions.length:0}
 if(keys.has('projects'))out.projects=Array.isArray(d.projects)?d.projects.length:0;
 if(keys.has('finance')){
  const month=new Date().toISOString().slice(0,7);
  out.monthlyExpenses=Array.isArray(d.transactions)?d.transactions.filter(x=>x.type==='gasto'&&String(x.date||'').startsWith(month)).reduce((n,x)=>n+Math.max(0,Number(x.amount)||0),0):0;
  out.savingsGoals=Array.isArray(d.savingsGoals)?d.savingsGoals.length:0;
 }
 return out;
}
window.KaiuContinuity=Object.freeze({userId,overview,addExchange,addMemory,removeMemory,clearHistory,clearMemories,forAI,aggregate,scopes:SCOPES});
})();
