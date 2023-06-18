

const btn_registo = document.querySelector("#btn_registro");
btn_registo.addEventListener('click',()=>{
    obtenerDatos()
})


document.querySelector('#avatar_archivo').addEventListener('change',(event)=>{
    file = event.target.files
    if (file.length>0) {     
        const filereader = new FileReader()
        filereader.onload = (event)=>{
        document.querySelector('.avatar_preview').src = event.target.result
        }
        filereader.readAsDataURL(file[0])
    }
})


const  obtenerDatos=async()=>{
    const nombres = document.getElementById('registro-nombres-input').value;
    const apellidos = document.getElementById('registro-apellidos-input').value;
    const usuario = document.getElementById('registro-usuario-input').value;
    const correo = document.getElementById('registro-correo-input').value;
    const contraseña = document.getElementById('registro-contraseña-input').value;
    const contraseña_confirmar = document.getElementById('registro-contraseña-input-2').value;
    
    console.log(apellidos);


    if (nombres.trim()==='') {
        alert('Porfavor digite el nombre')
        return
    }
    if (apellidos.trim()==='') {
        alert('Porfavor digite el campo de apellidos')
        return
    }
    if (usuario.trim()==='') {
        alert('Porfavor digite el campo de usuarios')
        return
    }
    if (correo.trim()==='') {
        alert('Porfavor digite el correo')
        return
    }
    
    if (contraseña.trim() !=='' ) {
        if (contraseña.length<8) {
        
            alert('La contraseña debe tener minimo 8 caracteres')
        return
        }
    }else{
        alert('Porfavor digite una contraseña') 
        return
    }
    
    
    
    datos_formularo =
    {
        "first_names": nombres.trim(),
        "last_names": apellidos.trim(),
        "username": usuario.trim(),
        "email": correo.trim(),
        "password": contraseña 
    }

    if(contraseña_confirmar===contraseña){
      await  enviar_registro(datos_formularo);
    }else{
        alert('Las contraseñas no coindicen')
    }
   

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
        sessionStorage.setItem("loggedUser",JSON.stringify(us))
            obtenermasinfoUsuario()
       }
       else{
        alert(`El ${ us['valFail'] } ya esta en uso`)
        }
    }else{
        const us = await respuesta.json()
        alert(us['messageError'])
    }
}

const obtenermasinfoUsuario= ()=>{
    //document.querySelector('.contenedor_ingresar').style.display = 'none'
    const user = JSON.parse(sessionStorage.getItem('loggedUser'))

    if(user==null){    
        alert('Debes registrate primero !')
        return
    }
    document.querySelector('.form-registro').style.display = 'none'
    document.querySelector('.contenedor-imagenes').style.display = 'none'    
    document.querySelector('.form-infoUsuario').style.display = 'flex'
    document.querySelector('.contenedor-avatar').style.display= 'flex'

    
    document.getElementById('btn_infouser').addEventListener('click',async()=>{
        const pais = document.getElementById('infoUsuario-pais-input').value
        const ciudad = document.getElementById('infoUsuario-ciudad-input').value
        const avatar = document.getElementById('avatar_archivo').files       
            fetch(`http://192.168.1.7:5000/setpreinfoUser/${user.id_user}/${pais}/${ciudad}`,{
                method:'PATCH',
                mode:'cors',
                headers:{"auth":user.token}
            })
            if(avatar.length>0){
                const form = new FormData()
                console.log(avatar[0]);
                form.append('archivo',avatar[0])
                
                await fetch(`http://192.168.1.7:5000/changedAvatar/${user.id_user}`,{
                    method:'PATCH',
                    mode: "cors",
                    headers:{"auth":user.token,"id_avatar":user.id_avatar},
                    body:form
                })
                user.id_avatar = user.id_user+'_'+avatar[0].name 
                sessionStorage.setItem('loggedUser',JSON.stringify(user)) 
                }

                window.location.href = '/home.html'


    })
}