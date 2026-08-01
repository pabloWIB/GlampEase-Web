# Registro de cambios

Reorganización completa del proyecto, agrupada por fase. El estado de partida
está documentado en [auditoria.md](auditoria.md). Ningún cambio se subió: todo
queda en local.

## 1. Auditoría

- Inventario de 7 HTML, 8 CSS, 2 JS, 22 imágenes y 7 dependencias externas.
- 12 referencias rotas localizadas: 3 páginas de 0 bytes enlazadas desde el
  menú de todas las páginas, el botón RESERVAR apuntando a `google.com`, los
  tres iconos sociales con `href="https://"`, las imágenes del pie de PAGINA7
  sin `../../`, un `<script src="	">` con un tabulador por ruta.
- Búsqueda de credenciales en todo el código: sin resultados.

## 2. Estructura

- Páginas a la raíz, con nombre por contenido y en minúsculas:
  `PAGINAS/PAGINA7/index.html` → `la-reserva.html`,
  `PAGINAS/PAGINA6/index.html` → `membresia.html`.
- Creada `404.html`, que antes no existía.
- `CSS/`, `JS/`, `IMG/` → `assets/css/`, `assets/js/`, `assets/img/`.
- CSS repartido en `base.css`, `layout.css`, `components.css` y
  `pages/planes.css`; JS en `main.js` más `modules/menu.js` y
  `modules/carrusel.js`.
- Todas las rutas internas actualizadas y verificadas con peticiones reales:
  ninguna responde 404.

## 3. Higiene

- Eliminados: `CSS/prepros.config` (21.6 KB de configuración de IDE),
  `CSS/styles.scss` (fuente desincronizada del CSS que se servía),
  `CSS/fonts.css` (regla sobre un selector `su` inexistente),
  `PAGINAS/PAGINA2/` completa (HTML sin contenido, CSS y JS de 0 bytes,
  dos imágenes de plantilla), `PAGINAS/PAGINA3/`, `PAGINA4/` y `PAGINA5/`
  (archivos de 0 bytes), `POST/PC1.jpg` (mockup de 1.34 MB que ninguna página
  usaba), y las imágenes huérfanas `hoverSelection.svg` (copia byte a byte de
  `nextLine.svg`), `magnify.svg` y `next.svg`.
- Eliminados los bloques de precios comentados dentro del HTML de la portada.
- Creado `.gitignore` para un proyecto estático: sistema operativo, editores,
  restos de Prepros y Sass, `node_modules`, `.env` y `.vercel`.
- Formato normalizado: indentación de 2 espacios, comillas dobles en HTML y JS,
  punto y coma en JS, salto de línea final en todos los archivos.

## 4. Imágenes

- De 2.5 MB a 216 KB, sin descargar ni inventar ninguna imagen.
- Las cuatro fotografías que se usan pasaron a WebP con nombre semántico:
  `imagen1.jpg` (580 KB) → `domo-atardecer.webp` (111 KB, redimensionada a
  727×800), `imagen2` → `cielo-estrellado.webp`, `imagen3` → `domos-ladera.webp`,
  `imagen4` → `interior-domo.webp`.
- `IMG/fondo.jpg`: 3856×2366 y 99.8 KB para un plano de dos colores. Sustituido
  por `linear-gradient`, con la misma división al 37 % y el mismo `#f4a88e`.
- `icon.png` (39.4 KB) → `reserva-del-ruiz.png` (9.1 KB) más `favicon-32.png`
  (0.9 KB), reduciendo la paleta sin tocar el sello.
- Nueva `og-glampease.jpg`, recorte 765×401 de la foto del domo al atardecer,
  para las tarjetas de redes sociales.
- Los 10 iconos SVG que quedaban se resolvieron en línea dentro del HTML
  (menú, cerrar, flecha anterior y siguiente): 4 peticiones menos y color
  heredado con `currentColor`.
- Cada `<img>` lleva `width`, `height`, `alt` descrito a partir de lo que se ve
  en la foto, y `loading="lazy"` salvo la primera imagen de la portada.

## 5. HTML, SEO y accesibilidad

- Estructura semántica en las cuatro páginas: `header`, `nav`, `main`,
  `section`, `article`, `footer`, un solo `h1` y jerarquía de encabezados sin
  saltos (verificado: `H1>H2>H2…`, `H1>H2>H3…`).
- `lang="es"` en lugar de `lang="en"` sobre contenido en español.
- `<title>` de 49 a 52 caracteres y `meta description` de 148 a 160, únicos por
  página; Open Graph completo y `canonical` en las tres páginas indexables;
  `noindex` en la 404.
- Navegación por teclado completa: enlace "Saltar al contenido", foco visible
  de 2 px en todo elemento interactivo, `aria-label` en el botón de menú,
  `aria-current="page"` en el enlace activo.
- Contraste verificado por cálculo sobre el color de fondo real de cada texto,
  en las cuatro páginas y a 360, 768, 1024 y 1440 px: ningún texto por debajo
  de 4.5:1. `--color-texto-suave` se oscureció de `#55504d` a `#3f3b38` porque
  el pie sobre la franja durazno daba 4.1:1.
- Creados `robots.txt` y `sitemap.xml` con las tres URLs reales del sitio.
- Eliminado el texto de plantilla: `url('ruta-a-tu-imagen-de-fondo.jpg')` y los
  enlaces a un `#form` que no existía.

## 6. CSS

- Sistema de diseño en `:root`: 8 colores, 2 familias tipográficas, escala
  tipográfica de 8 pasos, escala de espaciado 4/8/16/24/32/48/64/96, radios,
  sombras, transición y ancho máximo. La paleta sale del propio sitio: el
  durazno `#f4a88e` del fondo original, el `#323232` de los botones y el blanco.
