const btn_login = document.querySelector("#btn");
btn_login.addEventListener("click", (e) => {
  const username = document.getElementById("login-username-input").value;
  const password = document.getElementById("login-password-input").value;
  e.preventDefault();
  if (username == "") {
    alert("Porfavor un nombre de usuario");
    return;
  }
  if (password == "") {
    alert("Porfavor digite una contraseña");
    return;
  }

  validar_Loguin(username, password);
});

const validar_Loguin = async (us, pas) => {
  datos = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: us, password: pas }),
  };
   fetch("http://localhost:5000/login", datos)
    .then((respuesta) => {
      if (respuesta.ok) {
        respuesta.json().then((us) => {
          if (us['password']){
            alert('contraseña correcta')
            localStorage.setItem("loggedUser",JSON.stringify(us))
            window.location.href="/";
          }
          else{
            alert('contraseña INCORRECTA')
          }
        });
      } else {
        alert("El usuario no existe");
      }
    })
    .catch((err) => {
      console.log("Error al solicitar el recurso", err);
    });
};


