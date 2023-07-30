const mostrar_formulario_Registro = () => {
  if (document.getElementById("formulario_ingreso").style.display != "none") {
    document.getElementById("formulario_ingreso").style.display = "none";
    document.getElementById("formulario_registro").style.display = "flex";
  } else {
    document.getElementById("formulario_registro").style.display = "none";
    document.getElementById("formulario_ingreso").style.display = "flex";
  }
};
