const btn_cerrarSesion = document.querySelector("#btn_cerrarSesion")
btn_cerrarSesion.addEventListener("click",()=>{
    localStorage.removeItem('loggedUser')
    window.location.href = '/'
})

//TODO carharConfiguraciones
const autentificacion=()=>{
    if (localStorage.getItem('loggedUser')== undefined){
        alert('Error, Debes logearte primero ;)')
        window.location.href = '/'
    }
}
autentificacion()


