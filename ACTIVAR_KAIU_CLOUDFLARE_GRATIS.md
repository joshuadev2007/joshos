# JoshOS 6.1 · Activar Kaiu con Cloudflare Workers AI (plan gratuito)

Esta es la guía para usar **IA generativa real** en JoshOS. El modo local (propuestas por plantillas) **sigue disponible sin internet ni configuración**. No necesitás contratar OpenAI API, compartir contraseñas ni agregar tarjetas de crédito por esta guía si Cloudflare te permite mantener el plan Workers Free.

## Antes de empezar

- Tené acceso a tu cuenta de Cloudflare y al proyecto personal **Josh Cloud** en Supabase.
- Descargá el ZIP de JoshOS 6.1, extraelo y guardá un **respaldo JSON** desde JoshOS antes de actualizar.
- El nuevo servidor está en la carpeta `workers/kaiu-cloudflare/`.
- Necesitás **Node.js** en tu Windows para desplegar con Wrangler. Instalá una versión LTS compatible si todavía no lo tenés; en PowerShell podés verificar con `node -v` y `npm -v`.
- **No me mandés ningún access token ni una contraseña.** La clave `sb_publishable_...` que aparece en `wrangler.jsonc` es pública y solamente sirve para verificar sesiones mediante Supabase.

## PASO 1. Actualizar JoshOS en GitHub

En tu repositorio https://github.com/joshuadev2007/joshos subí el contenido **extraído** de `JoshOS_6_1_CLOUDFLARE_ACTUALIZACION.zip`, manteniendo sus carpetas, luego seleccioná `Commit changes`. La versión web actualizada está en https://joshuadev2007.github.io/joshos/ (a veces tarda en publicarse; recargá con Ctrl+F5).

> **Importante:** Si todavía no tenés JoshOS 6.0 en GitHub, utilizá la **suite completa** 6.1 para evitar que falten los archivos de Life Engine.

## PASO 2. Crear tu Worker desde PowerShell

1. Extraé el ZIP **completo** de JoshOS 6.1 en una carpeta de Windows. Entrá con el Explorador a `workers/kaiu-cloudflare`.
2. Dentro de esa carpeta, abrí una terminal de PowerShell (clic derecho en la carpeta → Abrir en Terminal, o escribí `powershell` en la barra de dirección).
3. Ejecutá lo siguiente, una línea a la vez:

```powershell
npm install
npx wrangler login
npx wrangler deploy
```

`wrangler login` abre Cloudflare para dar permiso. `wrangler deploy` crea **kaiu-joshos-ai** usando la conexión Workers AI (`AI`) y el límite de 8 consultas/minuto por usuario. Al terminar, verás una dirección pública similar a:

`https://kaiu-joshos-ai.TU-SUBDOMINIO.workers.dev`

> El nombre de la cuenta/subdominio es un **ejemplo**: no adivinés ni uses `TU-SUBDOMINIO` literalmente. Usá la URL que te devuelva Cloudflare.

## PASO 3. Permitir únicamente tu propia cuenta Josh Cloud

Para que nadie use tus cuotas:

1. En https://supabase.com/dashboard abrí el proyecto **Josh Cloud**.
2. Entrá en **Authentication → Users**.
3. Abrí tu usuario y copiá **User UID** (un identificador UUID, NO contraseña ni token de sesión).
4. De vuelta en la terminal, dentro de `workers/kaiu-cloudflare`, ejecutá:

```powershell
npx wrangler secret put ALLOWED_USER_ID
```

Pegá ese UID y presioná Enter. Wrangler guarda el valor como secreto en tu Worker. **Sin el UID configurado, el Worker se niega a procesar consultas**.

La dirección de Supabase y la *publishable key* ya están en `wrangler.jsonc`; **no uses jamás** una clave `service_role` o `sb_secret_` en GitHub o en la app.

## PASO 4. Conectar Kaiu con un clic

1. Abrí JoshOS 6.1, iniciá sesión en **☁️ Cuenta** con el correo y contraseña de Josh Cloud.
2. Entrá en **Hábitos/Rituales** o **SkillForge** y presioná **✦ Kaiu**.
3. Tocá **⚙️ Configurar IA**, pegá la URL **workers.dev** recibida en PASO 2 y presioná **Guardar servidor de Kaiu**.
4. Escribí una petición como «Quiero crear un hábito de lectura que pueda mantener».
5. Elegí **☁️ Preguntar a Kaiu con IA real**. La respuesta será generada por el modelo Llama de Cloudflare. Podés **revisar, seleccionar y aprobar** los registros que proponga.
6. Si algo falla o la cuota gratuita se agota, seguí usando **✨ Propuestas locales sin IA**; no se borran ni se cobran tus datos.

La URL del Worker **es pública**. Si me compartís solo la dirección `https://...workers.dev` (sin ninguna contraseña ni token), puedo dejarla en `kaiu-worker-config.js` para que los próximos instaladores Android/Windows la reconozcan sin tener que pegarla en cada dispositivo.

## Plan gratuito y límites

Cloudflare Workers AI incluye una **asignación gratuita de 10.000 neuronas al día**, no 10.000 preguntas. Cada petición consume una cantidad de neuronas según el modelo y los tokens. En Workers Free, al superar la cuota las consultas dejan de funcionar; para evitar cargos, **no cambies al plan Paid** sin revisar su facturación. También hay límites de Workers y de peticiones por minuto. El modelo configurado es `@cf/meta/llama-3.1-8b-instruct-fp8-fast`.

Consultá las fuentes oficiales:
- https://developers.cloudflare.com/workers-ai/platform/pricing/
- https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/

## Seguridad y privacidad

- El servidor **exige un token de sesión válido de Supabase**, comprueba tu UID y aplica límite de 8 consultas/minuto por usuario. El permiso final del usuario sigue siendo obligatorio para guardar propuestas en JoshOS.
- **Por defecto** se envían a Cloudflare solamente tu pregunta y el nombre de la app desde donde preguntás; si elegís compartir estadísticas resumidas, se añaden los recuentos/valores indicados por la interfaz.
- **No se envían** la bóveda ni los escritos privados por sí solos. **Lo que escribas voluntariamente en la pregunta sí se envía** al servicio de IA.
- El servidor no hace transferencias ni envía correos ni edita tu base de datos. Las propuestas pasan por el validador local y requieren confirmación.
- No incluye almacenamiento propio del historial de consultas, pero Cloudflare puede procesar esos datos conforme a sus términos y políticas.
- Guardá los respaldos JSON antes de actualizar. El servicio de IA necesita internet y no manda notificaciones mientras JoshOS está cerrado.

## Si aparece un error

| Mensaje | Solución |
|---|---|
| «Falta conectar la dirección pública…» | Configurá el Worker en `⚙️ Configurar IA`. |
| «La sesión no está autorizada» | Verificá que el `ALLOWED_USER_ID` sea el UID correcto y que estés conectado a la misma cuenta en JoshOS. |
| «Servidor pendiente de configuración» | Revisá que `npx wrangler secret put ALLOWED_USER_ID` haya terminado bien y que el binding `AI` exista. |
| «Se agotó temporalmente la cuota» | Usá propuestas locales y esperá la renovación diaria de Workers AI. |
| «La IA no respondió» | Revisá la publicación, cuota y registros del Worker en Cloudflare. |

**Estado de entrega:** código, ZIP y pruebas automáticas preparados. **El Worker no está publicado todavía en tu cuenta** y aún falta comprobar respuestas reales del modelo, autenticación real, APK y EXE instalados. Hasta entonces, las pruebas utilizan un modelo simulado y no consumen tu cuota.
