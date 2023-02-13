const btn1 = document.querySelector('#btn')
btn1.addEventListener('click',(e)=>{
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    e.preventDefault()
    if (username == "") {
      alert("Porfavor un nombre de usuario");
      return;
    }
    if (password == "") {
      alert("Porfavor digite una contraseña");
      return;
    }

    validar_Loguin(username,password)
})



const validar_Loguin =  (us,pas) => {
 
  datos={
    method:"POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },  
    body: JSON.stringify({'username': us,'password': pas})
  }
    fetch("http://localhost:5000/login", datos)
    .then((respuesta) => {
      console.log(respuesta);
    })
    .catch((err) => {
      console.log("Error al solicitar el recurso", err);
    });
    
};
