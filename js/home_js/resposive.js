const width = window.innerWidth;

if (width <= 948) {
  document.querySelector("#icono_perfil").setAttribute("hidden", "");
  document.querySelector(".icono_menu").removeAttribute("style");
  document.querySelector(".barra_navegacion").remove();

  document
    .querySelector(".barra_navegacion_desplegable #btn_subirMomento")
    .removeAttribute("hidden");
  document.querySelector(".icono_menu").addEventListener("click", () => {
    if (
      document
        .querySelector(".barra_navegacion_desplegable")
        .getAttribute("hidden") === ""
    ) {
      document
        .querySelector(".barra_navegacion_desplegable")
        .removeAttribute("hidden");
    } else {
      document
        .querySelector(".barra_navegacion_desplegable")
        .setAttribute("hidden", "");
    }
  });
} else {
  document.querySelector("#avatar_").setAttribute("hidden", "");
  document
    .querySelector(".barra_navegacion_desplegable")
    .setAttribute("hidden", "");
}

if (width <= 740) {
  document.querySelector(".nombreApp").remove();
}