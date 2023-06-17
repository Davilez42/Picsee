
//TODO carharConfiguraciones
const autentificacion=()=>{
    if (localStorage.getItem('loggedUser')== undefined){
        alert('Error, Debes logearte primero ;)')
        window.location.href = '/'
        return
    }
    user = JSON.parse(localStorage.getItem('loggedUser'))//cargo el usuario que esta logeado
    document.getElementById('avatar_').src = user['id_avatar']//cargo el avatar
    document.getElementById('avatar').src = user['id_avatar']//cargo el avatar
    document.getElementById('barra_busqueda').placeholder = `Busca algo ${user['username'][1]} !` 
}
autentificacion()

const btn_cerrarSesion = document.querySelector("#btn_cerrarSesion")
btn_cerrarSesion.addEventListener("click",()=>{
    localStorage.removeItem('loggedUser')
    window.location.href = '/'
})

const btn_eliminarCuenta = document.querySelector('#btn_eliminarCuenta')
btn_eliminarCuenta.addEventListener('click',async ()=>{
  const user =JSON.parse(localStorage.getItem('loggedUser'))
  if(user!=undefined){
    const resp = await fetch(`http://192.168.1.7:5000/Delete_User?id_user=${user.id_user}&id_avatar=${user.id_avatar}`,{
    method:'DELETE',
    mode:'cors',
    headers:{"auth":user.token}
 })
  if (resp.ok){
    localStorage.removeItem('loggedUser')
    window.location.href = '/'
  }else{
    const mensaje = await resp.json()
    console.log(mensaje.messageError)
  }
}else{
  alert("NO SEAS MAMON BORRANDO CUENTAAS AJENAS :D")
}
})




