/* main.js — único punto de entrada. Los módulos de assets/js/modules/ se
   cargan antes con `defer`, se registran en window.GlampEase y aquí se
   arrancan solo si la página los necesita. */

(function () {
  "use strict";

  var modulos = window.GlampEase || {};

  Object.keys(modulos).forEach(function (nombre) {
    var modulo = modulos[nombre];

    if (modulo && typeof modulo.iniciar === "function") {
      modulo.iniciar();
    }
  });
})();
