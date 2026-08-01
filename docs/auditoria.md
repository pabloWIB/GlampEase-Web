# Auditoría inicial — GlampEase

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.
Fecha de auditoría: 2026-07-30.

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Peso | Estado real |
|---|---|---|---|---|
| `index.html` | Reserva del Ruiz | GlampEase | 9.9 KB | Funciona. Carrusel Bootstrap con 5 planes de alojamiento |
| `PAGINAS/PAGINA2/index.html` | Restaurante | — | 937 B | `<body>` vacío: solo carga CSS y un JS de 0 bytes |
| `PAGINAS/PAGINA3/index.html` | — | — | 0 B | Archivo vacío. Enlazado desde el menú como "Opiniones" |
| `PAGINAS/PAGINA4/index.html` | — | — | 0 B | Archivo vacío. Enlazado desde el menú como "Imagénes" |
| `PAGINAS/PAGINA5/index.html` | — | — | 0 B | Archivo vacío. Enlazado desde el menú como "Decoraciones" |
| `PAGINAS/PAGINA6/index.html` | Glamping Reserva del Ruiz - Suscripción Premium | ¡Descubre la Experiencia Premium! | 4.4 KB | Contenido real. CSS embebido, sin relación con el resto del sitio |
| `PAGINAS/PAGINA7/index.html` | Reserva del Ruiz | GlampEase | 7.5 KB | Artículo real sobre la reserva. Menú y footer con rutas rotas |

Ninguna página tenía `meta description`, Open Graph, canonical ni `lang="es"`
(las cuatro que declaran idioma dicen `lang="en"` sobre contenido en español).
No existía `404.html`, `robots.txt` ni `sitemap.xml`.

## 2. CSS

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/styles.css` | 25.6 KB | Sí (index, PAGINA7) | Compilado de Sass **y luego editado a mano**: `.blogBody` y `.blogSection` existen solo aquí |
| `CSS/styles.scss` | 14.1 KB | No | Fuente Sass desincronizada del CSS servido |
| `CSS/fonts.css` | 80 B | Sí (index, PAGINA7, PAGINA2) | Regla `su { }` — selector inexistente en HTML. Archivo muerto |
| `CSS/prepros.config` | 21.6 KB | No | Configuración del IDE Prepros, no del proyecto |
| `PAGINAS/PAGINA2/CSS/styles.css` | 0 B | Sí | Vacío |
| `PAGINAS/PAGINA2/CSS/styles.scss` | 0 B | No | Vacío |
| `PAGINAS/PAGINA2/CSS/normalize.css` | 2.4 KB | Sí | Copia parcial de normalize |
| `PAGINAS/PAGINA2/CSS/fonts.css` | 80 B | Sí | Duplicado exacto de `CSS/fonts.css` |

Problemas de fondo en `styles.css`:

- Todo el CSS cuelga de `body { ... }` y de selectores posicionales
  (`> :nth-child(2) > :nth-child(1) h3`), hasta 5 niveles de profundidad.
  Cualquier `<div>` insertado rompe el diseño.
- 18 media queries, todas `max-width` (desktop-first), con breakpoints
  arbitrarios: 915, 855, 825, 800, 700, 670, 650, 550, 525, 480, 450, 410, 390.
- Valores mágicos repetidos sin variables: `13.5px`, `22.5px`, `-17.5px`,
  `7.5px 11.5px`, `#323232` escrito 7 veces.
- `body { overflow: hidden; height: 100vh }` en escritorio: el contenido que no
  cabe se pierde, no hay scroll.
- Reglas duplicadas: el bloque `a { all: unset; padding… }` se repite íntegro en
  4 media queries; `.dos > :nth-child(2) button` estiliza un `<button>` que no
  existe en el HTML (son `<a>`).
- Dos bloques `@media (max-width: 855px)` separados.

## 3. JavaScript

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | 967 B | Sí (index, PAGINA7) | 5 bloques jQuery |
| `PAGINAS/PAGINA2/JS/script.js` | 0 B | Sí | Vacío |

