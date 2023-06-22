
//TODO carharConfiguraciones
const autentificacion=()=>{
    if (sessionStorage.getItem('loggedUser')== undefined){
        window.location.href = '/infoError.html'
        return
    }
    user = JSON.parse(sessionStorage.getItem('loggedUser'))//cargo el usuario que esta logeado
    document.getElementById('avatar_').src = user['avatar'].url//cargo el avatar
    document.getElementById('avatar').src = user['avatar'].url//cargo el avatar
    document.getElementById('barra_busqueda').placeholder = `Busca algo ${user['username'][1]} !` 

    const btn_cerrarSesion = document.querySelector("#btn_cerrarSesion")
    btn_cerrarSesion.addEventListener("click",()=>{
      sessionStorage.removeItem('loggedUser')
        window.location.href = '/'
    })

    const btn_eliminarCuenta = document.querySelector('#btn_eliminarCuenta')
    btn_eliminarCuenta.addEventListener('click',async ()=>{
      const user =JSON.parse(sessionStorage.getItem('loggedUser'))
      if(user!=undefined){
        const resp = await fetch(`/Delete_User?id_user=${user.id_user}&id_cnd=${user.avatar.id_cnd}`,{
        method:'DELETE',
        mode:'cors',
        headers:{"auth":user.token}
    })
      if (resp.ok){
        sessionStorage.removeItem('loggedUser')
        window.location.href = '/'
      }else{
        const mensaje = await resp.json()
        console.log(mensaje.messageError)
      }
    }else{
      alert("NO SEAS MAMON BORRANDO CUENTAAS AJENAS :D")
    }
    })


    document.querySelector("#btn_subirMomento").addEventListener('click',()=>{
      document.getElementById("contenedor_galeria_perfil").style.display = "none";
      document.getElementById("contenedor_etiquetas_hastags").style.display = "none";
      document.getElementById("contenedor_subirmomento").style= "display:relative";
      document.querySelector('.barra_navegacion_desplegable').setAttribute('hidden','')
    })

}
autentificacion()

