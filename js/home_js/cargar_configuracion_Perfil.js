const autentificacion = () => {
  if (sessionStorage.getItem("loggedUser") == undefined) {
    window.location.href = "/infoError.html";
    return;
  }
  user = JSON.parse(sessionStorage.getItem("loggedUser")); //cargo el usuario que esta logeado
  document.getElementById("avatar_").src = user["avatar"].url; //cargo el avatar
  document.getElementById("avatar").src = user["avatar"].url; //cargo el avatar
  document.getElementById(
    "barra_busqueda"
  ).placeholder = `Busca algo ${user["username"][1]} !`;
};
autentificacion();
