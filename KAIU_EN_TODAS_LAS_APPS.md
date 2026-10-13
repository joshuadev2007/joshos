# JoshOS 5.1 — Kaiu gratis en todas tus apps

## Qué se añadió

En **38 áreas** de JoshOS, el botón **«✦ Kaiu de esta app»** abre un acompañante con nombre, ambiente y ejemplos de esa especialidad. Elegí una sugerencia o escribí tu objetivo y tocá **«Propuestas locales sin IA»**. Marcá qué borradores querés, revisá la confirmación y aprobá. Solo entonces se guardan en la sección correspondiente.

Los nuevos borradores llegan a las aplicaciones reales: presupuesto en Mis Colones, propuesta en Tuanis Manager, actividad en Aula Mágica, recetas en Mi Cocina, compras, mantenimiento del hogar, viajes, tarjetas en SkillForge, entre otros. En Bitácora integrada, puede preparar una reflexión o referencia y guardarla en la base de Mi Bitácora de Fe. En LevelUp integrado crea misiones y hábitos en su propia base local.

Las apps **Mi Bitácora de Fe** y **LevelUp Life** instaladas por separado también tienen un botón Kaiu básico. Abre sugerencias por sección y pide confirmación antes de guardar. Cuando esas apps están dentro del contenedor JoshOS, el asistente del contenedor es el que actúa, para evitar duplicados.

## Importante: gratis y privado, pero no es IA generativa

- **Modo gratuito local:** reglas y borradores predefinidos por app. No genera ideas libres con un modelo IA, no consulta servicios externos y no tiene costo de API.
- **Modo IA opcional:** solo funciona tras desplegar una Edge Function segura de Supabase y configurar un proveedor. No se activó ni se prometió un proveedor gratuito.
- **Sin cambios automáticos:** se muestran las propuestas, las seleccionás y confirmás antes de guardar. Nunca se ejecutan pagos, transferencias, envíos de mensajes ni otras operaciones externas.
- **Privacidad:** el modo local no envía tu consulta al servidor de IA. Los registros guardados forman parte de los respaldos JSON y pueden sincronizarse mediante Josh Cloud si tu sesión y base de datos están configuradas. No se lee tu bóveda.
- **Limitación:** son borradores de ejemplo; ajustá cantidades, fechas, niveles y textos dentro de cada módulo. No se realizan diagnósticos, asesoría financiera profesional ni interpretación religiosa obligatoria.

## Cómo actualizar

1. Exportá un **respaldo JSON desde cada aplicación y dispositivo** antes de cambiar archivos.
2. Si ya publicaste JoshOS 5.0, extraé `JoshOS_5_1_KAIU_TODAS_ACTUALIZACION.zip` y subí sus **archivos extraídos** al repositorio `joshos`, respetando las carpetas. No subas el ZIP entero como archivo.
3. Si también usás Mi Bitácora de Fe o LevelUp Life como apps **independientes**, instalá sus archivos de actualización en sus respectivos repositorios. No mezcles carpetas de repositorios distintos.
4. Esperá el despliegue de GitHub Pages y actualizá la página (`Ctrl + F5`). En PC y Android instalados, es necesario crear nuevos instaladores mediante GitHub Actions. Un cambio en GitHub no modifica por sí solo un APK o EXE ya instalado.
5. Abrí cada módulo, pulsá «✦ Kaiu de esta app», elegí una idea, aprobá un borrador de prueba y verificá que aparece en su lugar. **Conservá los respaldos**.

Si la primera vez que usás Bitácora o LevelUp independientes el asistente dice que no encontró datos guardados, guardá primero un registro en esa app y volvé a intentarlo. Esto evita generar una base incompleta y poner en riesgo tus registros.

## Archivos principales

- `kaiu-experts.js`: especialidades y propuestas locales por módulo.
- `kaiu-core.js`: validación, permisos de escritura y confirmación de acciones permitidas.
- `kaiu-ai.js`, `kaiu-ai.css`: panel Kaiu y controles.
- `modules/fe/kaiu-companion.*` y `modules/levelup/kaiu-companion.*`: asistentes básicos para las apps independientes y sus versiones integradas.
- `native/prepare.mjs`: incluye todos los scripts al preparar Android y Windows.

Pruebas del proyecto: sintaxis Node.js, validación y escritura de 38 especialidades, rechazo de acciones no autorizadas, restauración ante error al guardar y preparación de recursos Android/Windows. No se ha confirmado un APK o EXE nuevo en hardware real ni la conexión opcional con IA generativa.
