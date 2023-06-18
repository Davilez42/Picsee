
const cargar_informacion= async ()=>{
        const user_logged = sessionStorage.getItem('loggedUser');
        if(user_logged!=undefined){
           const token =  JSON.parse(user_logged).token
         //window.location.href=`/HomPage?t_ken=${token}`;     
        }else{
                'Porfavor inicia sesion primero'
        }
    
}
cargar_informacion()