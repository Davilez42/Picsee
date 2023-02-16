
//TODO carharConfiguraciones
const autentificacion=()=>{
    if (localStorage.getItem('loggedUser')== undefined){
        alert('Error, Debes logearte primero ;)')
        window.location.href = '/'
        return
    }
    user = JSON.parse(localStorage.getItem('loggedUser'))//cargo el usuario que esta logeado
    document.getElementById('avatar').src = user['id_avatar']//cargo el avatar
    document.getElementById('barra_busqueda').placeholder = `Busca algo ${user['username']} !` 
}
autentificacion()

const btn_cerrarSesion = document.querySelector("#btn_cerrarSesion")
btn_cerrarSesion.addEventListener("click",()=>{
    localStorage.removeItem('loggedUser')
    window.location.href = '/'
})


const btn_eliminarCuenta = document.querySelector('#btn_eliminarCuenta')
btn_eliminarCuenta.addEventListener('click',async ()=>{
 const resp = await fetch(`http://localhost:5000/Delete_User?id_user=${JSON.parse(localStorage.getItem('loggedUser')).id_user}`,{
    method:'DELETE',
    mode:'cors'
 })
  if (resp.ok){
    localStorage.removeItem('loggedUser')
    window.location.href = '/'
  }
})




