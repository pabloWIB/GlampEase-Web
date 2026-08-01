/* carrusel.js — recorre los planes de alojamiento de la portada.
   Sustituye al carrusel de Bootstrap: sin jQuery, sin Popper, sin Bootstrap. */

window.GlampEase = window.GlampEase || {};

window.GlampEase.carrusel = (function () {
  "use strict";

  var contenedor = null;
  var diapositivas = [];
  var actual = 0;

  function mostrar(indice) {
    var total = diapositivas.length;
    actual = (indice + total) % total;

    diapositivas.forEach(function (diapositiva, posicion) {
      diapositiva.classList.toggle("plan--activa", posicion === actual);
    });
  }

  function alPulsar(evento) {
    var control = evento.target.closest("[data-carrusel-accion]");

    if (!control) {
      return;
    }

    mostrar(control.dataset.carruselAccion === "anterior" ? actual - 1 : actual + 1);
  }

  function alPulsarTecla(evento) {
    if (evento.key === "ArrowLeft") {
      mostrar(actual - 1);
    } else if (evento.key === "ArrowRight") {
      mostrar(actual + 1);
    }
  }

  function iniciar() {
    contenedor = document.querySelector("[data-carrusel]");

    if (!contenedor) {
      return;
    }

    diapositivas = Array.prototype.slice.call(
      contenedor.querySelectorAll("[data-carrusel-diapositiva]")
    );

    if (diapositivas.length < 2) {
      return;
    }

    contenedor.addEventListener("click", alPulsar);
    contenedor.addEventListener("keydown", alPulsarTecla);

    mostrar(0);
  }

  return { iniciar: iniciar };
})();
