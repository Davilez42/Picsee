const btn_login = document.querySelector("#btn");
btn_login.addEventListener("click", (e) => {
  const username = document.getElementById("login-username-input").value;
  const password = document.getElementById("login-password-input").value;
  e.preventDefault();
  if (username.trim() === "") {
    show_error("Porfavor digite un nombre de usuario", 'username');
    return;
  }
  if (password.trim() === "") {
    show_error('Porfavor Digite una contraseña', 'password')
    return;
  }
  validate_login(username.trim(), password.trim());
});


const validate_login = async (us, pas) => {
  datos = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: us, password: pas }),
  };
  activateLoader()

  fetch("https://picmont-inc.onrender.com/api/v1/sign_user", datos)
    .then((respuesta) => {
      if (respuesta.ok) {
        respuesta.json().then((us) => {
          if (us["username"][0]) {
            if (us["password"]) {
              sessionStorage.setItem("loggedUser", JSON.stringify(us));
              limpiarCamposLoguin();
              window.location.href = "./home.html";
            } else {
              desactivateLoader()
              show_error('Contraseña Incorrecta', 'password')
            }
          } else {
            desactivateLoader()
            show_error('El usuario no existe', 'username')
          }
        });
      } else {
        desactivateLoader()
        respuesta.json().then((data) => {
          console.log(data)
          show_error(data.messageError.split(':')[1])
        });
      }
    })
    .catch((err) => {
      alert("Error al solicitar el recurso", err);
    });
};