- Sustituidos los selectores posicionales de hasta 5 niveles
  (`body header > :nth-child(2) > :nth-child(1) h3`) por clases con nombre.
  Ninguna regla pasa de 3 niveles y no hay ningún `!important` ni estilo en
  línea.
- Eliminadas las reglas duplicadas del bloque `a { all: unset… }`, repetido
  íntegro en 4 media queries, y el estilizado de un `<button>` que no existía.
- Orden fijo en cada archivo: variables → reset → base → layout → componentes →
  utilidades → media queries.

## 7. Responsive

- Reescrito en mobile first: las 18 media queries `max-width` con breakpoints
  arbitrarios (915, 855, 825, 800, 700, 670, 650, 550, 525, 480, 450, 410, 390)
  pasaron a `min-width` en 480, 768, 1024 y 1440.
- Retirado el `body { overflow: hidden; height: 100vh }` que cortaba el
  contenido en escritorio.
- Sin scroll horizontal: comprobado en las 4 páginas × 4 anchos con
  `document.documentElement.scrollWidth > window.innerWidth`.
- Áreas táctiles de 44×44 px como mínimo en enlaces, botones, marca y controles
  del carrusel.
- Menú móvil funcional: abre y cierra, bloquea el scroll de fondo, se cierra al
  pulsar un enlace y con Escape, y devuelve el foco al botón.

## 8. UX / UI

- La portada dice qué es el sitio antes de mostrar el carrusel: título, una
  línea de contexto y una llamada a la acción con destino real.
- Retirados los cinco botones RESERVAR que apuntaban a `google.com`, los tres
  enlaces sociales vacíos y los iconos de carrito y de usuario, que no llevaban
  a ninguna tienda ni área de cliente.
- Cada página termina con una llamada a la acción hacia otra página del sitio.
- Estados en todo elemento interactivo (reposo, hover, foco, activo,
  deshabilitado) con transiciones de 180 ms.
- Ancho de línea de lectura limitado a 68 caracteres.
- Corregidos el quinto plan, que estaba numerado `04/05` como el cuarto, y
  "pasadia" sin tilde en dos títulos.

## 9. JavaScript

- Fuera jQuery, Bootstrap y Popper. El carrusel se reescribió en 60 líneas de
  JavaScript propio, con vuelta circular y flechas del teclado.
- Eliminados los 4 bloques `hover` de `script.js` que alternaban las clases
  `hoverSelection1/2/3`, inexistentes en el HTML y en el CSS.
- Eliminado el cálculo de altura del carrusel, que medía antes de que las
  imágenes cargaran.
- Sin variables globales sueltas ni `var` fuera de los módulos: un solo espacio
  de nombres `window.GlampEase`, funciones en IIFE y `"use strict"`.
- Cada módulo comprueba que sus elementos existen antes de operar sobre ellos.
- Consola limpia en las cuatro páginas, servidas por HTTP y abiertas por
  `file://`.

## 10. Rendimiento

- Primera carga: **198 KB en 13 peticiones**, de las cuales 78 KB son las dos
  familias de Google Fonts. Antes: 2.5 MB de imágenes en el repositorio, más
  Bootstrap CSS y JS, dos versiones distintas de jQuery, Popper y normalize
  desde cinco CDNs.
- Las dos peticiones de Google Fonts se unieron en una, con `display=swap` y
  `preconnect`.
- Todos los scripts con `defer`.
- Eliminada la dependencia de normalize: el reset propio ocupa 40 líneas.

## 11. Verificación

Comprobado uno por uno, con el sitio servido en `localhost` y abierto también
desde el sistema de archivos:

- Todos los enlaces del menú y del pie llevan a páginas que existen.
- Todas las rutas de imagen, `<link>` y `<script>` responden 200.
- Cero errores y cero avisos en consola en las cuatro páginas.
- Sin scroll horizontal en 360, 768, 1024 y 1440 px.
- El menú móvil abre y cierra por las cuatro vías previstas.
- No queda texto de plantilla, "Lorem ipsum", "TODO" ni marcadores de posición.
- Ninguna imagen rota; las que no cargan al inicio son las diferidas de las
  diapositivas ocultas, que cargan al mostrarse.
- Títulos y descripciones únicos en cada página.
- `404.html` existe y enlaza a la portada.
- Sin credenciales en el código.

## 12. Documentación

- `README.md` reescrito: descripción, stack real, árbol comentado, cómo
  funciona el JavaScript, cómo ejecutarlo y cómo desplegarlo. Se quitaron la
  tabla de rutas `PAGINA2…PAGINA7`, la sección de problemas conocidos, ya
  resueltos, y la insignia de demo, que apuntaba a un despliegue del sitio
  anterior.
- Este registro y `auditoria.md`.

## Contenido eliminado por no ser verificable

- **Testimonios firmados** ("Juan Diego Pérez", "Juliana Gónzales") en la página
  de membresía: no hay forma de comprobar que existan.
- **Precios de los planes**: cuatro estaban comentados en el HTML y uno seguía
  visible solo en el quinto plan. Se retiró el que quedaba, para no publicar una
  tarifa suelta y probablemente desactualizada.
- **Proceso de inscripción** de la membresía: describía un formulario que no
  existe en ninguna parte del proyecto.
- **Página de restaurante**: el `<body>` estaba vacío y sus dos imágenes eran
  plantillas florales, una de ellas una carta con el texto ilegible.
- **Páginas Opiniones, Imágenes y Decoraciones**: archivos de 0 bytes.
