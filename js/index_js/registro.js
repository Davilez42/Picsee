const btn_registo = document.querySelector("#btn_registro");
btn_registo.addEventListener("click", () => {
  obtenerDatos();
});

document
  .querySelector("#avatar_archivo")
  .addEventListener("change", (event) => {
    file = event.target.files;
    if (file.length > 0) {
      const filereader = new FileReader();
      filereader.onload = (event) => {
        document.querySelector(".avatar_preview").src = event.target.result;
      };
      filereader.readAsDataURL(file[0]);
    }
  });

const obtenerDatos = async () => {
  const nombres = document.getElementById("registro-nombres-input").value;
  const apellidos = document.getElementById("registro-apellidos-input").value;
  const usuario = document.getElementById("registro-usuario-input").value;
  const correo = document.getElementById("registro-correo-input").value;
  const contraseña = document.getElementById("registro-contraseña-input").value;
  const contraseña_confirmar = document.getElementById(
    "registro-contraseña-input-2"
  ).value;

  if (nombres.trim() === "") {
    alert("Porfavor digite el nombre");
    return;
  }
  if (apellidos.trim() === "") {
    alert("Porfavor digite el campo de apellidos");
    return;
  }
  if (usuario.trim() === "") {
    alert("Porfavor digite el campo de usuarios");
    return;
  }
  if (correo.trim() === "") {
    alert("Porfavor digite el correo");
    return;
  }

  if (contraseña.trim() !== "") {
    if (contraseña.length < 8) {
      alert("La contraseña debe tener minimo 8 caracteres");
      return;
    }
  } else {
    alert("Porfavor digite una contraseña");
    return;
  }

  datos_formularo = {
    first_names: nombres.trim(),
    last_names: apellidos.trim(),
    username: usuario.trim(),
    email: correo.trim(),
    password: contraseña,
  };

  if (contraseña_confirmar === contraseña) {
    activateLoader()
    await enviar_registro(datos_formularo);
  } else {
    alert("Las contraseñas no coindicen");
  }
};

const enviar_registro = async (datos_formularo) => {

  const respuesta = await fetch(
    "https://picmont-inc.onrender.com/api/v1/signUp_user",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos_formularo),
    }
  );
  if (respuesta.ok) {
    const us = await respuesta.json();
    if (us["succes"]) {
      sessionStorage.setItem("loggedUser", JSON.stringify(us));
      obtenermasinfoUsuario(datos_formularo.first_names);
      limpiarFormRegistro();
    } else {
      alert(`El ${us["valFail"]} ya esta en uso`);
    }
  } else {
    desactivateLoader()
    const us = await respuesta.json();
    alert(us["messageError"]);
  }
};

const obtenermasinfoUsuario = (name_user) => {
  desactivateLoader()
  //document.querySelector('.coantenedor_ingresar').style.display = 'none'
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  if (user == null) {
    alert("Debes registrate primero !");
    return;
  }
  document.querySelector(".titulo_info_user").innerHTML += " " + name_user;
  document.querySelector(".form-registro").style.display = "none";
  document.querySelector(".contenedor-imagenes").style.display = "none";
  document.querySelector(".form-infoUsuario").style.display = "flex";
  document.querySelector(".contenedor-avatar").style.display = "flex";

  document
    .getElementById("btn_infouser")
    .addEventListener("click", async () => {
      const pais = document.getElementById("infoUsuario-pais-input").value;
      const ciudad = document.getElementById("infoUsuario-ciudad-input").value;
      const avatar = document.getElementById("avatar_archivo").files;
      console.log(pais.trim() != "", ciudad.trim() != "");

      if (pais.trim() != "" || ciudad.trim() != "") {
        fetch(
          `https://picmont-inc.onrender.com/api/v1/setpreinfoUser/${user.id_user}`,
          {
            method: "PATCH",
            mode: "cors",
            headers: { auth: user.token, "Content-Type": "application/json" },
            body: JSON.stringify({ ciudad, pais }),
          }
        );
      }

      if (avatar.length > 0) {
        const form = new FormData();
        form.append("archivo", avatar[0]);
        const resp = await fetch(
          `https://picmont-inc.onrender.com/api/v1/changedAvatar/${user.id_user}`,
          {
            method: "PATCH",
            mode: "cors",
            headers: { auth: user.token, id_avatar: user.id_avatar },
            body: form,
          }
        );
        if (resp.ok) {
          const new_avatar = await resp.json();
          user.avatar = new_avatar;
          sessionStorage.setItem("loggedUser", JSON.stringify(user));
        } else {
          alert("El  avatar NO se cargo correctamente");
        }
      }
      limpiarFormInfouser();
      window.location.href = "/home.html";
    });
};

