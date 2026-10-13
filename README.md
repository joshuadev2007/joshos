# JoshOS 4.0 MEGA — ecosistema personal multipropósito

## Novedades de JoshOS 4.0 MEGA

JoshOS 4.0 MEGA incorpora ocho miniaplicaciones **con portada, navegación interna, almacenamiento, búsqueda, edición y estadísticas propias**:

| Aplicación | Herramientas útiles |
|---|---|
| ✒️ Mi Diario Personal | Entradas por fecha, estado de ánimo, gratitud, búsqueda, historial y exportación CSV |
| ⚖️ Decision Lab | Registro de decisiones, criterios, alternativas puntuadas de 0 a 10, comparación y seguimiento |
| 🗂️ Mis Documentos | Catálogo de referencias, ubicación física/digital y fechas de vencimiento; no sube documentos |
| 🏡 Mi Hogar | Tareas y mantenimientos, áreas, próximas fechas, periodicidad y registro de realización |
| 🛍️ Compras Inteligentes | Lista de deseos, prioridad, tiendas, comparación de costos y marcación de compras |
| 🧳 Viajes y Planes | Destinos, presupuestos, fechas, actividades, maleta, reservas y verificación de elementos |
| 🖥️ Vida Digital | Dispositivos, inventario tecnológico y planes de respaldo/revisión sin almacenar contraseñas |
| 🏹 Objetivos PRO | Metas cuantificables, métricas, fechas y registro de progreso |

También aparecen **Herramientas PRO** e **Informes** en 22 espacios ya existentes: Mis Colones, SkillForge, Agenda, Tuanis Manager, Ahorros, Proyectos, Bienestar, Aula Mágica, Inventario, Control+, Mi Academia, Enfoque, Despensa, Cocina, contactos y muchos otros. Algunas funciones incluyen deudas y abonos parciales, cotizaciones informales con costos/márgenes, bloques de tiempo, simulador de tarjetas, biblioteca de actividades para Materno, riesgos de proyectos, citas breves, prácticas, control de oportunidades y exportación CSV.

### Guardado, cuentas y límites

- Se conserva la clave de almacenamiento `joshos-life-v1`; los campos añadidos se guardan dentro del **mismo objeto** y forman parte del respaldo JSON y del canal Josh Cloud correspondiente. No hay migración destructiva de esquemas.
- La sincronización se realiza con instantáneas completas del módulo y resolución manual de conflictos, no fusión colaborativa. No trabajés simultáneamente en dispositivos distintos sin sincronizar.
- No incorpora integración bancaria, avisos push, conexión de contactos del teléfono, facturación fiscal, ni transferencias de dinero. Los recordatorios son visuales al entrar en la app. Los documentos se catalogan pero **no** se suben a la nube ni se guardan como archivos.
- Evitá añadir números confidenciales o contraseñas a los campos ordinarios. Supabase no proporciona cifrado de extremo a extremo para el resto de los módulos. La bóveda existente conserva su cifrado propio.
- La app de pareja permanece excluida. Las copias originales de Bitácora 3.4 y LevelUp siguen incluidas.

### Probar y actualizar

1. Exportá **Configuración → Exportar todo JoshOS (.json)** en los dispositivos actuales antes de reemplazar nada.
2. Para actualizar el repositorio, extraé el ZIP de actualización y subí las carpetas y archivos conservando rutas. Para instalar Android/Windows, necesitás compilar **después** de publicar estos archivos; los ZIP contienen código fuente, no APK/EXE ya generados.
3. Para evitar pérdida de datos en Android, mantené el mismo identificador de app y clave de firma que la versión instalada. Un APK debug firmado en otro servidor podría no actualizar sobre el anterior: guardá tu respaldo antes de reinstalar.
4. Verificá la autenticación Josh Cloud y después la sincronización real en dos dispositivos; las pruebas automáticas locales no sustituyen esa prueba.


**Edición nueva:** diseño y herramientas especiales por cada área, módulos originales preservados, seis apps nuevas, explorador aleatorio de versículos en Bitácora 3.4 y Josh Cloud preconfigurado. **No hay app de pareja**.

## ¿Qué incluye?

