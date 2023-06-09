const btn_registo = document.querySelector("#btn_registro");
btn_registo.addEventListener('click',()=>{
    obtenerDatos()
})

const  obtenerDatos=()=>{
    const nombres = document.getElementById('registro-nombres-input').value;
    const apellidos = document.getElementById('registro-apellidos-input').value;
    const usuario = document.getElementById('registro-usuario-input').value;
    const correo = document.getElementById('registro-correo-input').value;
    const contraseña = document.getElementById('registro-contraseña-input').value;
    datos_formularo =
    {
        "first_names": nombres!='' ? nombres : alert('Porfavor digite el nombre'),
        "last_names": apellidos!='' ? apellidos : alert('Porfavor digite el campo de apellidos'),
        "username": usuario!='' ? usuario : alert('Porfavor digite el campo de apellidos'),
        "email": correo!='' ? correo : alert('Porfavor digite el campo de apellidos'),
        "password": contraseña!='' ?  (contraseña.length <4 ? alert('La contraseña debe contener almenos 4 caracteres') : contraseña  ): alert('Porfavor digite el campo de apellidos')
    }
   enviar_registro(datos_formularo);

}

const enviar_registro=async(datos_formularo)=>{
    const respuesta = await fetch('http://192.168.1.7:5000/registerUser',{
        method:'POST',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos_formularo)
    })
    if (respuesta.ok) {
        const us = await respuesta.json()
       if(us['succes']){
        localStorage.setItem("loggedUser",JSON.stringify(us))
        window.location.href="/";
       }
       else{
        alert(`El ${ us['valFail'] } ya esta en uso`)
        }
    }else{
        const us = await respuesta.json()
        alert(us['messageError'])
    }

}