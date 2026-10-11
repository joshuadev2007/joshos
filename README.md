# JoshOS ✦ · Tu universo personal

**JoshOS 2.0** es una aplicación privada y local para organizar tu vida desde Android, Windows y web. Incluye **Mi Bitácora de Fe 3.2** y **LevelUp Life 1.0** como módulos completos que se abren dentro de JoshOS. No hay anuncios ni planes de pago; los datos se guardan en el dispositivo.

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

Si las páginas de tus proyectos anteriores están en `https://joshuadev2007.github.io/`, pueden compartir `localStorage` al usar **exactamente ese mismo origen**, por la política de origen del navegador. Esto no se aplica a apps instaladas en Android y Windows, que usan almacenamiento separado. JoshOS no sincroniza automáticamente los datos entre dos dispositivos ni cifra todo el almacenamiento general; solo cifra su bóveda de notas.

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
