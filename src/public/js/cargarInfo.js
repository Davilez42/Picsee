const cargar_informacion=()=>{
        const user_logged = localStorage.getItem('loggedUser');
        if(user_logged!=undefined){
            window.location.href='/HomPage';
        }
    
}

cargar_informacion()