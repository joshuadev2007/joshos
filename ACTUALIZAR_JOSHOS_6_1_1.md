# JoshOS 6.1.1 — Actualización de caché + Kaiu AI conectado

**No toca Reino Rojinegro**, no modifica Cloudflare y no publica datos personales. Solo actualiza el repositorio web JoshOS.

1. Antes de actualizar, desde JoshOS creá y guardá un **respaldo JSON** de tus datos, sin subirlo a GitHub.
2. Abrí `https://github.com/joshuadev2007/joshos`.
3. Descargá este ZIP y **extraé su contenido**. En GitHub usá **Add file > Upload files** y subí los archivos **extraídos**, manteniendo las carpetas (por ejemplo `app.js`, `index.html`, `sw.js` y `kaiu-worker-config.js` en la raíz). No subás el ZIP como un único archivo.
4. Tocá **Commit changes**, esperá que GitHub Pages publique. La URL es `https://joshuadev2007.github.io/joshos/`.
5. Recargá con `Ctrl+F5`. Si seguís viendo `KAIU EN TODAS · 5.1` en el menú, esperá uno o dos minutos, cerrá la pestaña y abrí JoshOS en una ventana privada como prueba (los datos de la ventana privada no son tus datos normales). El nuevo menú debe decir `KAIU AI + LIFE ENGINE · 6.1`.
6. Verificá que aparezca `Mi evolución · Kaiu`. Pulsá `✦ Kaiu`; la conexión al Worker ya está configurada con la URL pública. Iniciá sesión en `☁️ Cuenta` de Josh Cloud para preguntar a la IA. Tu Worker sigue exigiendo el UID permitido.
7. En `Rituales y hábitos` probá: `Kaiu, proponé un hábito diario de lectura de 15 minutos`. Elegí `☁️ Consultar IA`, y **solo si te gusta** aprobá las propuestas para guardarlas.

Si necesitás Android/Windows, usá la suite completa y volvé a compilar cuando te convenga; subir a GitHub no actualiza automáticamente APK/EXE instalados.

**Advertencia de privacidad:** la URL workers.dev es pública, pero no la contraseña, los tokens ni el UID. La app envía al modelo tu pregunta (y, opcionalmente, estadísticas si marcás autorización); no compartas secretos en tus consultas.
