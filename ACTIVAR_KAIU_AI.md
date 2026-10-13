# Kaiu AI · Configuración segura (JoshOS 5.0 beta)

Esta edición trae **una vista previa local que ya crea propuestas reales**, y un cliente para conectar **IA generativa real**. La IA remota NO funcionará hasta desplegar la Edge Function y configurar la clave de OpenAI en Supabase. La suscripción ChatGPT Plus no incluye uso de la API; la API se factura aparte.

## 0. Primero respaldá

Desde JoshOS 4.0: Configuración → Exportar respaldo JSON. Conservá una copia **privada**. No desinstalés apps anteriores ni subás datos personales a GitHub. La beta mantiene la misma clave `joshos-life-v1` y no cambia los registros existentes deliberadamente.

## 1. Primero probá sin IA ni pagos

Subí los archivos de la actualización o abrí la app en un entorno de pruebas. En la esquina inferior aparece `✦ Kaiu`. Abrí **Propuestas locales sin IA**, escribí una petición sobre hábitos, finanzas, estudio o agenda, seleccioná solo las propuestas que querás y pulsá **Aprobar y guardar seleccionadas**. Esta función no envía nada a proveedores de IA.

## 2. Activación opcional de IA generativa con Josh Cloud

Requisitos:
- Tu proyecto **Josh Cloud** de Supabase, con correo confirmado y sesión iniciada en JoshOS.
- Una cuenta de plataforma OpenAI API con facturación/configuración propia. No es la suscripción ChatGPT Plus.
- Acceso de administrador al Dashboard de Supabase. No copies claves secretas dentro del código frontend ni las compartás por chats.

**A. Cuota de seguridad**: Supabase → SQL Editor → New Query. Pegá el archivo `supabase/migrations/20261013_kaiu_daily_limit.sql` y ejecutá. Crea una tabla de contadores y una función de uso atómico para **máximo 20 consultas por cuenta y día (UTC)**. Esto limita consultas; no es una garantía de gasto máximo monetario.

**B. Secretos del backend**: Supabase → Edge Functions → Secrets. Configurá:
- `OPENAI_API_KEY`: clave privada creada en la plataforma de OpenAI. **Solo en Supabase Secrets**, jamás en GitHub, web o APK.
- `KAIU_OWNER_EMAIL`: tu correo exacto de inicio de sesión en Josh Cloud; bloquea a otros usuarios aunque puedan registrarse. No lo agregués al repositorio público.

**C. Desplegar función**: utilizá Supabase CLI en una carpeta que contenga `supabase/`:

```powershell
npx supabase login
npx supabase link --project-ref pdgfayuuovhjcqnzgvyb
npx supabase functions deploy kaiu-ai
```

El código está en `supabase/functions/kaiu-ai/index.ts`, con opciones en `supabase/config.toml`. La función valida la identidad del usuario (`auth: 'user'`), restringe el acceso al correo propietario y consume una cuota diaria antes de llamar al modelo. En Supabase CLI asegurate de aplicar la configuración `verify_jwt = false` con la verificación del usuario dentro del servidor: **no** pongás `auth: 'none'`.

**D. Usar**: Volvé a JoshOS, entrá a `☁️ Cuenta` con tu sesión de Josh Cloud, abrí Kaiu y presioná **☁️ Consultar IA**. Si tu sesión venció, volvé a entrar desde Cuenta. Ningún cambio se guarda hasta tu aprobación explícita.

## 3. Privacidad y funcionamiento

- El cliente envía el texto que escribís y el nombre del módulo actual. Si elegís la casilla de estadísticas, también envía **solamente datos agregados** (conteos y gasto total del mes). No sube tus apuntes, datos de contactos, bóveda cifrada, contraseñas ni PDFs al consultar IA.
- El modelo devuelve una respuesta y **propuestas**, nunca órdenes ejecutadas. Un filtro local permite solo 9 tipos: tareas, hábitos, metas de ahorro, tarjetas, objetivos, notas, bloques horarios, presupuestos y proyectos.
- Para guardar propuestas: seleccioná las deseadas, pulsá Aprobar y confirmá el cuadro. Los registros son parte del respaldo JSON y de la sincronización normal de Josh Cloud cuando se encuentra correctamente activa.
- No hace transferencias, pagos, lectura de datos bancarios ni mensajes externos; tampoco notifica si la app está cerrada.
- No está integrado con tus chats de ChatGPT ni hereda automáticamente sus memorias. Kaiu AI es un asistente con ese nombre y con contexto explícito de la app.

## 4. Estado verificado

- Archivos Javascript revisados con Node.
- Se probó en navegador automatizado el recorrido `hábitos locales → aprobar → guardar` y `ahorro + presupuesto → aprobar → guardar`.
- Se probó el empaquetado con `node native/prepare.mjs mobile` y `desktop`.
- **Pendiente**: desplegar la función, comprobar respuestas con OpenAI de verdad, compilar APK/EXE y probar en dispositivos físicos. No confundir la vista previa local con IA real.
