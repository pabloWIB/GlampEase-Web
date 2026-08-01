/* menu.js — menú de navegación en pantallas pequeñas.
   Se registra en el espacio de nombres GlampEase; main.js lo arranca. */

window.GlampEase = window.GlampEase || {};

window.GlampEase.menu = (function () {
  "use strict";

  var boton = null;
  var nav = null;
  var escritorio = null;

  function estaAbierto() {
    return boton.getAttribute("aria-expanded") === "true";
  }

  function establecer(abierto) {
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("nav--abierto", abierto);
    document.body.classList.toggle("sin-scroll", abierto);
  }

  function cerrar(devolverFoco) {
    if (!estaAbierto()) {
      return;
    }
    establecer(false);
    if (devolverFoco) {
      boton.focus();
    }
  }

  function alPulsarBoton() {
    establecer(!estaAbierto());
  }

  function alPulsarEnMenu(evento) {
    if (evento.target.closest("a")) {
      cerrar(false);
    }
  }

  function alPulsarTecla(evento) {
    if (evento.key === "Escape") {
      cerrar(true);
    }
  }

  function alCambiarAncho(evento) {
    if (evento.matches) {
      cerrar(false);
    }
  }

  function iniciar() {
    boton = document.querySelector("[data-menu-boton]");
    nav = document.querySelector("[data-menu]");

    if (!boton || !nav) {
      return;
    }

    boton.addEventListener("click", alPulsarBoton);
    nav.addEventListener("click", alPulsarEnMenu);
    document.addEventListener("keydown", alPulsarTecla);

    escritorio = window.matchMedia("(min-width: 768px)");
    if (typeof escritorio.addEventListener === "function") {
      escritorio.addEventListener("change", alCambiarAncho);
    }

    establecer(false);
  }

  return { iniciar: iniciar };
})();
