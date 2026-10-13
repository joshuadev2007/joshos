# JoshOS 6.3 — Kaiu Continuidad

## Instalación
1. Hacé un respaldo JSON desde JoshOS y guardalo fuera del navegador.
2. Descomprimí `JoshOS_6_3_WEB_SUBIR_A_GITHUB.zip`. Subí los archivos y las carpetas incluidas a tu repositorio `joshuadev2007/joshos`, sustituyendo los existentes. No borres el resto del repositorio. Esperá a GitHub Pages y recargá con Ctrl+F5.
3. **También debés actualizar tu Worker** para habilitar historial y memoria. Extraé `JoshOS_6_3_WORKER_WINDOWS.zip` **dentro de la carpeta que ya tenés** `workers/kaiu-cloudflare` en tu laptop. Debe reemplazar únicamente `src/index.mjs`; no se cambian tus datos de Wrangler ni el UID secreto. En PowerShell, dentro de esa carpeta, ejecutá `npx wrangler deploy`. No hace falta volver a poner `ALLOWED_USER_ID`.
4. En JoshOS 6.3 entrá a ☁️ Cuenta, iniciá sesión, abrí Kaiu y elegí una pregunta.

## Novedades
- **Conversación:** la última pregunta y respuesta se guardan por cuenta en el navegador; el modelo recibe hasta seis intervenciones anteriores si está marcada la opción «Continuar nuestra conversación». Se puede borrar el historial.
- **Recuerdos voluntarios:** en «Gestionar mis recuerdos» podés guardar hasta ocho notas cortas, eliminarlas individualmente o borrarlas todas. El envío al modelo viene **desactivado de forma predeterminada** y requiere marcar «Incluir mis recuerdos guardados». No son recuerdos automáticos del modelo.
- **Contexto entre aplicaciones:** desactivado por defecto. Elegís exactamente los grupos numéricos: tareas, hábitos, estudio, proyectos, finanzas. Se muestran los valores compartidos. Nunca se envían notas, nombres de tareas, contraseñas ni contenido de la bóveda por este mecanismo.
- **Aprobación:** Kaiu propone; ninguna acción se guarda automáticamente.

## Privacidad y límites
- Los recuerdos y el historial se guardan en `localStorage` del navegador, por usuario autenticado; **no se sincronizan automáticamente por Josh Cloud** ni se incluyen en el respaldo JSON habitual de JoshOS.
- **No hay cifrado de extremo a extremo** de estos recuerdos locales. No incluyas contraseñas, datos bancarios privados o información muy sensible.
- Las últimas seis intervenciones, si están habilitadas, y los recuerdos consentidos se envían a Cloudflare Workers AI y pueden consumir más neuronas de la cuota gratuita.
- El asistente no investiga páginas web, no hace transacciones y no modifica apps sin aprobación. El contexto disponible son datos resumidos, no una lectura total de todas las apps.

## Problemas comunes
- `Worker no actualizado`: actualizá el Worker desde la carpeta correcta y comprobá `npx wrangler deploy`.
- `USER_NOT_ALLOWED`: comprobá el UID autorizado en Cloudflare, que debe coincidir con la sesión actual de Josh Cloud.
- `AI_QUOTA`: terminaste la cuota diaria gratuita; podés utilizar Modo local gratis.
- Navegador muestra 6.2: Ctrl+F5, cerrar pestañas antiguas y revisar GitHub Actions.
- Reino Rojinegro no requiere ningún cambio. El Worker es `kaiu-joshos-ai`.