- **Inicio inteligente:** pendientes de hoy, resumen de colones, avance personal, XP de LevelUp y reflexiones de Bitácora (cuando hay datos).
- **Mi Día Perfecto:** citas, compromisos, agenda semanal editable, horario y ubicaciones; sin prometer notificaciones automáticas.
- **De Cero a Mi Meta:** registro de encargos online, estados de cobro y traspaso único a Mis Colones cuando se cobran.
- **Metas de ahorro:** objetivos y abonos manuales, sin conexiones bancarias.
- **Aula Mágica:** cuatro actividades modelo originales para preescolar y planeamientos editables e imprimibles.
- **Reino Rojinegro:** bitácora personal de partidos, marcadores y notas; sin marcadores en vivo.
- **Penalty Legends:** minijuego autónomo de penales dentro de JoshOS, compatible con ratón y pantalla táctil.
- **Agenda:** crear, editar, completar y filtrar tareas por fecha. Las tareas nuevas completadas dan +20 XP y +8 monedas en LevelUp cuando el módulo ya tiene datos locales.
- **Mis Colones:** movimientos de ingresos y gastos en colones, balance y visualización por meses. Todo manual; sin bancos conectados.
- **Control de pagos:** suscripciones y servicios con fecha mensual, pausar/activar y gasto mensual/anual estimado.
- **Negocios:** clientes, servicios, cuentas pendientes, estados de cobro. No genera facturas fiscales.
- **Segundo Cerebro:** notas y enlaces redactados en texto y filtrados por categorías.
- **Proyectos:** listado de objetivos y barra de avance.
- **Biblioteca:** lectura de judaísmo por volúmenes, islam y guías originales dentro de la app; agregar enlaces de lectura. Bitácora también incorpora su estantería personal de PDF/TXT/MD.
- **Bienestar:** sueño, agua, energía y anotaciones personales.
- **Despensa:** productos, cantidad, precio, alertas de vencimiento y lista de compras.
- **Inventario:** pertenencias, ubicaciones, compras y garantías.
- **SkillForge:** tarjetas de estudio y repaso espaciado.
- **Bóveda:** notas textuales cifradas con AES-GCM y PBKDF2-SHA256, 250 000 iteraciones; la frase nunca se guarda. No es un gestor de contraseñas auditado. Si se pierde la frase, el contenido no se recupera.
- **Archivo personal:** recuerdos y hitos personales; no incluye módulo de pareja.
- **Apps integradas:** Módulos originales de Mi Bitácora de Fe y LevelUp Life, con todas sus vistas.
- **Respaldos:** exportación de JoshOS que también incluye las bases locales de Bitácora y LevelUp. Importación de JoshOS o exportaciones JSON de cualquiera de las dos apps anteriores.

## Publicar la web con GitHub Pages

1. En GitHub crea un repositorio nuevo `joshos` (no reemplaces tu repositorio `levelup-life` ni el de la Bitácora).
2. Extrae el ZIP y sube sus archivos y carpetas **en la raíz del repositorio**, incluida la carpeta oculta `.github/workflows` (arrástrala desde el Explorador de Windows). Debe verse `index.html` directamente en el repositorio.
3. Confirma con **Commit changes**.
4. Ve a **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
5. Abre `https://TU-USUARIO.github.io/joshos/`. Si instalas la PWA desde Edge/Chrome podrás usarla en una ventana propia.

## Compilar Android (.apk) y Windows (.exe)

1. En tu repositorio abre **Actions → Compilar JoshOS (Android APK y Windows EXE) → Run workflow**.
2. Selecciona `main` y ejecútalo. Espera a que **Android APK** y **Windows EXE** aparezcan en verde.
3. En la página de esa ejecución baja a **Artifacts** y descarga `JoshOS-Android-APK` y `JoshOS-Windows-EXE`.
4. Extrae los ZIP. En Android encontrarás `app-debug.apk`, para pruebas personales; en Windows encontrarás instalador y versión portable EXE sin firma comercial.

**La compilación nativa aún debe probarse en GitHub Actions y en dispositivos reales.** El archivo APK de depuración cambia de firma según el servidor que lo construye y no es un canal de actualizaciones estables. Para versiones futuras que se instalen encima sin borrar datos, configura primero una firma de producción persistente. Los EXE sin certificado podrían producir alertas de SmartScreen: verifica el origen y el código.

## Migrar los datos desde las apps anteriores

Cada aplicación Android o Windows tiene su almacenamiento local independiente. **No se transfieren automáticamente los datos del APK o EXE anterior al instalar JoshOS**.

