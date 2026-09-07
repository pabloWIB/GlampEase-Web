# GlampEase

Static front end for a glamping site in the Reserva del Ruiz: five accommodation
plans, a page about the reserve and a premium membership.

![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-198%20KB-brightgreen)

## Description

Booking a glamping stay here is a choice between a handful of packages, not a
search across dates and rooms. The home page reflects that: the five plans are
numbered `01/05` through `05/05` and shown one at a time — couples, family of
four, couples day pass, family day pass and the cabin plan — so the visitor
compares a short list instead of filtering a catalogue.

Two supporting pages sit behind it: an article on the reserve, its accommodation
and its environmental commitment, and the premium membership with its loyalty
programme, booking flexibility and FAQ.

The site is in Spanish and entirely static. Nothing is bookable from it: there
is no availability, no calendar and no payment step. It is the presentation
layer for a reservation system that lives elsewhere.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | Four pages, no templating |
| Styling | CSS3 | Custom properties, flexbox and grid, mobile first |
| Scripting | Vanilla JavaScript (ES5 syntax, classic scripts) | Mobile menu and plan carousel |
| Images | WebP | Photography; PNG for the logo, inline SVG for icons |
| Typography | Google Fonts | Judson for headings, Nunito Sans for body text |

No framework, no bundler, no package manager, no build step. The only external
requests are the two Google Fonts families; everything else is served from the
repository.

## Project structure

```
.
├── index.html              # Home: the five plans
├── la-reserva.html         # The reserve: accommodation, ecology, activities
├── membresia.html          # Premium membership, loyalty programme and FAQ
├── 404.html                # Not found, links back to the home page
├── assets/
│   ├── css/
│   │   ├── base.css        # Custom properties, reset, typography, utilities
│   │   ├── layout.css      # Container, header, navigation, footer
│   │   ├── components.css  # Buttons, cards, lists, prose, FAQ
│   │   └── pages/
│   │       └── planes.css  # Home only: colour split and plan carousel
│   ├── js/
│   │   ├── main.js         # Single entry point: starts every module found
│   │   └── modules/
│   │       ├── menu.js     # Mobile navigation panel
│   │       └── carrusel.js # Plan carousel
│   └── img/
│       ├── logo/           # Reserva del Ruiz seal, used as favicon
│       └── content/        # Four photographs plus the Open Graph image
├── docs/
│   ├── auditoria.md        # Inventory of the project before the reorganisation
│   └── cambios.md          # What changed, grouped by phase
├── robots.txt
└── sitemap.xml
```

### How the JavaScript is wired

Modules are classic scripts, not ES modules, so the site also works when
`index.html` is opened straight from the file system. Each module registers
itself on the `window.GlampEase` namespace and exposes an `iniciar` function;
`main.js` loads last and calls every `iniciar` it finds. Pages that do not need
a module simply do not load it — `la-reserva.html` ships the menu only.

Both features degrade without JavaScript: an inline one-liner sets
`data-js="on"` on `<html>`, and the CSS only hides the navigation panel and the
carousel controls when that flag is present. With scripting off, the menu is a
plain list of links and the five plans stack vertically.

## Running it locally

Open `index.html` in a browser — it works over `file://`.

For a local server, from the repository root:

```bash
npx serve .
```

or, without Node:

```bash
python -m http.server 4173
```

## Deployment

Static hosting, no build command and no output directory: upload the repository
root as it is. The absolute URLs in `sitemap.xml`, `robots.txt`, the canonical
tags and the Open Graph tags point to `https://pablowib.github.io/GlampEase-Web`; change
them if the site is deployed elsewhere.

`404.html` is served automatically by hosts that look for that filename, GitHub Pages
and Netlify among them.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
