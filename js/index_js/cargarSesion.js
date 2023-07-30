const cargar_informacion = async () => {
  const user_logged = sessionStorage.getItem("loggedUser");
  if (user_logged != undefined) {
    window.location.href = "home.html";
  } else {
    ("Porfavor inicia sesion primero");
  }
};
cargar_informacion();
