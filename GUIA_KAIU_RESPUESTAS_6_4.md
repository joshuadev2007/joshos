# JoshOS 6.4 — Kaiu Respuestas PRO

## ¿Qué cambió?
- Tres profundidades: **Breve**, **Normal** (predeterminada) y **Detallado**.
- El Worker adapta las instrucciones y el máximo de tokens a la profundidad elegida. El modo Detallado consume más de la cuota gratuita.
- El asistente da ejemplos concretos, duraciones y pasos cuando le pedís un plan. Ya no está obligado a responder en 2-5 frases.
- Solo propone registros automáticos de JoshOS cuando detecta que le pedís crear/guardar uno; siempre necesitás aprobarlos.
- Las respuestas extensas se muestran en párrafos, títulos y listas con formato seguro (sin HTML arbitrario).
- Continúan la memoria voluntaria, el historial local, las estadísticas con permiso y el modo local gratuito.

## Actualización sin cambiar Reino Rojinegro
1. **Respaldo:** desde JoshOS descargá tu respaldo JSON. No borres datos del navegador ni cambies tu proyecto Supabase.
2. **GitHub:** extraé `JoshOS_6_4_PRO_WEB_GITHUB.zip` y subí su contenido a `joshuadev2007/joshos` manteniendo las carpetas, reemplazando los archivos con los mismos nombres. No subas el ZIP sin extraerlo. Esperá a GitHub Pages y recargá con Ctrl+F5.
3. **Worker:** extraé `JoshOS_6_4_PRO_WORKER_WINDOWS.zip` y reemplazá SOLO la carpeta `workers/kaiu-cloudflare` dentro de tu copia local de JoshOS. Verificá estar en esa carpeta desde PowerShell. Ejecutá `npx wrangler deploy`. Debe decir `kaiu-joshos-ai` y mostrar tu mismo `*.workers.dev`.
4. **No necesitás** repetir `wrangler login` ni `secret put ALLOWED_USER_ID` si tu Worker ya funciona. Tampoco tenés que cambiar el Worker de Reino Rojinegro.
5. **Prueba:** abrí Kaiu en SkillForge, guardá «Prefiero estudiar por las tardes 20 minutos» en recuerdos, activá compartir recuerdos, elegí «Detallado», y pedile: «Organizame una sesión de inglés desde cero según mis preferencias, con ejercicios concretos y ejemplos de palabras». Revisá que haya una respuesta completa y que no cree tareas sin que las solicites.

Si subís primero el frontend nuevo y después el Worker, Kaiu usará profundidad Normal temporalmente hasta desplegar el servidor actualizado. El selector NO puede cambiar la respuesta hasta que `npx wrangler deploy` publique el Worker 6.4.

La IA puede cometer errores, y las respuestas largas consumen más neuronas. Es una mejora de instrucciones y formato del modelo actual, no un cambio de modelo de pago. Los recuerdos siguen guardados solo en este navegador, no se sincronizan entre equipos automáticamente.
