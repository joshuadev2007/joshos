# JoshOS 6.0 · Kaiu Life Engine — manual de uso

## Qué cambia

Se incorpora **Mi evolución · Kaiu**, un entorno de cinco pestañas dentro de JoshOS. Kaiu Life Engine es un **asistente local gratuito basado en reglas y estadísticas de tus datos**, no una IA generativa y no necesita una API de pago.

### 1. ☀️ Mi día — Kaiu Morning

- Al abrir la página de inicio de JoshOS aparece un resumen con tus pendientes, hábitos y minutos de enfoque, salvo que lo ocultes o lo desactives en Mi memoria.
- Entrá a **Mi evolución · Kaiu → Mi día**.
- Marcá las prioridades que querés incluir en tu plan de hoy. Las propuestas vienen de tareas y hábitos que ya tenés; las sugerencias nuevas no se convierten en tareas automáticamente.
- Pulsá **Guardar mi plan de hoy**. Tu selección y tu nota personal quedan guardadas con la fecha.
- Si cambiás de idea, guardá otro plan del mismo día y se reemplaza **únicamente ese plan**, no se borran tareas de Agenda.

### 2. 🌙 Kaiu Night — Cierre del día

- En **Mi día**, escribí qué salió bien, qué aprendiste y qué agradecés. No es necesario rellenar todos los campos.
- Podés indicar si tu energía fue alta, media o baja; es un registro subjetivo, no un diagnóstico.
- Pulsá **Guardar reflexión nocturna**. Podés editar el cierre del día volviendo a guardarlo.
- Podés consultar y eliminar cierres antiguos desde **Mi memoria**.

### 3. 📈 Mi evolución

- Analiza los últimos siete días de tareas **con fecha de finalización**, sesiones de enfoque, sesiones de estudio y marcas de hábitos guardadas.
- El gráfico muestra tareas y hábitos completados día por día. Las cifras corresponden a datos locales disponibles en ese momento.
- El porcentaje de hábitos es aproximado: toma como referencia los hábitos **activos hoy** durante los siete días; puede infravalorar la semana si creaste hábitos recientemente.
- No inventa cifras de actividades fuera de JoshOS ni reemplaza evaluación sanitaria o financiera.

### 4. 🧠 Kaiu Insights

- Recomendaciones sencillas y explicables basadas en tus pendientes, hábitos, tiempo de enfoque y objetivo personal.
- Por defecto, los consejos **no revisan tus movimientos financieros**. Podés activar una sugerencia de seguimiento del ahorro en Mi memoria. Esa opción solo utiliza metas de ahorro; no lee transacciones para darte consejos.
- Life Engine no lee la bóveda cifrada, contraseñas ni el contenido íntimo del diario.

### 5. 🔗 Kaiu Connect — Varias apps juntas

- Generá una vista previa de rutinas y tareas para estudiar, ahorrar o avanzar proyectos.
- Seleccioná cada propuesta por separado y pulsá **Aprobar seleccionadas**. Solo entonces Kaiu las crea en Rituales o Agenda, usando el sistema de aprobación de JoshOS.
- La app impide duplicar propuestas con el mismo título en la categoría correspondiente. No ejecuta pagos, transferencias ni compras.

### 6. 🧩 Mi memoria — Preferencias de Kaiu

- Guardá tu objetivo principal, tus minutos preferidos de enfoque y tu momento preferido del día.
- Podés controlar si aparece el resumen de Kaiu en el inicio y si permitís consejos basados en el progreso de ahorro.
- **Mi memoria** significa preferencias registradas **dentro de JoshOS**, no acceso automático a tus conversaciones de ChatGPT ni a su memoria.

## Respaldo, sincronización y privacidad

Todos los datos nuevos quedan dentro del objeto existente `joshos-life-v1`, en el campo adicional `lifeEngine`. Por lo tanto, los incluye el **respaldo JSON general de JoshOS**. Si activaste Josh Cloud, se sincronizarán como parte de tu registro central de JoshOS, sujeto a su mecanismo actual de copia y resolución de conflictos. No hay fusión automática de cambios simultáneos en PC y Android: antes de elegir entre copias, exportá respaldos.

Las preferencias y reflexiones nocturnas pueden quedar en tu propio proyecto Supabase **como JSON legible por el servicio**, igual que los demás registros no cifrados de JoshOS. Si querés mantener una reflexión exclusivamente local, no la sincronices con Josh Cloud. No se enviaron datos a servicios externos de IA ni se añadieron claves secretas.

**No se envían notificaciones cuando JoshOS está cerrado.** El resumen se calcula al abrir la aplicación, con tus datos disponibles. No requiere internet para estas funciones.

## Publicación y actualización

1. **En JoshOS 5.1 exportá primero un respaldo JSON** y guardalo fuera de GitHub.
2. Extraé el ZIP `JoshOS_6_0_KAIU_LIFE_ENGINE_ACTUALIZACION.zip` y subí los archivos **y su estructura de carpetas** a la raíz de tu repo `joshos` con GitHub → Add file → Upload files → Commit changes.
3. Tras publicarse GitHub Pages, entrá a `https://joshuadev2007.github.io/joshos/` y recargá (`Ctrl+F5`).
4. Abrí **Mi evolución · Kaiu** en el menú izquierdo o desde el resumen del inicio.
5. Una vez validada la versión web, compilá los APK/EXE desde Actions. Los instaladores viejos no reciben nuevos archivos por sí solos.

**Importante:** esta versión se probó en navegador Chromium mediante carga local de recursos y se verificó el preparador de APK/EXE. No se ha compilado el APK/EXE ni probado con Android/Windows instalados. La navegación HTTP del entorno de pruebas estuvo bloqueada, así que la carga se simuló en un documento local con el código real.
