/**
 * Kaiu AI server. Authenticated Supabase Edge Function, no API key on client.
 * Requires Dashboard secrets: OPENAI_API_KEY, KAIU_OWNER_EMAIL.
 * Requires SQL migration: supabase/migrations/20261013_kaiu_daily_limit.sql.
 */
import { withSupabase } from 'npm:@supabase/server@1';

const types = new Set(['task','habit','savings','flashcard','goal','note','timeblock','budget','project']);
const moduleNames = new Set(['inicio','centro','agenda','dia','finanzas','ahorros','ingresos-online','suscripciones','negocios','notas','proyectos','biblioteca','bienestar','despensa','inventario','skillforge','aula','boveda','recuerdos','bitacora','levelup','reino','penales','ajustes','enfoque','rutinas','estudios','cocina','contactos','semanal','diario','decisiones','documentos','hogar','wishlist','viajes','digital','objetivos']);
const rules = `Sos Kaiu, asistente personal en JoshOS, hablás español costarricense cercano, sin exageraciones. Tu objetivo es ayudar con acciones pequeñas y realistas. Nunca afirmés haber creado algo: solo preparás PROPUESTAS para que el usuario apruebe. Nunca ordenés transferencias, compres, facturés, cambies datos financieros existentes, ni edites o borres registros. No aconsejes diagnósticos, tratamientos médicos ni recomendaciones financieras profesionales. Ayudá con organización y educación. Sin relaciones ni funciones de pareja. Si faltan datos, explicá supuestos. Los montos son colones CRC. Date de hoy del contexto, sin inventar datos. 0 a 5 propuestas. Tipos permitidos: task (data: title,date,category,notes), habit (title,period [Mañana/Tarde/Noche/Flexible],notes), savings (title,target,deadline), flashcard (question,answer,topic), goal (title,area,metric,target,deadline,why), note (title,notes,category), timeblock (title,date,start,end,notes), budget (title,limit,month), project (title,description). data_json DEBE SER UNA CADENA QUE CONTIENE un objeto JSON válido. Solo esos campos y valores coherentes. Para preguntar o conversar sin crear registros, dejá actions []. Respetá la fe personal: podés comparar interpretaciones sin imponer una. Ninguna clave, secreto, contraseña, o número de tarjeta en respuestas.`;
const schema = {type:'object',additionalProperties:false,properties:{reply:{type:'string'},actions:{type:'array',items:{type:'object',additionalProperties:false,properties:{type:{type:'string',enum:[...types]},data_json:{type:'string'}},required:['type','data_json']}}},required:['reply','actions']};
export default { fetch: withSupabase({auth:'user'}, async (req:Request,ctx:any)=>{
 if(req.method!=='POST')return Response.json({error:'Método no permitido'},{status:405});
 const allowedEmail=(Deno.env.get('KAIU_OWNER_EMAIL')||'').trim().toLowerCase();
 const email=String(ctx.userClaims?.email||'').toLowerCase();
 const apiKey=Deno.env.get('OPENAI_API_KEY');
 if(!allowedEmail||!apiKey)return Response.json({error:'El administrador aún no activó Kaiu AI.'},{status:503});
 if(email!==allowedEmail)return Response.json({error:'Esta IA está limitada a la cuenta propietaria.'},{status:403});
 let body:any;try{body=await req.json()}catch{return Response.json({error:'Solicitud inválida'},{status:400})}
 const prompt=String(body?.prompt||'').trim().slice(0,1200);
 const module=String(body?.module||'inicio');
 if(prompt.length<3||!moduleNames.has(module))return Response.json({error:'Consulta o módulo inválido.'},{status:400});
 // Server-side atomic quota. Prevents repeated public calls from draining credits.
 const {data:allowed,error:quotaError}=await ctx.supabase.rpc('kaiu_ai_consume',{max_per_day:20});
 if(quotaError)return Response.json({error:'Falta configurar el límite diario de seguridad.'},{status:503});
 if(!allowed)return Response.json({error:'Alcanzaste el límite de 20 consultas de hoy.'},{status:429});
 const data=body?.context&&typeof body.context==='object'&&!Array.isArray(body.context)?body.context:{};
 const summary:any={};for(const k of ['tasks','openTasks','habits','monthlyExpenses','savingsGoals','flashcards','projects'])if(Number.isFinite(Number(data[k])))summary[k]=Math.max(0,Math.min(100000000,Number(data[k])));
 const context=`Módulo actual: ${module}. Fecha UTC: ${new Date().toISOString().slice(0,10)}. Estadísticas agregadas compartidas voluntariamente: ${JSON.stringify(summary)}`;
 const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),25000);
 try{
  const res=await fetch('https://api.openai.com/v1/responses',{method:'POST',signal:abort.signal,headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-5-mini',store:false,max_output_tokens:2000,instructions:rules,input:context+'\nSolicitud del usuario: '+prompt,text:{format:{type:'json_schema',name:'kaiu_proposals',strict:true,schema}}})});
  const data=await res.json();if(!res.ok)return Response.json({error:'El proveedor de IA no pudo responder en este momento.'},{status:502});
  const txt=Array.isArray(data.output)?data.output.flatMap((o:any)=>o.content||[]).filter((x:any)=>x.type==='output_text').map((x:any)=>x.text||'').join(''):'';
  let parsed:any;try{parsed=JSON.parse(txt)}catch{return Response.json({error:'La IA devolvió una respuesta incompleta. Intentá de nuevo.'},{status:502})}
  const actions=(Array.isArray(parsed.actions)?parsed.actions:[]).slice(0,5).flatMap((a:any)=>{if(!types.has(a?.type)||typeof a.data_json!=='string'||a.data_json.length>8000)return [];try{const d=JSON.parse(a.data_json);if(!d||Array.isArray(d)||typeof d!=='object')return [];return [{type:a.type,data:d}]}catch{return []}});
  return Response.json({reply:String(parsed.reply||'').slice(0,1800),actions});
 }catch{return Response.json({error:'La consulta tardó demasiado. Probá otra vez.'},{status:504})}finally{clearTimeout(timeout)}
})};