1. En **Mi Bitácora de Fe** abre Ajustes → Descargar respaldo JSON. En **LevelUp Life** abre Ajustes → Exportar respaldo JSON.
2. Abre JoshOS, ve a Configuración → Restaurar respaldo JSON, e importa uno de los respaldos. Repite con el otro. JoshOS reconoce los formatos originales y los guarda en la base de cada módulo.
3. Confirma que las notas y misiones aparezcan al entrar en ambos módulos antes de borrar o desinstalar las aplicaciones anteriores.
4. Exporta el respaldo completo de JoshOS de forma habitual. Los libros PDF privados importados a IndexedDB desde la Bitácora deben respaldarse por separado, pues **no se incluyen automáticamente en el JSON**.

### Nota sobre GitHub Pages

Si las páginas de tus proyectos anteriores están en `https://joshuadev2007.github.io/`, pueden compartir `localStorage` al usar **exactamente ese mismo origen**, por la política de origen del navegador. Esto no se aplica a apps instaladas en Android y Windows, que usan almacenamiento separado. JoshOS sincroniza los registros compatibles mediante Josh Cloud si iniciás sesión. No cifra de extremo a extremo todo el almacenamiento general; la bóveda sí cifra sus notas.

## Estructura

`index.html`, `app.js`, `style.css` y `assets/`: JoshOS principal.

`modules/fe/`: copia completa de Mi Bitácora de Fe, incluyendo libros y lector. `modules/levelup/`: copia completa de LevelUp Life.

`native/prepare.mjs`: prepara copias de los módulos para Capacitor y Electron. `mobile/`: Android. `desktop/`: Windows. `.github/workflows/compilar-joshos.yml`: GitHub Actions.

## Seguridad y datos

- La mayoría de registros de JoshOS están en almacenamiento local sin cifrado; el bloqueo del teléfono/PC protege el acceso cotidiano. Para datos muy delicados, usa herramientas especializadas.
- No subas respaldos personales a un repositorio público de GitHub.
- En cualquier actualización, exporta primero un respaldo, especialmente antes de desinstalar apps.
- Las notas cifradas de la bóveda quedan cifradas en el JSON de respaldo; conserva la frase de desbloqueo en un lugar seguro.


## JoshOS 2.0 · Suite personal

No se incluye **Nuestra Historia** ni ninguna función específica de pareja. Los módulos siguen funcionando sin conexión para su información local; Reino Rojinegro es un registro manual y Penalty Legends es un minijuego propio, no un reemplazo del juego conectado al sitio deportivo.

Los nuevos datos (`appointments`, `savingsGoals`, `gigs`, `classPlans`, `matches`) se guardan en el mismo objeto `joshos-life-v1`, manteniendo compatibilidad con respaldos previos. Antes de actualizar, exporta el JSON anterior. No compiles APK/EXE hasta que hayas revisado los módulos en la PWA.

*Los documentos de Aula Mágica son plantillas editables para apoyar el trabajo docente, no planeamientos oficiales del MEP. Los cobros registrados por usuario no equivalen a factura electrónica o asiento contable.*


## ☁️ NUEVO: Cuenta y sincronización

La interfaz incorpora «☁️ Cuenta», con correo/contraseña de Supabase y sincronización por dispositivo. Para activarla, leé `COMO_ACTIVAR_LA_CUENTA.md` y ejecutá `CONFIGURAR_SUPABASE.sql` en **tu propio proyecto** de Supabase. Reutilizá la MISMA URL y clave pública en JoshOS y Bitácora. **Nunca** coloqués claves `service_role` o `sb_secret_...` en GitHub.

Se preservaron las claves originales de almacenamiento local. Exportá respaldos JSON antes de sincronizar; cuando haya dos copias diferentes, elegirás qué conservar. No hay fusión automática de cambios y los PDF importados manualmente no se sincronizan. La nube conserva el contenido en texto legible para el servicio (excepto notas ya cifradas de la bóveda).


## Versión 2.2 · Todas las apps originales (excepto pareja)

- **Mi Centro de Control:** tablero dedicado con tareas, eventos, proyectos, ahorros, pendientes online y accesos rápidos personalizables.
- **Bitácora integrada actualizada:** versión 3.3.2; Josh Cloud configurado en la app contenedora.
- **LevelUp Life:** módulo original completo conservado y verificado.
- **Josh Cloud:** correo y contraseña sin solicitar URL ni claves técnicas en Android, Windows o web. URL y clave pública preconfiguradas.
- El usuario puede seguir trabajando sin conexión. La sincronización no fusiona automáticamente registros divergentes de dos dispositivos: pide elegir copia. La biblioteca privada de PDF no se sincroniza.
- La aplicación específica de pareja sigue excluida.