De los 5 bloques de `JS/script.js`, **4 no hacían nada**: los `hover` sobre
`.active1`, `.active2` y `.active3` alternan las clases `.hoverSelection1/2/3`,
que no existen en ningún HTML ni en el CSS. El bloque de altura del carrusel se
ejecuta antes de que las imágenes carguen, así que mide de más o de menos.
Solo el bloque `.active4` (menú móvil) tenía efecto real.

## 4. Imágenes

| Archivo | Dimensiones | Peso | Formato | ¿Se usa? |
|---|---|---|---|---|
| `IMG/fondo.jpg` | 3856×2366 | 99.8 KB | JPEG | Sí, `background` del `body`. **Es un plano de dos colores**: franja `#f4a88e` hasta el 37 % y blanco el resto |
| `IMG/imagen1.jpg` | 765×842 | 580 KB | JPEG | Sí, foto principal de los 5 planes (domo al atardecer) |
| `IMG/imagen2.jpg` | 181×118 | 31 KB | JPEG | Sí, miniatura (cielo estrellado) |
| `IMG/imagen3.jpg` | 181×118 | 45 KB | JPEG | Sí, miniatura (domos en la ladera) |
| `IMG/imagen4.jpg` | 181×118 | 47.8 KB | JPEG | Sí, miniatura (interior del domo) |
| `IMG/icon.png` | 150×150 | 39.4 KB | PNG | Sí, favicon. Es el sello "Reserva del Ruiz — el glamping de un millón de estrellas" |
| `IMG/menu.svg` | 24×24 | 174 B | SVG | Sí, botón de menú |
| `IMG/menuOpen.svg` | 24×24 | 228 B | SVG | Sí, botón de cerrar |
| `IMG/prevLine.svg` | 58×8 | 258 B | SVG | Sí, flecha anterior |
| `IMG/nextLine.svg` | 58×7 | 261 B | SVG | Sí, flecha siguiente |
| `IMG/cart.svg` | — | 1.8 KB | SVG | Sí, pero es un carrito que no lleva a ningún carrito |
| `IMG/user.svg` | — | 1.3 KB | SVG | Sí, pero es un usuario sin área de usuario |
| `IMG/icons8-whatsapp.svg` | — | 4.9 KB | SVG | Sí, dentro de `<a href="https://">` |
| `IMG/icons8-instagram.svg` | — | 817 B | SVG | Sí, dentro de `<a href="https://">` |
| `IMG/icons8-facebook.svg` | — | 1.6 KB | SVG | Sí, dentro de `<a href="https://">` |
| `IMG/hoverSelection.svg` | 58×7 | 261 B | SVG | **No.** Copia byte a byte de `nextLine.svg` |
| `IMG/magnify.svg` | — | 880 B | SVG | **No** |
| `IMG/next.svg` | 48×48 | 171 B | SVG | **No** |
| `POST/PC1.jpg` | 4655×3223 | 1.34 MB | JPEG | **No.** Mockup de presentación del diseño en un navegador |
| `PAGINAS/PAGINA2/IMG/background.jpg` | 851×1182 | 214 KB | JPEG | **No.** Marco floral de plantilla |
| `PAGINAS/PAGINA2/IMG/photo1.jpg` | 864×1184 | 128 KB | JPEG | **No.** Carta de restaurante de plantilla, con el texto ilegible |
| `PAGINAS/PAGINA2/IMG/icon.png` | 150×150 | 39.4 KB | PNG | Sí, favicon de una página vacía. Duplicado de `IMG/icon.png` |

Ninguna etiqueta `<img>` tenía `width`, `height` ni `loading`. De los 14 `<img>`
de `index.html`, 12 llevaban `alt=""` vacío o `alt` inexistente sobre contenido
informativo. Peso total de imágenes en el repositorio: **2.5 MB**, de los cuales
1.7 MB no se usaban.

## 5. Dependencias externas

