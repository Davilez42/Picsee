const btn_login = document.querySelector("#btn");
btn_login.addEventListener("click", (e) => {
  const username = document.getElementById("login-username-input").value;
  const password = document.getElementById("login-password-input").value;
  e.preventDefault();
  if (username.trim() === "") {
    alert("Porfavor digite un nombre de usuario");
    return;
  }
  if (password.trim() === "") {
    alert("Porfavor digite una contraseña");
    return;
  }
  validar_Loguin(username.trim(), password.trim());
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
   fetch("http://192.168.1.7:5000/validateUser", datos)
    .then((respuesta) => {      
      if (respuesta.ok) {
        respuesta.json().then((us) => {
          if (us['username'][0]){          
            if (us['password']) {
              sessionStorage.setItem("loggedUser",JSON.stringify(us))
              limpiarCamposLoguin()
              window.location.href="/home.html";
            }
            else{
              
              document.getElementById('contenedor_error').innerHTML = '<h4 id="message_err">Contraseña incorrecta</h4>'     
              document.getElementById('login-password-input').style = ' border: 3px solid #ff0033;'
            }
          }
          else{
            
            document.getElementById('contenedor_error').innerHTML = '<h4 id="message_err">El usuario no existe</h4>'
            document.getElementById('login-username-input').style = ' border: 1px solid #ff0033;'
          }
        });
      }else{
       respuesta.json().then(data=>{
        alert(data['messageError'])
       });
        
      } 
    })
    .catch((err) => {
      console.log("Error al solicitar el recurso", err);
    });
};

const limpiarCamposLoguin =()=>{
  document.getElementById("login-username-input").value='';
  document.getElementById("login-password-input").value='';
}