**Precaución:** antes de instalar nuevas versiones o importar en otro dispositivo, descargá respaldos JSON. El APK y EXE aún requieren compilarse y probarse en equipos reales.


## Actualización principal 3.0 STUDIO

### Seis apps nuevas y operativas

1. **Enfoque Studio**: cronómetro manual de 15/25/45/60 minutos, iniciar, pausar, reiniciar y guardar tiempo de trabajo. El conteo no garantiza avisos cuando el sistema suspende la app.
2. **Rituales y hábitos**: registro diario de rutinas personalizadas, seguimiento por día y vista de siete días.
3. **Mi Academia**: materias o cursos propios, objetivo de horas, sesiones y temas aprendidos.
4. **Mi Cocina**: recetario, ingredientes hacia la lista de compras, menú de siete días y artículos pendientes.
5. **Mi Red**: libreta local de contactos, notas y seguimiento, sin acceso automático a la agenda del celular.
6. **Revisión Semanal**: logros, aprendizajes, mejora para la próxima semana, prioridad y métricas de tiempo, tareas y dinero.

### Nuevas herramientas de los módulos previos

- **Mis Colones**: presupuestos mensuales por categoría, desglose y barras de gasto, CSV descargable. **No enlaza cuentas bancarias**.
- **SkillForge**: repaso activo con respuesta oculta, evaluar recordado/repasar, intervalos progresivos e importación masiva `Pregunta | Respuesta | Tema`.
- **Agenda**: vista de prioridades urgentes y distribución por áreas, salto a Enfoque.
- **Proyectos**: hitos individuales con seguimiento de completados.
- **Tuanis Manager**: pipeline de cobros y clientes.
- **Metas de ahorro**: cálculo de aportes mensuales estimados.
- **Control+**: calendario de cobros activos y estimación anual.
- **Bienestar**: promedios descriptivos de registros, sin consejos médicos personalizados.
- **Despensa**: alertas según fechas registradas y salto a Mi Cocina.
- **Inventario**: garantías próximas al vencimiento.
- **Biblioteca**: diario de lecturas con minutos, páginas y notas.
- **Segundo Cerebro**: estadísticas por temas.
- **Aula Mágica**: tablero de planeamientos.
- **Archivo personal**: línea temporal de recuerdos.
- **Reino Rojinegro**: estadísticas de partidos que vos registraste (no resultados oficiales automáticos).
- **Mi Centro de Control**: tableros y accesos personalizables, ahora junto a la suite ampliada.
- Cada entorno tiene **una identidad visual** (colores, encabezados, paneles y acciones) y conserva su contenido anterior. LevelUp, Penalty Legends y la Bóveda siguen disponibles.

### Bitácora de Fe 3.4

En **Mis versículos** aparece el explorador: pasaje al azar de una biblioteca de referencias curadas, botón **Nuevo versículo al azar**, consulta del texto Reina-Valera 1909 en línea cuando sea posible, **Guardar** en la colección, **Abrir capítulo** y **Reflexionar** con referencia precargada. Se preservaron el diario, los libros, las oraciones y los respaldos previos. Los textos que requieren internet muestran una referencia de respaldo si no hay conexión.

### Compatibilidad y seguridad

- Sigue empleando `joshos-life-v1`, `mi-bitacora-fe-v1` y `levelup-life-v1`: no se eliminan campos viejos, y las nuevas secciones se agregan con valores por defecto.
- Los nuevos registros están en el JSON habitual, sincronizable bajo la cuenta Josh Cloud. **Es sincronización de copias completas por módulo**, con conflictos manuales, NO colaboración concurrente en tiempo real. Hacé respaldo de tus datos de ambos dispositivos antes de importar.
- Josh Cloud usa la URL y clave PUBLICABLE dentro de los archivos web, nunca contraseñas ni claves de servicio. No subás JSON personales a GitHub.
- Los libros PDF privados importados manualmente a IndexedDB no viajan en la sincronización JSON.
- La Bóveda utiliza cifrado local para sus notas; el resto de los datos de nube no tiene cifrado de extremo a extremo.
- Se comprobó el funcionamiento de varias vistas y 12 operaciones en un navegador aislado, así como la lógica de versículos. **No se ha hecho compilación final de APK/EXE ni prueba real de Josh Cloud en dos dispositivos**.
- En nuevas versiones de Windows/Android debe compilarse el código con GitHub Actions y probarse el instalador resultante. No desinstalés la versión vieja sin respaldo.