| Dependencia | Versión | Origen | Uso real |
|---|---|---|---|
| Bootstrap CSS | 4.1.3 | stackpath | Solo `.carousel`, `.carousel-item`, `.container` |
| Bootstrap JS | 4.1.3 | stackpath | Solo el carrusel |
| jQuery slim | 3.0.0-beta1 | cdnjs | Cargado en `<head>` |
| jQuery slim | 3.3.1 | code.jquery.com | Cargado al final: **pisa al anterior** |
| Popper.js | 1.14.3 | cdnjs | Dependencia de Bootstrap, no se usa |
| normalize.css | 8.0.1 | cdnjs | Reset |
| Google Fonts | — | fonts.googleapis.com | Judson + Nunito Sans |

Seis peticiones a cinco CDNs distintos, ~250 KB comprimidos, para animar un
carrusel de cinco tarjetas. Se cargaban **dos versiones de jQuery** en cada
página, una de ellas beta.

## 6. Enlaces y referencias rotas

| Dónde | Referencia | Problema |
|---|---|---|
| `index.html` menú y overlay | `PAGINAS/PAGINA3/`, `PAGINA4/`, `PAGINA5/` | Los tres archivos son de 0 bytes: página en blanco |
| `index.html` menú | `PAGINAS/PAGINA2/` etiquetado "Ubicación" | El `<title>` de esa página dice "Restaurante" |
| `index.html` menú | `PAGINAS/PAGINA6/` etiquetado "Restaurante" | Es la página de suscripción premium |
| `index.html` menú | `PAGINAS/PAGINA7/` etiquetado "Blog" | Es un artículo sobre la reserva |
| `index.html` ×5 | `<a href="https://google.com">RESERVAR</a>` | El botón principal del sitio va a Google |
| `index.html` footer ×3 | `<a href="https://">` | WhatsApp, Instagram y Facebook sin destino |
| `index.html` línea 365 | `<script src="	">` | `src` con un tabulador: petición a la propia página |
| `PAGINA7` menú y overlay | `PAGINAS/PAGINA2/…` | Rutas relativas sin subir de nivel: 404 desde esa carpeta |
| `PAGINA7` footer ×3 | `IMG/icons8-*.svg` | Las tres imágenes del footer, rotas (falta `../../`) |
| `PAGINA6` | `url('ruta-a-tu-imagen-de-fondo.jpg')` | Marcador de posición literal en el CSS |
| `PAGINA6` ×2 | `<a href="#form">` | No existe ningún formulario en la página |
| `PAGINA2` | `CSS/styles.css`, `JS/script.js` | Existen pero están vacíos |

## 7. Contenido de relleno y contenido no verificable

- `PAGINA6` incluye dos testimonios firmados con nombre y apellido
  ("Juan Diego Pérez", "Juliana Gónzales") sin origen ni respaldo.
- `PAGINA6` arrastra `background-image: url('ruta-a-tu-imagen-de-fondo.jpg')`,
  texto de plantilla sin sustituir.
- `index.html` guarda 4 bloques de precios comentados y deja **uno visible**
  (`Semana y fin de Semana $180.000`) solo en el quinto plan.
- El quinto plan está numerado `04/05`, igual que el cuarto.
- "Imagénes" (con tilde en la í) aparece en los seis menús del sitio.
- El icono de carrito y el de usuario no llevan a ninguna parte: no hay tienda
  ni área de cliente.

## 8. Archivos basura

No hay `.bak`, `node_modules`, `.DS_Store` ni `Thumbs.db`. Sí hay residuo de
herramienta y de estructura:

- `CSS/prepros.config` — 21.6 KB de configuración de un IDE.
- `CSS/styles.scss` — fuente desincronizada del CSS que realmente se sirve.
- `PAGINAS/PAGINA2/CSS/styles.scss`, `styles.css`, `JS/script.js` — 0 bytes.
- `PAGINAS/PAGINA3/`, `PAGINA4/`, `PAGINA5/` — carpetas con un archivo vacío.
- `POST/` — carpeta de un solo archivo, un mockup de 1.34 MB.

## 9. Credenciales

Búsqueda de `api_key`, `token`, `secret`, `password`, `Bearer`, `sk_live` y
claves de Google en todo el HTML, CSS y JS: **sin resultados**. El proyecto no
contiene credenciales.
